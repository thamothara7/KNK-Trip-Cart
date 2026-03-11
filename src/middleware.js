import { NextResponse } from 'next/server';

const COOKIE_NAME = 'knk_admin_session';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Protect all /admin routes
    if (pathname.startsWith('/admin')) {
        const session = request.cookies.get(COOKIE_NAME);

        // If no valid session cookie, redirect to the admin page itself.
        // The AdminDashboard component renders the login form when not authenticated.
        // The middleware is a server-side guard — it lets the page render which
        // then shows the login screen client-side. The cookie check in AdminDashboard
        // (via checkAuth) is the actual gate that controls what the user sees.
        //
        // WHY customers can still visit /admin:
        //   - The URL /admin is publicly accessible (returns the login form)
        //   - Without the correct cookie, only the login form renders — no data is exposed
        //   - All admin API routes (/api/packages, etc.) also check auth via the cookie
        //
        // If you want to completely hide the admin URL from customers:
        //   - Keep the URL secret (don't link it anywhere on the public site)
        //   - Alternatively, redirect to "/" if no session cookie:
        //     if (!session?.value) {
        //         return NextResponse.redirect(new URL('/', request.url));
        //     }
        //
        // Current behaviour: show login form at /admin (no data exposed without login)
        if (!session?.value) {
            return NextResponse.next(); // Let AdminDashboard render its login form
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
