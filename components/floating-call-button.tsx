"use client";

import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { useDict } from "./locale-provider";
import { UberEatsButton } from "./uber-eats-button";

export function FloatingCallButton() {
  const dict = useDict();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[60] grid grid-cols-2 gap-2 md:hidden">
      <a href={BUSINESS.phoneTel} className="btn-primary py-3.5 text-sm">
        <Phone className="h-4 w-4 shrink-0" />
        <span className="truncate">{dict.selection.call}</span>
      </a>
      <UberEatsButton short className="py-3.5 text-sm" />
    </div>
  );
}
