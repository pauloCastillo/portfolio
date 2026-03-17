import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/utils/utils";

type CardType = {
  card:{
    title: string;
    value: number;
    suffix?: string;
    icon?: IconDefinition;
    iconClass?: string;
    subvalue?: number;
    subvalueSuffix?: string;
  }
};

export default function BaseCard({
  card
}: Readonly<CardType>) {
  return (
    <div className="glass-panel group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-neon-cyan/30 hover:shadow-glow-cyan">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-neon-cyan/5 blur-2xl transition-all group-hover:bg-neon-cyan/10"></div>
      <div className="mb-4 flex items-start justify-between">
        <span className="font-mono text-xs font-medium uppercase tracking-wider text-slate-300">
          {card.title}
        </span>
        { card.icon !== undefined && <FontAwesomeIcon icon={card.icon} size="xl" className={cn("relative", card.iconClass)} /> }
      </div>
      <div className="flex items-end gap-2">
        <span className="text-4xl font-bold text-gradient-cyan">
          {card.value}
        </span>
        {card.suffix && (
          <span className="font-bold text-3xl text-gradient-cyan">
            {card.suffix}
          </span>
        )}
        {card.subvalue && (
          <div className="inline-flex flex-col items-start pt-0 pb-1 px-0 relative text-sm">
            <span className="flex items-center relative h-4 font-mono text-xs text-emerald-500">
              {card.subvalue} {card.subvalueSuffix}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
