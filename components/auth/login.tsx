"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";
import { AuthNavBar } from "./auth-navbar";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Logo } from "@/components/landing/nav-bar";
import { authClient } from "@/lib/better-auth-client";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const Login = () => {
  return (
    <div
      className={cn("flex flex-col items-center justify-center min-h-screen")}
    >
      <LoginCard />
    </div>
  );
};

export const LoginCard = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleLogin = async () => {
    try {
      const { success } = loginSchema.safeParse({
        email: email.trim(),
        password: password.trim(),
      });
      if (!success) {
        toast.error("Invalid Email or Password");
        return;
      }

      setLoading(true);

      const { data, error } = await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "http://localhost:3000/dashboard",
        },
        {
          onError: (ctx) => {
            if (ctx.error.status === 403) {
              toast.error("Please verify your email address");
            }
          },
        },
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleOAuth = async () => {
    await authClient.signIn.social({
      provider: "google"
    })
  }

  const handleForgotPassword = async () => {
      router.push("/forgot-password")
  }

  return (
    <>
      <AuthNavBar />
      <div className={cn("flex flex-col items-center justify-center w-full")}>
        <div className="flex flex-col w-full max-w-sm">
          <div className="mx-auto">
            <Logo />
          </div>
          <div className="my-6">
            <h1 className="text-2xl font-medium mt-6">Welcome to slavan</h1>
            <p className="text-sm dark:text-neutral-400">
              Agency finance, simplified with USDC.
            </p>
          </div>

          <Button 
            size={"lg"} 
            variant={"secondary"} 
            onClick={handleGoogleOAuth}
            className="py-5"
            >
            <FcGoogle />
            <span>Continue with Google</span>
          </Button>

          <div className="mx-auto text-neutral-300 text-[14px] my-2">or</div>

          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-sm border-none bg-neutral-100 dark:bg-neutral-800! py-5"
            />
            <div className="flex items-center gap-x-3">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
            <div className="flex items-center justify-between mt-10">
              <Button
                size={"lg"}
                variant={"secondary"}
                onClick={() => router.push("/")}
              >
                Back to App
              </Button>

              <Button size={"lg"} onClick={handleLogin}>
                {loading ? <Spinner /> : "Sign In"}
              </Button>
            </div>
          </div>
          <span
            onClick={handleForgotPassword}
          className="mx-auto text-neutral-500 dark:text-neutral-300 text-[14px] mt-8 cursor-pointer">
            Forgot Password?
          </span>
        </div>
      </div>
    </>
  );
};
