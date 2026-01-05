'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Rug, DesignIteration } from '@/types';
import { useTrace } from '@/context/TraceContext';
import LoadingAnimation from './LoadingAnimation';

interface DesignStudioProps {
  selectedRug: Rug;
  onBack: () => void;
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

    // Use last iteration as base, or original rug if no iterations
    const baseImageUrl = iterations.length > 0
      ? iterations[iterations.length - 1].imageUrl
      : selectedRug.imageUrl;

    addTrace('info', 'מתחיל יצירת עיצוב חדש', {
      prompt,
      baseRug: selectedRug.name,
      usingIteration: iterations.length > 0 ? iterations.length : 'original'
    });
    addTrace('request', 'שולח בקשה ל-API', {
      baseRugId: selectedRug.id,
      baseImage: iterations.length > 0 ? `iteration ${iterations.length}` : 'original',
      prompt: prompt
    });

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseRugId: selectedRug.id,
          baseRugImageUrl: baseImageUrl,
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

  // Delete an iteration and update current image to previous iteration or original
  const deleteIteration = (iterationId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selecting the iteration when clicking delete

    const iterationIndex = iterations.findIndex(i => i.id === iterationId);
    const deletedIteration = iterations[iterationIndex];

    // Remove the iteration
    const newIterations = iterations.filter(i => i.id !== iterationId);
    setIterations(newIterations);

    // If we deleted the currently displayed image, show the previous one or original
    if (currentImage === deletedIteration?.imageUrl) {
      if (newIterations.length > 0) {
        // Show the last remaining iteration
        setCurrentImage(newIterations[newIterations.length - 1].imageUrl);
      } else {
        // No iterations left, show original rug
        setCurrentImage(null);
      }
    }

    addTrace('info', 'איטרציה נמחקה', { iterationId, remainingIterations: newIterations.length });
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
                <Image
                  src={selectedRug.imageUrl}
                  alt={selectedRug.nameHe}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
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
                  <div
                    key={iteration.id}
                    onClick={() => setCurrentImage(iteration.imageUrl)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
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
                    <button
                      onClick={(e) => deleteIteration(iteration.id, e)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="מחק איטרציה"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
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
