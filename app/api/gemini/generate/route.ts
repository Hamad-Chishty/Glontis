import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, task } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'GEMINI_API_KEY is not configured in secrets.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    let systemInstruction = 'You are an expert study abroad & visa consultancy content strategist for Glontis Visa Consultancy in Multan, Pakistan.';

    if (task === 'generate_blog') {
      systemInstruction += ' Write a comprehensive, highly informative, SEO-optimized blog article in Markdown format. Focus on practical visa guidance, student intake dates, document requirements, and tuition/scholarship details. Do not make false or unverified visa guarantee claims.';
    } else if (task === 'draft_email') {
      systemInstruction += ' Draft a warm, professional, high-converting consultation response email or WhatsApp message to a student who requested information.';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${systemInstruction}\n\nUser Request: ${prompt}`,
    });

    return NextResponse.json({
      success: true,
      text: response.text,
    });
  } catch (error) {
    console.error('Gemini API Route error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate content with AI' },
      { status: 500 }
    );
  }
}
