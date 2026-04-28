import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/send-email";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const agency = await prisma.agency.findFirst({
    where: {
      userId: session?.session.userId,
    },
  });

  if (!agency) {
    return NextResponse.json({ message: "ACCESS_DENIED" }, { status: 401 });
  }

  const emailAlreadyMemberOfAgency = await prisma.member.findFirst({
    where: {
      agencyId: agency.id,
      email,
    },
  });

  if (emailAlreadyMemberOfAgency) {
    return NextResponse.json(
      { message: "MEMBER_ALREADY_EXISTS" },
      { status: 402 },
    );
  }

  const existingInvite = await prisma.agencyInvite.findFirst({
    where: {
      agencyId: agency.id,
      email,
      status: "PENDING",
    },
  });

  if (existingInvite) {
    return NextResponse.json(
      { message: "INVITE_ALREADY_SENT" },
      { status: 403 },
    );
  }

  const inviteToken = crypto.randomUUID();
  const invite = await prisma.agencyInvite.create({
    data: {
      agencyId: agency.id,
      email,
      invitedById: session?.session.userId || "",
      inviteToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
    },
  });

  await sendEmail({
    to: email,
    subject: `You're invited to join ${agency.name} on Slavan`,
    text: `You have been invited to join the agency ${agency.name} on Slavan. Click the link below to accept the invitation:\n\n${process.env.NEXT_PUBLIC_BASE_URL}/accept-invite?token=${inviteToken}\n\nThis invitation will expire in 7 days.`,
  });

  return NextResponse.json({ message: "INVITE_SENT", invite });
}
