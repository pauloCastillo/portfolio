"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import HeaderContent from "@/admin/shared/components/HeaderContent";
import experienceService from "~/services/experience";
import type { Experience } from "@/types/general";

export default function ExperiencesPage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ company: "", role: "", description: "", start_date: "", end_date: "", url: "" });
  const service = experienceService();

  useEffect(() => {
    service.getAll().then(setItems).finally(() => setIsLoading(false));
  }, []);

  const handleCreate = async () => {
    await service.create({ ...form, published: true } as any);
    setShowForm(false);
    setForm({ company: "", role: "", description: "", start_date: "", end_date: "", url: "" });
    const data = await service.getAll();
    setItems(data);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this experience?")) return;
    await service.remove(id);
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <section>
      <HeaderContent>
        <h2 className="font-display font-bold text-2xl text-white tracking-tight">EXPERIENCES</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-primary hover:bg-cyan-400 text-void px-5 py-2 rounded-lg font-mono font-bold text-sm tracking-wide transition-all hover:cursor-pointer">
          <FontAwesomeIcon icon={faAdd} />
          <span>{showForm ? 'CANCEL' : 'ADD'}</span>
        </button>
      </HeaderContent>
      <div className="p-8">
        {showForm && (
          <div className="glass-panel rounded-xl p-6 mb-8 space-y-4">
            <input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full bg-white/5 border border-border-glass rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-primary/50" />
            <input placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full bg-white/5 border border-border-glass rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-primary/50" />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full bg-white/5 border border-border-glass rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-primary/50 min-h-[80px]" />
            <div className="grid grid-cols-2 gap-4">
              <input type="date" value={form.start_date} onChange={e => setForm({ ...form, start_date: e.target.value })} className="bg-white/5 border border-border-glass rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-primary/50" />
              <input type="date" value={form.end_date} onChange={e => setForm({ ...form, end_date: e.target.value })} className="bg-white/5 border border-border-glass rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-primary/50" />
            </div>
            <input placeholder="URL (optional)" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} className="w-full bg-white/5 border border-border-glass rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-primary/50" />
            <button onClick={handleCreate} className="bg-primary hover:bg-cyan-400 text-void px-6 py-2 rounded-lg font-mono font-bold text-sm transition-all hover:cursor-pointer">SAVE</button>
          </div>
        )}
        {isLoading ? (
          <p className="text-text-muted font-mono text-sm">Loading...</p>
        ) : items.length === 0 ? (
          <div className="text-center py-20"><p className="text-text-muted font-mono text-sm">No experiences yet.</p></div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="glass-panel rounded-xl p-5 flex items-center justify-between group hover:border-primary/30 transition-all">
                <div>
                  <h3 className="font-display font-bold text-white">{item.role}</h3>
                  <p className="text-sm text-text-muted">{item.company} · {new Date(item.start_date).getFullYear()} - {item.end_date ? new Date(item.end_date).getFullYear() : 'Present'}</p>
                </div>
                <button onClick={() => handleDelete(item.id)} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-red-400 hover:border-red-400/50 transition-all hover:cursor-pointer">
                  <FontAwesomeIcon icon={faTrash} className="text-sm" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
