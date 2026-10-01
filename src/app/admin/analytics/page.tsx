"use client";

import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faLayerGroup,
  faMicrochip,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import HeaderContent from "../shared/components/HeaderContent";
import Progressbar from "../shared/ui/Progressbar";
import AnalyticsCard from "./components/AnalyticsCard";
import Loading from "@/loading";
import { useProjects } from "@/hooks/useProjects";
import { usePosts } from "@/hooks/usePosts";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function monthKey(dateStr: string): string | null {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  return `${date.getFullYear()}-${date.getMonth()}`;
}

export default function AnalyticsCorePage() {
  const {
    projects,
    isLoading: loadingProjects,
    error: projectsError,
  } = useProjects();
  const { posts, isLoading: loadingPosts, error: postsError } = usePosts();

  const publishedProjects = useMemo(
    () => projects.filter((project) => project.published),
    [projects]
  );
  const publishedPosts = useMemo(
    () => posts.filter((post) => post.published),
    [posts]
  );

  const publishedTotal = publishedProjects.length + publishedPosts.length;

  const composition = useMemo(() => {
    const total = Math.max(1, projects.length + posts.length);
    const pct = (count: number) => Math.round((count / total) * 100);
    return [
      {
        label: "Published Projects",
        val: pct(publishedProjects.length),
        color: "bg-indigo-500",
      },
      {
        label: "Draft Projects",
        val: pct(projects.length - publishedProjects.length),
        color: "bg-purple-500",
      },
      {
        label: "Published Stories",
        val: pct(publishedPosts.length),
        color: "bg-pink-500",
      },
    ];
  }, [projects, posts, publishedProjects, publishedPosts]);

  const techRanking = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      const techs = (project.tech_stack ?? "")
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);
      for (const tech of new Set(techs)) {
        counts.set(tech, (counts.get(tech) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [projects]);

  const velocity = useMemo(() => {
    const now = new Date();
    const buckets = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      return {
        key: `${date.getFullYear()}-${date.getMonth()}`,
        label: MONTH_LABELS[date.getMonth()],
        count: 0,
      };
    });
    for (const item of [...projects, ...posts]) {
      const key = monthKey(item.published_date);
      const bucket = buckets.find((entry) => entry.key === key);
      if (bucket) bucket.count += 1;
    }
    return buckets;
  }, [projects, posts]);

  const maxVelocity = Math.max(1, ...velocity.map((entry) => entry.count));

  if (loadingProjects || loadingPosts) return <Loading />;

  if (projectsError ?? postsError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-admin-void p-8">
        <p className="font-mono text-sm text-error">
          Failed to load analytics data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-admin-void text-slate-300 font-sans selection:bg-indigo-500/30">

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-admin-void to-admin-void relative p-4 md:p-8">

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
              <div className="text-[10px] text-indigo-400 uppercase tracking-widest font-mono mb-1">Published Items</div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                {publishedTotal}
                <FontAwesomeIcon icon={faChartLine} className="text-emerald-400 text-sm" />
              </div>
            </div>
          </div>
        </HeaderContent>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10 w-full max-w-7xl mx-auto">

          {/* Card 1: Content Composition */}
          <AnalyticsCard
            title="Content Composition"
            description="PUBLISHED VS DRAFT CONTENT"
            icon={faLayerGroup}
          >
            <div className="space-y-4 mt-8">
              {composition.map((entry) => (
                <Progressbar
                  key={entry.label}
                  label={entry.label}
                  val={entry.val}
                  color={entry.color}
                />
              ))}
              {projects.length + posts.length === 0 && (
                <p className="font-mono text-xs text-slate-400">
                  No content yet. Publish your first project or story.
                </p>
              )}
            </div>
          </AnalyticsCard>

          {/* Card 2: Tech Stack Resonance */}
          <AnalyticsCard
            title="Tech Stack Resonance"
            description="PROJECTS PER TECHNOLOGY"
            icon={faMicrochip}
          >
            <div className="flex flex-col gap-3">
              {techRanking.map(([tech, count]) => (
                <div key={tech} className="flex justify-between items-center p-3 rounded-lg border border-slate-800/50 bg-slate-900/40 hover:bg-slate-800/60 transition-colors">
                  <span className="text-sm font-medium text-slate-300">{tech}</span>
                  <span className="text-xs font-mono text-cyan-400">
                    ×{count} {count === 1 ? "project" : "projects"}
                  </span>
                </div>
              ))}
              {techRanking.length === 0 && (
                <p className="font-mono text-xs text-slate-400">
                  No tech stack data yet. Add tech stacks to your projects.
                </p>
              )}
            </div>
          </AnalyticsCard>

          {/* Card 3: Publishing Velocity */}
          <AnalyticsCard
            title="Publishing Velocity"
            description="ITEMS PUBLISHED PER MONTH"
            icon={faChartLine}
          >
            <div className="h-48 rounded-xl border border-emerald-500/10 bg-admin-void/50 flex items-end p-4 gap-2">
              {velocity.map((entry) => (
                <div key={entry.key} className="flex-1 flex flex-col justify-end items-center gap-1 group/bar relative h-full">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-slate-800 text-xs py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity font-mono text-emerald-300 point-events-none z-10">
                    {entry.count}
                  </div>
                  <div className="flex-1 w-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-emerald-900/50 to-emerald-500/60 rounded-t-sm hover:to-emerald-400 transition-all border-t border-emerald-400/50"
                      style={{ height: `${Math.max(entry.count > 0 ? 8 : 0, (entry.count / maxVelocity) * 100)}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">
                    {entry.label}
                  </span>
                </div>
              ))}
            </div>
          </AnalyticsCard>
        </div>
      </main>
    </div>
  );
}
