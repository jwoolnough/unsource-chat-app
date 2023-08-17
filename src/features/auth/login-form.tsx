"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { auth } from "@/services/firebase";

import { Button } from "@/components/button";
import { Input, PasswordInput } from "@/components/input";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is a required field"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const onSubmit: SubmitHandler<LoginSchema> = async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const redirect = searchParams.get("redirect");
      // @ts-expect-error We can accept any redirect URL here, 404ing is fine
      router.push(redirect ? decodeURIComponent(redirect) : "/");
      toast.success(`Welcome back, ${user.displayName}`);
    } catch (e) {
      switch (e instanceof FirebaseError && e.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          toast.error("Unable to log in, please check your credentials");
          break;
        case "auth/too-many-requests":
          toast.error(
            <>
              You&apos;ve been temporarily locked out due to too many failed
              attempts. Try again later or{" "}
              <Link href={`/forgot-password?email=${email}`}>
                reset your password
              </Link>{" "}
              to log in now
            </>
          );
          break;
        default:
          toast.error(
            "There was a problem logging in, please try again or contact support"
          );
          break;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-4 text-center text-2xl font-bold">Log in</h1>

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

      <Button
        type="submit"
        className="button button-full mb-4"
        isLoading={isSubmitting}
      >
        Log in
      </Button>

      <p className="mb-4 text-center">
        <Link className="link" href="/forgot-password">
          Forgot password?
        </Link>
      </p>
      <p className="border-t pt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link className="link" href="/sign-up">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export { LoginForm };
