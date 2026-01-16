"""
Summit Agent Runtime - Autonomous Agent Execution Engine

Manages agent definitions, runs, and task execution.
Supports multi-step workflows with tool integration.
"""

from fastapi import FastAPI, Depends, HTTPException, Header, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, Callable
from datetime import datetime
from enum import Enum
import os
import json
import jwt
import asyncio
import httpx
from contextlib import asynccontextmanager

from supabase import create_client, Client
from dotenv import load_dotenv
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

load_dotenv()

# ============================================
# RATE LIMITING
# ============================================

limiter = Limiter(key_func=get_remote_address)

# ============================================
# APP INITIALIZATION
# ============================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    print("Summit Agent Runtime starting...")
    yield
    print("Summit Agent Runtime shutting down...")

app = FastAPI(
    title="Summit Agent Runtime",
    description="Autonomous agent execution engine",
    version="2.0.0",
    lifespan=lifespan
)

# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS Configuration - Restricted for security
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
]
if os.getenv("FRONTEND_URL"):
    ALLOWED_ORIGINS.append(os.getenv("FRONTEND_URL"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "X-Request-ID"],
)

# Service URLs
LLM_ORCHESTRATOR_URL = os.getenv("LLM_ORCHESTRATOR_URL", "http://localhost:8001")
SUMMIT_API_URL = os.getenv("SUMMIT_API_URL", "http://localhost:8000")

# ============================================
# SUPABASE CLIENT
# ============================================

def get_supabase() -> Client:
    """Get Supabase client"""
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not key:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    return create_client(url, key)

# ============================================
# ENUMS & MODELS
# ============================================

class AgentStatus(str, Enum):
    ACTIVE = "active"
    PAUSED = "paused"
    DEPRECATED = "deprecated"

class RunStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class TaskStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    SKIPPED = "skipped"

class AgentTrigger(str, Enum):
    MANUAL = "manual"
    SCHEDULED = "scheduled"
    EVENT = "event"
    WEBHOOK = "webhook"

class AgentDefinition(BaseModel):
    """Agent definition model"""
    id: str
    org_id: str
    name: str
    description: str
    agent_type: str
    icon: Optional[str] = None
    status: AgentStatus = AgentStatus.ACTIVE
    capabilities: List[str] = []
    config: Dict[str, Any] = {}
    trigger_type: AgentTrigger = AgentTrigger.MANUAL
    schedule_cron: Optional[str] = None
    visibility_scope: str = "org"

class RunRequest(BaseModel):
    """Request to start an agent run"""
    agent_id: str
    matter_id: Optional[str] = None
    input_data: Dict[str, Any] = {}
    config_overrides: Dict[str, Any] = {}

class TaskResult(BaseModel):
    """Result from a task execution"""
    task_id: str
    status: TaskStatus
    output: Dict[str, Any] = {}
    error: Optional[str] = None
    duration_ms: int = 0

class AgentRun(BaseModel):
    """Agent run model"""
    id: str
    agent_id: str
    matter_id: Optional[str]
    status: RunStatus
    input_data: Dict[str, Any]
    output_data: Dict[str, Any] = {}
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    error: Optional[str]

# ============================================
# TOOL DEFINITIONS
# ============================================

AGENT_TOOLS = {
    "search_matter": {
        "description": "Search for information within a matter's documents",
        "parameters": {
            "query": "Search query",
            "matter_id": "Matter ID to search within",
            "limit": "Maximum results to return"
        }
    },
    "analyze_document": {
        "description": "Analyze a specific document for insights",
        "parameters": {
            "source_id": "Document source ID",
            "analysis_type": "Type of analysis: comprehensive, risk, summary"
        }
    },
    "draft_document": {
        "description": "Draft a new document based on templates",
        "parameters": {
            "template_id": "Template to use",
            "matter_id": "Matter context",
            "variables": "Template variables"
        }
    },
    "send_notification": {
        "description": "Send notification to users",
        "parameters": {
            "user_ids": "List of user IDs",
            "message": "Notification message",
            "priority": "Priority level: low, medium, high"
        }
    },
    "create_event": {
        "description": "Create a calendar event or deadline",
        "parameters": {
            "matter_id": "Matter ID",
            "title": "Event title",
            "date": "Event date",
            "is_deadline": "Whether this is a deadline"
        }
    },
    "llm_complete": {
        "description": "Call LLM for completion",
        "parameters": {
            "prompt": "Prompt text",
            "task_type": "Type: analysis, drafting, research, summarization",
            "context": "Additional context"
        }
    },
    "rag_query": {
        "description": "RAG-enhanced query against matter documents",
        "parameters": {
            "query": "Query text",
            "matter_id": "Matter to query",
            "top_k": "Number of context chunks"
        }
    }
}

