"""
Summit API - Core Data Access Service

FastAPI service for Supabase-integrated data access.
Handles users, matters, sources, and all core entities.
"""

from fastapi import FastAPI, Depends, HTTPException, Header, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, date
from enum import Enum
import os
import jwt
import logging

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("summit_api")


# ============================================
# ENUMS FOR VALIDATION
# ============================================

class MatterStatus(str, Enum):
    ACTIVE = "active"
    CLOSED = "closed"
    DRAFT = "draft"
    ARCHIVED = "archived"
    PENDING = "pending"
    ON_HOLD = "on_hold"

class MatterType(str, Enum):
    LITIGATION = "litigation"
    CORPORATE = "corporate"
    REGULATORY = "regulatory"
    IP = "ip"
    EMPLOYMENT = "employment"
    REAL_ESTATE = "real_estate"
    TAX = "tax"
    OTHER = "other"

class AgentStatus(str, Enum):
    ACTIVE = "active"
    DRAFT = "draft"
    ARCHIVED = "archived"
    DISABLED = "disabled"

class SourceType(str, Enum):
    DOCUMENT = "document"
    EMAIL = "email"
    PLEADING = "pleading"
    CORRESPONDENCE = "correspondence"
    CONTRACT = "contract"
    EVIDENCE = "evidence"
    RESEARCH = "research"
    OTHER = "other"
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
# CONFIGURATION
# ============================================

# Request size limits
MAX_REQUEST_BODY_SIZE = 10 * 1024 * 1024  # 10 MB


def normalize_origin(origin: str) -> str:
    """Normalize CORS origin by removing trailing slashes and whitespace."""
    return origin.strip().rstrip("/")


def validate_environment():
    """Validate required environment variables at startup."""
    required_vars = []
    warnings = []

    # Check Supabase configuration
    if not os.getenv("SUPABASE_URL"):
        required_vars.append("SUPABASE_URL")
    if not os.getenv("SUPABASE_SERVICE_ROLE_KEY"):
        required_vars.append("SUPABASE_SERVICE_ROLE_KEY")

    # Warn about missing optional but recommended vars
    if not os.getenv("SUPABASE_JWT_SECRET"):
        warnings.append("SUPABASE_JWT_SECRET not set - running in demo mode")

    # Log warnings
    for warning in warnings:
        logger.warning(warning)

    # Fail if required vars are missing
    if required_vars:
        error_msg = f"Missing required environment variables: {', '.join(required_vars)}"
        logger.error(error_msg)
        raise RuntimeError(error_msg)


# ============================================
# APP INITIALIZATION
# ============================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    logger.info("Summit API starting...")

    # Validate environment at startup
    validate_environment()

    logger.info("Environment validated successfully")
    yield
    logger.info("Summit API shutting down...")

app = FastAPI(
    title="Summit Intelligence API",
    description="Core data access service for Summit v2",
    version="2.0.0",
    lifespan=lifespan
)

# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


# Request body size limit middleware
from starlette.responses import JSONResponse

@app.middleware("http")
async def limit_request_body_size(request: Request, call_next):
    """Reject requests with bodies larger than MAX_REQUEST_BODY_SIZE."""
    content_length = request.headers.get("content-length")
    if content_length:
        try:
            if int(content_length) > MAX_REQUEST_BODY_SIZE:
                return JSONResponse(
                    status_code=413,
                    content={"detail": f"Request body too large. Maximum size is {MAX_REQUEST_BODY_SIZE // (1024 * 1024)} MB"}
                )
        except ValueError:
            # Invalid content-length header
            pass
    return await call_next(request)


# CORS Configuration - Restricted for security
ALLOWED_ORIGINS = [
    normalize_origin("http://localhost:3000"),
    normalize_origin("http://localhost:3001"),
]
if os.getenv("FRONTEND_URL"):
    ALLOWED_ORIGINS.append(normalize_origin(os.getenv("FRONTEND_URL")))

# Validate origins
for origin in ALLOWED_ORIGINS:
    if not origin.startswith(("http://", "https://")):
        logger.warning(f"Invalid CORS origin format: {origin}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "X-Request-ID"],
)

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
# PYDANTIC MODELS
# ============================================

class Organisation(BaseModel):
    id: str
    name: str
    slug: str
    domain: Optional[str]
    sovereign_mode: bool = False
    subscription_tier: str = "demo"
    settings: Dict[str, Any] = {}

class User(BaseModel):
    id: str
    org_id: str
    email: str
    full_name: str
    role: str
    department: Optional[str]
    jurisdictions: List[str] = []
    is_active: bool = True

