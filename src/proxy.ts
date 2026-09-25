import { NextRequest, NextResponse } from "next/server"

export function proxy(req: NextRequest) {
    const token = req.cookies.get("session")?.value;
    if(!token) return NextResponse.redirect(new URL("/login", req.url));
    try {
        if(req.nextUrl.pathname.startsWith("/dashboard") && !token) {return NextResponse.redirect(new URL("/unauthorized", req.url))}
        return NextResponse.next();
    } catch {
        const response = NextResponse.redirect(
            new URL("/login", req.url)
        );

        response.cookies.delete("session");

        return response;
    }
}

export const config = {
    matcher: ["/",]
}