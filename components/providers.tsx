"use client";

import { ModalProvider } from "@/context/modal-context";
import { AddMember } from "./modals/add-member";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <ModalProvider>{children}</ModalProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};
