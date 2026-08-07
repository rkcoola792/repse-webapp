import { useState, useRef } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { loadFavoritesForUser } from "../store/favoritesSlice";
import { showPopup } from "../store/uiSlice";

const REMEMBER_KEY = "repse_remember_email";
const ANTON = "'Anton', sans-serif";
const ARCHIVO = "'Archivo', sans-serif";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState(() => localStorage.getItem(REMEMBER_KEY) || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(() => Boolean(localStorage.getItem(REMEMBER_KEY)));
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const inputClass = (fieldError) =>
    `w-full bg-transparent border rounded-lg px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none focus:ring-2 transition-colors ${
      fieldError || errors.api
        ? "border-red-400 focus:ring-red-400/20"
        : "border-white/25 focus:border-white/60 focus:ring-white/10"
    }`;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(
      showPopup({
        message: "Password reset isn't available yet — contact support.",
      })
    );
  };

  const handleSocialLogin = (provider) => {
    dispatch(
      showPopup({
        message: `Sign in with ${provider} isn't connected yet.`,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(email)) newErrors.email = "Enter a valid email";
    if (!password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.email) {
        emailRef.current?.focus();
      } else if (newErrors.password) {
        passwordRef.current?.focus();
      }
      return;
    }
    // handle login
    try {
      const user = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/signin`,
        { email, password },
        { withCredentials: true }
      );

      if (rememberMe) {
        localStorage.setItem(REMEMBER_KEY, email);
      } else {
        localStorage.removeItem(REMEMBER_KEY);
      }
      dispatch(addUser(user.data));
      dispatch(loadFavoritesForUser(user.data.user.email));
      navigate("/");
    } catch (error) {
      setErrors({ api: `Wrong email or password` });
      emailRef.current?.focus();
    }
  };

  return (
    <div
      className="min-h-screen bg-black flex flex-col"
      style={{ fontFamily: ARCHIVO }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-6">
        <button
          onClick={() => navigate("/")}
          className="text-white text-lg tracking-wide cursor-pointer"
          style={{ fontFamily: ANTON }}
        >
          REPSE
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-white/60 hover:text-white text-xs uppercase tracking-wide cursor-pointer transition-colors"
        >
          ← Back to Shop
        </button>
      </div>

      <div
        className="flex-1 flex items-center justify-center px-4 py-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div className="w-full max-w-[420px] relative">
          <div className="absolute -top-3.5 -left-3.5 right-3.5 bottom-3.5 border border-white/20 pointer-events-none" />
          <div
            className="relative bg-[#1a1a1a] border border-white/15 px-8 py-10 sm:px-10 sm:py-11 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 94%, 92% 100%, 0 100%)",
            }}
          >
            <p className="text-white/50 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Welcome Back
            </p>

            <h1
              className="text-white uppercase text-3xl mb-2"
              style={{ fontFamily: ANTON }}
            >
              Log In
            </h1>

            <p className="text-sm text-white/50 mb-8 leading-relaxed">
              Access your orders, saved sizes and drop alerts.
            </p>

            {/* Form */}
            <form noValidate onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-5">
                <label className="block text-[11px] tracking-wide uppercase text-white/60 mb-2">
                  Email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={inputClass(errors.email)}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-5">
                <label className="block text-[11px] tracking-wide uppercase text-white/60 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    className={inputClass(errors.password)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white cursor-pointer transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.password}
                  </p>
                )}
              </div>

              {errors.api && (
                <p className="text-xs text-red-400 mb-5 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.api}
                </p>
              )}

              {/* Remember me / Forgot password */}
              <div className="flex items-center justify-between mb-7 text-xs">
                <label className="flex items-center gap-2 text-white/70 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-white cursor-pointer"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-white hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-white text-black py-3.5 rounded-full font-semibold uppercase tracking-wide text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Log In
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3.5 my-7 text-[11px] tracking-wide uppercase text-white/40">
              <span className="flex-1 h-px bg-white/15" />
              Or continue with
              <span className="flex-1 h-px bg-white/15" />
            </div>

            <button
              type="button"
              onClick={() => handleSocialLogin("Google")}
              className="w-full flex items-center justify-center gap-2.5 border border-white/25 text-white py-3 mb-3 text-sm font-semibold hover:border-white/50 transition-colors cursor-pointer"
            >
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("Apple")}
              className="w-full flex items-center justify-center gap-2.5 border border-white/25 text-white py-3 text-sm font-semibold hover:border-white/50 transition-colors cursor-pointer"
            >
              Continue with Apple
            </button>

            {/* Signup */}
            <p className="text-sm text-white/50 mt-7 text-center">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-semibold text-white hover:underline cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
