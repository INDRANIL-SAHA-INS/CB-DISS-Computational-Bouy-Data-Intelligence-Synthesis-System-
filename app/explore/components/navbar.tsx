"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Menu,
  Home,
  Globe,
  BookOpen,
  BarChart2,
  Filter,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add icons to nav items
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/explore", label: "Explore Floats", icon: Globe },
    { href: "/data-stories", label: "Data Stories", icon: BarChart2 },
    { href: "/documentation", label: "Documentation", icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#181F2A] border-b border-[#22304A] shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center text-xl font-extrabold tracking-widest text-white hover:text-[#00B4D8] transition-colors duration-200"
              style={{
                fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
              }}
            >
              <span
                className="bg-[#00B4D8] text-white rounded-lg px-2 py-0.5 mr-2"
                style={{
                  fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  letterSpacing: "0.08em",
                }}
              >
                CB
              </span>
              <span
                className="uppercase"
                style={{
                  fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  letterSpacing: "0.08em",
                }}
              >
                DiSS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-[#233554] text-[#00B4D8] shadow"
                      : "text-[#E0F2F1] hover:bg-[#22304A] hover:text-[#00B4D8]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Icon */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Toggle Filters button removed as requested */}
            <button className="p-2 rounded-full text-[#B0BEC5] hover:text-[#00B4D8] hover:bg-[#22304A] transition-all duration-200">
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[#B0BEC5] hover:text-[#00B4D8] hover:bg-[#22304A] transition-all duration-200"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#22304A] rounded-lg border border-[#233554] shadow-xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? "bg-[#233554] text-[#00B4D8] shadow"
                      : "text-[#E0F2F1] hover:bg-[#233554] hover:text-[#00B4D8]"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#E0F2F1] hover:text-[#00B4D8] hover:bg-[#233554] rounded-md transition-all duration-200">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
