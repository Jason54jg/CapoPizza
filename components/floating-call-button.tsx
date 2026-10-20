"use client";

import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export function FloatingCallButton() {
  return (
    <a
      href={BUSINESS.phoneTel}
      className="btn-primary fixed bottom-4 left-4 right-4 z-[60] py-3.5 text-sm md:hidden"
    >
      <Phone className="h-4 w-4" />
      Appeler pour commander
    </a>
  );
}
