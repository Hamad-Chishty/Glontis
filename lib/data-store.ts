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
  TrustStat,
  ScholarshipItem,
  WorkVisaPageData,
  VisitVisaPageData,
  TouristVisaPageData,
  HomepageHeroData,
  HomepageSectionConfig,
} from './types';

// Default initial database content
export interface AppDatabase {
  settings: SiteSettings;
  mediaLibrary: MediaItem[];
  heroSlides: HeroSlide[];
  homepageHero?: HomepageHeroData;
  homepageSections?: HomepageSectionConfig[];
  offers: Offer[];
  trustStats: TrustStat[];
  countries: CountryDestination[];
  services: ServiceItem[];
  universities: UniversityItem[];
  scholarships: ScholarshipItem[];
  successStories: SuccessStory[];
  testimonials: Testimonial[];
  blogs: BlogPost[];
  leads: LeadEntry[];
  faqs: FAQItem[];
  workVisaPage: WorkVisaPageData;
  visitVisaPage: VisitVisaPageData;
  touristVisaPage: TouristVisaPageData;
}


export const defaultSettings: SiteSettings = {
  company_name: 'Glontis Visa Consultancy',
  tagline: 'Premier Immigration & Visa Consultancy in Multan',
  domain: 'glontisconsultancy.com',
  phones: ['0333-4530456', '0333-4301456'],
  whatsapp: '0333-4530456',
  email: 'admin@glontisconsultancy.com',
  address: 'Office # 28, 2nd Floor, Chaze Up Plaza, Near Chungi # 6, Bosan Road, Multan, Pakistan',
  city: 'Multan',
  country: 'Pakistan',
  opening_hours: 'Mon - Sat: 9:00 AM - 6:30 PM | Sun: Closed',
  google_maps_url: 'https://maps.google.com/?q=Chaze+Up+Plaza+Bosan+Road+Multan',
  social_links: {
    facebook: 'https://facebook.com/glontisconsultancy',
    instagram: 'https://instagram.com/glontisconsultancy',
    linkedin: 'https://linkedin.com/company/glontisconsultancy',
    youtube: 'https://youtube.com/@glontisconsultancy',
    tiktok: 'https://tiktok.com/@glontisconsultancy',
  },
  seo_default_title: 'Glontis Visa Consultancy | Study, Work, Visit & Tourist Visa',
  seo_default_description: 'Glontis Visa Consultancy in Multan offers professional guidance for Study Visas & Scholarships, Work Visas, Visit Visas, and Tourist Visas.',
  copyright_text: '© 2026 Glontis Visa Consultancy. All Rights Reserved.',
};

export const defaultMediaLibrary: MediaItem[] = [
  {
    id: 'media-logo',
    url: '/glontis-logo.svg',
    file_name: 'glontis-logo.svg',
    width: 320,
    height: 80,
    file_size_bytes: 14200,
    file_size_formatted: '14.2 KB',
    file_type: 'SVG',
    aspect_ratio: '4:1',
    upload_date: '2026-01-10',
    alt_text: 'Glontis Visa Consultancy Official Logo',
    title: 'Glontis Logo',
  },
  {
    id: 'media-hero-1',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    file_name: 'hero_students_campus.jpg',
    width: 1920,
    height: 800,
    file_size_bytes: 245000,
    file_size_formatted: '245 KB',
    file_type: 'JPG',
    aspect_ratio: '12:5 (2.40:1)',
    upload_date: '2026-01-12',
    alt_text: 'International students on university campus',
    title: 'Hero Banner 1',
  },
  {
    id: 'media-hero-2',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
    file_name: 'uk_study_destination.jpg',
    width: 1920,
    height: 800,
    file_size_bytes: 310000,
    file_size_formatted: '310 KB',
    file_type: 'JPG',
    aspect_ratio: '12:5 (2.40:1)',
    upload_date: '2026-01-15',
    alt_text: 'UK university hall and students',
    title: 'Hero Banner 2',
  },
  {
    id: 'media-c-uk',
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    file_name: 'london_big_ben_uk.jpg',
    width: 1200,
    height: 800,
    file_size_bytes: 280000,
    file_size_formatted: '280 KB',
    file_type: 'JPG',
    aspect_ratio: '3:2 (1.50:1)',
    upload_date: '2026-01-18',
    alt_text: 'Study in UK Big Ben London Landmark',
    title: 'UK Study Destination',
  },
  {
    id: 'media-c-aus',
    url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    file_name: 'sydney_opera_house_australia.jpg',
    width: 1200,
    height: 800,
    file_size_bytes: 295000,
    file_size_formatted: '295 KB',
    file_type: 'JPG',
    aspect_ratio: '3:2 (1.50:1)',
    upload_date: '2026-01-20',
    alt_text: 'Study in Australia Sydney Harbor',
    title: 'Australia Study Destination',
  },
  {
    id: 'media-c-can',
    url: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    file_name: 'toronto_skyline_canada.jpg',
    width: 1200,
    height: 800,
    file_size_bytes: 260000,
    file_size_formatted: '260 KB',
    file_type: 'JPG',
    aspect_ratio: '3:2 (1.50:1)',
    upload_date: '2026-01-22',
    alt_text: 'Study in Canada Toronto Skyline',
    title: 'Canada Study Destination',
  },
  {
    id: 'media-blog-1',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    file_name: 'uk_visa_guide_2026.jpg',
    width: 1200,
    height: 675,
    file_size_bytes: 210000,
    file_size_formatted: '210 KB',
    file_type: 'JPG',
    aspect_ratio: '16:9 (1.78:1)',
    upload_date: '2026-01-25',
    alt_text: 'UK Student Visa Step-by-Step Guide',
    title: 'UK Visa Article Cover',
  },
];

export const defaultHeroSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    title: 'Turn Your Education Goals Into Global Opportunities',
    subheading: 'Fully Funded Master\'s & PhD Scholarship Opportunities in New Zealand, Italy & premier world universities.',
    badge: 'STUDY VISA & SCHOLARSHIPS',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    primary_cta_text: 'Explore Study Visa',
    primary_cta_link: '/study-visa',
    secondary_cta_text: 'WhatsApp Us',
    secondary_cta_link: 'https://wa.me/923334530456',
    display_order: 1,
    is_active: true,
  },
  {
    id: 'hero-2',
    title: 'Build Your Career Beyond Borders',
    subheading: 'Work visa processing & job category assistance for Italy • Turkey • Saudi Arabia.',
    badge: 'WORK VISA',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80',
    primary_cta_text: 'Explore Work Visa',
    primary_cta_link: '/work-visa',
    secondary_cta_text: 'WhatsApp Us',
    secondary_cta_link: 'https://wa.me/923334530456',
    display_order: 2,
    is_active: true,
  },
  {
    id: 'hero-3',
    title: 'Make Your International Visit Simple',
    subheading: 'Family visit, business visit, invitation visa, and complete documentation guidance.',
    badge: 'VISIT VISA',
    image_url: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1600&q=80',
    primary_cta_text: 'Explore Visit Visa',
    primary_cta_link: '/visit-visa',
    secondary_cta_text: 'WhatsApp Us',
    secondary_cta_link: 'https://wa.me/923334530456',
    display_order: 3,
    is_active: true,
  },
  {
    id: 'hero-4',
    title: 'Your Journey Starts Here',
    subheading: 'Hassle-free tourist visa applications for Schengen / Europe, UK, USA, and top global travel destinations.',
    badge: 'TOURIST VISA',
    image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    primary_cta_text: 'Explore Tourist Visa',
    primary_cta_link: '/tourist-visa',
    secondary_cta_text: 'WhatsApp Us',
    secondary_cta_link: 'https://wa.me/923334530456',
    display_order: 4,
    is_active: true,
  },
];

export const defaultOffers: Offer[] = [
  {
    id: 'offer-1',
    title: '100% Free Initial Profile Counseling & University Match',
    description: 'Visit Glontis Visa Consultancy office in Multan or get an online counseling session with zero evaluation fee.',
    discount_badge: '100% FREE INITIAL COUNSELING',
    image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    start_date: '2026-01-01',
    end_date: '2026-12-31',
    cta_text: 'Claim Free Session',
    cta_link: '/free-consultation',
    whatsapp_text: 'Hello Glontis Visa Consultancy, I want to claim the Free Profile Counseling offer.',
    is_featured: true,
    is_popup: true,
    is_banner: true,
    is_active: true,
  },
];

export const defaultTrustStats: TrustStat[] = [
  { id: 'stat-1', label: 'Students Guided', value: '1,250+', description: 'Successful applicants placed in top international universities', icon: 'GraduationCap' },
  { id: 'stat-2', label: 'Visa Success Rate', value: '98.4%', description: 'Proven visa filing and document verification track record', icon: 'Award' },
  { id: 'stat-3', label: 'Partner Institutions', value: '200+', description: 'Direct university representative networks worldwide', icon: 'Building2' },
  { id: 'stat-4', label: 'Destinations Offered', value: '7+', description: 'New Zealand, Italy, Malaysia, Turkey, UK, Australia, Canada & more', icon: 'Globe' },
];

