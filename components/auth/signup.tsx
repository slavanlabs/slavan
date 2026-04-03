"use client";

import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { AuthNavBar } from "./auth-navbar";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Logo } from "@/components/landing/nav-bar";
import { authClient } from "@/lib/better-auth-client";

const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "The password should be min 8 characters"),
  agencyName: z.string(),
});

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
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [agencyName, setAgencyName] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleSignUp = async () => {
    try {
      const { success } = signUpSchema.safeParse({
        email: email.trim(),
        password: password.trim(),
        agencyName: agencyName.trim(),
      });

      if (!success) {
        toast.error("Please provide valid details");
        return;
      }

      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: agencyName.trim(),
        email: email.trim(),
        password: password.trim(),
        callbackURL: "/dashboard",
      });


    } catch (error) {
      const message = error instanceof Error ? error.message : `Something went wrong`
      toast.error(message)
    } finally {
      setLoading(false);
    }
  };
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
              required
              type="text"
              placeholder="Agency Name"
              onChange={(e) => setAgencyName(e.target.value)}
              className="rounded-sm border-none bg-neutral-100 dark:bg-neutral-800! py-5"
            />
            <Input
              required
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-sm border-none bg-neutral-100 dark:bg-neutral-800! py-5"
            />
            <div className="flex items-center gap-x-3">
              <Input
                required
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

              <Button size={"lg"} onClick={handleSignUp}>
                {loading ? <Spinner /> : "Sign Up"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
