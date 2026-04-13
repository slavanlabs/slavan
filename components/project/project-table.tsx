"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const FILTER_OPTIONS = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Draft",
  },
  {
    id: 3,
    name: "In progress",
  },
  {
    id: 4,
    name: "Compeleted",
  },
];

const ProjectTable = () => {
  return (
    <div className={cn("flex flex-col")}>
      <div className="w-full flex items-center justify-between">
        <div className="max-w-fit">
          <div className={cn("flex items-center gap-1")}>
            {FILTER_OPTIONS.map((f) => {
              return (
                <span key={f.id} className="px-2 py-2 text-sm">
                  {f.name}
                </span>
              );
            })}
          </div>
          <hr className="bg-neutral-900"/>
        </div>

        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1 w-full max-w-xs rounded-xl",
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
          <Search
            size={15}
            className="text-neutral-400 dark:text-neutral-500 shrink-0"
          />
          <Input
            className={cn(
              " bg-transparent! border-none p-0 text-sm",
              "placeholder:text-neutral-400 dark:placeholder:text-neutral-600",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
            )}
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;
