"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Analytics } from "../dashboard/analytics";
import { ProjectAnalytics } from "./project-analytics";
import { ProjectCharts } from "./project-charts";
import ProjectTable from "./project-table";

export const ProjectDashboard = () => {
  return (
    <div className={cn("flex flex-col w-full")}>
      <div className={cn("w-full")}>
        <div className={cn("flex items-center justify-between")}>
          <h1 className={cn("text-2xl font-medium")}>Projects</h1>
          <Button size={"lg"} variant={"outline"}>
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
        <ProjectTable />
      </div>
    </div>
  );
};
