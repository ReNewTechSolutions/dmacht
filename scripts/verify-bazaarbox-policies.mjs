import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const policies = JSON.parse(await readFile(new URL("../data/bazaarbox-policies.json", import.meta.url), "utf8"));
const origin = process.argv.slice(2).find(value => value.startsWith("http"));
const compareSource = process.argv.includes("--source");
const clean = value => value.replace(/<!--.*?-->/gs, "").replace(/<[^>]+>/g, " ").replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"').replaceAll("&gt;", ">").replaceAll("&lt;", "<").replace(/\s+/g, " ").trim();
async function publicHtml(url) {
  const response = await fetch(url, { redirect: "manual" });
  assert.equal(response.status, 200, `${url}: public HTTP 200, no redirect`);
  assert.ok(response.headers.get("content-type")?.includes("text/html"));
  return response.text();
}
async function htmlFor(path) {
  return origin ? publicHtml(`${origin}${path}`) : readFile(new URL(`../.next/server/app${path === "/" ? "/index" : path}.html`, import.meta.url), "utf8");
}
let blocks = 0;
for (const [key, policy] of Object.entries(policies)) {
  const path = `/bazaarboxbeta/${key}`;
  const html = await htmlFor(path);
  const body = html.match(/<article\b[^>]*>(.*?)<\/article>/s)?.[1];
  assert.ok(body, `${key}: meaningful server-rendered article`);
  const expected = policy.blocks.map(block => block.replace(/^#{2,3} /, "").replace(/(^|\n)- /g, " ")).join(" ");
  assert.equal(clean(body), clean(expected), `${key}: every approved policy block preserved`);
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
  assert.equal(canonicals.length, 1);
  assert.equal(canonicals[0][1], `https://www.dmacht.com${path}`);
  assert.equal(clean(html.match(/<title>(.*?)<\/title>/)?.[1] ?? ""), `${policy.title} | BazaarBox by DMacht`);
  assert.ok(!/<meta[^>]*(?:name="robots"[^>]*content="[^"]*noindex|content="[^"]*noindex[^>]*name="robots")/.test(html));
  for (const phrase of ["₹10", "₹50", "₹100", "30-day posting window", "Deepumon Pillai", "DMacht", "ReNewTech Solutions", "412307", "hello@renewtech.solutions", "Online payment checkout is not enabled yet."]) assert.ok(html.includes(phrase), `${key}: ${phrase}`);
  for (const target of Object.keys(policies)) assert.ok(html.includes(`href="/bazaarboxbeta/${target}"`), `${key}: cross-link to ${target}`);
  if (compareSource) {
    const source = await publicHtml(`https://bazaarbox.app/${key}`);
    assert.equal(clean(source.match(/<article\b[^>]*>(.*?)<\/article>/s)?.[1] ?? ""), clean(body), `${key}: exact match to current BazaarBox production policy`);
  }
  blocks += policy.blocks.length;
  console.log(`PASS ${path}: SSR, metadata, merchant/pricing facts, six policy links, ${policy.blocks.length} unchanged blocks${compareSource ? ", live source parity" : ""}`);
}
const home = await htmlFor("/");
assert.ok(home.includes('href="/bazaarboxbeta"'), "Homepage HTML links to product");
assert.ok(home.includes('id="bazaarbox-product-title"'), "Homepage product feature");
assert.ok(home.includes("Products"), "Product navigation is server-rendered");
assert.ok(home.includes("An Indian local marketplace operated by DMacht, built in collaboration with ReNewTech Solutions."));
const landing = await htmlFor("/bazaarboxbeta");
for (const key of Object.keys(policies)) assert.ok(landing.includes(`href="/bazaarboxbeta/${key}"`));
console.log(`PASS homepage/landing discoverability; ${blocks} policy blocks preserved across six pages`);
