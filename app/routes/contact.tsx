import { Form, Link } from "@remix-run/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram, faTiktok, faWhatsapp, faFacebook, faBehance } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  const rrssLogos = [
    { icon: faEnvelope, socialLink: "mailto:sergio.castillomonroy" },
    { icon: faLinkedin, socialLink: "https://www.linkedin.com/in/paulocastillomonroy" },
    { icon: faInstagram, socialLink: "https://www.instagram.com/paulocastillomonroy" },
    { icon: faTiktok, socialLink: "https://www.tiktok.com/@paulocastillomonroy" },
    { icon: faWhatsapp, socialLink: "https://api.whatsapp.com/send?phone=59170164277" },
    { icon: faFacebook, socialLink: "https://www.facebook.com/paulocastillomonroy" },
    { icon: faBehance, socialLink: "https://www.behance.net/paulocastillomonroy" }
  ];

  return (
    <div className="flex items-center w-full h-full py-2 text-white">
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold">¡ Estemos en Contacto !</h1>
        <p className="text-lg mt-4">Cualquier duda o consulta que tengas, por favor, no dudes en contactarme por cualquiera de estos medios:</p>
        <ul className="flex justify-around items-center w-80 mt-4 flex-wrap">
          {rrssLogos.map((socialm) => (
            <li key={socialm.socialLink} className="flex justify-center items-center">
              <Link to={socialm.socialLink} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={socialm.icon} size="xl" className="text-blue-500 hover:text-blue-100 " />
              </Link>  
            </li>
          ))}    
        </ul>
        <p className="text-lg mt-4">O por favor, llena el formulario para que podamos seguir conversando:</p>
        <div className="flex flex-col items-center my-8">
          <p className="text-lg mt-4">¡Espero tu mensaje o tu llamado!</p>
        </div>  
      </div>
      <Form className="flex flex-col items-center justify-center border-2 border-white rounded-md p-1.5 w-80 mr-16" method="post" action="/contact">
          <input type="text" name="name" placeholder="Your Name" className="p-2 m-1.5 border border-gray-300 rounded w-full" required />
          <input type="email" name="email" placeholder="Your Email" className="p-2 m-1.5 border border-gray-300 rounded w-full" required />
          <input type="text" name="subject" placeholder="Subject" className="p-2 m-1.5 border border-gray-300 rounded w-full" required />
          <textarea name="message" placeholder="Your Message" className="p-2 m-1.5 border border-gray-300 rounded w-full h-20" required></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mt-2.5">Send Message</button>
      </Form>
    </div>
  );
}