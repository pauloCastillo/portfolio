import { Link } from "@remix-run/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin, faInstagram, faTiktok, faWhatsapp, faFacebook, faBehance } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
    const rrssLogos = [
        { icon: faLinkedin, socialLink:"https://www.linkedin.com/in/paulocastillomonroy"},
        { icon: faInstagram, socialLink:"https://www.instagram.com" },
        { icon: faTiktok, socialLink: "https://www.tiktok.com" },
        { icon: faWhatsapp, socialLink: "https://www.whatsapp.com" },
        { icon: faFacebook, socialLink: "https://www.facebook.com"},
        { icon: faBehance, socialLink: "https://www.behance.com"} 
    ]

    const topics = [
        { id: 1, topic:"libros", subtopics:["programación", "computación", "diseño gráfico", "motion graphics"]},
        { id: 2, topic:"artículos", subtopics:["comunicación visual", "programación", "IA"] },
        { id: 3, topic:"journal", subtopics:["web-dev ahora", "tema2", "tema3"] }
    ]
  return (
    <footer className="bg-[#2F81EE] p-4 rounded-b-md sticky bottom-0">
        <ul className="flex items-top justify-around mb-5 text-white">
            {topics.map(topics => (
                <li key={topics.id} className="uppercase">{topics.topic}
                    <ul>
                    {topics.subtopics.map(subtopic => (
                        <li key={subtopic} className="capitalize hover:cursor-pointer">
                            <Link to="/" className="hover:text-cyan-400">{subtopic}</Link>
                        </li>
                    ))}
                    </ul>
                </li>
            ))}
        </ul>
        <hr/>
        <Link to="/" className="capitalize font-light hover:cursor-pointer">terms and conditions</Link>
        <div className="flex items-center justify-between">
            <p className="font-light text-amber-50 capitalize">paulo sergio castillo monroy &copy; 2026</p>
            <ul className="flex justify-around items-center text-cyan-300 w-80">
                {rrssLogos.map(socialm => (
                    <li key={socialm.socialLink}><Link to={socialm.socialLink}><FontAwesomeIcon icon={socialm.icon} size="xl"/></Link></li>
                ))}
            </ul>
        </div>
    </footer>
  )
}