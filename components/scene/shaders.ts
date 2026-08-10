/**
 * Shaders for the propagation field.
 *
 * Positions for the four acts live in float textures (RGB = XYZ), one texel per
 * particle. The vertex shader samples two of them and mixes by the scroll
 * offset, then layers curl noise so the field drifts organically rather than
 * sliding mechanically between two fixed states.
 *
 * ARCHITECTURE NOTE — this is not the ping-pong FBO feedback loop originally
 * planned. That version wrote positions into alternating render targets and
 * read the previous frame back as input. It produced nothing in this
 * environment: every simulation pass rendered empty, the targets stayed at
 * zero, and all 65k particles collapsed onto the origin. Sampling the act
 * textures directly in the vertex shader is what actually renders, costs one
 * fewer full-screen pass per frame, and needs no float render-target support
 * at all — which is one less thing to fail on a mid-range Android GPU.
 *
 * The "settling" quality that frame-to-frame feedback would have given comes
 * instead from smoothing the scroll value on the CPU before it reaches here,
 * so the field still lags the scroll and eases to rest.
 *
 * Copy never enters this file. Headlines are real DOM text over the canvas,
 * per BRIEF.md §3 — nothing legible is rendered in WebGL.
 */

const NOISE = /* glsl */ `
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
`;

export const pointsVertexShader = /* glsl */ `
  precision highp float;

  // All four acts are bound once and never reassigned. Swapping which Texture
  // object a sampler uniform points at, every frame, silently failed to take
  // effect — the field stayed frozen on act 1 while the scroll value was
  // demonstrably correct. Selecting in the shader removes that whole class of
  // bug and costs three extra texture fetches on a 16k–65k point draw.
  uniform sampler2D uAct0;
  uniform sampler2D uAct1;
  uniform sampler2D uAct2;
  uniform sampler2D uAct3;
  uniform float uStage;    // 0..3, the float position across the four acts
  uniform float uTime;
  uniform float uDrift;    // curl amplitude, widens as the field opens out
  uniform float uBreath;   // act 1 only: the slow pulse of one point alone
  uniform float uSize;
  uniform float uPixelRatio;

  attribute vec2 aRef;     // where this particle lives in the act textures
  attribute float aSeed;

  varying float vDepth;
  varying float vSeed;

  ${NOISE}

  void main() {
    vec3 p0 = texture2D(uAct0, aRef).xyz;
    vec3 p1 = texture2D(uAct1, aRef).xyz;
    vec3 p2 = texture2D(uAct2, aRef).xyz;
    vec3 p3 = texture2D(uAct3, aRef).xyz;

    float stage = clamp(uStage, 0.0, 3.0);
    // smoothstep within each act so one settles before the next begins,
    // rather than the field being in permanent transit.
    vec3 pos = mix(p0, p1, smoothstep(0.0, 1.0, clamp(stage, 0.0, 1.0)));
    pos = mix(pos, p2, smoothstep(0.0, 1.0, clamp(stage - 1.0, 0.0, 1.0)));
    pos = mix(pos, p3, smoothstep(0.0, 1.0, clamp(stage - 2.0, 0.0, 1.0)));

    // Breathing has amplitude only in act 1, where one point is alone on
    // screen and needs to read as alive rather than as a dead pixel.
    pos *= 1.0 + uBreath * 0.16 * sin(uTime * 0.7);

    pos += curl(pos * 0.28 + uTime * 0.035) * uDrift;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float twinkle = 0.85 + 0.15 * sin(uTime * 0.6 + aSeed * 30.0);
    gl_PointSize = uSize * uPixelRatio * twinkle * (10.0 / -mvPosition.z);

    vDepth = clamp((-mvPosition.z - 5.0) / 12.0, 0.0, 1.0);
    vSeed = aSeed;
  }
`;

/**
 * Colour comes only from --signal, --signal-raw and --wash over --paper —
 * light on water, not a sci-fi HUD. The palette tokens arrive as uniforms so
 * the scene follows the design system rather than holding a second copy of
 * the brand colours.
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
