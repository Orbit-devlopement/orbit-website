import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const pages=['index.html','features/index.html','security/index.html','privacy/index.html'];
test('all pages have unique titles, canonical, descriptions, OG tags, and semantic main',async()=>{
 const titles=[];
 for(const p of pages){const s=await readFile(join(root,p),'utf8');
  assert.match(s,/<main id="main">/);assert.match(s,/<h1\b/);assert.match(s,/<meta name="description"/);
  assert.match(s,/rel="canonical" href="__SITE_URL__\//);assert.match(s,/property="og:image"/);
  assert.match(s,/<script type="application\/ld\+json">/);assert.match(s,/<nav /);
  const title=s.match(/<title>(.*?)<\/title>/)?.[1];assert.ok(title);titles.push(title);
 }
 assert.equal(new Set(titles).size,pages.length);
});
test('no unsubstantiated public price, customer stats, or external tracking',async()=>{
 for(const p of pages){const s=await readFile(join(root,p),'utf8');
  assert.doesNotMatch(s,/(google-analytics|googletagmanager|fbevents|gtag\()/i);
  assert.doesNotMatch(s,/(\$\d+\/mo|1000\+ customers|SOC 2 certified)/i);
 }
});
test('brand and OG image exist',async()=>{
 for(const p of ['assets/logo.svg','assets/logo-wordmark.svg','assets/favicon.svg','assets/og-orbit.png'])assert.ok((await stat(join(root,p))).size>100);
});
test('mobile navigation has accessible toggle',async()=>{
 const s=await readFile(join(root,'index.html'),'utf8');
 assert.match(s,/aria-expanded="false"/);assert.match(s,/aria-controls="mobile-menu"/);
});
