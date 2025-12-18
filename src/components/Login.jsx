import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login
    console.log('Login:', { email, password });
    navigate('/');
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Email address*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              border
              rounded-md
              px-4
              py-3
              text-[16px]
              focus:outline-none
              focus:ring-2
              focus:ring-zinc-300
            "
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                border
                rounded-md
                px-4
                py-3
                text-[16px]
                focus:outline-none
                focus:ring-2
                focus:ring-zinc-300
              "
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-center">
            <a
              href="#"
              className="text-sm font-medium underline"
            >
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
          <button onClick={() => navigate('/register')} className="font-semibold underline cursor-pointer">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
