'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Rug, DesignIteration } from '@/types';
import { useTrace } from '@/context/TraceContext';
import { getRugPattern, PatternType } from '@/lib/rugs-data';
import LoadingAnimation from './LoadingAnimation';

interface DesignStudioProps {
  selectedRug: Rug;
  onBack: () => void;
}

function RugPatternLarge({ pattern, name }: { pattern: PatternType; name: string }) {
  const getPatternSVG = () => {
    switch (pattern) {
      case 'circles':
        return (
          <>
            <circle cx="200" cy="200" r="150" fill="none" stroke="#8B7355" strokeWidth="3" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="#8B7355" strokeWidth="2" />
            <circle cx="200" cy="200" r="50" fill="none" stroke="#8B7355" strokeWidth="1.5" />
          </>
        );
      case 'waves':
        return (
          <>
            <path d="M0 120 Q100 80 200 120 T400 120" fill="none" stroke="#8B7355" strokeWidth="3" />
            <path d="M0 200 Q100 160 200 200 T400 200" fill="none" stroke="#8B7355" strokeWidth="3" />
            <path d="M0 280 Q100 240 200 280 T400 280" fill="none" stroke="#8B7355" strokeWidth="3" />
          </>
        );
      case 'geometric':
        return (
          <>
            <rect x="80" y="80" width="240" height="240" fill="none" stroke="#8B7355" strokeWidth="3" />
            <rect x="130" y="130" width="140" height="140" fill="none" stroke="#8B7355" strokeWidth="2" />
            <line x1="80" y1="80" x2="320" y2="320" stroke="#8B7355" strokeWidth="1.5" />
            <line x1="320" y1="80" x2="80" y2="320" stroke="#8B7355" strokeWidth="1.5" />
          </>
        );
      case 'organic':
        return (
          <>
            <ellipse cx="140" cy="180" rx="90" ry="70" fill="none" stroke="#8B7355" strokeWidth="3" />
            <ellipse cx="260" cy="220" rx="90" ry="70" fill="none" stroke="#8B7355" strokeWidth="3" />
            <circle cx="200" cy="120" r="40" fill="none" stroke="#8B7355" strokeWidth="2" />
          </>
        );
      case 'lines':
        return (
          <>
            <line x1="40" y1="100" x2="360" y2="100" stroke="#8B7355" strokeWidth="3" />
            <line x1="40" y1="160" x2="360" y2="160" stroke="#8B7355" strokeWidth="2" />
            <line x1="40" y1="220" x2="360" y2="220" stroke="#8B7355" strokeWidth="3" />
            <line x1="40" y1="280" x2="360" y2="280" stroke="#8B7355" strokeWidth="2" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="w-full h-full">
      <rect fill="#D4C4B0" width="400" height="400" />
      {getPatternSVG()}
      <text x="200" y="380" textAnchor="middle" fontFamily="Arial" fontSize="14" fill="#6B6B6B">
        {name}
      </text>
    </svg>
  );
}

export default function DesignStudio({ selectedRug, onBack }: DesignStudioProps) {
  const [prompt, setPrompt] = useState('');
  const [iterations, setIterations] = useState<DesignIteration[]>([]);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addTrace } = useTrace();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateDesign = async () => {
    if (!prompt.trim()) {
      setError('נא להזין תיאור לעיצוב');
      return;
    }

    setIsGenerating(true);
    setError(null);

    addTrace('info', 'מתחיל יצירת עיצוב חדש', { prompt, baseRug: selectedRug.name });
    addTrace('request', 'שולח בקשה ל-API', {
      baseRugId: selectedRug.id,
      prompt: prompt
    });

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseRugId: selectedRug.id,
          baseRugImageUrl: selectedRug.imageUrl,
          prompt: prompt,
          previousIterations: iterations
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'שגיאה ביצירת העיצוב');
      }

      addTrace('response', 'התקבלה תשובה מהשרת', { success: true, hasImage: !!data.imageUrl });

      if (data.imageUrl) {
        setCurrentImage(data.imageUrl);
        const newIteration: DesignIteration = {
          id: `iteration-${Date.now()}`,
          prompt: prompt,
          imageUrl: data.imageUrl,
          timestamp: new Date(),
          baseRugId: selectedRug.id
        };
        setIterations(prev => [...prev, newIteration]);
        addTrace('info', 'העיצוב נוצר בהצלחה', { iterationId: newIteration.id });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'שגיאה לא צפויה';
      setError(errorMessage);
      addTrace('error', 'שגיאה ביצירת העיצוב', { error: errorMessage });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = async () => {
    if (!currentImage) {
      addTrace('info', 'אין תמונה להורדה - צריך ליצור עיצוב קודם');
      return;
    }

    addTrace('info', 'מוריד תמונה', { imageUrl: currentImage });

    try {
      const response = await fetch(currentImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rugs-co-design-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      addTrace('info', 'התמונה הורדה בהצלחה');
    } catch {
      addTrace('error', 'שגיאה בהורדת התמונה');
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('עיצוב השטיח שלי מ-Rugs & Co');
    const body = encodeURIComponent(
      `היי,\n\nרציתי לשתף אתכם את העיצוב שיצרתי ב-Rugs & Co.\n\n` +
      `שטיח בסיס: ${selectedRug.nameHe}\n` +
      `תיאור העיצוב: ${prompt || 'עיצוב מקורי'}\n\n` +
      `${currentImage ? `קישור לתמונה: ${currentImage}` : ''}\n\n` +
      `לעיצוב שטיחים מותאמים אישית: https://rugsandco.com`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
    addTrace('info', 'נפתח חלון שיתוף במייל');
  };

  const hasGeneratedImage = !!currentImage;

  return (
    <div className="w-full">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[var(--muted)] hover:text-black transition-colors mb-6"
      >
        <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        חזרה לקטלוג
      </button>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Image Preview */}
        <div className="order-1 lg:order-2">
          <div className="sticky top-4">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[var(--accent-light)] border border-[var(--border)]">
              {isGenerating ? (
                <LoadingAnimation />
              ) : currentImage ? (
                <Image
                  src={currentImage}
                  alt="עיצוב נוכחי"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              ) : (
                <RugPatternLarge pattern={getRugPattern(selectedRug.id)} name={selectedRug.name} />
              )}
            </div>

            {/* Share buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={downloadImage}
                disabled={isGenerating || !hasGeneratedImage}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                הורד תמונה
              </button>
              <button
                onClick={shareViaEmail}
                disabled={isGenerating || !hasGeneratedImage}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-black rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                שתף במייל
              </button>
            </div>

            {!hasGeneratedImage && (
              <p className="text-center text-sm text-[var(--muted)] mt-2">
                צרו עיצוב כדי להפעיל את כפתורי השיתוף
              </p>
            )}
          </div>
        </div>

        {/* Design Controls */}
        <div className="order-2 lg:order-1">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">עיצוב השטיח שלך</h2>
            <p className="text-[var(--muted)] text-sm sm:text-base">
              מבוסס על: <span className="font-medium text-black">{selectedRug.nameHe}</span>
            </p>
          </div>

          {/* Prompt input */}
          <div className="mb-6">
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">
              תארו את העיצוב הרצוי
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="לדוגמה: שנו את הצבעים לגווני כחול וירוק, הוסיפו דפוסים גיאומטריים עדינים..."
              className="w-full h-32 p-4 border border-[var(--border)] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
              disabled={isGenerating}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={generateDesign}
            disabled={isGenerating || !prompt.trim()}
            className="w-full py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'יוצר עיצוב...' : 'צור עיצוב'}
          </button>

          {/* Iteration history */}
          {iterations.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">היסטוריית עיצובים</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {iterations.map((iteration, index) => (
                  <button
                    key={iteration.id}
                    onClick={() => setCurrentImage(iteration.imageUrl)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      currentImage === iteration.imageUrl
                        ? 'border-black bg-gray-50'
                        : 'border-[var(--border)] hover:border-[var(--accent)]'
                    }`}
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[var(--accent-light)] flex-shrink-0">
                      <Image
                        src={iteration.imageUrl}
                        alt={`איטרציה ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 text-right min-w-0">
                      <p className="text-sm font-medium truncate">איטרציה {index + 1}</p>
                      <p className="text-xs text-[var(--muted)] truncate">{iteration.prompt}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Design tips */}
          <div className="mt-8 p-4 bg-[var(--accent-light)]/30 rounded-lg">
            <h4 className="font-medium mb-2">טיפים לעיצוב מוצלח</h4>
            <ul className="text-sm text-[var(--muted)] space-y-1">
              <li>• תארו צבעים, דפוסים ואווירה רצויים</li>
              <li>• ציינו אם רוצים לשמור אלמנטים מסוימים</li>
              <li>• נסו תיאורים שונים להשגת תוצאות מגוונות</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hidden canvas for image manipulation */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
