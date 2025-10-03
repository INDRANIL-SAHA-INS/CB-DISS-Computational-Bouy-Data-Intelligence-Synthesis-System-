'use client';
import React from "react";

// ...existing code...

const handleClick = () => {
  window.location.href = "https://cb-diss-computational-bouy-data-int-five.vercel.app/";
};

// ...existing code...

// Add the button to the Navigation component's JSX
// Find the main return statement and add:
// <button onClick={handleClick} style={{ marginLeft: '1rem', padding: '0.5rem 1rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Click Me</button>


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Menu, Home, Globe, BookOpen, BarChart2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  isSidebarCollapsed?: boolean;
}

export default function Navigation({ isSidebarCollapsed = false }: NavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add icons to nav items
  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/explore', label: 'Explore Floats', icon: Globe },
    { href: '/data-stories', label: 'Data Stories', icon: BarChart2 },
    { href: '/documentation', label: 'Documentation', icon: BookOpen },
  ];

  return (
    <motion.nav 
      initial={false}
      animate={{ 
        left: isSidebarCollapsed ? '60px' : '280px'
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 right-0 z-50 bg-[#181F2A] border-b border-[#22304A] shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
            <div className="flex items-center">
              <Link
              href="/"
              className="flex items-center text-xl font-extrabold tracking-widest text-white hover:text-[#00B4D8] transition-colors duration-200"
              style={{ fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif" }}
              >
              <span
                className="bg-[#00B4D8] text-white rounded-lg px-2 py-0.5 mr-2"
                style={{
                fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '0.08em',
                }}
              >
                CB
              </span>
              <span
                className="uppercase"
                style={{
                fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif",
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '0.08em',
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
                      ? 'bg-[#233554] text-[#00B4D8] shadow'
                      : 'text-[#E0F2F1] hover:bg-[#22304A] hover:text-[#00B4D8]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {/* Go to Main Site Button */}
            <button
              onClick={handleClick}
              className="ml-4 px-4 py-2 bg-[#0070f3] text-white rounded-md font-semibold shadow hover:bg-[#005bb5] transition-colors duration-200"
            >
              Go to Main Site
            </button>
          </div>

          {/* User Icon */}
          <div className="hidden md:flex items-center">
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
            {/* Go to Main Site Button for mobile */}
            <button
              onClick={handleClick}
              className="ml-2 px-3 py-1 bg-[#0070f3] text-white rounded-md font-semibold shadow hover:bg-[#005bb5] transition-colors duration-200"
            >
              Go to Main Site
            </button>
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
                        ? 'bg-[#233554] text-[#00B4D8] shadow'
                        : 'text-[#E0F2F1] hover:bg-[#233554] hover:text-[#00B4D8]'
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
      </div>
    </motion.nav>
  );
}