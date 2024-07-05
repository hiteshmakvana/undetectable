import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = ["/", "/documents", "/api/users", "/api/documents"];

/**
 * Authentication middleware
 * @param req
 */
export default function middleware(req: NextRequest) {
    const casdoorUserCookie = req.cookies.get("casdoorUser");
    const isAuthenticated = !!casdoorUserCookie;
    if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
        if (req.nextUrl.pathname.includes("/api/")) {
            return NextResponse.json({
                code: 401,
                message: 'Unauthorized'
            }, { status: 401 });
        } else {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }
}

