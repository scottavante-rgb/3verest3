"""
Summit LLM Orchestrator - The Single Intelligence Gateway

Handles all LLM interactions with provider abstraction.
Phase 1: OpenAI GPT-4.1/Turbo + Embeddings
Future: Sovereign MoE integration
"""

from fastapi import FastAPI, Depends, HTTPException, Header, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any, AsyncGenerator
from datetime import datetime
from enum import Enum
import os
import json
import jwt
import asyncio
import logging
from contextlib import asynccontextmanager

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("summit_llm")

from openai import AsyncOpenAI
from supabase import create_client, Client
from dotenv import load_dotenv
import tiktoken
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
    print("Summit LLM Orchestrator starting...")
    yield
    print("Summit LLM Orchestrator shutting down...")

app = FastAPI(
    title="Summit LLM Orchestrator",
    description="Single intelligence gateway for all AI operations",
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

# ============================================
# CLIENTS
# ============================================

def get_supabase() -> Client:
    """Get Supabase client"""
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not key:
        raise HTTPException(status_code=500, detail="Supabase not configured")
    return create_client(url, key)

def get_openai() -> AsyncOpenAI:
    """Get OpenAI client"""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OpenAI not configured")
    return AsyncOpenAI(api_key=api_key)

# ============================================
# ENUMS & MODELS
# ============================================

class LLMProvider(str, Enum):
    OPENAI = "openai"
    SOVEREIGN = "sovereign"  # Future MoE

class LLMModel(str, Enum):
    # Updated to current model names (as of 2024)
    GPT4_TURBO = "gpt-4-turbo"  # Latest GPT-4 Turbo
    GPT4O = "gpt-4o"  # GPT-4 Optimized (faster, cheaper)
    GPT4O_MINI = "gpt-4o-mini"  # Smallest GPT-4 variant
    GPT4 = "gpt-4"  # Original GPT-4
    GPT35_TURBO = "gpt-3.5-turbo"  # Legacy, for cost savings
    EMBEDDING_3_SMALL = "text-embedding-3-small"
    EMBEDDING_3_LARGE = "text-embedding-3-large"

class TaskType(str, Enum):
    ANALYSIS = "analysis"
    DRAFTING = "drafting"
    RESEARCH = "research"
    SUMMARIZATION = "summarization"
    EXTRACTION = "extraction"
    CLASSIFICATION = "classification"
    QA = "qa"

class CompletionRequest(BaseModel):
    """Request for LLM completion"""
    task_type: TaskType
    prompt: str
    system_prompt: Optional[str] = None
    context: Optional[List[Dict[str, Any]]] = None
    matter_id: Optional[str] = None
    temperature: float = Field(default=0.7, ge=0, le=2)
    max_tokens: int = Field(default=2048, ge=1, le=8192)
    stream: bool = False
    metadata: Dict[str, Any] = {}

class EmbeddingRequest(BaseModel):
    """Request for embeddings"""
    texts: List[str]
    model: LLMModel = LLMModel.EMBEDDING_3_SMALL

class RAGRequest(BaseModel):
    """Request for RAG-enhanced completion"""
    query: str
    matter_id: str
    task_type: TaskType = TaskType.QA
    top_k: int = Field(default=5, ge=1, le=20)
    similarity_threshold: float = Field(default=0.7, ge=0, le=1)
    include_sources: bool = True
    stream: bool = False

class ContextChunk(BaseModel):
    """Retrieved context chunk"""
    source_id: str
    source_name: str
    content: str
    similarity: float
    metadata: Dict[str, Any] = {}

# ============================================
# TOKEN COUNTING
# ============================================

def count_tokens(text: str, model: str = "gpt-4") -> int:
    """Count tokens in text"""
    try:
        encoding = tiktoken.encoding_for_model(model)
        return len(encoding.encode(text))
    except Exception:
        # Fallback: rough estimate
        return len(text) // 4

# ============================================
# PROMPT ASSEMBLY
# ============================================

SYSTEM_PROMPTS = {
    TaskType.ANALYSIS: """You are Summit Intelligence, an expert legal analyst.
Analyze the provided information with precision and depth.
Focus on legal implications, risks, and actionable insights.
Always cite sources when referencing specific documents or facts.""",

    TaskType.DRAFTING: """You are Summit Intelligence, an expert legal drafter.
Draft professional legal documents with proper structure and terminology.
Ensure clarity, precision, and appropriate legal language.
Consider jurisdictional requirements and best practices.""",

    TaskType.RESEARCH: """You are Summit Intelligence, a legal research specialist.
Conduct thorough research and provide comprehensive findings.
Cite relevant cases, statutes, and authorities.
Present findings in a clear, organized manner.""",

    TaskType.SUMMARIZATION: """You are Summit Intelligence, a legal summarization expert.
Create clear, accurate summaries of complex legal documents.
Preserve key facts, obligations, and legal implications.
Use plain language while maintaining legal accuracy.""",

    TaskType.EXTRACTION: """You are Summit Intelligence, a legal data extraction specialist.
Extract structured information from legal documents with precision.
Identify parties, dates, obligations, and key terms.
Present extracted data in a clear, organized format.""",

    TaskType.CLASSIFICATION: """You are Summit Intelligence, a legal classification specialist.
Classify documents and information accurately.
Apply appropriate legal categories and tags.
Provide confidence levels for classifications.""",

    TaskType.QA: """You are Summit Intelligence, a legal Q&A assistant.
Answer questions accurately based on provided context.
Cite specific sources when answering.
Acknowledge when information is uncertain or unavailable."""
}

def assemble_prompt(
    request: CompletionRequest,
    context_chunks: Optional[List[ContextChunk]] = None
) -> tuple[str, str]:
    """Assemble system and user prompts"""

    # System prompt
    system_prompt = request.system_prompt or SYSTEM_PROMPTS.get(
        request.task_type,
        SYSTEM_PROMPTS[TaskType.QA]
    )

    # Add context to user prompt if available
    user_prompt = request.prompt

    if context_chunks:
        context_section = "\n\n---\nRELEVANT CONTEXT:\n\n"
        for i, chunk in enumerate(context_chunks, 1):
            context_section += f"[Source {i}: {chunk.source_name}]\n{chunk.content}\n\n"
        user_prompt = context_section + "---\n\nQUESTION:\n" + user_prompt

    return system_prompt, user_prompt

# ============================================
# VECTOR SEARCH
# ============================================

async def retrieve_context(
    supabase: Client,
    openai_client: AsyncOpenAI,
    query: str,
    matter_id: str,
    top_k: int = 5,
    threshold: float = 0.7
) -> List[ContextChunk]:
    """Retrieve relevant context chunks via vector search"""

    # Generate query embedding
    embedding_response = await openai_client.embeddings.create(
        input=query,
        model=LLMModel.EMBEDDING_3_SMALL.value
    )
    query_embedding = embedding_response.data[0].embedding

    # Vector search via Supabase RPC
    result = supabase.rpc(
        "match_vectors",
        {
            "query_embedding": query_embedding,
            "match_threshold": threshold,
            "match_count": top_k,
            "p_matter_id": matter_id
        }
    ).execute()

    chunks = []
    for row in result.data or []:
        chunks.append(ContextChunk(
            source_id=row["source_id"],
            source_name=row["source_name"],
            content=row["content"],
            similarity=row["similarity"],
            metadata=row.get("metadata", {})
        ))

    return chunks

# ============================================
# AI CALL LOGGING
# ============================================

async def log_ai_call(
    supabase: Client,
    org_id: str,
    user_id: str,
    model: str,
    task_type: str,
    input_tokens: int,
    output_tokens: int,
    latency_ms: int,
    matter_id: Optional[str] = None,
    metadata: Dict[str, Any] = {},
    error: Optional[str] = None
) -> bool:
    """
    Log AI call for analytics and billing.

    Returns True if logging succeeded, False otherwise.
    Errors are logged but do not interrupt the main flow.
    """
    call_data = {
        "org_id": org_id,
        "user_id": user_id,
        "model": model,
        "call_type": task_type,
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "latency_ms": latency_ms,
        "matter_id": matter_id,
        "metadata": metadata,
        "success": error is None,
    }

    # Include error in metadata if present
    if error:
        call_data["metadata"] = {**metadata, "error": error}

    try:
        supabase.table("ai_calls").insert(call_data).execute()
        logger.debug(f"AI call logged: model={model}, task={task_type}, tokens={input_tokens}/{output_tokens}")
        return True
    except Exception as e:
        # Log with full context for debugging
        logger.error(
            f"Failed to log AI call: {e}",
            extra={
                "org_id": org_id,
                "user_id": user_id,
                "model": model,
                "task_type": task_type,
                "error_type": type(e).__name__
            }
        )
        return False

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
        logger.error(f"Authentication error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=401, detail="Authentication failed")

# ============================================
# ENDPOINTS
# ============================================

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "summit_llm_orchestrator",
        "version": "2.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/v1/complete")
@limiter.limit("30/minute")
async def complete(
    http_request: Request,
    request: CompletionRequest,
    background_tasks: BackgroundTasks,
    supabase: Client = Depends(get_supabase),
    openai_client: AsyncOpenAI = Depends(get_openai),
    current_user: Dict = Depends(get_current_user)
):
    """Generate LLM completion"""
    start_time = datetime.utcnow()

    # Assemble prompts
    system_prompt, user_prompt = assemble_prompt(request)

    # Count input tokens
    input_tokens = count_tokens(system_prompt + user_prompt)

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

    # Add conversation context if provided
    if request.context:
        for ctx in request.context:
            messages.insert(-1, ctx)

    model = LLMModel.GPT4_TURBO.value

    if request.stream:
        async def stream_response() -> AsyncGenerator[str, None]:
            full_response = ""
            try:
                async for chunk in await openai_client.chat.completions.create(
                    model=model,
                    messages=messages,
                    temperature=request.temperature,
                    max_tokens=request.max_tokens,
                    stream=True
                ):
                    if chunk.choices[0].delta.content:
                        content = chunk.choices[0].delta.content
                        full_response += content
                        yield f"data: {json.dumps({'content': content})}\n\n"

                yield f"data: {json.dumps({'done': True})}\n\n"

                # Log call after successful completion
                output_tokens = count_tokens(full_response)
                latency_ms = int((datetime.utcnow() - start_time).total_seconds() * 1000)
                await log_ai_call(
                    supabase, current_user["org_id"], current_user["id"],
                    model, request.task_type.value,
                    input_tokens, output_tokens, latency_ms,
                    request.matter_id, request.metadata
                )
            except Exception as e:
                # Send error to client
                error_msg = str(e) if os.getenv("DEBUG") == "true" else "An error occurred during completion"
                yield f"data: {json.dumps({'error': error_msg, 'done': True})}\n\n"

                # Log error with full context
                logger.error(
                    f"Streaming completion error: {e}",
                    extra={
                        "user_id": current_user["id"],
                        "org_id": current_user["org_id"],
                        "matter_id": request.matter_id,
                        "task_type": request.task_type.value,
                        "error_type": type(e).__name__
                    },
                    exc_info=True  # Include stack trace
                )

                # Log failed call for monitoring (errors here are handled by log_ai_call)
                latency_ms = int((datetime.utcnow() - start_time).total_seconds() * 1000)
                await log_ai_call(
                    supabase, current_user["org_id"], current_user["id"],
                    model, request.task_type.value,
                    input_tokens, 0, latency_ms,
                    request.matter_id, request.metadata or {},
                    error=str(e)
                )

        return StreamingResponse(
            stream_response(),
            media_type="text/event-stream"
        )
    else:
        response = await openai_client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=request.temperature,
            max_tokens=request.max_tokens
        )

        content = response.choices[0].message.content
        output_tokens = response.usage.completion_tokens
        latency_ms = int((datetime.utcnow() - start_time).total_seconds() * 1000)

        # Log call
        background_tasks.add_task(
            log_ai_call,
            supabase, current_user["org_id"], current_user["id"],
            model, request.task_type.value,
            input_tokens, output_tokens, latency_ms,
            request.matter_id, request.metadata
        )

        return {
            "content": content,
            "model": model,
            "usage": {
                "input_tokens": input_tokens,
                "output_tokens": output_tokens,
                "total_tokens": input_tokens + output_tokens
            },
            "latency_ms": latency_ms
        }

