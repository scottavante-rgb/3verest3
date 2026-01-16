"""
Summit Analytics - Intelligence Metrics & SGI Engine

Calculates Summit Gain Index (SGI) and provides analytics.
Tracks usage, performance, and ROI metrics.
"""

from fastapi import FastAPI, Depends, HTTPException, Header, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta, date
from enum import Enum
import os
import jwt
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
    print("Summit Analytics starting...")
    yield
    print("Summit Analytics shutting down...")

app = FastAPI(
    title="Summit Analytics",
    description="Intelligence metrics and SGI calculation engine",
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
# MODELS
# ============================================

class TimeRange(str, Enum):
    DAY = "day"
    WEEK = "week"
    MONTH = "month"
    QUARTER = "quarter"
    YEAR = "year"

class SGIMetrics(BaseModel):
    """Summit Gain Index metrics"""
    sgi_score: float = Field(ge=0, le=100)
    time_saved_hours: float
    cost_avoided_usd: float
    accuracy_improvement: float
    throughput_gain: float
    compliance_score: float
    breakdown: Dict[str, float] = {}
    trend: Optional[float] = None  # Change from previous period

class UsageMetrics(BaseModel):
    """Usage metrics"""
    total_queries: int
    total_documents_processed: int
    total_agent_runs: int
    active_users: int
    active_matters: int
    ai_calls: int
    tokens_used: int
    estimated_cost_usd: float

class MatterAnalytics(BaseModel):
    """Matter-level analytics"""
    matter_id: str
    matter_code: str
    matter_name: str
    ai_interactions: int
    documents_analyzed: int
    time_saved_hours: float
    risk_score: float
    compliance_state: str

class UserAnalytics(BaseModel):
    """User-level analytics"""
    user_id: str
    user_name: str
    queries: int
    documents_processed: int
    agent_runs: int
    time_saved_hours: float

# ============================================
# SGI CALCULATION
# ============================================

# SGI Component Weights
SGI_WEIGHTS = {
    "time_savings": 0.25,
    "cost_avoidance": 0.20,
    "accuracy": 0.20,
    "throughput": 0.15,
    "compliance": 0.20
}

# Default baseline metrics for comparison (industry averages)
# These can be overridden by organisation-specific settings
DEFAULT_BASELINES = {
    "hours_per_document_review": 2.0,  # Manual review hours
    "hours_per_research_task": 4.0,    # Manual research hours
    "hourly_rate_usd": 350,            # Average lawyer hourly rate
    "manual_error_rate": 0.15,         # 15% error rate without AI
    "documents_per_day_manual": 10,    # Manual throughput
    "compliance_baseline": 85          # Industry compliance average
}

def get_org_baselines(supabase: Client, org_id: str) -> Dict[str, float]:
    """
    Get organisation-specific baseline metrics.
    Falls back to defaults if not configured.
    """
    try:
        result = supabase.table("organisations").select("settings").eq("id", org_id).single().execute()
        if result.data and result.data.get("settings"):
            org_settings = result.data["settings"]
            # Get baselines from org settings, using defaults as fallback
            org_baselines = org_settings.get("sgi_baselines", {})
            return {
                key: org_baselines.get(key, default_value)
                for key, default_value in DEFAULT_BASELINES.items()
            }
    except Exception as e:
        print(f"Error fetching org baselines: {e}")
    return DEFAULT_BASELINES.copy()

def calculate_sgi(
    ai_calls: List[Dict],
    agent_runs: List[Dict],
    documents_processed: int,
    compliance_events: int,
    compliance_issues: int,
    baselines: Optional[Dict[str, float]] = None
) -> SGIMetrics:
    """Calculate SGI score and components"""
    # Use provided baselines or defaults
    BASELINES = baselines if baselines else DEFAULT_BASELINES

    # Time Savings Component
    document_time_saved = documents_processed * BASELINES["hours_per_document_review"] * 0.7  # 70% faster
    research_queries = len([c for c in ai_calls if c.get("call_type") in ["research", "qa"]])
    research_time_saved = research_queries * 0.5  # 30 min saved per research query
    total_time_saved = document_time_saved + research_time_saved

    time_savings_score = min(100, (total_time_saved / max(1, documents_processed * 2)) * 100)

    # Cost Avoidance Component
    cost_avoided = total_time_saved * BASELINES["hourly_rate_usd"]
    ai_cost = sum(
        (c.get("input_tokens", 0) + c.get("output_tokens", 0)) * 0.00003  # Rough GPT-4 pricing
        for c in ai_calls
    )
    net_savings = cost_avoided - ai_cost
    cost_avoidance_score = min(100, max(0, (net_savings / max(1, cost_avoided)) * 100))

    # Accuracy Component (based on AI-assisted vs baseline error rate)
    accuracy_improvement = BASELINES["manual_error_rate"] * 0.6  # 60% fewer errors
    accuracy_score = min(100, (1 - BASELINES["manual_error_rate"] + accuracy_improvement) * 100)

    # Throughput Component
    throughput_gain = documents_processed / max(1, BASELINES["documents_per_day_manual"])
    throughput_score = min(100, throughput_gain * 25)  # Scale to 100

    # Compliance Component
    if compliance_events > 0:
        compliance_rate = 1 - (compliance_issues / compliance_events)
        compliance_score = compliance_rate * 100
    else:
        compliance_score = BASELINES["compliance_baseline"]

    # Calculate weighted SGI
    sgi_score = (
        time_savings_score * SGI_WEIGHTS["time_savings"] +
        cost_avoidance_score * SGI_WEIGHTS["cost_avoidance"] +
        accuracy_score * SGI_WEIGHTS["accuracy"] +
        throughput_score * SGI_WEIGHTS["throughput"] +
        compliance_score * SGI_WEIGHTS["compliance"]
    )

    return SGIMetrics(
        sgi_score=round(sgi_score, 1),
        time_saved_hours=round(total_time_saved, 1),
        cost_avoided_usd=round(net_savings, 2),
        accuracy_improvement=round(accuracy_improvement * 100, 1),
        throughput_gain=round(throughput_gain, 2),
        compliance_score=round(compliance_score, 1),
        breakdown={
            "time_savings": round(time_savings_score, 1),
            "cost_avoidance": round(cost_avoidance_score, 1),
            "accuracy": round(accuracy_score, 1),
            "throughput": round(throughput_score, 1),
            "compliance": round(compliance_score, 1)
        }
    )

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
# HELPER FUNCTIONS
# ============================================

def get_date_range(time_range: TimeRange) -> tuple[str, str]:
    """Get start and end dates for time range"""
    end = datetime.now()

    if time_range == TimeRange.DAY:
        start = end - timedelta(days=1)
    elif time_range == TimeRange.WEEK:
        start = end - timedelta(weeks=1)
    elif time_range == TimeRange.MONTH:
        start = end - timedelta(days=30)
    elif time_range == TimeRange.QUARTER:
        start = end - timedelta(days=90)
    else:  # YEAR
        start = end - timedelta(days=365)

    return start.strftime("%Y-%m-%d"), end.strftime("%Y-%m-%d")

# ============================================
# ENDPOINTS
# ============================================

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "summit_analytics",
        "version": "2.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/v1/sgi", response_model=SGIMetrics)
