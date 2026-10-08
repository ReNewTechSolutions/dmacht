import type { MetadataRoute } from "next";
import { productionOrigin } from "../../lib/metadata";
import { policyLinks } from "../../lib/bazaarbox-policies";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/repair-service", "/parts-consumables", "/printers", "/industries", "/about", "/contact", "/bazaarboxbeta", ...policyLinks.map(({ href }) => href)].map((path) => ({
    url: new URL(path, productionOrigin).href,
  }));
}
