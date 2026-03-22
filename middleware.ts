import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware runs on every request before the page renders.
 *
 * Responsibilities:
 *  1. Refresh the Supabase access token cookie when it expires
 *     (keeps users logged in across browser tabs and restarts).
 *  2. Redirect unauthenticated visitors away from protected pages
 *     (/tracker, /progress, /builder) to the home page with
 *     ?auth=required so the Navbar can auto-open the auth modal.
 */

const PROTECTED = ['/tracker', '/progress', '/builder']

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value),
                    )
                    supabaseResponse = NextResponse.next({ request })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options),
                    )
                },
            },
        },
    )

    // Refresh session — IMPORTANT: do not remove this
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Guard protected routes
    const isProtected = PROTECTED.some((p) => request.nextUrl.pathname.startsWith(p))
    if (isProtected && !user) {
        const url = request.nextUrl.clone()
        url.pathname = '/'
        url.searchParams.set('auth', 'required')
        return NextResponse.redirect(url)
    }

    return supabaseResponse
}

export const config = {
    matcher: [
        /*
         * Match all request paths EXCEPT:
         * - _next/static  (static files)
         * - _next/image   (image optimization)
         * - favicon.ico
         * - public assets
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}