import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BlogFilter from "@/components/blogs/BlogFilter";

export const metadata: Metadata = { title: "Blogs" };

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
        <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">Blogs</p>
        <h1 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">Insights & Updates</h1>
        <p className="mt-6 max-w-xl text-sm text-muted">
          Thoughts on technology, process, and business growth from the Growth Catalyst team.
        </p>

        <BlogFilter categories={categories} activeCategory={category} />

        {posts.length === 0 ? (
          <div className="mt-16 border border-dashed border-border p-16 text-center">
            <p className="text-sm text-muted">No blog posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="group border border-border p-8 transition-colors hover:border-black">
                <p className="text-[10px] tracking-widest text-muted uppercase">{post.category.name}</p>
                <h2 className="mt-3 text-lg font-medium group-hover:underline">
                  <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                </h2>
                {post.excerpt && <p className="mt-3 text-sm text-muted line-clamp-3">{post.excerpt}</p>}
                <time className="mt-6 block text-xs text-muted">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
