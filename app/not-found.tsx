import Link from 'next/link';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-orange-100 text-[#F07100]">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-[#0A1838]">404</h1>
          <h2 className="text-xl font-bold text-slate-800">Page Not Found</h2>
          <p className="text-sm text-slate-600">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white text-sm font-bold shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/study-visa"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Visas</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
