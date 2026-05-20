import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const teamSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  linkedin: z.string().optional(),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export async function GET() {
  const team = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(team);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const data = teamSchema.parse(body);
    const member = await prisma.teamMember.create({ data });
    return NextResponse.json(member, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
