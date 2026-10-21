import { Suspense } from "react";
import ThankYouPage from "../../src/components/thankyouPage";
export const metadata = { title: "Order confirmed", robots: { index: false, follow: false } };
export default function Page() { return <Suspense fallback={null}><ThankYouPage /></Suspense>; }
