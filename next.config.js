/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep existing local .env files working while Render uses NEXT_PUBLIC_*.
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.VITE_APP_BASE_URL || "/api",
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID || "",
    NEXT_PUBLIC_ORDER_DISCOUNT_PERCENT: process.env.NEXT_PUBLIC_ORDER_DISCOUNT_PERCENT || process.env.VITE_ORDER_DISCOUNT_PERCENT || "20",
    NEXT_PUBLIC_ORDER_DELIVERY_FEE: process.env.NEXT_PUBLIC_ORDER_DELIVERY_FEE || process.env.VITE_ORDER_DELIVERY_FEE || "15",
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async rewrites() {
    return [{ source: "/api/:path*", destination: "https://repse-backend-latest.onrender.com/:path*" }];
  },
};

export default nextConfig;
