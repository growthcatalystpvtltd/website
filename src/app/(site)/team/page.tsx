import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Users, ArrowUpRight, Briefcase } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/SocialIcons";
import { prisma } from "@/lib/prisma";
import { getSiteSetting } from "@/lib/site-settings";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the team behind Growth Catalyst : engineers, designers, and consultants building Nepal's process-driven technology firm.",
};

export default async function TeamPage() {
  const [headline, intro, careersHeadline, careersIntro, members] = await Promise.all([
    getSiteSetting("team_headline", "The people behind the process"),
    getSiteSetting(
      "team_intro",
      "Our core team brings together engineering excellence, design discipline, and business acumen."
    ),
    getSiteSetting("careers_headline", "Join Growth Catalyst"),
    getSiteSetting(
      "careers_intro",
      "We're always looking for disciplined engineers, designers, and consultants who believe in process-driven excellence."
    ),
    prisma.teamMember
      .findMany({ where: { published: true }, orderBy: { order: "asc" } })
      .catch(() => []),
  ]);

  const display =
    members.length > 0
      ? members
      : [
          { id: "1", name: "Manoj Kumar Mahato", role: "Founder & CEO", bio: "-", imageUrl: "/team/manoj.png", linkedin: "https://www.linkedin.com/in/manojmahato/" },
          { id: "2", name: "Sailesh Kasaju", role: "Founder & CTO", bio: "-", imageUrl: "/team/sailesh.png", linkedin: "https://www.linkedin.com/in/saileshkasaju/" },
          { id: "3", name: "Jivan Shrestha", role: "Founder & COO", bio: "-", imageUrl: "/team/jivan.png", linkedin: "https://www.linkedin.com/in/jivanshr/" },
        ];

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold tracking-[0.3em] text-neutral-700 uppercase">Team</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {headline}
        </h1>
        <p className="mt-6 max-w-xl text-base font-medium text-neutral-800">{intro}</p>

        <div className="mt-20 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {display.map((member) => (
            <article key={member.id} className="bg-white p-8">
              <div className="mb-6 flex h-80 w-64 items-center justify-center border border-border bg-neutral-100">
                {member.imageUrl ? (
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={228}
                    height={228}
                    className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    unoptimized
                  />
                ) : (
                  <Users size={22} className="text-neutral-500" />
                )}
              </div>
              <h2 className="text-lg font-bold">{member.name}</h2>
              <p className="mt-1 text-[10px] font-semibold tracking-widest text-neutral-600 uppercase">
                {member.role}
              </p>
              {member.bio && (
                <p className="mt-4 text-sm leading-relaxed text-neutral-700">{member.bio}</p>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase hover:underline"
                >
                  <LinkedinIcon size={16} />
                  Connect
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="mt-24 border-t border-border pt-16">
          <div className="flex items-center gap-3">
            <Briefcase size={20} className="text-black" />
            <p className="text-xs font-bold tracking-[0.3em] text-neutral-700 uppercase">Careers</p>
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">{careersHeadline}</h2>
          <p className="mt-4 max-w-lg text-sm font-medium text-neutral-800">
            {careersIntro} Send your CV to{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold underline hover:no-underline">
              {siteConfig.email}
            </a>
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 border border-black px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white"
          >
            Apply Now
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
