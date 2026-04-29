"use client";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { InvoiceToolbar } from "./invoice-toolbar";
import { InvoiceDataTable } from "./invoice-table";
import { InvoiceTopbar } from "./invoice-topabar";
import { invoices } from "@/config/invoice-data";
import { columns } from "./columns";

export const Invoice = () => {
  return (
    <div className={cn("flex flex-col")}>
      {/* Top-bar */}
      <InvoiceTopbar />
      <Separator />

      {/* Invoice tool-bar */}
      <InvoiceToolbar />
      <Separator />

      <InvoiceDataTable data={invoices} columns={columns} />
    </div>
  );
};


