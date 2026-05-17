import { Search, Plus, Filter, CalendarDays, ChevronDown, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export default function VideoManagerPage() {
  const videos = [
    { id: "EX-260001", name: "Supine Pelvic Clocks", size: "248.5 MB", date: "10/30/2025", status: "Uploaded" },
    { id: "EX-260002", name: "Thoracic Extension", size: "248.5 MB", date: "10/30/2025", status: "Uploaded" },
    { id: "EX-260002", name: "Long-Lever Hamstring Bridge", size: "248.5 MB", date: "10/30/2025", status: "Uploaded" },
    { id: "EX-260002", name: "Long-Lever Hamstring Bridge", size: "248.5 MB", date: "10/30/2025", status: "Processing" },
    { id: "EX-260002", name: "Long-Lever Hamstring Bridge", size: "248.5 MB", date: "10/30/2025", status: "Processing" },
    { id: "EX-260002", name: "Long-Lever Hamstring Bridge", size: "248.5 MB", date: "10/30/2025", status: "Error" },
    { id: "EX-260002", name: "Long-Lever Hamstring Bridge", size: "248.5 MB", date: "10/30/2025", status: "Error" },
  ];

  return (
    <div className="space-y-6 select-none pb-10">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[28px] font-extrabold text-white tracking-tight font-display leading-tight">Video Manager</h2>
          <p className="text-slate-400 text-sm mt-1">Review and manage biomechanical movement assets.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-[#0f172a]/80 border border-slate-800/80 text-sm text-slate-200 rounded-full pl-11 pr-4 py-2.5 w-72 focus:outline-none focus:border-[#2563eb]/50 focus:ring-1 focus:ring-[#2563eb]/50 transition-all placeholder:text-slate-600"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#2563eb] hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-[0_0_20px_rgba(37,99,235,0.25)] transition-all duration-200 cursor-pointer">
            <span>Upload New Video</span>
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="rounded-2xl p-4 border border-slate-800/60 flex items-center justify-between bg-[#111627]">
        <div className="flex items-center gap-6 w-full">
          <div className="flex items-center gap-2 text-slate-400 font-bold tracking-widest text-[11px] px-2">
            <Filter size={16} />
            <span>FILTERS</span>
          </div>

          <div className="flex items-center gap-6 flex-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">EXERCISE ID/NAME</span>
              <input 
                type="text" 
                placeholder="Long-Lever Hamstring Bridge" 
                className="bg-[#1b2237] border-none text-xs text-slate-300 rounded-lg px-4 py-2.5 w-64 focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder:text-slate-500/80"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">UPLOAD DATE</span>
              <div className="relative">
                <input 
                  type="date" 
                  defaultValue="2025-10-30" 
                  className="style-date-input bg-[#1b2237] border-none text-xs text-slate-300 rounded-lg pl-4 pr-10 py-2.5 w-36 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                />
                <CalendarDays className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">STATUS</span>
              <div className="relative">
                <select className="appearance-none bg-[#1b2237] border-none text-xs text-slate-400 rounded-lg pl-4 pr-9 py-2.5 w-32 focus:outline-none focus:ring-1 focus:ring-blue-500/50">
                  <option>Published</option>
                  <option>Processing</option>
                  <option>Error</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={14} />
              </div>
            </div>
          </div>
          
          <div className="text-xs text-slate-500 font-medium pr-2">
            Showing 1-4 of 16
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-2xl border border-slate-800/60 overflow-hidden bg-[#111627]/50 mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/60">
              <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[15%]">EXERCISE ID</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[30%]">EXERCISE NAME</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[15%]">FILE SIZE</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[15%]">UPLOAD DATE</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[15%]">STATUS</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[10%] text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((vid, idx) => (
              <tr key={idx} className="border-b border-slate-800/40 hover:bg-[#1b2237]/50 transition-colors group">
                <td className="py-4 px-6 text-xs text-slate-400 font-medium">{vid.id}</td>
                <td className="py-4 px-6 text-sm text-slate-200 font-bold">{vid.name}</td>
                <td className="py-4 px-6 text-xs text-slate-400 font-medium">{vid.size}</td>
                <td className="py-4 px-6 text-xs text-slate-400 font-medium">{vid.date}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      vid.status === 'Uploaded' ? 'bg-[#10b981]' :
                      vid.status === 'Processing' ? 'bg-[#f59e0b]' : 'bg-[#ef4444]'
                    }`}></div>
                    <span className={`text-[11px] font-medium ${
                      vid.status === 'Uploaded' ? 'text-[#10b981]' :
                      vid.status === 'Processing' ? 'text-[#f59e0b]' : 'text-[#ef4444]'
                    }`}>
                      {vid.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
                    <Trash2 size={16} />
                  </button>
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
            <button className="w-7 h-7 flex items-center justify-center rounded text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer">12</button>
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
