import { Settings, Shield, Globe, BellRing, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">System Settings</h2>
          <p className="text-slate-400 text-sm mt-1">Configure clinical parameters, workspace identity, security, and webhooks.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-200 cursor-pointer">
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Main Grid Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation/Sidebar List */}
        <div className="glass-card rounded-2xl p-4 space-y-1.5 h-fit border border-slate-800/80">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/25 font-bold text-xs uppercase tracking-wider text-left">
            <Settings size={14} />
            <span>Workspace Profile</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent font-bold text-xs uppercase tracking-wider text-left transition-all duration-200">
            <Shield size={14} />
            <span>Security &amp; Encryption</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent font-bold text-xs uppercase tracking-wider text-left transition-all duration-200">
            <Globe size={14} />
            <span>Webhooks &amp; APIs</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent font-bold text-xs uppercase tracking-wider text-left transition-all duration-200">
            <BellRing size={14} />
            <span>Notifications SLA</span>
          </button>
        </div>

        {/* Settings Details Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Workspace Identity */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-bold font-display text-base">Workspace Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Workspace Name</label>
                <input 
                  type="text" 
                  defaultValue="Body Axis™ Clinical Mainframe" 
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Administrator Email</label>
                <input 
                  type="email" 
                  defaultValue="jafor@bodyaxis.com" 
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>
          </div>

          {/* Webhooks Config */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-bold font-display text-base">Developer Webhook Integration</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Payload URL</label>
                <input 
                  type="text" 
                  defaultValue="https://api.bodyaxis.com/v1/webhooks/workspace-sync" 
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Secret Token Key</label>
                <input 
                  type="password" 
                  defaultValue="••••••••••••••••••••••••••••••••" 
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
