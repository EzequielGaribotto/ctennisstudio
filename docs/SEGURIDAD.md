# Security — setup and maintenance (for Ezequiel / admins)

What protects ctenisstudio.com, what still needs a manual step, and how to keep it healthy.
(How to talk about this with Pablo, who is not technical: see "Security rules" in [CLAUDE.md](../CLAUDE.md).)

## What is in place

| Layer | Where | What it stops |
|---|---|---|
| Content Security Policy with a per-request nonce | [src/middleware.ts](../src/middleware.ts) | Injected scripts/handlers (XSS) can't run; only our scripts (carrying the request's nonce) and those they load. No `unsafe-inline`/`unsafe-eval` for scripts |
| Security headers (HSTS from Vercel, `nosniff`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) | [next.config.js](../next.config.js) | Clickjacking, MIME sniffing, referrer leaks, unneeded browser features |
| Cloudflare Turnstile on the contact form | [src/components/TurnstileWidget.tsx](../src/components/TurnstileWidget.tsx), [src/app/api/contact/route.ts](../src/app/api/contact/route.ts) | Bots flooding Pablo's inbox / burning the email quota |
| Server-side validation, escaping, honeypot, per-instance rate limit | `route.ts` | Malformed input, HTML in emails, simple abuse |
| Guarded key lookups `own()` | [src/lib/own.ts](../src/lib/own.ts) | `/services/constructor`-style tricks with inherited object keys |
| Google Maps loads only on click | [LocationSection.tsx](../src/app/contact/components/LocationSection.tsx) | Third-party (Google) cookies without consent |
| `npm run seguridad` | [scripts/seguridad.mjs](../scripts/seguridad.mjs) | Vulnerable dependencies, leaked keys, risky code, protections removed, unpinned tools; `--live` probes production |
| `eslint-plugin-security` | [eslint.config.mjs](../eslint.config.mjs) | Risky patterns in website code (part of `npm run build`) |
| Pinned Chrome DevTools MCP | [.mcp.json](../.mcp.json) | Supply chain: a new tool release isn't executed on Pablo's PC until someone bumps and tests it |
| GitHub: Dependabot alerts + security updates (free on private repos) | repo settings | Known-vulnerable packages. Secret scanning, push protection, CodeQL and branch protection are **not available** on a private repo under the free plan (see "Private repository") |

## Manual setup (status as of 2026-10-18)

All three are **done**; the steps are kept for reference (new project, rotating keys, rebuilding the setup).

### 1. ✅ Contact-form human check (Cloudflare Turnstile — free) — done, verified live

Until this is done the form still works but has **no human check** (`npm run seguridad -- --live` warns about it).

