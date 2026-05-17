import { Video, Plus, Play, Clock, HardDrive, Film } from "lucide-react";

export default function VideoManagerPage() {
  const videos = [
    { title: "Standard Lumbar Decompression Drill", duration: "3:45", size: "45.2 MB", resolution: "1080p", date: "Oct 12, 2026" },
    { title: "Thoracic Extensor Mobilization v4", duration: "5:12", size: "124.8 MB", resolution: "4K UHD", date: "Oct 10, 2026" },
    { title: "Bulgarian Knee Load Biomechanics", duration: "2:30", size: "32.1 MB", resolution: "1080p", date: "Oct 08, 2026" },
    { title: "Pelvic Girdle Activation Guide", duration: "4:15", size: "82.5 MB", resolution: "4K UHD", date: "Oct 04, 2026" }
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">Video Manager</h2>
          <p className="text-slate-400 text-sm mt-1">Upload, stream, and catalog biomechanical instruction videos.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-200 cursor-pointer">
          <Plus size={16} />
          <span>Upload Video</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Catalog Size</span>
            <span className="text-xl font-bold text-white font-display mt-1 block">18.4 GB</span>
          </div>
          <div className="p-3 bg-blue-600/10 rounded-xl text-blue-400 border border-blue-500/20">
            <HardDrive size={18} />
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active Video Clips</span>
            <span className="text-xl font-bold text-white font-display mt-1 block">114 Clips</span>
          </div>
          <div className="p-3 bg-indigo-600/10 rounded-xl text-indigo-400 border border-indigo-500/20">
            <Film size={18} />
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Streaming Bandwidth</span>
            <span className="text-xl font-bold text-white font-display mt-1 block">1.2 TB/mo</span>
          </div>
          <div className="p-3 bg-purple-600/10 rounded-xl text-purple-400 border border-purple-500/20">
            <Video size={18} />
          </div>
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((vid, idx) => (
          <div key={idx} className="glass-card rounded-2xl overflow-hidden border border-slate-800/80 group">
            {/* Fake Video Player Screen Container */}
            <div className="h-48 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950/40 relative flex items-center justify-center border-b border-slate-800/80">
              {/* Center Play Button Overlay */}
              <div className="w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 cursor-pointer z-20">
                <Play size={20} className="fill-white translate-x-0.5" />
              </div>
              
              {/* Duration and Resolution indicators inside video frame */}
              <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-slate-800 px-2 py-0.5 rounded text-[10px] font-bold text-slate-300 z-20 flex items-center gap-1">
                <Clock size={10} />
                <span>{vid.duration}</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-blue-600/20 border border-blue-500/30 px-2 py-0.5 rounded text-[10px] font-bold text-blue-400 z-20">
                {vid.resolution}
              </div>

              {/* Decorative radial overlay lines */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/35 pointer-events-none z-10" />
            </div>

            {/* Video description footer details */}
            <div className="p-5 flex flex-col justify-between">
              <h4 className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors duration-200 truncate">{vid.title}</h4>
              <div className="flex items-center justify-between text-xs text-slate-500 mt-3">
                <span>Uploaded {vid.date}</span>
                <span className="font-semibold text-slate-400">{vid.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
