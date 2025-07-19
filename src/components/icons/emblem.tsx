export function AshokaChakraIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 125"
        className="h-full w-full"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="3" fill="none" />
        <circle cx="50" cy="50" r="4" fill="currentColor" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2="50"
            y2="12"
            stroke="currentColor"
            strokeWidth="2"
            transform={`rotate(${i * 15}, 50, 50)`}
          />
        ))}
        <text x="50%" y="90%" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontFamily="'Alegreya', serif" className="font-headline">
          ಸತ್ಯಮೇವ ಜಯತೆ
        </text>
      </svg>
    );
  }
