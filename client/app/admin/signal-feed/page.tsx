"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTowerBroadcast,
  faLock,
  faReply,
} from "@fortawesome/free-solid-svg-icons";

import HeaderContent from "../shared/components/HeaderContent";
import ListPanel from "./components/ListPanel";
import MessageDetail from "./components/MessageDetail";

export default function SignalFeedPage() {
  const [activeSignal, setActiveSignal] = useState(0);

  const signals = [
    {
      id: 0,
      sender: "Sarah Jenkins",
      subject: "Re: Fintech Dashboard Architecture Proposal",
      preview: "I've reviewed the proposed stack and have some...",
      time: "10:32 AM",
      unread: true,
      alert: false,
    },
    {
      id: 1,
      sender: "Marcus Chen",
      subject: "Project Inquiry: E-commerce AI",
      preview: "Looking to build a recommendation engine for our store...",
      time: "09:14 AM",
      unread: true,
      alert: false,
    },
    {
      id: 2,
      sender: "Alex Mercer",
      subject: "Contract Renewal - Q3",
      preview: "Hey Alex, just wanted to touch base regarding the maintenance...",
      time: "Yesterday",
      unread: false,
      alert: false,
    },
    {
      id: 3,
      sender: "SYSTEM // AUTO",
      subject: "[WARN] Server Load High",
      preview: "Automated report: Node US-EAST-1 exceeding 85% capacity...",
      time: "Yesterday",
      unread: false,
      alert: true,
    },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500/30 overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:flex-row md:w-1/2 h-full overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900/40 via-slate-950 to-slate-950">

        {/* Signal List Pane */}
        <section className="w-full md:w-1/3 lg:w-96 border-r border-slate-800/80 flex flex-col bg-slate-900/20 z-10">
          <HeaderContent>
            <h1 className="text-2xl font-light text-slate-100 flex items-center gap-3">
              <FontAwesomeIcon icon={faTowerBroadcast} className="text-cyan-400 text-xl" />
              Signals
            </h1>
          </HeaderContent>

          <ListPanel
            signals={signals}
            activeSignal={activeSignal}
            setActiveSignal={setActiveSignal}
          />

        </section>
        < section className="flex-1 flex flex-col h-full bg-slate-900/10 hidden md:flex w-96" >
          {activeSignal === 0 ? (
            <MessageDetail />
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 flex-col gap-4">
              <FontAwesomeIcon icon={faLock} className="text-4xl opacity-20" />
              <p className="text-sm">Transmission Decrypted. Select a comm stream.</p>
            </div>
          )}
        </section >
      </main>
    </div >
  );
}
