"use client";
import { cn } from "@/lib/utils";
import {
  AnalyticsCard,
  AnalyticsFooter,
  AnalyticsHeader,
  AnalyticsMainContent,
  AnalyticsTitle,
} from "@/components/cards/analytics-card";

export const DashboardAnalytics = () => {
  return (
    <div className={cn("grid grid-cols-4 gap-4 w-full")}>
      <AnalyticsCard>
        <AnalyticsHeader>
          <AnalyticsTitle>Total earned</AnalyticsTitle>
          <AnalyticsMainContent>$18,250</AnalyticsMainContent>
        </AnalyticsHeader>
        <AnalyticsFooter>via USDC on Solana</AnalyticsFooter>
      </AnalyticsCard>

      <AnalyticsCard>
        <AnalyticsHeader>
          <AnalyticsTitle>Pending</AnalyticsTitle>
          <AnalyticsMainContent>$6,250</AnalyticsMainContent>
        </AnalyticsHeader>
        <AnalyticsFooter>2 invoices sent</AnalyticsFooter>
      </AnalyticsCard>

      <AnalyticsCard>
        <AnalyticsHeader>
          <AnalyticsTitle>Projects</AnalyticsTitle>
          <AnalyticsMainContent>7</AnalyticsMainContent>
        </AnalyticsHeader>
        <AnalyticsFooter>3 active projects</AnalyticsFooter>
      </AnalyticsCard>

      <AnalyticsCard>
        <AnalyticsHeader>
          <AnalyticsTitle>Total earned</AnalyticsTitle>
          <AnalyticsMainContent>$18,250</AnalyticsMainContent>
        </AnalyticsHeader>
        <AnalyticsFooter>via USDC on Solana</AnalyticsFooter>
      </AnalyticsCard>
    </div>
  );
};