export const defaultCountries: CountryDestination[] = [
  {
    id: 'c-nz',
    name: 'New Zealand',
    slug: 'study-in-new-zealand',
    flag_emoji: '🇳🇿',
    hero_image: 'https://images.unsplash.com/photo-1507699622108-4be3aac6900f?auto=format&fit=crop&w=1200&q=80',
    short_description: 'Fully Funded Master\'s & PhD Scholarship Opportunities, high standard of living, and up to 3-year post-study work visa.',
    full_description: 'New Zealand offers world-class qualifications with Fully Funded Master\'s & PhD Scholarship Opportunities across all 8 state universities ranked in the top 3% globally. Enjoy clean natural environments, high security, and strong post-study work rights with comprehensive family benefits for research degrees.',
    study_benefits: [
      'Fully Funded Master\'s & PhD Scholarship Opportunities Available',
      'All 8 state universities ranked in Global Top 3%',
      'Post-study work visa for up to 3 years',
      'Work 20 hours/week while studying',
      'High student satisfaction and safe multicultural communities',
      'Spouse work rights for eligible Master’s research & PhD courses',
    ],
    popular_universities: ['University of Auckland', 'AUT University', 'Lincoln University', 'Massey University', 'University of Otago', 'University of Canterbury'],
    popular_courses: ['Master of Information Technology', 'Master of Applied Management', 'Master of Environmental Science', 'Agribusiness & Biotechnology', 'PhD Research Fellowships'],
    visa_info: {
      processing_time: '4 to 8 Weeks',
      visa_fee: 'NZD 375',
      work_rights: '20 Hours / Week',
      post_study_work: '1 to 3 Years depending on level',
      intakes: ['February Intake', 'July Intake', 'Rolling PhD Intakes'],
      financial_requirement: 'NZD 20,000 living expense per year or Scholarship Guarantee',
    },
    is_featured: true,
    is_published: true,
    seo_title: 'Study in New Zealand Scholarships Consultant in Multan | Glontis',
    seo_description: 'Glontis Visa Consultancy Multan provides complete assistance for New Zealand Fully Funded Scholarships, offer letter processing, and student visa files.',
  },
  {
    id: 'c-ita',
    name: 'Italy',
    slug: 'study-in-italy',
    flag_emoji: '🇮🇹',
    hero_image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    short_description: 'Fully Funded Master\'s & PhD Scholarships and DSU regional grants up to €7,000/year stipend + free accommodation.',
    full_description: 'Italy is a premier European destination for Pakistani students seeking Fully Funded Master\'s and PhD opportunities, alongside DSU regional scholarship grants. Eligible students can receive up to €7,000 yearly stipend, free university dining, and complete tuition fee waivers at top public universities.',
    study_benefits: [
      'Fully Funded Master\'s & PhD Scholarships',
      'DSU & Regional Need-Based Scholarships up to €7,000/yr with free meal cards',
      '100% English-taught Bachelor’s, Master’s, and Doctoral programs',
      'Schengen visa benefits for free travel across Europe',
      '20 hours/week part-time work allowed',
    ],
    popular_universities: ['Politecnico di Milano', 'Sapienza University of Rome', 'University of Bologna', 'University of Padua', 'University of Turin', 'Politecnico di Torino'],
    popular_courses: ['MSc Engineering Management', 'MSc Artificial Intelligence', 'MSc Biomedical Engineering', 'MSc Economics & Finance', 'PhD Doctoral Fellowships'],
    visa_info: {
      processing_time: '4 to 8 Weeks',
      visa_fee: '€50',
      work_rights: '20 Hours / Week',
      post_study_work: '1 Year Post-Study Work Permit',
      intakes: ['September / October Primary Intake'],
      financial_requirement: 'Min €6,000 bank balance or DSU Scholarship award letter',
    },
    is_featured: true,
    is_published: true,
    seo_title: 'Study in Italy Fully Funded Scholarship Consultant in Multan | Glontis',
    seo_description: 'Apply for Italian public universities and DSU Scholarships with Glontis Visa Consultancy in Multan. Universitaly pre-enrollment and visa filing.',
  },
  {
    id: 'c-mys',
    name: 'Malaysia',
    slug: 'study-in-malaysia',
    flag_emoji: '🇲🇾',
    hero_image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80',
    short_description: 'Affordable world-ranked universities, direct UK/Australia branch campus degrees, and easy student visa processing.',
    full_description: 'Malaysia has emerged as a premier global higher education hub offering exceptional academic quality at highly affordable costs. Host to world-class public institutions and renowned branch campuses (Monash, Nottingham, Curtin), Malaysia provides top-tier education with straightforward EMGS visa approvals for Pakistani students.',
    study_benefits: [
      'High-ranking QS Top 150 universities (Universiti Malaya, UTM, USM, UKM)',
      'Direct UK & Australian degrees awarded at 1/3rd of the tuition cost',
      'Affordable tuition starting from $2,500/year and low cost of living',
      'Fast EMGS e-Visa approval with high visa success rate',
      'Vibrant multicultural Muslim-friendly environment with halal dining',
    ],
    popular_universities: ['Universiti Malaya (UM)', 'Taylor’s University', 'UCSI University', 'Asia Pacific University (APU)', 'Sunway University', 'Universiti Teknologi Malaysia (UTM)'],
    popular_courses: ['BSc/MSc Computer Science & AI', 'Business Administration & Fintech', 'Engineering & Cyber Security', 'Hospitality & Tourism Management'],
    visa_info: {
      processing_time: '2 to 4 Weeks (EMGS VAL)',
      visa_fee: 'USD 400 - 600 (EMGS Visa Approval Letter fee)',
      work_rights: 'Limited part-time on-campus permissions',
      post_study_work: 'Employment Pass & Digital Nomad DE Rantau pathways',
      intakes: ['February / March Intake', 'September / October Intake', 'Rolling Monthly Intakes'],
      financial_requirement: 'Bank statement of approx. PKR 1.5M - 2.0M',
    },
    is_featured: true,
    is_published: true,
    seo_title: 'Study in Malaysia Visa Consultant in Multan | Glontis Visa Consultancy',
    seo_description: 'Apply for top Malaysian universities with Glontis Visa Consultancy in Multan. EMGS VAL processing, UK transfer programs, and low tuition fees.',
  },
  {
    id: 'c-tur',
    name: 'Turkey',
    slug: 'study-in-turkey',
    flag_emoji: '🇹🇷',
    hero_image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    short_description: 'Affordable tuition, European ECTS credit transfers, modern campuses, and rich cultural ties with Pakistan.',
    full_description: 'Turkey bridges East and West with modern universities, English-taught medical & engineering programs, and low cost of living. Ideal for Pakistani students seeking quality European-standard degrees with high visa grant rates.',
    study_benefits: [
      'Affordable tuition fees starting $2,000/year',
      'ECTS European credit system with Erasmus+ student mobility',
      'No IELTS required at many top private Turkish universities',
      'High quality accommodation & student campus lifestyle',
      'Warm cultural welcome for Pakistani students',
    ],
    popular_universities: ['Istanbul Bilgi University', 'Medipol University', 'Bahçeşehir University (BAU)', 'Sabancı University', 'Ozyegin University', 'Koç University'],
    popular_courses: ['Bachelor of Medicine / Dentistry', 'Software Engineering & AI', 'Architecture & Interior Design', 'International Relations & Business'],
    visa_info: {
      processing_time: '2 to 4 Weeks',
      visa_fee: '$120 - $180',
      work_rights: 'Part-time for postgraduate students',
      post_study_work: 'Residence permit extension options',
      intakes: ['September Main Intake', 'February Intake'],
      financial_requirement: '$6,000 bank statement',
    },
    is_featured: true,
    is_published: true,
    seo_title: 'Study in Turkey Consultant in Multan | Glontis Visa Consultancy',
    seo_description: 'Apply for Turkish universities in Istanbul & Ankara with Glontis Visa Consultancy in Multan. Low tuition fees & English taught courses.',
  },
  {
    id: 'c-uk',
    name: 'United Kingdom',
    slug: 'study-in-uk',
    flag_emoji: '🇬🇧',
    hero_image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    short_description: 'Study in top UK Russell Group & modern universities. 1-year Master’s degrees with 2-year Post-Study Work (PSW) visa.',
    full_description: 'The United Kingdom remains one of the premier study destinations for Pakistani students. Known for world-class research institutions, 1-year Master’s courses that save time and living expenses, and flexible English proficiency criteria. Glontis Visa Consultancy provides complete CAS support and student visa guidance.',
    study_benefits: [
      '1-Year Accelerated Master’s Programs',
      '2-Year Graduate Route (Post-Study Work Permit)',
      'Spouse Dependent Visa options for eligible Master’s Research & PhD programs',
      '20 hours/week part-time work during term time',
      'Part-time & Full-time work permissions during official breaks',
    ],
    popular_universities: ['University of Hertfordshire', 'Coventry University', 'University of Greenwich', 'UWE Bristol', 'Ulster University', 'Middlesex University'],
    popular_courses: ['MSc Data Science & AI', 'MBA & Business Analytics', 'MSc Healthcare Management', 'BSc/MSc Computer Science', 'MSc Project Management'],
    visa_info: {
      processing_time: '3 to 4 Weeks',
      visa_fee: '£490 + NHS Healthcare Surcharge',
      work_rights: '20 Hours / Week during term time',
      post_study_work: '2 Years Graduate Route Visa',
      intakes: ['September / October Main Intake', 'January / February Intake', 'May Intake (Select Uni)'],
      financial_requirement: 'Tuition balance + £1,334/month (London) or £1,023/month (Outer London) for 9 months',
    },
    is_featured: true,
    is_published: true,
    seo_title: 'Study in UK Consultant in Multan | Glontis Visa Consultancy',
    seo_description: 'Apply for UK Study Visa with Glontis Visa Consultancy in Multan. 1-Year Master’s, 2-Year Graduate Visa, top UK universities with low deposit options.',
  },
  {
    id: 'c-aus',
    name: 'Australia',
    slug: 'study-in-australia',
    flag_emoji: '🇦🇺',
    hero_image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
    short_description: 'World-recognized qualifications, excellent quality of life, and generous post-study work rights up to 3-4 years.',
    full_description: 'Australia offers world-class education with top-ranked universities. With vibrant cities like Sydney, Melbourne, Brisbane, and Adelaide, Australian institutions offer strong industry connections and high graduate employability. Glontis Visa Consultancy assists students with Genuine Student (GS) criteria, financial documentation, and Subclass 500 visa filing.',
    study_benefits: [
      'Globally top-ranked universities (Go8 and Technology Network)',
      'Subclass 500 Student Visa with post-study work rights',
      '48 hours per fortnight work allowance during studies',
      'High standard of living and safe multicultural environment',
      'Pathways to regional post-study work extensions',
    ],
    popular_universities: ['Deakin University', 'University of Wollongong', 'La Trobe University', 'Swinburne University', 'Western Sydney University', 'CQUniversity'],
    popular_courses: ['Master of Information Technology', 'Master of Professional Accounting', 'Bachelor/Master of Nursing', 'Master of Engineering Management', 'Master of Public Health'],
    visa_info: {
      processing_time: '4 to 8 Weeks',
      visa_fee: 'AUD 1,600',
      work_rights: '48 Hours per fortnight',
      post_study_work: '2 to 4 Years depending on degree & region',
      intakes: ['February / March Main Intake', 'July / August Intake', 'November Intake'],
      financial_requirement: 'Living cost AUD 29,710/year + 1st year tuition + travel funds',
    },
    is_featured: true,
    is_published: true,
    seo_title: 'Study in Australia Consultant in Multan | Subclass 500 Visa Support',
    seo_description: 'Expert Australian student visa advice in Multan. Apply for top universities in Sydney, Melbourne, and Brisbane with Glontis Visa Consultancy.',
  },
  {
    id: 'c-can',
    name: 'Canada',
    slug: 'study-in-canada',
    flag_emoji: '🇨🇦',
    hero_image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    short_description: 'Top-tier academic standards, affordable tuition in public colleges, and Post-Graduation Work Permit (PGWP) up to 3 years.',
    full_description: 'Canada welcomes international students with high quality education, safe communities, and clear post-graduation employment opportunities. Our expert advisors in Multan help you navigate PAL requirements, DLI choice, GIC funding verification, and study permit documentation.',
    study_benefits: [
      'Post-Graduation Work Permit (PGWP) up to 3 years',
      '20-24 hours/week off-campus work permission',
      'High-quality public colleges and research universities',
      'Co-op work placement options integrated into programs',
      'Clear transparent pathways for skilled immigration',
    ],
    popular_universities: ['Conestoga College', 'Seneca Polytechnic', 'Humber College', 'University of Windsor', 'Memorial University of Newfoundland', 'Thompson Rivers University'],
    popular_courses: ['Post-Graduate Certificate in Data Analytics', 'Diploma in Cyber Security', 'Master of Management', 'Supply Chain Management', 'Software Engineering'],
    visa_info: {
      processing_time: '6 to 10 Weeks',
      visa_fee: 'CAD 150 + Biometrics CAD 85',
      work_rights: '20-24 Hours / Week off-campus',
      post_study_work: 'Up to 3 Years PGWP',
      intakes: ['September Intake (Major)', 'January Intake', 'May Intake'],
      financial_requirement: 'First year tuition + CAD 20,635 GIC block funds',
    },
    is_featured: true,
    is_published: true,
    seo_title: 'Study in Canada Visa Consultant in Multan | Glontis',
    seo_description: 'Glontis Visa Consultancy helps Multan students secure Canadian study permits, PAL compliance, GIC guidance, and PGWP career planning.',
  },
];

