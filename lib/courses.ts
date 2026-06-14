export type Course = { slug: string; title: string; blurb: string };

export const COURSE_BUCKET = "course-materials";

export const courses: Course[] = [
  {
    slug: "mental-wellness",
    title: "Mental Wellness & Personal Development",
    blurb: "Foundations of emotional wellness, self-awareness, and personal growth.",
  },
  {
    slug: "basic-counselling",
    title: "Basic Counselling",
    blurb: "Core counselling skills, ethics, active listening, and safe referral.",
  },
  {
    slug: "leadership",
    title: "Leadership Development",
    blurb: "Communication, facilitation, and community leadership skills.",
  },
];

export function courseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug);
}
