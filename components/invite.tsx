"use client";

import axios from "axios";
import { cn } from "@/lib/utils";
import { Logo } from "./landing/nav-bar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Spinner } from "./ui/spinner";

interface InviteDetails {
  id: string;
  email: string;
  createdAt: Date;
  expiresAt: Date;
  agency: {
    userId: string;
    name: string;
  };
}

export const Invite = () => {
  const params = useParams();
  const token = params.token as string;
  const [inviteDetails, setInviteDetails] = useState<InviteDetails | null>(null);
  const [loadingAccept, setLoadingAccept] = useState<boolean>(false);
  const [loadingDecline, setLoadingDecline] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid Invite");
      return;
    }

    const fetchInviteDetails = async () => {
      const response = await axios.post("/api/invite", { token });
      if (response.status === 200) {
        setInviteDetails(response.data.invite);
      }
    };
    fetchInviteDetails();
  }, [token]);

  async function handleAccept() {
    setLoadingAccept(true);
    const response = await axios.patch("/api/invite", {
      token,
      action: "accept",
      email: inviteDetails?.email
    });
    if (response.status === 200) {
      toast.success("Successfully Joined");
    }
    setLoadingAccept(false);
  }

  async function handleDecline() {
    setLoadingDecline(true);
    const response = await axios.patch("/api/invite", {
      token,
      action: "decline",
    });
    if (response.status === 200) {
      toast.success("Declined to join");
    }
    setLoadingDecline(false);
  }

  return (
    <div className={cn("flex flex-col max-w-100 w-full")}>
      <div className="mx-auto">
        <Logo />
      </div>
      <div>
        <h1 className="text-left text-2xl font-medium mt-8">
          {inviteDetails ? (
            `Invite to join ${inviteDetails.agency.name}`
          ) : (
            <Skeleton className="w-full h-6" />
          )}
        </h1>
        <h4 className="text-sm dark:text-neutral-400">
          {inviteDetails ? (
            "Click the button below to accept the invitation."
          ) : (
            <Skeleton className="w-3/4 h-3 mt-2" />
          )}
        </h4>

        {inviteDetails ? (
          <Input
            value={inviteDetails?.email || ""}
            disabled
            className="rounded-sm border-none bg-neutral-100 dark:bg-neutral-800! py-5 mt-6"
          />
        ) : (
          <Skeleton className="w-full h-10 mt-6" />
        )}

        <div className="text-[13px] text-right mt-4 text-neutral-500">
          {inviteDetails ? (
            "Expires in " +
            Math.ceil(
              (new Date(inviteDetails.expiresAt).getTime() -
                new Date().getTime()) /
                (1000 * 60 * 60 * 24),
            ) +
            " days"
          ) : (
            <Skeleton className="w-16" />
          )}
        </div>

        <div className="flex items-center justify-end gap-1 mt-5">
          {inviteDetails ? (
            <Button
              disabled={loadingAccept}
              variant={"ghost"}
              onClick={handleDecline}
            >
              {loadingDecline ? <Spinner /> : "Decline"}
            </Button>
          ) : (
            <Skeleton className="w-20 h-8" />
          )}
          {inviteDetails ? (
            <Button
              disabled={loadingDecline}
              variant={"secondary"}
              onClick={handleAccept}
            >
              {loadingAccept ? (
                <Spinner />
              ) : (
                <>
                  Accept <ArrowRight />
                </>
              )}
            </Button>
          ) : (
            <Skeleton className="w-24 h-8" />
          )}
        </div>
      </div>
    </div>
  );
};
