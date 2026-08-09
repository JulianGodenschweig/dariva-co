# Self-hosted fonts

All three are variable, Latin-subset, woff2 only. 61.8 KB total.

| File | Family | Licence | Source |
|---|---|---|---|
| `ClashDisplay-Variable.latin.woff2` | Clash Display | Fontshare Free Licence — free for commercial use | api.fontshare.com/v2/fonts/download/clash-display |
| `SpaceGrotesk-Variable.latin.woff2` | Space Grotesk | SIL Open Font Licence 1.1 | Google Fonts (v22) |
| `GeistMono-Variable.latin.woff2` | Geist Mono | SIL Open Font Licence 1.1 | Google Fonts (v6) |

Clash Display ships from Fontshare as a full-Unicode variable woff2 (28.7 KB).
It is subset here to the same Latin range Google Fonts uses, which brings it to
17.4 KB:

```
pyftsubset ClashDisplay-Variable.ttf \
  --output-file=ClashDisplay-Variable.latin.woff2 --flavor=woff2 \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,\
U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" \
  --layout-features="kern,liga,calt,ccmp,locl" --no-hinting --desubroutinize
```

`U+2191` and `U+2193` are kept deliberately — the nav's `↗` arrow and the
micro-chrome depend on them.

Loaded through `next/font/local` so the `@font-face` declarations are inlined
and the files are served from the same origin with an immutable cache header
(see `netlify.toml`). No external font requests at runtime.
