import { DataTexture, RGBAFormat, FloatType, NearestFilter, Vector3 } from "three";

/**
 * The four acts of "one person becomes many" — BRIEF.md §8.
 *
 *   Act 1  a single luminous point, alone, breathing
 *   Act 2  it emits — a small cluster forms (a household)
 *   Act 3  clusters multiply (a workplace, a community)
 *   Act 4  a wide, calm field that reads as a region, then stillness
 *
 * Each act is a full set of XYZ positions packed into a float texture, one
 * texel per particle. The simulation shader mixes between two of them.
 *
 * Generated analytically rather than sampled from geometry with
 * MeshSurfaceSampler: these targets are point fields, not surfaces. There is
 * no mesh to sample — a "household" is a cluster, not a shape — so loading
 * geometry to sample it would be bytes spent to reach the same distribution.
 * The propagation structure is also deterministic this way: cluster 7 in act 3
 * grows out of the same seed point every time, which is what makes the
 * sequence read as one thing spreading rather than four unrelated states.
 */

export type ActTextures = {
  textures: DataTexture[];
  dispose: () => void;
};

/** Deterministic PRNG — the same field every load, on every device. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeTexture(data: Float32Array, size: number) {
  // @types/three at this version types DataTexture's data as
  // ArrayBufferView<ArrayBuffer>, which TS 5.9's generic Float32Array does not
  // satisfy. The runtime contract is just "a typed array of the right length".
  const texture = new DataTexture(
    data as unknown as ArrayBufferView<ArrayBuffer>,
    size,
    size,
    RGBAFormat,
    FloatType,
  );
  texture.needsUpdate = true;
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  return texture;
}

/**
 * Seed points for the propagation. Act 2 grows one cluster, act 3 grows
 * several around it, act 4 spreads them across the field — but every cluster
 * traces back to the origin point of act 1.
 */
function seedCentres(rand: () => number, count: number, spread: number) {
  const centres: Vector3[] = [];
  for (let i = 0; i < count; i++) {
    // Golden-angle placement keeps the clusters evenly distributed without
    // the clumping a pure random scatter gives at low counts.
    const angle = i * 2.399963;
    const radius = spread * Math.sqrt(i / Math.max(1, count - 1));
    centres.push(
      new Vector3(
        Math.cos(angle) * radius,
        (rand() - 0.5) * spread * 0.28,
        Math.sin(angle) * radius * 0.55,
      ),
    );
  }
  return centres;
}

export function buildActTextures(size: number): ActTextures {
  const count = size * size;
  const rand = mulberry32(0x0a219a);

  // Per-particle jitter, reused across acts so a given particle keeps its
  // identity as the field morphs. Without this the transitions look like a
  // crossfade between two clouds instead of one cloud moving.
  //
  // Normalised to the unit sphere. Uniform per-axis jitter fills a *cube*, and
  // at these densities that is plainly visible — the clusters render as boxes.
  const jitter = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    let x = 0;
    let y = 0;
    let z = 0;
    let len = 0;
    // Rejection-sample inside the unit ball, then normalise — cheap, and it
    // avoids the pole clustering that naive spherical coordinates produce.
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

  const act1 = new Float32Array(count * 4);
  const act2 = new Float32Array(count * 4);
  const act3 = new Float32Array(count * 4);
  const act4 = new Float32Array(count * 4);

  const householdCentres = seedCentres(mulberry32(11), 1, 0);
  const communityCentres = seedCentres(mulberry32(23), 9, 2.4);
  const regionCentres = seedCentres(mulberry32(37), 34, 7.4);

  for (let i = 0; i < count; i++) {
    const o = i * 4;
    const jx = jitter[i * 3];
    const jy = jitter[i * 3 + 1];
    const jz = jitter[i * 3 + 2];

    // --- Act 1: one point. Every particle collapsed into a tight core. ---
    const coreR = 0.09 * Math.cbrt(rand());
    act1[o] = jx * coreR;
    act1[o + 1] = jy * coreR;
    act1[o + 2] = jz * coreR;
    act1[o + 3] = 1;

    // --- Act 2: a household. One soft sphere, still intimate. ---
    const h = householdCentres[0];
    const hR = 0.85 * Math.cbrt(rand());
    act2[o] = h.x + jx * hR * 2;
    act2[o + 1] = h.y + jy * hR * 1.5;
    act2[o + 2] = h.z + jz * hR * 2;
    act2[o + 3] = 1;

    // --- Act 3: clusters, with the original still at the centre. ---
    const c = communityCentres[i % communityCentres.length];
    const cR = 0.62 * Math.cbrt(rand());
    act3[o] = c.x + jx * cR * 0.85;
    act3[o + 1] = c.y + jy * cR * 0.7;
    act3[o + 2] = c.z + jz * cR * 0.85;
    act3[o + 3] = 1;

    // --- Act 4: a region. Wide and calm — a landscape, not a ball. Cluster
    // radius stays well under the centre spacing so the communities stay
    // legible as separate places rather than merging into one smudge. ---
    const r = regionCentres[i % regionCentres.length];
    const rR = 0.75 * Math.cbrt(rand());
    act4[o] = r.x + jx * rR * 0.72;
    act4[o + 1] = r.y + jy * rR * 0.6;
    act4[o + 2] = r.z + jz * rR * 0.72;
    act4[o + 3] = 1;
  }

  const textures = [
    makeTexture(act1, size),
    makeTexture(act2, size),
    makeTexture(act3, size),
    makeTexture(act4, size),
  ];

  return {
    textures,
    dispose: () => textures.forEach((t) => t.dispose()),
  };
}

/** Per-particle static attributes: uv into the position texture, plus a seed. */
export function buildParticleAttributes(size: number) {
  const count = size * size;
  const uvs = new Float32Array(count * 2);
  const seeds = new Float32Array(count);
  const rand = mulberry32(0x5eed);

  for (let i = 0; i < count; i++) {
    uvs[i * 2] = (i % size) / size + 0.5 / size;
    uvs[i * 2 + 1] = Math.floor(i / size) / size + 0.5 / size;
    seeds[i] = rand();
  }

  return { uvs, seeds, count };
}
