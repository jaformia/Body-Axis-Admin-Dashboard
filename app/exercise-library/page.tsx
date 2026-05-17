import { Plus, Tag, Eye } from "lucide-react";

export default function ExerciseLibraryPage() {
  const categories = ["All Movements", "Spine Flexion", "Shoulder Rotation", "Hip Hinge", "Knee Extension", "Core Stability"];
  
  const exercises = [
    { name: "Bulgarian Split Squat", target: "Quadriceps & Gluteus Maximus", difficulty: "Intermediate", rating: "4.9", category: "Knee Extension" },
    { name: "Kettlebell Romanian Deadlift", target: "Hamstrings & Spinal Erectors", difficulty: "Beginner", rating: "4.8", category: "Hip Hinge" },
    { name: "Banded Shoulder External Rotation", target: "Rotator Cuff & Infraspinatus", difficulty: "Beginner", rating: "4.9", category: "Shoulder Rotation" },
    { name: "Decompression Hanging Pulls", target: "Latissimus Dorsi & Lumbar Spine", difficulty: "Advanced", rating: "4.7", category: "Spine Flexion" },
    { name: "Plank Plank Shoulder Taps", target: "Transversus Abdominis & Obliques", difficulty: "Intermediate", rating: "4.8", category: "Core Stability" }
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">Exercise Library</h2>
          <p className="text-slate-400 text-sm mt-1">Browse, query, and categorize the master biomechanical movement registry.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-200 cursor-pointer">
          <Plus size={16} />
          <span>Add Exercise</span>
        </button>
      </div>

      {/* Categories Horizontal Scroller */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat, idx) => (
          <span 
            key={idx} 
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap border cursor-pointer transition-all duration-300 ${
              idx === 0 
                ? "bg-blue-600/10 text-blue-400 border-blue-500/30" 
                : "bg-slate-900/40 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:border-slate-700"
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Main Grid Exercise Roster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((ex, idx) => (
          <div key={idx} className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between h-48 relative overflow-hidden">
            <span className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-bl-full pointer-events-none" />
            
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-extrabold uppercase text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{ex.category}</span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                  ex.difficulty === "Advanced" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                  ex.difficulty === "Intermediate" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                }`}>{ex.difficulty}</span>
              </div>
              <h4 className="text-white font-bold text-base mt-3.5 tracking-wide line-clamp-1">{ex.name}</h4>
              <p className="text-slate-400 text-xs mt-1.5 line-clamp-1 flex items-center gap-1.5">
                <Tag size={12} className="text-slate-500" />
                {ex.target}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-800/50 pt-3">
              <span className="text-xs font-semibold text-slate-500">Rating: <span className="text-white font-bold">{ex.rating} ★</span></span>
              <button className="flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:text-white transition-colors duration-200">
                <Eye size={12} />
                <span>View Movement</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
