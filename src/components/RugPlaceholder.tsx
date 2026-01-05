'use client';

interface RugPlaceholderProps {
  name: string;
  collection: string;
  pattern?: 'circles' | 'waves' | 'geometric' | 'organic' | 'lines';
}

export default function RugPlaceholder({ name, collection, pattern = 'circles' }: RugPlaceholderProps) {
  const getPattern = () => {
    switch (pattern) {
      case 'circles':
        return (
          <>
            <circle cx="200" cy="200" r="150" fill="none" stroke="#8B7355" strokeWidth="2" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="#8B7355" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="50" fill="none" stroke="#8B7355" strokeWidth="1" />
          </>
        );
      case 'waves':
        return (
          <>
            <path d="M0 150 Q100 100 200 150 T400 150" fill="none" stroke="#8B7355" strokeWidth="2" />
            <path d="M0 200 Q100 150 200 200 T400 200" fill="none" stroke="#8B7355" strokeWidth="2" />
            <path d="M0 250 Q100 200 200 250 T400 250" fill="none" stroke="#8B7355" strokeWidth="2" />
          </>
        );
      case 'geometric':
        return (
          <>
            <rect x="100" y="100" width="200" height="200" fill="none" stroke="#8B7355" strokeWidth="2" />
            <rect x="150" y="150" width="100" height="100" fill="none" stroke="#8B7355" strokeWidth="1.5" />
            <line x1="100" y1="100" x2="300" y2="300" stroke="#8B7355" strokeWidth="1" />
            <line x1="300" y1="100" x2="100" y2="300" stroke="#8B7355" strokeWidth="1" />
          </>
        );
      case 'organic':
        return (
          <>
            <ellipse cx="150" cy="180" rx="80" ry="60" fill="none" stroke="#8B7355" strokeWidth="2" />
            <ellipse cx="250" cy="220" rx="80" ry="60" fill="none" stroke="#8B7355" strokeWidth="2" />
            <circle cx="200" cy="150" r="30" fill="none" stroke="#8B7355" strokeWidth="1.5" />
          </>
        );
      case 'lines':
        return (
          <>
            <line x1="50" y1="100" x2="350" y2="100" stroke="#8B7355" strokeWidth="2" />
            <line x1="50" y1="150" x2="350" y2="150" stroke="#8B7355" strokeWidth="1.5" />
            <line x1="50" y1="200" x2="350" y2="200" stroke="#8B7355" strokeWidth="2" />
            <line x1="50" y1="250" x2="350" y2="250" stroke="#8B7355" strokeWidth="1.5" />
            <line x1="50" y1="300" x2="350" y2="300" stroke="#8B7355" strokeWidth="2" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" className="w-full h-full">
      <rect fill="#D4C4B0" width="400" height="400" />
      {getPattern()}
      <text x="200" y="370" textAnchor="middle" fontFamily="Arial" fontSize="12" fill="#6B6B6B">
        {name}
      </text>
      <text x="200" y="385" textAnchor="middle" fontFamily="Arial" fontSize="10" fill="#999">
        {collection}
      </text>
    </svg>
  );
}
