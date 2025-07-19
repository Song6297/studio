export function AshokaChakraIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
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
        </svg>
    );
}

export function AshokaChakraWithText() {
    return (
        <div className="flex flex-col items-center justify-center text-primary">
            <div className="w-24 h-24">
                <AshokaChakraIcon />
            </div>
            <p className="mt-2 font-headline text-lg" lang="kn">ಸತ್ಯಮೇವ ಜಯತೆ</p>
        </div>
    )
}
