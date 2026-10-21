import { useRef, useState } from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../api/axios";
import { addUser } from "../store/userSlice";
import { loadFavoritesForUser } from "../store/favoritesSlice";
import GoogleLogin from "./GoogleLogin";

const REMEMBER_KEY = "repse_remember_email";
const ANTON = "'Anton', sans-serif";
const ARCHIVO = "'Archivo', sans-serif";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(() => localStorage.getItem(REMEMBER_KEY) || "");
  // Phone channel is paused until Twilio SMS delivery is enabled:
  // const [channel, setChannel] = useState("email");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("email");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const identifierRef = useRef(null);
  const codeRef = useRef(null);

  const inputClass = "w-full bg-transparent border border-white/25 rounded-lg px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/60 focus:ring-2 focus:ring-white/10";

  const requestCode = async (event) => {
    event?.preventDefault();
    setError("");
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Enter a valid email address");
      identifierRef.current?.focus();
      return;
    }
    setLoading(true);
    try {
      /* Paused until SMS is enabled:
      const phone = normalizePhoneNumber(email);
      await api.post("/request-phone-otp", { phone });
      */
      await api.post("/request-login-otp", { email: normalizedEmail });
      setEmail(normalizedEmail);
      localStorage.setItem(REMEMBER_KEY, normalizedEmail);
      setStep("code");
      setCode("");
    } catch (requestError) {
      setError(requestError.response?.data?.error || "Could not send a code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (event) => {
    event.preventDefault();
    setError("");
    if (!/^\d{6}$/.test(code.trim())) {
      setError("Enter the 6-digit code from your email");
      codeRef.current?.focus();
      return;
    }
    setLoading(true);
    try {
      /* Paused until SMS is enabled:
      const response = await api.post("/verify-phone-otp", { phone: email, code: code.trim() });
      */
      const response = await api.post("/verify-login-otp", { email, code: code.trim() });
      dispatch(addUser(response.data));
      dispatch(loadFavoritesForUser(response.data.user.email || response.data.user.mobile));
      navigate("/");
    } catch (verifyError) {
      setError(verifyError.response?.data?.error || "Could not verify the code. Please try again.");
      codeRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

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
            <p className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase mb-2">{step === "email" ? "Sign in or create an account" : "Check your inbox"}</p>
            <h1 className="text-white uppercase text-3xl mb-2" style={{ fontFamily: ANTON }}>{step === "email" ? "Your Email" : "Enter Your Code"}</h1>
            <p className="text-sm text-white/50 mb-8 leading-relaxed">
              {step === "email" ? "We'll email you a one-time code. New here? Your account is created when you verify your email." : <>We sent a 6-digit sign-in code to <span className="text-white">{email}</span>. It expires in 10 minutes.</>}
            </p>

            {step === "email" ? (
              <form noValidate onSubmit={requestCode}>
                {/* Mobile sign-in option is paused until Twilio SMS delivery is enabled:
                <button type="button" onClick={() => setChannel("phone")}>Mobile</button>
                */}
                <label htmlFor="login-email" className="block text-[11px] tracking-wide uppercase text-white/60 mb-2">Email</label>
                <input id="login-email" ref={identifierRef} type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} className={inputClass} />
                {error && <p role="alert" className="text-xs text-red-400 mt-2 flex items-center gap-1"><AlertCircle size={14} />{error}</p>}
                <button type="submit" disabled={loading} className="w-full mt-6 bg-white text-black py-3.5 rounded-full font-semibold uppercase tracking-wide text-sm hover:bg-gray-200 disabled:opacity-60">{loading ? "Sending code…" : "Send sign-in code"}</button>
              </form>
            ) : (
              <form noValidate onSubmit={verifyCode}>
                <label htmlFor="login-code" className="block text-[11px] tracking-wide uppercase text-white/60 mb-2">6-digit code</label>
                <input id="login-code" ref={codeRef} type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="000000" value={code} onChange={(event) => { setCode(event.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }} className={`${inputClass} text-center tracking-[0.5em] text-xl`} />
                {error && <p role="alert" className="text-xs text-red-400 mt-2 flex items-center gap-1"><AlertCircle size={14} />{error}</p>}
                <button type="submit" disabled={loading} className="w-full mt-6 bg-white text-black py-3.5 rounded-full font-semibold uppercase tracking-wide text-sm hover:bg-gray-200 disabled:opacity-60">{loading ? "Verifying…" : "Verify and continue"}</button>
                <div className="flex justify-between mt-5 text-xs">
                  <button type="button" onClick={() => { setStep("email"); setError(""); }} className="text-white/60 hover:text-white flex items-center gap-1"><ArrowLeft size={14} /> Change email</button>
                  <button type="button" disabled={loading} onClick={requestCode} className="text-white hover:underline disabled:opacity-50">Resend code</button>
                </div>
              </form>
            )}

            {step === "email" && <>
              <div className="flex items-center gap-3.5 my-7 text-[11px] tracking-wide uppercase text-white/40"><span className="flex-1 h-px bg-white/15" />Or continue with<span className="flex-1 h-px bg-white/15" /></div>
              <div className="flex justify-center"><GoogleLogin /></div>
            </>}
          </div>
        </div>
      </div>
    </div>
  );
}
