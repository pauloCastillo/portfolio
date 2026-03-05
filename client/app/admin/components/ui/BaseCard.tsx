import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, IconDefinition } from "@fortawesome/free-solid-svg-icons";

type CardType = {
  cardTitle: string;
  statsTotal: string;
  growData?: number;
  icon: IconDefinition;
};

export default function BaseCard({
  cardTitle,
  statsTotal,
  growData,
  icon,
}: Readonly<CardType>) {
  return (
    <div className="glass-panel group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-neon-cyan/30 hover:shadow-glow-cyan">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-neon-cyan/5 blur-2xl transition-all group-hover:bg-neon-cyan/10"></div>
      <div className="mb-4 flex items-start justify-between">
        <span className="font-mono text-xs font-medium uppercase tracking-wider text-slate-400">
          {cardTitle}
        </span>
        { icon !== undefined && <FontAwesomeIcon icon={icon} size="xl" /> }
      </div>
      <div className="flex items-end gap-2">
        <span className="text-4xl font-bold text-gradient-cyan">
          {statsTotal}
        </span>
        <span className="mb-1 font-mono text-xs text-neon-emerald">
          {growData}%
        </span>
      </div>
    </div>
  );
}
