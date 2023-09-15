import { Metadata } from "next";

import { Header } from "@/features/layout/header";

export const metadata: Metadata = {
  title: "Settings",
};

export default function Settings() {
  return (
    <div>
      <Header title="Settings" />
    </div>
  );
}
