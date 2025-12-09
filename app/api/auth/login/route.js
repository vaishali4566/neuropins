import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { comparePassword, signJwt } from "@/utils/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    await connectDB();

    // Check user exists
    const user = await User.findOne({ email });

    console.log(user)

    if (!user || !comparePassword(password, user.password)) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Create JWT
    const token = signJwt({ userId: user._id });

    // Response without password
    const res = NextResponse.json({
      ok: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

    // Set cookie
    res.headers.append(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=604800`
    );

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}
