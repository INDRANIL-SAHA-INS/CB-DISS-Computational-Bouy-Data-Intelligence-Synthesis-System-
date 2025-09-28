'use client';

import React, { useState } from 'react';

import Navbar from './components/navbar';
import FilterSidebar from './components/FilterSidebar';
import { PanelRightOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { PromptBox } from '@/components/ui/chatgpt-prompt-input';
import { DataTable } from '@/components/DataTable';

const InteractiveMap = dynamic(
  () => import('./components/InteractiveMap'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[#1f2937] flex items-center justify-center">
        <p className="text-white">Loading map...</p>
      </div>
    ),
  }
);

const ExplorePage = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isRightPanelCollapsed, setRightPanelCollapsed] = useState(true);
  const [selectedFloats, setSelectedFloats] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [lastSearch, setLastSearch] = useState<string | null>(null);
  const [detailFloatId, setDetailFloatId] = useState<string | null>(null);

  const handleFloatSelect = (floatId: string) => {
    setDetailFloatId(floatId);
  };

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16 overflow-hidden">
        <FilterSidebar
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!isSidebarCollapsed)}
          onApplyFilters={() => {
            setShowTable(true);
            setDataReady(true);
            setRightPanelCollapsed(false);
            setLastSearch(null);
          }}
          onSearch={(query) => {
            setShowTable(true);
            setDataReady(true);
            setRightPanelCollapsed(false);
            setLastSearch(query);
          }}
        />
        <main
          className="flex-1 transition-all duration-300 p-4 bg-gray-800 relative"
          style={{ marginLeft: isSidebarCollapsed ? 60 : 280 }}
        >
          <div className="flex w-full h-full gap-4">
            <motion.div
              className="left-content-box bg-[#181F2A] rounded-lg flex flex-col p-4 gap-4"
              animate={{ width: isRightPanelCollapsed ? 'calc(100% - 4rem)' : '60%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex-1 rounded-lg overflow-hidden">
                <InteractiveMap
                  onFloatSelect={handleFloatSelect}
                  selectedFloats={selectedFloats}
                />
              </div>
              <div className="bg-[#181F2A]">
                <form>
                  <PromptBox
                    placeholder="Ask me about this map..."
                    name="message"
                    className="w-full shadow-lg"
                  />
                </form>
              </div>
            </motion.div>
            <AnimatePresence>
              {!isRightPanelCollapsed && (
                <motion.div
                  className="right-content-box w-[40%] bg-[#181F2A] rounded-lg px-6 pt-6 pb-12 flex items-start justify-center"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '40%' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div
                    className="data-container w-full h-full max-h-[90vh] flex flex-col justify-start min-h-[400px] overflow-y-auto overflow-x-auto pt-0 pb-0 px-0 bg-[#181F2A] rounded-none shadow-xl border border-[#22304A]"
                    style={{ minWidth: 0 }}
                  >
                    {dataReady ? (
                      <DataTable
                        onRowClick={handleFloatSelect}
                        onBackFromDetail={() => setDetailFloatId(null)}
                        showDetailForId={detailFloatId}
                      />
                    ) : (
                      <div className="text-gray-200 text-center w-full py-8">No data. Search or apply filter to get data.</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => {
              setRightPanelCollapsed(!isRightPanelCollapsed);
              if (isRightPanelCollapsed) {
                setShowTable(true);
              }
            }}
            className="absolute top-6 right-6 z-30 p-2 bg-gray-700 rounded-full text-white hover:bg-gray-600 transition-colors"
            title={isRightPanelCollapsed ? 'Open Panel' : 'Close Panel'}
          >
            <PanelRightOpen className="w-5 h-5" />
          </button>
        </main>
      </div>
    </div>
  );

};

export default ExplorePage;
