export interface SiteSettings {
  company_name: string;
  tagline: string;
  domain: string;
  logo_url?: string;
  favicon_url?: string;
  about_image_url?: string;
  hero_bg_image_url?: string;
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

export interface MediaItem {
  id: string;
  url: string;
  file_name: string;
  width: number;
  height: number;
  file_size_bytes: number;
  file_size_formatted: string;
  file_type: string;
  aspect_ratio: string;
  upload_date: string;
  alt_text?: string;
  title?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subheading: string;
  badge?: string;
  image_url: string;
  image_alt_text?: string;
  image_title?: string;
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
  image_alt_text?: string;
  image_title?: string;
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
  image_alt_text?: string;
  image_title?: string;
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
  image_alt_text?: string;
  image_title?: string;
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
  image_alt_text?: string;
  image_title?: string;
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
  image_alt_text?: string;
  image_title?: string;
  story_text: string;
  is_featured: boolean;
  is_published: boolean;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  customer_photo: string;
  image_alt_text?: string;
  image_title?: string;
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
  image_alt_text?: string;
  image_title?: string;
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

export interface WorkVisaPageData {
  page_title: string;
  hero_heading: string;
  hero_description: string;
  hero_image: string;
  hero_image_alt_text?: string;
  hero_image_title?: string;
  mobile_hero_image?: string;
  mobile_hero_image_alt_text?: string;
  mobile_hero_image_title?: string;
  introduction: string;
  visa_overview: string;
  countries_available: Array<{
    id: string;
    name: string;
    badge?: string;
    description: string;
    points: string[];
    image_url?: string;
    image_alt_text?: string;
    image_title?: string;
    is_active: boolean;
  }>;
  job_categories: Array<{
    id: string;
    title: string;
    badge?: string;
    description: string;
    key_requirements: string[];
    image_url?: string;
    image_alt_text?: string;
    image_title?: string;
    is_active: boolean;
  }>;
  eligibility_requirements: string[];
  required_documents: string[];
  application_process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  processing_information: {
    processing_time: string;
    visa_duration: string;
    work_rights: string;
    family_dependents: string;
    fee_estimate: string;
  };
  benefits: string[];
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  cta_heading: string;
  cta_description: string;
  cta_button_text: string;
  whatsapp_button_text: string;
  section_visibility: {
    hero: boolean;
    introduction: boolean;
    overview: boolean;
    countries: boolean;
    job_categories: boolean;
    eligibility: boolean;
    documents: boolean;
    process: boolean;
    processing_info: boolean;
    benefits: boolean;
    faqs: boolean;
    cta: boolean;
  };
  section_order?: string[];
  seo_title: string;
  meta_description: string;
  url_slug: string;
}

export interface HomeServiceQuickLink {
  id: string;
  title: string;
  badge?: string;
  url: string;
  icon_name: string; // e.g. "GraduationCap", "Briefcase", "Users", "Compass", "Globe", "Award", "Building2"
  description?: string;
  is_active: boolean;
  display_order: number;
}

export interface FloatingBadge {
  id: string;
  title: string;
  subtitle?: string;
  icon_name?: string;
  is_active: boolean;
}

export interface HomepageHeroData {
  eyebrow: string;
  heading: string;
  description: string;
  primary_cta_text: string;
  primary_cta_url: string;
  secondary_cta_text: string;
  secondary_cta_url: string;
  hero_image: string;
  hero_image_alt_text?: string;
  hero_image_title?: string;
  mobile_hero_image?: string;
  mobile_hero_image_alt_text?: string;
  floating_badges: FloatingBadge[];
  service_quick_links: HomeServiceQuickLink[];
}

export interface VisitVisaDestination {
  id: string;
  title: string;
  country: string;
  badge?: string;
  description: string;
  key_highlights: string[];
  image_url?: string;
  image_alt_text?: string;
  image_title?: string;
  is_active: boolean;
}

export interface VisitVisaPageData {
  page_title: string;
  url_slug: string;
  hero_heading: string;
  hero_subheading?: string;
  hero_description: string;
  hero_image: string;
  hero_image_alt_text?: string;
  hero_image_title?: string;
  mobile_hero_image?: string;
  mobile_hero_image_alt_text?: string;
  mobile_hero_image_title?: string;
  introduction: string;
  visa_overview: string;
  who_can_apply: string[];
  eligibility_requirements: string[];
  required_documents: string[];
  application_process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  processing_information: {
    processing_time: string;
    visa_duration: string;
    entry_type: string;
    stay_duration: string;
    fee_estimate: string;
    important_info: string;
  };
  benefits: string[];
  destinations: VisitVisaDestination[];
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  cta_heading: string;
  cta_description: string;
  primary_cta_text: string;
  primary_cta_url: string;
  secondary_cta_text: string;
  secondary_cta_url: string;
  whatsapp_button_text: string;
  section_visibility: {
    hero: boolean;
    introduction: boolean;
    overview: boolean;
    who_can_apply: boolean;
    destinations: boolean;
    eligibility: boolean;
    documents: boolean;
    process: boolean;
    processing_info: boolean;
    benefits: boolean;
    faqs: boolean;
    cta: boolean;
  };
  section_order?: string[];
  seo_title: string;
  meta_description: string;
}

export interface TouristVisaPageData {
  page_title: string;
  hero_heading: string;
  hero_description: string;
  hero_image: string;
  hero_image_alt_text?: string;
  hero_image_title?: string;
  mobile_hero_image?: string;
  mobile_hero_image_alt_text?: string;
  mobile_hero_image_title?: string;
  introduction: string;
  visa_overview: string;
  destinations: Array<{
    id: string;
    title: string;
    country: string;
    badge?: string;
    description: string;
    key_highlights: string[];
    image_url?: string;
    image_alt_text?: string;
    image_title?: string;
    is_active: boolean;
  }>;
  eligibility_requirements: string[];
  required_documents: string[];
  application_process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  processing_information: {
    processing_time: string;
    validity_period: string;
    entry_type: string;
    stay_duration: string;
    fee_estimate: string;
  };
  benefits: string[];
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  cta_heading: string;
  cta_description: string;
  cta_button_text: string;
  whatsapp_button_text: string;
  section_visibility: {
    hero: boolean;
    introduction: boolean;
    overview: boolean;
    destinations: boolean;
    eligibility: boolean;
    documents: boolean;
    process: boolean;
    processing_info: boolean;
    benefits: boolean;
    faqs: boolean;
    cta: boolean;
  };
  section_order?: string[];
  seo_title: string;
  meta_description: string;
  url_slug: string;
}

export interface HomeServiceQuickLink {
  id: string;
  title: string;
  badge?: string;
  url: string;
  icon_name: string;
  description?: string;
  is_active: boolean;
  display_order: number;
}

export interface FloatingBadge {
  id: string;
  title: string;
  subtitle?: string;
  icon_name?: string;
  is_active: boolean;
}

export interface HomepageHeroData {
  eyebrow: string;
  heading: string;
  description: string;
  primary_cta_text: string;
  primary_cta_url: string;
  secondary_cta_text: string;
  secondary_cta_url: string;
  hero_image: string;
  hero_image_alt_text?: string;
  hero_image_title?: string;
  mobile_hero_image?: string;
  mobile_hero_image_alt_text?: string;
  floating_badges: FloatingBadge[];
  service_quick_links: HomeServiceQuickLink[];
}


