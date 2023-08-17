"use client";

import { Nav } from "@/components/nav";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[min-content_1fr] gap-4">
      <Nav />

      {children}
    </div>
  );
}
