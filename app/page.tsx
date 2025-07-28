import Header from "@/components/Header/Header";
import Services from "@/components/Services";
import Process from "@/components/Process";
import { ProjectsSection } from "@/components/ProjectsSection";
import AboutSection from "@/components/About/AboutSection";
import ContactSection from "@/components/ContactSection";
import { projectsData } from "@/data/projectsData";

const featuredProjects = projectsData;

export default function Home() {
  return (
    <>
      <main className="w-full min-h-screen flex flex-col items-center">
        <Header />
        <section id="about" className="w-full">
          <AboutSection />
        </section>
        <section id="work" className="w-full">
          <ProjectsSection
            projects={featuredProjects}
            title="Selected Work"
            description="A mix of websites, visuals, and creative digital projects."
          />
        </section>
        <section id="services" className="w-full">
          <Services />
        </section>
        <section id="process" className="w-full">
          <Process />
        </section>
        <section id="contact" className="w-full">
          <ContactSection />
        </section>
      </main>
    </>
  );
}
