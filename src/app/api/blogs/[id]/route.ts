import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseDateInput, slugify } from "@/lib/utils";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1).optional(),
  published: z.boolean().optional(),
  categoryId: z.string().optional(),
  publishedAt: z.string().optional(),
});

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    const body = await req.json();
    const data = postSchema.parse(body);
    const { publishedAt, ...rest } = data;

    const updateData: Record<string, unknown> = { ...rest };
    if (data.title && !data.slug) {
      updateData.slug = slugify(data.title);
    }
    if (publishedAt !== undefined) {
      const createdAt = parseDateInput(publishedAt);
      if (!createdAt) {
        return NextResponse.json({ error: "Invalid date" }, { status: 400 });
      }
      updateData.createdAt = createdAt;
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  await prisma.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
