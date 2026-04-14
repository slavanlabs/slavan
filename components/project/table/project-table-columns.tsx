"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Project } from "@/utils/project-data";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "project",
    header: "Project",
  },
  {
    accessorKey: "client",
    header: "Client",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      return (
        <div className="text-right font-medium flex items-center gap-1">
          <img src={"/usdc.svg"} />
          {amount.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      const statusColors: Record<string, string> = {
        DRAFT: cn(
          "bg-linear-to-b from-neutral-500 to-neutral-600",
          "dark:from-neutral-600 dark:to-neutral-700",
          "text-white shadow-[0_1px_2px_rgba(0,0,0,0.2),0_2px_6px_rgba(0,0,0,0.15)]",
          "dark:shadow-[0_1px_2px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.3)]",
          "ring-1 ring-neutral-400/20 dark:ring-white/10",
        ),
      };

      return (
        <Badge
          className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium tracking-wide uppercase",
            statusColors["DRAFT"],
          )}
        >
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "members",
    header: "Members",
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("members")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button variant={"ghost"} size={"icon"} className="text-neutral-500 hover:text-neutral-200">
          <Trash2 />
        </Button>
      );
    },
  },
];
// IN_PROGRESS: cn(
//           "bg-linear-to-b from-blue-500 to-blue-600",
//           "dark:from-blue-500 dark:to-blue-700",
//           "text-white shadow-[0_1px_2px_rgba(59,130,246,0.3),0_2px_6px_rgba(59,130,246,0.2)]",
//           "dark:shadow-[0_1px_2px_rgba(59,130,246,0.4),0_2px_8px_rgba(59,130,246,0.3)]",
//           "ring-1 ring-blue-400/30 dark:ring-blue-300/20",
//         ),
//         INVOICE_SENT: cn(
//           "bg-linear-to-b from-orange-400 to-orange-500",
//           "dark:from-orange-500 dark:to-orange-600",
//           "text-white shadow-[0_1px_2px_rgba(249,115,22,0.3),0_2px_6px_rgba(249,115,22,0.2)]",
//           "dark:shadow-[0_1px_2px_rgba(249,115,22,0.4),0_2px_8px_rgba(249,115,22,0.3)]",
//           "ring-1 ring-orange-300/30 dark:ring-orange-300/20",
//         ),
//         CLIENT_PAID: cn(
//           "bg-linear-to-b from-green-500 to-green-600",
//           "dark:from-green-500 dark:to-green-700",
//           "text-white shadow-[0_1px_2px_rgba(34,197,94,0.3),0_2px_6px_rgba(34,197,94,0.2)]",
//           "dark:shadow-[0_1px_2px_rgba(34,197,94,0.4),0_2px_8px_rgba(34,197,94,0.3)]",
//           "ring-1 ring-green-400/30 dark:ring-green-300/20",
//         ),
//         MEMBERS_PAID: cn(
//           "bg-linear-to-b from-teal-400 to-teal-500",
//           "dark:from-teal-500 dark:to-teal-600",
//           "text-white shadow-[0_1px_2px_rgba(20,184,166,0.3),0_2px_6px_rgba(20,184,166,0.2)]",
//           "dark:shadow-[0_1px_2px_rgba(20,184,166,0.4),0_2px_8px_rgba(20,184,166,0.3)]",
//           "ring-1 ring-teal-300/30 dark:ring-teal-300/20",
//         ),
//         COMPLETED: cn(
//           "bg-linear-to-b from-purple-500 to-purple-600",
//           "dark:from-purple-500 dark:to-purple-700",
//           "text-white shadow-[0_1px_2px_rgba(168,85,247,0.3),0_2px_6px_rgba(168,85,247,0.2)]",
//           "dark:shadow-[0_1px_2px_rgba(168,85,247,0.4),0_2px_8px_rgba(168,85,247,0.3)]",
//           "ring-1 ring-purple-400/30 dark:ring-purple-300/20",
