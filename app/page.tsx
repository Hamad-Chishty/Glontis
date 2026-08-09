'use client';

import React from 'react';
import { useData } from '@/lib/context/DataContext';
import HeroSlider from '@/components/home/HeroSlider';
import TrustSection from '@/components/home/TrustSection';
import OfferBanner from '@/components/home/OfferBanner';
import DestinationsGrid from '@/components/home/DestinationsGrid';
import ServicesSection from '@/components/home/ServicesSection';
import UniversitiesSection from '@/components/home/UniversitiesSection';
import SuccessStoriesSection from '@/components/home/SuccessStoriesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ConsultationForm from '@/components/home/ConsultationForm';
import FaqSection from '@/components/home/FaqSection';
import OfficeLocationMap from '@/components/home/OfficeLocationMap';
import { defaultHomepageSections } from '@/lib/data-store';

export default function HomePage() {
  const { homepageSections } = useData();

  const activeSections = (homepageSections && homepageSections.length > 0 ? homepageSections : defaultHomepageSections)
    .filter((s) => s.is_enabled)
    .sort((a, b) => a.display_order - b.display_order);

  const renderSectionComponent = (id: string) => {
    switch (id) {
      case 'hero':
        return <HeroSlider key="hero" />;
      case 'trust_stats':
        return <TrustSection key="trust_stats" />;
      case 'offer_banner':
        return <OfferBanner key="offer_banner" />;
      case 'destinations':
        return <DestinationsGrid key="destinations" />;
      case 'services':
        return <ServicesSection key="services" />;
      case 'universities':
        return <UniversitiesSection key="universities" />;
      case 'success_stories':
        return <SuccessStoriesSection key="success_stories" />;
      case 'testimonials':
        return <TestimonialsSection key="testimonials" />;
      case 'consultation_form':
        return <ConsultationForm key="consultation_form" />;
      case 'faqs':
        return <FaqSection key="faqs" />;
      case 'office_map':
        return <OfficeLocationMap key="office_map" />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen">
      {activeSections.map((sec) => renderSectionComponent(sec.id))}
    </main>
  );
}
