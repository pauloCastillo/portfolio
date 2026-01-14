import AboutPage from "./components/AboutPage";
import ContactMePage from "./components/ContactPage";
import HeroePage from "./components/Heroe";
import ProjectsLayout from "./components/ProjectsPage";

export default function HomePage() {
  return (
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
  );
}
