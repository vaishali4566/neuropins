"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

export default function FeedPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState([]);

  // 🔐 Login Check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
  }, []);

  // 📥 Fetch images
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/images");
        const data = await res.json();
        setPhotos(data.images || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-[#E0E0E0] flex">

      {/* 🔹 Fixed Left Sidebar */}
      <Sidebar />

      {/* 🔹 Main Content */}
      <div className="flex-1 ml-16">

        {/* Navbar */}
        <Navbar />

        {/* Feed Masonry Grid */}
        <div className="p-6 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5">

          {photos.length === 0 && (
            <p className="text-center text-gray-400 text-lg mt-10">
              No photos uploaded yet.
            </p>
          )}

          {photos.map((img) => (
            <div
              key={img._id}
              className="mb-5 break-inside-avoid bg-[#1E1E2F] rounded-2xl overflow-hidden shadow-md border border-white/10 hover:scale-[1.01] transition-transform"
            >
              <img
                src={img.imageUrl}
                alt="pin"
                className="w-full h-auto rounded-2xl"
              />

              <div className="p-3 flex items-center justify-between">
                <p className="text-sm text-gray-300">
                  {img.title || "Untitled Pin"}
                </p>
                <span className="text-xs px-2 py-1 bg-[#1E88E5]/20 text-[#1E88E5] rounded-lg">
                  {img.category || "Pin"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
