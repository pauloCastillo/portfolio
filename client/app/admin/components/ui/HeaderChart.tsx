export default function HeaderChart() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-white">Traffic Velocity</h2>
        <p className="font-mono text-xs text-slate-500">
          REQUESTS / HOUR [24H]
        </p>
      </div>
      <div className="flex gap-2">
        <button className="rounded px-3 py-1 text-xs font-bold text-void bg-neon-cyan hover:bg-neon-cyan/80 transition-colors">
          24H
        </button>
        <button className="rounded px-3 py-1 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
          7D
        </button>
        <button className="rounded px-3 py-1 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
          30D
        </button>
      </div>
    </div>
  );
}
