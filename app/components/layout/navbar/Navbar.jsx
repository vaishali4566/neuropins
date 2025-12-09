"use client";

import { useState } from "react";
import LogoutButton from "../../LogoutButton";
import { Menu, User, LogOut } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between ml-16 bg-[#121212] px-6 py-4 bg-slate shadow-lg sticky top-0 z-20">

      {/* 🔍 Search Bar */}
      <input
        className="w-full  border border-white/20 bg-[#121212] text-white placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#1E88E5]"
        type="text"
        placeholder="Search..."
      />

      {/* 👤 Profile Icon Section */}
      <div className="relative ml-6">
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-[#1E88E5] flex items-center justify-center hover:bg-[#1565C0] transition"
        >
          <User size={20} className="text-white" />
        </button>

        {/* ▼ Dropdown Menu */}
        {open && (
          <div className="absolute right-0 mt-3 w-40 bg-[#313131] border border-white/10 rounded-lg shadow-lg py-2">

            <button
              className="w-full px-4 py-2 flex items-center gap-2 text-sm text-gray-300 hover:bg-[#121212] transition"
            >
              <User size={16} /> Profile
            </button>

            <LogoutButton>
              <div className="w-full px-4 py-2 flex items-center gap-2 text-sm  hover:bg-[#121212] transition">
                <LogOut size={16} /> Logout
              </div>
            </LogoutButton>

          </div>
        )}
      </div>
    </div>
  );
}

