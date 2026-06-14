import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-24">
      <div className="container-page text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary/60">
          404
        </p>
        <h1 className="mt-4 font-heading font-bold tracking-tight text-text" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
          Page not found
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-deep hover:shadow-xl hover:shadow-primary/25 min-h-[48px]"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
