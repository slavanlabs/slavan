"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import ProjectTable from "./table/project-table";
import { ProjectAnalytics } from "./project-analytics";
import { ProjectCharts } from "./project-charts";
import { projects } from "@/utils/project-data";
import { columns } from "./table/project-table-columns";
import { useRouter } from "next/navigation";

export const ProjectDashboard = () => {
  const router = useRouter();

  return (
    <div className={cn("flex flex-col w-full")}>
      <div className={cn("w-full")}>
        <div className={cn("flex items-center justify-between")}>
          <h1 className={cn("text-2xl font-medium")}>Projects</h1>
          <Button
            size={"lg"}
            variant={"outline"}
            onClick={() => router.push("/projects/new")}
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
            )}
          >
            <Plus />
            New Project
          </Button>
        </div>
        <h4
          className={cn("text-[15px] text-neutral-500 dark:text-neutral-400")}
        >
          Manage client projects, invoices, and team payouts.
        </h4>
      </div>

      <div className={cn("mt-6 w-full flex flex-col gap-8")}>
        <ProjectAnalytics />
        <ProjectCharts />
        <ProjectTable data={projects} columns={columns} />
      </div>
    </div>
  );
};
