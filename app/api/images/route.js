import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Pin from "@/models/Pin";

export async function GET() {
  try {
    await connectDB();

    const pins = await Pin.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: pins });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
