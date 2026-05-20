import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
    include: { category: true },
  }).catch(() => null);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt ?? undefined };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await prisma.blogPost
    .findUnique({
      where: { slug, published: true },
      include: { category: true, author: true },
    })
    .catch(() => null);

  if (!post) notFound();

  return (
    <article className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/blogs" className="text-xs tracking-widest text-muted uppercase hover:text-black">
          ← Back to Blogs
        </Link>
        <p className="mt-8 text-[10px] tracking-widest text-muted uppercase">{post.category.name}</p>
        <h1 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">{post.title}</h1>
        <time className="mt-6 block text-xs text-muted">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div className="prose prose-neutral mt-12 max-w-none text-sm leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </article>
  );
}
