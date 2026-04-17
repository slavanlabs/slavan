import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";


export default async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers
    })

    console.log(session);
    

    if(!session) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/api/v1/:path*']
}