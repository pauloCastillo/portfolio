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
      <h3 className="font-bold text-xl">Tu Socio Creativo para Soluciones Web Impactantes</h3>
      <p className="text-sm mt-4 w-[70%]">Hola, soy diseñador gráfico y desarrollador full-stack con una pasión por construir experiencias web que no solo se ven bien, sino que también funcionen a la perfección y podamos tener un crecimiento juntos. Durante los últimos 5 años, he tenido la oportunidad de colaborar con el desarrollo de un ecommerce, y el desarrollo de un sistema educativo por completo, tanto la parte visual como técnica del desarrollo, ayudándoles a transformar sus ideas en realidades digitales y a su crecimiento.</p>
      <div className="flex items-center justify-center mt-1 w-full">
        <img src="/fotoCV.jpg" alt="Profile" className="rounded-full w-64 h-64 mr-10" />
        <div className="p-4 w-1/2">
          <p className="text-sm my-4"><b>Mi filosofía es simple: </b>Creo que el diseño y el desarrollo no son disciplinas separadas, sino dos caras de la misma moneda. Por eso, me esfuerzo por integrar ambos aspectos en cada proyecto, desde la concepción inicial hasta la implementación final.</p>
          <p className="text-xl font-bold">¿Qué me diferencia?</p>
          <br/>
          <ul className="list-disc list-inside text-sm">
            <li><b>Una perspectiva integral: </b>Entiendo la importancia de la usabilidad, la accesibilidad y la identidad visual.</li>
            <li><b>Un enfoque centrado en el usuario: </b>Creo experiencias intuitivas y atractivas que conectan con tu audiencia.</li>
            <li><b>Un compromiso con la calidad: </b> Me aseguro de que cada línea de código y cada elemento de diseño cumplan con los requerimientos y expectativas del cliente.</li>
          </ul>
          <p className="text-sm my-4">Más allá de mis habilidades técnicas, soy un apasionado del aprendizaje continuo. Me encanta explorar nuevas tecnologías, experimentar con nuevas ideas y desafiar mis propios límites. Creo que la clave para el éxito en este campo es mantenerse curioso y nunca dejar de aprender.</p>
          <p className="text-sm">Si estás buscando un socio creativo que pueda ayudarte a llevar tu presencia online al siguiente nivel, ¡me encantaría charlar contigo! <Link to={"/contact"} className="text-green-300">Contáctame hoy mismo</Link> para discutir tu proyecto.</p>
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