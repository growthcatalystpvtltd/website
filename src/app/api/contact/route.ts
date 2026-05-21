import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/mailer";

const emptyToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

const schema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  company: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  subject: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fields = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { error: "Validation failed", fields },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company ?? null,
        subject: data.subject ?? null,
        message: data.message,
      },
    });
  } catch (err) {
    console.error("[contact] database error:", err);
    return NextResponse.json(
      { error: "Unable to save message. Please try again later." },
      { status: 500 }
    );
  }

  sendContactNotification(data).catch((err) =>
    console.error("[contact] email notify failed:", err)
  );

  return NextResponse.json({ success: true });
}
