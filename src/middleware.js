import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathName = req.nextUrl.pathname + "";

  if (user && pathName === "/auth") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!user && pathName !== "/auth") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (pathName.includes("feeds") && pathName.includes("private")) {
    const result = await validatePrivateFeed(
      cookies(),
      supabase,
      user.id,
      req.url
    );
    res.cookies.delete("user");
    if (!result) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
  }
  req.user = user;
  return res;
}

const validatePrivateFeed = async (cookies, supabase, userId, url) => {
  const cookie = cookies.get("user");
  if (!cookie || !cookie?.value) {
    return false;
  }

  const res = await fetch(`${url}/validate`, {
    method: "POST",
    body: JSON.stringify({ result: cookie.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!data && data?.result !== userId) {
    return false;
  }
  return true;
};

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
