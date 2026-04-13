import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// get all the project details for a particular agency.
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.session.userId;

    const agency = await prisma.agency.findUnique({
      where: {
        userId,
      },
    });

    if (!agency) {
      return NextResponse.json({ message: "INVALID_REQUEST" }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      where: {
        agencyId: agency.id,
      },
    });

    return NextResponse.json({ message: "SUCCESS", projects });
  } catch (error) {
    console.log("PRO_PROJECTS", error);
    return NextResponse.json({ message: "SERVER_ERROR" }, { status: 500 });
  }
}
