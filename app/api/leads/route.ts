import { NextRequest, NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/data-store';
import { LeadEntry } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, whatsapp, email, preferred_country, preferred_course, qualification, city, message } = body;

    if (!name || (!phone && !whatsapp && !email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide your name and at least one contact method (phone, WhatsApp, or email).' },
        { status: 400 }
      );
    }

    const db = getDb();

    const newLead: LeadEntry = {
      id: 'lead-' + Date.now(),
      name: name.trim(),
      phone: (phone || '').trim(),
      whatsapp: (whatsapp || phone || '').trim(),
      email: (email || '').trim(),
      preferred_country: (preferred_country || 'Not specified').trim(),
      preferred_course: (preferred_course || 'Not specified').trim(),
      qualification: (qualification || '').trim(),
      city: (city || 'Multan').trim(),
      message: (message || 'Direct Consultation Inquiry from Website').trim(),
      status: 'New',
      created_at: new Date().toISOString(),
    };

    db.leads.unshift(newLead);
    saveDb(db);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your consultation request has been submitted to Glontis Visa Consultancy. Our Multan office team will reach out to you shortly.',
      leadId: newLead.id,
    });
  } catch (error) {
    console.error('API /api/leads POST error:', error);
    return NextResponse.json({ success: false, error: 'Server error processing consultation request.' }, { status: 500 });
  }
}
