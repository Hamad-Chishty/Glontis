'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { Sparkles, Calendar, ArrowRight, Tag, MessageCircle, CheckCircle2 } from 'lucide-react';

export default function OffersPage() {
  const { offers, settings } = useData();

  const activeOffers = offers.filter((o) => o.is_active);

  const primaryPhone = settings.phones[0] || '03334301456';
  const whatsappNumber = settings.whatsapp || '03334530456';

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Limited-Time Intake Promotions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Exclusive Offers & Intake Savings
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Take advantage of special consultation discounts, fee waivers, and free SOP review packages offered by Glontis Visa Consultancy in Multan.
          </p>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {activeOffers.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100 max-w-xl mx-auto">
            <Tag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No active promotional offers right now</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Contact our Multan office directly for custom guidance or upcoming intake packages.
            </p>
            <Link
              href="/free-consultation"
              className="px-6 py-3 rounded-xl bg-blue-900 text-white font-bold text-xs inline-flex items-center gap-2 hover:bg-blue-800 transition-colors shadow-sm"
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image or Header Badge */}
                {offer.image_url ? (
                  <div className="relative h-48 bg-slate-900 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={offer.image_url}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                        {offer.discount_badge}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 text-white relative">
                    <span className="bg-yellow-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                      {offer.discount_badge}
                    </span>
                  </div>
                )}

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {offer.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-900" />
                        <span>Valid until {offer.end_date}</span>
                      </span>
                      <span className="text-emerald-600 font-extrabold text-[11px] bg-emerald-50 px-2 py-0.5 rounded">
                        Active Promo
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        href={offer.cta_link || '/free-consultation'}
                        className="w-full py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <span>{offer.cta_text || 'Claim Offer'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={`https://wa.me/92${whatsappNumber.replace(/^0/, '').replace(/\s+/g, '')}?text=Hello%20Glontis,%20I%20am%20interested%20in%20the%20offer:%20${encodeURIComponent(
                          offer.title
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Why Claim Offers Section */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-black text-slate-900">
              Why Choose Glontis Visa Consultancy in Multan?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-6 h-6 text-blue-900" />
                <h4 className="font-extrabold text-sm text-slate-900">100% Transparency</h4>
                <p className="text-xs text-slate-600">No hidden charges or surprise costs. Clear terms from day one.</p>
              </div>
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-6 h-6 text-blue-900" />
                <h4 className="font-extrabold text-sm text-slate-900">High Success Rate</h4>
                <p className="text-xs text-slate-600">Proven track record for UK, Australia, Canada, USA, and Schengen visas.</p>
              </div>
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-6 h-6 text-blue-900" />
                <h4 className="font-extrabold text-sm text-slate-900">Direct Office Support</h4>
                <p className="text-xs text-slate-600">Visit Chaze Up Plaza, Bosan Road, Multan for one-on-one counseling.</p>
              </div>
            </div>
            <div className="pt-4">
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs inline-flex items-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <span>Call Multan Office: {primaryPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
