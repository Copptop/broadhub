import NextAuth from "next-auth"
import authConfig from "authConfig"
import { APIAuthPrefix, AuthRoutes, DefaultRedirectRoute, PublicRoutes } from "@/routes"

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req
  const activeSession = !!req.auth

  const isAPIAuthRoute = nextUrl.pathname.startsWith(APIAuthPrefix)
  const isPublicRoute = PublicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = AuthRoutes.includes(nextUrl.pathname)

  if (isAPIAuthRoute) {
    return
  }

  if (isAuthRoute) {
    if (activeSession) {
      return Response.redirect(new URL(DefaultRedirectRoute, nextUrl))
    }
    return
  }

  if (!isPublicRoute && !activeSession) {
    return Response.redirect(new URL('/auth/signin', nextUrl))
  }

  return
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}