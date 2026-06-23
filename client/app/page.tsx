import HeroSection from "@/shared/ui/Heroe";
import StackSection from "@/shared/ui/StackSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ValuesSection from "@/components/sections/ValuesSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <hr className="border-t border-border" />
      <StackSection />
      <hr className="border-t border-border" />
      <ProjectsSection />
      <hr className="border-t border-border" />
      <ValuesSection />
      <hr className="border-t border-border" />
      <AboutSection />
      <hr className="border-t border-border" />
      <ContactSection />
    </>
  );
}
