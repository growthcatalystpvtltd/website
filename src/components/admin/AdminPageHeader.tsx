import Link from "next/link";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function AdminPageHeader({
  title,
  description,
  actionLabel,
  actionHref,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-neutral-700">{description}</p>}
      </div>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-block border border-black bg-black px-6 py-2.5 text-[11px] font-semibold tracking-widest text-white uppercase hover:opacity-80"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
