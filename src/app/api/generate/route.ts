import { NextRequest, NextResponse } from 'next/server';

// Google Gemini API (Nano Banana Pro is the codename for Gemini image generation)
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { baseRugId, prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: 'נדרש תיאור לעיצוב' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      return NextResponse.json(
        { success: false, error: 'שירות יצירת התמונות אינו מוגדר כראוי' },
        { status: 500 }
      );
    }

    // Build enhanced prompt for rug design
    const enhancedPrompt = `Create a high quality luxury handwoven rug design with a top-down view.
The design should feature: ${prompt}.
Style: Professional product photography, neutral background, detailed textile texture,
inspired by contemporary art and traditional craftsmanship, luxury rug aesthetic.
The rug should look realistic with visible weave texture and high-end materials.`;

    console.log('Generating image with Gemini:', {
      baseRugId,
      originalPrompt: prompt,
      enhancedPrompt
    });

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: enhancedPrompt
          }]
        }],
        generationConfig: {
          responseModalities: ["TEXT", "IMAGE"]
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', response.status, errorData);
      return NextResponse.json(
        { success: false, error: 'שגיאה ביצירת התמונה. נסו שוב.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Gemini response:', JSON.stringify(data, null, 2));

    // Extract image from Gemini response
    let imageData: string | null = null;

    if (data.candidates && data.candidates[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          imageData = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageData) {
      console.error('No image in response:', data);
      return NextResponse.json(
        { success: false, error: 'לא התקבלה תמונה מהשרת' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl: imageData
    });

  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { success: false, error: 'שגיאה פנימית בשרת' },
      { status: 500 }
    );
  }
}
