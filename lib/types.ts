export interface SiteSettings {
  company_name: string;
  tagline: string;
  domain: string;
  phones: string[];
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  country: string;
  opening_hours: string;
  google_maps_url: string;
  social_links: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  seo_default_title: string;
  seo_default_description: string;
  google_analytics_id?: string;
  gtm_id?: string;
  gsc_verification?: string;
  copyright_text: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subheading: string;
  badge?: string;
  image_url: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  display_order: number;
  is_active: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount_badge: string;
  image_url?: string;
  start_date: string;
  end_date: string;
  cta_text: string;
  cta_link: string;
  whatsapp_text?: string;
  is_featured: boolean;
  is_popup: boolean;
  is_banner: boolean;
  is_active: boolean;
}

export interface CountryDestination {
  id: string;
  name: string;
  slug: string; // e.g. "study-in-uk"
  flag_emoji: string;
  hero_image: string;
  short_description: string;
  full_description: string;
  study_benefits: string[];
  popular_universities: string[];
  popular_courses: string[];
  tuition_fees_range?: string;
  living_expenses_estimate?: string;
  visa_info: {
    processing_time: string;
    visa_fee: string;
    work_rights: string;
    post_study_work: string;
    intakes: string[];
    financial_requirement: string;
  };
  is_featured: boolean;
  is_published: boolean;
  seo_title?: string;
  seo_description?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  icon_name: string; // Lucide icon name
  image_url: string;
  short_description: string;
  full_description: string;
  key_benefits: string[];
  process_steps: { step: number; title: string; description: string }[];
  is_featured: boolean;
  is_published: boolean;
  seo_title?: string;
  seo_description?: string;
}

export interface UniversityItem {
  id: string;
  name: string;
  country: string;
  city: string;
  logo_url: string;
  image_url: string;
  description: string;
  popular_programs: string[];
  entry_requirements: string[];
  tuition_range: string;
  scholarships_available: boolean;
  scholarship_details?: string;
  website_url?: string;
  is_featured: boolean;
  is_published: boolean;
}

export interface SuccessStory {
  id: string;
  student_name: string;
  country: string;
  university: string;
  program: string;
  visa_type: string;
  grant_date: string;
  student_image: string;
  visa_grant_image: string;
  story_text: string;
  is_featured: boolean;
  is_published: boolean;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  customer_photo: string;
  country: string;
  service: string;
  star_rating: number; // 1 - 5
  review_text: string;
  review_date: string;
  is_verified: boolean;
  is_published: boolean;
  display_order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown or HTML
  featured_image: string;
  category: string;
  tags: string[];
  author_name: string;
  author_role: string;
  publish_date: string;
  read_time: string;
  is_draft: boolean;
  seo_title?: string;
  seo_description?: string;
  keywords?: string[];
}

export interface LeadEntry {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  preferred_country: string;
  preferred_course: string;
  qualification: string;
  city?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Closed';
  notes?: string;
  created_at: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
  is_published: boolean;
}

export interface TrustStat {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: string;
}
