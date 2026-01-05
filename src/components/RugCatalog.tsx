'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Rug } from '@/types';
import { rugsData, collections } from '@/lib/rugs-data';

interface RugCatalogProps {
  onSelectRug: (rug: Rug) => void;
  selectedRug: Rug | null;
}

export default function RugCatalog({ onSelectRug, selectedRug }: RugCatalogProps) {
  const [activeCollection, setActiveCollection] = useState<Rug['collection'] | 'ALL'>('ALL');

  const filteredRugs = activeCollection === 'ALL'
    ? rugsData
    : rugsData.filter(rug => rug.collection === activeCollection);

  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">בחרו עיצוב בסיס</h2>
      <p className="text-[var(--muted)] mb-6 text-sm sm:text-base">
        בחרו שטיח מהקטלוג שלנו כנקודת התחלה לעיצוב שלכם
      </p>

      {/* Collection Filter with Images */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setActiveCollection('ALL')}
          className={`px-4 py-2 text-sm rounded-full border transition-all ${
            activeCollection === 'ALL'
              ? 'bg-black text-white border-black'
              : 'bg-white text-black border-[var(--border)] hover:border-black'
          }`}
        >
          הכל
        </button>
        {collections.map(collection => (
          <button
            key={collection.id}
            onClick={() => setActiveCollection(collection.id)}
            className={`relative flex items-center gap-2 px-2 py-1 pr-3 text-sm rounded-full border transition-all ${
              activeCollection === collection.id
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-[var(--border)] hover:border-black'
            }`}
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={collection.imageUrl}
                alt={collection.nameHe}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <span>{collection.nameHe}</span>
          </button>
        ))}
      </div>

      {/* Rug Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {filteredRugs.map(rug => (
          <button
            key={rug.id}
            onClick={() => onSelectRug(rug)}
            className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selectedRug?.id === rug.id
                ? 'border-black ring-2 ring-black ring-offset-2'
                : 'border-transparent hover:border-[var(--accent)]'
            }`}
          >
            <div className="absolute inset-0 bg-[var(--accent-light)]">
              <Image
                src={rug.imageUrl}
                alt={rug.nameHe}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
              <p className="text-xs sm:text-sm font-medium">{rug.nameHe}</p>
              <p className="text-[10px] sm:text-xs opacity-80">{rug.collectionHe}</p>
            </div>
            {selectedRug?.id === rug.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
