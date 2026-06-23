export default function Badge(){
    return(
        <div className="absolute top-3 right-3 px-2 py-1 bg-void/90 backdrop-blur rounded border border-success/30 flex items-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <span className="relative flex h-2 w-2">
                <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-success tracking-wider">LIVE</span>
        </div>
    )
}