"use client";

import { Home, Search, Bell, User } from "lucide-react"; // Replace icons with exact ones from your design
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <nav
      className={cn(
        "w-full h-full",
        "bg-gradient-to-b from-[#152860] to-[#0D1B2A] border-b border-[#152860]",
        "flex items-center justify-between px-4 rounded-2xl overflow-hidden"
      )}
    >
      {/* Left Section: Logo / Brand */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-[#2E5BFF] to-[#00C6FF]" />
        <span className="text-white font-semibold tracking-wide text-sm">
          Argo Viewer
        </span>
      </div>

      {/* Center Section: Nav Links */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <button className="text-gray-300 hover:text-white transition-colors">
          Dashboard
        </button>
        <button className="text-gray-300 hover:text-white transition-colors">
          Explore
        </button>
        <button className="text-gray-300 hover:text-white transition-colors">
          Data
        </button>
        <button className="text-gray-300 hover:text-white transition-colors">
          AI Chat
        </button>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <button className="text-gray-300 hover:text-white transition-colors">
          <Search className="h-5 w-5" />
        </button>
        {/* Notifications */}
        <button className="relative text-gray-300 hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        {/* User Avatar */}
        <div className="h-8 w-8 rounded-full bg-[#2E5BFF] flex items-center justify-center text-white text-sm font-bold">
          U
        </div>
      </div>
    </nav>
  );
}
