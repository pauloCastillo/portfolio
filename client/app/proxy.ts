import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest){
    const token = req.cookies.get("access_token");
    console.log(token);
    if(!token){
        return NextResponse.redirect(new URL("/auth/login", req.url))
    }
    return NextResponse.next()
}

export const configUrlMatcher = {
    matcher:["/admin/:path*"]
};