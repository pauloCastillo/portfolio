"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import HeaderContent from "@/admin/shared/components/HeaderContent";
import skillService from "~/services/skill";
import type { Skill } from "@/types/general";

export default function SkillsPage() {
  const [items, setItems] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", level: 50 });
  const service = skillService();

  useEffect(() => {
    service.getAll().then(setItems).finally(() => setIsLoading(false));
  }, []);

  const handleCreate = async () => {
    await service.create(form);
    setShowForm(false);
    setForm({ name: "", level: 50 });
    const data = await service.getAll();
    setItems(data);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this skill?")) return;
    await service.remove(id);
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <section>
      <HeaderContent>
        <h2 className="font-display font-bold text-2xl text-white tracking-tight">SKILLS</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-primary hover:bg-cyan-400 text-void px-5 py-2 rounded-lg font-mono font-bold text-sm tracking-wide transition-all hover:cursor-pointer">
          <FontAwesomeIcon icon={faAdd} />
          <span>{showForm ? 'CANCEL' : 'ADD'}</span>
        </button>
      </HeaderContent>
      <div className="p-8">
        {showForm && (
          <div className="glass-panel rounded-xl p-6 mb-8 space-y-4">
            <input placeholder="Skill name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-white/5 border border-border-glass rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-primary/50" />
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-text-muted">Level: {form.level}%</span>
              <input type="range" min={1} max={100} value={form.level} onChange={e => setForm({ ...form, level: Number(e.target.value) })} className="flex-1" />
            </div>
            <button onClick={handleCreate} className="bg-primary hover:bg-cyan-400 text-void px-6 py-2 rounded-lg font-mono font-bold text-sm transition-all hover:cursor-pointer">SAVE</button>
          </div>
        )}
        {isLoading ? (
          <p className="text-text-muted font-mono text-sm">Loading...</p>
        ) : items.length === 0 ? (
          <div className="text-center py-20"><p className="text-text-muted font-mono text-sm">No skills yet.</p></div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="glass-panel rounded-xl p-5 flex items-center justify-between group hover:border-primary/30 transition-all">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-white">{item.name}</h3>
                    <span className="text-xs font-mono text-text-muted">{item.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${item.level}%` }}></div>
                  </div>
                </div>
                <button onClick={() => handleDelete(item.id)} className="ml-4 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-red-400 hover:border-red-400/50 transition-all hover:cursor-pointer">
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
