'use client';

import Globe from '@/components/ui/globe';
import WaveEffect from '@/components/WaveEffect';
import { PromptBox } from '@/components/ui/chatgpt-prompt-input';
import ChatHistory from '@/components/ChatHistory';
import Navigation from '@/components/Navigation';
import { useState } from 'react';

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const handleSidebarCollapse = (collapsed: boolean) => setSidebarCollapsed(collapsed);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message");
    console.log("Ocean query:", message);
    // Handle the ocean-related query here
  };

  return (
  <div className="min-h-screen text-[#E0F2F1] overflow-hidden relative bg-gradient-to-br from-[#181F2A] via-[#22304A] to-[#233554]">
      <Navigation isSidebarCollapsed={sidebarCollapsed} />
      <ChatHistory onCollapse={handleSidebarCollapse} />
      {/* Globe is now only rendered in the main content, not as a background */}
      <main
        className={`flex flex-col items-center relative z-10 h-[calc(100vh-64px)] mt-16 backdrop-blur-sm ${sidebarCollapsed ? '' : 'ml-[280px] w-[calc(100%-280px)]'}`}
        style={{
          background: 'linear-gradient(0deg, #1AC3D9 0%, #007B9A 18%, #014154 60%, #01212A 100%)'
        }}
      >
        <WaveEffect />
        {/* Heading and description above the globe */}
        <div className="flex flex-col items-center w-full max-w-3xl gap-2 mt-2">
            <h1
              className="text-4xl font-extrabold text-white drop-shadow-lg text-center py-2 font-[Montserrat] tracking-wide"
              style={{ wordSpacing: '0.2em', fontFamily: "'Montserrat', 'Segoe UI', 'Arial', sans-serif" }}
            >
              Computational Buoy Data Intelligence Synthesis System
            </h1>
          <p className="text-l text-[#B0BEC5] leading-relaxed text-center">
            Explore the world&apos;s ocean through autonomous profiling floats. 
            Discover temperature, salinity, and biogeochemical data from across the globe.
          </p>
        </div>
        {/* Globe centered in the main section, flex-grow to fill space */}
        <div className="flex justify-center items-center w-full flex-grow min-h-[220px]">
          <Globe />
        </div>
        {/* Option buttons just below the globe */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-2xl z-10 mb-32">
            <a
              href="/explore"
              className="bg-transparent hover:bg-[#1AC3D9] hover:bg-opacity-80 text-white px-5 py-2 rounded-md transition-all duration-300 font-medium shadow-md hover:shadow-[#1AC3D9]/30 border-2 border-[#1AC3D9]/40 text-base"
            >
              Explore Floats
            </a>
          <a
            href="/data-stories"
            className="bg-transparent hover:bg-[#1AC3D9] hover:bg-opacity-80 text-white px-5 py-2 rounded-md transition-all duration-300 font-medium shadow-md hover:shadow-[#1AC3D9]/30 border-2 border-[#1AC3D9]/40 text-base"
          >
            View Data Stories
          </a>
        </div>
        {/* Prompt Box - Centered at the bottom of main section */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center z-20 pointer-events-none">
          <form onSubmit={handleSubmit} className="w-full max-w-2xl pointer-events-auto">
            <PromptBox 
              placeholder="Ask me about the ocean..." 
              name="message"
              className="w-full bg-[#181F2A]/40 backdrop-blur-sm border border-[#233554]"
            />
          </form>
        </div>
      </main>
    </div>
  );
}
