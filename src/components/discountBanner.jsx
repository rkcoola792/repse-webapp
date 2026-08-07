import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  if (dismissed) return null;

  return (
    <div className="w-full bg-black text-white text-xs sm:text-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-2 flex items-center justify-center gap-3 relative">
        <p className="text-center tracking-wide">
          <span className="font-semibold uppercase">Free shipping</span> on
          your first order —{" "}
          <button
            onClick={() => navigate("/register")}
            className="underline underline-offset-2 hover:text-gray-300 cursor-pointer font-medium"
          >
            Create an account
          </button>
        </p>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="absolute right-3 sm:right-6 p-1 rounded-full hover:bg-white/10 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
