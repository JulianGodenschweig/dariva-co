"use client";

import { useActionState, useId } from "react";
import { subscribeNewsletter } from "@/app/actions";
import { IDLE_STATE } from "@/lib/validation";
import { Honeypot } from "./Field";
import { Turnstile } from "./Turnstile";

/**
 * Footer newsletter. Sits on the --ink ground, so it carries its own inverted
 * styling rather than reusing the Field primitive, which is built for --paper.
 */
export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, IDLE_STATE);
  const id = useId();
  const errorId = `${id}-error`;
  const error = state.errors?.email?.[0];

  return (
    <form action={action} noValidate className="max-w-[36rem]">
      <Honeypot />
      <h2 className="text-micro mb-4 text-signal-raw">Get told when resources land</h2>
      <p className="mb-5 max-w-[52ch] text-sm text-paper/70">
        Articles, self-assessments and guides are in development. One email when the
        first ones are published — nothing else.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="min-h-11 flex-1 rounded-surface border border-paper/25 bg-transparent px-4 py-3 text-base text-paper placeholder:text-paper/70 focus:border-signal-raw"
        />
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 rounded-button bg-paper px-6 py-3 font-medium leading-none text-ink transition-[background-color,font-variation-settings] hover:font-semibold disabled:opacity-50"
        >
          {pending ? "Adding…" : "Tell me when they're ready"}
        </button>
      </div>

      <Turnstile />

      {error ? (
        <p id={errorId} role="alert" className="text-micro mt-3 text-[#FFB4AB]">
          {error}
        </p>
      ) : null}

      {state.message ? (
        <p
          role={state.ok ? "status" : "alert"}
          className={`mt-3 text-sm ${state.ok ? "text-signal-raw" : "text-[#FFB4AB]"}`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
