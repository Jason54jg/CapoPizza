"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import {
  emptyChoices,
  getCompositionSchema,
  getMultiMax,
  isCompositionValid,
  type CompositionChoices,
} from "@/lib/composition";
import type { MenuItem } from "@/lib/menu-types";

type DishComposerProps = {
  item: MenuItem;
  onChange: (choices: CompositionChoices, valid: boolean) => void;
};

export function DishComposer({ item, onChange }: DishComposerProps) {
  const schema = useMemo(() => getCompositionSchema(item), [item]);
  const [choices, setChoices] = useState<CompositionChoices>(() =>
    emptyChoices(schema),
  );

  useLayoutEffect(() => {
    onChange(choices, isCompositionValid(schema, choices));
    // Remounté via key={item.id} — sync initiale uniquement
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (next: CompositionChoices) => {
    const meatsField = schema.fields.find((f) => f.id === "meats");
    if (meatsField?.kind === "multi" && meatsField.maxFrom) {
      const max = getMultiMax(meatsField, next);
      const meats = Array.isArray(next.meats) ? (next.meats as string[]) : [];
      if (meats.length > max) {
        next = { ...next, meats: meats.slice(0, max) };
      }
    }
    setChoices(next);
    onChange(next, isCompositionValid(schema, next));
  };

  const setSingle = (id: string, value: string) => {
    update({ ...choices, [id]: value });
  };

  const toggleMulti = (id: string, option: string, max: number) => {
    const current = Array.isArray(choices[id])
      ? ([...(choices[id] as string[])] as string[])
      : [];
    const idx = current.indexOf(option);
    if (idx >= 0) {
      current.splice(idx, 1);
    } else if (current.length < max) {
      current.push(option);
    } else if (max === 1) {
      current.splice(0, 1, option);
    }
    update({ ...choices, [id]: current });
  };

  return (
    <div className="mt-5 space-y-5 border-t border-[var(--border-subtle)] pt-5">
      <div>
        <p className="text-sm font-semibold text-[var(--text-primary)]">
          Composer votre commande
        </p>
        {schema.hint ? (
          <p className="mt-1 text-xs text-[var(--text-muted)]">{schema.hint}</p>
        ) : null}
      </div>

      {schema.fields.map((field) => {
        if (field.kind === "note") {
          return (
            <label key={field.id} className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {field.label}
              </span>
              <textarea
                value={String(choices[field.id] ?? "")}
                onChange={(e) => setSingle(field.id, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className="input-field input-field--area w-full resize-none text-sm"
              />
            </label>
          );
        }

        if (field.kind === "toggle") {
          const on = Boolean(choices[field.id]);
          return (
            <button
              key={field.id}
              type="button"
              onClick={() => update({ ...choices, [field.id]: !on })}
              className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                on
                  ? "border-[var(--brand-primary)] bg-brand-muted text-brand"
                  : "border-[var(--border-subtle)] text-[var(--text-secondary)]"
              }`}
            >
              <span>{field.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  on
                    ? "bg-[var(--brand-primary)] text-[var(--brand-on-primary)]"
                    : "bg-[var(--surface-muted)]"
                }`}
              >
                {on ? "Oui" : "Non"}
              </span>
            </button>
          );
        }

        if (field.kind === "single") {
          return (
            <fieldset key={field.id}>
              <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {field.label}
                {field.required ? " *" : ""}
              </legend>
              <div className="flex flex-wrap gap-1.5">
                {(field.options ?? []).map((opt) => {
                  const active = choices[field.id] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSingle(field.id, opt)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        active
                          ? "bg-[var(--brand-primary)] text-[var(--brand-on-primary)]"
                          : "border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-brand-soft"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        }

        const max = getMultiMax(field, choices);
        const selected = Array.isArray(choices[field.id])
          ? (choices[field.id] as string[])
          : [];
        const needsSize =
          field.maxFrom === "size" && !String(choices.size ?? "").trim();

        return (
          <fieldset key={field.id} disabled={needsSize}>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              {field.label}
              {field.required ? " *" : ""}
              {Number.isFinite(max) ? (
                <span className="ml-1 font-normal normal-case tracking-normal">
                  ({selected.length}/{max})
                </span>
              ) : null}
            </legend>
            {needsSize ? (
              <p className="text-xs text-[var(--text-muted)]">
                Choisissez d&apos;abord la taille.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {(field.options ?? []).map((opt) => {
                  const active = selected.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleMulti(field.id, opt, max)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        active
                          ? "bg-[var(--brand-primary)] text-[var(--brand-on-primary)]"
                          : "border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-brand-soft"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
          </fieldset>
        );
      })}
    </div>
  );
}