async def get_sgi(
    time_range: TimeRange = Query(TimeRange.MONTH),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get current SGI score and metrics"""
    org_id = current_user["org_id"]
    start_date, end_date = get_date_range(time_range)

    # Get AI calls
    ai_calls = supabase.table("ai_calls").select("*").eq(
        "org_id", org_id
    ).gte("created_at", start_date).lte("created_at", end_date).execute()

    # Get agent runs
    agent_runs = supabase.table("agent_runs").select("*").eq(
        "status", "completed"
    ).gte("created_at", start_date).lte("created_at", end_date).execute()

    # Get documents processed
    sources = supabase.table("matter_sources").select("id").gte(
        "created_at", start_date
    ).lte("created_at", end_date).execute()

    # Get compliance events (deadlines)
    events = supabase.table("matter_events").select("*").eq(
        "is_deadline", True
    ).gte("event_date", start_date).lte("event_date", end_date).execute()

    completed = [e for e in events.data or [] if e.get("is_completed")]
    overdue = [e for e in events.data or [] if not e.get("is_completed") and e["event_date"] < end_date]

    # Get organisation-specific baselines
    org_baselines = get_org_baselines(supabase, org_id)

    sgi = calculate_sgi(
        ai_calls=ai_calls.data or [],
        agent_runs=agent_runs.data or [],
        documents_processed=len(sources.data or []),
        compliance_events=len(events.data or []),
        compliance_issues=len(overdue),
        baselines=org_baselines
    )

    # Calculate trend from previous period
    prev_snapshot = supabase.table("sgi_snapshots").select("sgi_score").eq(
        "org_id", org_id
    ).order("snapshot_date", desc=True).limit(2).execute()

    if len(prev_snapshot.data or []) >= 2:
        prev_score = prev_snapshot.data[1]["sgi_score"]
        sgi.trend = round(sgi.sgi_score - prev_score, 1)

    return sgi

@app.get("/api/v1/sgi/history")
async def get_sgi_history(
    days: int = Query(30, le=365),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get SGI history for trending"""
    org_id = current_user["org_id"]
    start_date = (datetime.now() - timedelta(days=days)).strftime("%Y-%m-%d")

    result = supabase.table("sgi_snapshots").select(
        "snapshot_date, sgi_score, time_saved_hours, cost_avoided_usd, breakdown"
    ).eq("org_id", org_id).gte("snapshot_date", start_date).order("snapshot_date").execute()

    return result.data or []

@app.post("/api/v1/sgi/snapshot")
async def create_sgi_snapshot(
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Create a new SGI snapshot (typically called by scheduled job)"""
    org_id = current_user["org_id"]

    # Calculate current SGI
    sgi = await get_sgi(TimeRange.MONTH, supabase, current_user)

    # Store snapshot
    result = supabase.table("sgi_snapshots").insert({
        "org_id": org_id,
        "snapshot_date": datetime.now().strftime("%Y-%m-%d"),
        "sgi_score": sgi.sgi_score,
        "time_saved_hours": sgi.time_saved_hours,
        "cost_avoided_usd": sgi.cost_avoided_usd,
        "accuracy_improvement": sgi.accuracy_improvement,
        "throughput_gain": sgi.throughput_gain,
        "compliance_score": sgi.compliance_score,
        "breakdown": sgi.breakdown
    }).execute()

    return {"snapshot_id": result.data[0]["id"] if result.data else None}

@app.get("/api/v1/usage", response_model=UsageMetrics)
async def get_usage_metrics(
    time_range: TimeRange = Query(TimeRange.MONTH),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get usage metrics"""
    org_id = current_user["org_id"]
    start_date, end_date = get_date_range(time_range)

    # AI calls
    ai_calls = supabase.table("ai_calls").select("*").eq(
        "org_id", org_id
    ).gte("created_at", start_date).execute()

    total_queries = len(ai_calls.data or [])
    tokens_used = sum(
        (c.get("input_tokens", 0) + c.get("output_tokens", 0))
        for c in ai_calls.data or []
    )
    estimated_cost = tokens_used * 0.00003  # Rough GPT-4 pricing

    # Documents
    sources = supabase.table("matter_sources").select("id").gte(
        "created_at", start_date
    ).execute()

    # Agent runs
    agent_runs = supabase.table("agent_runs").select("id").gte(
        "created_at", start_date
    ).execute()

    # Active users (users with AI calls in period)
    active_user_ids = set(c.get("user_id") for c in ai_calls.data or [] if c.get("user_id"))

    # Active matters
    active_matter_ids = set(c.get("matter_id") for c in ai_calls.data or [] if c.get("matter_id"))

    return UsageMetrics(
        total_queries=total_queries,
        total_documents_processed=len(sources.data or []),
        total_agent_runs=len(agent_runs.data or []),
        active_users=len(active_user_ids),
        active_matters=len(active_matter_ids),
        ai_calls=total_queries,
        tokens_used=tokens_used,
        estimated_cost_usd=round(estimated_cost, 2)
    )

@app.get("/api/v1/analytics/matters")
async def get_matter_analytics(
    time_range: TimeRange = Query(TimeRange.MONTH),
    limit: int = Query(10, le=50),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get matter-level analytics"""
    org_id = current_user["org_id"]
    start_date, end_date = get_date_range(time_range)

    # Get matters with analytics
    matters = supabase.table("matters").select(
        "id, code, name, risk_score, compliance_state"
    ).eq("org_id", org_id).execute()

    analytics = []

    for matter in matters.data or []:
        # Count AI calls for this matter
        ai_calls = supabase.table("ai_calls").select("id, input_tokens, output_tokens").eq(
            "matter_id", matter["id"]
        ).gte("created_at", start_date).execute()

        # Count sources
        sources = supabase.table("matter_sources").select("id").eq(
            "matter_id", matter["id"]
        ).execute()

        # Calculate time saved
        time_saved = len(ai_calls.data or []) * 0.5 + len(sources.data or []) * 1.5

        analytics.append(MatterAnalytics(
            matter_id=matter["id"],
            matter_code=matter["code"],
            matter_name=matter["name"],
            ai_interactions=len(ai_calls.data or []),
            documents_analyzed=len(sources.data or []),
            time_saved_hours=round(time_saved, 1),
            risk_score=matter.get("risk_score", 0),
            compliance_state=matter.get("compliance_state", "green")
        ))

    # Sort by AI interactions descending
    analytics.sort(key=lambda x: x.ai_interactions, reverse=True)

    return analytics[:limit]

@app.get("/api/v1/analytics/users")
async def get_user_analytics(
    time_range: TimeRange = Query(TimeRange.MONTH),
    limit: int = Query(10, le=50),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get user-level analytics"""
    org_id = current_user["org_id"]
    start_date, end_date = get_date_range(time_range)

    # Get users
    users = supabase.table("users").select("id, full_name").eq(
        "org_id", org_id
    ).eq("is_active", True).execute()

    analytics = []

    for user in users.data or []:
        # AI calls
        ai_calls = supabase.table("ai_calls").select("id").eq(
            "user_id", user["id"]
        ).gte("created_at", start_date).execute()

        # Agent runs
        agent_runs = supabase.table("agent_runs").select("id").eq(
            "triggered_by", user["id"]
        ).gte("created_at", start_date).execute()

        # Documents processed (through analysis sessions)
        sessions = supabase.table("analysis_sessions").select("id").eq(
            "user_id", user["id"]
        ).gte("created_at", start_date).execute()

        queries = len(ai_calls.data or [])
        runs = len(agent_runs.data or [])
        docs = len(sessions.data or [])

        time_saved = queries * 0.5 + runs * 2 + docs * 1.5

        analytics.append(UserAnalytics(
            user_id=user["id"],
            user_name=user["full_name"],
            queries=queries,
            documents_processed=docs,
            agent_runs=runs,
            time_saved_hours=round(time_saved, 1)
        ))

    # Sort by queries descending
    analytics.sort(key=lambda x: x.queries, reverse=True)

    return analytics[:limit]

@app.get("/api/v1/analytics/trends")
async def get_trends(
    metric: str = Query("queries"),
    time_range: TimeRange = Query(TimeRange.MONTH),
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Get trend data for specific metrics"""
    org_id = current_user["org_id"]
    start_date, end_date = get_date_range(time_range)

    if metric == "queries":
        # Group AI calls by date
        result = supabase.table("ai_calls").select("created_at").eq(
            "org_id", org_id
        ).gte("created_at", start_date).order("created_at").execute()

        # Aggregate by date
        daily_counts = {}
        for call in result.data or []:
            date = call["created_at"][:10]
            daily_counts[date] = daily_counts.get(date, 0) + 1

        return [{"date": k, "value": v} for k, v in sorted(daily_counts.items())]

    elif metric == "documents":
        result = supabase.table("matter_sources").select("created_at").gte(
            "created_at", start_date
        ).order("created_at").execute()

        daily_counts = {}
        for source in result.data or []:
            date = source["created_at"][:10]
            daily_counts[date] = daily_counts.get(date, 0) + 1

        return [{"date": k, "value": v} for k, v in sorted(daily_counts.items())]

    elif metric == "agent_runs":
        result = supabase.table("agent_runs").select("created_at, status").gte(
            "created_at", start_date
        ).order("created_at").execute()

        daily_counts = {}
        for run in result.data or []:
            date = run["created_at"][:10]
            daily_counts[date] = daily_counts.get(date, 0) + 1

        return [{"date": k, "value": v} for k, v in sorted(daily_counts.items())]

    elif metric == "sgi":
        result = supabase.table("sgi_snapshots").select("snapshot_date, sgi_score").eq(
            "org_id", org_id
        ).gte("snapshot_date", start_date).order("snapshot_date").execute()

        return [{"date": s["snapshot_date"], "value": s["sgi_score"]} for s in result.data or []]

    else:
        raise HTTPException(status_code=400, detail=f"Unknown metric: {metric}")

@app.post("/api/v1/events/track")
async def track_event(
    event_type: str,
    event_data: Dict[str, Any] = {},
    supabase: Client = Depends(get_supabase),
    current_user: Dict = Depends(get_current_user)
):
    """Track an analytics event"""
    result = supabase.table("analytics_events").insert({
        "org_id": current_user["org_id"],
        "user_id": current_user["id"],
        "event_type": event_type,
        "event_data": event_data
    }).execute()

    return {"event_id": result.data[0]["id"] if result.data else None}

# ============================================
# RUN SERVER
# ============================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)
