import { APIAuthPrefix, AuthRoutes, DefaultRedirectRoute, PublicRoutes } from "@/routes";
import authConfig from "authConfig";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req
  const activeSession = !!req.auth

  const isAPIAuthRoute = nextUrl.pathname.startsWith(APIAuthPrefix)
  const isPublicRoute = PublicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname)

  // Check if the route is a API route
  if (isAPIAuthRoute) {
    return
  }

  // Check if the route is a authenitcaition route
  if (isAuthRoute) {
    if (activeSession) {
      return Response.redirect(new URL(DefaultRedirectRoute, nextUrl))
    }
    return
  }

  // Check if the route is a public route or the user has an active session
  if (!isPublicRoute && !activeSession) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }
    const encodedRedirectUrl = encodeURIComponent(callbackUrl)
    return Response.redirect(new URL(`/auth/signin?callbackUrl=${encodedRedirectUrl}`, nextUrl))
  }

  return
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}