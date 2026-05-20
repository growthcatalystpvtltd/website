import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogPostForm from "@/components/admin/BlogPostForm";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;

  const [post, categories] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id } }).catch(() => null),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }).catch(() => []),
  ]);

  if (!post) notFound();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-light">Edit Blog Post</h1>
      <div className="mt-10">
        <BlogPostForm categories={categories} post={post} />
      </div>
    </div>
  );
}
