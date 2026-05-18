"use client";

import { useState, useMemo } from "react";
import { 
  Search, Plus, Filter, CalendarDays, ChevronDown, 
  Trash2, ChevronLeft, ChevronRight, AlertTriangle, X 
} from "lucide-react";
import Link from "next/link";

interface VideoAsset {
  id: string;
  name: string;
  size: string;
  date: string;
  status: "Uploaded" | "Processing" | "Error";
}

export default function VideoManagerPage() {
  // State for live video catalog
  const [videos, setVideos] = useState<VideoAsset[]>([
    { id: "EX-260001", name: "Supine Pelvic Clocks", size: "248.5 MB", date: "10/30/2025", status: "Uploaded" },
    { id: "EX-260002", name: "Thoracic Extension", size: "248.5 MB", date: "10/30/2025", status: "Uploaded" },
    { id: "EX-260002", name: "Long-Lever Hamstring Bridge", size: "248.5 MB", date: "10/30/2025", status: "Uploaded" },
    { id: "EX-260002", name: "Long-Lever Hamstring Bridge", size: "248.5 MB", date: "10/30/2025", status: "Processing" },
    { id: "EX-260002", name: "Long-Lever Hamstring Bridge", size: "248.5 MB", date: "10/30/2025", status: "Processing" },
    { id: "EX-260002", name: "Long-Lever Hamstring Bridge", size: "248.5 MB", date: "10/30/2025", status: "Error" },
    { id: "EX-260002", name: "Long-Lever Hamstring Bridge", size: "248.5 MB", date: "10/30/2025", status: "Error" },
  ]);

  // Reactive search & filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Deletion Modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<VideoAsset | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Live filter computation
  const filteredVideos = useMemo(() => {
    return videos.filter((vid) => {
      const matchesSearch = 
        vid.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        vid.id.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesFilterText = 
        vid.name.toLowerCase().includes(filterText.toLowerCase()) ||
        vid.id.toLowerCase().includes(filterText.toLowerCase());

      const matchesStatus = 
        statusFilter === "All" || 
        vid.status === statusFilter;
        
      return matchesSearch && matchesFilterText && matchesStatus;
    });
  }, [videos, searchQuery, filterText, statusFilter]);

  // Handler to open delete modal
  const handleDeleteClick = (video: VideoAsset) => {
    setVideoToDelete(video);
    setIsDeleteModalOpen(true);
  };

  // Handler to confirm delete
  const handleConfirmDelete = () => {
    if (!videoToDelete) return;
    setIsDeleting(true);
    
    // Simulate brief API network latency
    setTimeout(() => {
      setVideos((prev) => prev.filter((v) => v !== videoToDelete));
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setVideoToDelete(null);
    }, 800);
  };

  return (
    <div className="space-y-6 select-none pb-10 relative">
      
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#0f172a]/80 border border-slate-800/80 text-sm text-slate-200 rounded-full pl-11 pr-4 py-2.5 w-72 focus:outline-none focus:border-[#2563eb]/50 focus:ring-1 focus:ring-[#2563eb]/50 transition-all placeholder:text-slate-600"
            />
          </div>
          <Link href="/video-manager/upload" className="flex items-center gap-2 bg-[#2563eb] hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-[0_0_20px_rgba(37,99,235,0.25)] transition-all duration-200 cursor-pointer">
            <span>Upload New Video</span>
            <Plus size={16} />
          </Link>
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
                placeholder="Filter by name..." 
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
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
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-[#1b2237] border-none text-xs text-slate-400 rounded-lg pl-4 pr-9 py-2.5 w-36 focus:outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Uploaded">Uploaded</option>
                  <option value="Processing">Processing</option>
                  <option value="Error">Error</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={14} />
              </div>
            </div>
          </div>
          
          <div className="text-xs text-slate-500 font-medium pr-2">
            Showing {filteredVideos.length} of {videos.length}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-2xl border border-slate-800/60 overflow-hidden bg-[#111627]/50 mt-4">
        {filteredVideos.length > 0 ? (
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
              {filteredVideos.map((vid, idx) => (
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
                    <button 
                      onClick={() => handleDeleteClick(vid)}
                      className="text-slate-500 hover:text-rose-400 hover:scale-110 transition-all p-1.5 rounded-lg hover:bg-rose-500/10 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-20 text-center flex flex-col items-center justify-center">
            <AlertTriangle className="text-slate-600 mb-4" size={32} />
            <p className="text-sm text-slate-400 font-bold">No video assets found matching filters</p>
            <p className="text-xs text-slate-600 mt-1">Try refining your search keyword or status filters above.</p>
          </div>
        )}

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

      {/* Delete Video Warning Overlay Modal */}
      {isDeleteModalOpen && videoToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md transition-all duration-300 animate-in fade-in">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass-card border border-rose-500/30 bg-[#0f111a]/95 rounded-3xl p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(244,63,94,0.15)] animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Close Cross Icon */}
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-5 right-5 text-slate-500 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Glowing Icon block */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(244,63,94,0.1)]">
                <AlertTriangle size={32} className="text-rose-500 animate-pulse" />
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl font-extrabold text-white tracking-tight font-display">Delete Video Asset</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed font-semibold">
                Are you sure you want to permanently delete the dynamic movement asset from catalog index?
              </p>

              {/* Targeted Item Preview Block */}
              <div className="w-full mt-4 bg-rose-950/20 rounded-2xl border border-rose-500/20 py-3.5 px-4">
                <span className="text-[11px] font-bold text-rose-400 block uppercase tracking-widest">Selected Exercise</span>
                <span className="text-sm font-extrabold text-rose-200 mt-1 block truncate">
                  {videoToDelete.id}: {videoToDelete.name}
                </span>
              </div>

              <p className="text-[10px] text-slate-500 mt-4 leading-relaxed font-semibold">
                This action is irreversible. All physical therapy protocols and performance sessions utilizing this catalog path will lose visual references.
              </p>

              {/* Actions Footer */}
              <div className="w-full mt-6 grid grid-cols-2 gap-3.5">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="w-full bg-transparent border border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="w-full bg-[#f43f5e] hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-[0_0_25px_rgba(244,63,94,0.25)] hover:shadow-[0_0_30px_rgba(244,63,94,0.4)] disabled:opacity-40 disabled:pointer-events-none transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isDeleting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>Confirm Delete</span>
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
