import { Metadata } from "next";

import { Header } from "@/features/layout/header";

export const metadata: Metadata = {
  title: "Profile",
};

export default function Profile() {
  return (
    <div>
      <Header title="Profile" />
    </div>
  );
}
