"use client";

import { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faEye } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import HeaderContent from "@/admin/shared/components/HeaderContent";
import postService from "~/services/post";
import type { Post } from "@/types/general";
import { useRouter } from "next/navigation";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const service = useMemo(() => postService(), []);
  const router = useRouter();

  useEffect(() => {
    service.getAllPosts().then(setPosts).finally(() => setIsLoading(false));
  }, [service]);

  const publishedCount = useMemo(
    () => posts.filter((post) => post.published).length,
    [posts]
  );
  const draftCount = posts.length - publishedCount;

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    await service.deletePost(id);
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <section>
      <HeaderContent>
        <h2 className="font-display font-bold text-2xl text-white tracking-tight">BLOG</h2>
        <button
          onClick={() => router.push("/admin/blog/edit")}
          className="flex items-center gap-2 border-2 text-white border-cyan-500 hover:bg-cyan-400 px-5 py-2 rounded-lg font-mono font-bold text-sm tracking-wide transition-all hover:shadow-neon transform active:scale-95 hover:cursor-pointer"
        >
          <FontAwesomeIcon icon={faAdd} className="text-lg font-bold" />
          <span>NEW POST</span>
        </button>
      </HeaderContent>
      <div className="flex-1 overflow-y-auto p-8 relative">
        <div className="flex items-center gap-4 mb-6 font-mono text-xs tracking-wider">
          <span className="text-success">{publishedCount} PUBLISHED</span>
          <span className="text-text-muted">|</span>
          <span className="text-amber-400">{draftCount} DRAFT</span>
        </div>
        {isLoading ? (
          <p className="text-text-muted font-mono text-sm">Loading posts...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted font-mono text-sm">No posts yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-12">
            {posts.map(post => (
              <div
                key={post.id}
                className="glass-panel rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 relative flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-void">
                  {post.image_file ? (
                    <Image
                      src={post.image_file}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                      width={400}
                      height={300}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-void/50">
                      <span className="font-display font-bold text-4xl text-white/10">
                        {post.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 from-void via-transparent to-transparent opacity-90"></div>
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button
                      className="w-10 h-10 rounded-full bg-void/80 border border-primary/50 text-primary flex items-center justify-center hover:bg-primary hover:text-void transition-all hover:scale-110 hover:cursor-pointer"
                      title="Edit Post"
                      onClick={() => router.push(`/admin/blog/edit?id=${post.id}`)}
                    >
                      <FontAwesomeIcon icon={faEdit} className="text-lg font-bold" />
                    </button>
                    <button
                      className="w-10 h-10 rounded-full bg-void/80 border border-primary/50 text-primary flex items-center justify-center hover:bg-primary hover:text-void transition-all hover:scale-110 hover:cursor-pointer"
                      title="View Live"
                      onClick={() => router.push(`/blog/${post.id}`)}
                    >
                      <FontAwesomeIcon icon={faEye} className="text-lg font-bold" />
                    </button>
                    <button
                      className="w-10 h-10 rounded-full bg-void/80 border border-red-400/50 text-red-400 flex items-center justify-center hover:bg-red-400 hover:text-void transition-all hover:scale-110 hover:cursor-pointer"
                      title="Delete Post"
                      onClick={() => handleDelete(post.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-lg font-bold" />
                    </button>
                  </div>
                  <div className={`absolute top-3 right-3 px-2 py-1 bg-void/90 backdrop-blur rounded border flex items-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.2)] ${post.published ? 'border-success/30' : 'border-amber-500/30'}`}>
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${post.published ? 'bg-success' : 'bg-amber-400'} opacity-75`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${post.published ? 'bg-success' : 'bg-amber-500'}`}></span>
                    </span>
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase" style={{ color: post.published ? '#10b981' : '#f59e0b' }}>
                      {post.published ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors mb-2 hover:cursor-pointer"
                    onClick={() => router.push(`/admin/blog/edit?id=${post.id}`)}
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs text-text-muted font-mono mt-auto" suppressHydrationWarning>
                    {new Date(post.published_date).toLocaleDateString("es-BO", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </div>
            ))}
            <div
              onClick={() => router.push("/admin/blog/edit")}
                className="glass-panel border-dashed border-2 border-primary/40 rounded-xl overflow-hidden group hover:border-primary hover:shadow-neon transition-all duration-300 flex flex-col items-center justify-center min-h-80 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <FontAwesomeIcon icon={faAdd} className="text-3xl text-text-muted group-hover:text-primary transition-colors" />
              </div>
              <p className="font-display font-bold text-lg text-white mb-1">New Post</p>
              <p className="font-mono text-xs text-text-muted uppercase tracking-wider">Write & Publish</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
