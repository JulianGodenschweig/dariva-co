import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-navy-ink">
      <div className="aurora opacity-50" aria-hidden="true" />

      <div className="container-page relative z-10 py-32 text-center">
        <p className="eyebrow text-cyan-bright">404</p>
        <h1 className="t-h1 mx-auto mt-5 max-w-2xl text-white">
          We could not find that page
        </h1>
        <p className="t-lead mx-auto mt-6 max-w-xl text-white/60">
          The link may be out of date. Everything we offer is one step away.
        </p>

        <div className="mt-11 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-cyan to-emerald px-7 py-4 font-semibold text-white shadow-xl shadow-cyan/25 transition-transform hover:scale-[1.03]"
          >
            Back to home
          </Link>
          <Link
            href="/programmes"
            className="rounded-full border border-white/20 px-7 py-4 font-semibold text-white/90 transition-colors hover:border-white/40 hover:bg-white/5"
          >
            See our programmes
          </Link>
        </div>
      </div>
    </section>
  );
}
