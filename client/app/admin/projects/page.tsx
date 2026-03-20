import ProjectsContent from "./components/body/Content";
import Searchbar from "./components/header/Searchbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import HeaderContent from "@/admin/shared/components/HeaderContent";

export default function ProjectsPage() {
    return (
        <section>
            <HeaderContent>
                <>
                    <h2 className="font-display font-bold text-2xl text-white tracking-tight">
                        PROJECTS
                    </h2>
                    <div className="flex items-center justify-center gap-6">
                        {/* <!-- Search Terminal --> */}
                        <Searchbar />
                        {/* <!-- Create Button --> */}
                        <button
                            className="flex items-center gap-2 bg-primary hover:bg-cyan-400 text-void px-5 py-2 rounded-lg font-mono font-bold text-sm tracking-wide transition-all hover:shadow-neon transform active:scale-95 hover:cursor-pointer">
                            <FontAwesomeIcon icon={faAdd} className="text-lg font-bold" />
                            <span>INITIALIZE PROJECT</span>
                        </button>
                    </div>
                </>
            </HeaderContent>
            <ProjectsContent />
        </section>
    )
}