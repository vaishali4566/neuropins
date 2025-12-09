import  {connectDB} from "@/lib/db";
import { NextResponse } from "next/server";
import Pin from "@/models/Pin"
import {decodeJwt} from "@/utils/auth"

export async function GET(req) {
    await connectDB();
    
    const pins = await Pin.find().sort({createdAt : -1}).limit(20);
    return NextResponse.json({pins});

}

export async function POST(req) {
    const user = decodeJwt(req);

    if(!user) return NextResponse.json({error : "Unauthorized"}, {status : 401});

    const body = await req.json();
    const {imageURL, title, userTags} = body;

    await connectDB();

    const pin = await Pin.create({
        imageURL, 
        title,
        userTags,
        uploadedBy : user.userId,
        status : "pending"
    });

    return NextResponse.json({ok : true, pin});    
}