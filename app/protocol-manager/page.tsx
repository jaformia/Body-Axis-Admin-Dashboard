"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Flame, Dumbbell, Users, User, TrendingUp, Edit, Trash2, ArrowLeft, ArrowRight, Edit3 } from "lucide-react";

// SVGs for card backgrounds
const FlameOutline = () => (
  <svg className="absolute -bottom-8 -right-8 w-32 h-32 text-slate-400/5 pointer-events-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8">
    <path d="M50 85c18 0 28-12 28-28 0-22-16-38-28-43-12 5-28 21-28 43 0 16 10 28 28 28z" />
    <path d="M50 78c10 0 15-8 15-16 0-13-9-23-15-26-6 3-15 13-15 26 0 8 5 16 15 16z" />
  </svg>
);

const DumbbellOutline = () => (
  <svg className="absolute -bottom-8 -right-8 w-32 h-32 text-slate-400/5 pointer-events-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8">
    <rect x="44" y="10" width="12" height="80" rx="3" />
    <rect x="22" y="25" width="22" height="50" rx="5" />
    <rect x="56" y="25" width="22" height="50" rx="5" />
    <circle cx="10" cy="50" r="6" />
    <circle cx="90" cy="50" r="6" />
  </svg>
);

const UsersOutline = () => (
  <svg className="absolute -bottom-10 -right-10 w-36 h-36 text-slate-400/5 pointer-events-none z-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <circle cx="50" cy="32" r="10" />
    <path d="M32 20c-5 5-5 19 0 24" />
    <path d="M68 20c5 5 5 19 0 24" />
    <ellipse cx="50" cy="66" rx="14" ry="9" />
    <path d="M26 54c-7 5-7 19 0 24" />
    <path d="M74 54c7 5 7 19 0 24" />
  </svg>
);

const UserOutline = () => (
  <svg className="absolute -bottom-8 -right-8 w-32 h-32 text-slate-400/5 pointer-events-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8">
    <circle cx="50" cy="38" r="18" />
    <path d="M15 78c0-12 15-22 35-22s35 10 35 22" />
  </svg>
);

const INITIAL_PROTOCOLS = [
  { id: "001", name: "The Rotator Cuff Reset", duration: "15m", active: true },
  { id: "002", name: "The Lower Back Performance Flow", duration: "30m", active: true },
  { id: "003", name: "The Lower Back Deep Performance", duration: "45m", active: true },
  { id: "004", name: "The Rotator Cuff Reset", duration: "60m", active: false },
  { id: "005", name: "The Hip Rotation Deep Performance", duration: "45m", active: true },
  { id: "006", name: "The Hip Flexor Strength Full Build", duration: "30m", active: false },
  { id: "007", name: "The Upper Back Ache Full Protocol", duration: "30m", active: false },
  { id: "008", name: "The Shoulder ER Reset", duration: "15m", active: true },
];

