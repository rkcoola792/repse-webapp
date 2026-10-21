"use client";

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { store } from "../src/store/store";
import Body from "../src/body";
import Popup from "../src/components/Popup";
import LoginPromptModal from "../src/components/LoginPromptModal";
import { useSelector } from "react-redux";

function GlobalOverlays() {
  const visible = useSelector((state) => state.ui.loginPromptVisible);
  return <>{visible && <LoginPromptModal />}<Popup /></>;
}

export default function ClientProviders({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000, gcTime: 5 * 60_000, refetchOnWindowFocus: false, retry: 1 } },
  }));
  return <Provider store={store}><QueryClientProvider client={queryClient}><Body>{children}<GlobalOverlays /></Body></QueryClientProvider></Provider>;
}
