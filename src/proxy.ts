import { NextResponse } from "next/server";

/**
 * Gates development-only routes before rendering begins.
 *
 * An in-page environment check is not enough: the root loading.tsx puts the
 * page inside a Suspense boundary, so the 200 status is already flushed by
 * the time `notFound()` throws, leaving a 404 page served as 200. Blocking
 * here returns a real 404 and avoids rendering the route at all.
 *
 * Tested against "development" rather than "production" so an unset or
 * unexpected NODE_ENV hides the route instead of publishing it.
 */
export function proxy() {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  return new NextResponse(null, { status: 404 });
}

export const config = {
  matcher: ["/design-system", "/admin/curriculum"],
};
