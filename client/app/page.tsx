import { Suspense } from "react";
import AboutPage from "./pages/AboutPage";
import ContactMePage from "./pages/ContactPage";
import HeroePage from "./pages/Heroe";
import ProjectsLayout from "./pages/ProjectsPage";

export default function HomePage() {
  
  return (
    <Suspense>
      <main>
        <HeroePage />
        <section id="about">
          <AboutPage />
        </section>
        <section id="projects">
          <ProjectsLayout />
        </section>
        <section id="contact">
          <ContactMePage />
        </section>
      </main>
    </Suspense>
  );
}
