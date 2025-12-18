import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------- Password Rule ---------- */
  const isStrongPassword = (pwd) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pwd);

  /* ---------- Email Format Check ---------- */
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /* ---------- Validate Fields ---------- */
  const validate = (currentForm = form, forRealtime = false) => {
    const newErrors = {};

    // Name validation: only letters, spaces, dots, hyphens
    if (!currentForm.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (!/^[A-Za-z\s.-]+$/.test(currentForm.name.trim())) {
      newErrors.name = "Please only use letters, spaces, dots and hyphens";
    }

    // Email validation
    if (!currentForm.email) newErrors.email = "Email is required";
    else if ((hasSubmitted || forRealtime) && !isValidEmail(currentForm.email)) {
      newErrors.email = "Enter a valid email";
    }

    // Password validation
    if (!currentForm.password) newErrors.password = "Password is required";
    else if ((hasSubmitted || forRealtime) && !isStrongPassword(currentForm.password)) {
      newErrors.password = "Password does not meet requirements";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------- Handle Input Change ---------- */
  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (hasSubmitted) validate({ ...form, [field]: value }, true);
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!validate(form, true)) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      if (data.token) localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setErrors({ api: err.message });
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Helper for input classes ---------- */
  const inputClass = (fieldError) =>
    `w-full rounded-md px-4 py-3 text-[15px] border ${
      fieldError ? "border-red-400 focus:ring-red-200" : "border-black focus:ring-blue-200"
    } focus:outline-none focus:ring-2`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-extrabold mb-2">REPSE ACCOUNT</h1>
        <p className="text-sm text-gray-500 mb-7 px-2">
          One account, across all apps, just to make things a little easier.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full name*"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={inputClass(errors.name)}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 text-left">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="text"
              placeholder="Email address*"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={inputClass(errors.email)}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 text-left">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password*"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={inputClass(errors.password)}
              />

              {/* Show / Hide */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Requirement Box (shows only after first submit) */}
            {hasSubmitted && (
              <div className="mt-2 w-full p-3 border border-gray-200 rounded-md bg-white text-left text-xs text-gray-700 space-y-1">
                <p className="font-medium text-gray-900 mb-1">Password requirements</p>
                <ul className="space-y-0.5">
                  <li className={`flex items-center gap-2 ${form.password.length >= 8 ? "text-green-600" : "text-gray-500"}`}>
                    <span>{form.password.length >= 8 ? "✓" : "•"}</span> Minimum 8 characters
                  </li>
                  <li className={`flex items-center gap-2 ${/[A-Z]/.test(form.password) && /[a-z]/.test(form.password) ? "text-green-600" : "text-gray-500"}`}>
                    <span>{/[A-Z]/.test(form.password) && /[a-z]/.test(form.password) ? "✓" : "•"}</span> Upper & lowercase letters
                  </li>
                  <li className={`flex items-center gap-2 ${/\d/.test(form.password) ? "text-green-600" : "text-gray-500"}`}>
                    <span>{/\d/.test(form.password) ? "✓" : "•"}</span> One number
                  </li>
                  <li className={`flex items-center gap-2 ${/[@$!%*?&]/.test(form.password) ? "text-green-600" : "text-gray-500"}`}>
                    <span>{/[@$!%*?&]/.test(form.password) ? "✓" : "•"}</span> One special character
                  </li>
                </ul>
              </div>
            )}

            {errors.password && (
              <p className="text-xs text-red-500 mt-1 text-left">{errors.password}</p>
            )}
          </div>

          {errors.api && (
            <p className="text-sm text-red-600 text-left">{errors.api}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full font-medium disabled:opacity-60 cursor-pointer"
          >
            {loading ? "CREATING..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold underline cursor-pointer"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
