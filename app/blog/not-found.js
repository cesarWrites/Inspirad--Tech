import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-cyan-400">404</h1>
        <p className="text-2xl mb-8">Article not found</p>
        <Link 
          href="/blog"
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold hover:shadow-lg transition-all"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
}