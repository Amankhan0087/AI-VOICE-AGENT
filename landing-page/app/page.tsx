import { ContactForm } from "@/components/ContactForm";
import { DashboardPreview } from "@/components/DashboardPreview";
import { DemoVideo } from "@/components/DemoVideo";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { FloatingDemoButton } from "@/components/FloatingDemoButton";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { LiveDemo } from "@/components/LiveDemo";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Testimonials } from "@/components/Testimonials";
import { TrustBar } from "@/components/TrustBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <HowItWorks />
        <DemoVideo />
        <LiveDemo />
        <Features />
        <DashboardPreview />
        <Pricing />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <FloatingDemoButton />
    </>
  );
}
