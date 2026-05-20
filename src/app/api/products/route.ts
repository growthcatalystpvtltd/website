import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().min(1),
  features: z.array(z.string()).default([]),
  imageUrl: z.string().optional(),
  published: z.boolean().default(true),
  order: z.number().int().default(0),
});

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const data = productSchema.parse(body);
    const product = await prisma.product.create({
      data: { ...data, slug: data.slug || slugify(data.name) },
    });
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
