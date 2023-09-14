"use client";

import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/services/firebase";

import { Legal } from "@/features/layout/legal";
import { Masthead } from "@/features/layout/masthead";
import { Nav } from "@/features/layout/nav";
import { useLayoutStore } from "@/features/layout/store";

import { clsxm } from "@/utils/clsxm";

export default function ChatLayout({ children }: WithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, loading] = useAuthState(auth);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const setScrollerRef = useLayoutStore((state) => state.setScrollerRef);

  useEffect(() => {
    if (!user && !loading)
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [loading]);

  useEffect(() => {
    setScrollerRef(scrollerRef);

    return () => {
      setScrollerRef(null);
    };
  }, []);

  if (loading || !user) {
    return (
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#8389ad55] border-b-slate-600"></span>
    );
  }

  return (
    <>
      <Masthead className="max-sm:hidden" />
      <main
        className={clsxm(
          "content content-soft p-4",
          "max-sm:-mx-2 max-sm:-my-6 max-sm:flex max-sm:h-[100svh] max-sm:w-screen max-sm:rounded-none"
        )}
      >
        <div className="grid flex-grow grid-rows-[minmax(0,1fr)_min-content] gap-4 sm:grid-cols-[min-content_1fr]">
          <Nav className="max-sm:hidden" />

          <div className="flex flex-col rounded-[1.75rem] bg-slate-50 [clip-path:inset(0_round_1.75rem)] sm:max-h-[40rem] sm:min-h-[30rem]">
            <div className="flex grow flex-col overflow-auto" ref={scrollerRef}>
              {children}
            </div>
          </div>

          <Nav className="sm:hidden" />
        </div>
      </main>
      <Legal className="max-sm:hidden" />
    </>
  );
}
