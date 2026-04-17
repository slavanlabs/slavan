"use client";

import { ModalProvider } from "@/context/modal-context";
import { AddMember } from "./modals/add-member";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      <ModalProvider>
        {children}
      </ModalProvider>
    </ThemeProvider>
  );
};
