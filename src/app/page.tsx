import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import HeroSection from "@/components/sections/HeroSection";
import TrustSection from "@/components/sections/TrustSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import EditorialSection from "@/components/sections/EditorialSection";
import FounderSection from "@/components/sections/FounderSection";
import SecondFormSection from "@/components/sections/SecondFormSection";
import MapSection from "@/components/sections/MapSection";

export const metadata: Metadata = {
  title: "Happy Life Matrimony | Find Your Perfect Life Partner in Hyderabad",
  description:
    "Happy Life Matrimony is a trusted, personal, privacy-first Indian matrimony service in Hyderabad. Register your profile free and find a compatible life partner through genuine matchmaking.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <TrustSection />
        <HowItWorksSection />
        <EditorialSection />
        <FounderSection />
        <SecondFormSection />
        <MapSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
