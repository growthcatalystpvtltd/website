import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const teamSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  linkedin: z.string().optional(),
  order: z.number().int().optional(),
  published: z.boolean().optional(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const data = teamSchema.parse(await req.json());
    const member = await prisma.teamMember.update({ where: { id }, data });
    return NextResponse.json(member);
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.teamMember.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
