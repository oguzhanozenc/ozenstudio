import Header from "@/components/Hero/Header";
import Services from "@/components/Services";
import Process from "@/components/Process";
import { WorksSection } from "@/components/Work/WorksSection";
import BrandIntroSection from "@/components/BrandIntroSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import { worksData } from "@/data/worksData";
import ProofSection from "@/components/ProofSection";
import Availability from "@/components/Availability";
import Aurora from "@/components/Background/Aurora";

const featuredWorks = worksData;

export default function Home() {
  return (
    <>
      {/* Background - positioned absolutely to cover entire page */}
      <div className="fixed inset-0 -z-10">
        <Aurora
          colorStops={["#ffe9cf", "#003f5f", "#ff4b00"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <main className="relative w-full min-h-screen flex flex-col items-center">
        <Header />

        <section id="about">
          <BrandIntroSection />
        </section>

        <section id="about">
          <ProofSection />
        </section>

        <section id="work">
          <WorksSection
            works={featuredWorks}
            title="Selected Work"
            description="A mix of websites, visuals, and creative digital projects."
          />
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="process">
          <Process />
        </section>

        <section id="availability">
          <Availability />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </>
  );
}
