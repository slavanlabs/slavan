"use client";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/nav-bar";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/better-auth-client";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export const ResetPassword = () => {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    toast.error("Invalid request");
    redirect("/login");
  }

  const handleUpdatePassword = async () => {
    const isValid =
      password.trim().length >= 8 && password.trim() === confirmPassword.trim();

    if (!isValid) {
      setError("Invalid Password");
      setTimeout(() => setError(null), 1200);
      return;
    }

    setLoading(true);

    await authClient.resetPassword(
      {
        newPassword: password.trim(),
        token: token!,
      },
      {
        onSuccess: () => {
          setLoading(false);
          toast.success("Password updated Successfully.");
          router.push("/login");
        },
      },
    );
  };

  return (
    <div
      className={cn("flex flex-col items-center justify-center min-h-screen")}
    >
      <div className="max-w-sm w-full relative">
        <div className="flex items-center justify-center">
          <Logo />
        </div>

        <div className="flex flex-col items-start mt-10 gap-2">
          <div>
            <h1 className="text-2xl font-medium">Reset Password</h1>
            <p className="text-sm text-neutral-400">Enter your new Password</p>
          </div>

          <div className="flex items-center gap-x-2 w-full mt-5">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-sm border-none bg-neutral-100 dark:bg-neutral-800! py-5"
            />

            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? (
                <EyeClosed className="cursor-pointer" />
              ) : (
                <Eye className="cursor-pointer" />
              )}
            </Button>
          </div>

          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-sm border-none bg-neutral-100 dark:bg-neutral-800! py-5"
          />

          <div className="flex items-center justify-between mt-6 w-full">
            <Button
              size={"lg"}
              variant={"secondary"}
              onClick={() => router.push("/")}
            >
              Back to App
            </Button>
            <Button
              size={"lg"}
              disabled={loading}
              onClick={handleUpdatePassword}
            >
              {loading ? <Spinner /> : "Update Password"}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-center text-sm text-red-500 absolute -bottom-10 left-1/2 -translate-x-1/2"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
