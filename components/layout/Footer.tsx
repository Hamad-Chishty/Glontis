'use client';

import React from 'react';
import Link from 'next/link';
import { useData } from '@/lib/context/DataContext';
import { GraduationCap, MapPin, Phone, Mail, MessageCircle, ArrowRight, ShieldCheck, Clock, Lock } from 'lucide-react';

export default function Footer() {
  const { settings, countries, services } = useData();

  const publishedCountries = countries.filter((c) => c.is_published).slice(0, 8);
  const publishedServices = services.filter((s) => s.is_published).slice(0, 6);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Highlight Banner */}
        <div className="mb-12 p-8 rounded-3xl bg-[#0A1838] border border-[#F07100]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-[#F07100] bg-[#F07100]/10 px-3.5 py-1 rounded-full border border-[#F07100]/30">
              Multan Office
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Start Your International Visa Journey?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Book a free 1-on-1 profile assessment with senior visa counselors at our Chaze Up Plaza office in Multan.
            </p>
          </div>
          <Link
            href="/free-consultation"
            className="px-8 py-4 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-sm shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 shrink-0"
          >
            <span>Book Free Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Multan Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/glontis-logo.svg"
                alt="Glontis Visa Consultancy"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Glontis Visa Consultancy is Multan’s premier international study abroad and work visa advisory firm. We offer transparent admissions counseling, work permit guidance, and visa file preparation for UK, Australia, Canada, USA, Germany, and Europe.
            </p>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="flex flex-wrap gap-2">
                  {settings.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="hover:text-white underline font-semibold"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/92${settings.whatsapp.replace(/^0/, '').replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 font-semibold text-emerald-400"
                >
                  WhatsApp: {settings.whatsapp}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{settings.opening_hours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-extrabold uppercase tracking-wider border-l-2 border-blue-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Glontis
                </Link>
              </li>
              <li>
                <Link href="/study-destinations" className="hover:text-white transition-colors">
                  Study Destinations
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Consultancy Services
                </Link>
              </li>
              <li>
                <Link href="/universities" className="hover:text-white transition-colors">
                  Partner Universities
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-white transition-colors">
                  Scholarships & Aid
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-white transition-colors">
                  Jobs Abroad & Work Visas
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-white transition-colors">
                  Intake Offers & Promos
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-white transition-colors">
                  Student Visa Success Stories
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-white transition-colors">
                  Student Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Latest Study Abroad News & Blogs
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Multan Office Contact Page
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Destinations */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-extrabold uppercase tracking-wider border-l-2 border-blue-500 pl-3">
              Study Destinations
            </h4>
            <ul className="space-y-2.5 text-xs">
              {publishedCountries.map((country) => (
                <li key={country.id}>
                  <Link
                    href={`/${country.slug}`}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>{country.flag_emoji}</span>
                    <span>Study in {country.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Key Services */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-extrabold uppercase tracking-wider border-l-2 border-blue-500 pl-3">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {publishedServices.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{settings.copyright_text}</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/admin/login" className="hover:text-blue-400 transition-colors flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
