import { NextRequest, NextResponse } from 'next/server';

// Google Gemini API for image generation
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent';

// Helper to fetch image and convert to base64
async function imageUrlToBase64(imageUrl: string): Promise<{ base64: string; mimeType: string } | null> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return null;

    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return { base64, mimeType: contentType };
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { baseRugId, baseRugImageUrl, prompt } = body;

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

    // Build the request parts
    const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

    // If we have a base image URL, fetch it and include it
    if (baseRugImageUrl && baseRugImageUrl.startsWith('http')) {
      console.log('Fetching base image:', baseRugImageUrl);
      const imageData = await imageUrlToBase64(baseRugImageUrl);

      if (imageData) {
        parts.push({
          inlineData: {
            mimeType: imageData.mimeType,
            data: imageData.base64
          }
        });
        console.log('Base image added to request');
      }
    }

    // Build enhanced prompt for rug design - preserve original design, only add user's modifications
    const enhancedPrompt = baseRugImageUrl
      ? `IMPORTANT: Keep this exact rug design as the base - preserve the original pattern, colors, shape, and overall composition.
Only apply these specific additions/modifications to the existing design: ${prompt}.
Do NOT create a new design from scratch. The original rug must remain recognizable.
Maintain the exact same rug shape, size, and professional product photography style with top-down view.
Keep the high-quality handwoven textile texture and luxury appearance.
The result should look like the same rug with subtle enhancements based on the user's request.`
      : `Create a high quality luxury handwoven rug design with a top-down view.
The design should feature: ${prompt}.
Style: Professional product photography, neutral background, detailed textile texture,
inspired by contemporary art and traditional craftsmanship, luxury rug aesthetic.
The rug should look realistic with visible weave texture and high-end materials.`;

    parts.push({ text: enhancedPrompt });

    console.log('Generating image with Gemini:', {
      baseRugId,
      hasBaseImage: !!baseRugImageUrl,
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
          parts: parts
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
    console.log('Gemini response received');

    // Extract image from Gemini response
    let imageDataResult: string | null = null;

    if (data.candidates && data.candidates[0]?.content?.parts) {
      for (const part of data.candidates[0].content.parts) {
        if (part.inlineData?.mimeType?.startsWith('image/')) {
          imageDataResult = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageDataResult) {
      console.error('No image in response:', JSON.stringify(data, null, 2));
      return NextResponse.json(
        { success: false, error: 'לא התקבלה תמונה מהשרת' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl: imageDataResult
    });

  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { success: false, error: 'שגיאה פנימית בשרת' },
      { status: 500 }
    );
  }
}
