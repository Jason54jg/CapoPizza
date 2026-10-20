import { PizzaLoader } from "@/components/pizza-loader";

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[var(--surface-base)]">
      <PizzaLoader />
    </div>
  );
}
