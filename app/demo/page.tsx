"use client"
import React, { useState } from 'react'
import ChatHistorySidebar from './components/chatsidebar_styke'
import Navbar from './components/navbar2'

const page = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="motherdiv w-screen h-screen min-h-screen min-w-full bg-[#0B0D17] relative">
  <div className='header-container absolute top-0 left-0 w-full h-16 z-10 flex items-center p-2'>
        <Navbar />
      </div>
      <div
        className='sidebar-plus-main-container absolute left-0 w-full flex top-16 h-[calc(100vh-4rem)]'
      >
        {/* Collapse/Expand Button */}
        <button
          className="absolute top-4 left-4 z-20 bg-gray-800 text-white rounded-full p-1 shadow-md hover:bg-gray-700 transition-all duration-200"
          style={{ display: collapsed ? 'none' : 'block' }}
          onClick={() => setCollapsed(true)}
          aria-label="Collapse sidebar"
        >
          &lt;
        </button>
        <button
          className="absolute top-4 left-4 z-20 bg-gray-800 text-white rounded-full p-1 shadow-md hover:bg-gray-700 transition-all duration-200"
          style={{ display: collapsed ? 'block' : 'none' }}
          onClick={() => setCollapsed(false)}
          aria-label="Expand sidebar"
        >
          &gt;
        </button>
        <div
          className={`Sidebar-container h-full p-4 flex flex-col transition-all duration-300 ${collapsed ? 'w-0 min-w-0 overflow-hidden' : 'w-[19%] min-w-[180px]'}`}
        >
          {!collapsed && <ChatHistorySidebar />}
        </div>
        <div
          className={`Main-container h-full bg-white flex flex-col transition-all duration-300 ${collapsed ? 'w-full' : 'w-[81%]'}`}
        >
          {/* Main content goes here and will fill container */}
          This will have main content component inside
        </div>
      </div>
    </div>
  )
}

export default page
