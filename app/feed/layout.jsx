"use client";

import Navbar from "../components/layout/navbar/Navbar";
import Sidebar from "../components/layout/sidebar/Sidebar";

export default function FeedLayout({ children }) {
  return (
    <div className="bg-[#121212] text-[#E0E0E0] flex min-h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main>{children}</main>
      </div>

    </div>
  );
}
