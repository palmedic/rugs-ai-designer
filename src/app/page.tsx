'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RugCatalog from '@/components/RugCatalog';
import DesignStudio from '@/components/DesignStudio';
import TracePanel from '@/components/TracePanel';
import { TraceProvider } from '@/context/TraceContext';
import { Rug } from '@/types';

function MainContent() {
  const [selectedRug, setSelectedRug] = useState<Rug | null>(null);
  const [isTracePanelOpen, setIsTracePanelOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {!selectedRug && (
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              עצבו את השטיח המושלם שלכם
            </h1>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              השתמשו בבינה מלאכותית ליצירת עיצוב שטיח ייחודי.
              בחרו עיצוב בסיס מהקולקציות שלנו והתאימו אותו לסגנון שלכם.
            </p>
          </div>
        )}

        {/* Main Content */}
        {selectedRug ? (
          <DesignStudio
            selectedRug={selectedRug}
            onBack={() => setSelectedRug(null)}
          />
        ) : (
          <RugCatalog
            onSelectRug={setSelectedRug}
            selectedRug={selectedRug}
          />
        )}
      </main>

      <Footer />

      {/* Trace Panel Toggle */}
      <button
        onClick={() => setIsTracePanelOpen(true)}
        className="fixed bottom-4 left-4 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors z-40"
        title="פתח לוג פעולות"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </button>

      {/* Trace Panel */}
      <TracePanel
        isOpen={isTracePanelOpen}
        onClose={() => setIsTracePanelOpen(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <TraceProvider>
      <MainContent />
    </TraceProvider>
  );
}
