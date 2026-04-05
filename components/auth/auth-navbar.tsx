"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "../landing/nav-bar";
import { Button } from "../ui/button";

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