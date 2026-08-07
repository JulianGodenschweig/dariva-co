# Deploying Dariva.co

The site is a **static export** — `npm run build` writes a complete, self-contained
site to `out/`. There is no server, no database and no runtime environment
variables, so any static host will serve it.

Everything in this repo is already configured. Each option below needs the
repository connected once on the host's side; after that every push to `main`
deploys automatically.

---

## Option A — Cloudflare Pages (recommended)

Free, fast globally, unlimited bandwidth, free SSL, and straightforward DNS
if you later point a custom domain at it.

1. Go to <https://dash.cloudflare.com> → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git**.
2. Authorise GitHub and pick **JulianGodenschweig/dariva-co**.
3. Set:

   | Field | Value |
   |---|---|
   | Production branch | `main` |
   | Framework preset | `Next.js (Static HTML Export)` |
   | Build command | `npm run build` |
   | Build output directory | `out` |

4. **Save and Deploy.** First build takes about 2 minutes.

You get a live URL at `https://<project>.pages.dev`.

## Option B — Netlify

`netlify.toml` in the repo root already carries the build settings, so Netlify
fills them in for you.

1. Go to <https://app.netlify.com> → **Add new site** → **Import an existing project**.
2. Choose GitHub and pick **JulianGodenschweig/dariva-co**.
3. Confirm the branch is `main`. Build command (`npm run build`) and publish
   directory (`out`) are read from `netlify.toml` — leave them as shown.
4. **Deploy site.**

You get a live URL at `https://<project>.netlify.app`.

## Option C — GitHub Pages

The workflow at `.github/workflows/deploy-pages.yml` is already correct and its
last run passed. It is **not currently serving**, because the repository's Pages
source is set to *Deploy from a branch*, which runs Jekyll over the repo and
publishes the README instead of the built app.

To use it: repo **Settings → Pages → Build and deployment → Source** →
change to **GitHub Actions**. The next push publishes to
`https://juliangodenschweig.github.io/dariva-co/`.

Note that Pages serves from a `/dariva-co/` subpath, which the build handles via
`GITHUB_PAGES=true` (see `next.config.ts` and `lib/asset.ts`). Cloudflare and
Netlify serve from the root and need no base path.

---

## Pointing a custom domain

Once a host is connected, add the domain in that host's dashboard first — it
will show you the exact records. In general:

| Record | Host | Points to |
|---|---|---|
| `CNAME` | `www` | the host's target (`<project>.pages.dev` / `<project>.netlify.app`) |
| `A` or `ALIAS`/`ANAME` | `@` (apex) | whatever the host specifies for apex domains |

Cloudflare Pages issues SSL automatically. Netlify does too via Let's Encrypt,
usually within a few minutes of the DNS resolving.

If the domain currently points at a different host, update the records at the
registrar and allow for DNS propagation before expecting the new site.

---

## Moving this repo to the Kalahari-Labs organisation

This could not be done automatically: creating a repo under `Kalahari-Labs`
returns `403 Resource not accessible by integration`, because the Claude GitHub
App is not installed on that organisation.

To enable it, an org owner needs to install/authorise the GitHub App for
**Kalahari-Labs** (GitHub → org **Settings → GitHub Apps**, or via the Claude
GitHub settings). After that a new session can create and push to org repos
directly.

To move it yourself in the meantime, either:

**Transfer** — repo **Settings → General → Danger Zone → Transfer ownership**,
and choose `Kalahari-Labs`. This keeps all history, issues and stars, and
leaves a redirect from the old URL.

**Or mirror into a fresh repo:**

```bash
# create an empty Kalahari-Labs/dariva-web on GitHub first, then:
git clone --bare https://github.com/JulianGodenschweig/dariva-co.git
cd dariva-co.git
git push --mirror https://github.com/Kalahari-Labs/dariva-web.git
```

Re-connect the host to the new repository afterwards.

---

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```

To preview exactly what a host will serve, build and then serve `out/` with any
static file server that resolves `/about` to `about.html`.
