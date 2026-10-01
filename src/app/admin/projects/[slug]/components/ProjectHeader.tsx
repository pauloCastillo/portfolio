import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
export default function ProjectHeader ({ title, author, date }: { title: string; author: string; date: string }){
    return(
    <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
        <div className="flex items-center text-gray-500 text-sm">
        <FontAwesomeIcon icon={faCircleUser} className="mr-2" />
        <span className="mr-4">{author}</span>
        <span className="mr-4">{date}</span>
        </div>
    </div>
    )
}
  