import { prisma } from "@/lib/prisma";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default async function NewBlogPage() {
  const categories = await prisma.blogCategory.findMany({ orderBy: { name: "asc" } }).catch(() => []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-light">New Blog Post</h1>
      <div className="mt-10">
        {categories.length === 0 ? (
          <p className="text-sm text-muted">
            Create a category first before adding blog posts.{" "}
            <a href="/admin/categories" className="underline">Go to Categories</a>
          </p>
        ) : (
          <BlogPostForm categories={categories} />
        )}
      </div>
    </div>
  );
}
