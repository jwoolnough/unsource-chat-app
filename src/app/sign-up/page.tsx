"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { auth } from "@/services/firebase";

import { Button } from "@/components/button";
import { Input, PasswordInput } from "@/components/input";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Please enter your name"),
    email: z.string().email("Please enter a valid email address"),
    emailConfirm: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is a required field"),
    passwordConfirm: z.string().min(1, "Password is a required field"),
  })
  .refine(({ email, emailConfirm }) => email === emailConfirm, {
    message: "Email addresses do not match",
    path: ["emailConfirm"],
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = async ({
    name,
    email,
    password,
  }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: name,
      });
      toast.success(`Welcome, ${name}`);
      router.push("/");
    } catch (e) {
      switch (e instanceof FirebaseError && e.code) {
        case "auth/email-already-in-use":
          toast.error(
            <>
              An account with this email already exists, please{" "}
              <Link href={`/login?email=${email}`}>log in</Link> to continue
            </>
          );
          break;
        default:
          toast.error(
            "There was a problem signing up, please try again or contact support"
          );
          break;
      }
    }
  };

  return (
    <main className="content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center">Sign up</h1>

        <h2>Your details</h2>
        <div className="sm:grid-cols-2 gap-x-4 grid">
          <Input
            label="Display name"
            placeholder="Joe"
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

        <Button
          type="submit"
          className="button button-full mb-4"
          isLoading={isSubmitting}
        >
          Sign up
        </Button>

        <p className="pt-4 text-center border-t">
          Already have an account?{" "}
          <Link className="link" href="/login">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}
