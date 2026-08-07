import { useState, useRef } from "react";
import { Eye, EyeOff, AlertCircle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showPopup } from "../store/uiSlice";
import axios from "axios";

const ANTON = "'Anton', sans-serif";
const ARCHIVO = "'Archivo', sans-serif";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const genderRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  /* ---------- Password Rule ---------- */
  const isStrongPassword = (pwd) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pwd);

  const passwordScore = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[@$!%*?&]/.test(pwd)) score++;
    return score;
  };

  /* ---------- Email Format Check ---------- */
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* ---------- Validate Fields ---------- */
  const validate = (currentForm = form, forRealtime = false) => {
    const newErrors = {};

    // Name validation: only letters, spaces, dots, hyphens
    if (!currentForm.name.trim()) {
      newErrors.name = "First name is required";
    } else if (!/^[A-Za-z\s.-]+$/.test(currentForm.name.trim())) {
      newErrors.name = "Please only use letters, spaces, dots and hyphens";
    }

    // Last Name validation
    if (!currentForm.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[A-Za-z\s.-]+$/.test(currentForm.lastName.trim())) {
      newErrors.lastName = "Please only use letters, spaces, dots and hyphens";
    }

    // Gender validation
    if (!currentForm.gender) {
      newErrors.gender = "Gender is required";
    }

    // Email validation
    if (!currentForm.email) newErrors.email = "Email is required";
    else if (
      (hasSubmitted || forRealtime) &&
      !isValidEmail(currentForm.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    // Password validation
    if (!currentForm.password) newErrors.password = "Password is required";
    else if (
      (hasSubmitted || forRealtime) &&
      !isStrongPassword(currentForm.password)
    ) {
      newErrors.password = "Password does not meet requirements";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the Terms and Privacy Policy";
    }

    return newErrors;
  };

  /* ---------- Handle Input Change ---------- */
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (hasSubmitted) {
      const newErrors = validate({ ...form, [field]: value }, true);
      setErrors(newErrors);
    }
  };

  const handleSocialSignup = (provider) => {
    dispatch(
      showPopup({
        message: `Sign up with ${provider} isn't connected yet.`,
      })
    );
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const newErrors = validate(form, true);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name) {
        nameRef.current?.focus();
      } else if (newErrors.lastName) {
        lastNameRef.current?.focus();
      } else if (newErrors.gender) {
        genderRef.current?.focus();
      } else if (newErrors.email) {
        emailRef.current?.focus();
      } else if (newErrors.password) {
        passwordRef.current?.focus();
      }
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + "/signup",
        {
          ...form,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;

      if (data.token) localStorage.setItem("token", data.token);
      dispatch(showPopup({ message: "Account created successfully!" }));
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      let errorMessage = "Signup failed";

      if (err.response) {
        errorMessage = err.response.data?.error || err.response.data?.message || "Signup failed";
      } else if (err.request) {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = err.message;
      }

      if (errorMessage.toLowerCase().includes("email already in use")) {
        errorMessage = "Already have an account. Try login.";
      }

      setErrors({ api: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Helper for input classes ---------- */
  const inputClass = (fieldError) =>
    `w-full bg-transparent border rounded-lg px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none focus:ring-2 transition-colors ${
      fieldError
        ? "border-red-400 focus:ring-red-400/20"
        : "border-white/25 focus:border-white/60 focus:ring-white/10"
    }`;

  const score = passwordScore(form.password);

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
              New Here
            </p>

            <h1
              className="text-white uppercase text-3xl mb-2"
              style={{ fontFamily: ANTON }}
            >
              Create Account
            </h1>
            <p className="text-sm text-white/50 mb-8 leading-relaxed">
              Join for early drop access, order tracking and saved sizing.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div>
                  <label className="block text-[11px] tracking-wide uppercase text-white/60 mb-2">
                    First Name
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    placeholder="Rajeev"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={inputClass(errors.name)}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] tracking-wide uppercase text-white/60 mb-2">
                    Last Name
                  </label>
                  <input
                    ref={lastNameRef}
                    type="text"
                    placeholder="Kumar"
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className={inputClass(errors.lastName)}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Gender */}
              <div className="mb-5">
                <label className="block text-[11px] tracking-wide uppercase text-white/60 mb-2">
                  Gender
                </label>
                <div className="relative">
                  <select
                    ref={genderRef}
                    value={form.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className={`${inputClass(
                      errors.gender
                    )} appearance-none pr-11 ${
                      form.gender ? "text-white" : "text-white/30"
                    } [&>option]:text-black`}
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
                {errors.gender && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.gender}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-[11px] tracking-wide uppercase text-white/60 mb-2">
                  Email
                </label>
                <input
                  ref={emailRef}
                  type="text"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
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
                    placeholder="Create a password"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
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

                {/* Strength meter */}
                {form.password && (
                  <div className="flex gap-1 mt-2">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i < score ? "bg-white" : "bg-white/15"
                        }`}
                      />
                    ))}
                  </div>
                )}
                <p className="text-[11px] text-white/40 mt-2">
                  Use 8+ characters with a mix of letters, numbers and symbols.
                </p>

                {/* Password Requirement Box (shows only after first submit) */}
                {hasSubmitted && (
                  <div className="mt-2 w-full p-3 border border-white/10 rounded-lg bg-white/5 text-left text-xs text-white/60 space-y-1">
                    <p className="font-medium text-white mb-1">
                      Password requirements
                    </p>
                    <ul className="space-y-0.5">
                      <li
                        className={`flex items-center gap-2 ${
                          form.password.length >= 8
                            ? "text-green-400"
                            : "text-white/40"
                        }`}
                      >
                        <span>{form.password.length >= 8 ? "✓" : "•"}</span> Minimum
                        8 characters
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          /[A-Z]/.test(form.password) && /[a-z]/.test(form.password)
                            ? "text-green-400"
                            : "text-white/40"
                        }`}
                      >
                        <span>
                          {/[A-Z]/.test(form.password) &&
                          /[a-z]/.test(form.password)
                            ? "✓"
                            : "•"}
                        </span>{" "}
                        Upper & lowercase letters
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          /\d/.test(form.password)
                            ? "text-green-400"
                            : "text-white/40"
                        }`}
                      >
                        <span>{/\d/.test(form.password) ? "✓" : "•"}</span> One
                        number
                      </li>
                      <li
                        className={`flex items-center gap-2 ${
                          /[@$!%*?&]/.test(form.password)
                            ? "text-green-400"
                            : "text-white/40"
                        }`}
                      >
                        <span>{/[@$!%*?&]/.test(form.password) ? "✓" : "•"}</span>{" "}
                        One special character
                      </li>
                    </ul>
                  </div>
                )}

                {errors.password && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.password}
                  </p>
                )}
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2.5 text-xs text-white/60 leading-relaxed cursor-pointer mb-7">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (hasSubmitted) {
                      setErrors(validate(form, true));
                    }
                  }}
                  className="mt-0.5 accent-white cursor-pointer"
                />
                <span>
                  I agree to the{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-2"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-400 -mt-5 mb-5 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.terms}
                </p>
              )}

              {errors.api && (
                <p className="text-sm text-red-400 mb-5 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.api}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-3.5 rounded-full font-semibold uppercase tracking-wide text-sm disabled:opacity-60 cursor-pointer hover:bg-gray-200 transition-colors"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3.5 my-7 text-[11px] tracking-wide uppercase text-white/40">
              <span className="flex-1 h-px bg-white/15" />
              Or sign up with
              <span className="flex-1 h-px bg-white/15" />
            </div>

            <button
              type="button"
              onClick={() => handleSocialSignup("Google")}
              className="w-full flex items-center justify-center gap-2.5 border border-white/25 text-white py-3 mb-3 text-sm font-semibold hover:border-white/50 transition-colors cursor-pointer"
            >
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialSignup("Apple")}
              className="w-full flex items-center justify-center gap-2.5 border border-white/25 text-white py-3 text-sm font-semibold hover:border-white/50 transition-colors cursor-pointer"
            >
              Continue with Apple
            </button>

            <p className="text-sm text-white/50 mt-7 text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-white hover:underline cursor-pointer"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
