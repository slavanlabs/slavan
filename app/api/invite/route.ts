import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ message: "NO_INVITE_TOKEN" }, { status: 404 });
  }

  const invite = await prisma.agencyInvite.findUnique({
    where: {
      inviteToken: token,
    },
    include: {
      agency: true,
    },
  });

  if (!invite) {
    return NextResponse.json({ message: "INVITE_NOT_FOUND" }, { status: 404 });
  }

  if (invite.expiresAt < new Date()) {
    return NextResponse.json({ message: "INVITE_EXPIRED" }, { status: 400 });
  }

  switch (invite.status) {
    case "ACCEPTED":
      return NextResponse.json(
        { message: "INVITE_ALREADY_ACCEPTED" },
        { status: 400 },
      );
    case "DECLINED":
      return NextResponse.json(
        { message: "INVITE_ALREADY_DECLINED" },
        { status: 400 },
      );
    case "REVOKED":
      return NextResponse.json({ message: "INVITE_REVOKED" }, { status: 400 });
  }

  return NextResponse.json({ message: "INVITE_YET_TO_BE_ACCEPTED", invite });
}

export async function PATCH(req: NextRequest) {
  const { token, action, email } = await req.json();

  if (!token) {
    return NextResponse.json({ message: "NO_INVITE_TOKEN" }, { status: 404 });
  }

  const invite = await prisma.agencyInvite.findUnique({
    where: {
      inviteToken: token,
    },
  });

  if (!invite) {
    return NextResponse.json({ message: "NO_INVITE_FOUND" }, { status: 404 });
  }

  if (action === "decline") {
    await prisma.agencyInvite.update({
      where: {
        id: invite.id,
      },
      data: {
        status: "DECLINED",
      },
    });

    return NextResponse.json({ message: "INVITE_DECLINED" });
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      member: true,
    },
  });

  if (!existingUser) {
    return NextResponse.json({ message: "USER_NOT_FOUND" }, { status: 404 });
  }

  if (existingUser.userType === "AGENCY_OWNER") {
    return NextResponse.json(
      { message: "ACTION_NOT_ALLOWED" },
      { status: 405 },
    );
  }

  if (existingUser.member?.agencyId) {
    return NextResponse.json(
      { message: "ALREADY_PRESENT_IN_AN_AGENCY" },
      { status: 409 },
    );
  }

  if (existingUser.member?.agencyId === invite.agencyId) {
    return NextResponse.json(
      { message: "EXISTS_IN_CURRENT_AGENCY" },
      { status: 409 },
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.agencyInvite.update({
      where: { id: invite.id },
      data: { status: "ACCEPTED", acceptedAt: new Date() },
    });

    await tx.member.upsert({
      where: { userId: existingUser.id },
      create: {
        name: existingUser.name,
        email: existingUser.email,
        userId: existingUser.id,
        agencyId: invite.agencyId,
      },
      update: {
        agencyId: invite.agencyId,
      },
    });

    await tx.user.update({
      where: { id: existingUser.id },
      data: { userType: "MEMBER" },
    });

    return NextResponse.json({ message: "SUCCESS" }, { status: 200 });
  });
}
