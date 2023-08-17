"use client";
import { Input, PasswordInput } from "@/components/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContentSize } from "@/hooks/use-content-size";

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
  useContentSize("sm");

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-4 text-2xl font-bold text-center">Log in</h1>

      <Input
        label="Email address"
        type="email"
        placeholder="joe@bloggs.com"
        autoComplete="username"
        autoFocus
        error={errors.email?.message}
        {...register("email")}
      />

      <PasswordInput
        label="Password"
        placeholder="••••••••••••"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <button type="submit" className="button button-full mb-4">
        Log in
      </button>

      <p className="mb-4 text-center">
        <Link className="link" href="/forgot-password">
          Forgot password?
        </Link>
      </p>
      <p className="pt-4 text-center border-t">
        Don&apos;t have an account?{" "}
        <Link className="link" href="/sign-up">
          Sign up
        </Link>
      </p>
    </form>
  );
}
