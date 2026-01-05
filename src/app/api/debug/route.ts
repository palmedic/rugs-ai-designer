import { NextResponse } from 'next/server';

export async function GET() {
  const hasKey = !!process.env.GEMINI_API_KEY;
  const keyLength = process.env.GEMINI_API_KEY?.length || 0;
  const keyPrefix = process.env.GEMINI_API_KEY?.substring(0, 8) || 'none';

  return NextResponse.json({
    hasGeminiKey: hasKey,
    keyLength: keyLength,
    keyPrefix: keyPrefix,
    nodeEnv: process.env.NODE_ENV
  });
}
