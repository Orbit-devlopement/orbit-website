# ORBIT — Website (separate repository)

A fast, accessible, server-rendered-as-static marketing site for the **ORBIT Developer Command Center** private pilot. This is **not** the authenticated dashboard; keep `Orbit-devlopement/orbit-dev-command-center` private.

## What's included

- Custom brand assets: scalable vector logo/icon, wordmark, favicon, 1200×630 Open Graph image.
- Four pre-rendered, crawlable pages: home, integrations, security, privacy overview.
- Responsive design with semantic HTML, skip link, accessible mobile navigation, keyboard focus, reduced-motion support and system fonts.
- Per-page titles, unique descriptions, canonical tags, Open Graph/Twitter sharing metadata, JSON-LD (WebSite, Organization, SoftwareApplication), `sitemap.xml`, `robots.txt`.
- No runtime JavaScript framework, tracking pixels, or third-party font requests. Performance-focused; actual Core Web Vitals must be measured after deployment.
- Honest beta messaging and no fabricated pricing, performance results or compliance certifications.

## Local preview

```bash
python3 -m http.server 4173
# open http://localhost:4173
```

## Production build

Provide the canonical public HTTPS website URL. Contact links are intentionally disabled until the owner provides a working public contact method.

```bash
SITE_URL=https://your-real-domain.com npm run build
```

Deploy `dist/` to a static host, e.g. Cloudflare Pages, Netlify, or Vercel. Set build command `npm run build`, output directory `dist`, and an environment variable `SITE_URL` in the hosting dashboard.

**Deployment:** configure clean-path rewrites for `/features/`, `/security/`, `/privacy/` if your host doesn't serve nested `index.html` automatically. Redirect HTTP to HTTPS and non-canonical www/non-www host to chosen primary host.

## SEO launch checklist

1. Replace placeholders by running `npm run build` using the real domain.
2. Ensure the site is reachable publicly over HTTPS with HTTP 200 on all four pages.
3. Submit `https://your-domain/sitemap.xml` in Google Search Console, verify ownership, and confirm indexing; sitemap generation alone doesn't guarantee SEO visibility.
4. Test generated schema with Schema Markup Validator; test on mobile, keyboard, VoiceOver, and Lighthouse/PageSpeed Insights (goal: good LCP, INP, and CLS).
5. Add country-specific privacy policy/terms, company details, legal imprint (Germany: Impressum), GDPR processing documentation, and functioning access request process before selling to customers.
6. If you add an authenticated app domain, prevent private dashboard URLs from being crawled and do not expose access tokens in public assets.

## Notes

- Marketing copy refers to features **in the private V6 pilot source**, not a launched service. OAuth, billing, complete onboarding, and public signups are not yet available.
- The privacy page is an overview, **not** a legally complete GDPR privacy notice.
- Do not claim specific Lighthouse scores without measuring the deployed domain.
- Keep the website in a **different** repo from the private ORBIT dashboard.

## Vercel

The static site has `vercel.json` with `npm run build`, `dist`, and security headers. Configure `SITE_URL` as the assigned production `.vercel.app` hostname or the real custom domain before deployment. For a production public launch, add a functioning contact method and complete the Germany-specific legal pages.
