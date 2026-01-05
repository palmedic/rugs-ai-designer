'use client';

import { useTrace } from '@/context/TraceContext';
import { TraceEntry } from '@/types';

interface TracePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

function getTypeColor(type: TraceEntry['type']): string {
  switch (type) {
    case 'info':
      return 'text-blue-600';
    case 'request':
      return 'text-purple-600';
    case 'response':
      return 'text-green-600';
    case 'error':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

function getTypeLabel(type: TraceEntry['type']): string {
  switch (type) {
    case 'info':
      return 'INFO';
    case 'request':
      return 'REQUEST';
    case 'response':
      return 'RESPONSE';
    case 'error':
      return 'ERROR';
    default:
      return 'LOG';
  }
}

export default function TracePanel({ isOpen, onClose }: TracePanelProps) {
  const { traces, clearTraces } = useTrace();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50">
      <div className="w-full sm:w-[600px] max-h-[80vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
          <h3 className="text-lg font-bold">לוג פעולות</h3>
          <div className="flex gap-2">
            <button
              onClick={clearTraces}
              className="px-3 py-1 text-sm text-[var(--muted)] hover:text-black transition-colors"
            >
              נקה
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Trace list */}
        <div className="flex-1 overflow-y-auto p-4 trace-panel" dir="ltr">
          {traces.length === 0 ? (
            <p className="text-center text-[var(--muted)] py-8">אין פעולות להצגה</p>
          ) : (
            <div className="space-y-3">
              {traces.map(trace => (
                <div key={trace.id} className="trace-entry">
                  <div className="flex items-start gap-2">
                    <span className={`text-xs font-mono font-bold ${getTypeColor(trace.type)}`}>
                      [{getTypeLabel(trace.type)}]
                    </span>
                    <span className="trace-timestamp">
                      {trace.timestamp.toLocaleTimeString('he-IL')}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{trace.message}</p>
                  {trace.data !== undefined && trace.data !== null && (
                    <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-x-auto">
                      {JSON.stringify(trace.data, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
