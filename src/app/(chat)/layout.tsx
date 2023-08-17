"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/services/firebase";

import { Nav } from "@/features/layout/nav";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user && !loading)
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [loading]);

  if (loading || !user) {
    return (
      <span className="animate-spin w-8 h-8 border-4 border-[#8389ad55] rounded-full border-b-slate-600"></span>
    );
  }

  return (
    <main className="content content-soft p-4">
      <div className="grid grid-cols-[min-content_1fr] gap-4">
        <Nav />

        {children}
      </div>
    </main>
  );
}
