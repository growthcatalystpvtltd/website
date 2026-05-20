import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Team" };

export default async function TeamPage() {
  const members = await prisma.teamMember
    .findMany({ where: { published: true }, orderBy: { order: "asc" } })
    .catch(() => []);

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">Team</p>
        <h1 className="mt-4 text-4xl font-light tracking-tight md:text-5xl">
          The people behind the process
        </h1>
        <p className="mt-6 max-w-xl text-sm text-muted">
          Our core team brings together engineering excellence, design discipline, and business acumen.
        </p>

        {members.length === 0 ? (
          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Leadership Team", role: "Strategy & Delivery", bio: "Guiding every engagement with process rigor and client focus." },
              { name: "Engineering Team", role: "Development & QA", bio: "Building robust, scalable solutions across web, mobile, and AI." },
              { name: "Design Team", role: "UX & Product", bio: "Crafting minimalist, user-centered experiences." },
            ].map((m) => (
              <div key={m.name} className="border border-border p-8">
                <div className="mb-6 h-16 w-16 rounded-full border border-border bg-neutral-100" />
                <h2 className="text-lg font-medium">{m.name}</h2>
                <p className="mt-1 text-xs tracking-widest text-muted uppercase">{m.role}</p>
                <p className="mt-4 text-sm text-muted">{m.bio}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <div key={member.id} className="border border-border p-8">
                <div className="mb-6 h-16 w-16 rounded-full border border-border bg-neutral-100" />
                <h2 className="text-lg font-medium">{member.name}</h2>
                <p className="mt-1 text-xs tracking-widest text-muted uppercase">{member.role}</p>
                {member.bio && <p className="mt-4 text-sm text-muted">{member.bio}</p>}
              </div>
            ))}
          </div>
        )}

        <div className="mt-24 border-t border-border pt-16">
          <p className="text-xs font-medium tracking-[0.3em] text-muted uppercase">Careers</p>
          <h2 className="mt-4 text-2xl font-light">Join Growth Catalyst</h2>
          <p className="mt-4 max-w-lg text-sm text-muted">
            We&apos;re always looking for disciplined engineers, designers, and consultants who believe in process-driven excellence. Send your CV to info@growthcatalyst.com.np
          </p>
          <Link href="/contact" className="mt-8 inline-block border border-black px-8 py-3 text-xs font-medium tracking-widest uppercase hover:bg-black hover:text-white">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