1. Create a free Cloudflare account (https://dash.cloudflare.com/sign-up). The site does not have to be moved to Cloudflare.
2. Dashboard → **Turnstile** → **Add widget**:
   - **Widget name**: `ctenisstudio.com contact form`
   - **Hostname management**: add `ctenisstudio.com` (and `www.ctenisstudio.com` if it's used)
   - **Widget mode**: **Managed**
   - Leave pre-clearance off → **Create**
3. Copy the **Site key** (public) and the **Secret key** (private) shown after creating it.
4. Vercel → project → **Settings → Environment Variables**, add both, then **Save** each:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` = site key, type **Config**, environment **Production** only
   - `TURNSTILE_SECRET_KEY` = secret key, type **Secret**, environment **Production** only

   Production only on purpose: Turnstile rejects hostnames that aren't on the widget's list (e.g. `*.vercel.app` previews),
   and a secret without a site key would make every form submission fail.
5. **Redeploy** so the new values apply (they never apply to existing deployments, and the site key is baked in at build
   time): Deployments → latest Production deployment → **⋯ → Redeploy**.
6. Check: open `/contact/` (the "I'm not a robot" box appears), send a test message (it must arrive at Pablo's inbox), and
   `npm run seguridad -- --live` must print "✅ ... exige la verificación anti-spam".

Local testing with Cloudflare's dummy keys: build with `NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA` and run with
`TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` (always passes; `2x…AA` secret always fails).

### 2. ✅ Vercel Firewall rate limit (free on Hobby, 1 rule) — done (confirmed by Ezequiel)

The in-code counter is per serverless instance, so the real limit must live at the edge.
Vercel → project → **Firewall** (sidebar) → **Configure** (top right) → **+ New Rule**:

- Name: `contact-form-rate-limit`
- **If** → Request Path → *contains* → `/api/contact` (add Method equals POST if you like; all conditions must match)
- **Then** → **Rate Limit** (first time only: read the "Rate Limiting Pricing" dialog → Continue; Hobby includes 1,000,000 allowed requests)
- Strategy **Fixed Window**, **Time Window** 10 minutes (the Hobby maximum), **Request Limit** 5, key **IP**
- Action: leave **Default (429)** (or pick **Log** first to watch before blocking)
- **Save Rule** → **Review Changes** (top right) → **Publish**

(Counters are per region; that's fine for this purpose.) Optionally start with action **Log** to watch traffic first.

### 3. ✅ Two-factor authentication on both GitHub accounts (`EzequielGaribotto`, `pablogaris`) and on Vercel/Cloudflare — done (confirmed by Ezequiel)

Highest-impact item: Pablo's PC downloads and runs `scripts/setup-windows.ps1` from `main`, and Pablo's Claude pushes to `main`.
A hijacked GitHub account would mean code running on his computer and on the live site. GitHub → Settings → Password and authentication.

## Everyday operation

- **Before every publish** Claude runs `npm run build` (lint incl. security rules + photo check + build), `npm run seguridad`, and the Lighthouse gate (see [.claude/skills/publicar/SKILL.md](../.claude/skills/publicar/SKILL.md)). After the push: `npm run seguridad -- --live`.
- **Dependabot** will open PRs for vulnerable packages; merge them (run `npm run build` first). `npm audit fix` is fine for non-breaking fixes.
- **New advisories appear at any time** (a new one was found the same day this was set up) — that is why `seguridad` runs on every publish.
- **CodeQL results**: GitHub → Security → Code scanning. Triage anything high/critical.
- **Bumping the Chrome DevTools MCP**: change the version in `.mcp.json`, run the `probar` flow once (screenshots, console, Lighthouse), then commit.
- **Adding an external service** (analytics, chat, fonts CDN, another embed): it must be allowed in `src/middleware.ts` (CSP), reviewed for privacy/cookies, and agreed with Pablo.

## Private repository (GitHub + Vercel consequences)

The repo was made private. What changed:

- **Vercel Hobby does not deploy other people's commits on private repos.** Per Vercel's docs, on a Hobby team the commit author must be
  the account owner. Ezequiel's pushes deploy (verified); a push by `pablogaris` may be blocked. Options: (1) make the repo public again
  (collaboration is free on public repos), (2) move the project to a Vercel **Pro** team and add Pablo as a member (paid seat; Pablo must
  link his GitHub to a Vercel account), (3) keep Hobby and have Ezequiel publish for Pablo. After every push, the publish flow checks the
  `build-commit` marker on the live site to confirm that the deploy really happened.
- **No public download links**: `raw.githubusercontent.com/...` returns 404. Pablo's installer is the file `instalar-web.ps1`
  (copy of `scripts/setup-windows.ps1`) that Ezequiel sends him; `git clone` works once Pablo signs in as `pablogaris`.
- **GitHub features lost on a free private repo**: branch protection (force-push/deletion of `main` can no longer be blocked server-side;
  the local `.claude/settings.json` deny rules still apply), CodeQL code scanning, secret scanning and push protection.
  Still available: Dependabot alerts and security updates. Compensating controls in this repo: `npm run seguridad` (secret scan,
  risky-code patterns, `npm audit`) runs before every publish and `eslint-plugin-security` runs in every build. GitHub Pro (or making the
  repo public again) restores the rest.
- `docs/` links and the unauthenticated GitHub status API used by the old publish step no longer work; the publish flow uses the live site's
  `build-commit` meta tag instead.

## Rotating the Resend API key

`RESEND_API_KEY` was saved as a **Config** variable (readable by anyone with access to the Vercel project) and the same key is used by another
project. Rotate with no downtime (update Vercel *before* deleting the old key; Resend never shows a key again after creation):

1. Resend → **API Keys → Create API Key**, once per project: `ctenisstudio-web` and one for the other project. Permission **Sending access**,
   restricted to the project's domain if offered. One key per project limits the damage if one leaks and gives per-key logs.
2. Vercel → this project → **Settings → Environment Variables** → `RESEND_API_KEY` → **⋯ → Edit**: paste the new key, type **Secret**
   (a saved Secret can't be read back or converted to Config), environments **Production** (and Preview/Development only if you really use email there; Secrets are allowed in all three).
   If it appears as "All Environments", you can keep it that way or split it so Production has its own value.
3. Do the same for the other project with its own new key.
4. **Redeploy** both (Deployments → latest Production → **⋯ → Redeploy**). Old deployments keep the old key until redeployed.
5. Test: send a message through the contact form of each project and confirm the email arrives.
6. Only then, in Resend → API Keys → **⋯ → Remove API key** the old shared key.

If the other project can't be updated right now, rotate this project only and leave the old key alive for the other one: it is then no
longer shared, which already reduces the exposure. Rotate the other one later.

## Known trade-offs

- **All pages are rendered per request** (needed so each visit gets a fresh CSP nonce). Pages are no longer served from Vercel's CDN cache, so first byte is slower than static HTML (measure with `curl -w '%{time_starttransfer}'`) and every visit counts as a function invocation (Hobby includes 1M/month — fine for this site).
- `style-src` keeps `'unsafe-inline'` (React inline `style=` attributes can't carry a nonce; styles can't execute code).
- `'strict-dynamic'` means scripts created by already-trusted scripts are trusted; the CSP defends against injected markup, not against flaws in our own DOM code.
- Experimental Next.js SRI (hash-based CSP that keeps static pages) was tried and does **not** work here: App Router inline scripts (RSC payload) stay blocked and the page never hydrates.
