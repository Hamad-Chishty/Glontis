'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteSettings,
  MediaItem,
  HeroSlide,
  Offer,
  TrustStat,
  CountryDestination,
  ServiceItem,
  UniversityItem,
  SuccessStory,
  Testimonial,
  BlogPost,
  LeadEntry,
  FAQItem,
} from '@/lib/types';
import {
  defaultSettings,
  defaultMediaLibrary,
  defaultHeroSlides,
  defaultOffers,
  defaultTrustStats,
  defaultCountries,
  defaultServices,
  defaultUniversities,
  defaultSuccessStories,
  defaultTestimonials,
  defaultBlogs,
  defaultLeads,
  defaultFaqs,
  defaultWorkVisaPage,
  defaultTouristVisaPage,
} from '@/lib/data-store';
import { WorkVisaPageData, TouristVisaPageData } from '@/lib/types';

interface DataContextType {
  settings: SiteSettings;
  mediaLibrary: MediaItem[];
  heroSlides: HeroSlide[];
  offers: Offer[];
  trustStats: TrustStat[];
  countries: CountryDestination[];
  services: ServiceItem[];
  universities: UniversityItem[];
  successStories: SuccessStory[];
  testimonials: Testimonial[];
  blogs: BlogPost[];
  leads: LeadEntry[];
  faqs: FAQItem[];
  workVisaPage: WorkVisaPageData;
  touristVisaPage: TouristVisaPageData;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  updateData: (action: string, entity?: string, payload?: unknown) => Promise<boolean>;
  addLead: (lead: Omit<LeadEntry, 'id' | 'created_at' | 'status'>) => Promise<{ success: boolean; message: string }>;
  updateLeadStatus: (id: string, status: LeadEntry['status']) => Promise<boolean>;
  deleteLead: (id: string) => Promise<boolean>;
  addMediaItem: (item: MediaItem) => Promise<boolean>;
  deleteMediaItem: (id: string) => Promise<boolean>;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  setMediaLibrary: React.Dispatch<React.SetStateAction<MediaItem[]>>;
  setHeroSlides: React.Dispatch<React.SetStateAction<HeroSlide[]>>;
  setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
  setCountries: React.Dispatch<React.SetStateAction<CountryDestination[]>>;
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  setUniversities: React.Dispatch<React.SetStateAction<UniversityItem[]>>;
  setSuccessStories: React.Dispatch<React.SetStateAction<SuccessStory[]>>;
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  setFaqs: React.Dispatch<React.SetStateAction<FAQItem[]>>;
  setWorkVisaPage: React.Dispatch<React.SetStateAction<WorkVisaPageData>>;
  setTouristVisaPage: React.Dispatch<React.SetStateAction<TouristVisaPageData>>;
  resetToDefaultData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(defaultMediaLibrary);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(defaultHeroSlides);
  const [offers, setOffers] = useState<Offer[]>(defaultOffers);
  const [trustStats, setTrustStats] = useState<TrustStat[]>(defaultTrustStats);
  const [countries, setCountries] = useState<CountryDestination[]>(defaultCountries);
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [universities, setUniversities] = useState<UniversityItem[]>(defaultUniversities);
  const [successStories, setSuccessStories] = useState<SuccessStory[]>(defaultSuccessStories);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [blogs, setBlogs] = useState<BlogPost[]>(defaultBlogs);
  const [leads, setLeads] = useState<LeadEntry[]>(defaultLeads);
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqs);
  const [workVisaPage, setWorkVisaPage] = useState<WorkVisaPageData>(defaultWorkVisaPage);
  const [touristVisaPage, setTouristVisaPage] = useState<TouristVisaPageData>(defaultTouristVisaPage);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshData = async () => {
    try {
      const res = await fetch('/api/data', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          if (d.settings) setSettings(d.settings);
          if (d.mediaLibrary) setMediaLibrary(d.mediaLibrary);
          if (d.heroSlides) setHeroSlides(d.heroSlides);
          if (d.offers) setOffers(d.offers);
          if (d.trustStats) setTrustStats(d.trustStats);
          if (d.countries) setCountries(d.countries);
          if (d.services) setServices(d.services);
          if (d.universities) setUniversities(d.universities);
          if (d.successStories) setSuccessStories(d.successStories);
          if (d.testimonials) setTestimonials(d.testimonials);
          if (d.blogs) setBlogs(d.blogs);
          if (d.leads) setLeads(d.leads);
          if (d.faqs) setFaqs(d.faqs);
          if (d.workVisaPage) setWorkVisaPage(d.workVisaPage);
          if (d.touristVisaPage) setTouristVisaPage(d.touristVisaPage);
        }
      }
    } catch (err) {
      console.error('Error fetching data in DataProvider:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await refreshData();
    };
    void fetchData();
  }, []);

  const updateData = async (action: string, entity?: string, payload?: unknown) => {
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, entity, payload }),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating data:', err);
      return false;
    }
  };

  const addMediaItem = async (item: MediaItem) => {
    const updated = [item, ...mediaLibrary.filter((m) => m.id !== item.id)];
    setMediaLibrary(updated);
    return await updateData('UPDATE_ENTITY', 'mediaLibrary', updated);
  };

  const deleteMediaItem = async (id: string) => {
    const updated = mediaLibrary.filter((m) => m.id !== id);
    setMediaLibrary(updated);
    return await updateData('UPDATE_ENTITY', 'mediaLibrary', updated);
  };

  const addLead = async (leadData: Omit<LeadEntry, 'id' | 'created_at' | 'status'>) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });
      const json = await res.json();
      if (json.success) {
        await refreshData();
        return { success: true, message: json.message };
      }
      return { success: false, message: json.error || 'Failed to submit lead' };
    } catch (err) {
      console.error('Error adding lead:', err);
      return { success: false, message: 'Server connection error' };
    }
  };

  const updateLeadStatus = async (id: string, status: LeadEntry['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    setLeads(updated);
    return await updateData('UPDATE_ENTITY', 'leads', updated);
  };

  const deleteLead = async (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    return await updateData('UPDATE_ENTITY', 'leads', updated);
  };

  const resetToDefaultData = () => {
    setSettings(defaultSettings);
    setHeroSlides(defaultHeroSlides);
    setOffers(defaultOffers);
    setTrustStats(defaultTrustStats);
    setCountries(defaultCountries);
    setServices(defaultServices);
    setUniversities(defaultUniversities);
    setSuccessStories(defaultSuccessStories);
    setTestimonials(defaultTestimonials);
    setBlogs(defaultBlogs);
    setLeads(defaultLeads);
    setFaqs(defaultFaqs);
    setWorkVisaPage(defaultWorkVisaPage);
    setTouristVisaPage(defaultTouristVisaPage);
    updateData('UPDATE_ALL', undefined, {
      settings: defaultSettings,
      heroSlides: defaultHeroSlides,
      offers: defaultOffers,
      trustStats: defaultTrustStats,
      countries: defaultCountries,
      services: defaultServices,
      universities: defaultUniversities,
      successStories: defaultSuccessStories,
      testimonials: defaultTestimonials,
      blogs: defaultBlogs,
      leads: defaultLeads,
      faqs: defaultFaqs,
      workVisaPage: defaultWorkVisaPage,
      touristVisaPage: defaultTouristVisaPage,
    });
  };

  return (
    <DataContext.Provider
      value={{
        settings,
        mediaLibrary,
        heroSlides,
        offers,
        trustStats,
        countries,
        services,
        universities,
        successStories,
        testimonials,
        blogs,
        leads,
        faqs,
        workVisaPage,
        touristVisaPage,
        isLoading,
        refreshData,
        updateData,
        addLead,
        updateLeadStatus,
        deleteLead,
        addMediaItem,
        deleteMediaItem,
        setSettings,
        setMediaLibrary,
        setHeroSlides,
        setOffers,
        setCountries,
        setServices,
        setUniversities,
        setSuccessStories,
        setTestimonials,
        setBlogs,
        setFaqs,
        setWorkVisaPage,
        setTouristVisaPage,
        resetToDefaultData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
