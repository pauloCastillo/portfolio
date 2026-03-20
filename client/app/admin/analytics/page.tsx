"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faEarthAmericas,
  faMobileScreenButton,
  faMicrochip,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import HeaderContent from "../shared/components/HeaderContent";
import Progressbar from "../shared/ui/Progressbar";
import AnalyticsCard from "./components/AnalyticsCard";


export default function AnalyticsCorePage() {

  const randomdata = Math.floor(Math.random() * 40 + 60);

  return (
    <div className="flex min-h-screen bg-[#020815] text-slate-300 font-sans selection:bg-indigo-500/30">

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#020815] to-[#020815] relative p-4 md:p-8">

        {/* Background Grids */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

        {/* Header */}
        <HeaderContent>
          <div>
            <div className="flex items-center gap-3 text-indigo-400 text-xs font-mono font-bold tracking-widest uppercase mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              SYS.TELEMETRY
            </div>
            <h1 className="text-4xl font-light text-slate-50 flex items-center gap-4">
              ANALYTICS CORE
              <FontAwesomeIcon icon={faChevronRight} className="text-indigo-600/50 text-2xl" />
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 rounded-lg bg-indigo-950/40 border border-indigo-500/20 backdrop-blur-md">
              <div className="text-[10px] text-indigo-400 uppercase tracking-widest font-mono mb-1">Live Users</div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                1,204
                <FontAwesomeIcon icon={faChartLine} className="text-emerald-400 text-sm" />
              </div>
            </div>
          </div>
        </HeaderContent>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10 w-full max-w-7xl mx-auto">

          {/* Card 1: Global Uplink */}
          <AnalyticsCard
            title="Global Uplink"
            description="REAL-TIME VISITOR GEOLOCATION"
            icon={faEarthAmericas}
          >
            {/* Mocked World Map Area */}
            <div className="h-64 rounded-xl border border-indigo-500/10 bg-[#020815]/50 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[#050D20] opacity-80" />
              <svg viewBox="0 0 1000 500" className="w-full h-full absolute inset-0 opacity-20">
                {/* Simplified map dots overlay... */}
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" className="fill-indigo-500" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
              </svg>
              {/* Highlight Nodes */}
              <div className="absolute top-[30%] left-[20%] w-4 h-4 rounded-full bg-indigo-400 shadow-[0_0_20px_rgba(99,102,241,1)] animate-pulse"></div>
              <div className="absolute top-[40%] left-[45%] w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,1)] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-[50%] right-[30%] w-5 h-5 rounded-full bg-indigo-400 shadow-[0_0_25px_rgba(99,102,241,1)] animate-pulse" style={{ animationDelay: '1s' }}></div>

              <span className="font-mono text-xs text-indigo-400/50 absolute bottom-4 right-4 z-10">[ MAP_RENDER_DATA_STUB ]</span>
            </div>
          </AnalyticsCard>

          {/* Card 2: Device Composition */}
          <AnalyticsCard
            title="Device Composition"
            description="PLATFORM DISTRIBUTION"
            icon={faMobileScreenButton}
          >
            <div className="space-y-4 mt-8">
              <Progressbar label="Desktop Nodes" val={68} color="bg-indigo-500" />
              <Progressbar label="Mobile Terminals" val={24} color="bg-purple-500" />
              <Progressbar label="Tablet Vectors" val={8} color="bg-pink-500" />
            </div>
          </AnalyticsCard>

          {/* Card 3: Tech Stack Resonance */}
          <AnalyticsCard
            title="Tech Stack Resonance"
            description="PROJECT ENGAGEMENT BY TECH"
            icon={faMicrochip}
          >
            <div className="flex flex-col gap-3">
              {['React / Next.js', 'TypeScript core', 'Tailwind Matrix', 'Node.js Backend'].map((tech, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-slate-800/50 bg-slate-900/40 hover:bg-slate-800/60 transition-colors">
                  <span className="text-sm font-medium text-slate-300">{tech}</span>
                  <span className="text-xs font-mono text-cyan-400">+{randomdata}%</span>
                </div>
              ))}
            </div>
          </AnalyticsCard>

          {/* Card 4: Traffic Velocity */}
          <AnalyticsCard
            title="Traffic Velocity"
            description="RETENTION & ACQUISITION STREAM"
            icon={faChartLine}
          >
            <div className="h-48 rounded-xl border border-emerald-500/10 bg-[#020815]/50 flex items-end p-4 gap-2">
              {/* Mock Bar Chart */}
              {[40, 60, 45, 80, 55, 90, 75, 100, 65, 85, 70, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end group/bar relative">
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity font-mono text-emerald-300 point-events-none">
                    {h}K
                  </div>
                  {/* Bar itself */}
                  <div
                    className="w-full bg-gradient-to-t from-emerald-900/50 to-emerald-500/60 rounded-t-sm hover:to-emerald-400 transition-all border-t border-emerald-400/50"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
          </AnalyticsCard>
        </div>
      </main>
    </div>
  );
}
