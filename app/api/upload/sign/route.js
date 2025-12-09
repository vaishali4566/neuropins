// app/api/upload/sign/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: "Cloudinary not configured" }, { status: 500 });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "neuropins";

    // must sign all parameters you will send to Cloudinary
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;

    const signature = crypto
      .createHash("sha1")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    return NextResponse.json({
      signature,
      timestamp,
      folder,
      api_key: apiKey,
      cloud_name: cloudName,
    });
  } catch (err) {
    return NextResponse.json({ error: "Could not create signature" }, { status: 500 });
  }
}
