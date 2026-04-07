import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faXTwitter, faMedium } from "@fortawesome/free-brands-svg-icons"
import { faStar } from "@fortawesome/free-solid-svg-icons"

export default function SocialShare(){
    return(
    <div className="flex items-center space-x-4 mb-8">
        <FontAwesomeIcon icon={faFacebook} className="text-gray-400 hover:text-blue-500 transition-colors" />
        <FontAwesomeIcon icon={faXTwitter} className="text-gray-400 hover:text-blue-500 transition-colors" />
        <FontAwesomeIcon icon={faMedium} className="text-gray-400 hover:text-black transition-colors" />
        <FontAwesomeIcon icon={faStar} className="text-gray-400 hover:text-yellow-400 transition-colors" />
    </div>
    )
}