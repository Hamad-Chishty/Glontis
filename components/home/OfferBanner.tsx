'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { Sparkles, X, Clock, ArrowRight, MessageCircle } from 'lucide-react';

export default function OfferBanner() {
  const { offers, settings } = useData();
  const [showPopup, setShowPopup] = useState(false);

  const activeOffer = offers.find((o) => o.is_active && o.is_featured);

  useEffect(() => {
    if (activeOffer && activeOffer.is_popup) {
      const popupSeen = sessionStorage.getItem('glontis_offer_popup_seen');
      if (!popupSeen) {
        const timer = setTimeout(() => setShowPopup(true), 2500);
        return () => clearTimeout(timer);
      }
    }
  }, [activeOffer]);

  const closePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('glontis_offer_popup_seen', 'true');
  };

  if (!activeOffer) return null;

  const whatsappNum = settings.whatsapp || '03334530456';
  const formattedWa = `92${whatsappNum.replace(/^0/, '').replace(/\s+/g, '')}`;

  return (
    <>
      {/* Homepage Standalone Offer Section */}
      <section className="py-12 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-yellow-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeOffer.discount_badge}</span>
              </span>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {activeOffer.title}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                {activeOffer.description}
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-yellow-300 font-semibold pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Valid for 2026 Intakes</span>
                </span>
                <span>•</span>
                <span>Multan Office Exclusive</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href={activeOffer.cta_link || '/free-consultation'}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>{activeOffer.cta_text || 'Claim Offer Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${formattedWa}?text=${encodeURIComponent(activeOffer.whatsapp_text || 'Hello Glontis Visa Consultancy, I want to claim the special offer.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Claim</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pop-up Offer Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {activeOffer.image_url && (
              <div className="relative h-48 w-full bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeOffer.image_url} alt={activeOffer.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-yellow-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                    {activeOffer.discount_badge}
                  </span>
                </div>
              </div>
            )}

            <div className="p-6 space-y-4 text-center">
              <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                {activeOffer.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {activeOffer.description}
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href={activeOffer.cta_link || '/free-consultation'}
                  onClick={closePopup}
                  className="w-full py-3.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>{activeOffer.cta_text || 'Claim Free Session'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/${formattedWa}?text=${encodeURIComponent(activeOffer.whatsapp_text || 'Hello Glontis Visa Consultancy')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closePopup}
                  className="w-full py-3 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Claim via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
