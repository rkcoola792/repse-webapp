import ProfileGate from "./profile-gate";
export const metadata = { title: "My account", robots: { index: false, follow: false } };
export default function Page() { return <ProfileGate />; }
