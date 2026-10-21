import Homepage from "../src/components/homepage";
export const revalidate = 60;
async function getProducts() {
  const base = process.env.API_BASE_URL || "https://repse-backend-latest.onrender.com";
  if (base?.startsWith("/")) return [];
  if (!base) return [];
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/products?page=1&limit=20`, { next: { revalidate: 60 } });
    return response.ok ? response.json() : [];
  } catch { return []; }
}
export default async function HomePage() { return <Homepage initialProducts={await getProducts()} />; }
