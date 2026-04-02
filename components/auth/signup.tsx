"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { EyeClosed } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/nav-bar";
import { usePathname, useRouter } from "next/navigation";

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

export const AuthNavBar = () => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className={cn("fixed w-full py-4 top-0")}>
      <div
        className={cn(
          "max-w-6xl mx-auto flex items-center justify-between w-full",
        )}
      >
        <div className="flex items-center gap-x-2">
          <Logo />
          <span className={cn("font-semibold text-xl tracking-tighter")}>
            slavan
          </span>
        </div>

        <Button
          variant={"outline"}
          onClick={() => {
            pathName === "/signup"
              ? router.push("/login")
              : router.push("/signup");
          }}
        >
          {pathName === "/signup" ? "Log In" : "Sign up"}
        </Button>
      </div>
    </div>
  );
};

const CheckMark = () => (
  <svg
    data-testid="geist-icon"
    height="15"
    stroke-linejoin="round"
    viewBox="0 0 16 16"
    width="15"
    style={{ width: "16px", height: "16px", color: "var(--ds-blue-900)" }}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.5303 6.53033L12.0607 6L11 4.93934L10.4697 5.46967L6.5 9.43934L5.53033 8.46967L5 7.93934L3.93934 9L4.46967 9.53033L5.96967 11.0303C6.26256 11.3232 6.73744 11.3232 7.03033 11.0303L11.5303 6.53033Z"
      fill="currentColor"
    ></path>
  </svg>
);
