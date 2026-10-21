import { Suspense } from "react";
import ProductsPage from "../../src/components/products/productsPage";
export const metadata = { title: "Shop all products", description: "Browse the latest REPSE clothing and everyday essentials." };
async function getProducts() {
  const base = process.env.API_BASE_URL || "https://repse-backend-latest.onrender.com";
  if (base?.startsWith("/")) return [];
  if (!base) return [];
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/products?page=1&limit=20`, { next: { revalidate: 60 } });
    return response.ok ? response.json() : [];
  } catch { return []; }
}
export default async function Page() {
  return <Suspense fallback={null}><ProductsPage initialProducts={await getProducts()} /></Suspense>;
}
