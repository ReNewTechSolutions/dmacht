import type { Metadata } from "next";

export const productionOrigin = "https://www.dmacht.com";
export const siteTitle = "D-Macht | Industrial Printer Repair, Parts & Printers";
export const siteDescription =
  "D-Macht provides industrial printer repair, spare parts, consumables, and new and refurbished CIJ, TIJ and DOD coding printers in Pune, India.";

const socialImage = {
  url: `${productionOrigin}/brand/dmacht-social.png`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "D-Macht, Industrial Printer Repair, Spare Parts & Printers. CIJ, TIJ and DOD Coding & Marking Solutions.",
};

/** Keep search, canonical, Open Graph and Twitter metadata aligned per route. */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = new URL(path, productionOrigin).href;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "D-Macht",
      type: "website",
      locale: "en_IN",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  };
}
