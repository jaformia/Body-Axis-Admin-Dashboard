import { Plus, Search, MoreVertical } from "lucide-react";

export default function UsersManagementPage() {
  const users = [
    { name: "Sophia Loren", email: "sophia@loren.com", role: "Patient", joined: "Oct 15, 2026", status: "Active" },
    { name: "Dr. Ryan Bennett", email: "ryan@bodyaxis.com", role: "Therapist", joined: "Mar 12, 2025", status: "Active" },
    { name: "Marcus Aurelius", email: "marcus@rome.gov", role: "Patient", joined: "Oct 01, 2026", status: "Inactive" },
    { name: "Elena Rostova", email: "elena@rostov.ru", role: "Patient", joined: "Sep 24, 2026", status: "Active" },
    { name: "Prof. Sarah Miller", email: "sarah.m@bodyaxis.com", role: "Admin", joined: "Jan 10, 2025", status: "Active" }
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">Users Management</h2>
          <p className="text-slate-400 text-sm mt-1">Administer medical practitioners, patients, and operational access.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-200 cursor-pointer">
          <Plus size={16} />
          <span>Add New User</span>
        </button>
      </div>

      {/* Stats Counter Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Users</span>
          <span className="text-2xl font-bold text-white font-display mt-1 block">14,285</span>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Registered Practitioners</span>
          <span className="text-2xl font-bold text-white font-display mt-1 block">38 Clinicians</span>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">System Administrators</span>
          <span className="text-2xl font-bold text-white font-display mt-1 block">4 Admins</span>
        </div>
      </div>

      {/* Main Roster Card */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-white font-bold font-display text-base">User Operations Center</h3>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input 
              type="text" 
              placeholder="Search by name, role, email..." 
              className="w-full bg-slate-950 border border-slate-850 rounded-xl py-1.5 pl-9 pr-4 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800/50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Practitioner/User</th>
                <th className="pb-3">Email Address</th>
                <th className="pb-3">Security Role</th>
                <th className="pb-3">Joined Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {users.map((user, idx) => (
                <tr key={idx} className="text-slate-300 group hover:bg-slate-900/10 transition-colors duration-200">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-850 to-slate-900 border border-slate-800 flex items-center justify-center font-bold text-[11px] text-blue-400 group-hover:border-blue-500/30">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-slate-400">{user.email}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-0.5 rounded border text-[9px] font-extrabold uppercase tracking-wide ${
                      user.role === "Admin" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                      user.role === "Therapist" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                      "bg-slate-500/10 text-slate-400 border-slate-800"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 text-slate-500 font-medium">{user.joined}</td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      user.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-800 text-slate-500 border border-slate-850"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-slate-500 hover:text-white p-1 hover:bg-slate-800/40 rounded transition-colors duration-200 cursor-pointer">
                      <MoreVertical size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
