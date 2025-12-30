import { useState, useRef } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const inputClass = (fieldError) =>
    `w-full border rounded-md px-4 py-3 text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-200 ${
      fieldError || errors.api ? "border-red-400 focus:ring-red-200" : "border-black"
    }`;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
      dispatch(addUser(user.data));
      navigate("/");
    } catch (error) {
      setErrors({ api: `Wrong email or password` });
      emailRef.current?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div
        className="
          w-full
          max-w-sm
          text-center
          px-2
          sm:px-0
        "
      >
        {/* Logo */}
        {/* <div className="mb-6">
          <img
            src="/logo.svg"
            alt="Logo"
            className="mx-auto w-9"
          />
        </div> */}

        {/* Heading */}
        <h1 className="text-2xl font-extrabold tracking-tight mb-2">
          REPSE LOGIN
        </h1>

        <p className="text-sm text-gray-500 mb-7 leading-relaxed px-2">
          Shop your styles, save top picks to your wishlist,
          <br className="hidden sm:block" />
          track those orders & train with us.
        </p>

        {/* Form */}
        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email address*"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors(prev => ({ ...prev, email: undefined }));
              }}
              className={inputClass(errors.email)}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-2 text-left flex items-center gap-1">
                <AlertCircle size={14} /> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors(prev => ({ ...prev, password: undefined }));
              }}
              className={inputClass(errors.password)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-red-500 mt-0 text-left flex items-center gap-1">
              <AlertCircle size={14} /> {errors.password}
            </p>
          )}

          {errors.api && (
            <p className="text-xs text-red-500 mt-2 text-left flex items-center gap-1">
              <AlertCircle size={14}/> {errors.api}
            </p>
          )}

          {/* Forgot password */}
          <div className="text-center">
            <a href="#" className="text-sm font-medium underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full
              bg-black
              text-white
              py-3
              rounded-full
              font-medium
              hover:bg-gray-900
              transition
              cursor-pointer
            "
          >
            LOG IN
          </button>
        </form>

        {/* Signup */}
        <p className="text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="font-semibold underline cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
