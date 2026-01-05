'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-[var(--border)] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="https://rugsandco.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="https://cdn.prod.website-files.com/681739fbf98c4d5139d2b893/681739fbf98c4d5139d2b8c4_Logo_Wide_Black.svg"
              alt="Rugs & Co"
              width={140}
              height={40}
              className="h-8 sm:h-10 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--muted)] hidden sm:block">
              עיצוב שטיחים בהתאמה אישית
            </span>
            <Link
              href="https://rugsandco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-[var(--accent)] transition-colors"
            >
              לאתר הראשי
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
