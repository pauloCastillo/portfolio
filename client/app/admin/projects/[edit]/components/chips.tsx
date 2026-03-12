import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

type Props = {
    title: string
}


export default function StackChips({ title }: Readonly<Props>){
    return(
        <div 
            className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded text-primary text-sm font-mono group/chip hover:bg-primary/20 transition-colors cursor-default"
        >
            <span>{title}</span>
            <button className="hover:text-white">
                <FontAwesomeIcon icon={faClose} className="text-sm" />
            </button>
        </div>
    )
}