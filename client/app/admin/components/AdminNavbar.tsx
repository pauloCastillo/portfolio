
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDashboard, faLayerGroup, faComment, faEdit, faChartBar, faGear } from "@fortawesome/free-solid-svg-icons"

export default function AdminNavbar(){
    return(
        <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
            {/* Category Label */}
            <div className="px-3 py-2 mt-2 mb-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted/60">Main Terminal</span>
            </div>
            {/* Active Item: Mission Control */}
                
            <a 
                className="relative flex items-center gap-3 px-3 py-3 rounded-r-lg group bg-primary/10 text-white transition-all duration-200" href="#"
            >
            
            {/* Active Indicator Strip */}
            
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-primary shadow-glow rounded-r-sm"></div>
                <FontAwesomeIcon 
                    icon={faDashboard}
                    className="text-primary group-hover:scale-110 transition-transform duration-200"
                    style={{fontSize: "20px"}}
                />
            <span className="text-sm font-medium tracking-wide">Mission Control</span>
            </a>
            
            {/* Inactive Item: Project Nexus */}

            <a 
                className="relative flex items-center gap-3 px-3 py-3 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-all duration-200 group border border-transparent hover:border-white/5" href="#"
            >
                <FontAwesomeIcon
                    icon={faLayerGroup}
                    className="text-text-muted group-hover:text-primary transition-colors duration-200"
                    style={{fontSize: "20px"}}
                />

                <span className="text-sm font-medium tracking-wide">Project Nexus</span>
            </a>
            {/* Inactive Item: Signal Feed */}
            
            <div className="relative">
                <a 
                    className="relative flex items-center justify-between px-3 py-3 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-all duration-200 group border border-transparent hover:border-white/5" href="#"
                >
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon
                            icon={faComment}
                            className="text-text-muted group-hover:text-primary transition-colors duration-200"
                            style={{fontSize: "20px"}}
                        />
                        <span className="text-sm font-medium tracking-wide">Signal Feed</span>
                    </div>
                    
                    {/* Notification Badge */}
                    
                    <span 
                        className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-mono font-bold border border-primary/30"
                    >
                        3
                    </span>
                </a>
            </div>
            
            {/* Inactive Item: Knowledge Base */}
            
            <a 
                className="relative flex items-center gap-3 px-3 py-3 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-all duration-200 group border border-transparent hover:border-white/5" href="#"
            >
                <FontAwesomeIcon
                    icon={faEdit}
                    className="text-text-muted group-hover:text-primary transition-colors duration-200"
                    style={{fontSize: "20px"}}
                />
                <span className="text-sm font-medium tracking-wide">Knowledge Base</span>
            </a>
            
            {/*  Divider */}
            
            <div className="my-2 h-0.5 bg-border-glass mx-3"></div>
            
            <div className="px-3 py-2 mb-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted/60">System</span>
            </div>
            
            {/* Inactive Item: Analytics Core */}
            
            <a 
                className="relative flex items-center gap-3 px-3 py-3 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-all duration-200 group border border-transparent hover:border-white/5" href="#"
            >
                <FontAwesomeIcon
                    icon={faChartBar}
                    className="text-text-muted group-hover:text-primary transition-colors duration-200"
                    style={{fontSize: "20px"}}
                />  
                <span className="text-sm font-medium tracking-wide">Analytics Core</span>
            </a>
            
            {/* Inactive Item: System Config */}
            
            <a 
                className="relative flex items-center gap-3 px-3 py-3 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-all duration-200 group border border-transparent hover:border-white/5" href="#"
            >
                <FontAwesomeIcon
                    icon={faGear}
                    className="text-text-muted group-hover:text-primary transition-colors duration-200"
                    style={{fontSize: "20px"}}
                />
                <span className="text-sm font-medium tracking-wide">System Config</span>
            </a>
        </nav>
    )
}