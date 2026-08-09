'use client';

import React, { useState, useRef } from 'react';
import { useData } from '@/lib/context/DataContext';
import {
  Upload,
  Search,
  Eye,
  Trash2,
  Copy,
  Check,
  X,
  FileImage,
  RefreshCw,
  FolderOpen,
  Filter,
  Sparkles,
  Info,
} from 'lucide-react';
import { MediaItem } from '@/lib/types';

export default function MediaLibraryTab() {
  const { mediaLibrary, addMediaItem, deleteMediaItem } = useData();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [replaceItem, setReplaceItem] = useState<MediaItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const replaceInputRef = useRef<HTMLInputElement | null>(null);

  // Copy image URL to clipboard
  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Upload new image to library
  const handleUploadNew = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Determine dimensions
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

      const formData = new FormData();
      formData.append('file', file);
      formData.append('width', actualWidth.toString());
      formData.append('height', actualHeight.toString());
      formData.append('altText', file.name.replace(/\.[^/.]+$/, ''));
      formData.append('title', file.name);

      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.item) {
        await addMediaItem(json.item);
      } else {
        alert(json.error || 'Upload failed');
      }
    } catch (err: any) {
      console.error('Error uploading file to media library:', err);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Replace existing media item with new file
  const handleReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !replaceItem) return;

    setIsUploading(true);
    try {
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

      const formData = new FormData();
      formData.append('file', file);
      formData.append('width', actualWidth.toString());
      formData.append('height', actualHeight.toString());
      formData.append('altText', replaceItem.alt_text || file.name);
      formData.append('title', replaceItem.title || file.name);

      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const json = await res.json();
      if (json.success && json.item) {
        const updatedItem: MediaItem = {
          ...json.item,
          id: replaceItem.id, // Preserve ID so site usages update
        };
        await addMediaItem(updatedItem);
        setReplaceItem(null);
      }
    } catch (err) {
      console.error('Error replacing image:', err);
    } finally {
      setIsUploading(false);
      if (replaceInputRef.current) replaceInputRef.current.value = '';
    }
  };

  // Filter media
  const filteredItems = mediaLibrary.filter((item) => {
    const matchesSearch =
      item.file_name.toLowerCase().includes(search.toLowerCase()) ||
      (item.alt_text && item.alt_text.toLowerCase().includes(search.toLowerCase())) ||
      (item.title && item.title.toLowerCase().includes(search.toLowerCase()));

    const matchesType = filterType === 'ALL' || item.file_type.toUpperCase() === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0A1838] text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <FolderOpen className="w-6 h-6 text-[#F07100]" />
            <h2 className="text-xl font-black">Central Media Library</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Manage all website images, logos, banners, and icons. Images uploaded here update automatically across the site.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUploadNew}
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-5 py-3 rounded-2xl bg-[#F07100] hover:bg-[#d96600] text-white text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            {isUploading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>Upload Image from PC</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by file name or alt text..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          {['ALL', 'JPG', 'PNG', 'WEBP', 'SVG'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterType === type
                  ? 'bg-[#0A1838] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="aspect-16/10 bg-slate-900/5 relative overflow-hidden flex items-center justify-center p-2 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.alt_text || item.file_name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />

                <span className="absolute top-2 right-2 bg-[#0A1838]/80 text-white text-[9px] font-black px-2 py-0.5 rounded-lg backdrop-blur-xs uppercase">
                  {item.file_type}
                </span>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#0A1838]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  <button
                    type="button"
                    onClick={() => setPreviewItem(item)}
                    title="Preview Image"
                    className="p-2 rounded-xl bg-white/20 hover:bg-white text-white hover:text-[#0A1838] transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyUrl(item)}
                    title="Copy URL"
                    className="p-2 rounded-xl bg-white/20 hover:bg-white text-white hover:text-[#0A1838] transition-colors"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setReplaceItem(item);
                      replaceInputRef.current?.click();
                    }}
                    title="Replace Image"
                    className="p-2 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete image "${item.file_name}" from Media Library?`)) {
                        deleteMediaItem(item.id);
                      }
                    }}
                    title="Delete Image"
                    className="p-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Item Details */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between text-xs">
                <div>
                  <h4 className="font-extrabold text-[#0A1838] truncate" title={item.file_name}>
                    {item.file_name}
                  </h4>
                  {item.alt_text && (
                    <p className="text-[10px] text-slate-500 truncate mt-0.5" title={item.alt_text}>
                      Alt: {item.alt_text}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 text-[10px] grid grid-cols-2 gap-1 text-slate-500 font-medium">
                  <div>Dimensions: <strong className="text-slate-800 font-bold block">{item.width} × {item.height} px</strong></div>
                  <div>Size: <strong className="text-slate-800 font-bold block">{item.file_size_formatted}</strong></div>
                  <div>Aspect: <strong className="text-slate-800 font-bold block">{item.aspect_ratio}</strong></div>
                  <div>Date: <strong className="text-slate-800 font-bold block">{item.upload_date}</strong></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
          <FileImage className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-extrabold text-slate-700 text-sm">No images found in Media Library</h3>
          <p className="text-xs text-slate-400">Upload your first image from PC to get started.</p>
        </div>
      )}

      {/* Hidden Replace Input */}
      <input
        type="file"
        ref={replaceInputRef}
        onChange={handleReplace}
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        className="hidden"
      />

      {/* PREVIEW MODAL */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-[#0A1838]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-[#0A1838] text-white flex items-center justify-between">
              <h3 className="font-extrabold text-sm truncate">{previewItem.file_name}</h3>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-slate-950 flex items-center justify-center min-h-[300px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewItem.url}
                alt={previewItem.alt_text || previewItem.file_name}
                className="max-h-[60vh] max-w-full object-contain rounded-xl"
              />
            </div>

            <div className="p-5 bg-slate-50 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Dimensions</span>
                <span className="font-black text-[#0A1838]">{previewItem.width} × {previewItem.height} px</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">File Size</span>
                <span className="font-bold text-slate-700">{previewItem.file_size_formatted}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">File Type</span>
                <span className="font-bold text-slate-700">{previewItem.file_type}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Aspect Ratio</span>
                <span className="font-bold text-slate-700">{previewItem.aspect_ratio}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
