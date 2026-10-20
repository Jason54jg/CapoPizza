"use client";

import { useEffect, useState } from "react";
import { PizzaLoader } from "./pizza-loader";

const MIN_VISIBLE_MS = 700;
const MAX_WAIT_MS = 4500;

export function InitialLoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const started = Date.now();

    const finish = () => {
      const elapsed = Date.now() - started;
      const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        setFadeOut(true);
        window.setTimeout(() => setVisible(false), 320);
      }, delay);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const safety = window.setTimeout(finish, MAX_WAIT_MS);
    return () => {
      window.clearTimeout(safety);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[var(--surface-base)] transition-opacity duration-300 ${
        fadeOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={fadeOut}
    >
      <PizzaLoader label="Préparation de la carte…" fullscreen />
    </div>
  );
}
