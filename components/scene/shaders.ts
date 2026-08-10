/**
 * GPGPU shaders for the propagation field.
 *
 * Positions live in a float texture, RGB = XYZ. The simulation pass reads the
 * previous frame's texture, eases toward the current blended target, and
 * writes to the other texture — classic ping-pong. The render pass reads the
 * result in the *vertex* shader and places each point.
 *
 * Copy never enters this file. Headlines are real DOM text over the canvas,
 * per BRIEF.md §3 — nothing legible is rendered in WebGL.
 */

/** Fullscreen triangle for the simulation pass. */
export const simVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

/**
 * Simulation. Curl noise gives organic drift so the field never looks
 * mechanical; the easing term makes particles lag the target and settle, which
 * is what reads as "resolving" rather than "snapping".
 */
export const simFragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uPrev;
  uniform sampler2D uTargetA;
  uniform sampler2D uTargetB;
  uniform float uMix;      // 0..1 between the two acts
  uniform float uTime;
  uniform float uEase;     // how fast a particle chases its target
  uniform float uDrift;    // curl noise amplitude
  uniform float uBreath;   // act 1 only: the slow breathing pulse

  varying vec2 vUv;

  // Simplex-ish gradient noise. Cheap, good enough for drift, and far smaller
  // than importing a noise library into the WebGL chunk.
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  vec3 curl(vec3 p) {
    const float e = 0.12;
    float n1 = snoise(vec3(p.x, p.y + e, p.z));
    float n2 = snoise(vec3(p.x, p.y - e, p.z));
    float n3 = snoise(vec3(p.x, p.y, p.z + e));
    float n4 = snoise(vec3(p.x, p.y, p.z - e));
    float n5 = snoise(vec3(p.x + e, p.y, p.z));
    float n6 = snoise(vec3(p.x - e, p.y, p.z));
    return normalize(vec3(n2 - n1 - n4 + n3, n4 - n3 - n6 + n5, n6 - n5 - n2 + n1));
  }

  void main() {
    vec3 prev = texture2D(uPrev, vUv).xyz;
    vec3 a = texture2D(uTargetA, vUv).xyz;
    vec3 b = texture2D(uTargetB, vUv).xyz;

    // smoothstep on the act mix so an act settles before the next begins,
    // rather than the field being in permanent transit.
    vec3 target = mix(a, b, smoothstep(0.0, 1.0, uMix));

    // The breathing pulse only has amplitude in act 1, where one point is
    // alone on screen and needs to read as alive rather than as a dead pixel.
    target *= 1.0 + uBreath * 0.16 * sin(uTime * 0.7);

    target += curl(target * 0.28 + uTime * 0.035) * uDrift;

    // Ease toward the target. No spring, no overshoot — wellness resolving,
    // not fireworks.
    vec3 next = prev + (target - prev) * uEase;

    gl_FragColor = vec4(next, 1.0);
  }
`;

/** Render pass. Reads the simulated position in the vertex shader. */
export const pointsVertexShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uPositions;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uTime;

  attribute vec2 aRef;   // where this particle lives in the position texture
  attribute float aSeed;

  varying float vDepth;
  varying float vSeed;

  void main() {
    vec3 pos = texture2D(uPositions, aRef).xyz;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuates with distance so the field has depth without fog.
    float twinkle = 0.85 + 0.15 * sin(uTime * 0.6 + aSeed * 30.0);
    gl_PointSize = uSize * uPixelRatio * twinkle * (10.0 / -mvPosition.z);

    vDepth = clamp(-mvPosition.z / 22.0, 0.0, 1.0);
    vSeed = aSeed;
  }
`;

/**
 * Fragment. Colour comes only from --signal, --signal-raw and --wash over
 * --paper — light on water, not a sci-fi HUD. The palette tokens are passed
 * in as uniforms so the scene follows the design system rather than hardcoding
 * a second copy of the brand colours.
 */
export const pointsFragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uSignal;
  uniform vec3 uSignalRaw;
  uniform vec3 uWash;
  uniform float uOpacity;

  varying float vDepth;
  varying float vSeed;

  void main() {
    // Round, soft-edged point. A square particle reads as a glitch.
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float alpha = smoothstep(0.25, 0.02, d);

    // Near particles carry the accent, far ones fall back toward --wash, so
    // depth is legible without a fog pass.
    vec3 near = mix(uSignalRaw, uSignal, vSeed * 0.6);
    vec3 color = mix(near, uWash, vDepth * 0.75);

    gl_FragColor = vec4(color, alpha * uOpacity * (1.0 - vDepth * 0.45));
  }
`;
