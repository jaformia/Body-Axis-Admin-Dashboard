"use client";

import { 
  User,
  Flame, 
  Dumbbell, 
  Calendar,
  TrendingUp,
  Users
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface DashboardData {
  stats: Array<{
    id: string;
    label: string;
    value: string;
    change: string;
    status: string;
    color: string;
  }>;
  chartData: Array<{
    date: string;
    value: number;
    height: string;
    isHighlighted: boolean;
  }>;
  tableData: Array<{
    date: string;
    totalSessions: string;
    activeSessions: string;
    completion: string;
  }>;
  activities: Array<{
    id: number;
    user: string;
    avatar?: string;
    tag: string;
    action: string;
    location: string;
    time: string;
  }>;
}

// Background SVGs to match the design aesthetics (simplified or removed if they clash, 
// but using the provided or similar styles for visual richness)
const TotalUsersOutline = () => (
  <svg className="absolute -bottom-6 -right-6 w-[81px] h-[88px] text-[#00d4ff]/20 opacity-30 pointer-events-none z-0 mix-blend-screen" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
    <circle cx="50" cy="32" r="10" />
    <path d="M32 20c-5 5-5 19 0 24" />
    <path d="M68 20c5 5 5 19 0 24" />
    <ellipse cx="50" cy="66" rx="14" ry="9" />
  </svg>
);

const ActiveUserOutline = () => (
  <svg className="absolute -bottom-3 -right-3 w-[81px] h-[88px] text-[#00d4ff]/20 opacity-30 pointer-events-none z-0 mix-blend-screen" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
    <circle cx="50" cy="38" r="18" />
    <path d="M15 78c0-12 15-22 35-22s35 10 35 22" />
  </svg>
);

const FlameOutline = () => (
  <svg className="absolute -bottom-2 -right-3 w-[81px] h-[88px] text-[#00d4ff]/20 opacity-30 pointer-events-none z-0 mix-blend-screen" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M50 85c18 0 28-12 28-28 0-22-16-38-28-43-12 5-28 21-28 43 0 16 10 28 28 28z" />
  </svg>
);

const DumbbellOutline = () => (
  <svg className="absolute -bottom-2 -right-3 w-[81px] h-[88px] text-[#00d4ff]/20 opacity-30 pointer-events-none z-0 mix-blend-screen" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
    <rect x="44" y="10" width="12" height="80" rx="3" />
    <rect x="22" y="25" width="22" height="50" rx="5" />
    <rect x="56" y="25" width="22" height="50" rx="5" />
  </svg>
);

// Fallback high-fidelity local dataset
const FALLBACK_DATA: DashboardData = {
  stats: [
    { id: "total-users", label: "TOTAL USERS", value: "14,285", change: "12%", status: "up", color: "cyan" },
    { id: "active-users", label: "ACTIVE USERS", value: "8,912", change: "12%", status: "up", color: "purple" },
    { id: "total-protocols", label: "TOTAL PROTOCOLS", value: "412", change: "12%", status: "up", color: "emerald" },
    { id: "total-exercises", label: "TOTAL EXERCISES", value: "2,854", change: "12%", status: "up", color: "blue" }
  ],
  chartData: [
    { date: "01 OCT", value: 100, height: "42%", isHighlighted: false },
    { date: "02 OCT", value: 120, height: "68%", isHighlighted: false },
    { date: "03 OCT", value: 80, height: "38%", isHighlighted: false },
    { date: "04 OCT", value: 110, height: "55%", isHighlighted: false },
    { date: "05 OCT", value: 95, height: "48%", isHighlighted: false },
    { date: "06 OCT", value: 130, height: "72%", isHighlighted: false },
    { date: "07 OCT", value: 122, height: "58%", isHighlighted: false },
    { date: "08 OCT", value: 150, height: "82%", isHighlighted: false },
    { date: "09 OCT", value: 105, height: "46%", isHighlighted: false },
    { date: "10 OCT", value: 140, height: "65%", isHighlighted: false },
    { date: "11 OCT", value: 90, height: "38%", isHighlighted: false },
    { date: "12 OCT", value: 125, height: "60%", isHighlighted: false },
    { date: "13 OCT", value: 100, height: "44%", isHighlighted: false },
    { date: "14 OCT", value: 190, height: "100%", isHighlighted: true }
  ],
  tableData: [
    { date: "14 Oct 2024", totalSessions: "152", activeSessions: "128", completion: "94%" },
    { date: "13 Oct 2024", totalSessions: "114", activeSessions: "98", completion: "88%" },
    { date: "12 Oct 2024", totalSessions: "108", activeSessions: "84", completion: "82%" }
  ],
  activities: [
    { id: 1, user: "Elena Rossi", avatar: "/user.png", tag: "NEW SUBSCRIPTION", action: "Joined Pro Membership Plan", location: "LONDON, UK", time: "2 minutes ago" },
    { id: 2, user: "Marcus Chen", avatar: "/user.png", tag: "ACTIVITY LOG", action: "Completed &quot;The Lumbar Deep Reset&quot; Protocol", location: "LEVEL UP", time: "15 minutes ago" }
  ]
};

export default function DashboardHome() {
  const [filter, setFilter] = useState<"Daily" | "Weekly" | "Monthly">("Weekly");
  const [startDate, setStartDate] = useState("2024-10-10");
  const [endDate, setEndDate] = useState("2024-10-14");
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch(() => {
        setData(FALLBACK_DATA);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="h-full flex items-center justify-center select-none">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#2563eb] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-xs font-semibold tracking-wide">Loading Dashboard Data...</p>
        </div>
      </div>
    );
  }

  const getDynamicChartData = () => {
    if (!data) return [];
    if (filter === "Daily") {
      return data.chartData.map((item, idx) => ({
        ...item,
        height: idx % 2 === 0 ? "40%" : "70%",
        isHighlighted: idx === 13
      }));
    }
    if (filter === "Monthly") {
      return data.chartData.map((item, idx) => ({
        ...item,
        height: idx % 3 === 0 ? "85%" : idx % 2 === 0 ? "50%" : "30%",
        isHighlighted: idx === 13
      }));
    }
    return data.chartData;
  };

  const activeChartData = getDynamicChartData();

  const getIcon = (id: string, color: string) => {
    if (id === "total-users") return <Users className="text-[#22D3EE]" size={20} />;
    if (id === "active-users") return <User className="text-[#8B5CF6]" size={20} />;
    if (id === "total-protocols") return <Flame className="text-[#2DD4BF]" size={20} />;
    return <Dumbbell className="text-[#3B82F6]" size={20} />;
  };

  const getOutlineVector = (id: string) => {
    if (id === "total-users") return <TotalUsersOutline />;
    if (id === "active-users") return <ActiveUserOutline />;
    if (id === "total-protocols") return <FlameOutline />;
    return <DumbbellOutline />;
  };

  return (
    <div className="space-y-8 select-none pb-12 font-sans">
      {/* Title Header Banner */}
      <div className="flex flex-col items-start gap-1">
        <h2 className="text-[26px] font-bold text-white tracking-tight leading-none">Dashboard Home</h2>
        <p className="text-[#8899BB] text-[13px] font-normal leading-relaxed mt-1">Visualizing movement integrity and platform growth monitoring across the Body Axis ecosystem.</p>
      </div>

      {/* Stats Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.stats.map((stat) => (
          <div key={stat.id} className="bg-[#0F1729] border border-[#1A2640] rounded-xl p-5 relative overflow-hidden h-[144px] flex flex-col justify-between shadow-sm group hover:border-[#2a3a5d] transition-colors">
            {getOutlineVector(stat.id)}
            
            <div className="flex items-start justify-between w-full relative z-10">
              <div className="bg-[#070B10] w-10 h-10 rounded-xl flex items-center justify-center border border-white/5">
                {getIcon(stat.id, stat.color)}
              </div>
              <div className="flex items-center gap-1.5 bg-[#E9FFF1] px-2.5 py-1 rounded-full border border-[#10B981]">
                <TrendingUp size={12} className="text-[#10B981] stroke-[2.5]" />
                <span className="text-[#10B981] text-[14px] font-bold leading-none">{stat.change}</span>
              </div>
            </div>

            <div className="relative z-10 mt-auto pt-4 flex flex-col">
              <span className="text-[#5A7090] text-[14px] font-medium uppercase tracking-wide mb-1 leading-none">{stat.label}</span>
              <span className="text-[24px] font-bold text-white leading-none tracking-tight">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Engagement Velocity Chart Box */}
      <div className="bg-[#0B1220] rounded-[20px] p-6 lg:p-8 flex flex-col gap-6 shadow-lg border border-[#1A2640]/50 relative overflow-hidden">
        
        {/* Header and Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 z-10">
          <div>
            <h3 className="text-[22px] font-bold text-white tracking-tight leading-snug">Engagement Velocity</h3>
            <p className="text-[#5A7090] text-[14px] mt-1">Global mobility session distribution on a day basis</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 bg-[#0D1525]/80 p-1.5 rounded-xl border border-white/5 shadow-inner">
            {/* Date Range Picker container */}
            <div className="flex items-center gap-2 px-3 py-1.5">
              <button 
                onClick={() => startDateRef.current?.showPicker()}
                className="text-[#2DD4BF] hover:text-[#14b8a6] transition-colors cursor-pointer"
              >
                <Calendar size={18} />
              </button>
              <input 
                ref={startDateRef}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none cursor-pointer color-scheme-dark hover:text-white transition-colors text-[13px] font-medium w-24 style-date-input"
                style={{ colorScheme: "dark" }}
              />
              <span className="text-[#5A7090] font-medium text-[12px] px-1 select-none">to</span>
              <input 
                ref={endDateRef}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none cursor-pointer color-scheme-dark hover:text-white transition-colors text-[13px] font-medium w-24 style-date-input"
                style={{ colorScheme: "dark" }}
              />
              <button 
                onClick={() => endDateRef.current?.showPicker()}
                className="text-[#2DD4BF] hover:text-[#14b8a6] transition-colors cursor-pointer"
              >
                <Calendar size={18} />
              </button>
            </div>

            <div className="w-[1px] h-6 bg-[#1A2640]" />

            {/* Filter Toggle pills */}
            <div className="flex items-center gap-1">
              {["Daily", "Weekly", "Monthly"].map((mode) => (
                <button 
                  key={mode}
                  onClick={() => setFilter(mode as any)}
                  className={`px-4 py-1.5 rounded-lg transition-all duration-200 cursor-pointer text-[12px] font-bold ${
                    filter === mode
                      ? "bg-[#2563EB] text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                      : "text-[#5A7090] hover:text-slate-300"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 14 Bar Chart Container */}
        <div className="h-[280px] flex items-end justify-between gap-3 px-2 pt-8 w-full z-10 border-b border-[#1A2640]/50 pb-3 mt-4">
          {activeChartData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group relative h-full justify-end w-full">
              {/* Floating Tooltip */}
              <div 
                className="absolute bg-[#0F172A]/95 backdrop-blur-md border border-[#1A2640] px-3 py-1.5 rounded-lg shadow-xl opacity-0 scale-90 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-30 flex flex-col items-center gap-0.5 min-w-[80px]"
                style={{ 
                  bottom: `calc(${item.height} + 12px)`
                }}
              >
                <span className="text-[10px] text-[#2DD4BF] font-bold uppercase tracking-wider">{item.date}</span>
                <span className="text-white text-xs font-bold whitespace-nowrap">{item.value} Sessions</span>
                {/* Tooltip arrow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0F172A] border-r border-b border-[#1A2640] rotate-45" />
              </div>

              {/* Bar */}
              <div 
                className={`w-full max-w-[65px] rounded-t-md transition-[height,background-color,box-shadow,filter,opacity] duration-700 ease-in-out animate-bar-grow origin-bottom group-hover:scale-y-[1.03] group-hover:brightness-110 ${
                  item.isHighlighted 
                    ? "bg-gradient-to-b from-[#9945FF] to-[#19FB9B] group-hover:shadow-[0_0_20px_rgba(153,69,255,0.4)]" 
                    : "bg-gradient-to-b from-[#5243aa]/40 to-[#14f195]/40 group-hover:from-[#5243aa]/70 group-hover:to-[#14f195]/70 group-hover:shadow-[0_0_15px_rgba(20,241,149,0.25)]"
                }`}
                style={{ 
                  height: item.height,
                  animationDelay: `${index * 30}ms`
                }}
              />
              
              {/* X-Axis Date Tag */}
              <span className="absolute -bottom-7 text-[10px] text-[#3D5070] font-bold uppercase tracking-[0.5px] whitespace-nowrap group-hover:text-[#5A7090] transition-colors">
                {item.date}
              </span>
            </div>
          ))}
        </div>

        {/* Nested Engagement Detail Table Overlay */}
        <div className="bg-[#0D1525]/40 border border-[#1A2640] rounded-2xl overflow-hidden mt-10 z-10">
          <div className="bg-[#0F1722]/50 px-6 py-4 border-b border-[#1A2640]">
            <h4 className="text-[14px] font-bold tracking-[0.7px] text-white uppercase">Engagement Data Detail</h4>
          </div>
          
          <div className="overflow-x-auto bg-[#1C2533]">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#1A2640]">
                  <th className="py-4 px-6 text-[#5A7090] font-bold uppercase tracking-[1.1px] text-[11px]">Date</th>
                  <th className="py-4 px-6 text-[#5A7090] font-bold uppercase tracking-[1.1px] text-[11px]">Total Sessions</th>
                  <th className="py-4 px-6 text-[#5A7090] font-bold uppercase tracking-[1.1px] text-[11px]">Active Sessions</th>
                  <th className="py-4 px-6 text-[#5A7090] font-bold uppercase tracking-[1.1px] text-[11px]">Avg. Completion %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2640]">
                {data.tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-5 px-6 text-[#8899BB] text-[14px]">{row.date}</td>
                    <td className="py-5 px-6 font-bold text-white text-[15px]">{row.totalSessions}</td>
                    <td className="py-5 px-6 text-[#8899BB] text-[14px]">{row.activeSessions}</td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-[128px] h-[6px] bg-[#1A2640] rounded-full overflow-hidden flex-shrink-0">
                          <div 
                            className="bg-[#10B981] h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]" 
                            style={{ width: row.completion }} 
                          />
                        </div>
                        <span className="font-bold text-[#10B981] text-[14px] min-w-[32px]">{row.completion}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-5 px-1">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#10B981] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
            <h3 className="text-[20px] font-bold text-white tracking-tight">Live Activity</h3>
          </div>
          <button className="text-[11px] font-bold text-[#2563EB] hover:text-[#3b82f6] uppercase tracking-[1.1px] transition-colors cursor-pointer">
            SEE ALL
          </button>
        </div>

        <div className="space-y-4">
          {data.activities.map((act) => (
            <div key={act.id} className="bg-[#1C2025]/50 border border-[#1A2640]/50 shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-2xl p-5 flex items-center justify-between gap-4 hover:bg-[#1C2025]/80 transition-colors">
              <div className="flex items-center gap-4 min-w-[200px]">
                <div className="w-11 h-11 rounded-full border-2 border-[#1A2640] flex items-center justify-center flex-shrink-0 overflow-hidden bg-[#070B10]">
                  {act.avatar ? (
                    <Image src={act.avatar} alt={act.user} width={44} height={44} className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} className="text-slate-500" />
                  )}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-white leading-tight">{act.user}</p>
                  <span className="text-[10px] font-bold text-[#5A7090] uppercase tracking-[0.5px] mt-1 block">
                    {act.tag}
                  </span>
                </div>
              </div>

              <div className="flex-1 px-4">
                <span className="text-[14px] text-[#8899BB] font-medium" dangerouslySetInnerHTML={{ __html: act.action }} />
              </div>

              <div className="flex flex-col items-end min-w-[100px] gap-1">
                <span className="text-[12px] text-[#5A7090] font-medium whitespace-nowrap">{act.time}</span>
                <span className="text-[11px] font-bold text-[#10B981] uppercase tracking-[0.55px] whitespace-nowrap">
                  {act.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
