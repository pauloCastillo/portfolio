import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export default function Searchbar(){
    return(
        <div className="relative group">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-2.5 text-text-muted text-lg group-focus-within:text-primary transition-colors" />
            <input
                className="min-w-80 bg-white/5 border border-border-glass rounded-lg py-2 pl-10 pr-4 text-sm font-mono text-white placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                placeholder="Search Artifacts..." 
                type="text"
            />
        </div>
    )
}