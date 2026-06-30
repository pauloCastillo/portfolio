"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import HeaderContent from "@/admin/shared/components/HeaderContent";
import postService from "~/services/post";
import type { Post } from "@/types/general";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const service = postService();

  useEffect(() => {
    service.getAllPosts().then(setPosts).finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    await service.deletePost(id);
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <section>
      <HeaderContent>
        <h2 className="font-display font-bold text-2xl text-white tracking-tight">BLOG</h2>
        <button className="flex items-center gap-2 bg-primary hover:bg-cyan-400 text-void px-5 py-2 rounded-lg font-mono font-bold text-sm tracking-wide transition-all hover:shadow-neon transform active:scale-95 hover:cursor-pointer">
          <FontAwesomeIcon icon={faAdd} className="text-lg font-bold" />
          <span>NEW POST</span>
        </button>
      </HeaderContent>
      <div className="p-8">
        {isLoading ? (
          <p className="text-text-muted font-mono text-sm">Loading posts...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted font-mono text-sm">No posts yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <div key={post.id} className="glass-panel rounded-xl p-5 flex items-center justify-between group hover:border-primary/30 transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-display font-bold text-white">{post.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${post.published ? 'bg-success/10 text-success' : 'bg-amber-500/10 text-amber-400'}`}>
                      {post.published ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted font-mono">
                    {new Date(post.published_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:border-primary/50 transition-all hover:cursor-pointer">
                    <FontAwesomeIcon icon={faEdit} className="text-sm" />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-red-400 hover:border-red-400/50 transition-all hover:cursor-pointer">
                    <FontAwesomeIcon icon={faTrash} className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
