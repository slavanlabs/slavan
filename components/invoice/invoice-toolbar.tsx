"use client";

import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar1, ChevronDown, Circle, Search } from "lucide-react";
import { IoPerson } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Separator } from "@/components/ui/separator";
import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { ColumnFiltersState, Table } from "@tanstack/react-table";

const DATE_PICKING_OPTIONS = [
  {
    id: 1,
    name: "Between",
  },
  {
    id: 2,
    name: "Is",
  },
  {
    id: 3,
    name: "Is on or after",
  },
  {
    id: 4,
    name: "Is on or before",
  },
];
const DATE_RANGE = [
  {
    id: 1,
    name: "Today",
  },
  {
    id: 2,
    name: "Past 7 Days",
  },
  {
    id: 3,
    name: "Past 30 Days",
  },
  {
    id: 4,
    name: "This week",
  },
  {
    id: 5,
    name: "This month",
  },
  {
    id: 6,
    name: "This year",
  },
];
const STATUS = ["Paid", "Unpaid", "Paritally Paid", "Overdue", "Voided"].map(
  (x) => x.toLowerCase(),
);

export const InvoiceToolbar = ({
  table,
  onColumnFiltersChange,
}: {
  table: Table<any>;
  onColumnFiltersChange: Dispatch<SetStateAction<ColumnFiltersState>>;
}) => {
  const [date, setDate] = useState<Date>();
  const [status, setStatus] = useState(STATUS);
  const [statusFilter, setStatusFilter] = useState("");
  const [checked, setChecked] = useState<string[]>([]);
  const [customerFilter, setCustomerFilter] = useState("");
  const [dateType, setdateType] = useState<
    "between" | "is" | "is-on-or-after" | "is-on-or-before"
  >("between");

  useEffect(() => {
    if (!statusFilter) {
      setStatus(STATUS);
      return;
    }
    const updated = STATUS.filter((x) => x.includes(statusFilter));
    setStatus(updated);
  }, [statusFilter]);

  return (
    <div className={cn("flex items-center gap-x-2 px-4 py-3")}>
      {/* Search tool */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <Search />
            <span>Search</span>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="p-0 w-full mt-1">
          <Input
            placeholder="Search"
            className="w-80"
            autoFocus
            onChange={(e) =>
              table.getColumn("customer")?.setFilterValue(e.target.value)
            }
          />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Date-picker tool */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <Calendar1 />
            <span>Date</span>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn("w-full p-0 max-w-100 mt-1 rounded-sm")}
        >
          <div className="p-2">
            <div
              className={cn(
                "flex items-center border rounded-sm divide-x text-[14px] ",
              )}
            >
              {DATE_PICKING_OPTIONS.map((options) => (
                <span
                  key={options.id}
                  className={cn(
                    "px-3 font-medium cursor-pointer flex-1 whitespace-nowrap text-center",
                    "hover:bg-neutral-800",
                    "transition",
                  )}
                >
                  {options.name}
                </span>
              ))}
            </div>
          </div>
          <Separator />

          {/* Timeline */}
          <div className={cn("flex items-center divide-x")}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"lg"}
                  className="rounded-none outline-none focus:ring-0! focus-visible:ring-0"
                >
                  <span>Due Date</span>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className={cn("mt-1 rounded-sm")}>
                <RadioGroup defaultValue="Due Date" className="p-2 w-32">
                  <div className="flex items-center gap-3 w-full">
                    <RadioGroupItem value="due-date" id="due-date" />
                    <Label htmlFor="due-date">Due date</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="issue-date" id="issue-date" />
                    <Label htmlFor="issue-date">Issue Date</Label>
                  </div>
                </RadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div
              className={cn(
                "flex items-center overflow-x-auto w-full px-2",
                "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              )}
            >
              {DATE_RANGE.map((range) => (
                <span
                  key={range.id}
                  className={cn(
                    "text-[13px] font-semibold whitespace-nowrap px-2 text-neutral-300",
                    "hover:bg-neutral-800 cursor-pointer rounded-sm",
                  )}
                >
                  {range.name}
                </span>
              ))}
            </div>
          </div>

          <Separator />

          <div className={cn("flex items-center gap-x-2 p-2")}>
            <div
              className={cn(
                "flex items-center gap-x-1 border px-2 py-1 rounded-sm flex-1",
              )}
            >
              <Label>From</Label>
              <Input
                type="date"
                className={cn(
                  "bg-transparent! border-none",
                  "[&::-webkit-calendar-picker-indicator]:hidden focus:ring-0! outline-none!",
                )}
              />
            </div>

            <div
              className={cn(
                "flex items-center gap-x-1 border px-2 py-1 rounded-sm flex-1",
              )}
            >
              <Label>To</Label>
              <Input
                type="date"
                className={cn(
                  "bg-transparent! border-none",
                  "[&::-webkit-calendar-picker-indicator]:hidden focus:ring-0! outline-none!",
                )}
                style={{ WebkitAppearance: "none" }}
              />
            </div>
          </div>

          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            className="w-full bg-neutral-900"
          />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status is */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <Circle />
            <span>Status is</span>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="max-w-100 w-full p-0 mt-1">
          <div className={cn("flex flex-col")}>
            <div className={cn("flex items-center gap-x-1 px-2")}>
              <Search size={18} />
              <Input
                autoFocus
                placeholder="Search"
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                }}
                className={cn(
                  "w-72 bg-transparent! border-none outline-none! focus:ring-0! px-2! ",
                )}
              />
            </div>

            <Separator />
            <div className="p-2 space-y-3 w-full">
              {!status.length && (
                <span className="text-xs flex items-center justify-center">
                  No results found.
                </span>
              )}
              {status.map((s) => (
                <Field key={s} orientation={"horizontal"}>
                  <Checkbox
                    id={s}
                    checked={checked.includes(s)}
                    onCheckedChange={() => {
                      setChecked((p) =>
                        p.includes(s) ? p.filter((x) => x !== s) : [...p, s],
                      );
                    }}
                  />
                  <FieldLabel className="capitalize">{s}</FieldLabel>
                </Field>
              ))}
            </div>

            <Separator />
            <div className="flex items-center gap-2 p-2">
              <Button
                className="flex-1"
                variant={"outline"}
                onClick={() => {
                  table.getColumn("status")?.setFilterValue("");
                  setChecked([]);
                }}
              >
                Reset
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  table.getColumn("status")?.setFilterValue(checked);
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Customer Is */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <IoPerson />
            <span>Customer is</span>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className={cn("p-0 max-w-100 w-full mt-1")}>
          <div className={cn("flex flex-col")}>
            <div className={cn("flex items-center gap-x-1 px-2 py-1")}>
              <Search size={18} />
              <Input
                autoFocus
                placeholder="Search"
                onChange={(e) => setCustomerFilter(e.target.value)}
                className={cn(
                  "w-72 bg-transparent! border-none outline-none! focus:ring-0!",
                )}
              />
            </div>

            <Separator />

            <div className="flex items-center gap-2 p-2">
              <Button
                className="flex-1"
                variant={"outline"}
                onClick={() => {
                  table.getColumn("customer")?.setFilterValue("");
                }}
              >
                Reset
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  table.getColumn("customer")?.setFilterValue(customerFilter);
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
