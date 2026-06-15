import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import CTASection from '@/components/landing/CTASection'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-[#f8fafc]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </main>
  )
}
