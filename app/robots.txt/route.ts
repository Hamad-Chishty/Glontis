import { NextResponse } from 'next/server';

export async function GET() {
  const domain = 'https://glontisvisaconsultancy.com';

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
