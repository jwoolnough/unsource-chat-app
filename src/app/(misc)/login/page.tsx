import { Metadata } from "next";

import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <main className="content content-sm">
      <LoginForm />
    </main>
  );
}
