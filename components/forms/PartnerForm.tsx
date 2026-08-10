"use client";

import { useActionState } from "react";
import { submitPartnerEnquiry } from "@/app/actions";
import { IDLE_STATE } from "@/lib/validation";
import { Field, Honeypot, FormResult } from "./Field";
import { Turnstile } from "./Turnstile";
import { Button } from "@/components/ui/Button";

const TYPES = [
  { value: "government", label: "Government" },
  { value: "ngo", label: "NGO" },
  { value: "business", label: "Business" },
  { value: "school", label: "School" },
  { value: "church", label: "Church" },
  { value: "donor", label: "Donor" },
  { value: "international", label: "International organisation" },
  { value: "other", label: "Other" },
];

export function PartnerForm({ id }: { id?: string }) {
  const [state, action, pending] = useActionState(submitPartnerEnquiry, IDLE_STATE);

  // React 19 resets an uncontrolled form once its action resolves, so a failed
  // submission would wipe everything typed. The action echoes the submitted
  // values back and they are re-applied here as defaults.
  const v = (name: string) => state.values?.[name] ?? "";

  return (
    <form id={id} action={action} noValidate className="flex max-w-[42rem] flex-col gap-6">
      <Honeypot />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Organisation" name="org_name" required errors={state.errors?.org_name}>
          {(p) => <input {...p} type="text" autoComplete="organization" defaultValue={v("org_name")} />}
        </Field>
        <Field label="Your name" name="contact_name" required errors={state.errors?.contact_name}>
          {(p) => <input {...p} type="text" autoComplete="name" defaultValue={v("contact_name")} />}
        </Field>
        <Field label="Email" name="email" required errors={state.errors?.email}>
          {(p) => (
            <input {...p} type="email" autoComplete="email" inputMode="email" defaultValue={v("email")} />
          )}
        </Field>
        <Field label="Phone" name="phone" errors={state.errors?.phone}>
          {(p) => <input {...p} type="tel" autoComplete="tel" inputMode="tel" defaultValue={v("phone")} />}
        </Field>
      </div>

      <Field
        label="What kind of organisation?"
        name="partnership_type"
        errors={state.errors?.partnership_type}
      >
        {(p) => (
          <select {...p} defaultValue={v("partnership_type")}>
            <option value="">Choose one</option>
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field
        label="What partnership do you have in mind?"
        name="message"
        required
        errors={state.errors?.message}
      >
        {(p) => (
          <textarea {...p} rows={6} className={`${p.className} resize-y`} defaultValue={v("message")} />
        )}
      </Field>

      <Turnstile />
      <FormResult ok={state.ok} message={state.message} />

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Sending…" : "Start a partnership conversation"}
      </Button>
    </form>
  );
}
