/**
 * A single mutable scroll value, written by the scroll driver and read inside
 * R3F's useFrame.
 *
 * This is the seam that keeps the "one loop" rule intact — BRIEF.md §9. GSAP's
 * ticker drives Lenis, Lenis drives ScrollTrigger, and ScrollTrigger writes
 * here. R3F keeps its own render loop and reads this value. Nothing calls
 * renderer.render() from the GSAP ticker, which is the double-RAF bug.
 */
export const scrollProgress = { current: 0 };
