import SectionLines, {
  type LinesPlacement,
  type LinesVariant,
} from "@/components/home/SectionLines";

export interface SectionLineConfig {
  variant?: LinesVariant;
  placement?: LinesPlacement;
  src?: string;
  speed?: number;
  opacity?: number;
}

interface HomeSectionProps {
  children: React.ReactNode;
  className?: string;
  lines?: SectionLineConfig | SectionLineConfig[];
}

export default function HomeSection({
  children,
  className = "",
  lines,
}: HomeSectionProps) {
  const lineConfigs = lines
    ? Array.isArray(lines)
      ? lines
      : [lines]
    : [];

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {lineConfigs.map((config, i) => (
        <SectionLines key={`${config.placement}-${config.src ?? config.variant}-${i}`} {...config} />
      ))}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
