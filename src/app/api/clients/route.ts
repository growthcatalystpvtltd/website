import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const clientSchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().optional(),
  order: z.number().int().default(0),
  active: z.boolean().default(true),
});

export async function GET() {
  const clients = await prisma.client.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(clients);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = clientSchema.parse(await req.json());
    const client = await prisma.client.create({ data });
    return NextResponse.json(client, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
