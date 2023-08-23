"use client";

import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { UIEvent, useCallback, useEffect, useRef } from "react";
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
  const { isAtTop, isAtBottom, setIsAtTop, setIsAtBottom } = useLayoutStore(
    (state) => state
  );

  useEffect(() => {
    if (!user && !loading)
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [loading]);

  const handleScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const scroller = e.currentTarget;

      if (scroller.scrollTop === 0 && !isAtTop) {
        setIsAtTop(true);
      } else if (isAtTop) {
        setIsAtTop(false);
      }

      if (
        scroller.scrollTop + scroller.offsetHeight === scroller.scrollHeight &&
        !isAtBottom
      ) {
        setIsAtBottom(true);
      } else if (isAtBottom) {
        setIsAtBottom(false);
      }
    },
    [isAtTop, isAtBottom]
  );

  if (loading || !user) {
    return (
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#8389ad55] border-b-slate-600"></span>
    );
  }

  return (
    <main className="content content-soft p-4">
      <div className="grid gap-4 sm:grid-cols-[min-content_1fr]">
        <Nav className="max-sm:hidden" />

        <div
          className="flex max-h-[20rem] min-h-[30rem] flex-col bg-slate-50"
          style={{ clipPath: "inset(0 round 1.75rem)" }}
        >
          <div
            className="overflow-auto"
            ref={scrollerRef}
            onScroll={handleScroll}
          >
            {children}
          </div>
        </div>

        <Nav className="sm:hidden" />
      </div>
    </main>
  );
}