export const defaultServices: ServiceItem[] = [
  {
    id: 's-admission',
    title: 'University Admission Assistance',
    slug: 'university-admission-assistance',
    icon_name: 'GraduationCap',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    short_description: 'Complete guidance on application preparation, document verification, and securing offer letters from top international universities.',
    full_description: 'Securing an offer letter requires presenting a clean, compliant academic profile. Glontis Visa Consultancy acts as your official liaison with over 200 partner institutions across UK, Australia, Canada, USA, and Europe. We streamline document evaluation, transcript equivalencies, and application tracking.',
    key_benefits: [
      'Direct partner university application channels',
      'Fast turnaround for conditional & unconditional offer letters',
      'Guidance on application fee waivers where available',
      'Exemption from IELTS guidance (MOI letter / Duolingo / Oxford ELLT verification)',
    ],
    process_steps: [
      { step: 1, title: 'Profile Assessment', description: 'Review transcripts, grades, and gap years to identify matching institutions.' },
      { step: 2, title: 'Document Compilation', description: 'Assist with SOPs, LORs, CVs, and certified translations.' },
      { step: 3, title: 'Application Submission', description: 'Submit error-free applications via university portals.' },
      { step: 4, title: 'Offer Letter Processing', description: 'Follow up actively with university admissions teams until offer issuance.' },
    ],
    is_featured: true,
    is_published: true,
    seo_title: 'University Admission Consultant in Multan | Glontis Visa Consultancy',
    seo_description: 'Get expert university admission guidance in Multan. Direct admissions for UK, Australia, Canada, and USA universities.',
  },
  {
    id: 's-counseling',
    title: 'Study Abroad Counseling & Career Planning',
    slug: 'study-abroad-counseling',
    icon_name: 'Users',
    image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    short_description: 'One-on-one sessions with senior advisors to select the right degree path matching your career goals, budget, and post-study aspirations.',
    full_description: 'Choosing the right country, university, and major is the most vital decision of your academic journey. Our senior counselors in Multan analyze your career preferences, financial capacity, long-term migration goals, and personal interests to craft a personalized study abroad roadmap.',
    key_benefits: [
      '1-on-1 personalized counseling sessions',
      'In-depth analysis of high-demand job markets abroad',
      'Clear comparison of tuition fees and living costs across nations',
      'Unbiased recommendation of courses with high post-study work prospects',
    ],
    process_steps: [
      { step: 1, title: 'Discovery Session', description: 'Understand student goals, budget, and family background.' },
      { step: 2, title: 'Country & Major Comparison', description: 'Compare benefits of UK vs Australia vs Canada vs Europe.' },
      { step: 3, title: 'Strategic Roadmap', description: 'Present top 3 university options with fee breakdown.' },
    ],
    is_featured: true,
    is_published: true,
    seo_title: 'Study Abroad Counselor in Multan | Glontis Visa Consultancy',
    seo_description: 'Free 1-on-1 study abroad counseling in Multan. Find the right degree, country, and scholarship with expert advisors.',
  },
  {
    id: 's-visa',
    title: 'Student Visa Guidance & File Preparation',
    slug: 'student-visa-guidance',
    icon_name: 'FileCheck',
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    short_description: 'Meticulous bank statement verification, financial proof structuring, sponsorship documentation, and error-free embassy visa filing.',
    full_description: 'A student visa refusal often occurs due to incomplete financial documentation or poorly drafted statements of purpose. At Glontis Visa Consultancy, our visa specialists verify bank statements, source of funds, relationship proofs, affidavit filings, and online embassy forms to maximize visa approval rates.',
    key_benefits: [
      'Thorough auditing of bank statements & holding periods',
      'Guidance on acceptable financial sponsors and wealth certificates',
      'Customized Genuine Student (GS) & Genuine Temporary Entrant (GTE) statement drafting',
      'Schengen, UK, Canadian & Australian embassy portal filing expertise',
    ],
    process_steps: [
      { step: 1, title: 'Financial Audit', description: 'Verify bank statement amounts, age of funds, and sponsor relationships.' },
      { step: 2, title: 'Statement Drafting', description: 'Review SOP/GTE/GS essays to ensure clear study rationale.' },
      { step: 3, title: 'Visa Application Submission', description: 'Complete online forms, pay embassy fees, and schedule biometric appointments.' },
      { step: 4, title: 'Decision Follow-up', description: 'Track application status until visa approval.' },
    ],
    is_featured: true,
    is_published: true,
    seo_title: 'Student Visa Consultant in Multan | Glontis Visa Consultancy',
    seo_description: 'Professional student visa file preparation in Multan for UK, Australia, Canada, USA, Germany & Italy with high approval rate.',
  },
  {
    id: 's-scholarship',
    title: 'Scholarship & Financial Aid Guidance',
    slug: 'scholarship-guidance',
    icon_name: 'Award',
    image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    short_description: 'Identify merit-based scholarships, tuition bursaries, and Italian DSU need-based funding to minimize your study costs.',
    full_description: 'Higher education abroad is an investment. We actively match candidates with institutional merit scholarships (ranging from £2,000 to £10,000 in UK/Australia), regional Italian DSU scholarships (€7,000/yr), and German tuition-free universities.',
    key_benefits: [
      'Early identification of scholarship deadlines',
      'Assistance with scholarship essay writing',
      'DSU Italy income certificate & family documentation support',
      'Negotiation for fee reductions for high-achieving Pakistani students',
    ],
    process_steps: [
      { step: 1, title: 'Scholarship Audit', description: 'Check GPA & academic honors against university merit tiers.' },
      { step: 2, title: 'Essay & Document Filing', description: 'Prepare compelling motivational letters.' },
      { step: 3, title: 'Award Confirmation', description: 'Secure reduced tuition invoices from universities.' },
    ],
    is_featured: true,
    is_published: true,
    seo_title: 'Study Abroad Scholarship Consultant in Multan | Glontis',
    seo_description: 'Secure university scholarships and tuition discounts in UK, Australia, and Italy with Glontis Visa Consultancy Multan.',
  },
  {
    id: 's-interview',
    title: 'Embassy & Visa Interview Preparation',
    slug: 'interview-preparation',
    icon_name: 'MessageSquare',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    short_description: 'Mock interviews simulating real US F1, German Embassy, and UK Credibility interview questions to build student confidence.',
    full_description: 'Nervousness or vague answers during a visa interview can jeopardize an otherwise strong application. We conduct 1-on-1 mock interviews using realistic embassy question databases, coaching students on clear articulation of career plans, course content, and financial backing.',
    key_benefits: [
      '1-on-1 realistic mock interview sessions',
      'Database of frequently asked questions for USA F1, UK, and German visas',
      'Body language, tone, and confidence coaching',
      'Detailed review of course modules & chosen university facts',
    ],
    process_steps: [
      { step: 1, title: 'Knowledge Session', description: 'Provide comprehensive interview question banks and answers guidelines.' },
      { step: 2, title: 'Mock Interview 1', description: 'Conduct baseline interview simulation with video feedback.' },
      { step: 3, title: 'Mock Interview 2', description: 'Refine weak points and practice crisp responses.' },
    ],
    is_featured: false,
    is_published: true,
    seo_title: 'USA & UK Visa Interview Preparation in Multan | Glontis',
    seo_description: 'Practice US F1 visa interview and UK credibility interviews with expert mock interviewers at Glontis Visa Consultancy Multan.',
  },
  {
    id: 's-predeparture',
    title: 'Pre-Departure Guidance & Accommodation Support',
    slug: 'pre-departure-guidance',
    icon_name: 'PlaneTakeoff',
    image_url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    short_description: 'Assistance with student accommodation booking, foreign exchange currency transfers, airport pickup, and pre-departure briefings.',
    full_description: 'Our relationship with students extends far beyond visa approval. Before flying, we host comprehensive pre-departure orientation sessions covering luggage rules, currency exchange, student bank account opening, part-time job job search tips, and secure student housing reservation.',
    key_benefits: [
      'Pre-booked verified student accommodation (dorms & private apartments)',
      'Guidance on State Bank foreign exchange remit options for fee payment',
      'Airport pickup arrangements at destination cities',
      'Connecting you with Pakistani student networks at your university',
    ],
    process_steps: [
      { step: 1, title: 'Pre-Departure Briefing', description: 'Guidance on travel documents, luggage limits, and airport customs.' },
      { step: 2, title: 'Accommodation Booking', description: 'Reserve verified student housing near campus.' },
      { step: 3, title: 'Arrival Support', description: 'Connect with local Pakistani student groups for smooth transition.' },
    ],
    is_featured: false,
    is_published: true,
    seo_title: 'Pre Departure & Housing Support for Students in Multan | Glontis',
    seo_description: 'Complete student housing reservation and pre-departure orientation for Pakistani students studying abroad.',
  },
];

export const defaultUniversities: UniversityItem[] = [
  {
    id: 'u-herts',
    name: 'University of Hertfordshire',
    country: 'United Kingdom',
    city: 'Hatfield, Hertfordshire',
    logo_url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80',
    image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    description: 'Located just 25 minutes from central London, University of Hertfordshire is renowned for industry-focused courses, top placement links, and modern campus facilities.',
    popular_programs: ['MSc Data Science & Analytics', 'MSc Software Engineering', 'MSc International Business', 'MBA', 'MSc Biotechnology'],
    entry_requirements: ['Bachelor degree with min 55%', 'IELTS 6.0 or MOI/Oxford ELLT accepted'],
    tuition_range: '£14,500 - £16,500 / Year',
    scholarships_available: true,
    scholarship_details: 'Automatic £1,000 to £3,000 Vice-Chancellor scholarships for international applicants.',
    website_url: 'https://www.herts.ac.uk',
    is_featured: true,
    is_published: true,
  },
  {
    id: 'u-coventry',
    name: 'Coventry University',
    country: 'United Kingdom',
    city: 'Coventry & London',
    logo_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80',
    image_url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80',
    description: 'Award-winning UK university with campuses in Coventry and London. Known for excellent engineering, business, and healthcare degrees.',
    popular_programs: ['MSc Engineering Management', 'MSc Cyber Security', 'MSc Healthcare Management', 'MSc Global Business'],
    entry_requirements: ['4-year Bachelor degree', 'IELTS 6.5 or internal English test'],
    tuition_range: '£16,000 - £18,500 / Year',
    scholarships_available: true,
    scholarship_details: 'Up to £2,000 early payment discount + international bursaries.',
    website_url: 'https://www.coventry.ac.uk',
    is_featured: true,
    is_published: true,
  },
  {
    id: 'u-deakin',
    name: 'Deakin University',
    country: 'Australia',
    city: 'Melbourne & Geelong, Victoria',
    logo_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    description: 'Top 1% university globally, Deakin offers world-class online learning technology, practical internships, and strong career support in Melbourne.',
    popular_programs: ['Master of Information Technology', 'Master of Business Analytics', 'Master of Public Health', 'Master of Construction Management'],
    entry_requirements: ['Bachelor degree with 60%+', 'IELTS 6.5 overall (min 6.0 in sub-scores)'],
    tuition_range: 'AUD 34,000 - 41,000 / Year',
    scholarships_available: true,
    scholarship_details: 'Deakin International Scholarship offering 25% to 50% tuition fee waiver.',
    website_url: 'https://www.deakin.edu.au',
    is_featured: true,
    is_published: true,
  },
  {
    id: 'u-conestoga',
    name: 'Conestoga College',
    country: 'Canada',
    city: 'Kitchener-Waterloo, Ontario',
    logo_url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=400&q=80',
    image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    description: 'Ontario’s fastest-growing polytechnic college located in Canada’s Tech Triangle. High graduate employment rate and PGWP eligible.',
    popular_programs: ['PG Diploma in Web Development', 'PG Diploma in Strategic Global Business', 'Diploma in Computer Programming'],
    entry_requirements: ['Higher Secondary Certificate or Bachelor degree', 'IELTS 6.5 (min 6.0 each band)'],
    tuition_range: 'CAD 16,000 - 18,500 / Year',
    scholarships_available: true,
    scholarship_details: 'Entrance awards available for international applicants.',
    website_url: 'https://www.conestogac.on.ca',
    is_featured: true,
    is_published: true,
  },
  {
    id: 'u-sapienza',
    name: 'Sapienza University of Rome',
    country: 'Italy',
    city: 'Rome, Italy',
    logo_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80',
    image_url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    description: 'One of the oldest and most prestigious universities in Europe, Sapienza offers world-class Master’s and PhD programs with extensive DSU regional scholarship support.',
    popular_programs: ['MSc Artificial Intelligence & Robotics', 'MSc Data Science', 'MSc Economics & Finance', 'PhD Fellowships'],
    entry_requirements: ['Bachelor degree in relevant field', 'English proficiency B2 / IELTS 6.0 or MOI'],
    tuition_range: '€1,000 - €2,800 / Year (100% Waived with DSU)',
    scholarships_available: true,
    scholarship_details: 'DSU regional scholarship up to €7,000/year + free university meals and accommodation.',
    website_url: 'https://www.uniroma1.it',
    is_featured: true,
    is_published: true,
  },
  {
    id: 'u-auckland',
    name: 'University of Auckland',
    country: 'New Zealand',
    city: 'Auckland, New Zealand',
    logo_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80',
    image_url: 'https://images.unsplash.com/photo-1507699622108-4be3aac6900f?auto=format&fit=crop&w=800&q=80',
    description: 'New Zealand’s highest-ranked university (QS Top 70), offering world-class research facilities, Masters and PhD scholarship packages, and 3-year post-study work rights.',
    popular_programs: ['Master of Information Technology', 'Master of Management', 'Master of Environmental Science', 'Doctoral PhD Research'],
    entry_requirements: ['Bachelor degree with good academic standing', 'IELTS 6.5 (no band below 6.0)'],
    tuition_range: 'NZD 34,000 - 45,000 / Year',
    scholarships_available: true,
    scholarship_details: 'University of Auckland International Student Excellence Scholarship up to NZD 10,000.',
    website_url: 'https://www.auckland.ac.nz',
    is_featured: true,
    is_published: true,
  },
  {
    id: 'u-malaya',
    name: 'Universiti Malaya (UM)',
    country: 'Malaysia',
    city: 'Kuala Lumpur, Malaysia',
    logo_url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80',
    image_url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    description: 'Malaysia’s premier QS World Top 65 research university, offering high quality education at extremely affordable tuition fees in Kuala Lumpur.',
    popular_programs: ['Master of Computer Science', 'MBA Business Administration', 'Master of Engineering', 'Biotechnology'],
    entry_requirements: ['Recognized Bachelor degree (CGPA 3.0+)', 'IELTS 6.0 or equivalent'],
    tuition_range: 'USD 4,000 - 7,500 / Year',
    scholarships_available: true,
    scholarship_details: 'Graduate research assistantships and tuition reduction schemes available.',
    website_url: 'https://www.um.edu.my',
    is_featured: true,
    is_published: true,
  },
  {
    id: 'u-koc',
    name: 'Koç University',
    country: 'Turkey',
    city: 'Istanbul, Turkey',
    logo_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80',
    image_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
    description: 'Leading research university in Istanbul offering 100% English-medium degree programs, high scholarship quotas, and European credit transfer (ECTS).',
    popular_programs: ['MSc Computer Science & Engineering', 'Master in Finance', 'MSc Biomedical Sciences', 'PhD Programs'],
    entry_requirements: ['Undergraduate transcript', 'TOEFL iBT / IELTS or English test'],
    tuition_range: 'USD 9,000 - 15,000 / Year (Up to 100% Scholarship)',
    scholarships_available: true,
    scholarship_details: 'Full Türkiye Bursları and institutional merit scholarships covering tuition & stipend.',
    website_url: 'https://www.ku.edu.tr',
    is_featured: true,
    is_published: true,
  },
];