# ============================================
# TOOL EXECUTION
# ============================================

async def execute_tool(
    tool_name: str,
    parameters: Dict[str, Any],
    auth_token: str,
    supabase: Client
) -> Dict[str, Any]:
    """Execute an agent tool"""

    # Configure timeout: 30s connect, 120s for LLM operations (can be slow)
    timeout = httpx.Timeout(30.0, read=120.0)

    async with httpx.AsyncClient(timeout=timeout) as client:
        headers = {"Authorization": auth_token}

        if tool_name == "search_matter":
            response = await client.post(
                f"{SUMMIT_API_URL}/api/v1/search",
                json={
                    "query": parameters.get("query", ""),
                    "matter_id": parameters.get("matter_id"),
                    "limit": parameters.get("limit", 10)
                },
                headers=headers
            )
            return response.json()

        elif tool_name == "analyze_document":
            response = await client.post(
                f"{LLM_ORCHESTRATOR_URL}/api/v1/analyze",
                params={
                    "source_id": parameters["source_id"],
                    "matter_id": parameters.get("matter_id"),
                    "analysis_type": parameters.get("analysis_type", "comprehensive")
                },
                headers=headers
            )
            return response.json()

        elif tool_name == "draft_document":
            # Get template
            template = supabase.table("document_templates").select("*").eq(
                "id", parameters["template_id"]
            ).single().execute()

            if not template.data:
                raise ValueError("Template not found")

            # Generate draft via LLM
            response = await client.post(
                f"{LLM_ORCHESTRATOR_URL}/api/v1/complete",
                json={
                    "task_type": "drafting",
                    "prompt": f"Generate a document using this template:\n{template.data['content']}\n\nVariables: {json.dumps(parameters.get('variables', {}))}",
                    "matter_id": parameters.get("matter_id"),
                    "temperature": 0.3
                },
                headers=headers
            )
            return response.json()

        elif tool_name == "send_notification":
            # Store notifications in database
            for user_id in parameters.get("user_ids", []):
                supabase.table("notifications").insert({
                    "user_id": user_id,
                    "message": parameters["message"],
                    "priority": parameters.get("priority", "medium"),
                    "read": False
                }).execute()
            return {"sent": len(parameters.get("user_ids", []))}

        elif tool_name == "create_event":
            result = supabase.table("matter_events").insert({
                "matter_id": parameters["matter_id"],
                "title": parameters["title"],
                "event_date": parameters["date"],
                "event_type": "deadline" if parameters.get("is_deadline") else "event",
                "is_deadline": parameters.get("is_deadline", False),
                "is_completed": False
            }).execute()
            return {"event_id": result.data[0]["id"] if result.data else None}

        elif tool_name == "llm_complete":
            response = await client.post(
                f"{LLM_ORCHESTRATOR_URL}/api/v1/complete",
                json={
                    "task_type": parameters.get("task_type", "qa"),
                    "prompt": parameters["prompt"],
                    "context": parameters.get("context"),
                    "matter_id": parameters.get("matter_id")
                },
                headers=headers
            )
            return response.json()

        elif tool_name == "rag_query":
            response = await client.post(
                f"{LLM_ORCHESTRATOR_URL}/api/v1/rag",
                json={
                    "query": parameters["query"],
                    "matter_id": parameters["matter_id"],
                    "top_k": parameters.get("top_k", 5),
                    "include_sources": True
                },
                headers=headers
            )
            return response.json()

        else:
            raise ValueError(f"Unknown tool: {tool_name}")

# ============================================
# AGENT EXECUTION ENGINE
# ============================================

