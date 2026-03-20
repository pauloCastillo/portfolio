import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { ChildrenType } from "~/types/general";

type AnalyticsCardProps = ChildrenType & {
    title: string;
    description: string;
    icon: IconDefinition;
}

export default function AnalyticsCard({
    title,
    description,
    icon,
    children
}: AnalyticsCardProps) {
    return (
        <div className="xl:col-span-2 bg-[#0A1128]/60 backdrop-blur-xl border border-indigo-500/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FontAwesomeIcon icon={icon} className="text-8xl text-indigo-400" />
            </div>
            <div className="flex items-center gap-3 mb-6 relative">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                    <FontAwesomeIcon icon={icon} />
                </div>
                <div>
                    <h3 className="text-slate-100 font-semibold text-lg">{title}</h3>
                    <p className="text-xs text-indigo-300 font-mono tracking-wider">{description}</p>
                </div>
            </div>
            {children}
        </div>
    )
}