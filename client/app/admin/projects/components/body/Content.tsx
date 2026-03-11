import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import BodyNavbar from "./BodyNavbar";
import Card from "./ProjectCard";
import Badge from "../ui/Badges";

export default function ProjectsContent(){
    const projects = [
        {
            imageUrl:"https://lh3.googleusercontent.com/aida-public/AB6AXuCuS7EhgxQOqONzOIHp0AeHIZ3k_uAWN6Wo72zfX1JEo_G78rg_sxvlFbeLZ53aQTPqIdJTx8T8yLi842MupZgsV3cmIUZD7QrmQCAaLOD3E27HTuX1WPVuMgfYcV1e_8Wchiz0mQFk7ApB1Kk-YDX9Ypula3sc56BDhJix6JAGg7Vw1pha-0IEi7a5w3cRHgJq4tmcLbrpkU0hc8D8iDbsmK1nXYRHAZKeT9fCKumMLCSl-yexp62s4pvd4gH2rq8kuFz9FZmQ_-5H",
            title: "Orbital Finance",
            description:"High-frequency trading dashboard with real-time WebSocket data streams and WebGL charting modules.",
            stack:["React", "Node.js", "D3.js"]
        },
        {
            imageUrl:"https://lh3.googleusercontent.com/aida-public/AB6AXuBP4vWT-x-eO890Vv7QmxEDaRVazutwT_ixvovaIK36ljk36NXQgzeVEx8k-iRo2Ot53zjnQ-9I8SsujhvZ_9LR7576pKF-rzPHn1Cz2g8QZO1sZBtR5ZBbFlWLS55ir9NENzzfXENAbMgOD9G8oMuMgDnGl5OrrXbzflTSbbJu_xKaki_1iO272TlEpgm533scSKFA7OoX4ezRrV1NtLNZCraCp3X_IEIIwMNbCCiAa9J15GtM4NtJ_yT9d35kEWTnC1gVMdMYR82_",
            title: "Aether UI",
            description:"roprietary component library and design system documentation.",
            stack:["Storybook", "Tailwind"]
        }
    ]
    return(
      <div className="flex-1 overflow-y-auto p-8 relative">
            <BodyNavbar />
            {/* <!-- Grid --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-12">
                <Card projects={projects} />
                {/* <!-- Empty State Placeholder (Visual interest only, not functional empty state) --> */}
                <div
                    className="glass-panel border-dashed border-2 border-border-glass rounded-xl overflow-hidden group hover:border-primary/30 transition-all duration-300 flex flex-col items-center justify-center min-h-[350px] cursor-pointer">
                    <div
                        className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                            <FontAwesomeIcon icon={faAdd} className="text-3xl text-text-muted group-hover:text-primary transition-colors" />
                    </div>
                    <p className="font-display font-bold text-lg text-white mb-1">New Artifact</p>
                    <p className="font-mono text-xs text-text-muted uppercase tracking-wider">Deploy to Grid</p>
                </div>
            </div>
            {/* <!-- Bottom Fade for smooth scroll ending --> */}
            <div
                className="absolute bottom-0 left-0 w-full h-12 from-void to-transparent pointer-events-none">
            </div>
        </div>
    )
}