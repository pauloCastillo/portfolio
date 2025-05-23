import { Link } from "@remix-run/react";
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
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
          <ul className="flex mx-5 justify-around w-1/2 flex-wrap">
            { designLogos.map((logo) => (
              <li key={logo.alt} className="flex flex-col items-center justify-center">
                <img src={logo.src} alt={logo.alt} className="h-16 w-16 mr-2" />
                <span className="text-sm text-gray-200 ml-2 uppercase">{logo.alt}</span>
              </li>
            )) }
          </ul>
          <ul className="flex mx-5 items-center justify-around w-1/2 flex-wrap">
            { devLogos.map((logo) => (
              <li key={logo.alt} className="flex flex-col items-center justify-center">
                <img src={logo.src} alt={logo.alt} className="h-16 w-16 mr-2" />
                <span className="text-sm text-gray-200 ml-2 uppercase">{logo.alt}</span>
              </li>
            )) }
          </ul>
        </div>
      </section>
      <section className="min-h-screen w-full text-center my-4">
            <h3 className="text-2xl font-semibold">Mis Servicios</h3>
            <div className="flex flex-col items-center my-8">
              <Link to="/about" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600">Descarga mi CV para saber más</Link> 
            </div> 
            <Newsletter />
      </section>
      {/* <section className="mt-8">
        
        <ul className="list-disc list-inside mt-4">
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Bootstrap</li>
          <li>SASS</li>
          <li>Javascript</li>
          <li>React.js</li>
          <li>Vue.js</li>
          <li>API Restfull</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>MongoDB</li>
          <li>PostgreSQL</li>
          <li>Git</li>
          <li>Figma</li>
          <li>Photoshop</li>
          <li>Illustrator</li>
          <li>InDesign</li>
          <li>After Effects</li>
          <li>Premiere Pro</li>
          <li>Canva</li>
          <li>WordPress</li>
          <li>Shopify</li>
          <li>SEO</li>
          <li>Google Analytics</li>
          <li>Google Ads</li>
          <li>Facebook Ads</li>
          <li>Instagram Ads</li>
          <li>LinkedIn Ads</li>
          <li>Twitter Ads</li>
          <li>Mailchimp</li>
          <li>HubSpot</li>
          <li>Zapier</li>
          <li>Slack</li>
          <li>Trello</li>
          <li>Asana</li>
        </ul>
      </section>
        
        <ul className="list-disc list-inside mt-4">
          <li>Licenciatura en Diseño Gráfico - Universidad de Buenos Aires (2015)</li>
          <li>Desarrollo Web Full Stack - Digital House (2018)</li>
          <li>React.js - Coderhouse (2020)</li>
          <li>Vue.js - Coderhouse (2021)</li>
          <li>Node.js - Coderhouse (2021)</li>
          <li>MongoDB - Coderhouse (2021)</li>
          <li>PostgreSQL - Coderhouse (2021)</li>
          <li>Git - Coderhouse (2021)</li>
          <li>Figma - Coderhouse (2021)</li>
          <li>Photoshop - Coderhouse (2021)</li>
          <li>Illustrator - Coderhouse (2021)</li>
          <li>InDesign - Coderhouse (2021)</li>
          <li>After Effects - Coderhouse (2021)</li>
          <li>Premiere Pro - Coderhouse (2021)</li>
          <li>Canva - Coderhouse (2021)</li>
          <li>WordPress - Coderhouse (2021)</li>
          <li>Shopify - Coderhouse (2021)</li>
          <li>SEO - Coderhouse (2021)</li>
          <li>Google Analytics - Coderhouse (2021)</li>
        </ul>
        <h3 className="text-2xl font-semibold mt-8">Certifications</h3>
        <ul className="list-disc list-inside mt-4">
          <li>Google Analytics - Google (2021)</li>
          <li>Google Ads - Google (2021)</li>
          <li>Facebook Ads - Facebook (2021)</li>
          <li>Instagram Ads - Facebook (2021)</li>
          <li>LinkedIn Ads - LinkedIn (2021)</li>
          <li>Twitter Ads - Twitter (2021)</li>
          <li>Mailchimp - Mailchimp (2021)</li>
          <li>HubSpot - HubSpot (2021)</li>
          <li>Zapier - Zapier (2021)</li>
        </ul>
        <h3 className="text-2xl font-semibold mt-8">Languages</h3>
        <ul className="list-disc list-inside mt-4">
          <li>Español - Nativo</li>
          <li>Inglés - Intermedio</li>
          <li>Portugués - Intermedio</li>
        </ul> */}
    </div>
  );   
}