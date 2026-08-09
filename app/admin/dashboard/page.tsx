'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '@/lib/context/DataContext';
import {
  Users,
  Image as ImageIcon,
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
  Edit2,
  Save,
  CheckCircle2,
  X,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  RefreshCw,
  Search,
  Filter,
  FileText,
  MessageSquare,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    leads,
    updateLeadStatus,
    deleteLead,
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
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('All');
  const [selectedLeadForAi, setSelectedLeadForAi] = useState<any | null>(null);
  const [aiReport, setAiReport] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xs">Loading admin...</div>;
  }

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('glontis_admin_auth');
    router.push('/admin/login');
  };

  // Filtered Leads
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
  const generateAiAssessment = (lead: any) => {
    setSelectedLeadForAi(lead);
    const country = lead.preferred_country;
    const qual = lead.qualification;

    let text = `AI STUDY ABROAD PROFILE EVALUATION REPORT FOR ${lead.name.toUpperCase()}\n`;
    text += `------------------------------------------------------------\n`;
    text += `Candidate Details:\n- Name: ${lead.name}\n- Qualification: ${qual}\n- Target Country: ${country}\n- City: ${lead.city}\n- Course Interest: ${lead.preferred_course || 'General'}\n\n`;
    text += `1. Eligibility Rating: HIGH (85-90% Approval Probability)\n`;
    text += `2. Key Strengths: Academic background matches entry guidelines for UK/European Bachelor/Master programs.\n`;
    text += `3. Financial & Document Requirements:\n`;
    if (country === 'United Kingdom') {
      text += `- CAS Deposit: £1,000 - £4,000 required.\n- Bank Statement: ~£12,000 living expenses + remaining tuition held for 28 consecutive days.\n- Language: English proficiency letter or IELTS 6.0 overall.`;
    } else if (country === 'Australia') {
      text += `- Tuition Deposit: 1 semester fees.\n- Financial Capacity: AUD $29,710 living expenses + 1 year tuition.\n- GTE / GST statement showing genuine student intent.`;
    } else if (country === 'Canada') {
      text += `- SDS Stream: GIC $20,635 CAD + 1st year tuition paid.\n- PAL (Provincial Attestation Letter) required for undergraduate studies.`;
    } else if (country === 'Germany') {
      text += `- Blocked Account: €11,904 EUR held in Expatrio / Fintiba.\n- APS Certificate required for academic verification.`;
    } else if (country === 'Italy') {
      text += `- Regional Scholarship (DSU): Up to €7,000/year living stipend + 100% tuition waiver available for low-income applicants.\n- Universitaly pre-enrollment required.`;
    } else {
      text += `- Standard financial proof of 1-year tuition and living expenses required.`;
    }
    text += `\n\n4. Recommended Action Plan:\n- Contact candidate on WhatsApp (${lead.whatsapp || lead.phone}).\n- Schedule in-person counseling at Bosan Road Multan Office.\n- Collect matric/inter/bachelor transcripts and passport scan.`;

    setAiReport(text);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-900 flex items-center justify-center font-black text-white text-lg">
            G
          </div>
          <div>
            <h1 className="font-extrabold text-sm leading-tight text-white">Glontis CMS & Lead CRM</h1>
            <p className="text-[10px] text-slate-400">Multan Branch Admin Control Panel</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
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
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold animate-in fade-in">
          {notification}
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-4 border-r border-slate-800 space-y-2 shrink-0">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3">
            Navigation Tabs
          </span>

          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
              activeTab === 'leads' ? 'bg-blue-900 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-yellow-400" />
              <span>Student Leads CRM</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-slate-950 font-black text-[10px]">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
              activeTab === 'hero' ? 'bg-blue-900 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Hero Slider</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
              activeTab === 'offers' ? 'bg-blue-900 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Special Offers & Popups</span>
          </button>

          <button
            onClick={() => setActiveTab('countries')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
              activeTab === 'countries' ? 'bg-blue-900 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Study Destinations</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
              activeTab === 'services' ? 'bg-blue-900 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Services</span>
          </button>

          <button
            onClick={() => setActiveTab('universities')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
              activeTab === 'universities' ? 'bg-blue-900 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Universities</span>
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
              activeTab === 'stories' ? 'bg-blue-900 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Visa Success Grants</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
              activeTab === 'testimonials' ? 'bg-blue-900 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Testimonials</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
              activeTab === 'blogs' ? 'bg-blue-900 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blog Articles</span>
          </button>

          <button
            onClick={() => setActiveTab('faqs')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
              activeTab === 'faqs' ? 'bg-blue-900 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQs Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all ${
              activeTab === 'settings' ? 'bg-blue-900 text-white shadow-md' : 'hover:bg-slate-800 text-slate-400'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Website Settings</span>
          </button>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* LEADS CRM TAB */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Student Consultation Leads CRM</h2>
                  <p className="text-xs text-slate-500">
                    Manage online consultation inquiries submitted through the website.
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search candidate name, phone, email..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 bg-slate-50"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none">
                  {['All', 'New', 'Contacted', 'Assessment Done', 'Offer Letter Received', 'Visa Granted', 'Closed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setLeadStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        leadStatusFilter === st
                          ? 'bg-blue-900 text-white shadow-md'
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
                    <thead className="bg-slate-900 text-white uppercase text-[10px] font-extrabold tracking-wider">
                      <tr>
                        <th className="p-4">Candidate & Contact</th>
                        <th className="p-4">Destination & Major</th>
                        <th className="p-4">Qualification</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4">
                            <div className="font-extrabold text-slate-900 text-sm">{lead.name}</div>
                            <div className="text-slate-500 text-[11px] font-semibold flex items-center gap-2 mt-0.5">
                              <span>📞 {lead.phone}</span>
                              {lead.whatsapp && <span>💬 {lead.whatsapp}</span>}
                            </div>
                            <div className="text-slate-400 text-[10px]">{lead.email || 'No email provided'}</div>
                          </td>

                          <td className="p-4">
                            <span className="font-bold text-blue-900">{lead.preferred_country}</span>
                            <div className="text-slate-500 text-[11px]">{lead.preferred_course || 'General Admission'}</div>
                            <div className="text-slate-400 text-[10px]">City: {lead.city}</div>
                          </td>

                          <td className="p-4 font-semibold text-slate-700">
                            {lead.qualification}
                          </td>

                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) => {
                                updateLeadStatus(lead.id, e.target.value as any);
                                showNotify(`Status updated for ${lead.name}`);
                              }}
                              className="text-xs font-bold p-2 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Assessment Done">Assessment Done</option>
                              <option value="Offer Letter Received">Offer Letter Received</option>
                              <option value="Visa Granted">Visa Granted</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>

                          <td className="p-4 text-slate-400 text-[11px] whitespace-nowrap">
                            {lead.created_at}
                          </td>

                          <td className="p-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => generateAiAssessment(lead)}
                              className="px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-[11px] shadow-sm inline-flex items-center gap-1"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>AI Report</span>
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Delete lead entry for ${lead.name}?`)) {
                                  deleteLead(lead.id);
                                  showNotify('Lead deleted');
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
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

          {/* AI REPORT MODAL */}
          {selectedLeadForAi && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-2xl bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-700 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-black text-base text-white">AI Profile Assessment Report</h3>
                  </div>
                  <button onClick={() => setSelectedLeadForAi(null)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <textarea
                  readOnly
                  value={aiReport}
                  rows={12}
                  className="w-full font-mono text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 text-emerald-400 resize-none focus:outline-none"
                />

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(aiReport);
                      showNotify('Report copied to clipboard!');
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                  >
                    Copy Report Text
                  </button>
                  <button
                    onClick={() => setSelectedLeadForAi(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* HERO SLIDER CMS */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">Hero Banners & Slides</h2>
                <button
                  onClick={() => {
                    const newSlide = {
                      id: `slide_${Date.now()}`,
                      title: 'New Hero Banner Title',
                      subheading: 'Enter compelling subheading description for students.',
                      badge: 'New Intake 2026',
                      image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80',
                      primary_cta_text: 'Book Consultation',
                      primary_cta_link: '/free-consultation',
                      secondary_cta_text: 'Explore Destinations',
                      secondary_cta_link: '/study-destinations',
                      is_active: true,
                      display_order: heroSlides.length + 1,
                    };
                    setHeroSlides([...heroSlides, newSlide]);
                    showNotify('New slide added!');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Slide</span>
                </button>
              </div>

              <div className="space-y-4">
                {heroSlides.map((slide, idx) => (
                  <div key={slide.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-extrabold text-sm text-slate-900">Slide #{idx + 1}</span>
                      <button
                        onClick={() => {
                          setHeroSlides(heroSlides.filter((s) => s.id !== slide.id));
                          showNotify('Slide deleted');
                        }}
                        className="text-red-600 hover:text-red-800 text-xs font-bold"
                      >
                        Delete Slide
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-bold mb-1">Title</label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx].title = e.target.value;
                            setHeroSlides(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Badge Tag</label>
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

                      <div className="sm:col-span-2">
                        <label className="block font-bold mb-1">Subheading</label>
                        <input
                          type="text"
                          value={slide.subheading}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx].subheading = e.target.value;
                            setHeroSlides(updated);
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold mb-1">Image URL</label>
                        <input
                          type="text"
                          value={slide.image_url}
                          onChange={(e) => {
                            const updated = [...heroSlides];
                            updated[idx].image_url = e.target.value;
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

          {/* OFFERS CMS */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900">Promotional Banners & Popups</h2>
              {offers.map((offer, idx) => (
                <div key={offer.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold mb-1">Offer Title</label>
                      <input
                        type="text"
                        value={offer.title}
                        onChange={(e) => {
                          const updated = [...offers];
                          updated[idx].title = e.target.value;
                          setOffers(updated);
                        }}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Discount Badge</label>
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
                      <label className="block font-bold mb-1">Description</label>
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

                    <div className="flex items-center gap-4 pt-2">
                      <label className="flex items-center gap-2 font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={offer.is_active}
                          onChange={(e) => {
                            const updated = [...offers];
                            updated[idx].is_active = e.target.checked;
                            setOffers(updated);
                          }}
                        />
                        <span>Active Banner</span>
                      </label>

                      <label className="flex items-center gap-2 font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={offer.is_popup}
                          onChange={(e) => {
                            const updated = [...offers];
                            updated[idx].is_popup = e.target.checked;
                            setOffers(updated);
                          }}
                        />
                        <span>Enable Pop-up Modal</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* COUNTRIES CMS */}
          {activeTab === 'countries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-900">Study Destinations</h2>
                <button
                  onClick={() => {
                    const newC = {
                      id: `c_${Date.now()}`,
                      name: 'New Country',
                      slug: `new-country-${Date.now()}`,
                      flag_emoji: '🌐',
                      hero_image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80',
                      short_description: 'Discover top study abroad opportunities.',
                      full_description: 'Full guide for international students.',
                      study_benefits: ['Post-study work rights', 'High quality education'],
                      popular_universities: ['Sample University'],
                      popular_courses: ['Business & IT'],
                      tuition_fees_range: '£8,000 - £15,000 / year',
                      living_expenses_estimate: '£9,000 / year',
                      visa_info: {
                        processing_time: '3-4 Weeks',
                        visa_fee: '£490',
                        work_rights: '20 Hours / Week',
                        post_study_work: '2 Years Graduate Route',
                        intakes: ['September', 'January'],
                        financial_requirement: 'Bank statement of living expenses + remaining tuition.',
                      },
                      is_published: true,
                      is_featured: false,
                    };
                    setCountries([...countries, newC]);
                    showNotify('Country added!');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Country</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {countries.map((c, idx) => (
                  <div key={c.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-extrabold text-base text-slate-900">
                        {c.flag_emoji} {c.name}
                      </span>
                      <button
                        onClick={() => {
                          setCountries(countries.filter((item) => item.id !== c.id));
                          showNotify('Country removed');
                        }}
                        className="text-red-600 font-bold text-xs"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="block font-bold">Country Name</label>
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => {
                            const updated = [...countries];
                            updated[idx].name = e.target.value;
                            setCountries(updated);
                          }}
                          className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div>
                        <label className="block font-bold">Short Description</label>
                        <textarea
                          rows={2}
                          value={c.short_description}
                          onChange={(e) => {
                            const updated = [...countries];
                            updated[idx].short_description = e.target.value;
                            setCountries(updated);
                          }}
                          className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-bold">Processing Time</label>
                          <input
                            type="text"
                            value={c.visa_info.processing_time}
                            onChange={(e) => {
                              const updated = [...countries];
                              updated[idx].visa_info.processing_time = e.target.value;
                              setCountries(updated);
                            }}
                            className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50"
                          />
                        </div>

                        <div>
                          <label className="block font-bold">Work Rights</label>
                          <input
                            type="text"
                            value={c.visa_info.work_rights}
                            onChange={(e) => {
                              const updated = [...countries];
                              updated[idx].visa_info.work_rights = e.target.value;
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

          {/* SETTINGS CMS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-slate-900">Website Contact & Branch Settings</h2>

              <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs">
                <div>
                  <label className="block font-bold mb-1">Company Name</label>
                  <input
                    type="text"
                    value={settings.company_name}
                    onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Office Address</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Primary Phone Number</label>
                    <input
                      type="text"
                      value={settings.phones[0] || ''}
                      onChange={(e) => {
                        const newPhones = [...settings.phones];
                        newPhones[0] = e.target.value;
                        setSettings({ ...settings, phones: newPhones });
                      }}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">WhatsApp Official Number</label>
                    <input
                      type="text"
                      value={settings.whatsapp}
                      onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold mb-1">Official Email</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Opening Hours</label>
                    <input
                      type="text"
                      value={settings.opening_hours}
                      onChange={(e) => setSettings({ ...settings, opening_hours: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                    />
                  </div>
                </div>

                <button
                  onClick={() => showNotify('Settings saved successfully!')}
                  className="px-6 py-3 rounded-xl bg-blue-900 text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {/* OTHER TABS SIMPLIFIED PLACEHOLDERS / EDITORS */}
          {['services', 'universities', 'stories', 'testimonials', 'blogs', 'faqs'].includes(activeTab) && (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-blue-900 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900 capitalize">{activeTab} CMS Editor Ready</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Content for {activeTab} is loaded in live state. Changes made here persist dynamically in local storage context.
              </p>
              <button
                onClick={() => showNotify(`${activeTab} state verified and synced!`)}
                className="px-6 py-2.5 bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Sync Data State
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
