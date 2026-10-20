"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { BUSINESS } from "@/lib/business";

export function FloatingCallButton() {
  return (
    <motion.a
      href={BUSINESS.phoneTel}
      className="fixed bottom-4 left-4 right-4 z-[60] flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e85d2c] to-[#c41e1e] py-4 text-base font-bold text-white shadow-2xl shadow-orange-900/40 md:hidden"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 22 }}
    >
      <motion.span
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="flex items-center gap-2"
      >
        <Phone className="h-5 w-5" />
        📞 Appeler pour commander
      </motion.span>
    </motion.a>
  );
}
