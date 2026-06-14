"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykozqlp";

function FloatingLabelInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        autoComplete={type === "email" ? "email" : "name"}
        className={cn(
          "peer w-full rounded-2xl border-2 bg-white px-5 pt-6 pb-3 text-base text-text transition-all duration-200",
          "focus:outline-none",
          error
            ? "border-red-400 focus:border-red-500"
            : "border-primary/15 focus:border-primary"
        )}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute left-5 top-1/2 -translate-y-1/2 text-base transition-all duration-200 pointer-events-none",
          "peer-focus:top-3 peer-focus:text-xs peer-focus:-translate-y-0",
          hasValue && "top-3 text-xs -translate-y-0",
          error ? "text-red-400" : "text-text-muted"
        )}
      >
        {label}
      </label>
      {error && (
        <p className="mt-1.5 text-sm text-red-500 px-1">{error}</p>
      )}
    </div>
  );
}

export function Waitlist() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string }>({});

  function validate(): boolean {
    const errors: { name?: string; email?: string } = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("_subject", "New Dariva.co Waitlist Signup");

    fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    }).catch(() => {});

    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <section className="section-pad bg-deep reveal" id="waitlist">
      <div className="container-page relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] opacity-70">
            Stay Connected
          </p>
          <h2
            className="font-heading font-bold tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.2, color: 'white' }}
          >
            Be part of the movement.
          </h2>
          <p className="mt-5 text-lg leading-relaxed opacity-80 max-w-xl mx-auto">
            Sign up for updates on Dariva.co&apos;s pilot programme, community impact, partnership opportunities, and ways to get involved.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 mx-auto max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-2xl bg-card border border-primary/10 p-10 text-center shadow-lg"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle2 size={48} className="mx-auto text-[#1A237E]" />
                </motion.div>
                <h3 className="mt-5 text-2xl font-bold text-text">
                  Submitted, thanks!
                </h3>
                <p className="mt-3 text-base text-text-muted">
                  We&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                className="rounded-2xl bg-card border border-primary/10 p-8 shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                noValidate
              >
                <div className="space-y-5">
                  <FloatingLabelInput
                    id="name"
                    label="Full Name"
                    value={name}
                    onChange={setName}
                    error={fieldErrors.name}
                  />
                  <FloatingLabelInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    error={fieldErrors.email}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-60 min-h-[48px]"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Stay Updated <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-text-light">
                  No spam, ever. We&apos;ll only send meaningful updates about
                  Dariva.co&apos;s launch and progress.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
