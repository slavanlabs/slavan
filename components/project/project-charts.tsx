"use client";

import { cn } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";


const statusData = [
  { status: "draft", label: "Draft", value: 2 },
  { status: "sent", label: "Invoice Sent", value: 2 },
  { status: "clientPaid", label: "Client Paid", value: 1 },
  { status: "completed", label: "Completed", value: 2 },
];

const statusConfig = {
  value: { label: "Projects" },
  draft: { label: "Draft" },
  sent: { label: "Invoice Sent" },
  clientPaid: { label: "Client Paid" },
  completed: { label: "Completed" },
} satisfies ChartConfig;

// --- Chart 2: Top Clients Bar ---
const clientData = [
  { client: "Vanta Labs", amount: 8500 },
  { client: "Loopcast", amount: 6200 },
  { client: "Okafor & Co.", amount: 4200 },
  { client: "Kova Vent.", amount: 2500 },
  { client: "Orbit AI", amount: 1950 },
];

const clientConfig = {
  amount: { label: "Amount (USDC)" },
} satisfies ChartConfig;

// --- Chart 3: Collection stats ---
const collectionStats = {
  collected: 18450,
  outstanding: 6200,
  overdue: 2500,
  totalInvoices: 7,
  paid: 4,
  unpaid: 2,
  overdueCt: 1,
};
const total =
  collectionStats.collected +
  collectionStats.outstanding +
  collectionStats.overdue;
const collectedPct = Math.round((collectionStats.collected / total) * 100);
const outstandingPct = Math.round((collectionStats.outstanding / total) * 100);
const overduePct = Math.round((collectionStats.overdue / total) * 100);
const collectionRate = Math.round(
  (collectionStats.paid / collectionStats.totalInvoices) * 100,
);

export const ProjectCharts = () => {
  return (
    <div className={cn("grid grid-cols-3 gap-4 w-full")}>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Invoice Status</CardTitle>
          <CardDescription>Distribution by stage</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={statusConfig}
            className="mx-auto aspect-square max-h-62.5 [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="status" hideLabel />}
              />
              <Pie data={statusData} dataKey="value">
                <LabelList
                  dataKey="status"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value) =>
                    statusConfig[value as keyof typeof statusConfig]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>

      <Card className="flex flex-col">
        <CardHeader className="pb-0">
          <CardTitle className="text-base font-semibold">By Client</CardTitle>
          <CardDescription>Top clients by USDC value</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pt-4">
          <ChartContainer config={clientConfig} className="h-55 w-full">
            <BarChart
              data={clientData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              barSize={28}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="#F3F4F6"
              />
              <XAxis
                dataKey="client"
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `$${v / 1000}k`}
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
              />
              <ChartTooltip
                cursor={{ fill: "#F9FAFB" }}
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      `$${Number(value).toLocaleString()} USDC`
                    }
                  />
                }
              />
              <Bar dataKey="amount" fill="#fff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader className="pb-0">
          <CardTitle className="text-base font-semibold">Collection</CardTitle>
          <CardDescription>Invoice payment overview</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pt-4 space-y-4">
          {/* Collected bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Collected</span>
              <span className="font-semibold">
                ${collectionStats.collected.toLocaleString()}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-neutral-300 transition-all"
                style={{ width: `${collectedPct}%` }}
              />
            </div>
          </div>

          {/* Outstanding bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Outstanding</span>
              <span className="font-semibold">
                ${collectionStats.outstanding.toLocaleString()}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-neutral-500 transition-all"
                style={{ width: `${outstandingPct}%` }}
              />
            </div>
          </div>

          {/* Overdue bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overdue</span>
              <span className="font-semibold">
                ${collectionStats.overdue.toLocaleString()}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-neutral-600 transition-all"
                style={{ width: `${overduePct}%` }}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="pt-3 space-y-1.5">
            {[
              { label: "Total Invoices", value: collectionStats.totalInvoices },
              { label: "Paid", value: collectionStats.paid },
              { label: "Unpaid", value: collectionStats.unpaid },
              { label: "Overdue", value: collectionStats.overdueCt },
              { label: "Rate", value: `${collectionRate}%` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className={cn("font-medium")}>{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
