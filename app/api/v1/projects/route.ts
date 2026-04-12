import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


// get all the project details for a particular agency.
export async function GET(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if(!session?.user) {
            return NextResponse.json({ message: "UNAUTHORIZED"}, { status: 401 });
        }

        


    } catch (error) {
        
    }
}