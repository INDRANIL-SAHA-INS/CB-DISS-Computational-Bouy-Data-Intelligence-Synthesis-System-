"use client";

import { Plus, Clock, FileText, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // shadcn utility for conditional classes
import { useState } from "react";

type ChatItem = {
  id: string;
  label: string;
  icon: "clock" | "file";
  meta?: string;
};

const chatItems: ChatItem[] = [
  { id: "1", label: "Ocean Warming", icon: "file" },
  { id: "2", label: "Float 230214 Details", icon: "clock" },
  { id: "3", label: "Oxygen Depletion", icon: "file" },
];

export default function ChatHistorySidebar() {
  const [activeId, setActiveId] = useState<string>("new");

  return (
    <aside
      className="w-full h-full px-4 pt-6 pb-8 flex flex-col bg-gradient-to-b from-[#152860] to-[#0D1B2A] border-r border-[rgba(255,255,255,0.04)] rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Header */}
      <h2 className="text-xs font-medium tracking-wide text-[#9FB3C6] uppercase mb-4">
        Chat History
      </h2>
      <div className="h-[1px] bg-[rgba(255,255,255,0.06)] mb-3" />

      {/* New Chat button */}
      <button
        onClick={() => setActiveId("new")}
        aria-selected={activeId === "new"}
        className={cn(
          "relative flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-150",
          activeId === "new" ? "bg-[#0F2430]" : "hover:bg-[#0f2430]"
        )}
      >
        {/* Icon container */}
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#3CE0D2] shadow-[0_6px_20px_rgba(60,224,210,0.12)]">
          <Plus size={18} className="text-white" />
        </div>
        <span
          className={cn(
            "text-sm font-semibold",
            activeId === "new" ? "text-white" : "text-gray-200"
          )}
        >
          New Chat
        </span>
        {activeId === "new" && (
          <span className="absolute left-0 top-0 h-full w-1.5 bg-[#3CE0D2] rounded-r-full" />
        )}
      </button>

      {/* Scrollable history */}
      <div className="mt-4 pr-1 flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {chatItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveId(item.id)}
                  role="option"
                  tabIndex={0}
                  className={cn(
                    "relative flex items-center gap-3 px-2 py-2 w-full rounded-lg transition-all duration-150 focus:outline-none",
                    isActive ? "bg-[#0F2430]" : "hover:bg-[#0f2430]"
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(60,224,210,0.12)]",
                      isActive && "bg-[#3CE0D2] border-none"
                    )}
                  >
                    {item.icon === "clock" ? (
                      <Clock
                        size={16}
                        strokeWidth={1.6}
                        className={cn(
                          isActive ? "text-white" : "text-[#9FB3C6]"
                        )}
                      />
                    ) : (
                      <FileText
                        size={16}
                        strokeWidth={1.6}
                        className={cn(
                          isActive ? "text-white" : "text-[#9FB3C6]"
                        )}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 text-left">
                    <div
                      className={cn(
                        "text-sm truncate",
                        isActive ? "font-semibold text-white" : "text-[#E6EEF6]"
                      )}
                    >
                      {item.label}
                    </div>
                  </div>

                  {/* Chevron */}
                  <ChevronRight
                    size={16}
                    className="text-[rgba(255,255,255,0.08)]"
                  />

                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1.5 bg-[#3CE0D2] rounded-r-full" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
