import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/dashboard/HeroSection';
import FeaturesGrid from '@/components/dashboard/FeaturesGrid';
import MetricsRow from '@/components/dashboard/MetricRow';
import CtaSection from '@/components/dashboard/CtaSection';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />

        <FeaturesGrid />
        
        <MetricsRow />

        <CtaSection/>
        
        <div className="container mx-auto py-20 opacity-20">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>
      </main>

      <Footer />
    </div>
  );
}