/**
 * Prefix a root-relative public asset with the deployment's base path.
 *
 * GitHub Pages serves this site from /dariva-co/, while dariva.co and Vercel
 * serve it from the root. next/link and next/image apply the base path
 * themselves, but a raw <img src="/images/…"> does not — it would resolve
 * against the domain root and 404 on Pages. Every <img> in the app routes its
 * src through here so the same code works on both.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  // Idempotent: the image components prefix their own src, so a caller that
  // also wraps the value must not end up with /dariva-co/dariva-co/…
  if (basePath && path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}
