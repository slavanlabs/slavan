"use client";

import { cn } from "@/lib/utils";
import { Logo } from "../landing/nav-bar";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/better-auth-client";

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSendResetPasswordLink = async () => {
    await authClient.requestPasswordReset({
        email,
        redirectTo: "http://localhost:3000/reset-password"
    })
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen w-full",
      )}
    >
      <div className="max-w-sm w-full">
        <div className="flex items-center justify-center">
          <Logo />
        </div>

        <div className="flex flex-col items-start mt-10 gap-5">
          <div>
            <h1 className="text-2xl font-medium">Forgot Password</h1>
            <p className="text-sm text-neutral-400">
              Enter your email to receive a password reset link.
            </p>
          </div>

          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-sm border-none bg-neutral-100 dark:bg-neutral-800! py-5"
          />

          <div className="flex items-center justify-between mt-3 w-full">
            <Button
              size={"lg"}
              variant={"secondary"}
              onClick={() => router.push("/")}
            >
              Back to App
            </Button>
            <Button size={"lg"}>
              {loading ? <Spinner /> : "Send Reset Link"}
            </Button>
          </div>

          <span className="text-sm mx-auto mt-6 text-neutral-400">
            Remember your password?{" "}
            <Link
              href={"/login"}
              className="text-neutral-800 hover:underline transition"
            >
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