export const defaultSuccessStories: SuccessStory[] = [
  {
    id: 'ss-1',
    student_name: 'Muhammad Farhan',
    country: 'United Kingdom',
    university: 'University of Hertfordshire',
    program: 'MSc Data Science & Analytics',
    visa_type: 'UK Student Visa (Subclass Tier 4)',
    grant_date: '2026-01-14',
    student_image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    visa_grant_image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    story_text: 'I was worried about my 3-year study gap after completing BSc in Multan. Team Glontis guided me through writing a solid SOP explaining my work experience. My UK student visa was granted within 12 working days without any interview!',
    is_featured: true,
    is_published: true,
  },
  {
    id: 'ss-2',
    student_name: 'Zainab Fatima',
    country: 'Australia',
    university: 'Deakin University, Melbourne',
    program: 'Master of Information Technology',
    visa_type: 'Australia Student Visa Subclass 500',
    grant_date: '2026-02-02',
    student_image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    visa_grant_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    story_text: 'Glontis Visa Consultancy handled my Genuine Student (GS) response and bank financial verification effortlessly. I secured admission at Deakin with a 25% merit scholarship and my visa arrived in 3 weeks!',
    is_featured: true,
    is_published: true,
  },
  {
    id: 'ss-3',
    student_name: 'Usman Ali Raza',
    country: 'Canada',
    university: 'Conestoga College, Ontario',
    program: 'PG Diploma in Cyber Security',
    visa_type: 'Canadian Study Permit (PAL Approved)',
    grant_date: '2025-12-18',
    student_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    visa_grant_image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
    story_text: 'With the new PAL rules in Canada, many consultants in Multan were confused. Glontis Visa Consultancy managed my Provincial Attestation Letter from Ontario seamlessly and helped me set up my GIC account.',
    is_featured: true,
    is_published: true,
  },
  {
    id: 'ss-4',
    student_name: 'Hamza Tariq',
    country: 'Italy',
    university: 'Sapienza University of Rome',
    program: 'MSc Artificial Intelligence',
    visa_type: 'Italy Study Visa (DSU Scholarship Winner)',
    grant_date: '2025-11-20',
    student_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    visa_grant_image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    story_text: 'Glontis Visa Consultancy prepared my Universitaly pre-enrollment and family income documentation for Italy DSU scholarship. I got a full tuition waiver plus €7,000 yearly stipend!',
    is_featured: false,
    is_published: true,
  },
];

export const defaultScholarships: ScholarshipItem[] = [
  {
    id: 'sch-nz-postgrad',
    title: 'New Zealand Master\'s & PhD Research Scholarships',
    country: 'New Zealand',
    flag_emoji: '🇳🇿',
    award_type: 'Fully Funded / High Value',
    amount_or_coverage: '100% Tuition Waiver + NZD 25,000 - 35,000 / Year Stipend',
    degree_levels: ['Master\'s Research', 'PhD / Doctoral'],
    description: 'Comprehensive research bursaries and university scholarships across top New Zealand institutions (Auckland, Lincoln, Otago, Massey). Includes spouse work rights and up to 3 years post-study work visa.',
    benefits: [
      '100% Full university tuition coverage',
      'Annual living stipend + medical insurance',
      'Full-time work rights for spouse during study',
      'Up to 3-Year Post-Study Work Visa (PSWV)',
    ],
    eligibility: [
      'Strong academic profile (CGPA 3.2+ or equivalent)',
      'Relevant Bachelor\'s / Master\'s background with research interest',
      'IELTS 6.5 or institutional English requirement',
    ],
    deadline: 'Intake Specific / Rolling Deadlines',
    image_url: 'https://images.unsplash.com/photo-1507699622108-4be3aac6900f?auto=format&fit=crop&w=800&q=80',
    image_alt_text: 'New Zealand Scholarships',
    is_featured: true,
    is_active: true,
    display_order: 1,
  },
  {
    id: 'sch-ita-dsu',
    title: 'Italy Regional DSU Need-Based & Merit Grants',
    country: 'Italy',
    flag_emoji: '🇮🇹',
    award_type: 'Government Regional Grant',
    amount_or_coverage: '100% Free Tuition + up to €7,000 / Year Cash Allowance',
    degree_levels: ['Bachelor\'s', 'Master\'s', 'PhD'],
    description: 'Italian regional government scholarship programs (DSU Toscana, LazioDisco, EDISU) providing complete tuition exemption, free campus meals, student dormitory accommodation, and cash stipends for qualifying Pakistani students.',
    benefits: [
      '100% Tuition fee waiver at public Italian universities',
      'Up to €7,000 annual living allowance',
      'Free daily campus dining canteen access',
      'Schengen area travel rights across 29 European nations',
    ],
    eligibility: [
      'Admission to accredited Italian public university',
      'Family income document verification (ISEE Parificato)',
      'English proficiency letter or IELTS 6.0',
    ],
    deadline: 'July - September (Annual Intake)',
    image_url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    image_alt_text: 'Italy DSU Scholarship',
    is_featured: true,
    is_active: true,
    display_order: 2,
  },
  {
    id: 'sch-tur-burslari',
    title: 'Türkiye Bursları & University Merit Bursaries',
    country: 'Turkey',
    flag_emoji: '🇹🇷',
    award_type: 'Government / Merit Award',
    amount_or_coverage: '100% Tuition + Monthly Stipend + Accommodation',
    degree_levels: ['Bachelor\'s', 'Master\'s', 'PhD'],
    description: 'Prestigious Turkish Government scholarship covering full tuition, monthly stipend, university dormitory accommodation, one-year Turkish language preparatory year, and comprehensive health insurance.',
    benefits: [
      'Zero tuition fee throughout full degree duration',
      'Free university accommodation & health insurance',
      'Monthly financial allowance',
      'Direct gateway to European and Middle Eastern academic networks',
    ],
    eligibility: [
      'Minimum 70% for Undergraduate, 75% for Master\'s/PhD',
      'Online application with academic transcripts and motivation letter',
      'Age limit criteria per degree tier',
    ],
    deadline: 'January - February (Annual Cycle)',
    image_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
    image_alt_text: 'Turkiye Burslari Scholarships',
    is_featured: true,
    is_active: true,
    display_order: 3,
  },
  {
    id: 'sch-mys-mis',
    title: 'Malaysia International Scholarship (MIS) & Research Grants',
    country: 'Malaysia',
    flag_emoji: '🇲🇾',
    award_type: 'Government / Research Grant',
    amount_or_coverage: 'Full Tuition + Monthly Allowance / 50% Fee Waivers',
    degree_levels: ['Master\'s', 'PhD'],
    description: 'Malaysian government and top QS-ranked public and private research universities providing tuition waivers and research bursaries in technology, artificial intelligence, business, and engineering fields.',
    benefits: [
      'Full or partial university tuition exemption',
      'Low cost of living in Southeast Asia\'s leading education hub',
      'Fast EMGS student visa approval turnaround',
      'Globally recognized UK and Australian dual-degree options',
    ],
    eligibility: [
      'CGPA 3.5 or equivalent in previous qualification',
      'Research proposal for Master\'s/PhD candidates',
      'IELTS 6.0 or recognized English medium proof',
    ],
    deadline: 'May - July (Annual Cycle)',
    image_url: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80',
    image_alt_text: 'Malaysia International Scholarships',
    is_featured: false,
    is_active: true,
    display_order: 4,
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: 't-1',
    customer_name: 'Ali Hassan',
    customer_photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    country: 'United Kingdom',
    service: 'UK Student Visa & CAS Processing',
    star_rating: 5,
    review_text: 'Glontis Visa Consultancy is undoubtedly the most transparent study abroad office in Multan. They never made false claims, kept me updated on my CAS application daily, and helped me get my UK visa smoothly. Highly recommended!',
    review_date: '2026-01-28',
    is_verified: true,
    is_published: true,
    display_order: 1,
  },
  {
    id: 't-2',
    customer_name: 'Ayesha Malik',
    customer_photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    country: 'Australia',
    service: 'Subclass 500 Visa & GS Counseling',
    star_rating: 5,
    review_text: 'I visited multiple consultants on Bosan Road Multan, but the level of detail and honesty at Glontis Visa Consultancy was unmatched. Their team carefully structured my financial proofs and GTE statement.',
    review_date: '2026-01-15',
    is_verified: true,
    is_published: true,
    display_order: 2,
  },
  {
    id: 't-3',
    customer_name: 'Bilal Ahmed',
    customer_photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    country: 'Canada',
    service: 'Canadian College Admissions & GIC',
    star_rating: 5,
    review_text: 'Top notch consultancy service! They guided me step by step regarding GIC account transfer, college tuition payment, and study permit filing. Got my visa approval without any hassle.',
    review_date: '2025-12-22',
    is_verified: true,
    is_published: true,
    display_order: 3,
  },
  {
    id: 't-4',
    customer_name: 'Sana Rehman',
    customer_photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    country: 'USA',
    service: 'F1 Visa Interview Mock Prep',
    star_rating: 5,
    review_text: 'The mock interview practice at Glontis boosted my confidence immensely before my US Embassy interview in Islamabad. I cleared my F1 visa in the first attempt!',
    review_date: '2025-12-10',
    is_verified: true,
    is_published: true,
    display_order: 4,
  },
  {
    id: 't-5',
    customer_name: 'Kashif Mahmood',
    customer_photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    country: 'Germany',
    service: 'German Blocked Account & Public Uni',
    star_rating: 5,
    review_text: 'Extremely professional team in Multan. They helped me apply to tuition-free German universities and set up my Expatrio blocked account. Genuine guidance!',
    review_date: '2025-11-28',
    is_verified: true,
    is_published: true,
    display_order: 5,
  },
];

