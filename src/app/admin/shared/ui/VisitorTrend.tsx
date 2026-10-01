import type { VisitDayPoint } from "~/services/visit";

type VisitorTrendProps = {
  series: VisitDayPoint[];
};

function shortLabel(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return dateStr;
  return `${date.getUTCDate()}/${date.getUTCMonth() + 1}`;
}

/**
 * Tendencia diaria de usuarios únicos (últimos 30 días).
 * Reutiliza el lenguaje visual de Publishing Velocity en analytics:
 * barras verticales con gradiente esmeralda + tooltip de conteo.
 */
export default function VisitorTrend({ series }: Readonly<VisitorTrendProps>) {
  const max = Math.max(1, ...series.map((point) => point.uniques));
  const hasData = series.some((point) => point.uniques > 0);

  return (
    <div className="glass-panel relative flex flex-col rounded-2xl p-6 lg:col-span-2 min-h-56">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">Unique Visitors</h2>
        <p className="font-mono text-xs text-slate-300">DAILY UNIQUES // LAST 30 DAYS</p>
      </div>
      {!hasData ? (
        <p className="font-mono text-xs text-slate-400 py-8 text-center">
          No visits recorded yet. Share your site to see traffic here.
        </p>
      ) : (
        <div className="h-48 rounded-xl border border-emerald-500/10 bg-admin-void/50 flex items-end p-4 gap-1">
          {series.map((point, index) => (
            <div
              key={point.date}
              data-testid={`trend-bar-${point.date}`}
              className="flex-1 flex flex-col justify-end items-center gap-1 group/bar relative h-full"
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-slate-800 text-xs py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity font-mono text-emerald-300 point-events-none z-10">
                {point.uniques}
              </div>
              <div className="flex-1 w-full flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-emerald-900/50 to-emerald-500/60 rounded-t-sm hover:to-emerald-400 transition-all border-t border-emerald-400/50"
                  style={{
                    height: `${Math.max(point.uniques > 0 ? 8 : 0, (point.uniques / max) * 100)}%`,
                  }}
                />
              </div>
              {(index % 5 === 4 || index === series.length - 1) && (
                <span className="font-mono text-[10px] text-slate-400">
                  {shortLabel(point.date)}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
