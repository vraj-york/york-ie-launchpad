import { useState } from 'react';
import {
  LayoutGrid, Plus, Share2, Bookmark, BarChart3, Star,
} from 'lucide-react';

const TABS = ['Summary', 'Activity', 'Reports', 'Settings'] as const;

const CIRCLE_ACTIONS = [
  { icon: Plus, label: 'Add' },
  { icon: Share2, label: 'Share' },
  { icon: Bookmark, label: 'Save' },
  { icon: Star, label: 'Favorite' },
] as const;

export default function WireframeBoardPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Summary');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#FAFBFC]">
      <div className="h-[52px] border-b border-[#E5E7EB] flex items-center px-6 flex-shrink-0 bg-white">
        <h1 className="text-[20px] font-semibold text-[#111827]">Board</h1>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-[1100px] mx-auto px-6 py-8 pb-12">
          {/* Row 1 — tabs (four horizontal segments like the sketch) */}
          <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] w-full sm:w-fit mb-8">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all min-w-0 sm:min-w-[100px] ${
                    isActive
                      ? 'bg-white text-[#2563EB] shadow-sm border border-[#E5E7EB]'
                      : 'text-[#6B7280] hover:text-[#374151] border border-transparent'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Row 2 — two wide horizontal blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="h-[72px] rounded-xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex items-center px-5 gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                <BarChart3 size={18} className="text-[#2563EB]" />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wide">Overview</p>
                <p className="text-[14px] font-semibold text-[#111827] truncate">Primary metric strip</p>
              </div>
            </div>
            <div className="h-[72px] rounded-xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex items-center px-5 gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F5F3FF] flex items-center justify-center flex-shrink-0">
                <LayoutGrid size={18} className="text-[#7C3AED]" />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wide">Secondary</p>
                <p className="text-[14px] font-semibold text-[#111827] truncate">Companion summary block</p>
              </div>
            </div>
          </div>

          {/* Row 3 — two large main panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="min-h-[220px] rounded-xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-5 flex flex-col">
              <div className="h-2 w-24 rounded-full bg-[#E5E7EB] mb-4" />
              <div className="flex-1 rounded-lg bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] border border-[#EEF2FF]" />
            </div>
            <div className="min-h-[220px] rounded-xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-5 flex flex-col">
              <div className="h-2 w-32 rounded-full bg-[#E5E7EB] mb-4" />
              <div className="flex-1 rounded-lg bg-gradient-to-br from-[#FAFAF9] to-[#F5F3FF] border border-[#EDE9FE]" />
            </div>
          </div>

          {/* Row 4 — three smaller cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[100px] rounded-xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-4 flex flex-col justify-between"
              >
                <div className="flex gap-2">
                  <div className="h-2 flex-1 rounded-full bg-[#F3F4F6] max-w-[60%]" />
                  <div className="h-2 w-8 rounded-full bg-[#E5E7EB]" />
                </div>
                <div className="h-8 rounded-md bg-[#F9FAFB] border border-[#F3F4F6]" />
              </div>
            ))}
          </div>

          {/* Row 5 — four circles */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 pt-2 border-t border-[#E5E7EB]">
            {CIRCLE_ACTIONS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  className="w-14 h-14 rounded-full border-2 border-[#E5E7EB] bg-white shadow-[0_2px_8px_rgba(37,99,235,0.08)] flex items-center justify-center text-[#374151] hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-[0_4px_14px_rgba(37,99,235,0.15)] transition-all"
                  aria-label={label}
                >
                  <Icon size={20} strokeWidth={1.75} />
                </button>
                <span className="text-[11px] font-medium text-[#9CA3AF]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
