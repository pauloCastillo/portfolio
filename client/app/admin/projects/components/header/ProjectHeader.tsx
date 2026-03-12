import Searchbar from "./Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export default function ProjectsHeader(){
    return(
        <header
            className="h-20 min-w-full px-8 flex items-center justify-between border-b border-border-glass bg-void/80 backdrop-blur-md sticky top-0 z-30">
            <h2 className="font-display font-bold text-2xl text-white tracking-tight">
                PROJECTS 
            </h2>
            <div className="flex items-center justify-center gap-6">
                {/* <!-- Search Terminal --> */}
                <Searchbar/>
                {/* <!-- Create Button --> */}
                <button
                    className="flex items-center gap-2 bg-primary hover:bg-cyan-400 text-void px-5 py-2 rounded-lg font-mono font-bold text-sm tracking-wide transition-all hover:shadow-neon transform active:scale-95 hover:cursor-pointer">
                    <FontAwesomeIcon icon={faAdd} className="text-lg font-bold" />
                    <span>INITIALIZE PROJECT</span>
                </button>
            </div>
        </header>
    )
}