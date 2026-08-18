import { NextResponse } from 'next/server';
import { getDb } from '@/lib/data-store';

export async function GET() {
  const db = getDb();
  const domain = `https://${db.settings.domain || 'glontisconsultancy.com'}`;

  const staticPages = [
    '',
    '/about',
    '/study-visa',
    '/work-visa',
    '/visit-visa',
    '/tourist-visa',
    '/scholarships',
    '/study-destinations',
    '/services',
    '/jobs',
    '/universities',
    '/offers',
    '/success-stories',
    '/testimonials',
    '/blog',
    '/faqs',
    '/contact',
    '/free-consultation',
    '/privacy-policy',
    '/terms-and-conditions',
  ];

  const countryPages = db.countries
    .filter((c) => c.is_published)
    .map((c) => `/${c.slug}`);

  const servicePages = db.services
    .filter((s) => s.is_published)
    .map((s) => `/services/${s.slug}`);

  const blogPages = db.blogs
    .filter((b) => !b.is_draft)
    .map((b) => `/blog/${b.slug}`);

  const allUrls = [
    ...staticPages.map((path) => ({ url: `${domain}${path}`, priority: path === '' ? '1.0' : '0.8', changefreq: 'daily' })),
    ...countryPages.map((path) => ({ url: `${domain}${path}`, priority: '0.9', changefreq: 'weekly' })),
    ...servicePages.map((path) => ({ url: `${domain}${path}`, priority: '0.8', changefreq: 'weekly' })),
    ...blogPages.map((path) => ({ url: `${domain}${path}`, priority: '0.7', changefreq: 'weekly' })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
