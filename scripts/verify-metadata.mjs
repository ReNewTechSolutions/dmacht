import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Read the production build by default, or verify a supplied live origin.
const origin = process.argv[2];
const production = 'https://www.dmacht.com';
const imageUrl = `${production}/brand/dmacht-social.png`;
const routes = ['/', '/repair-service', '/parts-consumables', '/printers', '/about', '/contact', '/industries'];
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'");

await Promise.all(routes.map(async (route) => {
  let html;
  if (origin) {
    const response = await fetch(new URL(route, origin));
    assert.equal(response.status, 200, route);
    html = await response.text();
  } else {
    html = await readFile(new URL(`../.next/server/app${route === '/' ? '/index' : route}.html`, import.meta.url), 'utf8');
  }
  const metas = [...html.matchAll(/<meta\s[^>]*>/g)].map(([tag]) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)])));
  const meta = (name) => {
    const matches = metas.filter((entry) => entry.name === name || entry.property === name);
    assert.equal(matches.length, 1, `${route}: exactly one ${name}`);
    return matches[0].content;
  };
  const titles = [...html.matchAll(/<title>([^<]*)<\/title>/g)];
  assert.equal(titles.length, 1, `${route}: exactly one title`);
  const title = decode(titles[0][1]);
  const description = meta('description');
  const canonical = [...html.matchAll(/<link\s[^>]*rel="canonical"[^>]*>/g)];
  assert.equal(canonical.length, 1, `${route}: exactly one canonical`);
  assert.equal(new URL(canonical[0][0].match(/href="([^"]+)"/)[1]).href, new URL(route, production).href);
  assert.equal(new URL(meta('og:url')).href, new URL(route, production).href);
  for (const prefix of ['og', 'twitter']) {
    assert.equal(meta(`${prefix}:title`), title);
    assert.equal(meta(`${prefix}:description`), description);
    assert.equal(meta(`${prefix}:image`), imageUrl);
  }
  assert.equal(meta('og:site_name'), 'D-Macht');
  assert.equal(meta('og:type'), 'website');
  assert.equal(meta('og:image:width'), '1200');
  assert.equal(meta('og:image:height'), '630');
  assert.equal(meta('twitter:card'), 'summary_large_image');
  assert(!html.includes('og-image-v2.png'), `${route}: no obsolete share image`);
  if (route === '/') {
    assert.equal(title, 'D-Macht | Industrial Printer Repair, Parts & Printers');
    assert.equal(description, 'D-Macht provides industrial printer repair, spare parts, consumables, and new and refurbished CIJ, TIJ and DOD coding printers in Pune, India.');
  }
  console.log(`PASS ${route}: title, description, canonical, OG, Twitter; no duplicates`);
}));
const localImage = await readFile(new URL('../public/brand/dmacht-social.png', import.meta.url));
let image = localImage;
if (origin) {
  const response = await fetch(new URL('/brand/dmacht-social.png', origin));
  assert.equal(response.status, 200);
  assert(response.headers.get('content-type').includes('image/png'));
  image = Buffer.from(await response.arrayBuffer());
  const hash = (value) => createHash('sha256').update(value).digest('hex');
  assert.equal(hash(image), hash(localImage), 'Published image matches local asset');
}
assert.equal(image.toString('ascii', 1, 4), 'PNG');
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
console.log('PASS share image: PNG, 1200 × 630' + (origin ? ', published bytes match verified asset' : ''));

// Public indexing only: keep redirects out of the sitemap.
const getArtifact = async (route, filename) => origin
  ? (await fetch(new URL(route, origin))).text()
  : readFile(new URL(`../.next/server/app/${filename}`, import.meta.url), 'utf8');
const sitemap = await getArtifact('/sitemap.xml', 'sitemap.xml.body');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
assert.deepEqual(locations.sort(), routes.map((route) => new URL(route, production).href).sort());
const robots = await getArtifact('/robots.txt', 'robots.txt.body');
assert.match(robots, /Allow: \//);
assert.match(robots, /Sitemap: https:\/\/www\.dmacht\.com\/sitemap\.xml/);
assert(!robots.includes('Disallow: /\n'));
console.log('PASS sitemap: seven canonical content routes; robots: public crawl allowed');
