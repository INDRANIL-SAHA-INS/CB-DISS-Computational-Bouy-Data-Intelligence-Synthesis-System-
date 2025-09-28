'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, Calendar, Plus, Menu, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatSession {
  id: string;
  title: string;
  date: string;
  preview: string;
}

// Add prop type for onCollapse
interface ChatHistoryProps {
  onCollapse?: (collapsed: boolean) => void;
}

const mockSessions: ChatSession[] = [
  {
    id: '1',
    title: 'Ocean Warming',
    date: 'Aug 24',
    preview: 'Global temperature trends...'
  },
  {
    id: '2',
    title: 'BGC in Indian Ocean',
    date: 'Aug 23',
    preview: 'Biogeochemical analysis...'
  },
  {
    id: '3',
    title: 'Float 2902214 Details',
    date: 'Aug 22',
    preview: 'Technical specifications...'
  },
  {
    id: '4',
    title: 'El Niño Impact',
    date: 'Aug 21',
    preview: 'Climate pattern effects...'
  },
  {
    id: '5',
    title: 'Oxygen Depletion',
    date: 'Aug 20',
    preview: 'Arabian Sea analysis...'
  }
];

export default function ChatHistory({ onCollapse }: ChatHistoryProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Notify parent when collapsed state changes
  const handleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    if (onCollapse) onCollapse(newCollapsed);
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 60 : 280 }}
      className="fixed left-0 top-0 bottom-0 z-50 bg-[#181F2A] border-r border-[#22304A] shadow-xl"
    >
      <div className="flex flex-col h-full">
        {/* Top Bar with Menu and Search */}
        <div className="flex items-center justify-between p-4 h-16 border-b border-[#22304A]">
          <button
            onClick={handleCollapse}
            className="p-1 text-[#B0BEC5] hover:text-[#00B4D8] transition-all duration-200"
          >
            <Menu className="w-5 h-5" />
          </button>
          {!isCollapsed ? (
            <div className="flex-1 mx-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search chats..."
                  className="w-full bg-[#233554] text-[#E0F2F1] placeholder:text-[#B0BEC5] rounded-md pl-8 pr-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#00B4D8]"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#B0BEC5]" />
              </div>
            </div>
          ) : (
            <button className="p-1 text-[#B0BEC5] hover:text-[#00B4D8] transition-all duration-200">
              <Search className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* New Chat Button */}
        <button
          className="flex items-center gap-2 w-full p-4 text-[#B0BEC5] hover:text-[#00B4D8] hover:bg-[#233554] transition-all duration-200 border-b border-[#22304A]"
          onClick={() => console.log('Start new chat')}
        >
          <div className="flex items-center gap-3">
            <Plus className="w-4 h-4" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium"
                >
                  New Chat
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </button>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#22304A] scrollbar-track-transparent">
          {mockSessions.map((session) => (
            <motion.button
              key={session.id}
              className="w-full p-3 text-left hover:bg-[#233554] transition-all duration-200 border-b border-[#22304A] hover:border-[#00B4D8]/20"
              whileHover={{ x: 2 }}
            >
              <div className="flex items-start space-x-3">
                <MessageSquare className="w-4 h-4 text-[#B0BEC5] mt-1 flex-shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 min-w-0"
                    >
                      <h3 className="text-[#E0F2F1] text-sm font-medium truncate">
                        {session.title}
                      </h3>
                      <p className="text-[#B0BEC5] text-xs truncate mt-1">
                        {session.preview}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-[#48CAE4]">
                        <Calendar className="w-3 h-3 mr-1" />
                        {session.date}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}