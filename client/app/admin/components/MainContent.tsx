"use client";

import { faEye, faUser, faRocket } from "@fortawesome/free-solid-svg-icons";
import HeaderMainContent from "./ui/HeaderContent";
import BaseCard from "./ui/BaseCard";
import MainChart from "./ui/MainChart";

const cards = [
  {
    id: 1,
    cardTitle: "Total Views",
    statsTotal: "12.5K",
    growData: 14.5,
    icon: faEye,
  },
  {
    id: 2,
    cardTitle: "Active Leads",
    statsTotal: "8",
    icon: faUser,
  },
  {
    id: 3,
    cardTitle: "Deploy Speed",
    statsTotal: "0.4s",
    icon: faRocket,
  },
];

export default function MainContent() {
  return (
    <main className="flex-1 bg-void relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-void from-slate-900 via-void to-void opacity-50">
        <HeaderMainContent
          title="Dashboard"
          subtitle="System Telemetry // Active"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <BaseCard
            key={card.id}
            cardTitle={card.cardTitle}
            statsTotal={card.statsTotal}
            growData={card.growData}
            icon={card.icon}
          />
        ))}
      </div>
      <MainChart />
    </main>
  );
}
