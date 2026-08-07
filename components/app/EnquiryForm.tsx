"use client";

import { useMemo, useState } from "react";
import { org } from "@/lib/site";

/**
 * The site is a static export with no backend, so this form does not pretend to
 * POST anywhere. It validates in the browser, then hands a fully composed
 * message to the visitor's mail client or WhatsApp. Nothing is silently
 * swallowed, which matters more here than a fake success state.
 */

const interests = [
  "Personal Growth",
  "Basic Counselling",
  "Leadership Development",
  "Workplace / Business Wellness",
  "Community Counsellor Programme",
  "Partnership or Sponsorship",
  "Something else",
] as const;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<string>(interests[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);

  const validate = (): Errors => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next.email = "Please enter a valid email address.";
    if (message.trim().length < 10)
      next.message = "A sentence or two helps us point you the right way.";
    return next;
  };

  const composed = useMemo(() => {
    const lines = [
      `Name: ${name || "—"}`,
      organisation ? `Organisation: ${organisation}` : null,
      `Email: ${email || "—"}`,
      phone ? `Phone: ${phone}` : null,
      `Interested in: ${interest}`,
      "",
      message,
    ].filter(Boolean);
    return lines.join("\n");
  }, [name, organisation, email, phone, interest, message]);

  const subject = `Dariva.co enquiry — ${interest}`;

  const handle = (channel: "email" | "whatsapp") => {
    setTouched(true);
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document
        .querySelector<HTMLElement>("[data-invalid='true']")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (channel === "email") {
      window.location.href = `mailto:${org.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(composed)}`;
    } else {
      window.open(
        `${org.whatsapp}?text=${encodeURIComponent(composed)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  const err = (key: keyof Errors) => (touched ? errors[key] : undefined);

  const field =
    "w-full rounded-xl border bg-mist/[0.03] px-5 py-3.5 text-cream placeholder:text-cream/30 transition-colors focus:outline-none";
  const ok = "border-mist/18 focus:border-azure/60";
  const bad = "border-red-400/60 focus:border-red-400";

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handle("email");
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div data-invalid={Boolean(err("name"))}>
          <label htmlFor="name" className="mb-2 block text-sm text-cream/70">
            Your name <span className="text-azure">*</span>
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(err("name"))}
            aria-describedby={err("name") ? "name-error" : undefined}
            className={`${field} ${err("name") ? bad : ok}`}
            placeholder="Full name"
          />
          {err("name") ? (
            <p id="name-error" className="mt-2 text-sm text-red-400">
              {err("name")}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="org" className="mb-2 block text-sm text-cream/70">
            Organisation <span className="text-cream/35">(optional)</span>
          </label>
          <input
            id="org"
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
            className={`${field} ${ok}`}
            placeholder="Company, school, church, NGO…"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div data-invalid={Boolean(err("email"))}>
          <label htmlFor="email" className="mb-2 block text-sm text-cream/70">
            Email <span className="text-azure">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(err("email"))}
            aria-describedby={err("email") ? "email-error" : undefined}
            className={`${field} ${err("email") ? bad : ok}`}
            placeholder="you@example.com"
          />
          {err("email") ? (
            <p id="email-error" className="mt-2 text-sm text-red-400">
              {err("email")}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm text-cream/70">
            Phone <span className="text-cream/35">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${field} ${ok}`}
            placeholder="+264 …"
          />
        </div>
      </div>

      <div>
        <label htmlFor="interest" className="mb-2 block text-sm text-cream/70">
          What are you interested in?
        </label>
        <select
          id="interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className={`${field} ${ok} appearance-none`}
        >
          {interests.map((i) => (
            <option key={i} value={i} className="bg-ink text-cream">
              {i}
            </option>
          ))}
        </select>
      </div>

      <div data-invalid={Boolean(err("message"))}>
        <label htmlFor="message" className="mb-2 block text-sm text-cream/70">
          Your message <span className="text-azure">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(err("message"))}
          aria-describedby={err("message") ? "message-error" : undefined}
          className={`${field} ${err("message") ? bad : ok} resize-y`}
          placeholder="Tell us a little about what you are looking for…"
        />
        {err("message") ? (
          <p id="message-error" className="mt-2 text-sm text-red-400">
            {err("message")}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2.5 rounded-full bg-azure px-8 py-4 font-semibold text-ink transition-all duration-300 hover:bg-azure-light hover:shadow-[0_0_36px_-6px_rgba(42,168,246,0.6)]"
        >
          Send by email <span aria-hidden="true">→</span>
        </button>
        <button
          type="button"
          onClick={() => handle("whatsapp")}
          className="inline-flex items-center gap-2.5 rounded-full border border-royal/45 px-8 py-4 font-semibold text-royal-light transition-colors duration-300 hover:bg-royal/10"
        >
          Send on WhatsApp
        </button>
      </div>

      <p className="pt-2 text-xs leading-relaxed text-cream/40">
        This form opens your own email app or WhatsApp with the message already
        written — so you always keep a copy of what you sent. Prefer to write
        directly?{" "}
        <a
          href={`mailto:${org.email}`}
          className="text-azure underline-offset-4 hover:underline"
        >
          {org.email}
        </a>
      </p>
    </form>
  );
}
