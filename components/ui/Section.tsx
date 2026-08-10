import type { ReactNode } from "react";

/**
 * Section grounds — DESIGN.md §4.
 *
 * There is no alternating band pattern. The ground shifts once per page at
 * most, and on the home page it shifts at the point the site stops speaking
 * to a person and starts speaking to an institution.
 */
export type Ground = "paper" | "wash" | "ink";

const grounds: Record<Ground, string> = {
  paper: "bg-paper text-quiet",
  wash: "bg-wash text-quiet",
  ink: "bg-ink text-paper/75",
};

export function Section({
  children,
  ground = "paper",
  id,
  className,
  labelledBy,
}: {
  children: ReactNode;
  ground?: Ground;
  id?: string;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-ground={ground}
      className={[
        grounds[ground],
        "relative py-(--spacing-section) px-(--spacing-gutter)",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto w-full max-w-[78rem]">{children}</div>
    </section>
  );
}

/**
 * Section heading. The eyebrow is Geist Mono and is only passed where it marks
 * something genuinely indexed — see DESIGN.md §3 for the five permitted uses.
 */
export function SectionHead({
  id,
  eyebrow,
  title,
  lede,
  inverted = false,
  as: As = "h2",
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  inverted?: boolean;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <header className="max-w-[52rem]">
      {eyebrow ? (
        <p className={`text-micro mb-6 ${inverted ? "text-signal-raw" : "text-signal"}`}>
          {eyebrow}
        </p>
      ) : null}
      <As
        id={id}
        className={`${As === "h1" ? "text-display-xl" : "text-display-l"} ${
          inverted ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </As>
      {lede ? (
        <p className={`text-lede mt-8 ${inverted ? "text-paper/70" : "text-quiet"}`}>
          {lede}
        </p>
      ) : null}
    </header>
  );
}