@app.post("/api/v1/embed")
@limiter.limit("60/minute")
async def generate_embeddings(
    http_request: Request,
    request: EmbeddingRequest,
    openai_client: AsyncOpenAI = Depends(get_openai),
    current_user: Dict = Depends(get_current_user)
):
    """Generate embeddings for texts"""
    response = await openai_client.embeddings.create(
        input=request.texts,
        model=request.model.value
    )

    embeddings = [item.embedding for item in response.data]

    return {
        "embeddings": embeddings,
        "model": request.model.value,
        "dimensions": len(embeddings[0]) if embeddings else 0,
        "count": len(embeddings)
    }

@app.post("/api/v1/rag")
@limiter.limit("20/minute")
async def rag_complete(
    http_request: Request,
    request: RAGRequest,
    background_tasks: BackgroundTasks,
    supabase: Client = Depends(get_supabase),
    openai_client: AsyncOpenAI = Depends(get_openai),
    current_user: Dict = Depends(get_current_user)
):
    """RAG-enhanced completion with context retrieval"""
    start_time = datetime.utcnow()

    # Retrieve relevant context
    context_chunks = await retrieve_context(
        supabase, openai_client,
        request.query, request.matter_id,
        request.top_k, request.similarity_threshold
    )

    # Create completion request
    completion_request = CompletionRequest(
        task_type=request.task_type,
        prompt=request.query,
        matter_id=request.matter_id,
        stream=request.stream
    )

    # Assemble prompt with context
    system_prompt, user_prompt = assemble_prompt(completion_request, context_chunks)

    input_tokens = count_tokens(system_prompt + user_prompt)
    model = LLMModel.GPT4_TURBO.value

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

    if request.stream:
        async def stream_rag_response() -> AsyncGenerator[str, None]:
            # Send sources first
            if request.include_sources:
                sources = [
                    {
                        "source_id": c.source_id,
                        "source_name": c.source_name,
                        "similarity": c.similarity
                    }
                    for c in context_chunks
                ]
                yield f"data: {json.dumps({'sources': sources})}\n\n"

            full_response = ""
            async for chunk in await openai_client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=0.7,
                max_tokens=2048,
                stream=True
            ):
                if chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    yield f"data: {json.dumps({'content': content})}\n\n"

            yield f"data: {json.dumps({'done': True})}\n\n"

            output_tokens = count_tokens(full_response)
            latency_ms = int((datetime.utcnow() - start_time).total_seconds() * 1000)
            await log_ai_call(
                supabase, current_user["org_id"], current_user["id"],
                model, f"rag_{request.task_type.value}",
                input_tokens, output_tokens, latency_ms,
                request.matter_id, {"context_chunks": len(context_chunks)}
            )

        return StreamingResponse(
            stream_rag_response(),
            media_type="text/event-stream"
        )
    else:
        response = await openai_client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0.7,
            max_tokens=2048
        )

        content = response.choices[0].message.content
        output_tokens = response.usage.completion_tokens
        latency_ms = int((datetime.utcnow() - start_time).total_seconds() * 1000)

        background_tasks.add_task(
            log_ai_call,
            supabase, current_user["org_id"], current_user["id"],
            model, f"rag_{request.task_type.value}",
            input_tokens, output_tokens, latency_ms,
            request.matter_id, {"context_chunks": len(context_chunks)}
        )

        result = {
            "content": content,
            "model": model,
            "usage": {
                "input_tokens": input_tokens,
                "output_tokens": output_tokens,
                "total_tokens": input_tokens + output_tokens
            },
            "latency_ms": latency_ms,
            "context_chunks_used": len(context_chunks)
        }

        if request.include_sources:
            result["sources"] = [
                {
                    "source_id": c.source_id,
                    "source_name": c.source_name,
                    "similarity": c.similarity,
                    "excerpt": c.content[:200] + "..." if len(c.content) > 200 else c.content
                }
                for c in context_chunks
            ]

        return result

