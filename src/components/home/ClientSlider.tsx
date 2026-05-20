interface Client {
  id: string;
  name: string;
  logoUrl?: string | null;
}

const fallbackClients: Client[] = [
  { id: "1", name: "FinCorp" },
  { id: "2", name: "RetailPro" },
  { id: "3", name: "TechVentures" },
  { id: "4", name: "AgriLink" },
  { id: "5", name: "HealthPlus" },
  { id: "6", name: "EduStream" },
  { id: "7", name: "LogiTrack" },
  { id: "8", name: "PayNepal" },
];

interface ClientSliderProps {
  clients?: Client[];
}

export default function ClientSlider({ clients = fallbackClients }: ClientSliderProps) {
  const items = [...clients, ...clients];

  return (
    <section className="border-t border-border bg-neutral-50 px-6 py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-medium tracking-[0.3em] text-muted uppercase">
          Trusted By
        </p>
        <h2 className="mt-4 text-center text-2xl font-light tracking-tight">
          Organizations we&apos;ve helped grow
        </h2>
      </div>

      <div className="relative mt-16">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-neutral-50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-neutral-50 to-transparent" />

        <div className="flex animate-marquee">
          {items.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="mx-12 flex shrink-0 items-center justify-center"
            >
              {client.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.logoUrl}
                  alt={client.name}
                  className="h-8 w-auto max-w-[140px] object-contain opacity-60 grayscale"
                />
              ) : (
                <span className="whitespace-nowrap text-lg font-light tracking-widest text-muted uppercase">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
