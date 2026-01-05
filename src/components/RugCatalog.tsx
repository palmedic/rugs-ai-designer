'use client';

import { useState } from 'react';
import { Rug } from '@/types';
import { rugsData, collections, getRugPattern, PatternType } from '@/lib/rugs-data';

interface RugCatalogProps {
  onSelectRug: (rug: Rug) => void;
  selectedRug: Rug | null;
}

function RugPattern({ pattern, name }: { pattern: PatternType; name: string }) {
  const getPatternSVG = () => {
    switch (pattern) {
      case 'circles':
        return (
          <>
            <circle cx="100" cy="100" r="75" fill="none" stroke="#8B7355" strokeWidth="2" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="#8B7355" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="25" fill="none" stroke="#8B7355" strokeWidth="1" />
          </>
        );
      case 'waves':
        return (
          <>
            <path d="M0 60 Q50 40 100 60 T200 60" fill="none" stroke="#8B7355" strokeWidth="2" />
            <path d="M0 100 Q50 80 100 100 T200 100" fill="none" stroke="#8B7355" strokeWidth="2" />
            <path d="M0 140 Q50 120 100 140 T200 140" fill="none" stroke="#8B7355" strokeWidth="2" />
          </>
        );
      case 'geometric':
        return (
          <>
            <rect x="40" y="40" width="120" height="120" fill="none" stroke="#8B7355" strokeWidth="2" />
            <rect x="65" y="65" width="70" height="70" fill="none" stroke="#8B7355" strokeWidth="1.5" />
            <line x1="40" y1="40" x2="160" y2="160" stroke="#8B7355" strokeWidth="1" />
            <line x1="160" y1="40" x2="40" y2="160" stroke="#8B7355" strokeWidth="1" />
          </>
        );
      case 'organic':
        return (
          <>
            <ellipse cx="70" cy="90" rx="45" ry="35" fill="none" stroke="#8B7355" strokeWidth="2" />
            <ellipse cx="130" cy="110" rx="45" ry="35" fill="none" stroke="#8B7355" strokeWidth="2" />
            <circle cx="100" cy="60" r="20" fill="none" stroke="#8B7355" strokeWidth="1.5" />
          </>
        );
      case 'lines':
        return (
          <>
            <line x1="20" y1="50" x2="180" y2="50" stroke="#8B7355" strokeWidth="2" />
            <line x1="20" y1="80" x2="180" y2="80" stroke="#8B7355" strokeWidth="1.5" />
            <line x1="20" y1="110" x2="180" y2="110" stroke="#8B7355" strokeWidth="2" />
            <line x1="20" y1="140" x2="180" y2="140" stroke="#8B7355" strokeWidth="1.5" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
      <rect fill="#D4C4B0" width="200" height="200" />
      {getPatternSVG()}
      <text x="100" y="185" textAnchor="middle" fontFamily="Arial" fontSize="10" fill="#6B6B6B">
        {name}
      </text>
    </svg>
  );
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

      {/* Collection Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
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
            className={`px-4 py-2 text-sm rounded-full border transition-all ${
              activeCollection === collection.id
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-[var(--border)] hover:border-black'
            }`}
          >
            {collection.nameHe}
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
            <div className="absolute inset-0">
              <RugPattern pattern={getRugPattern(rug.id)} name={rug.name} />
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
