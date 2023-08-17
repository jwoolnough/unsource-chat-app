import { Metadata } from "next";

import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <main className="content content-sm">
      <ForgotPasswordForm />
    </main>
  );
}
