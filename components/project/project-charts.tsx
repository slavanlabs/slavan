"use client";

import { cn } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  clientConfig,
  clientData,
  collectionConfig,
  collectionData,
  statusConfig,
  statusData,
} from "./config/charts";

export const ProjectCharts = () => {
  return (
    <div className={cn("grid grid-cols-3 gap-4 w-full")}>
      {/* Invoice Status Chart */}
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
                content={<ChartTooltipContent nameKey="label" hideLabel />}
              />
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="label"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
              >
                {statusData.map((entry) => (
                  <Cell key={entry.status} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 px-4 pb-4 pt-2">
          {statusData.map((s) => (
            <div key={s.status} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ background: s.fill }}
              />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Client Distribution Chart */}
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
                stroke="#525252"
              />
              <XAxis
                dataKey="client"
                tick={{ fontSize: 11, fill: "#737373" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `$${v / 1000}k`}
                tick={{ fontSize: 11, fill: "#737373" }}
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
              <Bar dataKey="amount" fill="#A6A6A6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Collection Stats */}
      <Card className="flex flex-col">
        <CardHeader className="pb-0">
          <CardTitle className="text-base font-semibold">Collection</CardTitle>
          <CardDescription>Invoice payment overview</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pt-4">
          <ChartContainer
            config={collectionConfig}
            className="mx-auto aspect-square max-h-62.5"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={collectionData}
                dataKey="value"
                nameKey="label"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {collectionData[0].value?.toLocaleString()}%
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Collected
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
