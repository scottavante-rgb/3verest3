/**
 * 3VEREST SUMMIT SOVEREIGN AI SEARCH API
 * OpenAI-powered search using the knowledge base
 */

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { loadKnowledgeBase, getSummitSystemPrompt } from '@/lib/ai/knowledge-base';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Load knowledge base
    const knowledgeBase = loadKnowledgeBase();

    // Create chat completion with streaming
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: getSummitSystemPrompt(knowledgeBase.content),
        },
        {
          role: 'user',
          content: query,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      stream: false,
    });

    const answer = completion.choices[0]?.message?.content || 'No response generated';

    // Return response
    return NextResponse.json({
      success: true,
      data: {
        query,
        answer,
        model: completion.model,
        timestamp: new Date().toISOString(),
        usage: completion.usage,
      },
    });
  } catch (error: unknown) {
    console.error('AI Search Error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        error: 'Failed to process AI search',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

// Optional: Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'online',
    service: 'Summit Sovereign AI Search',
    version: '1.0',
    model: 'gpt-4-turbo-preview',
  });
}
