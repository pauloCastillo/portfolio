import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Signal } from "~/types/admin";

interface ListPanelProps {
    signals: Signal[];
    activeSignal: number;
    setActiveSignal: (id: number) => void;
}

export default function ListPanel({
    signals,
    activeSignal,
    setActiveSignal
}: ListPanelProps) {
    return (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar">
            {signals.map((signal) => (
                <button
                    key={signal.id}
                    onClick={() => setActiveSignal(signal.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${activeSignal === signal.id
                        ? "bg-cyan-950/30 border-cyan-500/50 shadow-[0_0_20px_rgba(7,182,213,0.1)]"
                        : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                        } ${signal.alert ? "border-rose-500/30 hover:border-rose-500/50" : ""}`}
                >
                    {/* Active Indicator Bar */}
                    {activeSignal === signal.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_10px_rgba(7,182,213,0.8)]" />
                    )}

                    <div className="flex justify-between items-start mb-2">
                        <span className={`font-semibold text-sm ${signal.alert ? "text-rose-400" : "text-slate-200"}`}>
                            {signal.alert && <FontAwesomeIcon icon={faTriangleExclamation} className="mr-2 text-xs" />}
                            {signal.sender}
                        </span>
                        <span className="text-xs text-slate-500 font-mono tracking-tighter">{signal.time}</span>
                    </div>
                    <h3 className={`text-sm mb-1 line-clamp-1 ${signal.unread ? "font-bold text-slate-100" : "font-medium text-slate-400"}`}>
                        {signal.subject}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {signal.preview}
                    </p>

                    {signal.unread && (
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(7,182,213,0.8)]" />
                    )}
                </button>
            ))}
        </div>
    );
}