async def run_agent(
    run_id: str,
    agent: Dict[str, Any],
    input_data: Dict[str, Any],
    auth_token: str,
    supabase: Client
):
    """Execute an agent run"""

    try:
        # Update run status to running
        supabase.table("agent_runs").update({
            "status": RunStatus.RUNNING.value,
            "started_at": datetime.utcnow().isoformat()
        }).eq("id", run_id).execute()

        agent_type = agent["agent_type"]
        config = agent.get("config", {})
        matter_id = input_data.get("matter_id")

        results = {}

        # Execute based on agent type
        if agent_type == "document_analyzer":
            # Analyze all documents in a matter
            sources = supabase.table("matter_sources").select("id, source_name").eq(
                "matter_id", matter_id
            ).limit(config.get("max_documents", 10)).execute()

            for source in sources.data or []:
                task_id = f"analyze_{source['id']}"

                # Create task record
                supabase.table("agent_tasks").insert({
                    "run_id": run_id,
                    "task_name": f"Analyze {source['source_name']}",
                    "status": TaskStatus.RUNNING.value,
                    "started_at": datetime.utcnow().isoformat()
                }).execute()

                try:
                    result = await execute_tool(
                        "analyze_document",
                        {"source_id": source["id"], "matter_id": matter_id},
                        auth_token,
                        supabase
                    )
                    results[task_id] = result

                    supabase.table("agent_tasks").update({
                        "status": TaskStatus.COMPLETED.value,
                        "output": result,
                        "completed_at": datetime.utcnow().isoformat()
                    }).eq("run_id", run_id).eq("task_name", f"Analyze {source['source_name']}").execute()

                except Exception as e:
                    supabase.table("agent_tasks").update({
                        "status": TaskStatus.FAILED.value,
                        "error": str(e),
                        "completed_at": datetime.utcnow().isoformat()
                    }).eq("run_id", run_id).eq("task_name", f"Analyze {source['source_name']}").execute()

        elif agent_type == "deadline_monitor":
            # Check upcoming deadlines and send alerts
            from datetime import timedelta

            cutoff_days = config.get("alert_days", 7)
            cutoff = (datetime.now() + timedelta(days=cutoff_days)).strftime("%Y-%m-%d")

            deadlines = supabase.table("matter_events").select(
                "*, matters(code, name)"
            ).eq("is_deadline", True).eq("is_completed", False).lte(
                "event_date", cutoff
            ).execute()

            for deadline in deadlines.data or []:
                # Get matter team
                team = supabase.table("matter_team").select("user_id").eq(
                    "matter_id", deadline["matter_id"]
                ).execute()

                user_ids = [t["user_id"] for t in team.data or []]

                if user_ids:
                    await execute_tool(
                        "send_notification",
                        {
                            "user_ids": user_ids,
                            "message": f"Upcoming deadline: {deadline['title']} on {deadline['event_date']}",
                            "priority": "high"
                        },
                        auth_token,
                        supabase
                    )

            results["deadlines_processed"] = len(deadlines.data or [])

        elif agent_type == "research_assistant":
            # RAG-based research
            query = input_data.get("query", "")

            if not query:
                raise ValueError("Research query required")

            result = await execute_tool(
                "rag_query",
                {
                    "query": query,
                    "matter_id": matter_id,
                    "top_k": config.get("context_chunks", 10)
                },
                auth_token,
                supabase
            )

            results["research"] = result

        elif agent_type == "compliance_checker":
            # Check matter compliance status
            sources = supabase.table("matter_sources").select("*").eq(
                "matter_id", matter_id
            ).execute()

            compliance_issues = []

            for source in sources.data or []:
                # Use LLM to check compliance
                result = await execute_tool(
                    "llm_complete",
                    {
                        "task_type": "analysis",
                        "prompt": f"""Review this document for compliance issues:

Document: {source.get('source_name')}
Summary: {source.get('summary', 'No summary available')}

Check for:
1. Missing required information
2. Regulatory compliance issues
3. Deadline compliance
4. Documentation gaps

Return a JSON object with: {{"compliant": true/false, "issues": [], "recommendations": []}}""",
                        "matter_id": matter_id
                    },
                    auth_token,
                    supabase
                )

                compliance_issues.append({
                    "source_id": source["id"],
                    "source_name": source["source_name"],
                    "result": result
                })

            results["compliance_check"] = compliance_issues

        elif agent_type == "custom":
            # Custom agent with defined steps
            steps = config.get("steps", [])

            for i, step in enumerate(steps):
                task_name = step.get("name", f"Step {i+1}")
                tool = step.get("tool")
                params = step.get("parameters", {})

                # Substitute variables from input_data
                for key, value in params.items():
                    if isinstance(value, str) and value.startswith("$"):
                        var_name = value[1:]
                        params[key] = input_data.get(var_name, results.get(var_name))

                supabase.table("agent_tasks").insert({
                    "run_id": run_id,
                    "task_name": task_name,
                    "status": TaskStatus.RUNNING.value,
                    "started_at": datetime.utcnow().isoformat()
                }).execute()

                try:
                    result = await execute_tool(tool, params, auth_token, supabase)
                    results[f"step_{i}"] = result

                    supabase.table("agent_tasks").update({
                        "status": TaskStatus.COMPLETED.value,
                        "output": result,
                        "completed_at": datetime.utcnow().isoformat()
                    }).eq("run_id", run_id).eq("task_name", task_name).execute()

                except Exception as e:
                    supabase.table("agent_tasks").update({
                        "status": TaskStatus.FAILED.value,
                        "error": str(e),
                        "completed_at": datetime.utcnow().isoformat()
                    }).eq("run_id", run_id).eq("task_name", task_name).execute()

                    if not step.get("continue_on_error", False):
                        raise

        # Complete the run
        supabase.table("agent_runs").update({
            "status": RunStatus.COMPLETED.value,
            "output_data": results,
            "completed_at": datetime.utcnow().isoformat()
        }).eq("id", run_id).execute()

    except Exception as e:
        # Mark run as failed
        supabase.table("agent_runs").update({
            "status": RunStatus.FAILED.value,
            "error": str(e),
            "completed_at": datetime.utcnow().isoformat()
        }).eq("id", run_id).execute()
        raise

