export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://repse-webapp.onrender.com";
const apiBase = process.env.API_BASE_URL || "https://repse-backend-latest.onrender.com";

async function getProductUrls() {
  if (!apiBase) return [];
  const products = [];
  try {
    for (let page = 1; page <= 50; page += 1) {
      const response = await fetch(`${apiBase.replace(/\/$/, "")}/products?page=${page}&limit=100`, { next: { revalidate: 3600 } });
      if (!response.ok) break;
      const batch = await response.json();
      products.push(...batch);
      if (batch.length < 100) break;
    }
  } catch { return []; }
  return products.filter((product) => product._id).map((product) => ({
    url: `${siteUrl}/product-details/${encodeURIComponent(product._id)}`,
    lastModified: product.updatedAt || product.createdAt,
    images: product.primaryImage ? [product.primaryImage] : product.images?.slice(0, 1),
  }));
}

export default async function sitemap() {
  const pages = ["", "/products", "/about", "/contact", "/terms", "/privacy", "/shipping", "/refunds"];
  const staticUrls = pages.map((page) => ({ url: `${siteUrl}${page}`, lastModified: new Date() }));
  return [...staticUrls, ...await getProductUrls()];
}
