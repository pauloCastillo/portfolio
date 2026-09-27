import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchAdmin(){
    return(
        <div className="p-4 border-b border-white/5">
            <div className="relative group">
                <FontAwesomeIcon
                    icon={faSearch}
                    className="absolute left-3 top-2.5 text-text-muted text-lg group-focus-within:text-primary transition-colors" />
                <input
                    className="w-full bg-void/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono"
                    placeholder="Decrypt signal source..." type="text" />
            </div>
        </div>
    )
}