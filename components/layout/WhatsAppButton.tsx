'use client';

import React, { useState } from 'react';
import { useData } from '@/lib/context/DataContext';
import { MessageCircle, X, Send } from 'lucide-react';

export default function WhatsAppButton() {
  const { settings } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const whatsappNum = settings.whatsapp || '03334530456';
  const formattedNum = `92${whatsappNum.replace(/^0/, '').replace(/\s+/g, '')}`;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = userMsg.trim() || 'Hello Glontis Visa Consultancy, I would like to get a free consultation for study abroad options.';
    const encoded = encodeURIComponent(finalMsg);
    window.open(`https://wa.me/${formattedNum}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Interactive WhatsApp Popover */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                <MessageCircle className="w-6 h-6 fill-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Glontis WhatsApp Assistant</h4>
                <p className="text-[11px] text-emerald-100">Multan Office • Typically replies in minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-emerald-50/50 space-y-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-emerald-100 text-xs text-slate-800 space-y-1">
              <p className="font-semibold text-emerald-900">Hello! 👋 Welcome to Glontis Visa Consultancy Multan.</p>
              <p>How can we assist your study abroad plans today?</p>
            </div>

            <form onSubmit={handleSend} className="space-y-2 pt-1">
              <textarea
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder="Type your message (e.g. I want to study in UK or Australia)..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white resize-none"
                rows={3}
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Start WhatsApp Chat</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center transform hover:scale-110 active:scale-95 transition-all group relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-white/20" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
      </button>
    </div>
  );
}
