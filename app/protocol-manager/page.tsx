import { ClipboardList, Plus, FileText, CheckCircle2 } from "lucide-react";

export default function ProtocolManagerPage() {
  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">Protocol Manager</h2>
          <p className="text-slate-400 text-sm mt-1">Design, assign, and distribute clinical biomechanical protocols.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-200 cursor-pointer">
          <Plus size={16} />
          <span>New Protocol</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80">
          <div className="flex items-center gap-2.5 mb-4 text-blue-400 font-bold text-sm tracking-wide">
            <ClipboardList size={16} />
            <span>CLINICAL PROTOCOLS</span>
          </div>
          <p className="text-2xl font-bold text-white font-display">18 Active</p>
          <p className="text-slate-400 text-xs mt-2">Currently being tracked by patients in real-time.</p>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80">
          <div className="flex items-center gap-2.5 mb-4 text-indigo-400 font-bold text-sm tracking-wide">
            <FileText size={16} />
            <span>DRAFT PATTERNS</span>
          </div>
          <p className="text-2xl font-bold text-white font-display">6 Pending</p>
          <p className="text-slate-400 text-xs mt-2">Undergoing internal biometric peer review.</p>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80">
          <div className="flex items-center gap-2.5 mb-4 text-emerald-400 font-bold text-sm tracking-wide">
            <CheckCircle2 size={16} />
            <span>COMPLETED RUNS</span>
          </div>
          <p className="text-2xl font-bold text-white font-display">1,842 Total</p>
          <p className="text-slate-400 text-xs mt-2">Successfully finalized with positive feedback.</p>
        </div>
      </div>

      {/* Active Table Roster */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-white font-bold font-display text-base mb-4">Active Protocol Roster</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800/50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Name</th>
                <th className="pb-3">Target Area</th>
                <th className="pb-3">Estimated Duration</th>
                <th className="pb-3">Adherence Rate</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              <tr className="text-slate-300">
                <td className="py-4 font-semibold text-white">Lumbar Deep Reset</td>
                <td className="py-4">Lower Back / Core</td>
                <td className="py-4">12 weeks</td>
                <td className="py-4 font-semibold text-blue-400">94.8%</td>
                <td className="py-4 text-right">
                  <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold rounded-lg">Active</span>
                </td>
              </tr>
              <tr className="text-slate-300">
                <td className="py-4 font-semibold text-white">Cervical Spine Alignment</td>
                <td className="py-4">Neck / Upper Back</td>
                <td className="py-4">8 weeks</td>
                <td className="py-4 font-semibold text-blue-400">89.2%</td>
                <td className="py-4 text-right">
                  <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold rounded-lg">Active</span>
                </td>
              </tr>
              <tr className="text-slate-300">
                <td className="py-4 font-semibold text-white">Shoulder Girdle Mobilizer</td>
                <td className="py-4">Rotator Cuff</td>
                <td className="py-4">6 weeks</td>
                <td className="py-4 font-semibold text-blue-400">84.1%</td>
                <td className="py-4 text-right">
                  <span className="px-2.5 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-[10px] font-extrabold rounded-lg">Monitoring</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
