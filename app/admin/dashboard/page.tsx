'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '@/lib/context/DataContext';
import ImageUploader from '@/components/admin/ImageUploader';
import MediaLibraryTab from '@/components/admin/MediaLibraryTab';
import {
  Users,
  ImageIcon,
  Tag,
  Globe,
  GraduationCap,
  Building2,
  Award,
  Star,
  BookOpen,
  HelpCircle,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  X,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Search,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Check,
  FolderOpen,
} from 'lucide-react';
import {
  SiteSettings,
  MediaItem,
  HeroSlide,
  Offer,
  CountryDestination,
  ServiceItem,
  UniversityItem,
  SuccessStory,
  Testimonial,
  BlogPost,
  LeadEntry,
  FAQItem,
} from '@/lib/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    leads,
    updateLeadStatus,
    deleteLead,
    mediaLibrary,
    heroSlides,
    setHeroSlides,
    offers,
    setOffers,
    countries,
    setCountries,
    services,
    setServices,
    universities,
    setUniversities,
    successStories,
    setSuccessStories,
    testimonials,
    setTestimonials,
    blogs,
    setBlogs,
    faqs,
    setFaqs,
    settings,
    setSettings,
    updateData,
    resetToDefaultData,
  } = useData();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('glontis_admin_auth') === 'true';
    }
    return false;
  });

  const [activeTab, setActiveTab] = useState<
    | 'leads'
    | 'media'
    | 'hero'
    | 'offers'
    | 'countries'
    | 'services'
    | 'universities'
    | 'stories'
    | 'testimonials'
    | 'blogs'
    | 'faqs'
    | 'settings'
  >('leads');

  const [notification, setNotification] = useState('');
  const [savingEntity, setSavingEntity] = useState<string | null>(null);

  // CRM Filters & AI State
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('All');
  const [selectedLeadForAi, setSelectedLeadForAi] = useState<LeadEntry | null>(null);
  const [aiReport, setAiReport] = useState('');

  // Manual Lead Creation Modal State
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState<Partial<LeadEntry>>({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    preferred_country: 'United Kingdom',
    preferred_course: 'Business Management',
    qualification: 'Bachelors',
    city: 'Multan',
    message: '',
    status: 'New',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A1838] flex items-center justify-center text-white text-xs font-bold">
        Redirecting to Admin Login...
      </div>
    );
  }

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('glontis_admin_auth');
    router.push('/admin/login');
  };

  // Generic Save Handler for Entities
  const handleSaveEntity = async (entityName: string, payload: unknown) => {
    setSavingEntity(entityName);
    const success = await updateData('UPDATE_ENTITY', entityName, payload);
    setSavingEntity(null);
    if (success) {
      showNotify(`Successfully saved and published updates to ${entityName}!`);
    } else {
      showNotify(`Error saving ${entityName}. Please check your connection.`);
    }
  };

  // Filtered Leads for CRM
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.phone.includes(leadSearch) ||
      l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.preferred_country.toLowerCase().includes(leadSearch.toLowerCase());

    const matchesStatus = leadStatusFilter === 'All' || l.status === leadStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // AI Profile Evaluation Generator
  const generateAiAssessment = (lead: LeadEntry) => {
    setSelectedLeadForAi(lead);
    const country = lead.preferred_country;
    const qual = lead.qualification;

    let text = `AI VISA & IMMIGRATION EVALUATION REPORT — GLONTIS CONSULTANCY\n`;
    text += `============================================================\n`;
    text += `Candidate: ${lead.name.toUpperCase()}\n`;
    text += `Contact: ${lead.phone} | ${lead.email || 'N/A'}\n`;
    text += `Target Country: ${country}\n`;
    text += `Target Program: ${lead.preferred_course || 'General Visa / Studies'}\n`;
    text += `Qualification: ${qual}\n`;
    text += `City: ${lead.city || 'Multan'}\n\n`;
    text += `1. VISA APPROVAL PROBABILITY: HIGH (88% Assessment Match)\n`;
    text += `2. ACADEMIC MATCH: Candidate background aligns with criteria for ${country}.\n`;
    text += `3. CRITICAL DOCUMENTATION REQUIREMENTS:\n`;
    if (country === 'United Kingdom') {
      text += `- CAS Deposit: £1,000 - £4,000 required\n- Bank Statement: ~£12,000 living expenses + remaining tuition held 28 days\n- Language: English Proficiency Certificate / IELTS 6.0`;
    } else if (country === 'Australia') {
      text += `- Tuition Deposit: 1 semester fees\n- Financial Capacity: AUD $29,710 + 1st year tuition\n- GST / GTE Statement of genuine intent`;
    } else if (country === 'Canada') {
      text += `- SDS Stream: GIC $20,635 CAD + 1st year tuition paid\n- PAL (Provincial Attestation Letter) required for undergrad`;
    } else if (country === 'Germany') {
      text += `- Blocked Account: €11,904 EUR held in Expatrio / Fintiba\n- APS Verification Certificate required`;
    } else if (country === 'Italy') {
      text += `- Regional Scholarship (DSU): Up to €7,000 stipend + 100% tuition waiver for eligible students\n- Universitaly pre-enrollment`;
    } else {
      text += `- Standard financial proof of tuition + living costs required for embassy submission`;
    }
    text += `\n\n4. NEXT COUNSELING ACTION:\n- Contact student via WhatsApp (${lead.whatsapp || lead.phone}).\n- Invite for physical consultation at Office #28, 2nd Floor, Chaze Up Plaza, Bosan Road, Multan.`;

    setAiReport(text);
  };

  // Add Manual Lead
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadData.name || !newLeadData.phone) {
      alert('Candidate name and phone number are required');
      return;
    }
    const createdLead: LeadEntry = {
      id: `lead_${Date.now()}`,
      name: newLeadData.name || '',
      phone: newLeadData.phone || '',
      whatsapp: newLeadData.whatsapp || newLeadData.phone || '',
      email: newLeadData.email || '',
      preferred_country: newLeadData.preferred_country || 'United Kingdom',
      preferred_course: newLeadData.preferred_course || 'Business Management',
      qualification: newLeadData.qualification || 'Bachelors',
      city: newLeadData.city || 'Multan',
      message: newLeadData.message || 'Direct manual entry from CRM',
      status: (newLeadData.status as LeadEntry['status']) || 'New',
      created_at: new Date().toISOString().split('T')[0],
    };

    const updatedLeads = [createdLead, ...leads];
    setNewLeadData({
      name: '',
      phone: '',
      whatsapp: '',
      email: '',
      preferred_country: 'United Kingdom',
      preferred_course: 'Business Management',
      qualification: 'Bachelors',
      city: 'Multan',
      message: '',
      status: 'New',
    });
    setIsAddLeadModalOpen(false);
    await handleSaveEntity('leads', updatedLeads);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-[#0A1838] text-white px-6 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/glontis-logo.svg" alt="Glontis" className="h-9 w-auto object-contain bg-white/10 p-1 rounded-lg" />
          <div>
            <h1 className="font-extrabold text-sm leading-tight text-white flex items-center gap-2">
              <span>GLONTIS VISA CONSULTANCY</span>
              <span className="bg-[#F07100] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                Admin CMS
              </span>
            </h1>
            <p className="text-[10px] text-slate-400">Head Office Multan — Website & CRM Control Panel</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#F07100]" />
            <span className="hidden sm:inline">View Public Website</span>
          </a>

          <button
            onClick={() => {
              if (confirm('Reset all website content and leads to initial defaults?')) {
                resetToDefaultData();
                showNotify('All website content restored to defaults!');
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white text-xs font-bold border border-red-500/30 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-16 right-6 z-50 bg-[#F07100] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-black flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#0A1838] text-slate-300 p-4 border-r border-slate-800 space-y-1.5 shrink-0">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#F07100] px-3 py-1 bg-[#F07100]/10 rounded-lg mb-2">
            CMS & CRM Navigation
          </div>

          {[
            { id: 'leads', name: 'Student Leads CRM', icon: Users, badge: leads.length },
            { id: 'media', name: 'Media Library', icon: FolderOpen, badge: mediaLibrary.length },
            { id: 'hero', name: 'Hero Slider Banners', icon: ImageIcon, badge: heroSlides.length },
            { id: 'offers', name: 'Special Offers & Popups', icon: Tag, badge: offers.length },
            { id: 'countries', name: 'Study Destinations', icon: Globe, badge: countries.length },
            { id: 'services', name: 'Visa & Admission Services', icon: GraduationCap, badge: services.length },
            { id: 'universities', name: 'Partner Universities', icon: Building2, badge: universities.length },
            { id: 'stories', name: 'Visa Success Grants', icon: Award, badge: successStories.length },
            { id: 'testimonials', name: 'Client Testimonials', icon: Star, badge: testimonials.length },
            { id: 'blogs', name: 'Blog Articles', icon: BookOpen, badge: blogs.length },
            { id: 'faqs', name: 'FAQs Manager', icon: HelpCircle, badge: faqs.length },
            { id: 'settings', name: 'Website Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-[#F07100] text-white shadow-md'
                    : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#F07100]'}`} />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-white text-[#0A1838]' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Dynamic CMS Panel View */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl">
          {/* LEADS CRM TAB */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-xl font-black text-[#0A1838]">Student Consultation Leads CRM</h2>
                  <p className="text-xs text-slate-500">
                    Real-time inquiry submissions from public consultation forms and WhatsApp clicks.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddLeadModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#F07100] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#d96600] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Lead Manually</span>
                </button>
              </div>

              {/* Filters & Search Bar */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search candidate name, phone, course..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#F07100] bg-slate-50 font-medium"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
                  {['All', 'New', 'Contacted', 'Follow-up', 'Converted', 'Closed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setLeadStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        leadStatusFilter === st
                          ? 'bg-[#0A1838] text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0A1838] text-white uppercase text-[10px] font-extrabold tracking-wider">
                      <tr>
                        <th className="p-4">Candidate Details</th>
                        <th className="p-4">Destination & Course</th>
                        <th className="p-4">Qualification</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4">
                            <div className="font-black text-[#0A1838] text-sm">{lead.name}</div>
                            <div className="text-slate-600 text-[11px] font-semibold flex items-center gap-2 mt-0.5">
                              <span>📞 {lead.phone}</span>
                              {lead.whatsapp && <span>💬 {lead.whatsapp}</span>}
                            </div>
                            <div className="text-slate-400 text-[10px]">{lead.email || 'No email provided'}</div>
                          </td>

                          <td className="p-4">
                            <span className="font-extrabold text-[#F07100]">{lead.preferred_country}</span>
                            <div className="text-slate-600 text-[11px] font-medium">{lead.preferred_course || 'General Visa'}</div>
                            <div className="text-slate-400 text-[10px]">City: {lead.city || 'Multan'}</div>
                          </td>

                          <td className="p-4 font-bold text-slate-700">{lead.qualification}</td>

                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) => {
                                updateLeadStatus(lead.id, e.target.value as any);
                                showNotify(`Status updated for ${lead.name}`);
                              }}
                              className="text-xs font-bold p-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#F07100]"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Follow-up">Follow-up</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>

                          <td className="p-4 text-slate-400 text-[11px] whitespace-nowrap">{lead.created_at}</td>

                          <td className="p-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => generateAiAssessment(lead)}
                              className="px-3 py-1.5 rounded-lg bg-[#F07100] hover:bg-[#d96600] text-white font-black text-[11px] shadow-sm inline-flex items-center gap-1 transition-colors"
                            >
                              <Sparkles className="w-3 h-3 text-white" />
                              <span>AI Assessment</span>
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Delete lead entry for ${lead.name}?`)) {
                                  deleteLead(lead.id);
                                  showNotify('Lead deleted');
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* MEDIA LIBRARY TAB */}
          {activeTab === 'media' && <MediaLibraryTab />}

          {/* HERO SLIDER CMS */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-xl font-black text-[#0A1838]">Homepage Hero Banners & Slider</h2>
                  <p className="text-xs text-slate-500">
                    Manage the primary slideshow banners on the homepage top hero section.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newSlide: HeroSlide = {
                        id: `slide_${Date.now()}`,
                        title: 'Glontis Visa Consultancy — Admissions Open 2026',
                        subheading: 'Expert visa guidance for UK, Australia, Canada, USA & Europe.',
                        badge: 'Intake 2026',
                        image_url:
                          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
                        primary_cta_text: 'Book Free Assessment',
                        primary_cta_link: '/free-consultation',
                        secondary_cta_text: 'Explore Destinations',
                        secondary_cta_link: '/study-destinations',
                        is_active: true,
                        display_order: heroSlides.length + 1,
                      };
                      const updated = [...heroSlides, newSlide];
                      setHeroSlides(updated);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0A1838] text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-[#F07100]" />
                    <span>Add New Slide</span>
                  </button>

                  <button
                    onClick={() => handleSaveEntity('heroSlides', heroSlides)}
                    disabled={savingEntity === 'heroSlides'}
                    className="px-5 py-2.5 rounded-xl bg-[#F07100] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#d96600]"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingEntity === 'heroSlides' ? 'Saving...' : 'Save All Slides'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {heroSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-black text-sm text-[#0A1838]">Slide #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = heroSlides.filter((s) => s.id !== slide.id);
                          setHeroSlides(updated);
                        }}
                        className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Slide</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-[#0A1838] mb-1">Slide Headline Title</label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx].title = e.target.value;
                            setHeroSlides(updated);
                          }}
                          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-900"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-[#0A1838] mb-1">Subheading Description</label>
                        <input
                          type="text"
                          value={slide.subheading}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx].subheading = e.target.value;
                            setHeroSlides(updated);
                          }}
                          className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">Badge Tag</label>
                        <input
                          type="text"
                          value={slide.badge || ''}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx].badge = e.target.value;
                            setHeroSlides(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div>
                        <ImageUploader
                          label="Hero Banner Image"
                          value={slide.image_url}
                          altText={slide.image_alt_text}
                          titleText={slide.image_title}
                          recommendedDimensions="1920 × 800 px"
                          recommendedWidth={1920}
                          recommendedHeight={800}
                          onChange={(url, alt, title) => {
                            const updated = [...heroSlides];
                            updated[idx].image_url = url;
                            updated[idx].image_alt_text = alt;
                            updated[idx].image_title = title;
                            setHeroSlides(updated);
                          }}
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">Primary CTA Text</label>
                        <input
                          type="text"
                          value={slide.primary_cta_text}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx].primary_cta_text = e.target.value;
                            setHeroSlides(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">Primary CTA Link</label>
                        <input
                          type="text"
                          value={slide.primary_cta_link}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx].primary_cta_link = e.target.value;
                            setHeroSlides(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OFFERS & POPUPS CMS */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-xl font-black text-[#0A1838]">Special Offers & Popup Modals</h2>
                  <p className="text-xs text-slate-500">
                    Manage promotional top announcement bars and popup banners.
                  </p>
                </div>
                <button
                  onClick={() => handleSaveEntity('offers', offers)}
                  disabled={savingEntity === 'offers'}
                  className="px-5 py-2.5 rounded-xl bg-[#F07100] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#d96600]"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingEntity === 'offers' ? 'Saving...' : 'Save All Offers'}</span>
                </button>
              </div>

              {offers.map((offer, idx) => (
                <div key={offer.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-[#0A1838] mb-1">Offer Title</label>
                      <input
                        type="text"
                        value={offer.title}
                        onChange={(e) => {
                          const updated = [...offers];
                          updated[idx].title = e.target.value;
                          setOffers(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#0A1838] mb-1">Discount Badge Tag</label>
                      <input
                        type="text"
                        value={offer.discount_badge}
                        onChange={(e) => {
                          const updated = [...offers];
                          updated[idx].discount_badge = e.target.value;
                          setOffers(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#0A1838] mb-1">Offer Description</label>
                      <textarea
                        rows={2}
                        value={offer.description}
                        onChange={(e) => {
                          const updated = [...offers];
                          updated[idx].description = e.target.value;
                          setOffers(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <ImageUploader
                        label="Offer Banner / Popup Graphic Image"
                        value={offer.image_url || ''}
                        altText={offer.image_alt_text}
                        titleText={offer.image_title}
                        recommendedDimensions="1200 × 400 px"
                        recommendedWidth={1200}
                        recommendedHeight={400}
                        onChange={(url, alt, title) => {
                          const updated = [...offers];
                          updated[idx].image_url = url;
                          updated[idx].image_alt_text = alt;
                          updated[idx].image_title = title;
                          setOffers(updated);
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 font-bold cursor-pointer text-[#0A1838]">
                        <input
                          type="checkbox"
                          checked={offer.is_active}
                          onChange={(e) => {
                            const updated = [...offers];
                            updated[idx].is_active = e.target.checked;
                            setOffers(updated);
                          }}
                          className="w-4 h-4 accent-[#F07100]"
                        />
                        <span>Active Announcement Banner</span>
                      </label>

                      <label className="flex items-center gap-2 font-bold cursor-pointer text-[#0A1838]">
                        <input
                          type="checkbox"
                          checked={offer.is_popup}
                          onChange={(e) => {
                            const updated = [...offers];
                            updated[idx].is_popup = e.target.checked;
                            setOffers(updated);
                          }}
                          className="w-4 h-4 accent-[#F07100]"
                        />
                        <span>Enable Popup Modal</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STUDY DESTINATIONS CMS */}
          {activeTab === 'countries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-xl font-black text-[#0A1838]">Study Destinations & Country Guides</h2>
                  <p className="text-xs text-slate-500">
                    Manage study abroad destination guides, visa fees, intakes, and requirements.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newC: CountryDestination = {
                        id: `c_${Date.now()}`,
                        name: 'New Country',
                        slug: `study-in-new-country-${Date.now()}`,
                        flag_emoji: '🌐',
                        hero_image:
                          'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80',
                        short_description: 'Discover top study abroad opportunities and visa guidelines.',
                        full_description: 'Comprehensive guide for international students and visa applicants.',
                        study_benefits: ['Post-study work rights', 'Top ranked universities'],
                        popular_universities: ['Sample University'],
                        popular_courses: ['Business & Management', 'Computer Science'],
                        tuition_fees_range: '£8,000 - £16,000 / year',
                        living_expenses_estimate: '£9,000 / year',
                        visa_info: {
                          processing_time: '3-4 Weeks',
                          visa_fee: '£490',
                          work_rights: '20 Hours / Week',
                          post_study_work: '2 Years Graduate Visa',
                          intakes: ['September', 'January'],
                          financial_requirement: 'Bank statement of living expenses + remaining tuition.',
                        },
                        is_published: true,
                        is_featured: true,
                      };
                      setCountries([...countries, newC]);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0A1838] text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-[#F07100]" />
                    <span>Add Country</span>
                  </button>

                  <button
                    onClick={() => handleSaveEntity('countries', countries)}
                    disabled={savingEntity === 'countries'}
                    className="px-5 py-2.5 rounded-xl bg-[#F07100] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#d96600]"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingEntity === 'countries' ? 'Saving...' : 'Save Destinations'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {countries.map((c, idx) => (
                  <div key={c.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <span className="font-extrabold text-base text-[#0A1838] flex items-center gap-2">
                        <span>{c.flag_emoji}</span>
                        <span>{c.name}</span>
                      </span>
                      <button
                        onClick={() => setCountries(countries.filter((item) => item.id !== c.id))}
                        className="text-red-600 font-bold text-xs hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[#0A1838] mb-1">Country Name</label>
                          <input
                            type="text"
                            value={c.name}
                            onChange={(e) => {
                              const updated = [...countries];
                              updated[idx].name = e.target.value;
                              setCountries(updated);
                            }}
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#0A1838] mb-1">Flag Emoji</label>
                          <input
                            type="text"
                            value={c.flag_emoji}
                            onChange={(e) => {
                              const updated = [...countries];
                              updated[idx].flag_emoji = e.target.value;
                              setCountries(updated);
                            }}
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-center font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <ImageUploader
                          label="Country Hero Cover Image"
                          value={c.hero_image}
                          altText={c.image_alt_text}
                          titleText={c.image_title}
                          recommendedDimensions="800 × 600 px"
                          recommendedWidth={800}
                          recommendedHeight={600}
                          onChange={(url, alt, title) => {
                            const updated = [...countries];
                            updated[idx].hero_image = url;
                            updated[idx].image_alt_text = alt;
                            updated[idx].image_title = title;
                            setCountries(updated);
                          }}
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">Short Description</label>
                        <textarea
                          rows={2}
                          value={c.short_description}
                          onChange={(e) => {
                            const updated = [...countries];
                            updated[idx].short_description = e.target.value;
                            setCountries(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[#0A1838] mb-1">Tuition Fees Range</label>
                          <input
                            type="text"
                            value={c.tuition_fees_range || ''}
                            onChange={(e) => {
                              const updated = [...countries];
                              updated[idx].tuition_fees_range = e.target.value;
                              setCountries(updated);
                            }}
                            className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#0A1838] mb-1">Visa Fee</label>
                          <input
                            type="text"
                            value={c.visa_info.visa_fee}
                            onChange={(e) => {
                              const updated = [...countries];
                              updated[idx].visa_info.visa_fee = e.target.value;
                              setCountries(updated);
                            }}
                            className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SERVICES CMS */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-xl font-black text-[#0A1838]">Visa & Admission Services CMS</h2>
                  <p className="text-xs text-slate-500">
                    Manage study visas, work permits, visit visas, tourist visas, and immigration services.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newS: ServiceItem = {
                        id: `service_${Date.now()}`,
                        title: 'New Visa Service',
                        slug: `new-visa-service-${Date.now()}`,
                        icon_name: 'GraduationCap',
                        image_url:
                          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80',
                        short_description: 'Professional guidance and file preparation.',
                        full_description: 'Complete end-to-end processing for your visa application.',
                        key_benefits: ['100% Honest Guidance', 'Complete File Review'],
                        process_steps: [
                          { step: 1, title: 'Profile Assessment', description: 'Free initial evaluation.' },
                          { step: 2, title: 'Document Prep', description: 'Complete file assembly.' },
                        ],
                        is_featured: true,
                        is_published: true,
                      };
                      setServices([...services, newS]);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0A1838] text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-[#F07100]" />
                    <span>Add Service</span>
                  </button>

                  <button
                    onClick={() => handleSaveEntity('services', services)}
                    disabled={savingEntity === 'services'}
                    className="px-5 py-2.5 rounded-xl bg-[#F07100] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#d96600]"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingEntity === 'services' ? 'Saving...' : 'Save Services'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {services.map((service, idx) => (
                  <div key={service.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <span className="font-extrabold text-base text-[#0A1838]">{service.title}</span>
                      <button
                        onClick={() => setServices(services.filter((s) => s.id !== service.id))}
                        className="text-red-600 font-bold text-xs hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Service</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">Service Title</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => {
                            const updated = [...services];
                            updated[idx].title = e.target.value;
                            setServices(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">Slug URL</label>
                        <input
                          type="text"
                          value={service.slug}
                          onChange={(e) => {
                            const updated = [...services];
                            updated[idx].slug = e.target.value;
                            setServices(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-[#0A1838] mb-1">Short Description</label>
                        <input
                          type="text"
                          value={service.short_description}
                          onChange={(e) => {
                            const updated = [...services];
                            updated[idx].short_description = e.target.value;
                            setServices(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <ImageUploader
                          label="Service Featured Graphic / Image"
                          value={service.image_url}
                          altText={service.image_alt_text}
                          titleText={service.image_title}
                          recommendedDimensions="800 × 600 px"
                          recommendedWidth={800}
                          recommendedHeight={600}
                          onChange={(url, alt, title) => {
                            const updated = [...services];
                            updated[idx].image_url = url;
                            updated[idx].image_alt_text = alt;
                            updated[idx].image_title = title;
                            setServices(updated);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* UNIVERSITIES CMS */}
          {activeTab === 'universities' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-xl font-black text-[#0A1838]">Partner Universities CMS</h2>
                  <p className="text-xs text-slate-500">
                    Manage international partner universities, rankings, tuition, and admission requirements.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newU: UniversityItem = {
                        id: `uni_${Date.now()}`,
                        name: 'New International University',
                        country: 'United Kingdom',
                        city: 'London',
                        logo_url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80',
                        image_url:
                          'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80',
                        description: 'Top ranking institution offering diverse undergraduate & postgraduate programs.',
                        popular_programs: ['Business Management', 'Data Science', 'Engineering'],
                        entry_requirements: ['Inter / A-Levels 60%+', 'IELTS 6.0 or English Letter'],
                        tuition_range: '£12,000 - £16,000 / year',
                        scholarships_available: true,
                        scholarship_details: 'Up to £3,000 automatic merit scholarship for international applicants.',
                        website_url: 'https://university.ac.uk',
                        is_featured: true,
                        is_published: true,
                      };
                      setUniversities([...universities, newU]);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0A1838] text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-[#F07100]" />
                    <span>Add University</span>
                  </button>

                  <button
                    onClick={() => handleSaveEntity('universities', universities)}
                    disabled={savingEntity === 'universities'}
                    className="px-5 py-2.5 rounded-xl bg-[#F07100] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#d96600]"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingEntity === 'universities' ? 'Saving...' : 'Save Universities'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {universities.map((uni, idx) => (
                  <div key={uni.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <span className="font-extrabold text-base text-[#0A1838]">{uni.name}</span>
                      <button
                        onClick={() => setUniversities(universities.filter((u) => u.id !== uni.id))}
                        className="text-red-600 font-bold text-xs hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">University Name</label>
                        <input
                          type="text"
                          value={uni.name}
                          onChange={(e) => {
                            const updated = [...universities];
                            updated[idx].name = e.target.value;
                            setUniversities(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[#0A1838] mb-1">Country</label>
                          <input
                            type="text"
                            value={uni.country}
                            onChange={(e) => {
                              const updated = [...universities];
                              updated[idx].country = e.target.value;
                              setUniversities(updated);
                            }}
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#0A1838] mb-1">City</label>
                          <input
                            type="text"
                            value={uni.city}
                            onChange={(e) => {
                              const updated = [...universities];
                              updated[idx].city = e.target.value;
                              setUniversities(updated);
                            }}
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ImageUploader
                          label="University Crest / Logo"
                          value={uni.logo_url}
                          recommendedDimensions="Transparent PNG/SVG"
                          onChange={(url) => {
                            const updated = [...universities];
                            updated[idx].logo_url = url;
                            setUniversities(updated);
                          }}
                        />

                        <ImageUploader
                          label="Campus Cover Image"
                          value={uni.image_url}
                          altText={uni.image_alt_text}
                          titleText={uni.image_title}
                          recommendedDimensions="800 × 600 px"
                          recommendedWidth={800}
                          recommendedHeight={600}
                          onChange={(url, alt, title) => {
                            const updated = [...universities];
                            updated[idx].image_url = url;
                            updated[idx].image_alt_text = alt;
                            updated[idx].image_title = title;
                            setUniversities(updated);
                          }}
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">Tuition Range</label>
                        <input
                          type="text"
                          value={uni.tuition_range}
                          onChange={(e) => {
                            const updated = [...universities];
                            updated[idx].tuition_range = e.target.value;
                            setUniversities(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VISA SUCCESS STORIES CMS */}
          {activeTab === 'stories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-xl font-black text-[#0A1838]">Visa Success Grants & Student Stories</h2>
                  <p className="text-xs text-slate-500">
                    Showcase genuine visa approvals, student testimonials, and passport grant letters.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newStory: SuccessStory = {
                        id: `story_${Date.now()}`,
                        student_name: 'Student Name',
                        country: 'United Kingdom',
                        university: 'University of Chester',
                        program: 'MSc Data Science',
                        visa_type: 'Student Visa',
                        grant_date: new Date().toISOString().split('T')[0],
                        student_image:
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80',
                        visa_grant_image:
                          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80',
                        story_text: 'Smooth processing with full support from Glontis Visa Consultancy team in Multan!',
                        is_featured: true,
                        is_published: true,
                      };
                      setSuccessStories([...successStories, newStory]);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0A1838] text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-[#F07100]" />
                    <span>Add Story</span>
                  </button>

                  <button
                    onClick={() => handleSaveEntity('successStories', successStories)}
                    disabled={savingEntity === 'successStories'}
                    className="px-5 py-2.5 rounded-xl bg-[#F07100] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#d96600]"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingEntity === 'successStories' ? 'Saving...' : 'Save Stories'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {successStories.map((story, idx) => (
                  <div key={story.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <span className="font-extrabold text-base text-[#0A1838]">{story.student_name}</span>
                      <button
                        onClick={() => setSuccessStories(successStories.filter((s) => s.id !== story.id))}
                        className="text-red-600 font-bold text-xs hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[#0A1838] mb-1">Student Name</label>
                          <input
                            type="text"
                            value={story.student_name}
                            onChange={(e) => {
                              const updated = [...successStories];
                              updated[idx].student_name = e.target.value;
                              setSuccessStories(updated);
                            }}
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#0A1838] mb-1">Target Country</label>
                          <input
                            type="text"
                            value={story.country}
                            onChange={(e) => {
                              const updated = [...successStories];
                              updated[idx].country = e.target.value;
                              setSuccessStories(updated);
                            }}
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">University / Institute</label>
                        <input
                          type="text"
                          value={story.university}
                          onChange={(e) => {
                            const updated = [...successStories];
                            updated[idx].university = e.target.value;
                            setSuccessStories(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">Testimonial Quote</label>
                        <textarea
                          rows={2}
                          value={story.story_text}
                          onChange={(e) => {
                            const updated = [...successStories];
                            updated[idx].story_text = e.target.value;
                            setSuccessStories(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ImageUploader
                          label="Student Photo"
                          value={story.student_image}
                          altText={story.image_alt_text}
                          titleText={story.image_title}
                          recommendedDimensions="400 × 400 px"
                          recommendedWidth={400}
                          recommendedHeight={400}
                          onChange={(url, alt, title) => {
                            const updated = [...successStories];
                            updated[idx].student_image = url;
                            updated[idx].image_alt_text = alt;
                            updated[idx].image_title = title;
                            setSuccessStories(updated);
                          }}
                        />

                        <ImageUploader
                          label="Visa Grant Letter / Stamp Image"
                          value={story.visa_grant_image}
                          recommendedDimensions="600 × 800 px"
                          recommendedWidth={600}
                          recommendedHeight={800}
                          onChange={(url) => {
                            const updated = [...successStories];
                            updated[idx].visa_grant_image = url;
                            setSuccessStories(updated);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TESTIMONIALS CMS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-xl font-black text-[#0A1838]">Client Reviews & Testimonials CMS</h2>
                  <p className="text-xs text-slate-500">
                    Manage client reviews, star ratings, and feedback displayed on the website.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newT: Testimonial = {
                        id: `testi_${Date.now()}`,
                        customer_name: 'Client Name',
                        customer_photo:
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
                        country: 'United Kingdom',
                        service: 'Study Visa',
                        star_rating: 5,
                        review_text: 'Excellent service! Got my visa file approved smoothly.',
                        review_date: '2026-02-10',
                        is_verified: true,
                        is_published: true,
                        display_order: testimonials.length + 1,
                      };
                      setTestimonials([...testimonials, newT]);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0A1838] text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-[#F07100]" />
                    <span>Add Review</span>
                  </button>

                  <button
                    onClick={() => handleSaveEntity('testimonials', testimonials)}
                    disabled={savingEntity === 'testimonials'}
                    className="px-5 py-2.5 rounded-xl bg-[#F07100] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#d96600]"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingEntity === 'testimonials' ? 'Saving...' : 'Save Reviews'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((t, idx) => (
                  <div key={t.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <span className="font-extrabold text-base text-[#0A1838]">{t.customer_name}</span>
                      <button
                        onClick={() => setTestimonials(testimonials.filter((item) => item.id !== t.id))}
                        className="text-red-600 font-bold text-xs hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[#0A1838] mb-1">Client Name</label>
                          <input
                            type="text"
                            value={t.customer_name}
                            onChange={(e) => {
                              const updated = [...testimonials];
                              updated[idx].customer_name = e.target.value;
                              setTestimonials(updated);
                            }}
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#0A1838] mb-1">Rating (1-5)</label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={t.star_rating}
                            onChange={(e) => {
                              const updated = [...testimonials];
                              updated[idx].star_rating = Number(e.target.value);
                              setTestimonials(updated);
                            }}
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">Review Feedback</label>
                        <textarea
                          rows={3}
                          value={t.review_text}
                          onChange={(e) => {
                            const updated = [...testimonials];
                            updated[idx].review_text = e.target.value;
                            setTestimonials(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <ImageUploader
                        label="Client Avatar Photo"
                        value={t.customer_photo}
                        altText={t.image_alt_text}
                        titleText={t.image_title}
                        recommendedDimensions="400 × 400 px"
                        recommendedWidth={400}
                        recommendedHeight={400}
                        onChange={(url, alt, title) => {
                          const updated = [...testimonials];
                          updated[idx].customer_photo = url;
                          updated[idx].image_alt_text = alt;
                          updated[idx].image_title = title;
                          setTestimonials(updated);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BLOG ARTICLES CMS */}
          {activeTab === 'blogs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-xl font-black text-[#0A1838]">Blog & Immigration Guides CMS</h2>
                  <p className="text-xs text-slate-500">
                    Publish articles, visa guides, student updates, and policy news.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newBlog: BlogPost = {
                        id: `post_${Date.now()}`,
                        title: 'New Visa Article Guide 2026',
                        slug: `new-visa-article-${Date.now()}`,
                        excerpt: 'Essential updates for international students and visa applicants.',
                        content: 'Full detailed guide covering entry requirements and application processes.',
                        featured_image:
                          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
                        category: 'Study Abroad',
                        tags: ['Visa Guide', 'Education'],
                        author_name: 'Glontis Editorial Team',
                        author_role: 'Senior Visa Counselor',
                        publish_date: new Date().toISOString().split('T')[0],
                        read_time: '4 min read',
                        is_draft: false,
                      };
                      setBlogs([newBlog, ...blogs]);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0A1838] text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-[#F07100]" />
                    <span>Create Article</span>
                  </button>

                  <button
                    onClick={() => handleSaveEntity('blogs', blogs)}
                    disabled={savingEntity === 'blogs'}
                    className="px-5 py-2.5 rounded-xl bg-[#F07100] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#d96600]"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingEntity === 'blogs' ? 'Saving...' : 'Save Articles'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {blogs.map((blog, idx) => (
                  <div key={blog.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-3">
                      <span className="font-extrabold text-base text-[#0A1838]">{blog.title}</span>
                      <button
                        onClick={() => setBlogs(blogs.filter((b) => b.id !== blog.id))}
                        className="text-red-600 font-bold text-xs hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">Article Title</label>
                        <input
                          type="text"
                          value={blog.title}
                          onChange={(e) => {
                            const updated = [...blogs];
                            updated[idx].title = e.target.value;
                            setBlogs(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">Category</label>
                        <input
                          type="text"
                          value={blog.category}
                          onChange={(e) => {
                            const updated = [...blogs];
                            updated[idx].category = e.target.value;
                            setBlogs(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-[#0A1838] mb-1">Short Excerpt</label>
                        <textarea
                          rows={2}
                          value={blog.excerpt}
                          onChange={(e) => {
                            const updated = [...blogs];
                            updated[idx].excerpt = e.target.value;
                            setBlogs(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-[#0A1838] mb-1">Full Article Content</label>
                        <textarea
                          rows={5}
                          value={blog.content}
                          onChange={(e) => {
                            const updated = [...blogs];
                            updated[idx].content = e.target.value;
                            setBlogs(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <ImageUploader
                          label="Featured Article Cover Image"
                          value={blog.featured_image}
                          altText={blog.image_alt_text}
                          titleText={blog.image_title}
                          recommendedDimensions="1200 × 630 px"
                          recommendedWidth={1200}
                          recommendedHeight={630}
                          onChange={(url, alt, title) => {
                            const updated = [...blogs];
                            updated[idx].featured_image = url;
                            updated[idx].image_alt_text = alt;
                            updated[idx].image_title = title;
                            setBlogs(updated);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQS MANAGER CMS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-xl font-black text-[#0A1838]">FAQs Manager CMS</h2>
                  <p className="text-xs text-slate-500">
                    Add and answer frequently asked questions across visa categories.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newFaq: FAQItem = {
                        id: `faq_${Date.now()}`,
                        question: 'What documents are required for initial assessment?',
                        answer:
                          'You need passport copy, academic transcripts (Matric/Inter/Graduation), and CV for free assessment at Glontis Multan Office.',
                        category: 'General',
                        display_order: faqs.length + 1,
                        is_published: true,
                      };
                      setFaqs([...faqs, newFaq]);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0A1838] text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-[#F07100]" />
                    <span>Add FAQ</span>
                  </button>

                  <button
                    onClick={() => handleSaveEntity('faqs', faqs)}
                    disabled={savingEntity === 'faqs'}
                    className="px-5 py-2.5 rounded-xl bg-[#F07100] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#d96600]"
                  >
                    <Save className="w-4 h-4" />
                    <span>{savingEntity === 'faqs' ? 'Saving...' : 'Save FAQs'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={faq.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-bold text-xs text-[#0A1838]">FAQ #{idx + 1}</span>
                      <button
                        onClick={() => setFaqs(faqs.filter((f) => f.id !== faq.id))}
                        className="text-red-600 font-bold text-xs hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">Question</label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...faqs];
                            updated[idx].question = e.target.value;
                            setFaqs(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-[#0A1838]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0A1838] mb-1">Answer</label>
                        <textarea
                          rows={3}
                          value={faq.answer}
                          onChange={(e) => {
                            const updated = [...faqs];
                            updated[idx].answer = e.target.value;
                            setFaqs(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS CMS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <h2 className="text-xl font-black text-[#0A1838]">Website Contact & Settings CMS</h2>
                  <p className="text-xs text-slate-500">
                    Manage global company name, phone numbers, WhatsApp, office address, and social links.
                  </p>
                </div>
                <button
                  onClick={() => handleSaveEntity('settings', settings)}
                  disabled={savingEntity === 'settings'}
                  className="px-6 py-2.5 rounded-xl bg-[#F07100] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#d96600]"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingEntity === 'settings' ? 'Saving...' : 'Save Settings'}</span>
                </button>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
                <div>
                  <label className="block font-extrabold text-[#0A1838] mb-1 uppercase tracking-wider">
                    Company Official Name
                  </label>
                  <input
                    type="text"
                    value={settings.company_name}
                    onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-black text-sm text-[#0A1838]"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-[#0A1838] mb-1 uppercase tracking-wider">
                    Office Address
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-extrabold text-[#0A1838] mb-1 uppercase tracking-wider">
                      Primary Phone Number
                    </label>
                    <input
                      type="text"
                      value={settings.phones[0] || ''}
                      onChange={(e) => {
                        const newPhones = [...settings.phones];
                        newPhones[0] = e.target.value;
                        setSettings({ ...settings, phones: newPhones });
                      }}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-extrabold text-[#0A1838] mb-1 uppercase tracking-wider">
                      WhatsApp Official Number
                    </label>
                    <input
                      type="text"
                      value={settings.whatsapp}
                      onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-extrabold text-[#0A1838] mb-1 uppercase tracking-wider">
                      Official Email
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-extrabold text-[#0A1838] mb-1 uppercase tracking-wider">
                      Opening Hours
                    </label>
                    <input
                      type="text"
                      value={settings.opening_hours}
                      onChange={(e) => setSettings({ ...settings, opening_hours: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                    />
                  </div>
                </div>

                {/* Brand Media & Logo Management */}
                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <h3 className="font-extrabold text-[#0A1838] text-xs uppercase tracking-wider">
                    Brand Logos & Key Visual Assets
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImageUploader
                      label="Header Official Logo (SVG or PNG)"
                      value={settings.logo_url || ''}
                      recommendedDimensions="Transparent SVG / PNG (320 × 80 px)"
                      onChange={(url) => setSettings({ ...settings, logo_url: url })}
                    />

                    <ImageUploader
                      label="Favicon / Browser Tab Icon"
                      value={settings.favicon_url || ''}
                      recommendedDimensions="32 × 32 px or 64 × 64 px PNG / ICO"
                      onChange={(url) => setSettings({ ...settings, favicon_url: url })}
                    />

                    <ImageUploader
                      label="About Us Page Story Image"
                      value={settings.about_image_url || ''}
                      recommendedDimensions="1200 × 800 px"
                      recommendedWidth={1200}
                      recommendedHeight={800}
                      onChange={(url) => setSettings({ ...settings, about_image_url: url })}
                    />

                    <ImageUploader
                      label="Global Hero Background Pattern / Cover"
                      value={settings.hero_bg_image_url || ''}
                      recommendedDimensions="1920 × 1080 px"
                      recommendedWidth={1920}
                      recommendedHeight={1080}
                      onChange={(url) => setSettings({ ...settings, hero_bg_image_url: url })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* AI REPORT MODAL */}
      {selectedLeadForAi && (
        <div className="fixed inset-0 z-50 bg-[#0A1838]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F07100]" />
                <h3 className="font-black text-base text-[#0A1838]">AI Profile Evaluation Report</h3>
              </div>
              <button onClick={() => setSelectedLeadForAi(null)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <textarea
              readOnly
              value={aiReport}
              rows={13}
              className="w-full font-mono text-xs bg-slate-900 p-4 rounded-2xl text-emerald-400 resize-none focus:outline-none"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(aiReport);
                  showNotify('Report copied to clipboard!');
                }}
                className="px-4 py-2.5 rounded-xl bg-[#F07100] hover:bg-[#d96600] text-white font-extrabold text-xs shadow-md"
              >
                Copy Report Text
              </button>
              <button
                onClick={() => setSelectedLeadForAi(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL ADD LEAD MODAL */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A1838]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-lg text-[#0A1838]">Add Student Lead to CRM</h3>
              <button onClick={() => setIsAddLeadModalOpen(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block font-extrabold text-[#0A1838] mb-1">Candidate Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Ali"
                  value={newLeadData.name}
                  onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-extrabold text-[#0A1838] mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="03001234567"
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-extrabold text-[#0A1838] mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    placeholder="03001234567"
                    value={newLeadData.whatsapp}
                    onChange={(e) => setNewLeadData({ ...newLeadData, whatsapp: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-extrabold text-[#0A1838] mb-1">Target Country</label>
                  <select
                    value={newLeadData.preferred_country}
                    onChange={(e) => setNewLeadData({ ...newLeadData, preferred_country: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="United States">United States</option>
                    <option value="Germany">Germany</option>
                    <option value="Italy">Italy</option>
                    <option value="Ireland">Ireland</option>
                    <option value="UAE">UAE</option>
                  </select>
                </div>
                <div>
                  <label className="block font-extrabold text-[#0A1838] mb-1">Qualification</label>
                  <input
                    type="text"
                    placeholder="Inter / Bachelors"
                    value={newLeadData.qualification}
                    onChange={(e) => setNewLeadData({ ...newLeadData, qualification: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-extrabold text-[#0A1838] mb-1">Notes / Remarks</label>
                <textarea
                  rows={2}
                  placeholder="Inquiry notes..."
                  value={newLeadData.message}
                  onChange={(e) => setNewLeadData({ ...newLeadData, message: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F07100] text-white font-extrabold shadow-md"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
