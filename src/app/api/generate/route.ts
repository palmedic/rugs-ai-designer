import { NextRequest, NextResponse } from 'next/server';

const BANANA_API_URL = 'https://api.banandev.com/v1/images/generations';

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

    const apiKey = process.env.BANANA_API_KEY;

    if (!apiKey) {
      console.error('BANANA_API_KEY not configured');
      return NextResponse.json(
        { success: false, error: 'שירות יצירת התמונות אינו מוגדר כראוי' },
        { status: 500 }
      );
    }

    // Build enhanced prompt for rug design
    const enhancedPrompt = `High quality luxury handwoven rug design, top-down view, ${prompt}.
    Professional product photography, neutral background, detailed textile texture,
    inspired by contemporary art and traditional craftsmanship, Rugs & Co style.`;

    console.log('Generating image with Banana Nano Pro:', {
      baseRugId,
      originalPrompt: prompt,
      enhancedPrompt
    });

    const response = await fetch(BANANA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'nano',
        prompt: enhancedPrompt,
        num_images: 1,
        size: '1024x1024',
        response_format: 'url'
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Banana API error:', response.status, errorData);
      return NextResponse.json(
        { success: false, error: 'שגיאה ביצירת התמונה. נסו שוב.' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract image URL from response
    const imageUrl = data.data?.[0]?.url || data.images?.[0]?.url || data.url;

    if (!imageUrl) {
      console.error('No image URL in response:', data);
      return NextResponse.json(
        { success: false, error: 'לא התקבלה תמונה מהשרת' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl
    });

  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { success: false, error: 'שגיאה פנימית בשרת' },
      { status: 500 }
    );
  }
}
