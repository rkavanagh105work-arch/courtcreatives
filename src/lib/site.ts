// Single source of truth for the canonical host and business identity.
// Imported by the root layout (metadata), the homepage (JSON-LD), robots.ts and
// sitemap.ts, so none of them can drift onto a different domain or name.
const social = {
  instagram: "https://www.instagram.com/courtcreatives_/",
  tiktok: "https://www.tiktok.com/@courtcreatives_",
  facebook: "https://www.facebook.com/profile.php?id=61583815975537",
};

export const site = {
  name: "CourtCreatives",
  url: "https://courtcreatives.co.uk", // production origin, no trailing slash
  locale: "en_GB",
  email: "courtcreatives@outlook.com",
  social,
  sameAs: Object.values(social).filter(Boolean),
} as const;
