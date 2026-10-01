"use client";

import { useMemo } from "react";
import { faEye, faNewspaper, faRocket } from "@fortawesome/free-solid-svg-icons";
import HeaderContent from "./HeaderContent";
import MetricsCard from "../ui/MetricsCard";
import VisitorTrend from "../ui/VisitorTrend";
import ActivityFeed from "../ui/ActivityFeed";
import Loading from "@/loading";
import { useProjects } from "@/hooks/useProjects";
import { usePosts } from "@/hooks/usePosts";
import { useVisitStats } from "@/hooks/useVisitStats";

export default function MainContent() {
  const {
    projects,
    isLoading: loadingProjects,
    error: projectsError,
  } = useProjects();
  const { posts, isLoading: loadingPosts, error: postsError } = usePosts();
  const {
    stats: visits,
    isLoading: loadingVisits,
    error: visitsError,
  } = useVisitStats();

  const publishedProjects = useMemo(
    () => projects.filter((project) => project.published),
    [projects]
  );
  const publishedPosts = useMemo(
    () => posts.filter((post) => post.published),
    [posts]
  );

  if (loadingProjects || loadingPosts || loadingVisits) return <Loading />;

  if (projectsError ?? postsError ?? visitsError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-admin-void p-8">
        <p className="font-mono text-sm text-error">
          Failed to load dashboard data. Please try again later.
        </p>
      </div>
    );
  }

  const cards = [
    {
      id: 1,
      title: "Published Posts",
      value: publishedPosts.length,
      icon: faNewspaper,
      iconClass: "text-cyan-500",
    },
    {
      id: 2,
      title: "Published Projects",
      value: publishedProjects.length,
      icon: faRocket,
      iconClass: "text-orange-500",
    },
    {
      id: 3,
      title: "Unique Visitors Today",
      value: visits.today,
      icon: faEye,
      iconClass: "text-emerald-500",
      subvalue: visits.last_30d,
      subvalueSuffix: "30d",
    },
  ];

  return (
    <main className="flex-1 bg-void relative overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 bg-void from-slate-900 via-void to-void opacity-50">
        <HeaderContent>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Dashboard
            </h1>
            <p className="font-mono text-xs text-primary uppercase tracking-wider mt-1">
              System Telemetry // Active
            </p>
          </div>
          {/* Status Pill */}
          <div className="glass- panel flex items-center gap-3 rounded-full px-4 py-2 shadow-glow-emerald border-neon-emerald/20">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-emerald"></span>
            </div>

            <span className="font-mono text-xs font-bold tracking-widest text-neon-emerald">
              SYSTEM OPERATIONAL
            </span>
          </div>
        </HeaderContent>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 mb-5">
        {cards.map((card) => (
          <MetricsCard
            key={card.id}
            card={card}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 h-full min-h-80 overflow-hidden">
        <VisitorTrend series={visits.series} />
        <ActivityFeed />
      </div>
    </main>
  );
}
