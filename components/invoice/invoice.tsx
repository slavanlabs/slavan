"use client";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { InvoiceToolbar } from "./invoice-toolbar";
import { InvoiceTable } from "./invoice-table";
import { InvoiceTopbar } from "./invoice-topabar";

export const Invoice = () => {
  return (
    <div className={cn("flex flex-col")}>
      {/* Top-bar */}
      <InvoiceTopbar />
      <Separator />

      {/* Invoice tool-bar */}
      <InvoiceToolbar />
      <Separator />

      <InvoiceTable />
    </div>
  );
};


