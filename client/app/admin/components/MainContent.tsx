"use client";

import { faEye, faUser, faRocket } from "@fortawesome/free-solid-svg-icons";
import HeaderMainContent from "./ui/HeaderContent";
import BaseCard from "./ui/BaseCard";
import MainChart from "./ui/MainChart";

const cards = [
  {
    id: 1,
    title:"Total Views",
    value:12.5,
    suffix:"K",
    icon: faEye,
    iconClass:"text-cyan-500",
    subvalue:14.5,
    subvalueSuffix:"%",
  },
  {
    id: 2,
    title:"System Uptime",
    value:99.9,
    suffix:"%",
    icon: faEye,
    iconClass:"text-cyan-500",
  },
  {
    id: 3,
    title: "Active Leads",
    value: 8,
    suffix:"Pending",
    icon: faUser,
    iconClass:"text-emerald-500",
    subvalue: undefined,
    subvalueSuffix: undefined,
  },
  {
    id: 4,
    title: "Deploy Speed",
    value: 0.4,
    suffix:"s",
    icon: faRocket,
    iconClass:"text-orange-500",
    subvalue:12,
    subvalueSuffix:"ms",
  },
];

export default function MainContent() {
  return (
    <main className="flex-1 bg-void relative overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 bg-void from-slate-900 via-void to-void opacity-50">
        <HeaderMainContent
          title="Dashboard"
          subtitle="System Telemetry // Active"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 mb-5">
        {cards.map((card) => (
          <BaseCard
            key={card.id}
            card={card}
          />  
        ))}
      </div>
      <MainChart />
    </main>
  );
}
