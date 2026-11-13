import { cp, mkdir, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const root=resolve(import.meta.dirname,'..');
const dest=join(root,'dist');
const raw=process.env.SITE_URL?.trim().replace(/\/$/,'');
if (!raw || !/^https:\/\/[a-z0-9][a-z0-9.-]+(?::\d+)?$/i.test(raw) || /example\.|localhost|127\.0\.0\.1/.test(raw)) {
 console.error('Set SITE_URL to your real HTTPS domain, e.g. https://orbit.yourdomain.com');process.exit(1);
}
await rm(dest,{recursive:true,force:true});await mkdir(dest,{recursive:true});
await cp(join(root,'assets'),join(dest,'assets'),{recursive:true});
const paths=['/','/features/','/security/','/privacy/'];
for(const slug of paths){
 const local=slug==='/'?'index.html':slug.slice(1)+'index.html';
 const html=(await readFile(join(root,local),'utf8')).replaceAll('__SITE_URL__',raw);
 const out=join(dest,local);await mkdir(resolve(out,'..'),{recursive:true});await writeFile(out,html);
}
await writeFile(join(dest,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${raw}/sitemap.xml\n`);
await writeFile(join(dest,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(p=>`<url><loc>${raw}${p}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile(join(dest,'_headers'),`/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'none'; base-uri 'none'; object-src 'none'; form-action 'none'; frame-ancestors 'none'\n`);
console.log('ORBIT website generated in dist/ for',raw,'with',paths.length,'crawlable pages.');
