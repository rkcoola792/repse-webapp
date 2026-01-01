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
      <div className="bg-white w-full max-w-2xl rounded-xl overflow-hidden shadow-xl relative">
        {/* Header */}
        <div className="relative px-6 py-9 border-b">
          {/* Center title */}
          <div
            className="absolute inset-0 flex items-center justify-center gap-2
                  font-bold text-xl tracking-wider pointer-events-none"
          >
            LOGIN REQUIRED
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-6 top-1/2 -translate-y-1/2"
          >
            <X className="text-gray-500 hover:text-black cursor-pointer" />
          </button>
        </div>

        {/* Images */}
        <div className="grid grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="fitness woman"
            className="h-52 w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
            alt="fitness man"
            className="h-52 w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="px-8 py-8 text-center">
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