export default function ProtocolManagerPage() {
  const [protocols, setProtocols] = useState(INITIAL_PROTOCOLS);

  const toggleStatus = (id: string) => {
    setProtocols(protocols.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">Protocol Manager</h2>
          <p className="text-slate-400 text-sm mt-1">Design and oversee corrective movement sequences.</p>
        </div>
        <Link href="/protocol-manager/create" className="flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-200 cursor-pointer">
          <span>Create New Protocol</span>
          <Plus size={16} className="bg-white/20 rounded-full p-0.5" />
        </Link>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        
        {/* Card 1: Total Protocols */}
        <div className="glass-card bg-[#111827] rounded-2xl p-5 border border-slate-800/60 relative overflow-hidden flex flex-col min-h-[140px] z-10 shadow-lg">
          <FlameOutline />
          <div className="flex items-center justify-between z-10">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <Flame size={18} className="text-cyan-400" />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#059669] bg-[#e6fbf3] px-2.5 py-0.5 rounded-full shadow-sm">
              <TrendingUp size={10} className="stroke-[2.5]" />
              <span>12%</span>
            </div>
          </div>
          <div className="mt-auto z-10">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">TOTAL PROTOCOLS</h4>
            <span className="text-3xl font-bold text-white font-display tracking-tight">412</span>
          </div>
        </div>

        {/* Card 2: Total Exercises */}
        <div className="glass-card bg-[#111827] rounded-2xl p-5 border border-slate-800/60 relative overflow-hidden flex flex-col min-h-[140px] z-10 shadow-lg">
          <DumbbellOutline />
          <div className="flex items-center justify-between z-10">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Dumbbell size={18} className="text-blue-400" />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#059669] bg-[#e6fbf3] px-2.5 py-0.5 rounded-full shadow-sm">
              <TrendingUp size={10} className="stroke-[2.5]" />
              <span>12%</span>
            </div>
          </div>
          <div className="mt-auto z-10">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">TOTAL EXERCISES</h4>
            <span className="text-3xl font-bold text-white font-display tracking-tight">2,854</span>
          </div>
        </div>

        {/* Card 3: Average Duration */}
        <div className="glass-card bg-[#111827] rounded-2xl p-5 border border-slate-800/60 relative overflow-hidden flex flex-col min-h-[140px] z-10 shadow-lg">
          <UsersOutline />
          <div className="flex items-center justify-between z-10">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <Users size={18} className="text-cyan-400" />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#059669] bg-[#e6fbf3] px-2.5 py-0.5 rounded-full shadow-sm">
              <TrendingUp size={10} className="stroke-[2.5]" />
              <span>12%</span>
            </div>
          </div>
          <div className="mt-auto z-10">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">AVERAGE DURATION</h4>
            <span className="text-3xl font-bold text-white font-display tracking-tight">14,285</span>
          </div>
        </div>

        {/* Card 4: Active Users */}
        <div className="glass-card bg-[#111827] rounded-2xl p-5 border border-slate-800/60 relative overflow-hidden flex flex-col min-h-[140px] z-10 shadow-lg">
          <UserOutline />
          <div className="flex items-center justify-between z-10">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <User size={18} className="text-purple-400" />
            </div>
            <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#059669] bg-[#e6fbf3] px-2.5 py-0.5 rounded-full shadow-sm">
              <TrendingUp size={10} className="stroke-[2.5]" />
              <span>12%</span>
            </div>
          </div>
          <div className="mt-auto z-10">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">ACTIVE USERS</h4>
            <span className="text-3xl font-bold text-white font-display tracking-tight">8,912</span>
          </div>
        </div>

      </div>

      {/* Main Table Section */}
      <div className="glass-card bg-[#0b1121] rounded-2xl border border-slate-800/60 flex flex-col">
        <div className="p-6 border-b border-slate-800/60">
          <h3 className="text-white font-bold font-display text-base">Manage Protocols</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#111827]/40 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800/60">
                <th className="py-4 px-6 w-16">#</th>
                <th className="py-4 px-6">PROTOCOL NAME</th>
                <th className="py-4 px-6 w-32">DURATION</th>
                <th className="py-4 px-6 w-40">STATUS</th>
                <th className="py-4 px-6 w-24 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {protocols.map((protocol) => (
                <tr key={protocol.id} className="text-slate-300 hover:bg-slate-800/20 transition-colors duration-150">
                  <td className="py-4 px-6 font-semibold text-slate-500">{protocol.id}</td>
                  <td className="py-4 px-6 font-bold text-white text-[13px]">{protocol.name}</td>
                  <td className="py-4 px-6 text-slate-400 font-medium">{protocol.duration}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleStatus(protocol.id)}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                          protocol.active ? "bg-[#10b981]" : "bg-slate-700"
                        }`}
                      >
                        <span 
                          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                            protocol.active ? "translate-x-4.5" : "translate-x-1"
                          }`} 
                        />
                      </button>
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest ${
                        protocol.active ? "text-[#10b981]" : "text-slate-500"
                      }`}>
                        {protocol.active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-4">
                      <button className="text-slate-500 hover:text-white transition-colors duration-200">
                        <Edit3 size={18} />
                      </button>
                      <button className="text-slate-500 hover:text-rose-400 transition-colors duration-200">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-5 flex items-center justify-between border-t border-slate-800/60 bg-[#0b1121]/50 rounded-b-2xl">
          <span className="text-xs text-slate-500 font-medium tracking-wide">Showing 1-8 of 124 protocols</span>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 select-none">
            <button className="hover:text-white transition-colors"><ArrowLeft size={16} /></button>
            <div className="flex items-center gap-4">
              <button className="w-6 h-6 flex items-center justify-center rounded bg-slate-800 text-white shadow-sm">1</button>
              <button className="hover:text-white transition-colors">2</button>
              <button className="hover:text-white transition-colors">3</button>
            </div>
            <button className="hover:text-white transition-colors"><ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
