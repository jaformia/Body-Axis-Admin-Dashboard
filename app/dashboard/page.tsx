"use client";

import { 
  User,
  Flame, 
  Dumbbell, 
  Calendar,
  TrendingUp
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

// Custom outline vectors for card backgrounds
const TotalUsersIcon = ({ className = "w-6 h-6 text-cyan-400" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round">
    <circle cx="50" cy="32" r="10" />
    <path d="M32 20c-5 5-5 19 0 24" />
    <path d="M68 20c5 5 5 19 0 24" />
    <ellipse cx="50" cy="66" rx="14" ry="9" />
    <path d="M26 54c-7 5-7 19 0 24" />
    <path d="M74 54c7 5 7 19 0 24" />
  </svg>
);

const TotalUsersOutline = () => (
  <svg className="absolute -bottom-6 -right-6 w-36 h-36 text-slate-400/18 pointer-events-none z-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="6.2" strokeLinecap="round">
    <circle cx="50" cy="32" r="10" />
    <path d="M32 20c-5 5-5 19 0 24" />
    <path d="M68 20c5 5 5 19 0 24" />
    <ellipse cx="50" cy="66" rx="14" ry="9" />
    <path d="M26 54c-7 5-7 19 0 24" />
    <path d="M74 54c7 5 7 19 0 24" />
  </svg>
);

const ActiveUserOutline = () => (
  <svg className="absolute -bottom-3 -right-3 w-28 h-28 text-slate-400/18 pointer-events-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8">
    <circle cx="50" cy="38" r="18" />
    <path d="M15 78c0-12 15-22 35-22s35 10 35 22" />
  </svg>
);

const FlameOutline = () => (
  <svg className="absolute -bottom-2 -right-3 w-28 h-28 text-slate-400/18 pointer-events-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8">
    <path d="M50 85c18 0 28-12 28-28 0-22-16-38-28-43-12 5-28 21-28 43 0 16 10 28 28 28z" />
    <path d="M50 78c10 0 15-8 15-16 0-13-9-23-15-26-6 3-15 13-15 26 0 8 5 16 15 16z" />
  </svg>
);

const DumbbellOutline = () => (
  <svg className="absolute -bottom-2 -right-3 w-28 h-28 text-slate-400/18 pointer-events-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8">
    <rect x="44" y="10" width="12" height="80" rx="3" />
    <rect x="22" y="25" width="22" height="50" rx="5" />
    <rect x="56" y="25" width="22" height="50" rx="5" />
    <circle cx="10" cy="50" r="6" />
    <circle cx="90" cy="50" r="6" />
  </svg>
);

// Fallback high-fidelity local dataset
const FALLBACK_DATA: DashboardData = {
  stats: [
    { id: "total-users", label: "TOTAL USERS", value: "14,285", change: "+ 12%", status: "up", color: "blue" },
    { id: "active-users", label: "ACTIVE USERS", value: "8,912", change: "+ 12%", status: "up", color: "purple" },
    { id: "total-protocols", label: "TOTAL PROTOCOLS", value: "412", change: "+ 12%", status: "up", color: "emerald" },
    { id: "total-exercises", label: "TOTAL EXERCISES", value: "2,854", change: "+ 12%", status: "up", color: "blue" }
  ],
  chartData: [
    { date: "01 OCT", value: 100, height: "45%", isHighlighted: false },
    { date: "02 OCT", value: 120, height: "55%", isHighlighted: false },
    { date: "03 OCT", value: 80, height: "35%", isHighlighted: false },
    { date: "04 OCT", value: 110, height: "48%", isHighlighted: false },
    { date: "05 OCT", value: 95, height: "42%", isHighlighted: false },
    { date: "06 OCT", value: 130, height: "58%", isHighlighted: false },
    { date: "07 OCT", value: 122, height: "52%", isHighlighted: false },
    { date: "08 OCT", value: 150, height: "68%", isHighlighted: false },
    { date: "09 OCT", value: 105, height: "46%", isHighlighted: false },
    { date: "10 OCT", value: 140, height: "62%", isHighlighted: false },
    { date: "11 OCT", value: 90, height: "38%", isHighlighted: false },
    { date: "12 OCT", value: 125, height: "54%", isHighlighted: false },
    { date: "13 OCT", value: 100, height: "44%", isHighlighted: false },
    { date: "14 OCT", value: 190, height: "88%", isHighlighted: true }
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

  // Dynamic filter chart heights updates
  const getDynamicChartData = () => {
    if (!data) return [];
    if (filter === "Daily") {
      return data.chartData.map((item, idx) => ({
        ...item,
        height: idx % 2 === 0 ? "35%" : "72%",
        isHighlighted: idx === 5
      }));
    }
    if (filter === "Monthly") {
      return data.chartData.map((item, idx) => ({
        ...item,
        height: idx % 3 === 0 ? "85%" : idx % 2 === 0 ? "50%" : "28%",
        isHighlighted: idx === 10
      }));
    }
    return data.chartData;
  };

  const activeChartData = getDynamicChartData();

  const getIcon = (id: string, color: string) => {
    if (id === "total-users") return <TotalUsersIcon className="w-[18px] h-[18px] text-cyan-400" />;
    
    const iconClass = `transition-colors duration-300 ${
      color === "blue" ? "text-cyan-400" :
      color === "purple" ? "text-indigo-400" :
      color === "emerald" ? "text-emerald-400" : "text-cyan-400"
    }`;
    if (id === "active-users") return <User className={iconClass} size={18} />;
    if (id === "total-protocols") return <Flame className={iconClass} size={18} />;
    return <Dumbbell className={iconClass} size={18} />;
  };

  const getGlowBg = (color: string) => {
    if (color === "blue") return "bg-cyan-600/10 border-cyan-500/20";
    if (color === "purple") return "bg-indigo-600/10 border-indigo-500/20";
    if (color === "emerald") return "bg-emerald-600/10 border-emerald-500/20";
    return "bg-cyan-600/10 border-cyan-500/20";
  };

  const getOutlineVector = (id: string) => {
    if (id === "total-users") return <TotalUsersOutline />;
    if (id === "active-users") return <ActiveUserOutline />;
    if (id === "total-protocols") return <FlameOutline />;
    return <DumbbellOutline />;
  };

  return (
    <div className="space-y-8 select-none">
      {/* Title Header Banner */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight font-display">Dashboard Home</h2>
        <p className="text-slate-400 text-xs mt-1">Visualizing movement integrity and platform growth monitoring across the Body Axis ecosystem.</p>
      </div>

      {/* Stats Grid Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.stats.map((stat) => (
          <div key={stat.id} className="glass-card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[160px] border border-slate-800/40 shadow-sm z-10">
            {/* Background outline SVG shape */}
            {getOutlineVector(stat.id)}
            
            {/* Top Segment: Label (Left) and Trend Badge (Right) */}
            <div className="flex items-center justify-between z-10 w-full">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{stat.label}</span>
              <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#059669] bg-[#e6fbf3] px-2.5 py-0.5 rounded-full select-none shadow-sm">
                <TrendingUp size={10} className="stroke-[2.5]" />
                <span>{stat.change}</span>
              </div>
            </div>

            {/* Middle Segment: Glowing Icon Box (Left Centered) */}
            <div className="z-10 mt-3 flex justify-start">
              <div className={`p-2 rounded-xl border ${getGlowBg(stat.color)}`}>
                {getIcon(stat.id, stat.color)}
              </div>
            </div>

            {/* Bottom Segment: Value (Left) */}
            <div className="mt-3 z-10 flex items-end">
              <span className="text-xl font-bold text-white font-display tracking-tight leading-none">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts & Table Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white font-display tracking-wide">Engagement Velocity</h3>
            <p className="text-slate-400 text-[11px] mt-0.5">Global mobility session distribution on a day basis</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3.5">
            {/* Clickable Date Range Picker */}
            <div className="flex items-center gap-1 border border-slate-800/80 rounded-xl px-3 py-1.5 bg-[#080d22]/35 text-[11px] text-slate-400 font-semibold shadow-inner">
              <button 
                onClick={() => startDateRef.current?.showPicker()}
                className="hover:text-white transition-colors duration-150 cursor-pointer p-0 bg-transparent border-none flex items-center justify-center focus:outline-none"
              >
                <Calendar size={13} className="text-slate-500 hover:text-slate-300" />
              </button>
              <input 
                ref={startDateRef}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent border-none px-1 py-0.5 rounded text-slate-300 focus:outline-none cursor-pointer color-scheme-dark hover:text-white transition-colors duration-150 text-[10px] style-date-input w-[95px]"
                style={{ colorScheme: "dark" }}
              />
              <span className="text-slate-600 font-bold uppercase text-[9px] px-1 select-none">to</span>
              <input 
                ref={endDateRef}
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent border-none px-1 py-0.5 rounded text-slate-300 focus:outline-none cursor-pointer color-scheme-dark hover:text-white transition-colors duration-150 text-[10px] style-date-input w-[95px]"
                style={{ colorScheme: "dark" }}
              />
              <button 
                onClick={() => endDateRef.current?.showPicker()}
                className="hover:text-white transition-colors duration-150 cursor-pointer p-0 bg-transparent border-none flex items-center justify-center focus:outline-none"
              >
                <Calendar size={13} className="text-slate-500 hover:text-slate-300" />
              </button>
            </div>

            {/* Filter Toggle pills */}
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 select-none">
              <button 
                onClick={() => setFilter("Daily")}
                className={`px-3 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
                  filter === "Daily"
                    ? "bg-[#1d4ed8] text-white shadow-[0_2px_10px_rgba(29,78,216,0.2)] font-semibold animate-scale-pill"
                    : "hover:text-slate-300"
                }`}
              >
                Daily
              </button>
              <button 
                onClick={() => setFilter("Weekly")}
                className={`px-3 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
                  filter === "Weekly"
                    ? "bg-[#1d4ed8] text-white shadow-[0_2px_10px_rgba(29,78,216,0.2)] font-semibold animate-scale-pill"
                    : "hover:text-slate-300"
                }`}
              >
                Weekly
              </button>
              <button 
                onClick={() => setFilter("Monthly")}
                className={`px-3 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
                  filter === "Monthly"
                    ? "bg-[#1d4ed8] text-white shadow-[0_2px_10px_rgba(29,78,216,0.2)] font-semibold animate-scale-pill"
                    : "hover:text-slate-300"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        {/* 14 Bar Chart Custom CSS Grid styled */}
        <div className="h-60 flex items-end gap-3 px-2 pt-6 relative border-b border-slate-850 pb-4">
          {activeChartData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group relative h-full justify-end z-10">
              {/* Bar */}
              <div 
                className={`w-full rounded-t-md transition-all duration-500 animate-bar-grow ${
                  item.isHighlighted 
                    ? "bg-gradient-to-t from-[#06b6d4] to-[#a855f7] glow-blue shadow-[0_0_20px_rgba(6,182,212,0.4)]" 
                    : "bg-gradient-to-t from-[#06b6d4]/40 to-[#8b5cf6]/50 group-hover:to-[#8b5cf6]/80"
                }`}
                style={{ 
                  height: item.height,
                  animationDelay: `${index * 25}ms`
                }}
              />
              
              {/* X-Axis Date Tag */}
              <span className="text-[9px] text-slate-500 font-bold mt-2.5 tracking-tight group-hover:text-slate-300 transition-colors duration-200">{item.date}</span>
            </div>
          ))}
        </div>

        {/* Nested Engagement Detail Table */}
        <div className="mt-8">
          <h4 className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase mb-4">ENGAGEMENT DATA DETAIL</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-850 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                  <th className="pb-3 font-semibold">DATE</th>
                  <th className="pb-3 font-semibold">TOTAL SESSIONS</th>
                  <th className="pb-3 font-semibold">ACTIVE SESSIONS</th>
                  <th className="pb-3 font-semibold text-right">AVG. COMPLETION %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/40">
                {data.tableData.map((row, idx) => (
                  <tr key={idx} className="text-slate-300 hover:bg-slate-900/10 transition-colors duration-150">
                    <td className="py-3.5 text-slate-400 font-medium">{row.date}</td>
                    <td className="py-3.5 font-bold text-white">{row.totalSessions}</td>
                    <td className="py-3.5 text-slate-400 font-medium">{row.activeSessions}</td>
                    <td className="py-3.5">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-24 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-850 flex-shrink-0">
                          <div className="bg-[#10b981] h-full rounded-full" style={{ width: row.completion }} />
                        </div>
                        <span className="font-extrabold text-[#10b981] text-[10px] w-8 text-right">{row.completion}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Live Activity Feed bottom panel */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800/40">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#10b981] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.7)] animate-pulse" />
            <h3 className="text-sm font-bold text-white font-display tracking-wide">Live Activity</h3>
          </div>
          <button className="text-[10px] font-extrabold text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors duration-200">SEE ALL</button>
        </div>

        <div className="space-y-3.5 pr-1">
          {data.activities.map((act) => (
            <div key={act.id} className="p-4 bg-[#050815]/65 border border-slate-900/80 rounded-xl flex items-center justify-between gap-6 hover:border-slate-800/60 transition-all duration-200">
              <div className="flex items-center gap-4 overflow-hidden">
                {/* Outlined avatar photo */}
                <div className="w-9 h-9 rounded-full border border-slate-800 bg-[#02050f]/60 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {act.avatar ? (
                    <Image src={act.avatar} alt={act.user} width={36} height={36} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#02050f]/60" />
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white leading-none">{act.user}</p>
                  <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block mt-1">{act.tag}</span>
                </div>
              </div>

              {/* Action Description */}
              <div className="flex-1 text-xs text-slate-300 font-medium truncate max-w-md" dangerouslySetInnerHTML={{ __html: act.action }} />

              {/* Elapsed Time & Green location */}
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-[10px] text-slate-500 font-bold">{act.time}</span>
                <span className="text-[9px] font-extrabold text-[#10b981] uppercase tracking-wider mt-1">{act.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
