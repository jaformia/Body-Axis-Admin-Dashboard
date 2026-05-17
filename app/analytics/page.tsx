import { BarChart3, TrendingUp, Clock, ShieldCheck, Activity } from "lucide-react";

export default function AnalyticsPage() {
  const metrics = [
    { label: "Patient Compliance Rate", value: "91.4%", change: "+3.2%", subtext: "High clinical alignment", color: "blue" },
    { label: "Average Session Duration", value: "24.5 min", change: "-0.8%", subtext: "Optimal biomechanical loading", color: "indigo" },
    { label: "Daily Active Therapists", value: "32 Clinicians", change: "+11.4%", subtext: "94% engagement index", color: "sky" }
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">System Analytics</h2>
          <p className="text-slate-400 text-sm mt-1">Deep dive performance metrics, active sessions, and compliance indexes.</p>
        </div>
      </div>

      {/* Primary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((met, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-5 border border-slate-800/80 relative overflow-hidden flex flex-col justify-between h-36">
            <span className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{met.label}</span>
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center">
                {idx === 0 ? <ShieldCheck className="text-blue-400" size={16} /> : 
                 idx === 1 ? <Clock className="text-indigo-400" size={16} /> : 
                 <Activity className="text-sky-400" size={16} />}
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white font-display tracking-tight">{met.value}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                met.change.startsWith("+") 
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                  : "bg-rose-500/10 text-rose-400 border-rose-500/20"
              }`}>{met.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Comparison Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Distribution */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="text-blue-400" size={18} />
            <h3 className="text-base font-bold text-white font-display tracking-wide">Compliance Over Time</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-900/30 border border-slate-800/50 rounded-xl">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Lumbar Deep Reset</span>
                <span className="text-white font-bold">94.8%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-850">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full" style={{ width: "94.8%" }} />
              </div>
            </div>

            <div className="p-4 bg-slate-900/30 border border-slate-800/50 rounded-xl">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Cervical Spine Alignment</span>
                <span className="text-white font-bold">89.2%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-850">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full" style={{ width: "89.2%" }} />
              </div>
            </div>

            <div className="p-4 bg-slate-900/30 border border-slate-800/50 rounded-xl">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Thoracic Mobility Max</span>
                <span className="text-white font-bold">86.4%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-850">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full" style={{ width: "86.4%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Timeline */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-display tracking-wide mb-6">Diagnostic Timeline</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 ring-4 ring-blue-500/20 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">System Synchronized Successfully</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Biometric sync successfully written to main database cluster.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 ring-4 ring-indigo-500/20 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">4K Video Optimization Finalized</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Newly uploaded biomechanical clips fully optimized in H.265 compression format.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 ring-4 ring-emerald-500/20 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white">Compliance Target Exceeded</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Average weekly workspace compliance index crossed the target boundary by +2.4%.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
