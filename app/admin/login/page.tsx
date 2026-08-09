'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, LogIn, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && (password === 'glontis2026' || password === 'admin')) {
      sessionStorage.setItem('glontis_admin_auth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[#0A1838] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Subtle Background Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#F07100]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 border border-slate-200 relative z-10">
        {/* Branding & Logo */}
        <div className="text-center space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/glontis-logo.svg"
            alt="Glontis Visa Consultancy"
            className="h-14 sm:h-16 w-auto mx-auto object-contain"
          />
          <div className="pt-2">
            <h1 className="text-lg sm:text-xl font-black text-[#0A1838] tracking-tight uppercase">
              Glontis Visa Consultancy
            </h1>
            <span className="inline-block mt-1 text-[11px] font-black uppercase tracking-widest text-[#F07100] bg-orange-50 px-3 py-1 rounded-full border border-orange-200/60">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 pt-2">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-bold border border-red-200 text-center animate-in fade-in">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-extrabold text-[#0A1838] uppercase tracking-wider mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F07100] focus:border-transparent bg-slate-50 text-slate-900 font-semibold transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#0A1838] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F07100] focus:border-transparent bg-slate-50 text-slate-900 font-semibold transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.99] mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </button>
        </form>

        <div className="pt-2 text-center border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F07100]" />
          <span>Authorized Access Only — Glontis Visa Consultancy</span>
        </div>
      </div>
    </main>
  );
}
