"use client";

import { cn } from "@/lib/utils";
import {
  AnalyticsCard,
  AnalyticsFooter,
  AnalyticsHeader,
  AnalyticsMainContent,
  AnalyticsTitle,
} from "@/components/cards/analytics-card";
export const ProjectAnalytics = () => {
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
          <AnalyticsTitle>Collected</AnalyticsTitle>
          <AnalyticsMainContent>$34,700</AnalyticsMainContent>
        </AnalyticsHeader>
        <AnalyticsFooter>received payouts</AnalyticsFooter>
      </AnalyticsCard>

      <AnalyticsCard>
        <AnalyticsHeader>
          <AnalyticsTitle>Pending</AnalyticsTitle>
          <AnalyticsMainContent>$30,700</AnalyticsMainContent>
        </AnalyticsHeader>
        <AnalyticsFooter>yet to be paid</AnalyticsFooter>
      </AnalyticsCard>

      <AnalyticsCard>
        <AnalyticsHeader>
          <AnalyticsTitle>Projects</AnalyticsTitle>
          <AnalyticsMainContent>2</AnalyticsMainContent>
        </AnalyticsHeader>
        <AnalyticsFooter>yet to be completed</AnalyticsFooter>
      </AnalyticsCard>
    </div>
  );
};