export const defaultBlogs: BlogPost[] = [
  {
    id: 'b-1',
    title: 'Complete Guide to UK Student Visa Process for Pakistani Students in 2026',
    slug: 'uk-student-visa-process-pakistan-2026',
    excerpt: 'Step-by-step roadmap for Pakistani applicants: CAS issuance, TB test, bank statement holding period, IHS fees, and Graduate Route post-study work rules.',
    content: `
# Complete Guide to UK Student Visa Process for Pakistani Students in 2026

Studying in the United Kingdom remains a top aspiration for students in Pakistan, particularly from cities like Multan and South Punjab. With 1-year Master’s options and the 2-year Graduate Route post-study work visa, the UK provides an efficient pathway to global qualifications.

At **Glontis Visa Consultancy** in Multan, we walk you through every phase of the application lifecycle to ensure an error-free student visa filing.

---

## 1. Choosing the Right University & Course

The first step is identifying institutions that match your academic background and future career goals. Key criteria to evaluate:
- **Location & Cost of Living:** London vs Outer London (e.g. Hertfordshire, Coventry, Manchester, Birmingham)
- **English Proficiency Waiver:** Many UK universities accept Medium of Instruction (MOI) certificates, Oxford ELLT, or Duolingo in place of IELTS if you scored 70%+ in High School English.
- **Deposit Requirement:** Most universities accept an initial tuition deposit of £2,000 to £5,000 to issue your Conditional Offer and subsequent CAS.

---

## 2. Understanding the CAS (Confirmation of Acceptance for Studies)

The CAS is an electronic document issued by your UK university once you meet all offer conditions and pay the required deposit. It contains a unique reference number needed for your online UK Visa application.

### Key Details Required for CAS:
1. Valid Passport with at least 6 months validity
2. Verified Academic Transcripts & Degrees
3. Approved English Test or MOI Certificate
4. Pre-CAS Credibility Interview clearance (if required by the university)

---

## 3. Financial Bank Statement Requirements

The UK Visas and Immigration (UKVI) strictly mandates financial evidence:
- **Tuition Fee Balance:** Total tuition minus deposit paid.
- **Living Expense (Outer London):** £1,023 per month for 9 months (£9,207 total).
- **Living Expense (Inner London):** £1,334 per month for 9 months (£12,006 total).
- **Holding Period:** The required total funds must remain in your bank account (or parent’s account with relationship proof & consent letter) continuously for **at least 28 consecutive days**.

---

## 4. Tuberculosis (TB) Medical Test

All applicants residing in Pakistan applying for a UK visa longer than 6 months must undergo a TB screening at an official IOM (International Organization for Migration) medical center in Lahore, Islamabad, or Karachi.

---

## 5. UK Student Visa Application & Biometrics Submission

Once your CAS is issued and bank statement meets the 28-day rule:
1. Complete the online UKVI Student Visa application form.
2. Pay the Visa Application Fee (£490).
3. Pay the Immigration Health Surcharge (IHS) allowing access to NHS healthcare.
4. Book a biometrics appointment at VFS Global center in Lahore or Islamabad.
5. Upload self-certified scanned supporting documents online.

---

## 6. Standard Processing Times & Decision

Standard UK student visa applications typically take 3 to 4 weeks. Priority processing (5-7 days) or Super Priority (24 hours) services are also available for urgent departures.

For personalized consultation and document verification, visit **Glontis Visa Consultancy** at Office # 28, 2nd Floor, Chaze Up Plaza, Near Chungi # 6, Bosan Road, Multan or call us at **03334530456**.
`,
    featured_image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    category: 'UK Admissions',
    tags: ['UK Study Visa', 'CAS Requirements', 'Multan Education Consultant', 'Graduate Route'],
    author_name: 'Senior Advisor, Glontis',
    author_role: 'Lead Visa Specialist',
    publish_date: '2026-02-01',
    read_time: '6 min read',
    is_draft: false,
    seo_title: 'UK Student Visa Process 2026 for Pakistani Students | Glontis Multan',
    seo_description: 'Complete 2026 UK student visa guide for Pakistani applicants. Learn about CAS, 28-day bank statement rules, TB test, and post-study work visa.',
  },
  {
    id: 'b-2',
    title: 'Top 5 Study Abroad Destinations with Post-Study Work Visas & PR Pathways',
    slug: 'top-study-abroad-destinations-post-study-work-visas',
    excerpt: 'Comparing post-graduation employment permits across UK, Australia, Canada, Germany, and Ireland for international students.',
    content: `
# Top 5 Study Abroad Destinations with Post-Study Work Visas & PR Pathways

For Pakistani students investing in an overseas degree, the post-study work rights offered by the host nation are often as important as the academic ranking. Work experience abroad enables students to recover their education expenses, gain corporate experience, and potentially qualify for permanent residency pathways.

Here is a detailed comparison compiled by **Glontis Visa Consultancy**.

---

## 1. United Kingdom (2-Year Graduate Route)
- **Work Permit Duration:** 2 Years for Bachelor’s/Master’s graduates (3 years for PhDs).
- **Key Features:** Unrestricted job sector. No minimum salary requirement or employer sponsorship needed to enter the Graduate Route.
- **Career Advantage:** London and UK tech/finance hubs host thousands of multinational headquarters.

---

## 2. Australia (Subclass 485 Temporary Graduate Visa)
- **Work Permit Duration:** 2 to 4 years depending on degree level and study location (regional bonus years).
- **Key Features:** High minimum wage standards and post-study work regional incentives in places like Adelaide, Perth, and Geelong.
- **Skilled Migration:** Point-based General Skilled Migration (GSM) options for engineering, IT, nursing, and accounting professionals.

---

## 3. Canada (Post-Graduation Work Permit - PGWP)
- **Work Permit Duration:** Up to 3 years after completing a qualifying program at a Designated Learning Institution (DLI).
- **Key Features:** Open work permit allowing graduates to work for any Canadian employer anywhere in Canada.
- **Path to PR:** Express Entry (CEC) and Provincial Nominee Programs (PNP) prioritize Canadian education and work experience.

---

## 4. Germany (18-Month Job Seeker Visa)
- **Work Permit Duration:** 18 months post-graduation.
- **Key Features:** Full work permissions while seeking employment related to your field of study.
- **EU Blue Card:** Fast-track settlement permit after 21-27 months of qualified employment with German language proficiency.

---

## 5. Ireland (2-Year Stamp 1G Visa)
- **Work Permit Duration:** 2 Years for Master’s & PhD graduates.
- **Key Features:** Direct access to Europe’s premier tech capital hosting Google, Meta, Apple, and Pfizer European headquarters in Dublin.

---

### How Glontis Visa Consultancy Assists You
Our team in Multan helps you analyze your academic qualifications, career goals, and budget to select the destination that optimizes your career potential.

Contact us today at **03334301456** or visit our office on Bosan Road, Multan!
`,
    featured_image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    category: 'Career Guidance',
    tags: ['Post Study Work Visa', 'Canada PGWP', 'UK Graduate Route', 'Australia Visa', 'Study Abroad Multan'],
    author_name: 'Glontis Research Team',
    author_role: 'International Admissions Team',
    publish_date: '2026-01-20',
    read_time: '7 min read',
    is_draft: false,
    seo_title: 'Best Study Abroad Destinations with Work Visas 2026 | Glontis Multan',
    seo_description: 'Compare post-study work visa rules for UK, Australia, Canada, Germany, and Ireland. Find the right country for your international education.',
  },
  {
    id: 'b-3',
    title: 'How to Secure Need-Based & Merit Scholarships in Italy & UK Universities',
    slug: 'secure-scholarships-italy-uk-universities',
    excerpt: 'Discover how Pakistani students can get full tuition waivers and up to €7,000 yearly living stipend through Italian DSU scholarships.',
    content: `
# How to Secure Need-Based & Merit Scholarships in Italy & UK Universities

One of the common misconceptions among Pakistani students in Multan is that studying abroad requires vast personal wealth. In reality, multiple government and university-funded scholarship programs offer substantial fee waivers and stipends for hardworking candidates.

---

## 1. Italian Regional Need-Based Scholarships (DSU)

Italy stands out as the most generous European country for international students coming from developing economies.

### What Does DSU Cover?
- **100% Tuition Fee Exemption** at public universities.
- **Yearly Cash Stipend:** Up to €7,000 per academic year.
- **Free Dining Hall Meals:** 1 or 2 free daily meals on campus.
- **Subsidized University Dormitory Accommodation**.

### Key Eligibility Criteria:
- Income evaluation based on family income certificates (ISEE Parificato).
- Timely admission in an English-taught Bachelor’s or Master’s degree in public Italian universities like Sapienza, Politecnico di Milano, Bologna, or Padua.

---

## 2. UK University Vice-Chancellor & International Merit Bursaries

While full UK government scholarships (like Chevening) are highly competitive, most UK universities offer automatic merit awards:
- **Automatic Tuition Discounts:** £1,000 to £4,000 automatically applied upon receiving an offer.
- **Academic Merit Bursaries:** 20% to 50% tuition reduction for candidates with 70%+ grades in Bachelor’s degrees.

---

## How Glontis Visa Consultancy Helps You Secure Scholarships

1. **Profile Auditing:** We review your CGPA/percentage to identify universities with high scholarship allocation rates.
2. **DSU Document Preparation:** We ensure all family income documents, land papers, and tax certificates are correctly legalized for Italian regional authorities.
3. **Scholarship Essay Review:** We polish your statement of purpose to highlight leadership and academic merit.

Visit **Glontis Visa Consultancy** at Office # 28, 2nd Floor, Chaze Up Plaza, Near Chungi # 6, Bosan Road, Multan to explore scholarship eligibility today!
`,
    featured_image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    category: 'Scholarships',
    tags: ['Italy DSU Scholarship', 'UK Bursary', 'Study Abroad Scholarships', 'Glontis Multan'],
    author_name: 'Academic Affairs Team',
    author_role: 'Scholarship Specialist',
    publish_date: '2026-01-10',
    read_time: '5 min read',
    is_draft: false,
    seo_title: 'Study in Italy & UK Scholarships Guide 2026 | Glontis Multan',
    seo_description: 'Learn how Pakistani students can obtain Italian DSU scholarships (€7000 stipend) and UK university merit bursaries with Glontis Visa Consultancy.',
  },
];

export const defaultFaqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Where is Glontis Visa Consultancy located in Multan?',
    answer: 'Our main office is located at Office # 28, 2nd Floor, Chaze Up Plaza, Near Chungi # 6, Bosan Road, Multan, Pakistan. You can visit us Monday to Saturday from 9:00 AM to 6:30 PM.',
    category: 'General',
    display_order: 1,
    is_published: true,
  },
  {
    id: 'faq-2',
    question: 'Does Glontis Visa Consultancy charge for initial consultation?',
    answer: 'No! We offer 100% Free Initial Counseling & Profile Assessment for students in Multan and surrounding regions. You can discuss your options for UK, Australia, Canada, USA, Germany, and Italy with zero upfront evaluation fee.',
    category: 'Consultation',
    display_order: 2,
    is_published: true,
  },
  {
    id: 'faq-3',
    question: 'Can I study in UK or Australia without IELTS?',
    answer: 'Yes! Select universities accept Medium of Instruction (MOI) letters if you graduated from an English-medium university, high marks in High School English, or alternative tests such as Duolingo, Oxford ELLT, or internal university English tests.',
    category: 'Requirements',
    display_order: 3,
    is_published: true,
  },
  {
    id: 'faq-4',
    question: 'How long must my bank statement be held for UK student visa?',
    answer: 'For UK student visas, the total tuition balance plus living expenses must remain in an acceptable bank account for a minimum of 28 consecutive days before you submit your online visa application.',
    category: 'Visa Filing',
    display_order: 4,
    is_published: true,
  },
  {
    id: 'faq-5',
    question: 'What is the visa success rate at Glontis Visa Consultancy?',
    answer: 'We maintain an exceptional visa success rate of over 98% by conducting thorough pre-audits of bank statements, verified academic records, genuine student (GS) essays, and mock interview preparations prior to submission.',
    category: 'Visa Filing',
    display_order: 5,
    is_published: true,
  },
  {
    id: 'faq-6',
    question: 'Do you assist with Italian DSU scholarships and Germany Blocked Accounts?',
    answer: 'Yes! We specialize in Italian university admissions, Universitaly pre-enrollment, and DSU scholarship documentation (which can provide up to €7,000 stipend per year). We also assist German study applicants with Expatrio/Fintiba Blocked Account setup.',
    category: 'Scholarships',
    display_order: 6,
    is_published: true,
  },
  {
    id: 'faq-7',
    question: 'How do I book a consultation session?',
    answer: 'You can fill out the Free Consultation form on our website, call us directly at 03334301456 or 03334530456, or send a message on WhatsApp at 03334530456 to schedule your in-person or online appointment.',
    category: 'General',
    display_order: 7,
    is_published: true,
  },
];

