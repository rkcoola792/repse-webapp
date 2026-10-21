const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://repse-webapp.onrender.com";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/profile", "/favourites", "/login", "/payment-success"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
