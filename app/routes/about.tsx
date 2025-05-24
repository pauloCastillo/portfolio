import { Link } from "@remix-run/react";
import BaseCard from "~/components/BaseCard";
import Newsletter from "~/components/Newsletter";
export default function About() {
  const designLogos = [
    { src: "/adobeAI.svg", alt: "illustrator" },
    { src: "/adobePsd.svg", alt: "photoshop" },
    { src: "/adobeInd.svg", alt: "indesign" },
    { src: "/adobAE.svg", alt: "after-effects" },
    { src: "/adobePr.svg", alt: "premiere" },
    { src: "/figma.svg", alt: "figma" },
  ];

  const devLogos = [
    { src: "/html5.svg", alt: "html5" },
    { src: "/css3.svg", alt: "css3" },
    { src: "/sass.svg", alt: "sass" },
    { src: "tailwind.svg", alt: "tailwind" },
    { src: "/js.svg", alt: "javascript" },
    { src: "/ts.svg", alt:"typescript" },
    { src: "/react.svg", alt: "react" },
    { src: "/vue.svg", alt: "vue" },
    { src: "/node.svg", alt: "nodejs" },
    { src: "/express.svg", alt: "express" },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold">About Me</h1>
      <h2 className="text-2xl font-semibold">Paulo Castillo</h2>
      <div className="flex items-center justify-center mt-4 w-full">
        <img src="/fotoCV.jpg" alt="Profile" className="rounded-full w-64 h-64 mr-10" />
        <div className="p-4 w-1/2">
          <p className="text-sm">Diseñador Gráfico y Desarrollador Frontend con más de 5 años de experiencia haciendo uso de tecnologías en frontend como: Html5, CSS3, Bootstrap, SASS, Javascript, React.js y Vue.js e integraciones de API´s Restfull.</p>
          <p className="text-sm">Tuve la oportunidad de desarrollar una API desde cero para una institución de retail, logrando una conexión efectiva a una pasarela de pagos y así poder realizar cobros digitales para su crecimiento digital. Desarrollé desde cero una aplicación web implementando una base de datos con una óptima conexión entre el frontend y el backend para una institución educativa, mejorando así su presencia digital y apoyando al incremento de nuevos estudiantes.</p>
          <p className="text-sm">Me encuentro en la búsqueda de una posición remota como FrontEnd Developer en un equipo ágil, remoto y comprometido a alcanzar metas y objetivos comunes, aportando a los diferentes retos mis conocimientos de diseño para lograr mejores resultados.</p>
        </div>
      </div>
      <section className="h-64 w-full text-center my-8">
        <h3 className="text-2xl font-semibold uppercase">skills</h3>
        <div className="flex items-center justify-around mt-4 w-full">
          <ul className="flex items-center w-[40%] flex-wrap">
            { devLogos.map((logo) => (
              <li key={logo.alt} className="flex flex-col items-center justify-center">
                <img src={logo.src} alt={logo.alt} className="h-16 w-16 mr-2" />
                <span className="text-sm text-gray-200 ml-2 uppercase">{logo.alt}</span>
              </li>
            )) }
          </ul>
          <ul className="flex items-center justify-center w-72 flex-wrap">
            { designLogos.map((logo) => (
              <li key={logo.alt} className="flex flex-col items-center justify-center">
                <img src={logo.src} alt={logo.alt} className="h-16 w-16 mr-2" />
                <span className="text-sm text-gray-200 ml-2 uppercase">{logo.alt}</span>
              </li>
            )) }
          </ul>
        </div>
        <div className="flex flex-col items-center my-8">
          <Link to="/about" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600">Descarga mi CV para saber más</Link> 
        </div> 
      </section>
      <section className="w-full h-full">
            <h3 className="text-2xl font-semibold mt-8 text-center my-5">Mis Servicios</h3>
            <div className="flex flex-wrap items-center justify-evenly">
              <BaseCard title="Diseño Gráfico" image="/figma.svg">
                  <div className="flex flex-col items-center justify-center text-start w-full">
                    <p className="text-sm">Diseño de interfaces de usuario (UI) y experiencia de usuario (UX).</p>
                    <p className="text-sm">Desarrollo Frontend con tecnologías como React.js, Vue.js, HTML5, CSS3 y SASS.</p>
                    <p className="text-sm">Desarrollo de aplicaciones web y móviles.</p>
                    <p className="text-sm">Integración de API´s Restfull.</p>
                  </div>
              </BaseCard>
                <BaseCard title="Diseño Gráfico" image="/figma.svg">
                  <div className="flex flex-col items-center justify-center text-start w-full">
                    <p className="text-sm">Diseño de interfaces de usuario (UI) y experiencia de usuario (UX).</p>
                    <p className="text-sm">Desarrollo Frontend con tecnologías como React.js, Vue.js, HTML5, CSS3 y SASS.</p>
                    <p className="text-sm">Desarrollo de aplicaciones web y móviles.</p>
                    <p className="text-sm">Integración de API´s Restfull.</p>
                  </div>
              </BaseCard>
                <BaseCard title="Diseño Gráfico" image="/figma.svg">
                  <div className="flex flex-col items-center justify-center text-start w-full">
                    <p className="text-sm">Diseño de interfaces de usuario (UI) y experiencia de usuario (UX).</p>
                    <p className="text-sm">Desarrollo Frontend con tecnologías como React.js, Vue.js, HTML5, CSS3 y SASS.</p>
                    <p className="text-sm">Desarrollo de aplicaciones web y móviles.</p>
                    <p className="text-sm">Integración de API´s Restfull.</p>
                  </div>
              </BaseCard>
                <BaseCard title="Diseño Gráfico" image="/figma.svg">
                  <div className="flex flex-col items-center justify-center text-start w-full">
                    <p className="text-sm">Diseño de interfaces de usuario (UI) y experiencia de usuario (UX).</p>
                    <p className="text-sm">Desarrollo Frontend con tecnologías como React.js, Vue.js, HTML5, CSS3 y SASS.</p>
                    <p className="text-sm">Desarrollo de aplicaciones web y móviles.</p>
                    <p className="text-sm">Integración de API´s Restfull.</p>
                  </div>
              </BaseCard>
                <BaseCard title="Diseño Gráfico" image="/figma.svg">
                  <div className="flex flex-col items-center justify-center text-start w-full">
                    <p className="text-sm">Diseño de interfaces de usuario (UI) y experiencia de usuario (UX).</p>
                    <p className="text-sm">Desarrollo Frontend con tecnologías como React.js, Vue.js, HTML5, CSS3 y SASS.</p>
                    <p className="text-sm">Desarrollo de aplicaciones web y móviles.</p>
                    <p className="text-sm">Integración de API´s Restfull.</p>
                  </div>
              </BaseCard>
                <BaseCard title="Diseño Gráfico" image="/figma.svg">
                  <div className="flex flex-col items-center justify-center text-start w-full">
                    <p className="text-sm">Diseño de interfaces de usuario (UI) y experiencia de usuario (UX).</p>
                    <p className="text-sm">Desarrollo Frontend con tecnologías como React.js, Vue.js, HTML5, CSS3 y SASS.</p>
                    <p className="text-sm">Desarrollo de aplicaciones web y móviles.</p>
                    <p className="text-sm">Integración de API´s Restfull.</p>
                  </div>
              </BaseCard>
            </div>
            <Newsletter />
      </section>
    </div>
  );   
}