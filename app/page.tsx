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

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSlider />
      <TrustSection />
      <OfferBanner />
      <DestinationsGrid />
      <ServicesSection />
      <UniversitiesSection />
      <SuccessStoriesSection />
      <TestimonialsSection />
      <ConsultationForm />
      <FaqSection />
      <OfficeLocationMap />
    </main>
  );
}
