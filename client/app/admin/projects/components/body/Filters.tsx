export default function Filters(){
    return(
        <div className="flex p-1 bg-white/5 rounded-lg border border-border-glass">
            <button
                className="px-4 py-1.5 rounded-md text-sm font-mono transition-all bg-primary/20 text-primary shadow-[0_0_10px_rgba(6,182,212,0.1)] border border-primary/20">ALL
                SYSTEMS</button>
            <button
                className="px-4 py-1.5 rounded-md text-sm font-mono text-text-muted hover:text-white transition-all hover:bg-white/5">WEB
                APPS</button>
            <button
                className="px-4 py-1.5 rounded-md text-sm font-mono text-text-muted hover:text-white transition-all hover:bg-white/5">MOBILE
                UNITS</button>
            <button
                className="px-4 py-1.5 rounded-md text-sm font-mono text-text-muted hover:text-white transition-all hover:bg-white/5">IoT</button>
        </div>
    )
}