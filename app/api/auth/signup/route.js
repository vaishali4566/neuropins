import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { hashPassword, signJwt } from "@/utils/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("BODY:", body);

    const { name, email, password } = body;

    await connectDB();

    // Check if email exists
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPass = hashPassword(password);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPass,
    });

    // JWT token
    const token = signJwt({ userId: user._id });

    const res = NextResponse.json({
      ok: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    // Set cookie
    res.headers.append(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=604800`
    );

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
