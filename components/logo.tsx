import Image from "next/image";

type LogoProps = {
  className?: string;
  /** Affiche le texte à côté du badge (défaut: true) */
  withWordmark?: boolean;
  size?: "sm" | "md" | "lg";
};

const SIZES = {
  sm: 36,
  md: 44,
  lg: 56,
} as const;

export function Logo({
  className = "",
  withWordmark = true,
  size = "md",
}: LogoProps) {
  const px = SIZES[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/images/capo-logo.png?v=5"
        alt="Capo Pizza"
        width={px}
        height={px}
        className="shrink-0"
        priority
      />
      {withWordmark && (
        <div className="leading-tight">
          <p className="font-display text-xl font-semibold tracking-tight text-[var(--text-primary)]">
            Capo Pizza
          </p>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Neufchâteau
          </p>
        </div>
      )}
    </div>
  );
}
