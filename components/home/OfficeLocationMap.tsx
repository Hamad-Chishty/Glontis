'use client';

import React from 'react';
import { useData } from '@/lib/context/DataContext';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from 'lucide-react';

export default function OfficeLocationMap() {
  const { settings } = useData();

  const primaryPhone = settings.phones[0] || '03334301456';

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-900 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            Visit Our Office
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Glontis Visa Consultancy Multan Office
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Conveniently located on Bosan Road near Chungi # 6, Multan. Drop in during office hours for an in-person consultation session.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">Headquarters</span>
                <h3 className="text-2xl font-black text-white">{settings.company_name}</h3>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Office Address</h4>
                    <p className="mt-0.5 leading-relaxed text-slate-300">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Contact Numbers</h4>
                    <div className="flex flex-col gap-1 mt-1 font-semibold">
                      {settings.phones.map((phone, idx) => (
                        <a key={idx} href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-yellow-400 underline">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Official Email</h4>
                    <p className="mt-0.5 font-semibold text-slate-300">{settings.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-blue-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Working Hours</h4>
                    <p className="mt-0.5 text-slate-300">{settings.opening_hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Map Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-md h-full min-h-[380px] bg-slate-100 relative">
            <iframe
              title="Glontis Visa Consultancy Multan Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.123456789!2d71.456789!3d30.212345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b330e79600000%3A0x1234567890abcdef!2sChaze%20Up%20Plaza%2C%20Bosan%20Rd%2C%20Multan%2C%20Punjab!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
              className="w-full h-full min-h-[380px] border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
