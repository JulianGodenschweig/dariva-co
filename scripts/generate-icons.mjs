/**
 * Generates the app icons and Open Graph card from the brand logos.
 *
 * Run with `npm run icons` after changing a source logo.
 *
 * The source files are RGB with no alpha channel — the wordmark sits on an
 * opaque white rectangle. Compositing them straight onto the brand navy would
 * paste a white box into the middle of every icon, so the white has to be
 * keyed out to transparency first.
 */
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const OUT = `${ROOT}public`;

const NAVY = { r: 13, g: 27, b: 42, alpha: 1 }; // --color-navy-deep

const WORDMARK = `${ROOT}1. Dariva.co Logo.png`;
const LOCKUP = `${ROOT}Logo Dariva.co #1.png`;

/**
 * Turns the white field transparent while keeping the artwork's own colour.
 *
 * The logos are saturated cyan and navy on white, so distance from white is a
 * clean alpha signal: white becomes fully transparent, the strokes stay fully
 * opaque, and antialiased edges land in between instead of fringing.
 */
async function keyOutWhite(path) {
  const { data, info } = await sharp(path)
    .trim({ threshold: 10 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const darkest = Math.min(data[i], data[i + 1], data[i + 2]);
    // 0 for white, 255 for a fully saturated stroke.
    const alpha = Math.min(255, (255 - darkest) * 1.8);
    data[i + 3] = alpha;
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

/** Square app icon: wordmark centred on brand navy. */
async function squareIcon(size, coverage, outfile) {
  const mark = await keyOutWhite(WORDMARK);

  const resized = await sharp(mark)
    .resize({ width: Math.round(size * coverage), fit: "inside" })
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: NAVY },
  })
    .composite([{ input: resized, gravity: "centre" }])
    .png()
    .toFile(`${OUT}/${outfile}`);

  console.log(`${outfile}  ${size}x${size}`);
}

/**
 * Open Graph card at the size social platforms actually crop to.
 *
 * Built from the wordmark plus live text rather than the ready-made lockup:
 * the lockup's tagline is navy, which disappears against a navy card. Setting
 * it as text lets it be white and legible.
 */
async function openGraph() {
  const mark = await keyOutWhite(WORDMARK);

  const resized = await sharp(mark)
    .resize({ width: 700, fit: "inside" })
    .toBuffer();

  const tagline = Buffer.from(
    `<svg width="1200" height="90" xmlns="http://www.w3.org/2000/svg">
       <text x="600" y="58" text-anchor="middle"
             font-family="sans-serif" font-size="32" letter-spacing="9"
             fill="#ffffff" fill-opacity="0.82">PURPOSE, PEOPLE, PLANET</text>
     </svg>`,
  );

  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: NAVY },
  })
    .composite([
      { input: resized, gravity: "north", top: 210, left: 250 },
      { input: tagline, top: 390, left: 0 },
    ])
    .png()
    .toFile(`${OUT}/og.png`);

  console.log("og.png  1200x630");
}

/**
 * Transparent wordmark for the navbar. The original logo.png is a 441x132
 * wordmark, so any square slot squashes it — this ships it at its own aspect
 * ratio with the white keyed out, so the cyan script sits on the dark bar.
 */
async function wordmark() {
  const mark = await keyOutWhite(WORDMARK);

  await sharp(mark)
    .resize({ width: 640, fit: "inside" })
    .png()
    .toFile(`${OUT}/wordmark.png`);

  const { width, height } = await sharp(`${OUT}/wordmark.png`).metadata();
  console.log(`wordmark.png  ${width}x${height}`);
}

await wordmark();
await squareIcon(192, 0.8, "icon-192.png");
await squareIcon(512, 0.8, "icon-512.png");
// Maskable icons get cropped to a circle on Android — keep art inside the
// 80% safe zone, which means a smaller mark than the standard icon.
await squareIcon(512, 0.56, "icon-maskable-512.png");
await squareIcon(180, 0.8, "apple-touch-icon.png");
await openGraph();
