'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import ConsultationForm from '@/components/home/ConsultationForm';
import { BookOpen, Calendar, User, ArrowRight, Tag, Search } from 'lucide-react';

export default function BlogPage() {
  const { blogs } = useData();

  React.useEffect(() => {
    document.title = 'Glontis Visa Consultancy | Blog';
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const publishedBlogs = blogs.filter((b) => !b.is_draft);
  const categories = ['All', ...Array.from(new Set(publishedBlogs.map((b) => b.category)))];

  const filteredBlogs = publishedBlogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-400/30 text-xs font-bold text-yellow-300">
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span>Study Abroad Guides & Updates</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Glontis Visa & Education Blog
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Latest embassy policy updates, bank statement guides, scholarship deadlines, and visa interview strategies for Pakistani students.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Search & Category Filter */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles, guides, policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-slate-50"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-blue-900 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {blog.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{blog.publish_date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      <span>{blog.author_name}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 shrink-0"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ConsultationForm />
    </main>
  );
}
