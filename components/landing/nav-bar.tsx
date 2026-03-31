import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn("fixed w-full py-4 border-b")}>
      <div
        className={cn("max-w-6xl mx-auto flex items-center justify-between")}
      >
        <div className="flex items-center gap-1">
          <Logo />
          <span className={cn("font-semibold text-xl tracking-tighter")}>
            slavan
          </span>
        </div>
        <div className={cn("flex items-center gap-1")}>
          {/* <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </Button> */}
          <Button size={"lg"} className="rounded-sm px-4 text-[13px]">
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Logo = () => {
  return (
    <svg
      fill="none"
      height="30"
      viewBox="0 0 48 48"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#000">
        <path d="m48 11h-17.0775c-1.2151 0-2.3644.5524-3.1235 1.5012l-1.598 1.9976c-.7591.9488-1.9084 1.5012-3.1235 1.5012h-15.0775l-4 5h17.0775c1.2151 0 2.3644-.5524 3.1235-1.5012l1.598-1.9976c.7591-.9488 1.9084-1.5012 3.1235-1.5012h15.0775z" />
        <path d="m46 19h-17.0775c-1.2151 0-2.3644.5524-3.1235 1.5012l-1.598 1.9976c-.7591.9488-1.9084 1.5012-3.1235 1.5012h-15.0775l-4 5h17.0775c1.2151 0 2.3644-.5524 3.1235-1.5012l1.598-1.9976c.7591-.9488 1.9084-1.5012 3.1235-1.5012h15.0775z" />
        <path d="m44 27h-17.0775c-1.2151 0-2.3644.5524-3.1235 1.5012l-1.598 1.9976c-.7591.9488-1.9084 1.5012-3.1235 1.5012h-15.0775l-4 5h17.0775c1.2151 0 2.3644-.5524 3.1235-1.5012l1.598-1.9976c.7591-.9488 1.9084-1.5012 3.1235-1.5012h15.0775z" />
      </g>
    </svg>
  );
};
