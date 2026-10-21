"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "../../src/navigation";
import Profile from "../../src/components/profile";

export default function ProfileGate() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const user = userState?.user;
  const ready = userState?._persist?.rehydrated === true;
  const authenticated = Boolean(user?.user?.email || user?.user?.mobile);

  useEffect(() => {
    if (ready && !authenticated) navigate("/login", { replace: true });
  }, [ready, authenticated, navigate]);

  if (!ready || !authenticated) return null;
  return <Profile />;
}
