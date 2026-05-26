import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";

export default async function AdminBlogsPage() {
  const posts = await prisma.blogPost
    .findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    })
    .catch(() => []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light">Blog Posts</h1>
          <p className="mt-1 text-sm text-muted">Create and manage blog content</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="border border-black bg-black px-6 py-2 text-xs tracking-widest text-white uppercase"
        >
          New Post
        </Link>
      </div>

      <div className="mt-10 overflow-x-auto border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs tracking-widest uppercase text-muted">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted">
                  No posts yet. Create your first blog post.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 font-medium">{post.title}</td>
                  <td className="px-6 py-4 text-muted whitespace-nowrap">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-muted">{post.category.name}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs uppercase ${post.published ? "text-black" : "text-muted"}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Link href={`/admin/blogs/${post.id}`} className="text-xs uppercase hover:underline">
                        Edit
                      </Link>
                      <DeleteBlogButton id={post.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
