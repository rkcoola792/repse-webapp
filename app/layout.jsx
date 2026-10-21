import "../src/index.css";
import "../src/App.css";
import ClientProviders from "./providers";

export const metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  title: { default: "REPSE | Everyday essentials, made to move", template: "%s | REPSE" },
  description: "Shop thoughtfully designed everyday clothing and essentials from REPSE.",
  openGraph: { type: "website", siteName: "REPSE", title: "REPSE", description: "Everyday essentials, made to move." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><ClientProviders>{children}</ClientProviders></body></html>;
}
