"use client";

import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams as useNextSearchParams, useParams as useNextParams } from "next/navigation";

export function useNavigate() {
  const router = useRouter();
  return useCallback((href, options = {}) => options.replace ? router.replace(href) : router.push(href), [router]);
}
export function useLocation() {
  return { pathname: usePathname() };
}
export function useParams() {
  return useNextParams();
}
export function useSearchParams() {
  const current = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const set = (value) => {
    const params = value instanceof URLSearchParams ? value : new URLSearchParams(value);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };
  return [current, set];
}
