import Image from "next/image";
import { withBasePath } from "@/lib/base-path";

type PizzaLoaderProps = {
  label?: string;
  fullscreen?: boolean;
};

export function PizzaLoader({
  label = "Chargement",
  fullscreen = false,
}: PizzaLoaderProps) {
  return (
    <div
      className={
        fullscreen
          ? "flex flex-col items-center justify-center gap-6"
          : "flex flex-col items-center justify-center gap-4 py-16"
      }
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="pizza-loader relative" aria-hidden>
        <Image
          src={withBasePath("/images/capo-logo.png")}
          alt=""
          width={112}
          height={112}
          className="rounded-full"
          priority
        />
      </div>
      <div className="text-center">
        <p className="font-display text-xl text-[var(--text-primary)]">Capo Pizza</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{label}</p>
      </div>
    </div>
  );
}