export const defaultLeads: LeadEntry[] = [
  {
    id: 'lead-101',
    name: 'Shahzaib Khan',
    phone: '03001234567',
    whatsapp: '03001234567',
    email: 'shahzaib.khan@gmail.com',
    preferred_country: 'United Kingdom',
    preferred_course: 'MSc Data Science',
    qualification: 'Bachelor in CS (2024)',
    city: 'Multan',
    message: 'Interested in UK September 2026 intake with low deposit options.',
    status: 'New',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'lead-102',
    name: 'Rabia Tariq',
    phone: '03217654321',
    whatsapp: '03217654321',
    email: 'rabia.tariq@yahoo.com',
    preferred_country: 'Australia',
    preferred_course: 'Master of Public Health',
    qualification: 'Pharm-D (2023)',
    city: 'Khanewal',
    message: 'Want to inquire about Australia Subclass 500 visa and partner universities in Melbourne.',
    status: 'Contacted',
    notes: 'Called on Feb 5th. Informed about Deakin & Wollongong options.',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'lead-103',
    name: 'Hamza Noman',
    phone: '03138889900',
    whatsapp: '03138889900',
    email: 'hamza.noman@gmail.com',
    preferred_country: 'Canada',
    preferred_course: 'PG Diploma in Cyber Security',
    qualification: 'BS IT (2025)',
    city: 'Multan',
    message: 'Need help with Ontario college PAL process and GIC guidance.',
    status: 'Follow-up',
    notes: 'Documents submitted for evaluation.',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export const defaultWorkVisaPage: WorkVisaPageData = {
  page_title: 'Work Visa & Job Permit Advisory',
  hero_heading: 'Build Your Career Beyond Borders',
  hero_description: 'Professional work visa processing & job category assistance for Italy, Turkey, and Saudi Arabia. Verified legal procedures and complete documentation support.',
  hero_image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80',
  hero_image_alt_text: 'Skilled professionals and workers internationally',
  hero_image_title: 'Glontis Work Visa Banner',
  mobile_hero_image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80',
  mobile_hero_image_alt_text: 'Mobile Work Visa Banner',
  mobile_hero_image_title: 'Glontis Work Visa Mobile',
  introduction: 'At Glontis Visa Consultancy in Multan, we assist skilled professionals, technicians, and trade workers with legal work visa processing, document attestation, and employer contract verification for Italy, Turkey, and Saudi Arabia.',
  visa_overview: 'We provide structured end-to-end guidance from trade document attestation to embassy submissions. Current vacancies and eligibility may vary according to employer requirements.',
  countries_available: [
    {
      id: 'wv-ita',
      name: 'Italy',
      badge: 'European Union',
      description: 'Work permit and visa filing assistance for delivery and logistics professionals in Italy.',
      points: [
        'Delivery Jobs (Bike Rider / Delivery Rider)',
        'Official Work Contract / Nulla Osta Support',
        'Legal European Residence Processing',
      ],
      image_url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Italy Work Visa',
      image_title: 'Work in Italy',
      is_active: true,
    },
    {
      id: 'wv-tur',
      name: 'Turkey',
      badge: 'Eurasia Hub',
      description: 'Work permit processing across manufacturing, beauty, and skilled technical sectors in Turkey.',
      points: [
        'Factory Helpers & Assembly Staff',
        'Beauticians & Salon Professionals',
        'Certified Welders & Fabricators',
        'Building Electricians',
        'Pasta & Food Production Makers',
        'Commercial & Transport Drivers',
        'More Opportunities as per employer quota',
      ],
      image_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Turkey Work Visa',
      image_title: 'Work in Turkey',
      is_active: true,
    },
    {
      id: 'wv-ksa',
      name: 'Saudi Arabia',
      badge: 'Kingdom of Saudi Arabia',
      description: 'Direct employment visa processing, medical clearance, and MOFA attestation for the Kingdom.',
      points: [
        'Car Drivers & Chauffeurs',
        'Bus Drivers & Transport Crew',
        'Beauticians & Salon Specialists',
        'House Maids & Domestic Staff',
        'CNC Machine Operators',
        'Key Maker & Programmer',
        'Video Game Technicians & Arcade Ops',
        'More Opportunities as per employer quota',
      ],
      image_url: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Saudi Arabia Work Visa',
      image_title: 'Work in Saudi Arabia',
      is_active: true,
    },
  ],
  job_categories: [
    {
      id: 'jc-it-del',
      title: 'Italy — Delivery Jobs (Bike Rider / Delivery Rider)',
      badge: 'Italy',
      description: 'Food delivery, courier logistics, and parcel distribution riders across major Italian cities. Basic riding safety and navigation app proficiency required.',
      key_requirements: ['Valid Driving License / Motorcycle experience', 'Basic English or Italian familiarity', 'Clear police background record'],
      image_url: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Delivery Rider Jobs Italy',
      image_title: 'Delivery Jobs in Italy',
      is_active: true,
    },
    {
      id: 'jc-tr-ind',
      title: 'Turkey — Industrial & Skilled Trade Categories',
      badge: 'Turkey',
      description: 'Factory Helpers, Certified Welders, Building Electricians, Pasta & Food Production Makers, and Commercial Drivers in Turkish production facilities.',
      key_requirements: ['Relevant vocational or practical experience', 'Technical trade certification if applicable', 'Medical fitness certification'],
      image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Turkey Industrial Jobs',
      image_title: 'Skilled Trades in Turkey',
      is_active: true,
    },
    {
      id: 'jc-tr-beau',
      title: 'Turkey — Beauticians & Salon Specialists',
      badge: 'Turkey',
      description: 'Hair stylists, makeup artists, and skincare specialists for established Turkish salons and wellness centers.',
      key_requirements: ['Prior salon or cosmetology experience', 'Portfolio or certifications in beauty care', 'Client communication skills'],
      image_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Beautician Jobs Turkey',
      image_title: 'Salon Opportunities in Turkey',
      is_active: true,
    },
    {
      id: 'jc-sa-drv',
      title: 'Saudi Arabia — Car Drivers & Bus Drivers',
      badge: 'Saudi Arabia',
      description: 'Private chauffeurs, family drivers, logistics drivers, and commercial bus drivers for public and private fleets across KSA.',
      key_requirements: ['Valid Pakistani LTV/HTV or GCC Driving License', 'Clean driving record', 'Medical clearance for KSA visa'],
      image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Driver Jobs Saudi Arabia',
      image_title: 'Driving Jobs in KSA',
      is_active: true,
    },
    {
      id: 'jc-sa-tech',
      title: 'Saudi Arabia — CNC Machine Operators, Key Makers & Technicians',
      badge: 'Saudi Arabia',
      description: 'CNC Machine Operators, Key Makers & Electronic Programmers, and Video Game / Entertainment Arcade Technicians for commercial centers.',
      key_requirements: ['Technical diploma or relevant machine experience', 'Diagnostic and programming capability', 'Practical trade test clearance'],
      image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Technical Jobs Saudi Arabia',
      image_title: 'Technical Roles in KSA',
      is_active: true,
    },
    {
      id: 'jc-sa-dom',
      title: 'Saudi Arabia — Beauticians & House Maids',
      badge: 'Saudi Arabia',
      description: 'Professional salon beauticians, house maids, and hospitality staff with official registered contracts.',
      key_requirements: ['Previous relevant service or salon experience', 'Valid passport and biometric clearance', 'Official contract compliance'],
      image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Domestic and Salon Jobs Saudi Arabia',
      image_title: 'Salon & Domestic Staff KSA',
      is_active: true,
    },
  ],
  eligibility_requirements: [
    'Valid Pakistani passport with at least 12 months validity remaining.',
    'Trade experience, driving license, or relevant vocational qualification matching the applied category.',
    'Clean police clearance certificate (PCC) and GAMCA/embassy medical fitness test.',
    'Document attestation from MOFA / relevant educational or trade testing bodies.',
    'Compliance with employer-specific age and skill requirements.',
  ],
  required_documents: [
    'Original Passport & National ID Card (CNIC)',
    'Passport-size photographs with white background',
    'Experience letters, trade certificates, or Driving License (LTV/HTV/GCC)',
    'Police Clearance Certificate (PCC)',
    'Medical Fitness Report from authorized centers (e.g., GAMCA for KSA)',
    'Attested educational or trade documents (if required)',
  ],
  application_process: [
    {
      step: 1,
      title: 'Profile & Category Assessment',
      description: 'Visit Glontis Multan office or connect online to verify trade skills, license validity, and destination eligibility.',
    },
    {
      step: 2,
      title: 'Documentation & Attestations',
      description: 'Assistance with document verification, MOFA attestation, and medical checkup bookings.',
    },
    {
      step: 3,
      title: 'Contract Verification & Visa Processing',
      description: 'Submission to official visa centers (Gerry\'s / VFS / Etimad / Embassy) with verified employer documentation.',
    },
    {
      step: 4,
      title: 'Biometrics & Visa Grant',
      description: 'Biometric appointment submission, visa endorsement, and pre-departure briefing.',
    },
  ],
  processing_information: {
    processing_time: '3 to 8 Weeks (depending on country quota & embassy scheduling)',
    visa_duration: '1 to 2 Years (Renewable with employment contract)',
    work_rights: 'Full-time employment under official sponsor contract',
    family_dependents: 'Applicable according to destination visa tier and salary bracket',
    fee_estimate: 'Transparent official visa fees & competitive consultancy support',
  },
  benefits: [
    'Verified and legal work visa pathways to Italy, Turkey, and Saudi Arabia.',
    'Clear contract terms with salary, accommodation, and medical insurance protections.',
    'Step-by-step guidance from our expert counselors in Multan.',
    'Direct support with document translations, attestations, and embassy appointments.',
  ],
  faqs: [
    {
      id: 'wv-faq-1',
      question: 'Which countries does Glontis provide Work Visa consultancy for?',
      answer: 'Glontis Visa Consultancy specializes in Work Visa processing and job category advisory for Italy (Delivery riders), Turkey (Factory helpers, beauticians, welders, electricians, pasta makers, drivers), and Saudi Arabia (Car/Bus drivers, beauticians, house maids, CNC operators, key makers/programmers, video game technicians).',
    },
    {
      id: 'wv-faq-2',
      question: 'Does Glontis Visa Consultancy guarantee job placements or 100% visa approval?',
      answer: 'No consultancy can guarantee visa approval as final authority belongs exclusively to the respective embassy or immigration department. Current vacancies and eligibility may vary according to employer requirements. Glontis ensures 100% compliant document verification and legitimate processing.',
    },
    {
      id: 'wv-faq-3',
      question: 'Where is the Glontis office located in Multan?',
      answer: 'We are conveniently located at Office # 28, 2nd Floor, Chaze Up Plaza, Near Chungi # 6, Bosan Road, Multan.',
    },
  ],
  cta_heading: 'Ready to Apply for an International Work Visa?',
  cta_description: 'Visit our Multan office or WhatsApp us for 100% Free Initial Counseling on work visa requirements.',
  cta_button_text: 'Book Free Counseling',
  whatsapp_button_text: 'Chat on WhatsApp',
  section_visibility: {
    hero: true,
    introduction: true,
    overview: true,
    countries: true,
    job_categories: true,
    eligibility: true,
    documents: true,
    process: true,
    processing_info: true,
    benefits: true,
    faqs: true,
    cta: true,
  },
  seo_title: 'Work Visa Consultant in Multan | Italy, Turkey, Saudi Arabia | Glontis',
  meta_description: 'Glontis Visa Consultancy in Multan offers legal work visa advisory for Italy, Turkey, and Saudi Arabia across drivers, technical, salon, and industrial categories.',
  url_slug: 'work-visa',
};

export const defaultTouristVisaPage: TouristVisaPageData = {
  page_title: 'International Tourist & Visit Visa Consultancy',
  hero_heading: 'Explore the World with Tourist Visas',
  hero_description: 'Seamless holiday visa processing, hotel reservation itineraries, flight bookings, and travel insurance for UAE, Turkey, Malaysia, Thailand, Schengen, and GCC countries.',
  hero_image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80',
  hero_image_alt_text: 'International travel and vacation landmarks',
  hero_image_title: 'Glontis Tourist Visa Banner',
  mobile_hero_image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
  mobile_hero_image_alt_text: 'Mobile Tourist Visa Banner',
  mobile_hero_image_title: 'Glontis Tourist Visa Mobile',
  introduction: 'Discover new destinations without the stress of visa complications. Glontis Visa Consultancy in Multan manages your tourist visa documentation from A to Z.',
  visa_overview: 'Whether you are planning a family vacation, a honeymoon, or a solo trip, our tourist visa services handle cover letters, verifiable hotel vouchers, flight reservations, travel health insurance, and embassy appointments.',
  destinations: [
    {
      id: 'tv-uae',
      title: 'UAE (Dubai / Abu Dhabi) 30 & 60 Days E-Visa',
      country: 'United Arab Emirates',
      badge: 'Express 24-48h',
      description: 'Express 24 to 48-hour tourist visa for Dubai, Abu Dhabi, and Sharjah with flight itinerary and hotel vouchers included.',
      key_highlights: ['Fast-track 24-hour e-visa approval', 'Family & solo travel packages', 'Verifiable flight & hotel itineraries'],
      image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Dubai Tourist Visa',
      image_title: 'Dubai Vacation',
      is_active: true,
    },
    {
      id: 'tv-tr',
      title: 'Turkey Sticker & E-Visa',
      country: 'Turkey',
      badge: 'Popular Holiday',
      description: 'E-visa for valid UK/USA/Schengen visa holders or complete sticker visa file preparation for Istanbul & Cappadocia trips.',
      key_highlights: ['Official embassy appointment booking', 'Customized cover letter & travel itinerary', 'Bank statement evaluation'],
      image_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Turkey Tourist Visa',
      image_title: 'Travel to Turkey',
      is_active: true,
    },
    {
      id: 'tv-sea',
      title: 'Malaysia, Thailand & Vietnam E-Visas',
      country: 'Southeast Asia',
      badge: 'Easy Approval',
      description: 'Hassle-free holiday visas for Kuala Lumpur, Bangkok, Phuket, Bali, and Hanoi with minimal documentation requirements.',
      key_highlights: ['Simplified online application', 'Quick 3-5 working days processing', 'Affordable package pricing'],
      image_url: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Malaysia & Thailand Tourist Visa',
      image_title: 'Southeast Asia Holidays',
      is_active: true,
    },
    {
      id: 'tv-sch',
      title: 'Schengen Tourist Visa (29 Countries)',
      country: 'Europe',
      badge: 'Comprehensive File',
      description: 'Comprehensive tourist file compilation, travel insurance, hotel bookings, and cover letters for European holidays in France, Italy, Switzerland, Spain, etc.',
      key_highlights: ['Covering 29 European Schengen nations', 'Schengen-approved travel insurance ($30,000 cover)', 'Full appointment and biometric preparation'],
      image_url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Schengen European Tourist Visa',
      image_title: 'European Vacation',
      is_active: true,
    },
    {
      id: 'tv-ksa',
      title: 'Saudi Arabia Tourist & Umrah E-Visa',
      country: 'Saudi Arabia',
      badge: '1-Year Multiple Entry',
      description: 'One-year multiple entry tourist visa for Umrah, visiting historical sites in Al Ula, Riyadh, and Jeddah.',
      key_highlights: ['Valid for 1 full year with 90 days stay per visit', 'Includes medical insurance', 'Fast-track issuance'],
      image_url: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
      image_alt_text: 'Saudi Arabia Tourist Visa',
      image_title: 'Saudi Arabia Umrah & Visit',
      is_active: true,
    },
  ],
  eligibility_requirements: [
    'Valid Passport with at least 6 months validity from the intended travel date.',
    'Demonstrated stable financial capacity (6-month bank statement with sufficient closing balance).',
    'Strong ties to Pakistan (proof of employment, business registration, or family roots).',
    'Clear and genuine travel purpose (vacation, family visit, or sightseeing itinerary).',
    'Clean travel history and no past visa violations or deportation record.',
  ],
  required_documents: [
    'Original Passport & Scans of Previous Passports / Visas',
    '2 Recent Passport Size Photographs (35x45mm, White Background, 80% Face)',
    '6 Months Original Bank Statement with Bank Account Maintenance Certificate',
    'CNIC Copy & Family Registration Certificate (FRC / MRC if traveling with family)',
    'Employment Letter / Salary Slip / Business Chamber Certificate (NTN)',
    'Confirmed Return Flight Reservation & Verifiable Hotel Booking Vouchers',
    'Travel Health Insurance Policy ($30,000 - $50,000 coverage)',
  ],
  application_process: [
    {
      step: 1,
      title: 'Destination Selection & Requirements Check',
      description: 'Consult with our Multan team to choose your destination, check entry conditions, and review your bank statement.',
    },
    {
      step: 2,
      title: 'Itinerary & Document Preparation',
      description: 'We generate official hotel vouchers, flight reservations, travel insurance, and a compelling personal cover letter.',
    },
    {
      step: 3,
      title: 'E-Visa or Embassy Appointment Submission',
      description: 'Online submission for e-visas (UAE, Saudi, Malaysia, Turkey) or booking VFS/BLS/Gerrys appointments for Schengen sticker visas.',
    },
    {
      step: 4,
      title: 'Visa Issuance & Pre-Flight Guidance',
      description: 'Receive your approved visa, travel itinerary copies, and pre-departure briefing.',
    },
  ],
  processing_information: {
    processing_time: '24 Hours (E-Visas) to 15 Days (Schengen / Sticker Visas)',
    validity_period: '30 Days to 1 Year (Single or Multiple Entry)',
    entry_type: 'Single Entry / Multiple Entry depending on destination',
    stay_duration: '14 Days to 90 Days per visit',
    fee_estimate: 'Affordable, transparent official visa & service fees',
  },
  benefits: [
    'Hassle-free document preparation with official hotel and flight bookings.',
    'Expert bank statement evaluation to ensure compliance with embassy norms.',
    'Fast e-visa processing for UAE, Turkey, Saudi Arabia, and Southeast Asia.',
    'Comprehensive travel insurance and customized travel itineraries.',
  ],
  faqs: [
    {
      id: 'tv-faq-1',
      question: 'How much bank statement balance is required for a Schengen Tourist Visa?',
      answer: 'Embassies generally look for a stable bank balance showing sufficient daily expenses (approx. €70-€100 per day of stay) along with flight and hotel costs, backed by legitimate business or employment income.',
    },
    {
      id: 'tv-faq-2',
      question: 'How fast can I get a Dubai 30-day tourist visa?',
      answer: 'Standard Dubai e-visas are processed within 24 to 48 hours working days. Express emergency visas can be issued even faster.',
    },
    {
      id: 'tv-faq-3',
      question: 'Do you provide dummy flight tickets and hotel bookings for visa applications?',
      answer: 'Yes, we provide official verifiable flight itineraries and hotel reservation vouchers suitable for embassy visa file submissions.',
    },
  ],
  cta_heading: 'Planning Your Next International Holiday?',
  cta_description: 'Get fast tourist visa assistance today from Glontis Visa Consultancy in Multan.',
  cta_button_text: 'Plan Your Tourist Visa',
  whatsapp_button_text: 'Chat on WhatsApp',
  section_visibility: {
    hero: true,
    introduction: true,
    overview: true,
    destinations: true,
    eligibility: true,
    documents: true,
    process: true,
    processing_info: true,
    benefits: true,
    faqs: true,
    cta: true,
  },
  seo_title: 'Tourist Visa Consultancy in Multan | UAE, Turkey, Schengen Visit Visas',
  meta_description: 'Top Tourist & Visit Visa consultants in Multan. Fast processing for Dubai, Turkey, Malaysia, Thailand, Schengen, and Saudi Arabia tourist visas.',
  url_slug: 'tourist-visa',
};

export const defaultVisitVisaPage: VisitVisaPageData = {
  page_title: 'Visit Visa Consultancy in Multan | Family & Business Visit Visas',
  url_slug: 'visit-visa',
  hero_heading: 'Family & Business Visit Visas',
  hero_subheading: 'Visit Visa Assistance',
  hero_description: 'Professional guidance for visitors planning international travel. Visit family members abroad, attend business conferences, or explore investment opportunities with complete visa file preparation from Glontis Visa Consultancy in Multan.',
  hero_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
  hero_image_alt_text: 'Family and Business Visit Visa Counseling',
  hero_image_title: 'Glontis Visit Visa Banner',
  mobile_hero_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  mobile_hero_image_alt_text: 'Visit Visa Assistance Multan',
  mobile_hero_image_title: 'Visit Visa Mobile Banner',
  introduction: 'Glontis Visa Consultancy provides expert visit visa advisory and file preparation services for applicants in Multan and across Pakistan. Whether you are traveling to visit close family, attending trade expos, or taking short business trips, our experienced consultants ensure every legal and financial proof is accurately compiled.',
  visa_overview: 'Our visit visa services cover complete documentation audit, sponsor letter verification, official itinerary vouchers, bank statement formatting, and embassy appointment scheduling. We help you present a genuine, transparent, and compelling application to international embassies.',
  who_can_apply: [
    'Individuals visiting immediate family members or close relatives legally residing abroad.',
    'Business delegates, corporate executives, and entrepreneurs attending international conferences or trade fairs.',
    'Parents visiting children studying or working overseas.',
    'Short-term visitors for medical consultations, cultural exchange, or family celebrations.',
  ],
  eligibility_requirements: [
    'Valid original passport with at least 6 months validity from the intended return date.',
    'Demonstrated strong socio-economic and financial ties to Pakistan (employment, business NTN, property).',
    'Official invitation letter from overseas sponsor, host relative, or inviting organization.',
    'Sufficient bank balance and active account statement for the past 6 months.',
    'Clean immigration history with no previous visa violations or unexplained rejections.',
  ],
  required_documents: [
    'Original Passport & Scans of Previous Passports / Visas',
    '2 Recent Passport Photos (35x45mm, White Background, 80% Face)',
    '6 Months Bank Statement & Account Maintenance Certificate',
    'CNIC Copy & Family Registration Certificate (FRC / MRC)',
    'Employment Letter / Salary Slips OR Business Chamber / NTN Documents',
    'Official Invitation Letter & Sponsor ID Proof (if visiting family/business)',
    'Confirmed Flight Reservation & Verifiable Hotel Vouchers',
    'Overseas Travel Health Insurance Policy ($30,000+ coverage)',
  ],
  application_process: [
    {
      step: 1,
      title: 'Case Assessment & Document Review',
      description: 'Consult with our Multan counselors to assess your profile, family ties, sponsor credibility, and bank statement stability.',
    },
    {
      step: 2,
      title: 'Sponsor & File Compilation',
      description: 'We verify sponsor invitation documents, generate flight/hotel itineraries, and draft custom cover letters.',
    },
    {
      step: 3,
      title: 'Embassy Filing & Biometrics',
      description: 'Appointment booking for VFS, Gerrys, BLS, or embassy biometrics, plus DS-160/online e-visa filing.',
    },
    {
      step: 4,
      title: 'Visa Grant & Travel Briefing',
      description: 'Collect your stamped passport or e-visa approval with pre-departure travel recommendations.',
    },
  ],
  processing_information: {
    processing_time: '5 to 1 Working Days (depending on embassy)',
    visa_duration: '6 Months to 2 Years (Single / Multiple Entry)',
    entry_type: 'Single Entry / Multiple Entry',
    stay_duration: '30 Days to 90 Days per visit',
    fee_estimate: 'Affordable, transparent service charges with zero hidden fees',
    important_info: 'All applications undergo thorough verification before submission to ensure complete alignment with official embassy guidelines.',
  },
  benefits: [
    'End-to-end guidance from senior visa experts in Multan.',
    'Meticulous bank statement evaluation to maximize legal presentation.',
    'Official verifiable flight reservations, hotel vouchers, and travel insurance.',
    'Professional cover letter writing highlighting genuine ties to home country.',
    'Mock embassy interview preparation for US B1/B2 and Schengen applicants.',
  ],
  destinations: [
    {
      id: 'vv-dest-1',
      title: 'UK Standard Visitor Visa',
      country: 'United Kingdom',
      badge: '6 Months / 2 Years',
      description: 'Visit family, friends, or attend business meetings in London and across the UK with solid financial documentation.',
      key_highlights: [
        '6 Months / 2 Year Multiple Entry',
        'Full Sponsor File Support',
        'VFS Appointment Booking',
      ],
      image_url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
      image_alt_text: 'UK Standard Visitor Visa Big Ben',
      image_title: 'UK Visit Visa',
      is_active: true,
    },
    {
      id: 'vv-dest-2',
      title: 'Schengen Business & Family Visit Visa',
      country: 'Germany, France, Italy, Spain',
      badge: '29 Countries',
      description: 'Travel across 29 Schengen countries. Complete itinerary, invitation verification, and insurance file compilation.',
      key_highlights: [
        'Schengen Travel Insurance Included',
        'Cover Letter & Hotel Vouchers',
        'BLS / VFS Appointment Prep',
      ],
      image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
      image_alt_text: 'Schengen Visit Visa Paris',
      image_title: 'Schengen Visit Visa',
      is_active: true,
    },
    {
      id: 'vv-dest-3',
      title: 'USA B1/B2 Visitor Visa',
      country: 'United States',
      badge: '10-Year Multiple Entry',
      description: 'DS-160 form filing, fee payment, appointment booking, and mock interview preparation at the US Embassy in Islamabad.',
      key_highlights: [
        'DS-160 Form Filing',
        'Islamabad Embassy Prep',
        '10-Year Multiple Entry Potential',
      ],
      image_url: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1200&q=80',
      image_alt_text: 'USA Visitor Visa Statue of Liberty',
      image_title: 'USA B1 B2 Visa',
      is_active: true,
    },
    {
      id: 'vv-dest-4',
      title: 'Canada Visitor Visa (TRV)',
      country: 'Canada',
      badge: 'Multiple Entry',
      description: 'Multiple-entry Canada visitor visa filing for visiting children, relatives, or attending trade exhibitions.',
      key_highlights: [
        '10-Year Validity (Passport Expiry)',
        'Immigration Portal Submission',
        'Family Ties & Financial Proof',
      ],
      image_url: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
      image_alt_text: 'Canada Visitor Visa Toronto',
      image_title: 'Canada Visit Visa',
      is_active: true,
    },
    {
      id: 'vv-dest-5',
      title: 'Australia Visitor Visa (Subclass 600)',
      country: 'Australia',
      badge: 'Family & Business',
      description: 'Tourist & Family stream visas with online ImmiAccount submission and genuine temporary entrant proofing.',
      key_highlights: [
        'Online ImmiAccount Processing',
        'No Passport Stamping Required',
        'Fast Turnaround',
      ],
      image_url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
      image_alt_text: 'Australia Subclass 600 Opera House',
      image_title: 'Australia Visit Visa',
      is_active: true,
    },
    {
      id: 'vv-dest-6',
      title: 'UAE & Saudi Arabia Family Visit',
      country: 'Middle East',
      badge: 'Fast 24-48 Hours',
      description: 'Fast 24-48 hour e-visa processing for family visits, business exhibitions, and Umrah visits.',
      key_highlights: [
        '24 to 48 Hours E-Visa',
        'Simple Document Checklist',
        'Instant Delivery',
      ],
      image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      image_alt_text: 'UAE Saudi Visit Visa Dubai',
      image_title: 'UAE Saudi Visit Visa',
      is_active: true,
    },
  ],
  faqs: [
    {
      id: 'vv-faq-1',
      question: 'What is the difference between a Tourist Visa and a Visit Visa?',
      answer: 'A tourist visa is primarily intended for leisure travel and sightseeing, whereas a visit visa usually requires an invitation from an overseas sponsor, relative, or business partner who verifies the purpose and host arrangements for your stay.',
    },
    {
      id: 'vv-faq-2',
      question: 'Can I work on a Visit Visa?',
      answer: 'No. Visit visas strictly prohibit taking up employment or performing paid work abroad. If your goal is employment, you must apply for a dedicated Work Visa or Employment Permit.',
    },
    {
      id: 'vv-faq-3',
      question: 'How much bank statement balance is required for a UK Visit Visa?',
      answer: 'Embassies evaluate whether your available bank balance is proportionate to your income and sufficient to cover travel costs without straining your finances. We evaluate your account to ensure genuine, compliant presentation.',
    },
  ],
  cta_heading: 'Ready to Visit Family or Attend Business Abroad?',
  cta_description: 'Get personalized visit visa file assessment and guidance from Glontis Visa Consultancy in Multan.',
  primary_cta_text: 'Book Free Visit Visa Assessment',
  primary_cta_url: '/free-consultation',
  secondary_cta_text: 'Explore Destinations',
  secondary_cta_url: '/visit-visa',
  whatsapp_button_text: 'Chat on WhatsApp',
  section_visibility: {
    hero: true,
    introduction: true,
    overview: true,
    who_can_apply: true,
    destinations: true,
    eligibility: true,
    documents: true,
    process: true,
    processing_info: true,
    benefits: true,
    faqs: true,
    cta: true,
  },
  section_order: ['hero', 'introduction', 'overview', 'who_can_apply', 'destinations', 'eligibility', 'documents', 'process', 'processing_info', 'benefits', 'faqs', 'cta'],
  seo_title: 'Visit Visa Consultancy in Multan | UK, Schengen, USA, Canada Visit Visas',
  meta_description: 'Top Visit Visa consultants in Multan. Professional file preparation for family visit, business visitor, and sponsor-backed visas for UK, USA, Canada, Australia, and Europe.',
};

export const defaultHomepageHero: HomepageHeroData = {
  eyebrow: 'GLONTIS VISA CONSULTANCY',
  heading: 'Your Journey Abroad Starts Here',
  description: 'Expert guidance for Study Visa, Work Visa, Visit Visa, Tourist Visa, Business Visa, Immigration & PR, and Overseas Scholarships from Multan\'s premier visa consultancy.',
  primary_cta_text: 'Book Free Consultation',
  primary_cta_url: '/free-consultation',
  secondary_cta_text: 'Explore Our Services',
  secondary_cta_url: '/services',
  hero_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
  hero_image_alt_text: 'Glontis Visa Consultancy - Professional Overseas Guidance',
  hero_image_title: 'Glontis Overseas Consultation',
  mobile_hero_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  mobile_hero_image_alt_text: 'Glontis Overseas Mobile Banner',
  floating_badges: [
    { id: 'fb-1', title: 'Study Visa', subtitle: 'Top Universities & Grants', icon_name: 'GraduationCap', is_active: true },
    { id: 'fb-2', title: 'Work Visa', subtitle: 'Global Employment Permits', icon_name: 'Briefcase', is_active: true },
    { id: 'fb-3', title: 'Visit Visa', subtitle: 'Family & Sponsor Invites', icon_name: 'Users', is_active: true },
    { id: 'fb-4', title: 'Tourist Visa', subtitle: 'Worldwide Holiday Travel', icon_name: 'Compass', is_active: true },
  ],
  service_quick_links: [
    { id: 'sql-1', title: 'Study Visa', badge: 'Popular', url: '/study-visa', icon_name: 'GraduationCap', description: 'UK, Australia, USA, Canada & EU Top Universities', is_active: true, display_order: 1 },
    { id: 'sql-2', title: 'Work Visa', badge: 'Permits', url: '/work-visa', icon_name: 'Briefcase', description: 'Europe, Middle East & Overseas Job Sponsorships', is_active: true, display_order: 2 },
    { id: 'sql-3', title: 'Visit Visa', badge: 'Sponsor File', url: '/visit-visa', icon_name: 'Users', description: 'Family Visits, Business Meetings & Cover Letters', is_active: true, display_order: 3 },
    { id: 'sql-4', title: 'Tourist Visa', badge: 'Fast Track', url: '/tourist-visa', icon_name: 'Compass', description: 'Schengen, USA, UK & Worldwide Holiday Visas', is_active: true, display_order: 4 },
    { id: 'sql-5', title: 'Business Visa', badge: 'Investors', url: '/services', icon_name: 'Building2', description: 'Corporate Travel, Trade & Investor Entry Permits', is_active: true, display_order: 5 },
    { id: 'sql-6', title: 'Immigration / PR', badge: 'Residency', url: '/services', icon_name: 'Globe', description: 'Express Entry, Skilled Migration & PR Guidance', is_active: true, display_order: 6 },
    { id: 'sql-7', title: 'Scholarships', badge: '100% Funded', url: '/study-destinations', icon_name: 'Award', description: 'Fully Funded & Partial Merit-Based Grants', is_active: true, display_order: 7 },
  ],
};

export const defaultHomepageSections: HomepageSectionConfig[] = [
  { id: 'hero', title: 'Hero Section & Banner Slider', description: 'Main banner with headline, call-to-action buttons, country selector, and floating badges.', is_enabled: true, display_order: 1 },
  { id: 'trust_stats', title: 'Trust & Statistics Bar', description: 'Key highlights such as assessment fee, university count, and office location.', is_enabled: true, display_order: 2 },
  { id: 'offer_banner', title: 'Special Offers Banner', description: 'Featured promotional offers and discounts banner.', is_enabled: true, display_order: 3 },
  { id: 'destinations', title: 'Study Visa Destinations (CMS Dynamic)', description: 'Interactive country cards for active study destinations.', is_enabled: true, display_order: 4 },
  { id: 'scholarships', title: 'Scholarships & Financial Aid (CMS Dynamic)', description: 'Funded scholarship opportunities read directly from the Scholarships CMS.', is_enabled: true, display_order: 5 },
  { id: 'work_visa', title: 'Work Visa Opportunities (CMS Dynamic)', description: 'Verified employment categories for Italy, Turkey & Saudi Arabia from Work Visa CMS.', is_enabled: true, display_order: 6 },
  { id: 'services', title: 'Our Visa Services', description: 'Comprehensive list of Study, Work, Visit, Tourist & Immigration services.', is_enabled: true, display_order: 7 },
  { id: 'universities', title: 'Partner Universities & Colleges', description: 'Showcase of 200+ partner international institutions.', is_enabled: true, display_order: 8 },
  { id: 'success_stories', title: 'Visa Success Stories', description: 'Real student visa grant letters and success cases.', is_enabled: true, display_order: 9 },
  { id: 'testimonials', title: 'Client Reviews & Testimonials', description: 'Verified student and client reviews.', is_enabled: true, display_order: 10 },
  { id: 'consultation_form', title: 'Free Initial Counseling Form', description: 'Lead generation assessment form.', is_enabled: true, display_order: 11 },
  { id: 'faqs', title: 'Frequently Asked Questions (FAQs)', description: 'Accordion list of common visa and admission queries.', is_enabled: true, display_order: 12 },
  { id: 'office_map', title: 'Office Location & Map', description: 'Multan Bosan Road office address, directions, and Google Maps embed.', is_enabled: true, display_order: 13 },
];

// Persistent File System DB Store Helper
let inMemoryDb: AppDatabase | null = null;

function getDbFilePath() {
  try {
    const path = require('path');
    return path.join(process.cwd(), '.data', 'db.json');
  } catch {
    return '.data/db.json';
  }
}

export function getDb(): AppDatabase {
  if (inMemoryDb) return inMemoryDb;

  if (typeof window === 'undefined') {
    try {
      const fs = require('fs');
      const dbPath = getDbFilePath();
      if (fs.existsSync(dbPath)) {
        const data = fs.readFileSync(dbPath, 'utf-8');
        inMemoryDb = JSON.parse(data);
        if (inMemoryDb) {
          if (!inMemoryDb.settings) inMemoryDb.settings = defaultSettings;
          if (!inMemoryDb.mediaLibrary) inMemoryDb.mediaLibrary = defaultMediaLibrary;
          if (!inMemoryDb.heroSlides) inMemoryDb.heroSlides = defaultHeroSlides;
          if (!inMemoryDb.homepageHero) inMemoryDb.homepageHero = defaultHomepageHero;
          if (!inMemoryDb.homepageSections) inMemoryDb.homepageSections = defaultHomepageSections;
          if (!inMemoryDb.offers) inMemoryDb.offers = defaultOffers;
          if (!inMemoryDb.trustStats) inMemoryDb.trustStats = defaultTrustStats;
          if (!inMemoryDb.countries) inMemoryDb.countries = defaultCountries;
          if (!inMemoryDb.services) inMemoryDb.services = defaultServices;
          if (!inMemoryDb.universities) inMemoryDb.universities = defaultUniversities;
          if (!inMemoryDb.scholarships) inMemoryDb.scholarships = defaultScholarships;
          if (!inMemoryDb.successStories) inMemoryDb.successStories = defaultSuccessStories;
          if (!inMemoryDb.testimonials) inMemoryDb.testimonials = defaultTestimonials;
          if (!inMemoryDb.blogs) inMemoryDb.blogs = defaultBlogs;
          if (!inMemoryDb.faqs) inMemoryDb.faqs = defaultFaqs;
          if (!inMemoryDb.leads) inMemoryDb.leads = defaultLeads;
          if (!inMemoryDb.workVisaPage) inMemoryDb.workVisaPage = defaultWorkVisaPage;
          if (!inMemoryDb.visitVisaPage) inMemoryDb.visitVisaPage = defaultVisitVisaPage;
          if (!inMemoryDb.touristVisaPage) inMemoryDb.touristVisaPage = defaultTouristVisaPage;
          return inMemoryDb;
        }
      }
    } catch (err) {
      console.error('Error reading DB_FILE_PATH, initializing default:', err);
    }
  }

  inMemoryDb = {
    settings: defaultSettings,
    mediaLibrary: defaultMediaLibrary,
    heroSlides: defaultHeroSlides,
    homepageHero: defaultHomepageHero,
    homepageSections: defaultHomepageSections,
    offers: defaultOffers,
    trustStats: defaultTrustStats,
    countries: defaultCountries,
    services: defaultServices,
    universities: defaultUniversities,
    scholarships: defaultScholarships,
    successStories: defaultSuccessStories,
    testimonials: defaultTestimonials,
    blogs: defaultBlogs,
    leads: defaultLeads,
    faqs: defaultFaqs,
    workVisaPage: defaultWorkVisaPage,
    visitVisaPage: defaultVisitVisaPage,
    touristVisaPage: defaultTouristVisaPage,
  };

  saveDb(inMemoryDb);
  return inMemoryDb;
}

export function saveDb(db: AppDatabase): void {
  inMemoryDb = db;
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs');
      const path = require('path');
      const dbPath = getDbFilePath();
      const dir = path.dirname(dbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing to DB_FILE_PATH:', err);
    }
  }
}
