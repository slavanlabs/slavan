"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BadgeDollarSign,
  CircleUserRound,
  History,
  Search,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { TbInvoice } from "react-icons/tb";
import { RiHome5Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Logo } from "@/components/landing/nav-bar";

const SIDEBAR_MENU_ITEMS = [
  {
    id: 1,
    name: "dashboard",
    icon: RiHome5Fill,
    href: "/dashboard",
  },

  {
    id: 3,
    name: "invoices",
    icon: TbInvoice,
    href: "/invoices",
  },
  {
    id: 4,
    name: "transactions",
    icon: History,
    href: "/transactions",
  },
];

const SIDEBAR_ACCOUNT_ITEMS = [
  {
    id: 1,
    name: "account",
    icon: CircleUserRound,
    href: "/account",
  },
  {
    id: 2,
    name: "subscription",
    icon: BadgeDollarSign,
    href: "/subscription",
  },
];

export const AppSidebar = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { open, toggleSidebar } = useSidebar();


  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className={cn("flex items-center justify-between")}>
          <div className={cn("flex items-center gap-x-1.5")}>
            <span
              onClick={() => {
                if (!open) {
                  toggleSidebar();
                }
              }}
            >
              <Logo />
            </span>
            {open && (
              <span className={cn("font-semibold text-xl tracking-tighter")}>
                slavan
              </span>
            )}
          </div>

          {open && <SidebarTrigger />}
        </div>

        <div
          className={cn(
            "bg-linear-to-b from-white to-[#f5f5f5]",
            "dark:from-[#1c1c1c] dark:to-[#141414]",
            "border border-neutral-200/80 dark:border-neutral-800/80",
            "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]",
            "dark:shadow-[0_2px_8px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.5)]",
            "ring-1 ring-black/3 dark:ring-white/5",
            "transition-shadow duration-200",
            "focus-within:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.1)]",
            "focus-within:ring-black/8 dark:focus-within:ring-white/10",
            "focus-within:border-neutral-300 dark:focus-within:border-neutral-700",
            "flex items-center justify-between px-2 py-2 mt-4 rounded-xl",
          )}
        >
          <div className="flex items-center gap-x-2 text-neutral-600 dark:text-neutral-500">
            <Search size={18} />
            {open && <span className="text-sm">Search</span>}
          </div>
          {open && (
            <KbdGroup>
              <Kbd>⌘K</Kbd>
            </KbdGroup>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_MENU_ITEMS.map((i) => {
                const Icon = i.icon;
                return (
                  <SidebarMenuItem key={i.id}>
                    <SidebarMenuButton onClick={() => router.push(i.href)}>
                      <Icon />
                      <span className="capitalize">{i.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ACCOUNT_ITEMS.map((a) => {
                const Icon = a.icon;
                return (
                  <SidebarMenuItem key={a.id}>
                    <SidebarMenuButton onClick={() => router.push(a.href)}>
                      <Icon />
                      <span className="capitalize">{a.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4.5"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                    <path d="M12 3l0 18"></path>
                    <path d="M12 9l4.65 -4.65"></path>
                    <path d="M12 14.3l7.37 -7.37"></path>
                    <path d="M12 19.6l8.85 -8.85"></path>
                  </svg>
                  Toggle Theme
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
