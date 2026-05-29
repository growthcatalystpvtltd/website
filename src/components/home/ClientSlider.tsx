import HomeSection from "@/components/home/HomeSection";

interface Client {
  id: string;
  name: string;
  logoUrl?: string | null;
}

const fallbackClients: Client[] = [
  { id: "1", name: "Saathimart" },
  { id: "2", name: "Magicboox" },
  { id: "3", name: "SamsungPlaza" },
  { id: "4", name: "SyBazzar" },
  { id: "5", name: "BSTC thanka" },
  { id: "6", name: "Tekka" },
  { id: "7", name: "AC Ghar" },
  { id: "8", name: "LET" },
];

interface ClientSliderProps {
  clients?: Client[];
}

export default function ClientSlider({ clients = fallbackClients }: ClientSliderProps) {
  const items = [...clients, ...clients];

  return (
    <HomeSection
      className="border-t border-border bg-white px-6 py-24 hidden"
      // lines={[
      //   { src: "/lines-clients.svg", placement: "top-left", speed: 0.32, opacity: 0.68 },
      //   { src: "/lines-clients-accent.svg", placement: "bottom-right", speed: 0.2, opacity: 0.52 },
      // ]}
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-bold tracking-[0.3em] text-neutral-700 uppercase">
          Trusted By
        </p>
        <h2 className="mt-4 text-center text-2xl font-bold tracking-tight md:text-3xl">
          Organizations we&apos;ve helped grow
        </h2>
      </div>

      <div className="relative mt-16 overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-neutral-50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-neutral-50 to-transparent" />

        <div className="flex animate-marquee">
          {items.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="mx-12 flex shrink-0 items-center justify-center"
            >
              {client.logoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={client.logoUrl}
                  alt={client.name}
                  className="h-16 w-auto max-w-[180px] object-contain transition-all"
                />
              ) : (
                <span className="whitespace-nowrap text-lg font-bold tracking-widest text-neutral-700 uppercase">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
