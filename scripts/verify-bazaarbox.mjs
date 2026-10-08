import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const origin = process.argv[2];
const canonical = "https://www.dmacht.com/bazaarboxbeta";
const expectedImage = "https://www.dmacht.com/brand/bazaarbox/marketplace-v5.png";
async function get(path, file) {
  if (!origin) return readFile(file, "utf8");
  const response = await fetch(`${origin}${path}`, { redirect: "manual" });
  assert.equal(response.status, 200, `${path} must be public HTTP 200`);
  return response.text();
}
const html = await get("/bazaarboxbeta", ".next/server/app/bazaarboxbeta.html");
const meta = (name) => html.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`))?.[1];
assert.match(html, /<title>BazaarBox \| Local Marketplace by DMacht<\/title>/);
assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}"`));
assert.equal(meta("og:url"), canonical);
assert.equal(meta("og:image"), expectedImage);
assert.equal(meta("twitter:image"), expectedImage);
assert.equal(meta("twitter:card"), "summary_large_image");
assert.equal(meta("description"), "BazaarBox is a local online marketplace operated by DMacht in India. Post listings from ₹10, connect with nearby buyers and sellers, and arrange local meetups.");
for (const text of ["₹10", "₹50", "₹100", "Up to 20 listings", "Up to 100 listings", "30-day posting window", "Deepumon Pillai", "GHULE WASTI", "412307", "hello@renewtech.solutions", "ReNewTech Solutions", "DMacht charges sellers for marketplace listing services.", "Online payment checkout is not enabled yet.", "BazaarBox is a local classified-advertising marketplace operated by DMacht."]) {
  assert.ok(html.includes(text), `Missing server-rendered copy: ${text}`);
}
for (const path of ["/terms", "/privacy", "/refund-policy", "/safety", "/shipping-delivery-policy"]) {
  assert.ok(html.includes(`href="https://bazaarbox.app${path}"`), `Missing policy ${path}`);
}
assert.ok(html.includes('href="https://bazaarbox.app"'));
assert.ok(!html.includes("<form"), "No checkout or new form on this page");
assert.ok(!/razorpay|phonepe|FREE FOR A MONTH|₹20/i.test(html), "No stale offer or payment-provider claims");
const sitemap = await get("/sitemap.xml", ".next/server/app/sitemap.xml.body");
assert.ok(sitemap.includes(canonical), "Sitemap includes product page");
console.log("PASS: BazaarBox static copy, pricing, operator facts, links, metadata, sitemap and no-checkout checks");
