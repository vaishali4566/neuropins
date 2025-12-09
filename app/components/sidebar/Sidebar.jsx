"use client";

import { Home, Upload } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="h-screen w-16 bg-[#0b0b1a] flex flex-col items-center py-6 gap-2 fixed left-0 top-0 ">

      <SidebarItem icon={<Home size={18} />} onClick={() => router.push("/feed")} />

      <SidebarItem icon={<Upload size={18} />} onClick={() => router.push("/upload")} />

      
    </div>
  );
}
