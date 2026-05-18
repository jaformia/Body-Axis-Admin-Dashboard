import { Search, Filter, CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export default function UsersManagementPage() {
  const users = [
    { name: "Olivia Katherine Montgo...", dob: "24 Aug 1995", email: "olivia.katherine.montgomery...", joinDate: "12 Jan 2026", protocol: "The Lower Back Ache Full...", total: "4", status: "ACTIVE", sessions: "42" },
    { name: "Olivia Katherine Mont...", dob: "24 Aug 1995", email: "olivia.katherine.montgomery...", joinDate: "12 Jan 2026", protocol: "The Lower Back Ache Full...", total: "4", status: "EXPIRING SOON", sessions: "42" },
    { name: "Olivia Katherine Mont...", dob: "24 Aug 1995", email: "olivia.katherine.montgomery...", joinDate: "12 Jan 2026", protocol: "The Lower Back Ache Full...", total: "4", status: "EXPIRED", sessions: "42" },
    { name: "Ethan Alexander Broo...", dob: "12 Nov 1988", email: "ethan.alexander.brookshire...", joinDate: "18 Jan 2026", protocol: "The QL Deep Reset", total: "2", status: "EXPIRING SOON", sessions: "36" },
    { name: "Ethan Alexander Broo...", dob: "12 Nov 1988", email: "ethan.alexander.brookshire...", joinDate: "18 Jan 2026", protocol: "The QL Deep Reset", total: "2", status: "EXPIRING SOON", sessions: "36" },
    { name: "Ethan Alexander Broo...", dob: "12 Nov 1988", email: "ethan.alexander.brookshire...", joinDate: "18 Jan 2026", protocol: "The QL Deep Reset", total: "2", status: "EXPIRED", sessions: "36" },
    { name: "Sophia Elizabeth Harri...", dob: "03 Feb 1992", email: "sophia.elizabeth.harrington...", joinDate: "25 Jan 2026", protocol: "The Hip Flexor Strength F...", total: "4", status: "ACTIVE", sessions: "42" },
    { name: "Sophia Elizabeth Harri...", dob: "03 Feb 1992", email: "sophia.elizabeth.harrington...", joinDate: "25 Jan 2026", protocol: "The Hip Flexor Strength F...", total: "4", status: "ACTIVE", sessions: "42" },
    { name: "Liam Jonathan Wellin...", dob: "19 Jul 1985", email: "liam.jonathan.wellington@ex...", joinDate: "25 Jan 2026", protocol: "The Hip Flexor Strength F...", total: "4", status: "EXPIRED", sessions: "42" },
    { name: "Liam Jonathan Wellin...", dob: "19 Jul 1985", email: "liam.jonathan.wellington@ex...", joinDate: "25 Jan 2026", protocol: "The Hip Flexor Strength F...", total: "4", status: "ACTIVE", sessions: "42" },
  ];

  return (
    <div className="space-y-6 select-none pb-10">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[28px] font-extrabold text-white tracking-tight font-display leading-tight">User Management</h2>
          <p className="text-slate-400 text-sm mt-1">Manage clients, monitor protocols, and track performance metrics.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-[#0f172a]/80 border border-slate-800/80 text-sm text-slate-200 rounded-full pl-11 pr-4 py-2.5 w-80 focus:outline-none focus:border-[#2563eb]/50 focus:ring-1 focus:ring-[#2563eb]/50 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className="rounded-2xl p-5 border border-slate-800/60 bg-[#111627]">
        <div className="flex flex-col gap-5">
          {/* Top Row */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-slate-400 font-bold tracking-widest text-[11px] px-2 w-[100px]">
              <Filter size={16} />
              <span>FILTERS</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest w-28">EMAIL ID/NAME</span>
              <input 
                type="text" 
                defaultValue="olivia.katherine.montgomery" 
                className="bg-[#1b2237] border-none text-xs text-slate-300 rounded-full px-4 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest w-20">JOIN DATE</span>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input 
                    type="date" 
                    defaultValue="2025-10-14" 
                    className="style-date-input bg-[#1b2237] border-none text-xs text-slate-300 rounded-full pl-4 pr-10 py-2 w-32 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  />
                  <CalendarDays className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
                <span className="text-xs text-slate-500 font-medium">to</span>
                <div className="relative">
                  <input 
                    type="date" 
                    defaultValue="2025-10-14" 
                    className="style-date-input bg-[#1b2237] border-none text-xs text-slate-300 rounded-full pl-4 pr-10 py-2 w-32 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  />
                  <CalendarDays className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 px-2">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest w-[84px]">STATUS</span>
              <div className="relative">
                <select className="appearance-none bg-[#1b2237] border-none text-xs text-slate-400 rounded-full pl-4 pr-9 py-2 w-36 focus:outline-none focus:ring-1 focus:ring-blue-500/50">
                  <option>Expiring Soon</option>
                  <option>Active</option>
                  <option>Expired</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={14} />
              </div>
            </div>
            
            <div className="text-[11px] text-slate-500 font-medium pr-2">
              Showing <span className="text-slate-300">1-10</span> of 9,546
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-2xl border border-slate-800/60 overflow-hidden bg-[#111627]/50 mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/60">
              <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">NAME</th>
              <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">DATE OF BIRTH</th>
              <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">EMAIL</th>
              <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[12%]">JOIN DATE</th>
              <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">CURRENT PROTOCOL</th>
              <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">TOTAL</th>
              <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[15%]">STATUS</th>
              <th className="py-5 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">SESSIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="border-b border-slate-800/40 hover:bg-[#1b2237]/50 transition-colors group">
                <td className="py-4 px-6 text-xs text-slate-200 font-bold">{user.name}</td>
                <td className="py-4 px-6 text-[11px] text-slate-400 font-medium">{user.dob}</td>
                <td className="py-4 px-6 text-[11px] text-slate-400 font-medium">{user.email}</td>
                <td className="py-4 px-6 text-[11px] text-slate-400 font-medium">{user.joinDate}</td>
                <td className="py-4 px-6 text-[11px] text-slate-400 font-medium">{user.protocol}</td>
                <td className="py-4 px-6 text-xs text-white font-bold text-center">{user.total}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      user.status === 'ACTIVE' ? 'bg-[#10b981]' :
                      user.status === 'EXPIRING SOON' ? 'bg-[#f59e0b]' : 'bg-[#ef4444]'
                    }`}></div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      user.status === 'ACTIVE' ? 'text-[#10b981]' :
                      user.status === 'EXPIRING SOON' ? 'text-[#f59e0b]' : 'text-[#ef4444]'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <span className="text-[#10b981] font-bold text-xs">{user.sessions}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-slate-800/60 bg-[#111627]/80">
          <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors cursor-pointer">
            <ChevronLeft size={14} />
            <span>PREVIOUS</span>
          </button>
          
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded bg-[#22d3ee] text-[#0f172a] text-xs font-bold cursor-pointer">1</button>
            <button className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer">2</button>
            <button className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer">3</button>
            <span className="w-7 h-7 flex items-center justify-center text-slate-500 text-xs font-bold">...</span>
            <button className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer">955</button>
          </div>

          <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors cursor-pointer">
            <span>NEXT</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
