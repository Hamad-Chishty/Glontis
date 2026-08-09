'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { Star, CheckCircle, Quote, ThumbsUp } from 'lucide-react';

export default function TestimonialsSection() {
  const { testimonials } = useData();

  const publishedReviews = testimonials
    .filter((t) => t.is_published)
    .sort((a, b) => a.display_order - b.display_order);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              Verified Student Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              What Students Say About Glontis Visa Consultancy
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Honest testimonials from Pakistani students in Multan who achieved their study abroad goals with us.
            </p>
          </div>

          {/* Google Review Score Badge */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4 shrink-0 shadow-sm">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-slate-100 text-slate-900 font-extrabold text-2xl">
              4.9
            </div>
            <div>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs font-bold text-slate-800 mt-1">Google Reviews Rating</p>
              <p className="text-[11px] text-slate-500">Based on Multan Student Reviews</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedReviews.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(review.star_rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-200 group-hover:text-blue-300 transition-colors" />
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  &ldquo;{review.review_text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={review.customer_photo}
                    alt={review.customer_name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{review.customer_name}</h4>
                    <p className="text-[11px] text-slate-500">{review.service}</p>
                  </div>
                </div>

                {review.is_verified && (
                  <span className="text-emerald-600 flex items-center gap-1 text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
