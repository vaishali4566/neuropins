"use client";

export default function SidebarItem({ icon, label, onClick }) {
  return (
    <div className="relative group">
      {/* Button */}
      <button
        onClick={onClick}
        className="w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer
                   hover:bg-white/10 transition-all duration-200 text-white"
      >
        {icon}
      </button>

      {/* Tooltip */}
      <div
        className="absolute left-14 top-1/2 -translate-y-1/2 
                   bg-[#ffffff] text-black text-xs px-3 py-1 rounded-md shadow-lg 
                   opacity-0 group-hover:opacity-100 pointer-events-none
                   transition-all duration-200 whitespace-nowrap"
      >
        {label}
      </div>
    </div>
  );
}
