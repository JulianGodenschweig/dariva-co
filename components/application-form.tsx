"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

type Errors = Partial<
  Record<
    | "name"
    | "surname"
    | "email"
    | "phone"
    | "town"
    | "role"
    | "consent",
    string
  >
>;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykozqlp";

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setErrors({});

    const data = new FormData(event.currentTarget);
    const next: Errors = {};

    const required = [
      "name",
      "surname",
      "email",
      "phone",
      "town",
      "role",
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

    if (Object.keys(next).length > 0) {
      setIsSubmitting(false);
      return;
    }

    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    }).catch(() => {});

    event.currentTarget.reset();
    setSubmitSuccess(true);
    setIsSubmitting(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="surface grid gap-5 rounded-2xl p-5 sm:p-8"
      noValidate
    >
      {/* Full Name */}
      <Field id="name" label="First Name" error={errors.name} />

      {/* Surname */}
      <Field id="surname" label="Surname" error={errors.surname} />

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
          <option value="Other">Other</option>
        </select>
        {errors.town ? (
          <p className="mt-2 text-sm text-[#b9472d]">{errors.town}</p>
        ) : null}
      </div>

      <RadioGroup
        name="role"
        label="What role are you applying for in the Train the Trainer Programme?"
        options={[
          { value: "Community Coach", label: "Community Coach" },
          { value: "Trainer", label: "Trainer" },
          { value: "Administrator", label: "Administrator" },
        ]}
        error={errors.role}
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

      {/* Submit button */}
      <button
        disabled={isSubmitting}
        className="rounded-full bg-[#0d2233] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0a8f9c] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
      <p className="text-center text-xs leading-6 text-[#5e7384]">
        Your details are used only for Dariva.co programme communication and
        application follow-up.
      </p>

      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 sm:p-5"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
          <p className="text-sm leading-6 text-green-700">
            Submitted, thanks! We&apos;ll get back to you soon.
          </p>
        </motion.div>
      )}
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
