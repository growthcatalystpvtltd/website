import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { prisma } from "@/lib/prisma";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost
    .findUnique({ where: { slug, published: true }, include: { category: true } })
    .catch(() => null);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    keywords: [post.category.name, "Nepal", "IT", "Growth Catalyst"],
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
    },
  };
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
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-neutral-700 uppercase hover:text-black"
        >
          <ArrowLeft size={12} />
          Back to Blogs
        </Link>
        <div className="mt-10 flex items-center gap-2">
          <Tag size={14} className="text-black" />
          <p className="text-[10px] font-bold tracking-widest text-neutral-700 uppercase">
            {post.category.name}
          </p>
        </div>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-6 text-lg font-medium leading-relaxed text-neutral-800">
            {post.excerpt}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-border py-4 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-neutral-700">
            <Calendar size={12} />
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.author?.name && (
            <span className="flex items-center gap-1.5 font-medium text-neutral-700">
              <User size={12} />
              {post.author.name}
            </span>
          )}
        </div>
        <div className="prose-content mt-12 max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return <h2 key={i}>{paragraph.replace(/^## /, "")}</h2>;
            }
            if (paragraph.startsWith("### ")) {
              return <h3 key={i}>{paragraph.replace(/^### /, "")}</h3>;
            }
            return <p key={i}>{paragraph}</p>;
          })}
        </div>

        <div className="mt-16 border-t border-border pt-10 text-center">
          <p className="text-xs font-bold tracking-widest text-neutral-700 uppercase">
            Have a project in mind?
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block border border-black bg-black px-8 py-3 text-xs font-semibold tracking-widest text-white uppercase hover:opacity-80"
          >
            Talk to Growth Catalyst
          </Link>
        </div>
      </div>
    </article>
  );
}
