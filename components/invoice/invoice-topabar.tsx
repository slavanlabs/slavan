"use client"

import { cn } from "@/lib/utils";
import { ReceiptText, RefreshCcw, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { GoPlusCircle } from "react-icons/go";

export const InvoiceTopbar = () => {
  return (
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
  );
};