"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";
import postService from "~/services/post";
import type { Post } from "@/types/general";

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const service = postService();

  useEffect(() => {
    service.getPostById(Number(slug)).then(setPost).catch(() => setPost(null)).finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) return <div className="max-w-3xl mx-auto px-6 py-20"><div className="h-8 w-64 bg-white/5 rounded animate-pulse mb-4" /><div className="h-4 w-32 bg-white/5 rounded animate-pulse" /></div>;
  if (!post) return <div className="max-w-3xl mx-auto px-6 py-20"><p className="text-muted font-mono">Post not found.</p><Link href="/blog" className="text-primary font-mono text-sm hover:underline">← Back to blog</Link></div>;

  return (
    <article className="max-w-3xl mx-auto px-6 py-20">
      <Link href="/blog" className="text-primary font-mono text-sm hover:underline mb-8 inline-block">← Back to blog</Link>
      <h1 className="font-display text-4xl font-bold text-white mb-4">{post.title}</h1>
      <p className="text-xs font-mono text-muted mb-8">
        {new Date(post.published_date).toLocaleDateString("es-BO", { year: "numeric", month: "long", day: "numeric" })}
        {post.published ? "" : " · DRAFT"}
      </p>
      <div className="prose prose-invert max-w-none text-muted leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
    </article>
  );
}
