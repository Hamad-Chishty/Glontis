import { NextResponse } from 'next/server';
import { getDb } from '@/lib/data-store';

export async function GET() {
  const db = getDb();
  const domain = `https://${db.settings.domain || 'glontisconsultancy.com'}`;

  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/admin/
Disallow: /login

Sitemap: ${domain}/sitemap.xml
`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
