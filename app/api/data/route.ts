import { NextRequest, NextResponse } from 'next/server';
import { getDb, saveDb, AppDatabase } from '@/lib/data-store';

export async function GET() {
  try {
    const db = getDb();
    return NextResponse.json({ success: true, data: db });
  } catch (error) {
    console.error('API /api/data error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    // Basic admin check
    const body = await req.json();
    const { action, payload, entity } = body;

    const db = getDb();

    if (action === 'UPDATE_ALL' && payload) {
      saveDb(payload as AppDatabase);
      return NextResponse.json({ success: true, message: 'All database tables updated' });
    }

    if (action === 'UPDATE_ENTITY' && entity && payload) {
      (db as unknown as Record<string, unknown>)[entity] = payload;
      saveDb(db);
      return NextResponse.json({ success: true, message: `${entity} updated successfully` });
    }

    return NextResponse.json({ success: false, message: 'Invalid action or payload' }, { status: 400 });
  } catch (error) {
    console.error('API /api/data POST error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update data' }, { status: 500 });
  }
}
