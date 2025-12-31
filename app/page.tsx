import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ServiceGrid } from "@/components/service-grid"
import { ProsNearYou } from "@/components/pros-near-you"
import { BusinessCTA } from "@/components/business-cta"
import { Testimonials } from "@/components/testimonials"
import { LocationsSection } from "@/components/locations-section"
import { Footer } from "@/components/footer"
import { BottomNav } from "@/components/bottom-nav"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pb-16 md:pb-0">
      <Navbar />
      <Hero />
      <ServiceGrid />
      <ProsNearYou />
      <BusinessCTA />
      <Testimonials />
      <LocationsSection />
      <Footer />
      <BottomNav />
    </main>
  )
}
