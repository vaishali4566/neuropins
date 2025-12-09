"use client";

import { Home, Upload, Settings, Bell, Pin ,MessageCircleMore  } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="h-screen w-16 bg-[#1e1e1f] flex flex-col items-center py-6 fixed left-0 top-0">

  {/* Logo */}
  {/* <div className="mb-4">
    <img src="/logo.png" alt="Neuropins" className="w-10 h-10" />
  </div> */}

  {/* Top Icons */}
  <div className="flex flex-col items-center gap-2">
    <SidebarItem icon={<Home size={18} />} label="Home" onClick={() => router.push("/feed")} />
    <SidebarItem icon={<Upload size={18} />} label="Upload" onClick={() => router.push("/feed/upload")} />
    <SidebarItem icon={<Pin size={18} />} label="Pins" onClick={() => router.push("/feed/pins")} />
    <SidebarItem icon={<MessageCircleMore size={18} />} label="Chat" onClick={() => router.push("/feed/chat")} />
    <SidebarItem icon={<Bell size={18} />} label="Notification" onClick={() => router.push("/feed/notification")} />
  </div>

  {/* Spacer */}
  <div className="flex-1"></div>

  {/* Bottom Settings */}
  <div className="flex flex-col items-center gap-2 mb-4">
    <SidebarItem icon={<Settings size={18} />} label="Settings" onClick={() => router.push("/settings")} />
  </div>

</div>

  );
}