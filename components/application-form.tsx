"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

type Errors = Partial<
  Record<
    | "name"
    | "email"
    | "phone"
    | "town"
    | "role"
    | "counselling"
    | "communityCounsellor"
    | "consent",
    string
  >
>;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykozqlp";

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};

    const required = [
      "name",
      "email",
      "phone",
      "town",
      "role",
      "counselling",
      "communityCounsellor",
    ] as const;
    required.forEach((field) => {
      if (!String(data.get(field) ?? "").trim())
        next[field] = "This field is required.";
    });

    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Use a valid email address.";
    if (data.get("consent") !== "on")
      next.consent = "Consent is required to submit.";

    setErrors(next);
    setSubmitError("");
    if (Object.keys(next).length === 0) {
      setSubmitting(true);
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        setSubmitting(false);

        if (response.ok) {
          event.currentTarget.reset();
          setSubmitted(true);
        } else {
          setSubmitError(
            "The form could not be submitted right now. Please contact Dariva.co directly by email or WhatsApp."
          );
        }
      } catch {
        setSubmitting(false);
        setSubmitError(
          "The form could not be submitted right now. Please contact Dariva.co directly by email or WhatsApp."
        );
      }
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface rounded-2xl p-8 text-center"
      >
        <CheckCircle2 className="mx-auto mb-4 text-[#0a8f9c]" size={42} />
        <h2 className="text-2xl font-semibold text-[#0d2233]">
          Application received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#5e7384]">
          Thank you for stepping forward. The Dariva.co team will review your
          details and follow up with next steps.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-full border border-[#dce9ec] px-5 py-2.5 text-sm font-semibold text-[#0d2233] hover:bg-[#f2f8f7]"
        >
          Submit another application
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="surface grid gap-5 rounded-2xl p-5 sm:p-8"
      noValidate
    >
      {/* Full Name */}
      <Field id="name" label="Full Name" error={errors.name} />

      {/* Email Address */}
      <Field id="email" label="Email Address" type="email" error={errors.email} />

      {/* Phone Number */}
      <Field id="phone" label="Phone Number" type="tel" error={errors.phone} />

      {/* Town dropdown */}
      <div>
        <label
          htmlFor="town"
          className="mb-2 block text-sm font-semibold text-[#0d2233]"
        >
          What town are you residing in?
        </label>
        <select
          id="town"
          name="town"
          className="w-full rounded-2xl border border-[#dce9ec] bg-white px-4 py-3 text-sm text-[#0d2233] shadow-sm transition focus:border-[#0a8f9c]"
          defaultValue=""
        >
          <option value="" disabled>
            Select your town
          </option>
          <option value="Rehoboth">Rehoboth</option>
          <option value="Mariental">Mariental</option>
          <option value="Luderitz">Luderitz</option>
        </select>
        {errors.town ? (
          <p className="mt-2 text-sm text-[#b9472d]">{errors.town}</p>
        ) : null}
      </div>

      {/* Trainer or Administrator */}
      <RadioGroup
        name="role"
        label="Are you applying to be a Trainer or Administrator in the Train the Trainer Programme?"
        options={[
          { value: "Trainer", label: "Trainer" },
          { value: "Administrator", label: "Administrator" },
        ]}
        error={errors.role}
      />

      {/* Do you want to be Counselled? */}
      <RadioGroup
        name="counselling"
        label="Do you want to be Counselled?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
        error={errors.counselling}
      />

      {/* Do you want to be trained to become a Community Counsellor? */}
      <RadioGroup
        name="communityCounsellor"
        label="Do you want to be trained to become a Community Counsellor?"
        options={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
        error={errors.communityCounsellor}
      />

      {/* Message (optional) */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-[#0d2233]"
        >
          Message
          <span className="ml-1 font-normal text-[#5e7384]">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded-2xl border border-[#dce9ec] bg-white px-4 py-3 text-sm text-[#0d2233] shadow-sm transition focus:border-[#0a8f9c]"
        />
      </div>

      {/* Consent */}
      <div>
        <label className="flex gap-3 rounded-2xl border border-[#dce9ec] bg-[#fbfefd] p-4 text-sm leading-6 text-[#496373]">
          <input
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 accent-[#0a8f9c]"
          />
          <span>
            I consent to Dariva.co contacting me about this application and
            handling my information responsibly.
          </span>
        </label>
        {errors.consent ? (
          <p className="mt-2 text-sm text-[#b9472d]">{errors.consent}</p>
        ) : null}
      </div>

      {/* Submit error */}
      {submitError ? (
        <p className="rounded-2xl border border-[#f1c2b4] bg-[#fff6f3] p-4 text-sm leading-6 text-[#9d3e28]">
          {submitError}
        </p>
      ) : null}

      {/* Submit button */}
      <button
        disabled={submitting}
        className="rounded-full bg-[#0d2233] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0a8f9c] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
      <p className="text-center text-xs leading-6 text-[#5e7384]">
        Your details are used only for Dariva.co programme communication and
        application follow-up.
      </p>
    </form>
  );
}

/* ---------- Shared field components ---------- */

function Field({
  id,
  label,
  type = "text",
  error,
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#0d2233]"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className="w-full rounded-2xl border border-[#dce9ec] bg-white px-4 py-3 text-sm text-[#0d2233] shadow-sm transition focus:border-[#0a8f9c]"
      />
      {error ? (
        <p className="mt-2 text-sm text-[#b9472d]">{error}</p>
      ) : null}
    </div>
  );
}

function RadioGroup({
  name,
  label,
  options,
  error,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-semibold text-[#0d2233]">
        {label}
      </legend>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 rounded-2xl border border-[#dce9ec] bg-[#fbfefd] px-4 py-3 text-sm font-medium text-[#0d2233] transition hover:bg-[#f2f8f7] cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              className="h-4 w-4 accent-[#0a8f9c]"
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error ? (
        <p className="mt-2 text-sm text-[#b9472d]">{error}</p>
      ) : null}
    </fieldset>
  );
}
