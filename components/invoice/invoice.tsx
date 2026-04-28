"use client";
import { cn } from "@/lib/utils";
import { GoPlusCircle } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ReceiptText, RefreshCcw, Settings } from "lucide-react";
import { InvoiceToolbar } from "./invoice-toolbar";

export const Invoice = () => {
  return (
    <div className={cn("flex flex-col")}>
      {/* Top-bar */}
      <div className={cn("flex items-center justify-between p-4 px-6")}>
        <div className={cn("flex items-center gap-x-1.5")}>
          <div
            className={cn(
              "bg-neutral-800 rounded-sm size-6 flex items-center justify-center p-1",
            )}
          >
            <ReceiptText size={17} />
          </div>
          <span>Invoicing</span>
        </div>

        <div className={cn("flex items-center gap-x-2")}>
          <Button variant={"outline"}>
            <RefreshCcw />
            Recurring Invoices
          </Button>
          <Button variant={"outline"}>
            {" "}
            <Settings size={18} /> Settings
          </Button>

          <Button className="">
            <GoPlusCircle /> New Invoice
          </Button>
        </div>
      </div>
      <Separator />

      {/* Invoice tool-bar */}
      <InvoiceToolbar />
      
      <Separator />
    </div>
  );
};
