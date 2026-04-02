"use client";

import { cn } from "@/lib/utils";
import { AuthNavBar } from "./auth-navbar";
import { Logo } from "../landing/nav-bar";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "../ui/input";
import { EyeClosed } from "lucide-react";

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

          <Button size={"lg"} variant={"secondary"} className="py-5">
            <FcGoogle />
            <span>Continue with Google</span>
          </Button>

          <div className="mx-auto text-neutral-300 text-[14px] my-2">or</div>

          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              className="rounded-sm border-none bg-neutral-800! py-5"
            />
            <div className="flex items-center gap-x-3">
              <Input
                type="password"
                placeholder="Password"
                className="rounded-sm border-none bg-neutral-800! py-5"
              />

              <EyeClosed className="cursor-pointer" />
            </div>
            <div className="flex items-center justify-between mt-10">
              <Button size={"lg"} variant={"secondary"}>
                Back to App
              </Button>

              <Button size={"lg"}>Sign In</Button>
            </div>

          </div>
            <span className="mx-auto text-neutral-300 text-[14px] mt-8 cursor-pointer">Forgot Password?</span>
        </div>
      </div>
    </>
  );
};
