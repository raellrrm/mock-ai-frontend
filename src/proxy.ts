import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {

    const token = request.cookies.get('access_token')?.value;
    const { pathname } = request.nextUrl;

    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
    const isProtectedRoute = pathname.startsWith('/chat');

    try {
        if (isProtectedRoute) {
            if (!token) return NextResponse.redirect(new URL('/login', request.url));
            verifyToken(token);
            return NextResponse.next();
        }
    } catch (error) {
        console.error("Token inválido:", error);
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('access_token');
        return response;
    }

    if (isAuthRoute && token) {
        try {
            verifyToken(token);
            return NextResponse.redirect(new URL('/chat', request.url));
        } catch {
            return NextResponse.next();
        }
    }

    return NextResponse.next();

}

async function verifyToken(token: string) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    return jwtVerify(token, secret);
}

export const config = {
    matcher: ['/chat/:path*', '/login', '/register'],
};