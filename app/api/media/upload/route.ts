import { NextRequest, NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/data-store';
import { MediaItem } from '@/lib/types';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let fileName = '';
    let fileType = '';
    let fileSize = 0;
    let width = 0;
    let height = 0;
    let fileUrl = '';
    let altText = '';
    let title = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      altText = (formData.get('altText') as string) || '';
      title = (formData.get('title') as string) || '';

      if (!file) {
        return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
      }

      // Size check (10MB)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'File size exceeds 10MB limit' },
          { status: 400 }
        );
      }

      fileName = file.name;
      fileSize = file.size;
      const ext = path.extname(fileName).toLowerCase().replace('.', '');
      fileType = ext ? ext.toUpperCase() : 'JPG';

      const validExtensions = ['JPG', 'JPEG', 'PNG', 'WEBP', 'SVG'];
      if (!validExtensions.includes(fileType)) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid file format .${ext}. Supported formats: JPG, JPEG, PNG, WEBP, SVG`,
          },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      // Attempt write to public/uploads
      try {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const cleanName = `${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const filePath = path.join(uploadsDir, cleanName);
        fs.writeFileSync(filePath, buffer);
        fileUrl = `/uploads/${cleanName}`;
      } catch (err) {
        console.warn('Could not write to public/uploads, falling back to data URL:', err);
        const mimeType = file.type || 'image/jpeg';
        fileUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
      }

      // Get dimensions from form data if passed, or default
      width = parseInt((formData.get('width') as string) || '1200', 10);
      height = parseInt((formData.get('height') as string) || '800', 10);
    } else {
      // JSON payload fallback
      const body = await req.json();
      fileName = body.file_name || `image_${Date.now()}.jpg`;
      fileType = (body.file_type || 'JPG').toUpperCase();
      fileSize = body.file_size_bytes || 100000;
      width = body.width || 1200;
      height = body.height || 800;
      fileUrl = body.url;
      altText = body.alt_text || '';
      title = body.title || '';
    }

    // Format file size
    const fileSizeFormatted =
      fileSize > 1024 * 1024
        ? `${(fileSize / (1024 * 1024)).toFixed(2)} MB`
        : `${Math.round(fileSize / 1024)} KB`;

    // Calculate aspect ratio string
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = width && height ? gcd(width, height) : 1;
    const aspectW = Math.round(width / divisor);
    const aspectH = Math.round(height / divisor);
    const ratioVal = (width / (height || 1)).toFixed(2);
    const aspectRatioStr = `${aspectW}:${aspectH} (${ratioVal}:1)`;

    const newMediaItem: MediaItem = {
      id: `media_${Date.now()}`,
      url: fileUrl,
      file_name: fileName,
      width,
      height,
      file_size_bytes: fileSize,
      file_size_formatted: fileSizeFormatted,
      file_type: fileType,
      aspect_ratio: aspectRatioStr,
      upload_date: new Date().toISOString().split('T')[0],
      alt_text: altText,
      title: title || fileName,
    };

    // Save to data store
    const db = getDb();
    if (!db.mediaLibrary) db.mediaLibrary = [];
    db.mediaLibrary = [newMediaItem, ...db.mediaLibrary];
    saveDb(db);

    return NextResponse.json({
      success: true,
      message: 'Image uploaded and saved to Media Library successfully',
      item: newMediaItem,
    });
  } catch (error: any) {
    console.error('Media upload error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server image upload failed' },
      { status: 500 }
    );
  }
}
