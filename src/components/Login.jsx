import { useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

const ANTON = "'Anton', sans-serif";
const ARCHIVO = "'Archivo', sans-serif";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col" style={{ fontFamily: ARCHIVO }}>
      <div className="flex items-center justify-between px-6 sm:px-10 py-6">
        <button onClick={() => navigate("/")} className="text-white text-lg tracking-wide" style={{ fontFamily: ANTON }}>REPSE</button>
        <button onClick={() => navigate("/")} className="text-white/60 hover:text-white text-xs uppercase tracking-wide">← Back to Shop</button>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-10" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
        <div className="w-full max-w-[420px] relative">
          <div className="absolute -top-3.5 -left-3.5 right-3.5 bottom-3.5 border border-white/20 pointer-events-none" />
          <div className="relative bg-[#1a1a1a] border border-white/15 px-8 py-10 sm:px-10 sm:py-11 shadow-[0_20px_60px_rgba(0,0,0,0.6)]" style={{ clipPath: "polygon(0 0, 100% 0, 100% 94%, 92% 100%, 0 100%)" }}>
            <p className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase mb-2">Welcome to REPSE</p>
            <h1 className="text-white uppercase text-3xl mb-2" style={{ fontFamily: ANTON }}>Sign in</h1>
            <p className="text-sm text-white/50 mb-8 leading-relaxed">Continue with your Google account to sign in or create your account.</p>
            <div className="flex justify-center">
              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
