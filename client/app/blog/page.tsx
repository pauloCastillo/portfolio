"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import postService from "~/services/post";
import type { Post } from "@/types/general";

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const service = postService();

  useEffect(() => {
    service.getPublishedPosts().then(setPosts).finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="font-display text-4xl font-bold text-white mb-2">Blog</h1>
      <p className="text-muted font-mono text-sm mb-12">Thoughts, tutorials, and discoveries.</p>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <p className="text-muted font-mono text-sm">No posts yet. Stay tuned.</p>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block">
              <article className="border border-border hover:border-primary/30 rounded-xl p-6 transition-all hover:-translate-y-0.5 group">
                <h2 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-xs font-mono text-muted">
                  {new Date(post.published_date).toLocaleDateString("es-BO", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
