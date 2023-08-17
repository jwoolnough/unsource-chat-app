"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { auth } from "@/services/firebase";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      router.push("/login");
      toast.success(
        "An email with a link to reset your password has been sent"
      );
    } catch (e) {
      toast.error(
        "There was a problem resetting your password, please try again or contact support"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-4 text-2xl font-bold text-center">Forgot password</h1>

      <Input
        label="Email address"
        type="email"
        placeholder="joe@bloggs.com"
        autoComplete="username"
        autoFocus
        error={errors.email?.message}
        {...register("email")}
      />

      <Button
        type="submit"
        className="button button-full mb-4"
        isLoading={isSubmitting}
      >
        Reset password
      </Button>

      <p className="mb-4 text-center">
        <Link className="link" href="/login">
          Know your password?
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
};

export { ForgotPasswordForm };
