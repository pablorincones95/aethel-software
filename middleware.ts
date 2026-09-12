import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const hasSession = request.cookies.has("aethel_session")
  const hasFirebase = Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    (process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.FIREBASE_PRIVATE_KEY)
  )

  // If Firebase is not configured yet, allow route access in local development
  if (!hasFirebase) {
    return NextResponse.next()
  }

  // Allow /admin/login without authentication; if already logged in, redirect to /admin
  if (pathname === "/admin/login") {
    if (hasSession) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin"
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!hasSession) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
