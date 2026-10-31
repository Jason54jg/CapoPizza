"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = Omit<HTMLMotionProps<"dialog">, "onClose"> & {
  onClose: () => void;
};

/** Le dialogue natif gère le focus, son retour et le contenu arrière-plan inerte. */
export function AccessibleDialog({ onClose, className, children, ...props }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <motion.dialog
      {...props}
      ref={ref}
      aria-modal="true"
      className={`m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 text-inherit outline-none [&:not([open])]:hidden ${className ?? ""}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      {children}
    </motion.dialog>
  );
}
