"use client";

import { useId, type ReactNode } from "react";

/**
 * Form field primitives.
 *
 * Geist Mono marks the machine-checked parts of a form — the REQUIRED marker
 * and the error state. That is one of the five earned uses in DESIGN.md §3:
 * these labels describe something the server actually validates.
 *
 * Errors are wired with aria-describedby and aria-invalid, and the error text
 * lives in a role="alert" region so a screen reader announces it on arrival.
 */

const inputBase =
  "w-full min-h-11 rounded-surface border bg-paper px-4 py-3 text-base text-ink " +
  "placeholder:text-quiet/50 transition-colors " +
  "focus:border-signal focus:outline-none " +
  "aria-[invalid=true]:border-[#B3261E]";

export function Field({
  label,
  name,
  errors,
  required,
  hint,
  children,
}: {
  label: string;
  name: string;
  errors?: string[];
  required?: boolean;
  hint?: string;
  children: (props: {
    id: string;
    name: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
    required: boolean | undefined;
    className: string;
  }) => ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const hasError = Boolean(errors?.length);
  const describedBy =
    [hasError ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-ink">{label}</span>
        {required ? (
          <span className="text-micro text-quiet/70">Required</span>
        ) : (
          <span className="text-micro text-quiet/50">Optional</span>
        )}
      </label>

      {children({
        id,
        name,
        "aria-invalid": hasError,
        "aria-describedby": describedBy,
        required,
        className: inputBase,
      })}

      {hint ? (
        <p id={hintId} className="text-sm text-quiet/80">
          {hint}
        </p>
      ) : null}

      {hasError ? (
        <p id={errorId} role="alert" className="text-micro text-[#B3261E]">
          {errors![0]}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Honeypot. Hidden from sight and from assistive technology, but a plain
 * input a bot's parser will happily fill. Not `display: none` — some bots skip
 * those — and never `type="hidden"`, which they skip too.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
      <label htmlFor="website-hp">Leave this field empty</label>
      <input id="website-hp" type="text" name="website" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/** Result banner shown after a submission resolves. */
export function FormResult({ ok, message }: { ok: boolean; message: string }) {
  if (!message) return null;
  return (
    <p
      role={ok ? "status" : "alert"}
      className={`rounded-surface border p-4 text-sm ${
        ok
          ? "border-signal/30 bg-signal/5 text-ink"
          : "border-[#B3261E]/30 bg-[#B3261E]/5 text-[#8C1D18]"
      }`}
    >
      {message}
    </p>
  );
}
