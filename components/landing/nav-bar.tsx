import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const NAVBAR_ITEMS = [
  {
    id: "product-info",
    name: "Product",
    url: "/product",
  },
  {
    id: "contact-info",
    name: "Contact",
    url: "/contact",
  },
  {
    id: "pricing-info",
    name: "Pricing",
    url: "/pricing",
  },
];

export const Navbar = () => {
  const router = useRouter();

  return (
    <div className={cn("fixed w-full py-4")}>
      <div
        className={cn("max-w-6xl mx-auto flex items-center justify-between")}
      >
        {/* Branding */}
        <div className="flex items-center gap-1">
          <Logo />
          <span className={cn("font-semibold text-xl tracking-tighter")}>
            slavan
          </span>
        </div>

        {/* Nav Elements */}
        <div className={cn("flex items-center gap-1")}>
          {NAVBAR_ITEMS.map((item) => (
            <Button 
              key={item.id} 
              size={"lg"}
              variant={"ghost"}
              onClick={() => router.push(item.url)}
              className="text-neutral-500 hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-400 font-normal rounded-sm px-2 text-[13px]"
            >
            
              {item.name}
            </Button>
          ))}
          <Separator orientation="vertical" className="h-6 my-auto mx-2" />
          <Button
            size={"lg"}
            variant={"ghost"}
            onClick={() => router.push("/login")}
            className="text-neutral-500 hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-400 font-norma rounded-sm px-4 text-[13px]"
          >
            Log in
          </Button>
          <Button 
            size={"lg"} 
            onClick={() => router.push("/signup")}
            className="rounded-sm px-4 text-[13px]"
          >
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
      <g fill="#fff">
        <path d="m48 11h-17.0775c-1.2151 0-2.3644.5524-3.1235 1.5012l-1.598 1.9976c-.7591.9488-1.9084 1.5012-3.1235 1.5012h-15.0775l-4 5h17.0775c1.2151 0 2.3644-.5524 3.1235-1.5012l1.598-1.9976c.7591-.9488 1.9084-1.5012 3.1235-1.5012h15.0775z" />
        <path d="m46 19h-17.0775c-1.2151 0-2.3644.5524-3.1235 1.5012l-1.598 1.9976c-.7591.9488-1.9084 1.5012-3.1235 1.5012h-15.0775l-4 5h17.0775c1.2151 0 2.3644-.5524 3.1235-1.5012l1.598-1.9976c.7591-.9488 1.9084-1.5012 3.1235-1.5012h15.0775z" />
        <path d="m44 27h-17.0775c-1.2151 0-2.3644.5524-3.1235 1.5012l-1.598 1.9976c-.7591.9488-1.9084 1.5012-3.1235 1.5012h-15.0775l-4 5h17.0775c1.2151 0 2.3644-.5524 3.1235-1.5012l1.598-1.9976c.7591-.9488 1.9084-1.5012 3.1235-1.5012h15.0775z" />
      </g>
    </svg>
  );
};
