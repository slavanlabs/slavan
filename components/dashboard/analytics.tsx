"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const Analytics = () => {
  return (
    <div className={cn("grid grid-cols-4 gap-4 w-full")}>
      <AnalyticsCard>
        <AnalyticsHeader>
          <AnalyticsTitle>Total earned</AnalyticsTitle>
          <AnalyticsMainContent>$18,250</AnalyticsMainContent>
        </AnalyticsHeader>
        <AnalyticsFooter>via USDC on Solana</AnalyticsFooter>
      </AnalyticsCard>

      <AnalyticsCard>
        <AnalyticsHeader>
          <AnalyticsTitle>Pending</AnalyticsTitle>
          <AnalyticsMainContent>$6,250</AnalyticsMainContent>
        </AnalyticsHeader>
        <AnalyticsFooter>2 invoices sent</AnalyticsFooter>
      </AnalyticsCard>

      <AnalyticsCard>
        <AnalyticsHeader>
          <AnalyticsTitle>Projects</AnalyticsTitle>
          <AnalyticsMainContent>7</AnalyticsMainContent>
        </AnalyticsHeader>
        <AnalyticsFooter>3 active projects</AnalyticsFooter>
      </AnalyticsCard>

      <AnalyticsCard>
        <AnalyticsHeader>
          <AnalyticsTitle>Total earned</AnalyticsTitle>
          <AnalyticsMainContent>$18,250</AnalyticsMainContent>
        </AnalyticsHeader>
        <AnalyticsFooter>via USDC on Solana</AnalyticsFooter>
      </AnalyticsCard>
    </div>
  );
};

export const AnalyticsCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "p-2 bg-neutral-100 dark:bg-neutral-900 border bg-linear-to-br relative",
        "flex flex-col gap-y-4 w-full min-h-28",
        "rounded-xl p-5 shadow-sm inset-0",
      )}
    >
      {children}
    </div>
  );
};

export const AnalyticsHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex flex-col gap-y-1.5">{children}</div>;
};

export const AnalyticsTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("capitalize dark:text-neutral-500 text-sm")}>
      {children}
    </div>
  );
};

export const AnalyticsMainContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="text-3xl font-medium">{children}</div>;
};

export const AnalyticsFooter = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={cn("text-[13px] text-neutral-400")}>{children}</div>;
};
