'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { TraceEntry } from '@/types';

interface TraceContextType {
  traces: TraceEntry[];
  addTrace: (type: TraceEntry['type'], message: string, data?: unknown) => void;
  clearTraces: () => void;
}

const TraceContext = createContext<TraceContextType | undefined>(undefined);

export function TraceProvider({ children }: { children: React.ReactNode }) {
  const [traces, setTraces] = useState<TraceEntry[]>([]);

  const addTrace = useCallback((type: TraceEntry['type'], message: string, data?: unknown) => {
    const entry: TraceEntry = {
      id: `trace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      type,
      message,
      data
    };
    setTraces(prev => [...prev, entry]);
  }, []);

  const clearTraces = useCallback(() => {
    setTraces([]);
  }, []);

  return (
    <TraceContext.Provider value={{ traces, addTrace, clearTraces }}>
      {children}
    </TraceContext.Provider>
  );
}

export function useTrace() {
  const context = useContext(TraceContext);
  if (context === undefined) {
    throw new Error('useTrace must be used within a TraceProvider');
  }
  return context;
}
