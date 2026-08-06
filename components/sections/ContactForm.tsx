"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

/* Formspree carries the submissions. It is a third-party POST from the
   browser, which is what lets this site stay a pure static export with no
   backend to run, pay for, or keep patched. */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykozqlp";

type Status = "idle" | "sending" | "sent" | "error";

const interests = [
  "Personal Growth",
  "Basic Counselling",
  "Leadership Development",
  "Workplace Wellness",
  "Community Counsellor Programme",
  "Partnership or Sponsorship",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-emerald/30 bg-emerald/5 p-10 text-center">
        <CheckCircle2 className="mx-auto text-emerald" size={40} />
        <h3 className="mt-5 font-heading text-xl font-bold text-ink">
          Thank you — your message is on its way
        </h3>
        <p className="mt-3 leading-relaxed text-ink-muted">
          We will get back to you as soon as we can. If it is urgent, WhatsApp
          is the fastest way to reach us.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 text-sm font-semibold text-cyan underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-cyan";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">
            Your name
          </label>
          <input id="name" name="name" required autoComplete="name" className={inputClass} />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-ink">
            Phone <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="interest" className="mb-2 block text-sm font-semibold text-ink">
            I am interested in
          </label>
          <select id="interest" name="interest" defaultValue="" className={inputClass}>
            <option value="" disabled>
              Choose one
            </option>
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${inputClass} resize-y`}
          placeholder="Tell us a little about what you are looking for."
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-xl bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          That did not send. Please try again, or reach us on WhatsApp or by
          email — both are listed alongside this form.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-emerald px-7 py-4 font-semibold text-white shadow-xl shadow-cyan/25 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <Send size={17} />
      </button>
    </form>
  );
}
