export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Prefixes a public-directory path with the deploy basePath.
 *
 * Next rewrites `href` on next/link and route URLs automatically, but it does
 * NOT rewrite `metadata.icons` entries or a string `src` on next/image. On the
 * github.io preview — served from /dariva-co rather than a domain root — those
 * unprefixed paths 404. Every reference to a file in public/ goes through here.
 */
export function asset(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
