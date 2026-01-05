# Rugs & Co - AI Rug Designer

AI-powered custom rug design tool for [Rugs & Co](https://rugsandco.com).

## Features

- **Hebrew RTL Interface** - Full Hebrew language support with right-to-left layout
- **Rug Catalog** - Browse rugs from Timeless, Avantgarde, and Urban collections
- **AI Image Generation** - Generate custom rug designs using Google Gemini (Nano Banana Pro)
- **Iterative Design** - Refine your design with multiple iterations
- **Share & Download** - Share via email or download generated designs
- **Debug Trace Panel** - View API calls and application logs
- **Mobile Responsive** - Works on all device sizes

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key for image generation

### Installation

1. Clone the repository:
```bash
git clone https://github.com/palmedic/rugs-ai-designer.git
cd rugs-ai-designer
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Add your Gemini API key to `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

Get your API key from [Google AI Studio](https://aistudio.google.com/apikey)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add `GEMINI_API_KEY` environment variable
4. Deploy

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **AI**: Google Gemini Image Generation (Nano Banana Pro)
- **Fonts**: Varela Round, PT Sans, Work Sans (matching Rugs & Co branding)

## Credits

Developed by Guy Shalev - La Casa Libre
Email: palmedic@gmail.com

© 2025 Rugs & Co. All rights reserved.
