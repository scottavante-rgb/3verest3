'use client';

import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import HeroSection from '@/components/media/HeroSection';
import FeaturedStory from '@/components/media/FeaturedStory';
import MediaMosaicGrid from '@/components/media/MediaMosaicGrid';
import TimelineBand from '@/components/media/TimelineBand';
import PressContactCluster from '@/components/media/PressContactCluster';
import ClosingStatement from '@/components/media/ClosingStatement';

export default function MediaPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#0A0F1A] to-[#0F1C29]">
      {/* Navigation */}
      <Navigation />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Story */}
        <FeaturedStory />

        {/* Media Mosaic Grid */}
        <MediaMosaicGrid />

        {/* Living Timeline */}
        <TimelineBand />

        {/* Press Contact Cluster */}
        <PressContactCluster />

        {/* Closing Statement */}
        <ClosingStatement />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
