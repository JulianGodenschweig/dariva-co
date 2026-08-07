"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CRISIS_NOTE,
  DISCLAIMER,
  STORAGE_KEY,
  overallMessage,
  questions,
  scaleLabels,
  scoreAssessment,
  type Answers,
  type Result,
} from "@/lib/assessment";
import { programmes } from "@/lib/site";
import { Button, Eyebrow } from "@/components/ui";

type Stage = "intro" | "quiz" | "results";

export default function AssessmentApp() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<Result | null>(null);
  const [restored, setRestored] = useState<Result | null>(null);

  // Bring back a previous check-in so returning visitors can compare.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setRestored(JSON.parse(raw) as Result);
    } catch {
      // A blocked or corrupt store is not worth interrupting anyone over.
    }
  }, []);

  const total = questions.length;
  const current = questions[step];
  const answeredCount = Object.keys(answers).length;
  const progress = stage === "results" ? 100 : (answeredCount / total) * 100;

  const finish = useCallback((finalAnswers: Answers) => {
    const computed = scoreAssessment(finalAnswers);
    setResult(computed);
    setStage("results");
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(computed));
    } catch {
      // Persistence is a nicety here, never a requirement.
    }
  }, []);

  const answer = useCallback(
    (value: number) => {
      const next = { ...answers, [current.id]: value };
      setAnswers(next);
      if (step + 1 < total) {
        // A short beat so the selection is visible before advancing.
        window.setTimeout(() => setStep((s) => s + 1), 180);
      } else {
        window.setTimeout(() => finish(next), 180);
      }
    },
    [answers, current, step, total, finish],
  );

  // Number keys 1–5 answer the visible question.
  useEffect(() => {
    if (stage !== "quiz") return;
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= 5) answer(n);
      if (e.key === "ArrowLeft" && step > 0) setStep((s) => s - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, answer, step]);

  const reset = () => {
    setAnswers({});
    setStep(0);
    setResult(null);
    setStage("quiz");
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Progress rail */}
      <div className="sticky top-20 z-20 mb-12 h-[3px] w-full overflow-hidden rounded-full bg-mist/12">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-azure to-royal"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 24 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            <Eyebrow>Free • 3 minutes • Private</Eyebrow>
            <h1 className="display-lg mt-6 text-cream">
              The Wellness Check-In
            </h1>
            <p className="lede mt-6 text-cream/70">
              Fifteen short statements across five everyday capacities. At the
              end you get a picture of where you are strongest, where there is
              room to grow, and which Dariva.co programme fits you best.
            </p>

            <div className="mt-8 rounded-xl border border-mist/15 bg-mist/[0.03] p-6">
              <p className="text-sm leading-relaxed text-cream/70">
                <strong className="text-cream">Please read: </strong>
                {DISCLAIMER}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-cream/55">
                Your answers stay in this browser. Nothing is uploaded and
                nothing is sent to us.
              </p>
            </div>

            {restored ? (
              <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-royal/30 bg-royal/5 p-5">
                <p className="text-sm text-cream/75">
                  You completed a check-in on{" "}
                  {new Date(restored.completedAt).toLocaleDateString()} — you
                  scored {restored.overall}/100 overall.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setResult(restored);
                    setStage("results");
                  }}
                  className="rounded-full border border-royal/50 px-4 py-2 text-sm text-royal-light transition-colors hover:bg-royal/10"
                >
                  View those results
                </button>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => setStage("quiz")}
              className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-azure px-8 py-4 font-semibold text-ink transition-all duration-300 hover:bg-azure-light hover:shadow-[0_0_36px_-6px_rgba(42,168,246,0.6)]"
            >
              Start the check-in <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        )}

        {stage === "quiz" && (
          <motion.div
            key={`q-${step}`}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between">
              <p className="eyebrow text-azure">
                Question {step + 1} of {total}
              </p>
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="text-sm text-cream/50 transition-colors hover:text-cream"
                >
                  ← Back
                </button>
              ) : null}
            </div>

            <h2 className="display-sm mt-8 min-h-[4.5rem] text-cream md:min-h-[5.5rem]">
              {current.text}
            </h2>

            <div
              role="radiogroup"
              aria-label={current.text}
              className="mt-10 space-y-3"
            >
              {scaleLabels.map((label, i) => {
                const value = i + 1;
                const selected = answers[current.id] === value;
                return (
                  <button
                    key={label}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => answer(value)}
                    className={`flex w-full items-center gap-4 rounded-xl border px-6 py-4 text-left transition-all duration-200 ${
                      selected
                        ? "border-azure bg-azure/10 text-cream"
                        : "border-mist/15 bg-mist/[0.02] text-cream/75 hover:border-mist/35 hover:bg-mist/[0.05]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                        selected
                          ? "border-azure bg-azure text-ink"
                          : "border-mist/25 text-cream/45"
                      }`}
                    >
                      {value}
                    </span>
                    {label}
                  </button>
                );
              })}
            </div>

            <p className="mt-8 text-xs text-cream/35">
              Tip: press keys 1–5 to answer quickly.
            </p>
          </motion.div>
        )}

        {stage === "results" && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsView result={result} onRestart={reset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultsView({
  result,
  onRestart,
}: {
  result: Result;
  onRestart: () => void;
}) {
  const message = useMemo(
    () => overallMessage(result.overall),
    [result.overall],
  );
  const programme = programmes.find(
    (p) => p.slug === result.recommendedProgramme,
  );

  return (
    <div>
      <Eyebrow>Your check-in</Eyebrow>

      <div className="mt-8 flex flex-wrap items-end gap-6">
        <p className="font-display text-7xl font-bold leading-none text-azure">
          {result.overall}
          <span className="text-3xl text-cream/40">/100</span>
        </p>
        <p className="max-w-sm pb-2 text-sm text-cream/55">
          An overall reflection score across five capacities. It is a snapshot
          of today, not a fixed measure of you.
        </p>
      </div>

      <h2 className="display-sm mt-10 text-cream">{message.title}</h2>
      <p className="mt-4 leading-relaxed text-cream/70">{message.body}</p>

      {/* Dimension breakdown */}
      <div className="mt-12 space-y-6">
        {result.dimensions.map((d, i) => (
          <div key={d.dimension.id}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-base font-semibold text-cream">
                {d.dimension.name}
              </h3>
              <p className="shrink-0 text-sm text-cream/50">
                <span className="font-semibold text-cream">{d.score}</span>
                <span className="mx-2 text-cream/25">•</span>
                <span
                  className={
                    d.band === "Strong"
                      ? "text-azure-light"
                      : d.band === "Steady"
                        ? "text-azure"
                        : "text-royal-light"
                  }
                >
                  {d.band}
                </span>
              </p>
            </div>
            <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-mist/10">
              <motion.div
                className={`h-full rounded-full ${
                  // A single-hue ramp: brighter reads as stronger. Warning
                  // colours would be wrong here — a low score is a starting
                  // point, not a failure.
                  d.band === "Strong"
                    ? "bg-azure-light"
                    : d.band === "Steady"
                      ? "bg-azure"
                      : "bg-royal-light"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${d.score}%` }}
                transition={{
                  duration: 0.9,
                  delay: 0.12 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-cream/40">
              {d.dimension.blurb}
            </p>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      {programme ? (
        <div className="mt-14 overflow-hidden rounded-2xl border border-azure/30 bg-gradient-to-br from-azure/10 to-transparent">
          <div className="grid gap-0 md:grid-cols-5">
            <div className="md:col-span-3 md:p-9 p-7">
              <p className="eyebrow text-azure">Recommended for you</p>
              <h3 className="display-sm mt-4 text-cream">{programme.title}</h3>
              <p className="mt-3 text-sm text-cream/70">
                Your lowest area was{" "}
                <strong className="text-cream">
                  {result.focus.dimension.name}
                </strong>
                . {programme.tagline}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={`/programmes/${programme.slug}`}>
                  See the programme
                </Button>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-mist/25 px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-azure hover:text-azure"
                >
                  Ask a question
                </Link>
              </div>
            </div>
            <div className="relative min-h-[180px] md:col-span-2">
              <img
                src={programme.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/85 to-ink/25" />
            </div>
          </div>
        </div>
      ) : null}

      {/* Safety */}
      <div className="mt-10 rounded-xl border border-mist/15 bg-mist/[0.03] p-6">
        <p className="text-sm leading-relaxed text-cream/65">{DISCLAIMER}</p>
        <p className="mt-4 text-sm leading-relaxed text-azure-light">
          {CRISIS_NOTE}
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-full border border-mist/25 px-6 py-3 text-sm text-cream/80 transition-colors hover:border-azure hover:text-azure"
        >
          Take it again
        </button>
        <Link
          href="/programmes"
          className="rounded-full px-6 py-3 text-sm text-cream/60 transition-colors hover:text-azure"
        >
          Browse all programmes
        </Link>
      </div>
    </div>
  );
}
