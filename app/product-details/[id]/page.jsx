import ProductDetails from "../../../src/components/products/productDetails";

const apiBase = process.env.API_BASE_URL || "https://repse-backend-latest.onrender.com";
async function getProduct(id) {
  if (!apiBase) return null;
  try {
    const response = await fetch(`${apiBase.replace(/\/$/, "")}/product/${encodeURIComponent(id)}`, { next: { revalidate: 60 } });
    if (!response.ok) return null;
    return response.json();
  } catch { return null; }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product not found" };
  const image = product.primaryImage || product.images?.[0];
  return {
    title: product.name,
    description: product.description?.slice(0, 160) || `Shop ${product.name} at REPSE.`,
    openGraph: { title: product.name, description: product.description?.slice(0, 160), images: image ? [image] : [] },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return <ProductDetails initialProduct={null} />;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.primaryImage || product.images?.[0],
    sku: String(product._id || id),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: Number(product.price),
      availability: product.variants?.some((variant) => variant.stock > 0)
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} /><ProductDetails initialProduct={product} /></>;
}
