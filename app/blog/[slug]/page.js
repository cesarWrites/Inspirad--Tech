'use client';
import { use } from 'react';
import { blogPosts } from '@/data/blogPosts';
import { ArrowLeft, Calendar, Clock, User, Share2, BookmarkPlus } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ArticlePage({ params }) {
  // Unwrap the params Promise for Next.js 15
  const resolvedParams = use(params);
  const post = blogPosts.find(p => p.slug === resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/95 backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Inspirad
              </span>
            </Link>
            <Link 
              href="/blog"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              All Articles
            </Link>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/blog"
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Blog</span>
          </Link>

          <div className="space-y-4">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm inline-block">
              {post.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <BookmarkPlus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Image */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover rounded-2xl mb-8"
        />

        {/* Ad Placeholder - Top */}
        <div className="mb-8 p-8 bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-lg text-center">
          <p className="text-gray-400">Advertisement Space - Top Banner</p>
          <p className="text-sm text-gray-500 mt-2">Google AdSense code goes here</p>
        </div>

        {/* Article Body */}
        <div 
          className="prose prose-invert prose-cyan max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Ad Placeholder - Middle */}
        <div className="my-12 p-8 bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-lg text-center">
          <p className="text-gray-400">Advertisement Space - In-Article</p>
          <p className="text-sm text-gray-500 mt-2">Google AdSense code goes here</p>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-slate-800 rounded-full text-sm hover:bg-slate-700 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Ad Placeholder - Bottom */}
        <div className="mt-12 p-8 bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-lg text-center">
          <p className="text-gray-400">Advertisement Space - Bottom Banner</p>
          <p className="text-sm text-gray-500 mt-2">Google AdSense code goes here</p>
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map(relatedPost => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <div className="bg-slate-800/50 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform border border-slate-700 hover:border-cyan-500">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title} 
                      className="w-full h-40 object-cover" 
                    />
                    <div className="p-4">
                      <h4 className="font-bold mb-2 hover:text-cyan-400 transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {relatedPost.excerpt.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #22d3ee;
        }
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: #67e8f9;
        }
        .prose p {
          margin-bottom: 1.5rem;
          color: #d1d5db;
          line-height: 1.8;
          font-size: 1.125rem;
        }
        .prose ul, .prose ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
          color: #d1d5db;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose strong {
          color: #22d3ee;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}