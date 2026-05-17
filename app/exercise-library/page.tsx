"use client";

import { 
  Search, 
  PlusCircle, 
  Dumbbell, 
  Flame, 
  Clock, 
  User, 
  Filter, 
  ChevronDown, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Layers
} from "lucide-react";

export default function ExerciseLibraryPage() {
  const exercises = [
    {
      id: "EX-260001",
      name: "Supine Pelvic Clocks",
      bodyAreas: ["Lower Back", "Shoulder", "Upper Back", "Neck"],
      phases: ["Reset"],
      equipment: "mat",
      status: "Published"
    },
    {
      id: "EX-260002",
      name: "Thoracic Extension",
      bodyAreas: ["Lower Back", "Shoulder", "Upper Back", "Neck"],
      phases: ["Reset", "Control"],
      equipment: "mat",
      status: "Published"
    },
    {
      id: "EX-260003",
      name: "Long-Lever Hamstring Bridge",
      bodyAreas: ["Lower Back", "Hamstrings", "Glutes", "Hips"],
      phases: ["Control", "Integrate"],
      equipment: "mat",
      status: "Drafted"
    },
    {
      id: "EX-260004",
      name: "Long-Lever Hamstring Bridge",
      bodyAreas: ["Lower Back", "Hamstrings", "Glutes", "Hips"],
      phases: ["Control", "Integrate"],
      equipment: "mat",
      status: "Published"
    }
  ];

  const getPhaseStyles = (phase: string) => {
    switch(phase) {
      case "Reset": return "bg-[#0b1121] text-cyan-400";
      case "Control": return "bg-[#0b1121] text-blue-400";
      case "Integrate": return "bg-[#0b1121] text-[#10b981]";
      default: return "bg-[#0b1121] text-slate-400";
    }
  };

  return (
    <div className="space-y-6 select-none pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">Exercise Library</h2>
          <p className="text-slate-400 text-sm mt-1">Manage the global database of biomechanical movements, protocols, and performance metrics.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-[#111621] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder:text-slate-600"
            />
          </div>
          <button className="flex-shrink-0 flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-[0_0_20px_rgba(37,99,235,0.3)] cursor-pointer">
            Add New Exercise <PlusCircle size={16} />
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* TOTAL EXERCISES */}
        <div className="glass-card bg-[#0b1121] rounded-2xl p-6 border border-[#1e293b]/50 relative overflow-hidden group">
          <Dumbbell className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-800/30 -rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 pointer-events-none" />
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
              <Dumbbell size={16} className="text-blue-400" />
            </div>
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">TOTAL EXERCISES</h3>
            <p className="text-3xl font-extrabold text-white tracking-tight">2,854</p>
          </div>
        </div>

        {/* PUBLISHED EXERCISE */}
        <div className="glass-card bg-[#0b1121] rounded-2xl p-6 border border-[#1e293b]/50 relative overflow-hidden group">
          <Flame className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-800/30 -rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 pointer-events-none" />
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-lg bg-[#10b981]/10 flex items-center justify-center mb-4 border border-[#10b981]/20">
              <Flame size={16} className="text-[#10b981]" />
            </div>
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">PUBLISHED EXERCISE</h3>
            <p className="text-3xl font-extrabold text-white tracking-tight">412</p>
          </div>
        </div>

        {/* AVERAGE DURATION */}
        <div className="glass-card bg-[#0b1121] rounded-2xl p-6 border border-[#1e293b]/50 relative overflow-hidden group">
          <Clock className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-800/30 -rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 pointer-events-none" />
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-500/20">
              <Clock size={16} className="text-cyan-400" />
            </div>
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">AVERAGE DURATION</h3>
            <p className="text-3xl font-extrabold text-white tracking-tight">14,285</p>
          </div>
        </div>

        {/* ACTIVE USERS */}
        <div className="glass-card bg-[#0b1121] rounded-2xl p-6 border border-[#1e293b]/50 relative overflow-hidden group">
          <User className="absolute -bottom-4 -right-4 w-32 h-32 text-slate-800/30 -rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 pointer-events-none" />
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center mb-4 border border-[#8b5cf6]/20">
              <User size={16} className="text-[#8b5cf6]" />
            </div>
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">ACTIVE USERS</h3>
            <p className="text-3xl font-extrabold text-white tracking-tight">8,912</p>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="glass-card bg-[#1e2330] rounded-2xl border border-slate-800/50 mt-6 flex flex-col">
        
        {/* Filters Bar */}
        <div className="p-4 border-b border-slate-800/50 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400 mr-2">
              <Filter size={16} />
              <span className="text-[10px] font-extrabold uppercase tracking-widest">FILTERS</span>
            </div>
            
            {/* Body Area */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BODY AREA</span>
              <div className="relative">
                <select className="appearance-none bg-[#111621] border-none rounded-lg pl-3 pr-8 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer min-w-[120px]">
                  <option>Shoulder</option>
                  <option>Lower Back</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Phase */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PHASE</span>
              <div className="relative">
                <select className="appearance-none bg-[#111621] border-none rounded-lg pl-3 pr-8 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer min-w-[110px]">
                  <option>Reset</option>
                  <option>Control</option>
                  <option>Integrate</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Equipment */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">EQUIPMENT</span>
              <div className="relative">
                <select className="appearance-none bg-[#111621] border-none rounded-lg pl-3 pr-8 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer min-w-[110px]">
                  <option>Bench</option>
                  <option>Dumbbell</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">STATUS</span>
              <div className="relative">
                <select className="appearance-none bg-[#111621] border-none rounded-lg pl-3 pr-8 py-2 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer min-w-[110px]">
                  <option>Published</option>
                  <option>Drafted</option>
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium whitespace-nowrap">
            Showing 1-4 of 16
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-800/50 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-[#151a26]/50">
                <th className="py-5 px-6 w-[120px]">EXERCISE ID</th>
                <th className="py-5 px-6 w-[220px]">EXERCISE NAME</th>
                <th className="py-5 px-6 w-[240px]">BODY AREA</th>
                <th className="py-5 px-6 w-[180px]">PHASE</th>
                <th className="py-5 px-6 w-[100px]">EQUIPMENT</th>
                <th className="py-5 px-6 w-[120px]">STATUS</th>
                <th className="py-5 px-6 w-[100px] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {exercises.map((ex, idx) => (
                <tr key={idx} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="py-6 px-6 text-[11px] text-slate-400 font-semibold tracking-wider">
                    {ex.id}
                  </td>
                  <td className="py-6 px-6 text-sm text-white font-bold tracking-wide">
                    {ex.name}
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex flex-wrap gap-2 max-w-[200px]">
                      {ex.bodyAreas.map(area => (
                        <span key={area} className="bg-[#34d399] text-slate-900 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex flex-wrap gap-2">
                      {ex.phases.map(phase => (
                        <span key={phase} className={`text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-700/50 shadow-sm ${getPhaseStyles(phase)}`}>
                          {phase}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <Layers size={18} className="text-[#34d399]/70" />
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] ${ex.status === 'Published' ? 'bg-[#10b981] text-[#10b981]' : 'bg-slate-500 text-slate-500'}`}></span>
                      <span className={`text-[11px] font-bold tracking-wide ${ex.status === 'Published' ? 'text-[#10b981]' : 'text-slate-500'}`}>
                        {ex.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-6 px-6">
                    <div className="flex items-center justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                        <Edit size={16} />
                      </button>
                      <button className="text-slate-500 hover:text-rose-500 transition-colors cursor-pointer">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#151a26]/30 rounded-b-2xl">
          <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors cursor-pointer">
            <ChevronLeft size={14} /> PREVIOUS
          </button>
          
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 rounded-full bg-cyan-400 text-slate-900 font-bold text-xs flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.4)]">1</button>
            <button className="w-8 h-8 rounded-full bg-transparent text-slate-400 hover:text-white font-bold text-xs flex items-center justify-center cursor-pointer transition-colors">2</button>
            <button className="w-8 h-8 rounded-full bg-transparent text-slate-400 hover:text-white font-bold text-xs flex items-center justify-center cursor-pointer transition-colors">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-slate-500 text-xs">...</span>
            <button className="w-8 h-8 rounded-full bg-transparent text-slate-400 hover:text-white font-bold text-xs flex items-center justify-center cursor-pointer transition-colors">12</button>
          </div>

          <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors cursor-pointer">
            NEXT <ChevronRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
