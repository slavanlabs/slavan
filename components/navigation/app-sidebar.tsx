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
} from "@/components/ui/sidebar";
import { Logo } from "@/components/landing/nav-bar";
import { cn } from "@/lib/utils";
import {
  BadgeDollarSign,
  CircleUserRound,
  Layers2,
  Search,
  Settings,
} from "lucide-react";
import { Kbd, KbdGroup } from "../ui/kbd";
import { RiHome5Fill } from "react-icons/ri";
import { TbInvoice } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const SIDEBAR_MENU_ITEMS = [
  {
    id: 1,
    name: "dashboard",
    icon: RiHome5Fill,
    href: "/dashboard",
  },
  {
    id: 2,
    name: "projects",
    icon: Layers2,
    href: "/projects",
  },
  {
    id: 3,
    name: "invoices",
    icon: TbInvoice,
    href: "/invoices",
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

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className={cn("flex items-center justify-between")}>
          <div className={cn("flex items-center gap-x-1.5")}>
            <Logo />
            <span className={cn("font-semibold text-xl tracking-tighter")}>
              slavan
            </span>
          </div>

          <SidebarTrigger />
        </div>

        <div
          className={cn(
            "w-full flex items-center justify-between bg-neutral-200 dark:bg-neutral-800 p-2 mt-2 rounded-lg",
          )}
        >
          <div className="flex items-center gap-x-2 text-neutral-600 dark:text-neutral-500">
            <Search size={18} />
            <span className="text-sm">Search</span>
          </div>
          <KbdGroup>
            <Kbd>⌘K</Kbd>
          </KbdGroup>
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
