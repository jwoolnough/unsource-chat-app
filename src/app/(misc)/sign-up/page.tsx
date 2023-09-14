import { Metadata } from "next";

import { SignUpForm } from "@/features/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUp() {
  return (
    <main className="content">
      <SignUpForm />
    </main>
  );
}
