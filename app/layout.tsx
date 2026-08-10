import type { Metadata } from 'next';
import './globals.css';
import { DataProvider } from '@/lib/context/DataContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import MobileStickyBar from '@/components/layout/MobileStickyBar';

export const metadata: Metadata = {
  title: {
    default: 'Glontis Visa Consultancy',
    template: 'Glontis Visa Consultancy | %s',
  },
  description:
    'Glontis Visa Consultancy is Multan’s premier education and visa advisory firm. Expert guidance for student visas in UK, Australia, Canada, USA, Germany, Italy, Ireland, and more.',
  keywords: [
    'Study abroad consultant Multan',
    'Glontis Visa Consultancy',
    'UK student visa Multan',
    'Australia student visa Multan',
    'Canada study permit Multan',
    'USA F1 visa preparation',
    'Visa agency Bosan Road Multan',
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Glontis Visa Consultancy | Top Rated Study Abroad Consultant in Multan',
    description:
      'Expert study visa counseling, university admissions, and visa file preparation in Multan & South Punjab.',
    type: 'website',
    url: 'https://glontisvisaconsultancy.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-[#F8FAFC] text-slate-800 font-sans antialiased selection:bg-blue-900 selection:text-white min-h-screen flex flex-col" suppressHydrationWarning>
        <DataProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <WhatsAppButton />
          <MobileStickyBar />
        </DataProvider>
      </body>
    </html>
  );
}
