"use client";
import { Input, PasswordInput } from "@/components/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useContentSize } from "@/hooks/use-content-size";

const signUpSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  emailConfirm: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is a required field"),
  passwordConfirm: z.string().min(1, "Password is a required field"),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  useContentSize("md");

  const onSubmit: SubmitHandler<SignUpSchema> = async ({ email, password }) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-center">Sign up</h1>

      <h2>Your details</h2>
      <div className="sm:grid-cols-2 gap-x-4 grid">
        <Input
          label="Name"
          placeholder="Joe Bloggs"
          autoFocus
          error={errors.name?.message}
          containerClassName="sm:col-span-2"
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

        <Input
          label="Confirm email"
          type="email"
          placeholder="joe@bloggs.com"
          autoComplete="username"
          error={errors.emailConfirm?.message}
          {...register("emailConfirm")}
        />
      </div>

      <h2>Choose a password</h2>
      <div className="sm:grid-cols-2 gap-x-4 grid">
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
      </div>

      <button type="submit" className="button button-full mb-4">
        Sign up
      </button>

      <p className="pt-4 text-center border-t">
        Already have an account?{" "}
        <Link className="link" href="/login">
          Log in
        </Link>
      </p>
    </form>
  );
}
