'use client';

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Main spinner */}
      <div className="relative w-20 h-20 mb-6">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-[var(--accent-light)] rounded-full" />
        {/* Spinning ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-[var(--accent)] rounded-full animate-spin" />
        {/* Inner decorative element */}
        <div className="absolute inset-3 border-2 border-[var(--accent-light)] rounded-full animate-pulse" />
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse" />
        </div>
      </div>

      {/* Loading text */}
      <div className="text-center">
        <p className="text-lg font-medium mb-2">יוצר את העיצוב שלך...</p>
        <p className="text-sm text-[var(--muted)]">הבינה המלאכותית עובדת על העיצוב</p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-4">
        <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>

      {/* Shimmer bar */}
      <div className="w-48 h-1 mt-6 rounded-full overflow-hidden bg-[var(--accent-light)]">
        <div className="h-full w-1/2 bg-[var(--accent)] animate-shimmer rounded-full" />
      </div>
    </div>
  );
}
