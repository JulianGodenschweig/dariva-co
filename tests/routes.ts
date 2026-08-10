/** Every route in the brief, plus the labels used in report filenames. */
export const ROUTES = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/programmes", name: "programmes" },
  { path: "/programmes/personal-growth", name: "programmes-personal-growth" },
  { path: "/programmes/basic-counselling", name: "programmes-basic-counselling" },
  { path: "/programmes/leadership-development", name: "programmes-leadership-development" },
  { path: "/workplace", name: "workplace" },
  { path: "/community-counsellor", name: "community-counsellor" },
  { path: "/impact", name: "impact" },
  { path: "/partner", name: "partner" },
  { path: "/resources", name: "resources" },
  { path: "/contact", name: "contact" },
] as const;

export const BREAKPOINTS = [
  { width: 390, height: 844, name: "390x844-mobile" },
  { width: 834, height: 1112, name: "834x1112-tablet" },
  { width: 1440, height: 900, name: "1440x900-laptop" },
  { width: 1920, height: 1080, name: "1920x1080-desktop" },
] as const;
