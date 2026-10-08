import type { MetadataRoute } from "next";
import { productionOrigin } from "../../lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/repair-service", "/parts-consumables", "/printers", "/industries", "/about", "/contact", "/bazaarboxbeta"].map((path) => ({
    url: new URL(path, productionOrigin).href,
  }));
}
