"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { Bell } from "lucide-react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden z-10 relative">
        {/* Top Bar Header */}
        <header className="h-20 border-b border-slate-800/40 bg-[#02050f]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex-1"></div>

          {/* Top Bar Actions on the Right */}
          <div className="flex items-center gap-5">
            {/* Notification Bell */}
            <button className="text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer">
              <Bell size={18} />
            </button>

            {/* Vertical Separator */}
            <div className="h-6 w-[1px] bg-slate-800" />

            {/* Profile Block */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-semibold text-white tracking-wide">Alex Sterling</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">ADMIN</p>
              </div>
              <div className="w-9 h-9 rounded-full border border-slate-700 bg-slate-850 overflow-hidden flex items-center justify-center">
                <Image
                  src="/user.png"
                  alt="Alex Sterling"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Children Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </>
  );
}
