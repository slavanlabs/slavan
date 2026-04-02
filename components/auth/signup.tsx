"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { EyeClosed } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/nav-bar";
import { AuthNavBar } from "./auth-navbar";

export const SignUp = () => {
  return (
    <div
      className={cn("flex flex-col items-center justify-center min-h-screen")}
    >
      <SignUpCard />
    </div>
  );
};

const SignUpCard = () => {
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
              type="text"
              placeholder="Agency Name"
              className="rounded-sm border-none bg-neutral-800! py-5"
            />
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
              <Button
                size={"lg"}
                variant={"secondary"}
              >
                Back to App
              </Button>

              <Button
                size={"lg"}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



