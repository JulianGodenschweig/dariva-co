import Link from "next/link";
import { Button } from "@/components/ui";
import { nav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative isolate grain flex min-h-screen items-center overflow-hidden px-6 py-32 md:px-14 lg:px-20">
      <img
        src="/images/desert-road.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 -z-10 scrim-full" />

      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="eyebrow text-ochre">404</p>
        <h1 className="display-lg mt-6 text-cream">
          This path does not lead anywhere.
        </h1>
        <p className="lede mt-6 text-cream/70">
          The page you were looking for has moved or never existed. Everything
          else is still here.
        </p>

        <div className="mt-10 flex justify-center">
          <Button href="/">Back to home</Button>
        </div>

        <ul className="mt-14 flex flex-wrap justify-center gap-2.5">
          {nav.slice(1).map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex rounded-full border border-sand/20 px-5 py-2.5 text-sm text-cream/70 transition-colors hover:border-ochre hover:text-ochre"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
