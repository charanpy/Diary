import Cryptr from "cryptr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await req.json();
    cookies().delete("user");

    if (!data || !data.result) {
      return NextResponse.json(
        {
          error: "Invalid value",
        },
        { status: 400 }
      );
    }

    const cryptr = new Cryptr(process.env.PASSWORD_SECRET);
    return NextResponse.json(
      {
        data: cryptr.decrypt(data.result),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
};
