"use client";

import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/services/firebase";

import { Nav } from "@/features/layout/nav";
import { useLayoutStore } from "@/features/layout/store";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <main className="content content-soft p-4">
      <div className="grid gap-4 sm:grid-cols-[min-content_1fr]">
        <Nav className="max-sm:hidden" />

        <div className="flex max-h-[40rem] min-h-[30rem] flex-col rounded-[1.75rem] bg-slate-50 [clip-path:inset(0_round_1.75rem)]">
          <div className="flex grow flex-col overflow-auto" ref={scrollerRef}>
            {children}
          </div>
        </div>

        <Nav className="sm:hidden" />
      </div>
    </main>
  );
}
