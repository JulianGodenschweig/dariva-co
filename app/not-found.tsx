import Link from "next/link";

export default function NotFound() {
  return (
    <section className="aurora min-h-[70vh] py-24">
      <div className="container-page text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#00897b]">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-[#071822]">This page is not here.</h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#4e6878]">Return to Dariva.co's main story and continue from there.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-[#071822] px-6 py-3 text-sm font-semibold text-white hover:bg-[#00897b]">
          Go Home
        </Link>
      </div>
    </section>
  );
}
