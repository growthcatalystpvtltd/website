import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseDateInput, slugify } from "@/lib/utils";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  published: z.boolean().default(false),
  categoryId: z.string().min(1),
  publishedAt: z.string().optional(),
});

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const data = postSchema.parse(body);
    const slug = data.slug || slugify(data.title);
    const { publishedAt, ...rest } = data;
    const createdAt = parseDateInput(publishedAt ?? "");

    const post = await prisma.blogPost.create({
      data: {
        ...rest,
        slug,
        authorId: session.user.id,
        ...(createdAt ? { createdAt } : {}),
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
