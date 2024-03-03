import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import Cryptr from "cryptr";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data } = await supabase.auth.getUser();

    if (!data || !data?.user) {
      return NextResponse.json(
        {
          error: "Not Authorized",
        },
        { status: 401 }
      );
    }

    const { content, isPrivate, title } = await req.json();

    if (!content || !title) {
      return NextResponse.json(
        {
          error: "Please fill all fields",
        },
        { status: 400 }
      );
    }

    const cryptr = new Cryptr(process.env.NEXT_PUBLIC_CLIENT_SECRET, {
      saltLength: 10,
    });

    const contentCryptr = new Cryptr(process.env.SERVER_SECRET);
    revalidatePath(req.nextUrl.pathname);
    const { error } = await supabase.from("thoughts").insert({
      user_id: data?.user?.id,
      content: contentCryptr.encrypt(cryptr.decrypt(content)),
      title,
      is_private: isPrivate,
    });

    if (error) {
      throw new Error();
    }
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong.Please try again!" },
      { status: 500 }
    );
  }
}
