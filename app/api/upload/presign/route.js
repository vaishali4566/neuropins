import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json({
        cloudName : process.env.CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    });
}