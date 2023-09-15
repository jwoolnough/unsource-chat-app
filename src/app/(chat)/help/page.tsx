import { Metadata } from "next";

import { Header } from "@/features/layout/header";

export const metadata: Metadata = {
  title: "Help",
};

export default function Help() {
  return (
    <div>
      <Header title="Help" />
    </div>
  );
}
