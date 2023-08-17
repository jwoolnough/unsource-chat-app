"use client";
import { Input, PasswordInput } from "@/components/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import { FirebaseError } from "firebase/app";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is a required field"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const onSubmit: SubmitHandler<LoginSchema> = async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
      toast.success(`Welcome back, ${user.displayName}`);
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) {
      }
    }
  };

  return (
    <main className="content content-sm">
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
    </main>
  );
}
