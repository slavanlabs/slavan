"use client";
import { cn } from "@/lib/utils";

export const AnalyticsCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "bg-linear-to-b from-white to-[#f0f0f0] dark:from-[#2a2a2a] dark:to-[#0f0f0f] rounded-2xl p-2 shadow-[0_4px_6px_rgba(0,0,0,0.4),0_16px_48px_rgba(0,0,0,0.6)] ring-1 ring-white/6 relative border border-neutral-200 dark:border-neutral-800",
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