# ============================================
# AUTHENTICATION
# ============================================

def get_demo_mode() -> bool:
    """Check if running in demo mode (no JWT secret configured)"""
    return not os.getenv("SUPABASE_JWT_SECRET")

async def get_current_user(
    authorization: str = Header(None),
    supabase: Client = Depends(get_supabase)
) -> Dict:
    """Extract and validate user from JWT token"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")

    # Extract token from Bearer header
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header format")

    token = authorization[7:]  # Remove "Bearer " prefix

    # Demo mode: Allow demo_token for local development without Supabase Auth
    if get_demo_mode():
        if token == "demo_token":
            result = supabase.table("users").select("*").eq("is_active", True).limit(1).execute()
            if not result.data:
                raise HTTPException(status_code=401, detail="No active users found")
            return result.data[0]

    # Production mode: Validate JWT token
    jwt_secret = os.getenv("SUPABASE_JWT_SECRET")
    if not jwt_secret:
        raise HTTPException(
            status_code=500,
            detail="SUPABASE_JWT_SECRET not configured. Set it for production or use demo_token for development."
        )

    try:
        # Decode and validate the JWT token
        payload = jwt.decode(
            token,
            jwt_secret,
            algorithms=["HS256"],
            audience="authenticated"
        )

        # Extract user ID from token (Supabase stores it in 'sub' claim)
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token: missing user ID")

        # Verify token hasn't expired
        exp = payload.get("exp")
        if exp and datetime.utcnow().timestamp() > exp:
            raise HTTPException(status_code=401, detail="Token has expired")

        # Look up user by their Supabase Auth ID
        result = supabase.table("users").select("*").eq("auth_id", user_id).eq("is_active", True).single().execute()

        if not result.data:
            # Fallback: try looking up by ID directly (for service tokens)
            result = supabase.table("users").select("*").eq("id", user_id).eq("is_active", True).single().execute()

        if not result.data:
            raise HTTPException(status_code=401, detail="User not found or inactive")

        return result.data

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidAudienceError:
        raise HTTPException(status_code=401, detail="Invalid token audience")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
    except Exception as e:
        print(f"Authentication error: {str(e)}")
        raise HTTPException(status_code=401, detail="Authentication failed")

# ============================================
# ENDPOINTS
# ============================================

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "summit_agent_runtime",
        "version": "2.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/v1/agents")
async def list_agents(
    status: Optional[str] = None,
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """List available agents"""
    query = supabase.table("agent_definitions").select("*").eq(
        "org_id", current_user["org_id"]
    )

    if status:
        query = query.eq("status", status)

    result = query.order("name").execute()
    return result.data or []

@app.get("/api/v1/agents/{agent_id}")
async def get_agent(
    agent_id: str,
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get agent details"""
    result = supabase.table("agent_definitions").select("*").eq(
        "id", agent_id
    ).eq("org_id", current_user["org_id"]).single().execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Agent not found")

    return result.data

