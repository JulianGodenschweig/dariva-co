import sharp from "sharp";
import { mkdir } from "node:fs/promises";

/**
 * Generates the Tier C hero poster: a static image of the resolved act-4
 * field, which becomes the LCP element on every device that does not get WebGL.
 *
 * It reproduces the act-4 target generation from components/scene/targets.ts
 * and projects it with the same camera, so the poster is the scene's final
 * state rather than a stand-in that looks like something else.
 *
 * Run: npm run poster
 */

const WIDTH = 1600;
const HEIGHT = 900;

// Palette tokens — must match app/globals.css.
const PAPER = { r: 0xfb, g: 0xfc, b: 0xfd };
const SIGNAL = { r: 0x00, g: 0x7a, b: 0xbf };
const SIGNAL_RAW = { r: 0x28, g: 0xa8, b: 0xf0 };
const WASH = { r: 0xe8, g: 0xf1, b: 0xf8 };

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedCentres(rand, count, spread) {
  const centres = [];
  for (let i = 0; i < count; i++) {
    const angle = i * 2.399963;
    const radius = spread * Math.sqrt(i / Math.max(1, count - 1));
    centres.push({
      x: Math.cos(angle) * radius,
      y: (rand() - 0.5) * spread * 0.28,
      z: Math.sin(angle) * radius * 0.55,
    });
  }
  return centres;
}

function buildAct4(size) {
  const count = size * size;
  const rand = mulberry32(0x0a219a);
  // Must match targets.ts exactly: normalised to the unit sphere, or the
  // clusters render as cubes.
  const jitter = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x = 0;
    let y = 0;
    let z = 0;
    let len = 0;
    do {
      x = rand() * 2 - 1;
      y = rand() * 2 - 1;
      z = rand() * 2 - 1;
      len = Math.hypot(x, y, z);
    } while (len > 1 || len < 1e-4);
    jitter[i * 3] = x / len;
    jitter[i * 3 + 1] = y / len;
    jitter[i * 3 + 2] = z / len;
  }

  const centres = seedCentres(mulberry32(37), 34, 7.4);
  const points = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const c = centres[i % centres.length];
    const rR = 0.75 * Math.cbrt(rand());
    // Cluster radius stays well under the centre spacing, otherwise the
    // clusters merge and the field reads as one undifferentiated smudge
    // instead of many communities.
    points[i * 3] = c.x + jitter[i * 3] * rR * 0.72;
    points[i * 3 + 1] = c.y + jitter[i * 3 + 1] * rR * 0.6;
    points[i * 3 + 2] = c.z + jitter[i * 3 + 2] * rR * 0.72;
  }
  return { points, count };
}

/**
 * Camera at the end of the scroll: matches Scene.tsx at progress = 1.
 *
 * Raised above the field and looking down at it. Level with it the field is a
 * flat plane seen edge-on, which projects to a featureless horizontal band —
 * the cluster structure only exists if you can see across it.
 */
const CAM = { x: 0, y: 3.6, z: 12.2 };
const TARGET = { x: 0, y: -0.15, z: 0 };
const FOV = 42;

/** Right-handed lookAt basis, built once. */
const VIEW = (() => {
  const f = norm(sub(TARGET, CAM)); // forward
  const r = norm(cross(f, { x: 0, y: 1, z: 0 })); // right
  const u = cross(r, f); // true up
  return { f, r, u };
})();

function sub(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}
function cross(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}
function dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
function norm(v) {
  const l = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / l, y: v.y / l, z: v.z / l };
}

function project(x, y, z) {
  const rel = sub({ x, y, z }, CAM);
  const depth = dot(rel, VIEW.f);
  if (depth <= 0.1) return null;

  const f = HEIGHT / 2 / Math.tan(((FOV / 2) * Math.PI) / 180);
  return {
    sx: WIDTH / 2 + (dot(rel, VIEW.r) * f) / depth,
    sy: HEIGHT / 2 - (dot(rel, VIEW.u) * f) / depth,
    depth,
  };
}

async function main() {
  const { points, count } = buildAct4(256);
  const buf = Buffer.alloc(WIDTH * HEIGHT * 3);

  // Paper ground.
  for (let i = 0; i < WIDTH * HEIGHT; i++) {
    buf[i * 3] = PAPER.r;
    buf[i * 3 + 1] = PAPER.g;
    buf[i * 3 + 2] = PAPER.b;
  }

  const rand = mulberry32(0x5eed);
  let drawn = 0;

  for (let i = 0; i < count; i++) {
    const seed = rand();
    const p = project(points[i * 3], points[i * 3 + 1], points[i * 3 + 2]);
    if (!p) continue;

    // Depth normalised over the range the field actually occupies, not the
    // camera's far plane — dividing by 22 pushed everything into the pale end
    // of the ramp and bleached the whole image.
    const vDepth = Math.min(1, Math.max(0, (p.depth - 5) / 12));

    // Same colour ramp as the fragment shader: near carries the accent, far
    // falls back toward --wash.
    const mixNear = seed * 0.6;
    const nr = SIGNAL_RAW.r + (SIGNAL.r - SIGNAL_RAW.r) * mixNear;
    const ng = SIGNAL_RAW.g + (SIGNAL.g - SIGNAL_RAW.g) * mixNear;
    const nb = SIGNAL_RAW.b + (SIGNAL.b - SIGNAL_RAW.b) * mixNear;

    const d = vDepth * 0.75;
    const cr = nr + (WASH.r - nr) * d;
    const cg = ng + (WASH.g - ng) * d;
    const cb = nb + (WASH.b - nb) * d;

    const alpha = (1 - vDepth * 0.45) * 0.9;
    const radius = Math.max(0.55, (2.2 * 10) / p.depth);
    const r2 = radius * radius;
    const x0 = Math.max(0, Math.floor(p.sx - radius));
    const x1 = Math.min(WIDTH - 1, Math.ceil(p.sx + radius));
    const y0 = Math.max(0, Math.floor(p.sy - radius));
    const y1 = Math.min(HEIGHT - 1, Math.ceil(p.sy + radius));

    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const ddx = x + 0.5 - p.sx;
        const ddy = y + 0.5 - p.sy;
        const dist2 = ddx * ddx + ddy * ddy;
        if (dist2 > r2) continue;
        // Soft edge, matching smoothstep(0.25, 0.02, d) in the shader.
        const falloff = 1 - Math.sqrt(dist2) / radius;
        const a = alpha * falloff * falloff;
        const o = (y * WIDTH + x) * 3;
        buf[o] = Math.round(buf[o] + (cr - buf[o]) * a);
        buf[o + 1] = Math.round(buf[o + 1] + (cg - buf[o + 1]) * a);
        buf[o + 2] = Math.round(buf[o + 2] + (cb - buf[o + 2]) * a);
      }
    }
    drawn++;
  }

  await mkdir("public", { recursive: true });

  const image = sharp(buf, { raw: { width: WIDTH, height: HEIGHT, channels: 3 } });

  const avif = await image
    .clone()
    .avif({ quality: 52, effort: 6 })
    .toFile("public/hero-poster.avif");

  // A WebP twin so the Next Image pipeline has something to fall back to on
  // the handful of browsers still without AVIF.
  const webp = await image.clone().webp({ quality: 72 }).toFile("public/hero-poster.webp");

  console.log(`poster: ${drawn} points drawn at ${WIDTH}x${HEIGHT}`);
  console.log(`  hero-poster.avif  ${(avif.size / 1024).toFixed(1)} KB`);
  console.log(`  hero-poster.webp  ${(webp.size / 1024).toFixed(1)} KB`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
