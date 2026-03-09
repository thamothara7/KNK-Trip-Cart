import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <h1 className="text-6xl font-serif font-bold text-maroon mb-4">404</h1>
            <h2 className="text-2xl font-bold text-maroon/80 mb-6">Page Not Found</h2>
            <p className="text-lg text-maroon/60 mb-8 max-w-md">
                The divine destination you are looking for doesn't exist or has been moved.
            </p>
            <Link
                href="/"
                className="px-8 py-3 rounded-full font-bold text-maroon transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)' }}
            >
                Return to Home
            </Link>
        </div>
    );
}
