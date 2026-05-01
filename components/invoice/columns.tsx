"use client";

import { Invoice } from "@/types/invoice-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  BadgeCheck,
  Bell,
  CalendarX,
  CircleX,
  Clock3,
  Link,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
    filterFn: "includesString",
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "arrIncludes",
    cell: ({ row }) => {
      const status = row.getValue("status");

      switch (status) {
        case "paid":
          return (
            <Badge
              variant={"secondary"}
              className="rounded-sm text-sm capitalize bg-green-950 text-green-500"
            >
              <BadgeCheck />
              {status}
            </Badge>
          );

        case "unpaid":
          return (
            <Badge
              variant={"secondary"}
              className="rounded-sm text-sm capitalize bg-amber-950 text-amber-700"
            >
              <Clock3 />
              {status}
            </Badge>
          );

        case "void":
          return (
            <Badge
              variant={"secondary"}
              className="rounded-sm text-sm capitalize bg-neutral-700 text-gray-400"
            >
              <CircleX />
              {status}
            </Badge>
          );

        case "partially-paid":
          return (
            <Badge
              variant={"secondary"}
              className="rounded-sm text-sm capitalize bg-blue-900 text-blue-500"
            >
              <Clock3 />
              {status}
            </Badge>
          );

        case "overdue":
          return (
            <Badge
              variant={"secondary"}
              className="rounded-sm text-sm capitalize bg-red-950 text-red-500"
            >
              <CalendarX />
              {status}
            </Badge>
          );
      }
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    enableColumnFilter: false,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const date = row.getValue("dueDate") as number;
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "issueDate",
    header: "Issue Date",
    cell: ({ row }) => {
      const date = row.getValue("issueDate") as number;
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice No.",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className={cn("flex items-center gap-x-1")}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} size={"sm"}>
                <Link />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy invoice link</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} size={"sm"}>
                <Bell />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send Reminder</TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
];
