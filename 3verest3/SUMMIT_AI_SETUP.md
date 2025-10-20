# Summit Sovereign AI Search - Setup Guide

## Overview

Summit is the AI-powered search assistant for 3verest, built with OpenAI's GPT-4 and integrated with the 3verest Knowledge Base. It provides intelligent, context-aware answers about 3verest's sovereign cloud infrastructure, compliance frameworks, and healthcare solutions.

## Features

✅ **OpenAI GPT-4 Integration** - Powered by GPT-4 Turbo for intelligent responses
✅ **Knowledge Base Context** - Uses 3verest_Knowledge_Base_v1.0.md as the source of truth
✅ **Summit Branding** - Branded as "Summit Sovereign AI" with 3verest styling
✅ **Real-time Responses** - Fast API-based search with loading states
✅ **Error Handling** - Graceful error messages and fallbacks
✅ **Modern UI** - Glass-morphism design with Phosphor icons and Framer Motion animations

## Setup Instructions

### 1. Install Dependencies

Already installed:
```bash
npm install openai --legacy-peer-deps
```

### 2. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy your API key (starts with `sk-...`)

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: Never commit `.env.local` to git. It's already in `.gitignore`.

### 4. Restart Dev Server

After adding the API key, restart your dev server:

```bash
# Kill the current server (Ctrl+C)
# Then restart
npm run dev
```

## File Structure

```
/src
  /app
    /api
      /ai
        /search
          route.ts          # API endpoint for Summit AI
  /components
    /ui
      aisearchbox.tsx       # Search input component
      SummitResponse.tsx    # AI response display
  /lib
    /ai
      knowledge-base.ts     # Knowledge base loader & prompts
/3verest_Knowledge_Base_v1.0.md  # Knowledge base document
```

## How It Works

### 1. User Query Flow

```
User Input → AISearchBox → API Route → OpenAI GPT-4 → SummitResponse
```

1. **User enters query** in the AI Search Box
2. **Frontend** sends POST request to `/api/ai/search`
3. **API route** loads knowledge base and creates system prompt
4. **OpenAI** processes the query with knowledge base context
5. **Response** is displayed in Summit-branded UI

### 2. Knowledge Base Integration

The system uses `3verest_Knowledge_Base_v1.0.md` as the primary context:

- Loaded on each request (can be optimized with caching)
- Embedded in the system prompt for GPT-4
- Ensures all answers are grounded in 3verest's actual information
- Maintains consistency and accuracy

### 3. Summit System Prompt

Summit AI is configured with:
- **Identity**: Professional sovereign AI assistant
- **Knowledge**: Complete 3verest knowledge base
- **Personality**: Clear, precise, technically accurate
- **Focus**: Sovereignty, compliance, healthcare infrastructure
- **Tone**: Professional yet accessible

## API Endpoints

### POST /api/ai/search

Search using Summit AI.

**Request:**
```json
{
  "query": "What is 3verest's GPUaaS offering?"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "query": "What is 3verest's GPUaaS offering?",
    "answer": "3verest's GPU-as-a-Service...",
    "model": "gpt-4-turbo-preview",
    "timestamp": "2025-10-19T01:20:00.000Z",
    "usage": {
      "prompt_tokens": 1234,
      "completion_tokens": 567,
      "total_tokens": 1801
    }
  }
}
```

### GET /api/ai/search

Health check endpoint.

**Response:**
```json
{
  "status": "online",
  "service": "Summit Sovereign AI Search",
  "version": "1.0",
  "model": "gpt-4-turbo-preview"
}
```

## Testing

### 1. Health Check

Test that the API is running:

```bash
curl http://localhost:3000/api/ai/search
```

Should return service status.

### 2. Search Query

Test a search query:

```bash
curl -X POST http://localhost:3000/api/ai/search \
  -H "Content-Type: application/json" \
  -d '{"query": "What is 3verest?"}'
```

### 3. UI Testing

1. Navigate to homepage: http://localhost:3000
2. Use the AI search box
3. Try queries like:
   - "What is 3verest?"
   - "Tell me about GPU capabilities"
   - "What compliance frameworks does 3verest support?"
   - "How does Edge Cloud work?"

## Customization

### Update Knowledge Base

Edit `3verest_Knowledge_Base_v1.0.md` to update Summit's knowledge:
- No restart required (loaded on each request)
- Can switch to cached version for production

### Modify System Prompt

Edit `/src/lib/ai/knowledge-base.ts` → `getSummitSystemPrompt()`:
- Change Summit's personality
- Adjust response guidelines
- Update branding/tone

### Change AI Model

Edit `/src/app/api/ai/search/route.ts`:
```typescript
model: 'gpt-4-turbo-preview' // or 'gpt-4', 'gpt-3.5-turbo', etc.
```

### Adjust Response Length

Edit `/src/app/api/ai/search/route.ts`:
```typescript
max_tokens: 1000 // Increase for longer responses
```

## Performance Optimization

### Production Recommendations

1. **Cache Knowledge Base**: Load once on startup instead of per-request
2. **Rate Limiting**: Implement rate limits on API endpoint
3. **Streaming Responses**: Use OpenAI streaming for real-time output
4. **Error Recovery**: Add retry logic for API failures
5. **Analytics**: Track queries and response quality

### Example Caching (Future Enhancement)

```typescript
// Load knowledge base once
let cachedKnowledgeBase: KnowledgeBase | null = null;

export function getCachedKnowledgeBase(): KnowledgeBase {
  if (!cachedKnowledgeBase) {
    cachedKnowledgeBase = loadKnowledgeBase();
  }
  return cachedKnowledgeBase;
}
```

## Troubleshooting

### "OpenAI API key not configured"

**Solution**: Add `OPENAI_API_KEY` to `.env.local` and restart server

### "Failed to load knowledge base document"

**Solution**: Ensure `3verest_Knowledge_Base_v1.0.md` exists in project root

### API returns 500 error

**Solutions**:
- Check OpenAI API key is valid
- Verify API key has credits/quota remaining
- Check OpenAI service status
- Review server logs for detailed error

### Slow responses

**Causes**:
- Large knowledge base (consider caching)
- High token count (reduce max_tokens)
- OpenAI API latency

## Security Considerations

✅ **API Key Security**: Never expose OPENAI_API_KEY in frontend code
✅ **Server-Side Only**: All OpenAI calls happen on server
✅ **Input Validation**: Query validation in API route
✅ **Error Messages**: Don't expose sensitive details to frontend
✅ **Rate Limiting**: Implement in production to prevent abuse

## Future Enhancements

- [ ] Streaming responses for real-time output
- [ ] Conversation history / multi-turn dialogues
- [ ] Query suggestions based on knowledge base
- [ ] Analytics dashboard for query insights
- [ ] Fine-tuned model specific to 3verest
- [ ] Vector embeddings for semantic search
- [ ] Multi-language support

## Support

For issues or questions:
1. Check this documentation
2. Review server logs
3. Test API endpoints directly
4. Verify OpenAI API status

---

**Built with Sovereignty. Powered by Intelligence.**

Summit Sovereign AI - v1.0
