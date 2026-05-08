import Link from "next/link";

export default function NotFound() {
  return (
    <section className="aurora min-h-[70vh] py-24">
      <div className="container-page text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0a8f9c]">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-[#0d2233]">This page is not here.</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#5e7384]">Return to Dariva.co's main story and continue from there.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-[#0d2233] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0a8f9c]">
          Go Home
        </Link>
      </div>
    </section>
  );
}