class MatterSummary(BaseModel):
    id: str
    org_id: str
    code: str
    name: str
    matter_type: str
    status: str
    jurisdiction: str
    compliance_state: str = "green"
    risk_score: float = 0.0
    client_name: Optional[str] = None

class MatterDetail(MatterSummary):
    description: Optional[str]
    court_reference: Optional[str]
    privilege_class: str
    billing_type: str
    budget_total: Optional[float]
    budget_used: float = 0
    estimated_value: Optional[float]
    open_date: Optional[date]
    next_deadline: Optional[date]
    metadata: Dict[str, Any] = {}
    team: List[Dict] = []
    parties: List[Dict] = []

class MatterSource(BaseModel):
    id: str
    matter_id: str
    source_type: str
    source_name: str
    privilege_class: str = "standard"
    document_date: Optional[date]
    author: Optional[str]
    page_count: Optional[int]
    tags: List[str] = []
    summary: Optional[str]

class MatterEvent(BaseModel):
    id: str
    matter_id: str
    event_type: str
    title: str
    event_date: date
    is_deadline: bool = False
    is_completed: bool = False

class SearchQuery(BaseModel):
    query: str
    matter_id: Optional[str] = None
    filters: Dict[str, Any] = {}
    limit: int = 20

class SGISnapshot(BaseModel):
    sgi_score: float
    time_saved_hours: float
    cost_avoided_usd: float
    accuracy_improvement: float
    throughput_gain: float
    compliance_score: float
    breakdown: Dict[str, float] = {}

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
        # In demo mode, still try to validate if a real token is provided

    # Production mode: Validate JWT token
    jwt_secret = os.getenv("SUPABASE_JWT_SECRET")
    if not jwt_secret:
        raise HTTPException(
            status_code=500,
            detail="SUPABASE_JWT_SECRET not configured. Set it for production or use demo_token for development."
        )

    try:
        # Decode and validate the JWT token
        # Supabase uses HS256 algorithm
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

        # Verify token hasn't expired (jwt.decode already does this, but double-check)
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
        # Log the error for debugging but don't expose details
        logger.error(f"Authentication error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=401, detail="Authentication failed")


# ============================================
# AUDIT LOGGING
# ============================================

async def audit_log(
    supabase: Client,
    org_id: str,
    user_id: str,
    action: str,
    resource_type: str,
    resource_id: Optional[str] = None,
    details: Optional[Dict[str, Any]] = None,
    ip_address: Optional[str] = None
) -> None:
    """
    Log audit events for sensitive operations.

    Args:
        supabase: Supabase client
        org_id: Organisation ID
        user_id: User who performed the action
        action: Action performed (view, search, export, etc.)
        resource_type: Type of resource accessed (user_list, matter, search, etc.)
        resource_id: Specific resource ID if applicable
        details: Additional context about the action
        ip_address: Client IP address
    """
    try:
        audit_data = {
            "org_id": org_id,
            "user_id": user_id,
            "action": action,
            "resource_type": resource_type,
            "resource_id": resource_id,
            "details": details or {},
            "ip_address": ip_address,
            "timestamp": datetime.utcnow().isoformat()
        }

        # Log to database
        supabase.table("audit_log").insert(audit_data).execute()

        # Also log to structured logger for external monitoring
        logger.info(
            f"AUDIT: {action} on {resource_type}",
            extra={
                "org_id": org_id,
                "user_id": user_id,
                "action": action,
                "resource_type": resource_type,
                "resource_id": resource_id
            }
        )
    except Exception as e:
        # Don't fail the request if audit logging fails
        logger.error(f"Failed to log audit event: {e}", exc_info=True)


def get_client_ip(request: Request) -> str:
    """Extract client IP from request, handling proxies."""
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        # Take the first IP (client IP)
        return forwarded_for.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


# ============================================
# HEALTH CHECK
# ============================================

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "summit_api",
        "version": "2.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }

# ============================================
# ORGANISATION ENDPOINTS
# ============================================

@app.get("/api/v1/organisation", response_model=Organisation)
@limiter.limit("60/minute")
async def get_organisation(
    request: Request,
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get current user's organisation"""
    result = supabase.table("organisations").select("*").eq("id", current_user["org_id"]).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Organisation not found")
    return result.data

# ============================================
# USER ENDPOINTS
# ============================================

@app.get("/api/v1/users", response_model=List[User])
@limiter.limit("60/minute")
async def list_users(
    request: Request,
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """List users in current organisation"""
    # Audit log: viewing org user list is sensitive
    await audit_log(
        supabase=supabase,
        org_id=current_user["org_id"],
        user_id=current_user["id"],
        action="view",
        resource_type="user_list",
        ip_address=get_client_ip(request)
    )

    result = supabase.table("users").select("*").eq("org_id", current_user["org_id"]).execute()
    return result.data or []

@app.get("/api/v1/users/me", response_model=User)
async def get_current_user_profile(current_user: Dict = Depends(get_current_user)):
    """Get current user profile"""
    return current_user

# ============================================
# MATTER ENDPOINTS
# ============================================

@app.get("/api/v1/matters", response_model=List[MatterSummary])
@limiter.limit("60/minute")
async def list_matters(
    request: Request,
    status: Optional[MatterStatus] = Query(None, description="Filter by matter status"),
    matter_type: Optional[MatterType] = Query(None, description="Filter by matter type"),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """List matters for current organisation"""
    query = supabase.table("matters").select(
        "*, matter_parties!inner(name, party_type)"
    ).eq("org_id", current_user["org_id"])

    if status:
        query = query.eq("status", status.value)
    if matter_type:
        query = query.eq("matter_type", matter_type.value)

    result = query.order("updated_at", desc=True).range(offset, offset + limit - 1).execute()

    # Extract client name from parties
    matters = []
    for m in result.data or []:
        client = next((p["name"] for p in m.get("matter_parties", []) if p["party_type"] == "client"), None)
        matter = {**m, "client_name": client}
        del matter["matter_parties"]
        matters.append(matter)

    return matters

@app.get("/api/v1/matters/{matter_id}", response_model=MatterDetail)
async def get_matter(
    matter_id: str,
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get matter details"""
    result = supabase.table("matters").select("*").eq("id", matter_id).eq("org_id", current_user["org_id"]).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Matter not found")

    matter = result.data

    # Get team
    team_result = supabase.table("matter_team").select("*, users(full_name, email, role)").eq("matter_id", matter_id).execute()
    matter["team"] = team_result.data or []

    # Get parties
    parties_result = supabase.table("matter_parties").select("*").eq("matter_id", matter_id).execute()
    matter["parties"] = parties_result.data or []

    # Get client name
    client = next((p["name"] for p in matter["parties"] if p["party_type"] == "client"), None)
    matter["client_name"] = client

    return matter

# ============================================
# MATTER SOURCES ENDPOINTS
# ============================================

@app.get("/api/v1/matters/{matter_id}/sources", response_model=List[MatterSource])
async def list_matter_sources(
    matter_id: str,
    source_type: Optional[SourceType] = Query(None, description="Filter by source type"),
    limit: int = Query(50, ge=1, le=200),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """List sources for a matter"""
    query = supabase.table("matter_sources").select("*").eq("matter_id", matter_id)

    if source_type:
        query = query.eq("source_type", source_type.value)

    result = query.order("created_at", desc=True).limit(limit).execute()
    return result.data or []

@app.get("/api/v1/matters/{matter_id}/sources/{source_id}")
async def get_source(
    matter_id: str,
    source_id: str,
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get source details with extracted text"""
    result = supabase.table("matter_sources").select("*").eq("id", source_id).eq("matter_id", matter_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Source not found")
    return result.data

# ============================================
# MATTER EVENTS ENDPOINTS
# ============================================

@app.get("/api/v1/matters/{matter_id}/events", response_model=List[MatterEvent])
async def list_matter_events(
    matter_id: str,
    include_completed: bool = Query(True),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """List events for a matter"""
    query = supabase.table("matter_events").select("*").eq("matter_id", matter_id)

    if not include_completed:
        query = query.eq("is_completed", False)

    result = query.order("event_date", desc=False).execute()
    return result.data or []

@app.get("/api/v1/deadlines")
async def list_upcoming_deadlines(
    days: int = Query(30, ge=1, le=90),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """List upcoming deadlines across all matters"""
    from datetime import timedelta

    cutoff = (datetime.now() + timedelta(days=days)).strftime("%Y-%m-%d")

    result = supabase.table("matter_events").select(
        "*, matters(code, name)"
    ).eq("is_deadline", True).eq("is_completed", False).lte("event_date", cutoff).order("event_date").execute()

    return result.data or []

# ============================================
# SEARCH ENDPOINT
# ============================================

def sanitize_search_query(query_str: str, max_length: int = 200) -> str:
    """Sanitize search query to prevent injection attacks"""
    # Truncate to max length
    query_str = query_str[:max_length]
    # Remove potentially dangerous characters for LIKE patterns
    # Keep alphanumeric, spaces, and common punctuation
    import re
    sanitized = re.sub(r'[%_\\]', '', query_str)  # Remove LIKE wildcards
    sanitized = re.sub(r'[^\w\s\-\.\,\'\"]', ' ', sanitized)  # Keep safe chars only
    return sanitized.strip()

@app.post("/api/v1/search")
@limiter.limit("30/minute")
async def search(
    request: Request,
    query: SearchQuery,
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Search across matters and sources"""
    # Sanitize the search query
    sanitized_query = sanitize_search_query(query.query)

    if not sanitized_query:
        raise HTTPException(status_code=400, detail="Invalid search query")

    # Audit log: searches are sensitive (may indicate interest in specific matters/topics)
    await audit_log(
        supabase=supabase,
        org_id=current_user["org_id"],
        user_id=current_user["id"],
        action="search",
        resource_type="cross_matter_search",
        resource_id=query.matter_id,  # If scoped to specific matter
        details={"query_length": len(sanitized_query)},  # Don't log query itself for privacy
        ip_address=get_client_ip(request)
    )

    results = {
        "matters": [],
        "sources": [],
        "query": sanitized_query
    }

    # Search matters using sanitized query
    matter_query = supabase.table("matters").select(
        "id, code, name, matter_type, status"
    ).eq("org_id", current_user["org_id"]).ilike(
        "name", f"%{sanitized_query}%"
    ).limit(10)
    matter_result = matter_query.execute()
    results["matters"] = matter_result.data or []

    # Search sources using sanitized query
    if query.matter_id:
        source_query = supabase.table("matter_sources").select(
            "id, matter_id, source_name, source_type, summary"
        ).eq("matter_id", query.matter_id).ilike(
            "source_name", f"%{sanitized_query}%"
        ).limit(query.limit)
    else:
        source_query = supabase.table("matter_sources").select(
            "id, matter_id, source_name, source_type, summary"
        ).ilike(
            "source_name", f"%{sanitized_query}%"
        ).limit(query.limit)

    source_result = source_query.execute()
    results["sources"] = source_result.data or []

    return results

# ============================================
# ANALYTICS ENDPOINTS
# ============================================

@app.get("/api/v1/analytics/sgi", response_model=SGISnapshot)
async def get_sgi_snapshot(
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get latest SGI snapshot"""
    result = supabase.table("sgi_snapshots").select("*").eq("org_id", current_user["org_id"]).order("snapshot_date", desc=True).limit(1).execute()

    if not result.data:
        # Return default values if no data
        return SGISnapshot(
            sgi_score=0,
            time_saved_hours=0,
            cost_avoided_usd=0,
            accuracy_improvement=0,
            throughput_gain=0,
            compliance_score=100,
            breakdown={}
        )

    return result.data[0]

@app.get("/api/v1/analytics/sgi/history")
async def get_sgi_history(
    days: int = Query(30, le=90),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get SGI history for trending"""
    from datetime import timedelta

    cutoff = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")

    result = supabase.table("sgi_snapshots").select("snapshot_date, sgi_score, time_saved_hours, cost_avoided_usd").eq("org_id", current_user["org_id"]).gte("snapshot_date", cutoff).order("snapshot_date").execute()

    return result.data or []

# ============================================
# AGENT ENDPOINTS
# ============================================

@app.get("/api/v1/agents")
async def list_agents(
    status: Optional[AgentStatus] = Query(None, description="Filter by agent status"),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """List available agents"""
    query = supabase.table("agent_definitions").select("*").eq("org_id", current_user["org_id"])

    if status:
        query = query.eq("status", status.value)

    result = query.order("name").execute()
    return result.data or []

@app.get("/api/v1/agents/{agent_id}")
async def get_agent(
    agent_id: str,
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get agent details"""
    result = supabase.table("agent_definitions").select("*").eq("id", agent_id).eq("org_id", current_user["org_id"]).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Agent not found")
    return result.data

@app.get("/api/v1/agents/{agent_id}/runs")
async def list_agent_runs(
    agent_id: str,
    limit: int = Query(20, ge=1, le=50),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """List runs for an agent"""
    result = supabase.table("agent_runs").select("*").eq("agent_id", agent_id).order("created_at", desc=True).limit(limit).execute()
    return result.data or []

# ============================================
# RUN SERVER
# ============================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
