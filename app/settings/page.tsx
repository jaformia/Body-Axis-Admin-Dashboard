import { User, Camera, Bell, Shield, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 select-none pb-10">
      {/* Header */}
      <div>
        <h2 className="text-[28px] font-extrabold text-white tracking-tight font-display leading-tight">Settings</h2>
      </div>

      {/* Account Profile Card */}
      <div className="rounded-2xl p-7 border border-slate-800/60 bg-[#141a2b] shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#1e293b]/70 flex items-center justify-center text-[#94a3b8]">
            <User size={18} />
          </div>
          <h3 className="text-xl font-bold text-white">Account Profile</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-28 h-28 rounded-2xl bg-[#0f1423] border border-slate-800 overflow-hidden flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-t from-slate-800 to-slate-700/50 flex items-end justify-center pb-2">
                 <User size={56} strokeWidth={1.5} className="text-slate-400 opacity-60 translate-y-2" />
              </div>
            </div>
            {/* Camera badge */}
            <button className="absolute -bottom-2 -right-2 w-[34px] h-[34px] rounded-full bg-[#2dd4bf] border-[4px] border-[#141a2b] flex items-center justify-center text-[#022c22] hover:brightness-110 transition-all cursor-pointer shadow-lg">
              <Camera size={14} className="fill-current" />
            </button>
          </div>

          {/* Inputs */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full pt-1">
            <div className="space-y-2">
              <label className="text-[13px] text-slate-400 font-medium">Full Name</label>
              <input 
                type="text" 
                defaultValue="Alex Rivera"
                className="w-full bg-[#0d121f] border border-slate-800/80 rounded-xl py-3 px-4 text-[13px] text-slate-200 font-medium focus:outline-none focus:border-slate-600 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] text-slate-400 font-medium">Email Address</label>
              <input 
                type="email" 
                defaultValue="alex.rivera@bodyaxis.io"
                className="w-full bg-[#0d121f] border border-slate-800/80 rounded-xl py-3 px-4 text-[13px] text-slate-200 font-medium focus:outline-none focus:border-slate-600 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications Card */}
        <div className="rounded-2xl p-7 border border-slate-800/60 bg-[#141a2b] shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#0f2a28] flex items-center justify-center text-[#2dd4bf]">
              <Bell size={18} />
            </div>
            <h3 className="text-xl font-bold text-white">Notifications</h3>
          </div>

          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium text-slate-200">Email Notifications</div>
                <div className="text-[11px] text-slate-500 mt-1">Receive weekly summary reports</div>
              </div>
              <button className="w-10 h-6 bg-[#0d332d] rounded-full flex items-center p-1 cursor-pointer transition-colors">
                <div className="w-[16px] h-[16px] bg-[#2dd4bf] rounded-full transform translate-x-4 shadow-sm transition-transform"></div>
              </button>
            </div>

            {/* Subscription Alerts */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium text-slate-200">Subscription Alerts</div>
                <div className="text-[11px] text-slate-500 mt-1">Alerts for plan renewals & changes</div>
              </div>
              <button className="w-10 h-6 bg-[#0d332d] rounded-full flex items-center p-1 cursor-pointer transition-colors">
                <div className="w-[16px] h-[16px] bg-[#2dd4bf] rounded-full transform translate-x-4 shadow-sm transition-transform"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="rounded-2xl p-7 border border-slate-800/60 bg-[#141a2b] shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#331821] flex items-center justify-center text-[#fca5a5]">
              <Shield size={18} />
            </div>
            <h3 className="text-xl font-bold text-white">Security</h3>
          </div>

          {/* 2FA Badge */}
          <div className="w-full bg-[#08221d]/60 border border-[#059669]/30 rounded-xl p-4 flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-[#2dd4bf]" />
              <span className="text-[13px] font-medium text-slate-200">Two-Factor Authentication</span>
            </div>
            <span className="text-[10px] font-bold text-[#2dd4bf] tracking-wider">ACTIVE</span>
          </div>

          {/* Login Activity */}
          <div>
            <h4 className="text-[13px] font-medium text-slate-400 mb-4">Recent Login Activity</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-[12px] text-slate-300">Chrome on MacOS</div>
                <div className="text-[11px] text-slate-500">Today, 10:45 AM</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[12px] text-slate-300">iPhone 15 Pro</div>
                <div className="text-[11px] text-slate-500">Yesterday, 08:22 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
