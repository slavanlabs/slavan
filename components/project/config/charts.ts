import { ChartConfig } from "@/components/ui/chart";

export const statusData = [
  { status: "draft", label: "Draft", value: 2, fill: "#7B7B7B" },
  { status: "sent", label: "Invoice Sent", value: 2, fill: "#525252" },
  { status: "clientPaid", label: "Client Paid", value: 1, fill: "#A6A6A6" },
  { status: "completed", label: "Completed", value: 2, fill: "#D9D9D9" },
];

export const statusConfig = {
  value: { label: "Projects" },
  draft: { label: "Draft" },
  sent: { label: "Invoice Sent" },
  clientPaid: { label: "Client Paid" },
  completed: { label: "Completed" },
} satisfies ChartConfig;

export const clientData = [
  { client: "Vanta Labs", amount: 8500 },
  { client: "Loopcast", amount: 6200 },
  { client: "Okafor & Co.", amount: 4200 },
  { client: "Kova Vent.", amount: 2500 },
  { client: "Orbit AI", amount: 1950 },
];

export const clientConfig = {
  amount: { label: "Amount (USDC)" },
} satisfies ChartConfig;


export const collectionData = [
  { value: 50, fill: "#A6A6A6" },
  { value: 50, fill: "#525252" },
];


export const collectionConfig = {
  collected: { label: "Collected", color: "#A6A6A6" },
  outstanding: { label: "Outstanding", color: "#525252" }
} satisfies ChartConfig;