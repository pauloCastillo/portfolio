import {
  faEnvelope,
  faRocket,
  faWarning,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import LogItemBase from "./LogItemBase";

const LogItems = [
  {
    title: "Client Inquiery",
    time: "2m ago",
    description: "Project 'Nebula' proposal request...",
    icon: faEnvelope,
    hoverBorderColor: "border-neon-cyan",
    bgColor: "bg-neon-cyan",
    textColor: "text-neon-cyan",
  },
  {
    title: "Deploy Success",
    time: "1h ago",
    description: "Portfolio v2.4.1 deployed to production.",
    icon: faRocket,
    hoverBorderColor: "border-neon-emerald",
    bgColor: "bg-cyan-500",
    textColor: "text-neon-emerald",
  },
  {
    title: "High Latency",
    time: "3h ago",
    description: "Region us-east-1 experiencing minor delays.",
    icon: faWarning,
    hoverBorderColor: "border-neon-amber",
    bgColor: "bg-neon-amber",
    textColor: "text-neon-amber",
  },
  {
    title: "Backup Complete",
    time: "4h ago",
    description: "Daily snapshot saved successfully. Size: 2.4GB",
    icon: faDatabase,
    hoverBorderColor: "border-neon-purple",
    bgColor: "bg-neon-purple",
    textColor: "text-neon-purple",
  },
];

export default function ActivityFeed() {
  return (
    <div className="glass-panel flex flex-col rounded-2xl p-0 lg:col-span-1 min-h-48 overflow-hidden">
      <div className="p-6 border-b border-glass">
        <h2 className="text-xl font-bold text-white">Recent Signals</h2>
        <p className="font-mono text-xs text-slate-300">SYSTEM LOGS // LIVE</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {LogItems.map((item) => (
          <LogItemBase
            key={item.title}
            title={item.title}
            time={item.time}
            description={item.description}
            icon={item.icon}
            hoverBorderColor={item.hoverBorderColor}
            bgColor={item.bgColor}
            textColor={item.textColor}
          />
        ))}
      </div>
    </div>
  );
}
