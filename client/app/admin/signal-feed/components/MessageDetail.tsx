import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faReply } from "@fortawesome/free-solid-svg-icons";

export default function MessageDetail() {
    return (
        <>
            <div className="px-8 py-6 border-b border-slate-800 bg-slate-900/30 backdrop-blur-md flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 text-cyan-500 text-xs font-mono font-bold tracking-widest uppercase mb-3">
                        <FontAwesomeIcon icon={faLock} />
                        <span>Incoming Transmission // Secure Line</span>
                    </div>
                    <h2 className="text-3xl font-light text-slate-50 mb-1">Sarah Jenkins</h2>
                    <div className="text-slate-400 text-sm">Subject: Re: Fintech Dashboard Architecture Proposal</div>
                </div>
                <div className="flex gap-3">
                    <button className="h-10 px-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2 font-medium text-sm">
                        <FontAwesomeIcon icon={faReply} />
                        Reply
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

                <div className="max-w-3xl leading-relaxed text-slate-300 space-y-6 text-sm relative z-10">
                    <p>Alex,</p>

                    <p>
                        I've had my team run a diagnostic on the proposed stack for the new dashboard. We are impressed with the Next.js 14 implementation plan, specifically the server actions approach.
                    </p>

                    <p>
                        However, we have a constraint regarding the WebSocket throughput. Our legacy systems emit approximately <strong className="text-slate-100 font-semibold bg-slate-800/60 px-2 py-0.5 rounded">50,000 events/sec</strong> during peak trading hours. Can you confirm if the proposed edge infrastructure can handle this load without significant latency?
                    </p>

                    <div className="my-8 rounded-xl bg-slate-950/80 border border-slate-800/80 p-6 shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-rose-500 opacity-80" />
                        <pre className="font-mono text-sm">
                            <code className="text-slate-300 block">
                                <span className="text-slate-500">{"{"}</span>
                                <span className="text-cyan-300">"peak_load"</span><span className="text-slate-500">:</span> <span className="text-amber-400">"52,401 req/s"</span>,
                                <span className="text-cyan-300">"avg_latency"</span><span className="text-slate-500">:</span> <span className="text-emerald-400">"145ms"</span>,
                                <span className="text-cyan-300">"status"</span><span className="text-slate-500">:</span> <span className="text-rose-400 font-bold">"WARNING"</span>
                                <span className="text-slate-500">{"}"}</span>
                            </code>
                        </pre>
                    </div>

                    <p>
                        Let's schedule a deep dive session next Tuesday to discuss the scaling strategy.
                    </p>

                    <p className="pt-4">
                        Best,<br />
                        <span className="font-semibold text-slate-100">Sarah</span>
                    </p>
                </div>
            </div>
        </>
    );
}