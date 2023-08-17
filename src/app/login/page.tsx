import { Metadata } from "next";

import { LoginForm } from "./login-form";

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
