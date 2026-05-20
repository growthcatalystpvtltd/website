import CategoryManager from "@/components/admin/CategoryManager";
import { prisma } from "@/lib/prisma";

export default async function AdminCategoriesPage() {
  const categories = await prisma.blogCategory
    .findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    })
    .catch(() => []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-light">Blog Categories</h1>
      <p className="mt-1 text-sm text-muted">Organize blog posts by category</p>
      <div className="mt-10">
        <CategoryManager initialCategories={categories} />
      </div>
    </div>
  );
}
