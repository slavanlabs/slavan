"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Logo } from "@/components/landing/nav-bar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/better-auth-client";
import { motion, AnimatePresence } from "motion/react";

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);

  const router = useRouter();

  const handleSendResetPasswordLink = async () => {
    setLoading(true);
    await authClient.requestPasswordReset(
      {
        email,
        redirectTo: "http://localhost:3000/reset-password",
      },
      {
        onSuccess: () => {
          setMessageSent(true);
        },
      },
    );
    setLoading(false);
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen w-full",
      )}
    >
      <div className="max-w-sm w-full relative">
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
            <Button
              size={"lg"}
              disabled={loading || messageSent}
              onClick={handleSendResetPasswordLink}
            >
              {loading ? <Spinner /> : "Send Reset Link"}
            </Button>
          </div>

          <span className="text-sm mx-auto mt-6 text-neutral-400">
            Remember your password?{" "}
            <Link
              href={"/login"}
              className="text-neutral-200 dark:text-neutral-600 hover:underline dark:hover:text-neutral-200 transition"
            >
              Sign In
            </Link>
          </span>
        </div>

        <AnimatePresence>
          {messageSent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-center text-sm text-lime-500 absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              {"Sent reset password link to your email."}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
