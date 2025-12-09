import { connectDB } from "@/lib/db";
import Pin from "@/models/Pin";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  await connectDB();
  const pin = await Pin.findById(id);
  if (!pin) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ pin });
}
