"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/shared/ui/ScrollReveal";
import SectionHeading from "@/shared/ui/SectionHeading";
import postService from "~/services/post";
import type { Post } from "@/types/general";

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const service = postService();

  useEffect(() => {
    service.getPublishedPosts().then(data => setPosts(data.slice(0, 3))).finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && posts.length === 0) return null;

  return (
    <section className="max-w-full mx-auto px-10 max-md:px-5 py-20 max-md:py-14">
      <ScrollReveal>
        <SectionHeading
          label="// blog"
          title="Latest Posts"
          description="Thoughts, tutorials, and discoveries."
        />
      </ScrollReveal>
      <div className="space-y-4 max-w-3xl">
        {isLoading ? (
          [...Array(3)].map((_, i) => <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />)
        ) : (
          posts.map(post => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block">
              <article className="border border-border hover:border-primary/30 rounded-xl p-5 transition-all group">
                <h3 className="font-display text-lg font-bold text-white group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-xs font-mono text-muted mt-1">
                  {new Date(post.published_date).toLocaleDateString("es-BO", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </article>
            </Link>
          ))
        )}
      </div>
      <div className="mt-8">
        <Link href="/blog" className="font-mono text-sm text-primary hover:underline">
          View All Posts →
        </Link>
      </div>
    </section>
  );
}
