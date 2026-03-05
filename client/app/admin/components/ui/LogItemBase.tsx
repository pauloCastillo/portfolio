import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LogItem = {
  icon: IconDefinition;
  title: string;
  time: string;
  description: string;
  bgColor: string;
  textColor: string;
  hoverBorderColor: string;
};

export default function LogItemBase({
  icon,
  title,
  time,
  description,
  hoverBorderColor,
  bgColor,
  textColor,
}: Readonly<LogItem>) {
  return (
    <div
      className={`group flex gap-3 rounded-lg border border-transparent bg-white/5 p-3 transition-colors hover:${hoverBorderColor}/30 hover:bg-white/10 cursor-pointer`}
    >
      <div
        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded ${bgColor}/20 ${textColor}`}
      >
        <FontAwesomeIcon icon={icon} size="xl" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-start">
          <span className="font-medium text-sm text-white">{title}</span>
          <span className="font-mono text-[10px] text-slate-500">{time}</span>
        </div>
        <p className="text-xs text-slate-400 line-clamp-1">{description}</p>
      </div>
    </div>
  );
}
