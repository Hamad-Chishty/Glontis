'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import ConsultationForm from '@/components/home/ConsultationForm';
import { Calendar, User, ArrowLeft, Share2, Tag, BookOpen } from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { blogs } = useData();

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-slate-50">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Article Not Found</h1>
        <p className="text-sm text-slate-600 mb-6 max-w-md">The requested blog post is unavailable.</p>
        <Link href="/blog" className="px-6 py-3 rounded-xl bg-blue-900 text-white font-bold text-xs uppercase tracking-wider">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <span className="inline-block px-3 py-1 rounded-full bg-blue-900 text-yellow-300 text-xs font-bold uppercase tracking-wider">
            {blog.category}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-400" />
              <span>{blog.author_name}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>{blog.publish_date}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={blog.featured_image} alt={blog.title} className="w-full h-full object-cover" />
          </div>

          <p className="text-base font-semibold text-slate-800 leading-relaxed border-l-4 border-blue-900 pl-4 py-1 italic bg-slate-50 rounded-r-xl">
            {blog.excerpt}
          </p>

          <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4 whitespace-pre-line">
            {blog.content}
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              {blog.tags.map((tag, idx) => (
                <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-bold">
                  #{tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: blog.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Article link copied to clipboard!');
                }
              }}
              className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Article</span>
            </button>
          </div>
        </div>
      </section>

      <ConsultationForm />
    </main>
  );
}
