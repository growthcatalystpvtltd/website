import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar, Tag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import BlogFilter from "@/components/blogs/BlogFilter";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Insights on web development, mobile apps, AI, and Nepal's IT sector from the Growth Catalyst team.",
};

interface BlogsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const { category } = await searchParams;

  const [categories, posts] = await Promise.all([
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }).catch(() => []),
    prisma.blogPost
      .findMany({
        where: {
          published: true,
          ...(category ? { category: { slug: category } } : {}),
        },
        include: { category: true },
        orderBy: { createdAt: "desc" },
      })
      .catch(() => []),
  ]);

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold tracking-[0.3em] text-neutral-700 uppercase">Blogs</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Insights & Updates
        </h1>
        <p className="mt-6 max-w-xl text-base font-medium text-neutral-800">
          Thoughts on technology, process, and business growth from the Growth Catalyst team — written for Nepal&apos;s IT landscape.
        </p>

        <BlogFilter categories={categories} activeCategory={category} />

        {posts.length === 0 ? (
          <div className="mt-16 border border-dashed border-border bg-neutral-50 p-16 text-center">
            <p className="text-sm font-medium text-neutral-700">No blog posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col bg-white p-8 transition-colors hover:bg-neutral-50"
              >
                <div className="flex items-center gap-2">
                  <Tag size={12} className="text-black" />
                  <p className="text-[10px] font-bold tracking-widest text-neutral-700 uppercase">
                    {post.category.name}
                  </p>
                </div>
                <h2 className="mt-3 text-lg font-bold leading-snug">
                  <Link href={`/blogs/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && (
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <time className="flex items-center gap-1.5 text-xs font-medium text-neutral-600">
                    <Calendar size={12} />
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase group-hover:underline"
                  >
                    Read
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
