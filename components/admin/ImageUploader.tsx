'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useData } from '@/lib/context/DataContext';
import {
  Upload,
  FolderOpen,
  Eye,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  X,
  FileImage,
  Info,
  Maximize2,
  Search,
  Sparkles,
} from 'lucide-react';
import { MediaItem } from '@/lib/types';

interface ImageUploaderProps {
  value?: string;
  altText?: string;
  titleText?: string;
  onChange: (url: string, altText?: string, titleText?: string) => void;
  label?: string;
  recommendedDimensions?: string;
  recommendedWidth?: number;
  recommendedHeight?: number;
  className?: string;
}

export default function ImageUploader({
  value = '',
  altText = '',
  titleText = '',
  onChange,
  label = 'Image',
  recommendedDimensions = '1920 × 800 px',
  recommendedWidth,
  recommendedHeight,
  className = '',
}: ImageUploaderProps) {
  const { mediaLibrary, addMediaItem, deleteMediaItem } = useData();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [librarySearch, setLibrarySearch] = useState('');

  // Image metadata state
  const [imageMeta, setImageMeta] = useState<{
    width?: number;
    height?: number;
    sizeFormatted?: string;
    fileType?: string;
    aspectRatio?: string;
    fileName?: string;
  }>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Find matching item in library if value exists
  const matchedLibraryItem = mediaLibrary.find((m) => m.url === value);

  // Inspect image dimensions when URL changes
  useEffect(() => {
    if (!value || matchedLibraryItem) return;

    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = value;
    img.onload = () => {
      if (!isMounted) return;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const div = gcd(w, h);
      const ratio = `${Math.round(w / div)}:${Math.round(h / div)} (${(w / (h || 1)).toFixed(2)}:1)`;
      const ext = value.split('.').pop()?.split('?')[0]?.toUpperCase() || 'IMAGE';

      setImageMeta({
        width: w,
        height: h,
        aspectRatio: ratio,
        fileType: ext.length <= 5 ? ext : 'IMAGE',
        fileName: value.substring(value.lastIndexOf('/') + 1) || 'image',
      });
    };

    return () => {
      isMounted = false;
    };
  }, [value, matchedLibraryItem]);

  // Derived image metadata combining library match and loaded meta
  const currentMeta = matchedLibraryItem
    ? {
        width: matchedLibraryItem.width,
        height: matchedLibraryItem.height,
        sizeFormatted: matchedLibraryItem.file_size_formatted,
        fileType: matchedLibraryItem.file_type,
        aspectRatio: matchedLibraryItem.aspect_ratio,
        fileName: matchedLibraryItem.file_name,
      }
    : value
    ? imageMeta
    : {};

  // Handle direct file selection from PC
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploadSuccess('');

    // Format validation
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type.toLowerCase()) && !file.name.match(/\.(jpg|jpeg|png|webp|svg)$/i)) {
      setUploadError('Invalid file type! Please select a JPG, PNG, WEBP, or SVG image.');
      return;
    }

    // Size validation (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is 10 MB.`);
      return;
    }

    setIsUploading(true);

    try {
      // Determine image dimensions using browser Image API
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = objectUrl;

      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });

      const actualWidth = img.naturalWidth || 1200;
      const actualHeight = img.naturalHeight || 800;
      URL.revokeObjectURL(objectUrl);

      // Upload via FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('width', actualWidth.toString());
      formData.append('height', actualHeight.toString());
      formData.append('altText', altText);
      formData.append('title', titleText || file.name);

      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();

      if (json.success && json.item) {
        const newItem: MediaItem = json.item;
        await addMediaItem(newItem);
        onChange(newItem.url, altText || newItem.alt_text, titleText || newItem.title);
        setUploadSuccess(`Uploaded & saved to Media Library: ${newItem.file_name} (${newItem.width}×${newItem.height}px)`);

        setImageMeta({
          width: newItem.width,
          height: newItem.height,
          sizeFormatted: newItem.file_size_formatted,
          fileType: newItem.file_type,
          aspectRatio: newItem.aspect_ratio,
          fileName: newItem.file_name,
        });
      } else {
        setUploadError(json.error || 'Failed to process image upload.');
      }
    } catch (err: any) {
      console.error('File upload exception:', err);
      setUploadError(err.message || 'Error uploading file from PC.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Dimension comparison for warning display
  const hasDimensionWarning = Boolean(
    currentMeta.width &&
      currentMeta.height &&
      recommendedWidth &&
      recommendedHeight &&
      (Math.abs(currentMeta.width - recommendedWidth) > 50 || Math.abs(currentMeta.height - recommendedHeight) > 50)
  );

  return (
    <div className={`p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 ${className}`}>
      {/* Label and Recommended Dimensions */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="font-extrabold text-xs text-[#0A1838] flex items-center gap-1.5">
          <FileImage className="w-4 h-4 text-[#F07100]" />
          <span>{label}</span>
        </label>
        <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
          Recommended: <span className="text-[#0A1838] font-black">{recommendedDimensions}</span>
        </span>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        className="hidden"
      />

      {/* Main Image Control Box */}
      {value ? (
        <div className="space-y-3">
          {/* Preview Box */}
          <div className="relative group rounded-2xl overflow-hidden border border-slate-300 bg-slate-900/5 min-h-[160px] flex items-center justify-center p-2 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt={altText || label}
              className="max-h-56 w-auto max-w-full object-contain rounded-xl shadow-md transition-transform group-hover:scale-[1.01]"
              onError={(e) => {
                // Graceful fallback for broken image
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Floating Action Overlay */}
            <div className="absolute inset-0 bg-[#0A1838]/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white text-white hover:text-[#0A1838] text-xs font-black flex items-center gap-1 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white text-xs font-black flex items-center gap-1 shadow-sm transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replace</span>
              </button>

              <button
                type="button"
                onClick={() => setIsLibraryOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white text-white hover:text-[#0A1838] text-xs font-black flex items-center gap-1 transition-colors"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Library</span>
              </button>

              <button
                type="button"
                onClick={() => onChange('', '', '')}
                className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black flex items-center gap-1 shadow-sm transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          {/* Details & Dimensions Bar */}
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 font-medium">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Dimensions</span>
              <span className="font-black text-[#0A1838]">
                {currentMeta.width && currentMeta.height ? `${currentMeta.width} × ${currentMeta.height} px` : 'Auto'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">File Size</span>
              <span className="font-bold text-slate-700">{currentMeta.sizeFormatted || 'N/A'}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">File Type</span>
              <span className="font-bold text-slate-700">{currentMeta.fileType || 'JPG'}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Aspect Ratio</span>
              <span className="font-bold text-slate-700">{currentMeta.aspectRatio || '16:9'}</span>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[9px] uppercase font-bold">File Name</span>
              <span className="font-bold text-slate-700 truncate block max-w-[120px]">
                {currentMeta.fileName || 'uploaded_image'}
              </span>
            </div>
          </div>

          {/* Dimension Mismatch Warning Banner */}
          {hasDimensionWarning && (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Recommended: <strong className="font-black">{recommendedDimensions}</strong> | Uploaded:{' '}
                <strong className="font-black">
                  {currentMeta.width} × {currentMeta.height} px
                </strong>{' '}
                (Image is saved & usable)
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Empty Upload Trigger Box */
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-white hover:bg-slate-50/80 transition-colors flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#F07100]/10 flex items-center justify-center text-[#F07100]">
            <Upload className="w-6 h-6" />
          </div>

          <div>
            <p className="font-black text-xs text-[#0A1838]">Upload or select an image for {label}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Supports JPG, PNG, WEBP, SVG up to 10 MB from PC or Media Library
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-4 py-2 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Image</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLibraryOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#0A1838] hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <FolderOpen className="w-3.5 h-3.5 text-[#F07100]" />
              <span>Media Library</span>
            </button>
          </div>
        </div>
      )}

      {/* Manual URL Entry & Alt / Title Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
        <div className="sm:col-span-2">
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
            Image File URL / Path
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value, altText, titleText)}
            placeholder="https://... or /uploads/..."
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
            Alt Text (Accessibility)
          </label>
          <input
            type="text"
            value={altText}
            onChange={(e) => onChange(value, e.target.value, titleText)}
            placeholder="Short image description for SEO"
            className="w-full p-2 rounded-xl border border-slate-200 bg-white text-xs font-medium"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
            Image Title (Hover tooltip)
          </label>
          <input
            type="text"
            value={titleText}
            onChange={(e) => onChange(value, altText, e.target.value)}
            placeholder="Image title tag"
            className="w-full p-2 rounded-xl border border-slate-200 bg-white text-xs font-medium"
          />
        </div>
      </div>

      {/* Loading Progress State */}
      {isUploading && (
        <div className="p-3 rounded-xl bg-[#0A1838] text-white text-xs font-bold flex items-center gap-2 animate-pulse">
          <RefreshCw className="w-4 h-4 animate-spin text-[#F07100]" />
          <span>Uploading and optimizing image from PC...</span>
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Success Notification */}
      {uploadSuccess && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {/* MEDIA LIBRARY SELECTION MODAL */}
      {isLibraryOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A1838]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 bg-[#0A1838] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-[#F07100]" />
                <h3 className="font-extrabold text-base">Select Image from Media Library</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLibraryOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Direct Upload Bar */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search media files..."
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsLibraryOpen(false);
                  fileInputRef.current?.click();
                }}
                className="px-4 py-2 rounded-xl bg-[#F07100] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Upload className="w-4 h-4" />
                <span>Upload New from PC</span>
              </button>
            </div>

            {/* Grid of Media Items */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mediaLibrary
                .filter((item) =>
                  item.file_name.toLowerCase().includes(librarySearch.toLowerCase()) ||
                  (item.title && item.title.toLowerCase().includes(librarySearch.toLowerCase()))
                )
                .map((item) => {
                  const isSelected = item.url === value;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        onChange(item.url, item.alt_text || altText, item.title || titleText);
                        setIsLibraryOpen(false);
                      }}
                      className={`group relative rounded-2xl border-2 p-2 bg-slate-50 cursor-pointer transition-all hover:shadow-md ${
                        isSelected ? 'border-[#F07100] bg-[#F07100]/5 ring-2 ring-[#F07100]/20' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="aspect-square rounded-xl overflow-hidden bg-slate-200 relative mb-2 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.url}
                          alt={item.alt_text || item.file_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <span className="absolute top-1.5 right-1.5 bg-[#0A1838]/80 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                          {item.file_type}
                        </span>
                      </div>

                      <div className="text-[11px] space-y-0.5">
                        <div className="font-bold text-[#0A1838] truncate">{item.file_name}</div>
                        <div className="text-slate-500 text-[10px]">
                          {item.width} × {item.height} px • {item.file_size_formatted}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* FULL PREVIEW LIGHTBOX MODAL */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A1838]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-[#0A1838] text-white flex items-center justify-between">
              <span className="font-bold text-sm truncate max-w-md">{imageMeta.fileName || label}</span>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-auto flex items-center justify-center bg-slate-950 min-h-[300px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt={altText || label} className="max-h-[70vh] w-auto object-contain rounded-xl" />
            </div>

            <div className="p-4 bg-slate-100 text-xs flex flex-wrap items-center justify-between gap-4 font-medium">
              <div>Dimensions: {imageMeta.width} × {imageMeta.height} px</div>
              <div>Size: {imageMeta.sizeFormatted || 'N/A'}</div>
              <div>Format: {imageMeta.fileType}</div>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="text-[#F07100] font-bold hover:underline"
              >
                Open Full Original
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
