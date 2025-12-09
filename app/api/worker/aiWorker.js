import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../lib/db.js";
import Pin from "../models/Pin.js";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function processPin(pin) {
  try {
    const prompt = `
Analyze this image: ${pin.imageUrl}
Return JSON only:
{
  "tags": [...],
  "description": "...",
  "colors": [...]
}`;

    const res = await openai.responses.create({
      model: "gpt-4o-mini",
      input: prompt
    });

    const text = res.output_text || "";
    const json = JSON.parse(text);

    await Pin.findByIdAndUpdate(pin._id, {
      aiTags: json.tags || [],
      description: json.description || "",
      dominantColors: json.colors || [],
      status: "ready"
    });

    console.log("Processed pin:", pin._id);
  } catch (err) {
    console.log("Worker error:", err);
    await Pin.findByIdAndUpdate(pin._id, { status: "failed" });
  }
}

async function runWorker() {
  await connectDB();
  console.log("Worker started...");

  setInterval(async () => {
    const pin = await Pin.findOne({ status: "pending" });
    if (pin) await processPin(pin);
  }, Number(process.env.WORKER_POLL_INTERVAL_MS));
}

runWorker();
