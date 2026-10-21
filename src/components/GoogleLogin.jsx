"use client";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "../navigation.js";
import api from "../api/axios";
import { addUser } from "../store/userSlice";
import { loadFavoritesForUser } from "../store/favoritesSlice";
import { showPopup } from "../store/uiSlice";

const GoogleLogin = () => {
  const googleButtonRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleResponse = async (response) => {
      try {
        const res = await api.post("/auth/google", {
          credential: response.credential,
        });
        dispatch(addUser(res.data));
        dispatch(loadFavoritesForUser(res.data.user.email));
        navigate("/");
      } catch (error) {
        dispatch(
          showPopup({
            message:
              error.response?.data?.error ||
              "Google sign-in failed. Please try again.",
          }),
        );
      }
    };

    const initializeGoogle = () => {
      if (!window.google || !googleButtonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        text: "continue_with",
        width: 350,
      });
    };

    if (window.google) {
      initializeGoogle();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={googleButtonRef} />;
};

export default GoogleLogin;
