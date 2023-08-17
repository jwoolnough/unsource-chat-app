"use client";
import { Input, PasswordInput } from "@/components/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const signUpSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is a required field"),
  passwordConfirm: z.string().min(1, "Password is a required field"),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold text-center mb-4">Sign up</h1>

      <Input
        label="Name"
        placeholder="Joe Bloggs"
        autoFocus
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Email address"
        type="email"
        placeholder="joe@bloggs.com"
        autoComplete="username"
        error={errors.email?.message}
        {...register("email")}
      />

      <PasswordInput
        label="Password"
        placeholder="••••••••••••"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <PasswordInput
        label="Confirm password"
        placeholder="••••••••••••"
        autoComplete="new-password"
        error={errors.passwordConfirm?.message}
        {...register("passwordConfirm")}
      />

      <button type="submit" className="button button-full mb-4">
        Sign up
      </button>

      <p className="text-center pt-4 border-t">
        Already have an account?{" "}
        <Link className="link" href="/login">
          Log in
        </Link>
      </p>
    </form>
  );
}
