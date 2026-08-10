import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

/** Explains what happened and what to do. It does not apologise. */
export default function NotFound() {
  return (
    <Section ground="paper">
      <p className="text-micro mb-8 text-signal">404</p>
      <h1 className="text-display-l max-w-[18ch] text-ink">
        That page is not here
      </h1>
      <p className="text-lede mt-8">
        The address may have changed, or the link that brought you here may be old.
        Everything on the site is reachable from these three places.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <ButtonLink href="/" variant="primary">
          Go to the home page
        </ButtonLink>
        <ButtonLink href="/programmes" variant="ghost">
          See the programme
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Contact us
        </ButtonLink>
      </div>
    </Section>
  );
}