@app.post("/api/v1/agents/{agent_id}/run")
async def start_run(
    agent_id: str,
    request: RunRequest,
    background_tasks: BackgroundTasks,
    authorization: str = Header(None),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Start an agent run"""

    # Get agent definition
    agent = supabase.table("agent_definitions").select("*").eq(
        "id", agent_id
    ).eq("org_id", current_user["org_id"]).single().execute()

    if not agent.data:
        raise HTTPException(status_code=404, detail="Agent not found")

    if agent.data["status"] != AgentStatus.ACTIVE.value:
        raise HTTPException(status_code=400, detail="Agent is not active")

    # Create run record
    run_data = {
        "agent_id": agent_id,
        "triggered_by": current_user["id"],
        "matter_id": request.matter_id,
        "status": RunStatus.PENDING.value,
        "input_data": {**request.input_data, "matter_id": request.matter_id},
        "config_overrides": request.config_overrides
    }

    run_result = supabase.table("agent_runs").insert(run_data).execute()
    run = run_result.data[0]

    # Start agent execution in background
    background_tasks.add_task(
        run_agent,
        run["id"],
        {**agent.data, "config": {**agent.data.get("config", {}), **request.config_overrides}},
        run_data["input_data"],
        authorization,
        supabase
    )

    return {
        "run_id": run["id"],
        "status": RunStatus.PENDING.value,
        "message": "Agent run started"
    }

@app.get("/api/v1/runs/{run_id}")
async def get_run(
    run_id: str,
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get run details"""
    result = supabase.table("agent_runs").select(
        "*, agent_definitions(name, agent_type)"
    ).eq("id", run_id).single().execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Run not found")

    # Get tasks
    tasks = supabase.table("agent_tasks").select("*").eq(
        "run_id", run_id
    ).order("created_at").execute()

    return {
        **result.data,
        "tasks": tasks.data or []
    }

@app.post("/api/v1/runs/{run_id}/cancel")
async def cancel_run(
    run_id: str,
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Cancel a running agent"""
    result = supabase.table("agent_runs").select("*").eq(
        "id", run_id
    ).single().execute()

    if not result.data:
        raise HTTPException(status_code=404, detail="Run not found")

    if result.data["status"] not in [RunStatus.PENDING.value, RunStatus.RUNNING.value]:
        raise HTTPException(status_code=400, detail="Run cannot be cancelled")

    supabase.table("agent_runs").update({
        "status": RunStatus.CANCELLED.value,
        "completed_at": datetime.utcnow().isoformat()
    }).eq("id", run_id).execute()

    return {"message": "Run cancelled"}

@app.get("/api/v1/runs")
async def list_runs(
    agent_id: Optional[str] = None,
    matter_id: Optional[str] = None,
    status: Optional[str] = None,
    limit: int = 20,
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """List agent runs"""
    query = supabase.table("agent_runs").select(
        "*, agent_definitions(name, agent_type)"
    ).eq("triggered_by", current_user["id"])

    if agent_id:
        query = query.eq("agent_id", agent_id)
    if matter_id:
        query = query.eq("matter_id", matter_id)
    if status:
        query = query.eq("status", status)

    result = query.order("created_at", desc=True).limit(limit).execute()
    return result.data or []

@app.get("/api/v1/tools")
async def list_tools():
    """List available agent tools"""
    return AGENT_TOOLS

# ============================================
# RUN SERVER
# ============================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
