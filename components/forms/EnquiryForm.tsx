"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/app/actions";
import { IDLE_STATE } from "@/lib/validation";
import { Field, Honeypot, FormResult } from "./Field";
import { Turnstile } from "./Turnstile";
import { Button } from "@/components/ui/Button";

const AUDIENCES = [
  { value: "individual", label: "An individual" },
  { value: "workplace", label: "A business or workplace" },
  { value: "government", label: "A government department" },
  { value: "faith", label: "A church or faith group" },
  { value: "school", label: "A school" },
  { value: "ngo", label: "An NGO" },
  { value: "donor", label: "A donor or funder" },
  { value: "other", label: "Something else" },
];

export function EnquiryForm({
  sourcePage,
  submitLabel = "Send enquiry",
  id,
}: {
  sourcePage: string;
  submitLabel?: string;
  id?: string;
}) {
  const [state, action, pending] = useActionState(submitEnquiry, IDLE_STATE);

  return (
    <form id={id} action={action} noValidate className="flex max-w-[42rem] flex-col gap-6">
      <Honeypot />
      <input type="hidden" name="source_page" value={sourcePage} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" name="name" required errors={state.errors?.name}>
          {(p) => <input {...p} type="text" autoComplete="name" />}
        </Field>
        <Field label="Email" name="email" required errors={state.errors?.email}>
          {(p) => <input {...p} type="email" autoComplete="email" inputMode="email" />}
        </Field>
        <Field label="Phone" name="phone" errors={state.errors?.phone}>
          {(p) => <input {...p} type="tel" autoComplete="tel" inputMode="tel" />}
        </Field>
        <Field label="Organisation" name="org" errors={state.errors?.org}>
          {(p) => <input {...p} type="text" autoComplete="organization" />}
        </Field>
      </div>

      <Field
        label="Who are you enquiring as?"
        name="audience_type"
        errors={state.errors?.audience_type}
        hint="This decides who picks your enquiry up."
      >
        {(p) => (
          <select {...p} defaultValue="">
            <option value="">Choose one</option>
            {AUDIENCES.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field
        label="What would you like to know?"
        name="message"
        required
        errors={state.errors?.message}
      >
        {(p) => <textarea {...p} rows={6} className={`${p.className} resize-y`} />}
      </Field>

      <Turnstile />
      <FormResult ok={state.ok} message={state.message} />

      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}
