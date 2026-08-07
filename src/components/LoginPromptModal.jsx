import { X, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { hideLoginPrompt } from "../store/uiSlice";

const LoginPromptModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const visible = useSelector((state) => state.ui.loginPromptVisible);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (!visible) return null;

  const handleLogin = () => {
    dispatch(hideLoginPrompt());
    navigate("/login");
  };

  const handleRegister = () => {
    dispatch(hideLoginPrompt());
    navigate("/register");
  };

  const handleClose = () => {
    dispatch(hideLoginPrompt());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-xl relative">
        {/* Header */}
        <div className="relative px-6 py-8 border-b flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <Heart className="w-6 h-6" strokeWidth={1.7} />
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
          >
            <X className="text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8 text-center">
          <h2 className="font-bold text-xl tracking-wide mb-3">LOGIN REQUIRED</h2>
          <p className="text-gray-700 text-base leading-relaxed mb-8">
            Ever wish you could save all your fave fits & accessories in one
            place to come back to later? Almost like a ✨ wishlist ✨.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRegister}
              className="px-8 py-3 rounded-full bg-black text-white font-medium hover:bg-zinc-800 transition cursor-pointer"
            >
              CREATE ACCOUNT
            </button>

            <button
              onClick={handleLogin}
              className="px-8 py-3 rounded-full bg-gray-200 text-black font-medium hover:bg-gray-300 transition cursor-pointer"
            >
              LOG IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
