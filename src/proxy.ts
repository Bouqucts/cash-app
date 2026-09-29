import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("session")?.value;

    if (!token) {
        return NextResponse.redirect(
            new URL("/signin", req.url)
        );
    }

    try {
        const user = verifyToken(token);

        if (!user) {
            const response = NextResponse.redirect(
                new URL("/signin", req.url)
            );

            response.cookies.delete("session");

            return response;
        }

        return NextResponse.next();

    } catch {
        const response = NextResponse.redirect(
            new URL("/signin", req.url)
        );

        response.cookies.delete("session");

        return response;
    }
}

export const config = {
    matcher: ["/"],
};