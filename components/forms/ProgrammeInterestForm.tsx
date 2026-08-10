"use client";

import { useActionState } from "react";
import { submitProgrammeInterest } from "@/app/actions";
import { IDLE_STATE } from "@/lib/validation";
import { programmeFacts } from "@/lib/content/site";
import { moduleSummaries } from "@/lib/content/pages";
import { Field, Honeypot, FormResult } from "./Field";
import { Turnstile } from "./Turnstile";
import { Button } from "@/components/ui/Button";

/**
 * Cohort registration.
 *
 * The rate choice is a real fork, not a nicety: N$3,000 standard against
 * N$1,500 subsidised. The subsidised option states its eligibility inline so
 * nobody has to ask whether they qualify before they can apply.
 */
export function ProgrammeInterestForm({
  defaultProgramme,
  id,
}: {
  defaultProgramme?: string;
  id?: string;
}) {
  const [state, action, pending] = useActionState(submitProgrammeInterest, IDLE_STATE);

  // React 19 resets an uncontrolled form once its action resolves, so a failed
  // submission would wipe everything typed. The action echoes the submitted
  // values back and they are re-applied here as defaults.
  const v = (name: string) => state.values?.[name] ?? "";

  return (
    <form id={id} action={action} noValidate className="flex max-w-[42rem] flex-col gap-6">
      <Honeypot />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" name="name" required errors={state.errors?.name}>
          {(p) => <input {...p} type="text" autoComplete="name" defaultValue={v("name")} />}
        </Field>
        <Field label="Email" name="email" required errors={state.errors?.email}>
          {(p) => (
            <input {...p} type="email" autoComplete="email" inputMode="email" defaultValue={v("email")} />
          )}
        </Field>
        <Field label="Phone" name="phone" errors={state.errors?.phone}>
          {(p) => <input {...p} type="tel" autoComplete="tel" inputMode="tel" defaultValue={v("phone")} />}
        </Field>
        <Field
          label="Town or region"
          name="region"
          errors={state.errors?.region}
          hint="Cohorts run in person and fully online."
        >
          {(p) => <input {...p} type="text" defaultValue={v("region")} />}
        </Field>
      </div>

      <Field label="Which programme?" name="programme" required errors={state.errors?.programme}>
        {(p) => (
          <select {...p} defaultValue={v("programme") || defaultProgramme || ""}>
            <option value="">Choose one</option>
            {moduleSummaries.map((m) => (
              <option key={m.slug} value={m.title}>
                {m.title}
              </option>
            ))}
          </select>
        )}
      </Field>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-sm font-medium text-ink">
          Which rate applies to you?
        </legend>

        <label className="flex cursor-pointer gap-3 rounded-surface border border-ink/15 p-4 transition-colors has-[:checked]:border-signal has-[:checked]:bg-signal/5">
          <input
            type="radio"
            name="rate_type"
            value="standard"
            defaultChecked
            className="mt-1 accent-[var(--color-signal)]"
          />
          <span>
            <span className="block text-sm font-medium text-ink">Standard</span>
            <span className="text-micro mt-1 block text-quiet">
              {programmeFacts.standardRate} · {programmeFacts.durationMonths} months
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer gap-3 rounded-surface border border-ink/15 p-4 transition-colors has-[:checked]:border-signal has-[:checked]:bg-signal/5">
          <input
            type="radio"
            name="rate_type"
            value="subsidised"
            className="mt-1 accent-[var(--color-signal)]"
          />
          <span>
            <span className="block text-sm font-medium text-ink">Subsidised</span>
            <span className="text-micro mt-1 block text-quiet">
              {programmeFacts.subsidisedRateMonthly}/month · {programmeFacts.subsidisedRateTotal} total
            </span>
            <span className="mt-2 block text-sm text-quiet">
              For {programmeFacts.subsidyEligibility}.
            </span>
          </span>
        </label>

        {state.errors?.rate_type ? (
          <p role="alert" className="text-micro text-[#B3261E]">
            {state.errors.rate_type[0]}
          </p>
        ) : null}
      </fieldset>

      <Turnstile />
      <FormResult ok={state.ok} message={state.message} />

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Sending…" : "Join the next cohort"}
      </Button>
    </form>
  );
}
