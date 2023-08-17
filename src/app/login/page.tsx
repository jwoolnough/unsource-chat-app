"use client";
import { Input, PasswordInput } from "@/components/input";
import Link from "next/link";

export default function Login() {
  return (
    <form>
      <h1 className="text-2xl font-bold text-center mb-4">Log in</h1>

      <Input
        label="Email address"
        type="email"
        placeholder="joe@bloggs.com"
        autoFocus
        autoComplete="username"
      />

      <PasswordInput
        label="Password"
        type="password"
        placeholder="••••••••••••"
        autoFocus
        autoComplete="current-password"
      />

      <button type="submit" className="button button-full mb-4">
        Log in
      </button>

      <p className="text-center mb-4">
        <Link className="link" href="/forgot-password">
          Forgot password?
        </Link>
      </p>
      <p className="text-center pt-4 border-t">
        Don&apos;t have an account?{" "}
        <Link className="link" href="/signup">
          Sign up
        </Link>
      </p>
    </form>
  );
}
