export default function ProjectStatus(){
    return(
        <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full border border-border-glass bg-white/5">
                <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                3 LIVE
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full border border-border-glass bg-white/5">
                <span className="w-2 h-2 rounded-full bg-warning shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                1 DEV
            </span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full border border-border-glass bg-white/5">
                <span className="w-2 h-2 rounded-full bg-text-muted opacity-50"></span>
                1 ARCHIVED
            </span>
        </div>
    )
}