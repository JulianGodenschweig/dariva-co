"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  allTopics,
  resourceTypes,
  resources,
  type Resource,
  type ResourceType,
} from "@/lib/resources";

export default function ResourceLibrary() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ResourceType | "All">("All");
  const [topic, setTopic] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (type !== "All" && r.type !== type) return false;
      if (topic && !r.topics.includes(topic)) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        (r.body ?? "").toLowerCase().includes(q) ||
        r.topics.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, type, topic]);

  const clearable = query || type !== "All" || topic;

  return (
    <div>
      {/* Controls */}
      <div className="sticky top-[72px] z-20 -mx-2 rounded-2xl bg-ink/85 px-2 py-4 backdrop-blur-md">
        <div className="relative">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="9" r="6" />
            <path d="m14 14 4 4" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, tips, guides and questions…"
            aria-label="Search resources"
            className="w-full rounded-full border border-sand/18 bg-sand/[0.04] py-4 pl-14 pr-5 text-cream placeholder:text-cream/35 focus:border-ochre/60 focus:outline-none"
          />
        </div>

        <div
          role="group"
          aria-label="Filter by resource type"
          className="mt-4 flex flex-wrap gap-2"
        >
          {(["All", ...resourceTypes] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                type === t
                  ? "border-ochre bg-ochre text-ink"
                  : "border-sand/18 text-cream/65 hover:border-sand/40 hover:text-cream"
              }`}
            >
              {t}
              {t !== "All" ? (
                <span className="ml-2 text-xs opacity-60">
                  {resources.filter((r) => r.type === t).length}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* Topic chips */}
      <div
        role="group"
        aria-label="Filter by topic"
        className="mt-6 flex flex-wrap gap-2"
      >
        {allTopics.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTopic(topic === t ? null : t)}
            aria-pressed={topic === t}
            className={`rounded-full px-3 py-1.5 text-xs transition-colors duration-200 ${
              topic === t
                ? "bg-teal text-ink"
                : "bg-sand/[0.05] text-cream/45 hover:bg-sand/10 hover:text-cream/75"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-b border-sand/10 pb-4">
        <p
          id="resource-count"
          aria-live="polite"
          className="text-sm text-cream/50"
        >
          {filtered.length} {filtered.length === 1 ? "resource" : "resources"}
        </p>
        {clearable ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setType("All");
              setTopic(null);
            }}
            className="text-sm text-ochre transition-opacity hover:opacity-70"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="py-20 text-center text-cream/45">
          Nothing matches that yet. Try a different word or clear the filters.
        </p>
      ) : (
        <ul
          aria-labelledby="resource-count"
          className="mt-2 divide-y divide-sand/10"
        >
          <AnimatePresence initial={false}>
            {filtered.map((r) => (
              <motion.li
                key={r.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ResourceRow
                  resource={r}
                  open={open === r.id}
                  onToggle={() => setOpen(open === r.id ? null : r.id)}
                  onTopic={setTopic}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}

function ResourceRow({
  resource,
  open,
  onToggle,
  onTopic,
}: {
  resource: Resource;
  open: boolean;
  onToggle: () => void;
  onTopic: (t: string) => void;
}) {
  const hasBody = Boolean(resource.body);

  const header = (
    <div className="flex flex-1 flex-col gap-2 text-left">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-sand/20 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-widest text-ochre">
          {resource.type}
        </span>
        {resource.readTime ? (
          <span className="text-xs text-cream/35">{resource.readTime}</span>
        ) : null}
      </div>
      <h3 className="font-display text-lg font-semibold text-cream transition-colors group-hover:text-ochre">
        {resource.title}
      </h3>
      <p className="max-w-2xl text-sm leading-relaxed text-cream/60">
        {resource.summary}
      </p>
    </div>
  );

  return (
    <div className="py-7">
      {resource.href ? (
        <Link href={resource.href} className="group flex items-start gap-6">
          {header}
          <span
            aria-hidden="true"
            className="mt-8 shrink-0 text-ochre transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          disabled={!hasBody}
          className="group flex w-full items-start gap-6 disabled:cursor-default"
        >
          {header}
          {hasBody ? (
            <span
              aria-hidden="true"
              className={`mt-8 shrink-0 text-ochre transition-transform duration-300 ${
                open ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          ) : (
            <span className="mt-8 shrink-0 text-xs text-cream/30">Soon</span>
          )}
        </button>
      )}

      <AnimatePresence initial={false}>
        {open && resource.body ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pt-5 leading-relaxed text-cream/75">
              {resource.body}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-4 flex flex-wrap gap-2">
        {resource.topics.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onTopic(t)}
            className="rounded-full bg-sand/[0.05] px-2.5 py-1 text-[0.7rem] text-cream/40 transition-colors hover:bg-sand/10 hover:text-cream/70"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
