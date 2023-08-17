"use client";
import { Input, PasswordInput } from "@/components/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is a required field"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold text-center mb-4">Log in</h1>

      <Input
        label="Email address"
        type="email"
        placeholder="joe@bloggs.com"
        autoFocus
        autoComplete="username"
        error={errors.email?.message}
        {...register("email")}
      />

      <PasswordInput
        label="Password"
        type="password"
        placeholder="••••••••••••"
        autoFocus
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
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
