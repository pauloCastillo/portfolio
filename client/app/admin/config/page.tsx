"use client";

import { useState } from "react";
import HeaderContent from "@/admin/shared/components/HeaderContent";
import postService from "~/services/post";

export default function ConfigPage() {
  const [tab, setTab] = useState<"config" | "composer">("config");
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    site_title: "Kastidev",
    description: "Full-stack developer portfolio",
    github: "https://github.com/kastidev",
    linkedin: "https://linkedin.com/in/kastidev",
    twitter: "https://x.com/kastidev",
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState({ linkedin: false, twitter: false });
  const [publishing, setPublishing] = useState(false);

  const handleSaveConfig = () => {
    localStorage.setItem("site_config", JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) return;
    setPublishing(true);
    try {
      await postService().createPost({ title, content, published: true } as any);
      if (platforms.linkedin) {
        window.open(`https://linkedin.com/share?text=${encodeURIComponent(title + "\n\n" + content)}`, "_blank");
      }
      if (platforms.twitter) {
        window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(title + "\n\n" + content)}`, "_blank");
      }
      setTitle("");
      setContent("");
    } catch {
      alert("Error publishing post");
    } finally {
      setPublishing(false);
    }
  };

  const SocialToggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="accent-primary w-4 h-4" />
      <span className="text-sm font-mono text-text-muted group-hover:text-white transition-colors">{label}</span>
    </label>
  );

  return (
    <section>
      <HeaderContent>
        <h2 className="font-display font-bold text-2xl text-white tracking-tight">SYSTEM CONFIG</h2>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
          <button onClick={() => setTab("config")} className={`px-4 py-1.5 rounded-md text-sm font-mono transition-all cursor-pointer ${tab === "config" ? "bg-primary text-void font-bold" : "text-text-muted hover:text-white"}`}>Config</button>
          <button onClick={() => setTab("composer")} className={`px-4 py-1.5 rounded-md text-sm font-mono transition-all cursor-pointer ${tab === "composer" ? "bg-primary text-void font-bold" : "text-text-muted hover:text-white"}`}>Composer</button>
        </div>
      </HeaderContent>

      <div className="p-8 max-w-3xl">
        {tab === "config" ? (
          <div className="glass-panel rounded-xl p-6 space-y-5">
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Site Title</label>
              <input value={form.site_title} onChange={e => setForm({ ...form, site_title: e.target.value })} className="w-full bg-white/5 border border-border-glass rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-white/5 border border-border-glass rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-all min-h-[80px]" />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">GitHub URL</label>
              <input value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} className="w-full bg-white/5 border border-border-glass rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">LinkedIn URL</label>
              <input value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} className="w-full bg-white/5 border border-border-glass rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Twitter URL</label>
              <input value={form.twitter} onChange={e => setForm({ ...form, twitter: e.target.value })} className="w-full bg-white/5 border border-border-glass rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <button onClick={handleSaveConfig} className="bg-primary hover:bg-cyan-400 text-void px-6 py-2.5 rounded-lg font-mono font-bold text-sm transition-all hover:cursor-pointer">
              {saved ? 'SAVED ✓' : 'SAVE CONFIG'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-xs font-mono text-text-muted">Write a blog post and publish it across your social channels.</p>
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Post Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title..." className="w-full bg-white/5 border border-border-glass rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Content (Markdown)</label>
              <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write your post in markdown..." className="w-full bg-white/5 border border-border-glass rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-primary/50 transition-all min-h-[300px] resize-y" />
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Publish to:</span>
              <SocialToggle label="LinkedIn" checked={platforms.linkedin} onChange={v => setPlatforms({ ...platforms, linkedin: v })} />
              <SocialToggle label="X / Twitter" checked={platforms.twitter} onChange={v => setPlatforms({ ...platforms, twitter: v })} />
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handlePublish} disabled={publishing || !title.trim() || !content.trim()} className="bg-primary hover:bg-cyan-400 text-void px-6 py-2.5 rounded-lg font-mono font-bold text-sm transition-all hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">
                {publishing ? "PUBLISHING..." : "PUBLISH POST"}
              </button>
              <button onClick={() => { setTitle(""); setContent(""); }} className="px-4 py-2.5 rounded-lg text-sm font-mono text-text-muted hover:text-white transition-all cursor-pointer">
                Clear
              </button>
            </div>
            {content && (
              <div className="glass-panel rounded-xl p-6">
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">Preview</p>
                <div className="prose prose-invert max-w-none text-muted whitespace-pre-wrap text-sm">{content}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