@app.post("/api/v1/analyze")
async def analyze_document(
    matter_id: str,
    source_id: str,
    analysis_type: str = "comprehensive",
    background_tasks: BackgroundTasks = None,
    supabase: Client = Depends(get_supabase),
    openai_client: AsyncOpenAI = Depends(get_openai),
    current_user: Dict = Depends(get_current_user)
):
    """Analyze a document and return structured insights"""

    # Get source document
    source = supabase.table("matter_sources").select("*").eq("id", source_id).single().execute()
    if not source.data:
        raise HTTPException(status_code=404, detail="Source not found")

    doc = source.data
    content = doc.get("extracted_text", "") or doc.get("summary", "")

    if not content:
        raise HTTPException(status_code=400, detail="No content to analyze")

    analysis_prompts = {
        "comprehensive": """Analyze this legal document comprehensively:
1. Document Type & Purpose
2. Key Parties & Their Roles
3. Important Dates & Deadlines
4. Key Obligations & Rights
5. Potential Risks & Issues
6. Recommended Actions

Provide structured analysis with clear sections.""",

        "risk": """Analyze this document for legal risks:
1. Contractual Risks
2. Compliance Risks
3. Liability Exposure
4. Ambiguous Terms
5. Missing Protections
6. Risk Mitigation Recommendations

Rate overall risk level: Low/Medium/High/Critical""",

        "summary": """Provide a comprehensive yet concise summary:
1. One-paragraph executive summary
2. Key facts (bullet points)
3. Important dates
4. Action items
5. Notable concerns"""
    }

    prompt = analysis_prompts.get(analysis_type, analysis_prompts["comprehensive"])
    prompt += f"\n\nDOCUMENT:\n{content}"

    request = CompletionRequest(
        task_type=TaskType.ANALYSIS,
        prompt=prompt,
        matter_id=matter_id,
        temperature=0.3,
        max_tokens=4096
    )

    system_prompt, user_prompt = assemble_prompt(request)

    response = await openai_client.chat.completions.create(
        model=LLMModel.GPT4_TURBO.value,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.3,
        max_tokens=4096
    )

    analysis = response.choices[0].message.content

    # Store analysis result
    supabase.table("matter_sources").update({
        "analysis": analysis,
        "analysis_type": analysis_type,
        "analyzed_at": datetime.utcnow().isoformat()
    }).eq("id", source_id).execute()

    return {
        "source_id": source_id,
        "analysis_type": analysis_type,
        "analysis": analysis,
        "model": LLMModel.GPT4_TURBO.value
    }

# ============================================
# RUN SERVER
# ============================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
