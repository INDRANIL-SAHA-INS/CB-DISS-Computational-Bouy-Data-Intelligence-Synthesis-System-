'use client';

import { useState } from 'react';
import {
  ListFilter as Filter,
  ChevronDown,
  ChevronUp,
  Menu,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ... (interfaces remain the same)

interface FilterOption {
  id: string;
  label: string;
  checked: boolean;
}

interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
  expanded: boolean;
  showMore?: boolean;
}


interface FilterSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onApplyFilters?: () => void;
  onSearch?: (query: string) => void;
}

export default function FilterSidebar(props: FilterSidebarProps) {
  const { isCollapsed, onToggleCollapse, onApplyFilters, onSearch } = props;
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([
    {
      id: 'status',
      title: 'STATUS',
      expanded: true,
      options: [
        { id: 'active', label: 'Active', checked: true },
        { id: 'inactive', label: 'Inactive', checked: true },
      ],
    },
    {
      id: 'year',
      title: 'YEAR OF DEPLOYMENT',
      expanded: true,
      showMore: false,
      options: [
        { id: '2024', label: '2024', checked: true },
        { id: '2023', label: '2023', checked: true },
        { id: '2022', label: '2022', checked: false },
        { id: '2021', label: '2021', checked: false },
      ],
    },
    {
      id: 'country',
      title: 'COUNTRY',
      expanded: true,
      showMore: false,
      options: [
        { id: 'india', label: 'India', checked: true },
        { id: 'usa', label: 'USA', checked: true },
        { id: 'france', label: 'France', checked: true },
        { id: 'uk', label: 'United Kingdom', checked: false },
      ],
    },
    {
      id: 'variables',
      title: 'VARIABLES',
      expanded: true,
      showMore: false,
      options: [
        { id: 'temp', label: 'TEMP', checked: true },
        { id: 'psal', label: 'PSAL', checked: true },
        { id: 'doxy', label: 'DOXY', checked: true },
        { id: 'chla', label: 'CHLA', checked: false },
      ],
    },
    {
      id: 'ocean',
      title: 'OCEAN BASIN',
      expanded: false,
      options: [
        { id: 'indian', label: 'Indian Ocean', checked: true },
        { id: 'pacific', label: 'Pacific Ocean', checked: false },
        { id: 'atlantic', label: 'Atlantic Ocean', checked: false },
      ],
    },
  ]);

  const toggleGroup = (groupId: string) => {
    setFilterGroups((groups) =>
      groups.map((group) =>
        group.id === groupId
          ? { ...group, expanded: !group.expanded }
          : group
      )
    );
  };

  const toggleShowMore = (groupId: string) => {
    setFilterGroups((groups) =>
      groups.map((group) =>
        group.id === groupId
          ? { ...group, showMore: !group.showMore }
          : group
      )
    );
  };

  const toggleOption = (groupId: string, optionId: string) => {
    setFilterGroups((groups) =>
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              options: group.options.map((option) =>
                option.id === optionId
                  ? { ...option, checked: !option.checked }
                  : option
              ),
            }
          : group
      )
    );
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 60 : 280 }}
      className="fixed left-0 top-16 bottom-0 z-40 bg-[#181F2A] border-r border-[#22304A] shadow-xl"
    >
      <div className="flex flex-col h-full">
        {/* Top Bar with Menu */}
        <div
          className={`flex items-center p-4 h-16 border-b border-[#22304A] ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          <button
            onClick={onToggleCollapse}
            className="p-1 text-[#B0BEC5] hover:text-[#00B4D8] transition-all duration-200"
          >
            <Menu className="w-5 h-5" />
          </button>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative ml-4 flex-1"
              >
                <form
                  className="flex items-center gap-2"
                  onSubmit={e => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      onSearch?.(searchQuery);
                    }
                  }}
                >
                  <input
                    type="text"
                    placeholder="Find floats with ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#233554] border border-[#22304A] rounded-md px-4 py-2 text-sm text-white placeholder-[#B0BEC5] focus:ring-2 focus:ring-[#00B4D8] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-0 m-0 text-[#00B4D8] hover:text-[#48CAE4] rounded-full flex items-center justify-center"
                    tabIndex={-1}
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filter Groups */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[#22304A] scrollbar-track-transparent">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filterGroups.map((group) => (
                  <div key={group.id} className="border-b border-[#22304A]">
                    <button
                      onClick={() => toggleGroup(group.id)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-[#233554] transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <Filter className="w-4 h-4 text-[#B0BEC5] mt-1 flex-shrink-0" />
                        <span className="text-sm font-medium text-[#E0F2F1]">
                          {group.title}
                        </span>
                      </div>
                      {group.expanded ? (
                        <ChevronUp className="w-4 h-4 text-[#B0BEC5]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#B0BEC5]" />
                      )}
                    </button>

                    <AnimatePresence>
                      {group.expanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-3 space-y-2 overflow-hidden"
                        >
                          {group.options
                            .slice(
                              0,
                              group.showMore || group.options.length <= 3
                                ? group.options.length
                                : 3
                            )
                            .map((option) => (
                              <label
                                key={option.id}
                                className="flex items-center space-x-2 cursor-pointer hover:bg-[#233554] p-2 rounded transition-all duration-200"
                              >
                                <input
                                  type="checkbox"
                                  checked={option.checked}
                                  onChange={() =>
                                    toggleOption(group.id, option.id)
                                  }
                                  className="w-4 h-4 bg-[#233554] border-[#22304A] rounded text-[#00B4D8] focus:ring-[#00B4D8] focus:ring-2"
                                />
                                <span className="text-sm text-[#B0BEC5]">
                                  {option.label}
                                </span>
                              </label>
                            ))}
                          {group.options.length > 3 && (
                            <button
                              onClick={() => toggleShowMore(group.id)}
                              className="text-sm text-[#00B4D8] hover:underline mt-2"
                            >
                              {group.showMore ? 'Show Less' : 'Show More'}
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Apply Filters Button */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 border-t border-[#22304A]"
            >
              <button
                className="w-full bg-[#00B4D8] hover:bg-[#48CAE4] text-[#181F2A] py-2 px-4 rounded-md transition-all duration-200 font-medium shadow-lg hover:shadow-[#00B4D8]/20"
                onClick={onApplyFilters}
              >
                Apply Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}