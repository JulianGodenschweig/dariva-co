import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Inner-page opening. Deliberately not a second hero: no canvas, no poster,
 * no image. One idea per screen — the headline and its lede, with air.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="px-(--spacing-gutter) pt-24 pb-(--spacing-section) md:pt-32">
      <div className="mx-auto w-full max-w-[78rem]">
        <Reveal>
          {eyebrow ? <p className="text-micro mb-8 text-signal">{eyebrow}</p> : null}
          <h1 className="text-display-xl max-w-[18ch] text-ink">{title}</h1>
          {lede ? <p className="text-lede mt-10 max-w-[52ch]">{lede}</p> : null}
          {children ? <div className="mt-12">{children}</div> : null}
        </Reveal>
      </div>
    </section>
  );
}
