"use client";

import { useState } from "react";
import HeaderContent from "@/admin/shared/components/HeaderContent";

export default function ConfigPage() {
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    site_title: "Kastidev",
    description: "Full-stack developer portfolio",
    github: "https://github.com/kastidev",
    linkedin: "https://linkedin.com/in/kastidev",
    twitter: "https://x.com/kastidev",
  });

  const handleSaveConfig = () => {
    localStorage.setItem("site_config", JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section>
      <HeaderContent>
        <h2 className="font-display font-bold text-2xl text-white tracking-tight">SYSTEM CONFIG</h2>
      </HeaderContent>

      <div className="p-8 max-w-3xl">
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
      </div>
    </section>
  );
}
