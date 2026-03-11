import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import StackChips from "./chips";

export default function Metadata(){
    const techs = ["React.js", "TypeScript", "Tailwind"];

    return(
        <section className="space-y-6 animate-fade-in-up">
                    <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-widest opacity-70">
                        <FontAwesomeIcon icon={faTerminal} className="text-sm" />
                        <span>| PROJECT_METADATA</span>
                    </div>
                    <div className="space-y-4">
                        <input
                            className="w-full bg-transparent border-none text-5xl lg:text-6xl font-display font-bold text-white placeholder-gray-700 focus:ring-0 focus:outline-none focus:placeholder-gray-800 transition-all p-0 tracking-tight"
                            placeholder="PROJECT CODENAME" 
                            type="text" 
                            defaultValue="Velocimeter X"
                        />
                        <textarea
                            className="w-full bg-transparent border-0 border-l-2 border-gray-800 focus:border-primary text-gray-400 text-lg focus:ring-0 resize-none py-2 px-4 transition-colors font-body leading-relaxed"
                            placeholder="Brief mission abstract..."
                            rows={2}
                            defaultValue={"High-performance telemetry dashboard for autonomous vehicle fleets, processing millions of data points in real-time."}
                        ></textarea>
                    </div>
                    {/* <!-- Tech Stack Selector --> */}
                    <div className="space-y-3">
                        <label className="block text-xs font-mono text-gray-500 uppercase tracking-wider">Tech Stack
                            Modules</label>
                        <div className="relative group">
                            <div
                                className="glass-panel rounded-lg p-2 min-h-10 flex flex-wrap gap-2 items-center cursor-text border transition-colors hover:border-primary/50 focus-within:border-primary focus-within:shadow-neon-sm">
                                {/* <!-- Chips --> */}
                                {techs.map((tech => (
                                    <StackChips key={tech} title={tech} />
                                )))}

                                <input
                                    className="bg-transparent border-none focus:ring-0 text-sm font-mono text-white min-w-32"
                                    placeholder="Add module..." 
                                    type="text"
                                />
                            </div>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
                                <FontAwesomeIcon icon={faCaretDown} className="text-sm" />
                            </div>
                        </div>
                    </div>
                </section>
    )
}