export default function ChartArea() {
  return (
    <div className="relative flex-1 w-full rounded-lg overflow-hidden border border-glass-border/30 bg-void/50">
      {/* <!-- Grid Lines --> */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-20 pointer-events-none">
        <div className="w-full border-t border-dashed border-slate-500"></div>
        <div className="w-full border-t border-dashed border-slate-500"></div>
        <div className="w-full border-t border-dashed border-slate-500"></div>
        <div className="w-full border-t border-dashed border-slate-500"></div>
        <div className="w-full border-t border-dashed border-slate-500"></div>
      </div>

      {/* <!-- Chart Visualization (CSS Shapes) --> */}
      <div className="absolute bottom-0 left-0 right-0 top-10 flex items-end px-4 pb-0">
        <svg
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5"></stop>
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          {/* <!-- Area Path --> */}
          <path
            d="M0,80 Q10,75 20,60 T40,50 T60,30 T80,45 T100,20 V100 H0 Z"
            fill="url(#chartGradient)"
          ></path>
          {/* <!-- Line Path --> */}
          <path
            className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            d="M0,80 Q10,75 20,60 T40,50 T60,30 T80,45 T100,20"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          ></path>
        </svg>
      </div>
      {/* <!-- Hover Crosshair Mockup (Static for visual) --> */}
      <div className="absolute left-[60%] top-0 bottom-0 w-1 bg-neon-cyan/50 pointer-events-none">
        <div className="absolute top-[30%] -left-1.5 h-3 w-3 rounded-full border-2 border-neon-cyan bg-void shadow-glow-cyan"></div>
        {/* <!-- Tooltip --> */}
        <div className="absolute top-[20%] left-4 bg-void/90 border border-neon-cyan/30 rounded p-2 shadow-xl backdrop-blur-md">
          <p className="font-mono text-[10px] text-slate-400">14:30 PM</p>
          <p className="font-bold text-white">432 Req/s</p>
        </div>
      </div>
    </div>
  );
}
