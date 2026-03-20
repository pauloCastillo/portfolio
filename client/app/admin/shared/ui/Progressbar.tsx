export default function Progressbar({ label, val, color }: { label: string, val: number, color: string }) {
    return (
        <div className="w-full">
            <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-300">{label}</span>
                <span className="font-mono text-slate-400">{val}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#020815] border border-slate-800/80 overflow-hidden flex">
                <div className={`h-full ${color} rounded-full`} style={{ width: `${val}%` }} />
            </div>
        </div>
    );
}