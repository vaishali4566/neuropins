// app/api/pins/route.js
import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Pin from "@/models/Pin";
import { decodeJwt } from "@/utils/auth";

export async function POST(req) {
  try {
    await connectDB();

    // Decode JWT from request using utility
    const user = decodeJwt(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Read request body
    const body = await req.json();
    const {
      imageUrl,
      thumbnailUrl,
      title,
      description,
      userTags = [],
      aiTags = [],
      dominantColors = [],
      nsfwScore = null
    } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl is required" }, { status: 400 });
    }

    // Create pin in DB
    const pin = await Pin.create({
      imageUrl,
      thumbnailUrl,
      uploadedBy: user.userId, // userId from decoded JWT
      title,
      description,
      userTags,
      aiTags,
      dominantColors,
      nsfwScore,
      status: "ready"
    });

    return NextResponse.json({ pin }, { status: 201 });

  } catch (err) {
    console.error("Create pin error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const pins = await Pin.find({ status: "ready" }).sort({ createdAt: -1 }).limit(100).lean();
    return NextResponse.json({ pins }, { status: 200 });
  } catch (err) {
    console.error("Fetch pins error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
