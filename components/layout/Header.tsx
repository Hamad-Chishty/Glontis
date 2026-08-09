'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useData } from '@/lib/context/DataContext';
import { Phone, MessageCircle, Menu, X, ChevronDown, Sparkles, MapPin } from 'lucide-react';

export default function Header() {
  const { settings, offers, countries, services } = useData();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const activeOffer = offers.find((o) => o.is_active && o.is_banner);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Study Visa', href: '/study-visa' },
    { name: 'Work Visa', href: '/work-visa' },
    { name: 'Visit Visa', href: '/visit-visa' },
    { name: 'Tourist Visa', href: '/tourist-visa' },
    { name: 'Scholarships', href: '/scholarships' },
    {
      name: 'Destinations',
      href: '/study-destinations',
      dropdown: countries.filter((c) => c.is_published).map((c) => ({
        name: `${c.flag_emoji} ${c.name}`,
        href: `/${c.slug}`,
      })),
    },
    {
      name: 'Services',
      href: '/services',
      dropdown: [
        { name: 'Study Visa', href: '/study-visa' },
        { name: 'Work Visa', href: '/work-visa' },
        { name: 'Visit Visa', href: '/visit-visa' },
        { name: 'Tourist Visa', href: '/tourist-visa' },
        { name: 'Business Visa', href: '/services/business-visa' },
        { name: 'Family Visa', href: '/services/family-visa' },
        { name: 'Dependent Visa', href: '/services/dependent-visa' },
        { name: 'Immigration & PR', href: '/services/immigration' },
        { name: 'All Services', href: '/services' },
      ],
    },
    { name: 'Jobs Abroad', href: '/jobs' },
    { name: 'Blogs', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const primaryPhone = settings.phones[0] || '03334301456';
  const whatsappNumber = settings.whatsapp || '03334530456';

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Announcement Bar if Offer Active */}
      {activeOffer && (
        <div className="bg-[#0A1838] text-white text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2 shadow-inner border-b border-[#F07100]/20">
          <span className="bg-[#F07100] text-white font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wider animate-pulse">
            {activeOffer.discount_badge || 'SPECIAL OFFER'}
          </span>
          <span className="truncate">{activeOffer.title}</span>
          <Link
            href={activeOffer.cta_link || '/free-consultation'}
            className="underline font-bold text-[#F07100] hover:text-orange-300 transition-colors ml-1 hidden sm:inline"
          >
            {activeOffer.cta_text || 'Claim Offer →'}
          </Link>
        </div>
      )}

      {/* Top Utility Contact Bar */}
      <div className="bg-[#0A1838] text-slate-300 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-[#F07100]" />
            <span className="hidden md:inline">{settings.address}</span>
            <span className="md:hidden">Bosan Road, Multan</span>
          </span>
          <span className="hidden sm:inline-block text-slate-700">|</span>
          <span className="hidden sm:inline font-medium text-slate-400">Mon - Sat: 9:00 AM - 6:30 PM</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-[#F07100] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#F07100]" />
            <span className="font-extrabold">{primaryPhone}</span>
          </a>
          <a
            href={`https://wa.me/92${whatsappNumber.replace(/^0/, '').replace(/\s+/g, '')}?text=Hello%20Glontis%20Visa%20Consultancy,%20I%20would%20like%20to%20get%20a%20free%20consultation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-emerald-400/20" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Navbar - Guaranteed Single Line on Desktop */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-header shadow-md border-b border-slate-200/80 py-2'
            : 'bg-white border-b border-slate-100 py-2.5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
          {/* Official Glontis Logo + Company Name */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/glontis-logo.svg"
              alt="Glontis Visa Consultancy"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-[#0A1838] whitespace-nowrap leading-none group-hover:text-[#F07100] transition-colors">
              Glontis <span className="text-[#F07100]">Visa Consultancy</span>
            </span>
          </Link>

          {/* Desktop Navigation Links - Guaranteed Single Row */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-nowrap whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const hasDropdown = link.dropdown && link.dropdown.length > 0;

              return (
                <div
                  key={link.name}
                  className="relative group shrink-0"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`px-1.5 xl:px-2 py-1.5 rounded-lg text-[11px] xl:text-xs font-bold transition-all flex items-center gap-0.5 whitespace-nowrap ${
                      isActive
                        ? 'text-[#F07100] bg-orange-50 font-black'
                        : 'text-[#0A1838] hover:text-[#F07100] hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    {hasDropdown && <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform shrink-0" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasDropdown && activeDropdown === link.name && (
                    <div className="absolute top-full left-0 w-60 pt-2 z-50">
                      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-2 grid grid-cols-1 gap-0.5 animate-in fade-in slide-in-from-top-2 duration-200">
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#0A1838] hover:bg-orange-50 transition-colors flex items-center justify-between"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span>{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              href="/free-consultation"
              className="px-3.5 xl:px-4 py-2 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Free Consultation</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#0A1838] hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[105px] bottom-0 bg-white z-40 overflow-y-auto border-t border-slate-200 p-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.name} className="flex flex-col">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-between ${
                      isActive ? 'bg-[#0A1838] text-white' : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>

                  {/* Mobile Dropdown items */}
                  {link.dropdown && link.dropdown.length > 0 && (
                    <div className="pl-4 mt-1 border-l-2 border-orange-200 flex flex-col gap-1 my-1">
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-1.5 px-3 text-xs font-semibold text-slate-600 hover:text-[#F07100]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
              <Link
                href="/free-consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-[#F07100] text-white text-center font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Free Consultation</span>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                  className="py-3 px-3 rounded-xl bg-slate-100 text-[#0A1838] font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-[#F07100]" />
                  <span>Call Us</span>
                </a>
                <a
                  href={`https://wa.me/92${whatsappNumber.replace(/^0/, '').replace(/\s+/g, '')}?text=Hello%20Glontis%20Visa%20Consultancy`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
