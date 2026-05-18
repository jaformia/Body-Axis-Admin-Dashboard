"use client";

import { useState, useEffect } from "react";
import {
  Users, Banknote, CalendarDays, RefreshCw,
  Download, ArrowUpRight, Grid, BadgeCheck,
  CheckCircle2, AlertCircle, ChevronDown,
  ChevronLeft, ChevronRight, CreditCard
} from "lucide-react";

export default function SubscriptionPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const activities = [
    { type: "success", title: "Payment Successful", desc: "Elena G. • $249.00", icon: CheckCircle2, color: "text-[#10b981] bg-[#10b981]/10" },
    { type: "renew", title: "Plan Renewed", desc: "David K. • Monthly Elite", icon: RefreshCw, color: "text-[#818cf8] bg-[#818cf8]/10" },
    { type: "error", title: "Failed Attempt", desc: "Sarah M. • Expired Card", icon: AlertCircle, color: "text-[#ef4444] bg-[#ef4444]/10" }
  ];

  const subscriptions = [
    { name: "Sophia Roberts", email: "sophia.r@example.com", plan: "Yearly Elite", date: "Dec 12, 2024", payment: "•••• 4242", method: "card", status: "Active" },
    { name: "Jordan Smith", email: "j.smith@corp.com", plan: "Monthly Basic", date: "Oct 18, 2024", payment: "PayPal", method: "paypal", status: "Active" },
    { name: "Alice Thompson", email: "alice.t@wellness.org", plan: "Yearly Elite", date: "Sep 05, 2024", payment: "•••• 9901", method: "card", status: "Active" },
    { name: "Liam Carter", email: "liam@creativestudio.io", plan: "Monthly Elite", date: "Oct 02, 2024", payment: "•••• 5112", method: "card", status: "Cancelled" }
  ];

  return (
    <div className="space-y-8 select-none pb-10">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[28px] font-extrabold text-white tracking-tight font-display leading-tight">Subscription Management</h2>
          <p className="text-slate-400 text-sm mt-1">Manage memberships, billing activity, and subscription performance.</p>
        </div>

        <button className="flex items-center gap-2 bg-transparent border border-slate-800/80 hover:bg-slate-800/50 text-slate-300 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer">
          <Download size={14} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="rounded-2xl p-5 border border-slate-800/60 bg-[#111627] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#2b3a5e]/50 flex items-center justify-center text-[#8ba2d9]">
              <Users size={18} />
            </div>
            <div className="flex items-center gap-1 text-[#2dd4bf] text-xs font-bold">
              <ArrowUpRight size={14} />
              <span>+12%</span>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-400">Total Subscribers</span>
            <div className="text-[26px] font-extrabold text-white mt-1 leading-none tracking-tight">12,458</div>
          </div>
        </div>

        <div className="rounded-2xl p-5 border border-slate-800/60 bg-[#111627] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0f2e2e] flex items-center justify-center text-[#2dd4bf]">
              <Banknote size={18} />
            </div>
            <div className="flex items-center gap-1 text-[#2dd4bf] text-xs font-bold">
              <ArrowUpRight size={14} />
              <span>+8.4%</span>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-400">Monthly Revenue</span>
            <div className="text-[26px] font-extrabold text-white mt-1 leading-none tracking-tight">$48,290</div>
          </div>
        </div>

        <div className="rounded-2xl p-5 border border-slate-800/60 bg-[#111627] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#1e2a3b] flex items-center justify-center text-[#60a5fa]">
              <CalendarDays size={18} />
            </div>
            <div className="text-[#8ba2d9] text-[11px] font-medium">74% Target</div>
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-400">Yearly Members</span>
            <div className="text-[26px] font-extrabold text-white mt-1 leading-none tracking-tight">74%</div>
          </div>
        </div>

        <div className="rounded-2xl p-5 border border-slate-800/60 bg-[#111627] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#2e2632] flex items-center justify-center text-[#e879f9]">
              <RefreshCw size={18} />
            </div>
            <div className="text-[#2dd4bf] text-[11px] font-medium">Optimal</div>
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-400">Renewal Rate</span>
            <div className="text-[26px] font-extrabold text-white mt-1 leading-none tracking-tight">91%</div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">

        {/* Left Column */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white tracking-wide">Active Plans</h3>

          {/* Monthly Plan Card */}
          <div className="rounded-2xl p-6 border border-[#2563eb]/30 bg-gradient-to-br from-[#0b3370] to-[#0a1835] relative overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.15)]">
            <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
              <Grid size={80} className="text-[#60a5fa]" />
            </div>

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white/10 text-slate-200 text-[10px] font-bold rounded-full mb-4">Popular</span>
              <h4 className="text-white font-extrabold text-[22px] mb-3 tracking-tight">Monthly Membership</h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-[40px] font-extrabold text-white leading-none tracking-tighter">$29</span>
                <span className="text-xs font-bold text-slate-300">/mo</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1e3a8a]/40 rounded-xl p-3 border border-white/5">
                  <span className="text-[10px] text-blue-200/70 font-bold block mb-0.5">Subscribers</span>
                  <span className="text-[15px] font-extrabold text-white">8,420</span>
                </div>
                <div className="bg-[#1e3a8a]/40 rounded-xl p-3 border border-white/5">
                  <span className="text-[10px] text-blue-200/70 font-bold block mb-0.5">Conversion</span>
                  <span className="text-[15px] font-extrabold text-white">12%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Yearly Plan Card */}
          <div className="rounded-2xl p-6 border border-[#3b82f6]/40 bg-gradient-to-br from-[#1e40af]/70 to-[#0b1329] relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <div className="absolute top-6 right-6 pointer-events-none">
              <BadgeCheck size={28} className="text-[#60a5fa] opacity-50" />
            </div>

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-200 border border-blue-500/20 text-[10px] font-bold rounded-full mb-4">Best Value</span>
              <h4 className="text-white font-extrabold text-[22px] mb-3 tracking-tight">Yearly Membership</h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-[40px] font-extrabold text-white leading-none tracking-tighter">$249</span>
                <span className="text-xs font-bold text-slate-300">/yr</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1e3a8a]/40 rounded-xl p-3 border border-white/5">
                  <span className="text-[10px] text-blue-200/70 font-bold block mb-0.5">Subscribers</span>
                  <span className="text-[15px] font-extrabold text-white">4,038</span>
                </div>
                <div className="bg-[#1e3a8a]/40 rounded-xl p-3 border border-white/5">
                  <span className="text-[10px] text-blue-200/70 font-bold block mb-0.5">Conversion</span>
                  <span className="text-[15px] font-extrabold text-white">28%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl p-6 border border-slate-800/60 bg-[#111627] shadow-sm">
            <h4 className="text-white font-bold text-sm mb-6">Recent Activity</h4>
            <div className="space-y-6">
              {activities.map((act, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${act.color}`}>
                    <act.icon size={16} />
                  </div>
                  <div>
                    <h5 className="text-[13px] font-bold text-slate-200">{act.title}</h5>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Revenue Growth Chart */}
          <div className="rounded-2xl p-7 border border-slate-800/60 bg-[#111627] shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-lg font-bold text-white tracking-wide">Revenue Growth</h3>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#818cf8]"></div>
                  <span className="text-[10px] font-bold tracking-wide uppercase text-slate-400">Monthly</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#60a5fa]"></div>
                  <span className="text-[10px] font-bold tracking-wide uppercase text-slate-400">Yearly</span>
                </div>
              </div>
            </div>

            {/* Mock Chart Area */}
            <div className="h-[200px] flex items-end justify-between gap-1.5 px-2 mt-4 relative">
              {/* Bars */}
              {[
                30, 42, 25, 38, 34, 45, 38, 55, 36, 52, 28, 48, 38, 85
              ].map((height, i) => {
                const isLast = i === 13;
                return (
                  <div
                    key={i}
                    className={`w-full rounded-t-md transition-all ease-out ${isLast
                        ? 'bg-gradient-to-t from-[#22d3ee] to-[#c084fc] shadow-[0_0_20px_rgba(192,132,252,0.4)]'
                        : 'bg-gradient-to-t from-[#1f576e] to-[#513c94] opacity-80 hover:opacity-100'
                      }`}
                    style={{
                      height: mounted ? `${height}%` : '0%',
                      transitionDuration: '1000ms',
                      transitionDelay: mounted ? `${i * 50}ms` : '0ms'
                    }}
                  ></div>
                );
              })}
            </div>
          </div>

          {/* Table Controls */}
          <div className="flex items-center justify-between gap-4">
            <div className="bg-[#0f172a] border border-slate-800/80 p-1.5 rounded-full flex items-center">
              <button className="px-5 py-2 rounded-full bg-[#c7d2fe] text-[#3730a3] text-[11px] font-bold cursor-pointer transition-colors shadow-sm">All Subs</button>
              <button className="px-5 py-2 rounded-full text-slate-400 hover:text-slate-200 text-[11px] font-bold transition-colors cursor-pointer">Active</button>
              <button className="px-5 py-2 rounded-full text-slate-400 hover:text-slate-200 text-[11px] font-bold transition-colors cursor-pointer">Expiring</button>
              <button className="px-5 py-2 rounded-full text-slate-400 hover:text-slate-200 text-[11px] font-bold transition-colors cursor-pointer">Cancelled</button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <select className="appearance-none bg-[#111627] border border-slate-800/80 text-[11px] font-bold text-slate-300 rounded-full pl-5 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer">
                  <option>Plan Type</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={14} />
              </div>
              <div className="relative">
                <select className="appearance-none bg-[#111627] border border-slate-800/80 text-[11px] font-bold text-slate-300 rounded-full pl-5 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer">
                  <option>Revenue Range</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={14} />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-slate-800/60 overflow-hidden bg-[#111627]/50 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/60 bg-[#111627]">
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[30%]">USER</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">PLAN TYPE</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">RENEWAL DATE</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">PAYMENT</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[15%]">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub, idx) => (
                  <tr key={idx} className="border-b border-slate-800/40 hover:bg-[#1b2237]/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full border border-slate-700/80 flex-shrink-0 bg-[#0f172a]"></div>
                        <div>
                          <div className="text-[13px] text-slate-200 font-bold leading-tight">{sub.name}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{sub.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-[11px] text-slate-300 font-medium whitespace-pre-line leading-snug">
                        {sub.plan.replace(' ', '\n')}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[11px] text-slate-300 font-medium whitespace-pre-line leading-snug">
                      {sub.date.replace(', ', ',\n')}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-[11px] text-slate-300 font-medium">
                        {sub.method === 'card' ? <CreditCard size={14} className="text-slate-500" /> : <div className="text-slate-500 text-[10px] font-bold border border-slate-700 rounded px-1">P</div>}
                        <span>{sub.payment}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold border ${sub.status === 'Active'
                          ? 'bg-[#064e3b]/40 text-[#10b981] border-[#10b981]/20'
                          : 'bg-[#7f1d1d]/40 text-[#f87171] border-[#f87171]/20'
                        }`}>
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-slate-800/60 bg-[#111627]/80">
              <div className="text-[11px] text-slate-500 font-medium">
                Showing 4 of 12,458 subscribers
              </div>
              <div className="flex items-center gap-1.5">
                <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-700/50 text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer">
                  <ChevronLeft size={14} />
                </button>
                <button className="w-7 h-7 flex items-center justify-center rounded bg-[#1e293b] border border-slate-700 text-slate-300 text-[11px] font-bold cursor-pointer">1</button>
                <button className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 text-[11px] font-medium transition-colors cursor-pointer">2</button>
                <button className="w-7 h-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 text-[11px] font-medium transition-colors cursor-pointer">3</button>
                <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-700/50 text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
