"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { Bell, Settings, LogOut } from "lucide-react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/";
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

            {/* Profile Block with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity focus:outline-none"
              >
                <div className="text-right">
                  <p className="text-xs font-semibold text-white tracking-wide group-hover:text-blue-400 transition-colors">Alex Sterling</p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">ADMIN</p>
                </div>
                <div className="w-9 h-9 rounded-full border border-slate-700 bg-slate-850 overflow-hidden flex items-center justify-center group-hover:border-blue-500/80 transition-colors">
                  <Image
                    src="/user.png"
                    alt="Alex Sterling"
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>

              {/* Dynamic Dropdown Menu */}
              {showDropdown && (
                <div className="absolute top-12 right-0 w-44 bg-[#0c101c] border border-slate-800/80 rounded-xl p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Settings Option */}
                  <button 
                    onClick={() => {
                      setShowDropdown(false);
                      router.push("/settings");
                    }}
                    className="flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 cursor-pointer font-semibold"
                  >
                    <Settings size={14} className="text-slate-400" />
                    <span>Settings</span>
                  </button>

                  {/* Divider */}
                  <div className="h-[1px] bg-slate-800/60 my-1 mx-2" />

                  {/* Logout Option */}
                  <button 
                    onClick={() => {
                      setShowDropdown(false);
                      router.push("/");
                    }}
                    className="flex items-center gap-2.5 w-full text-left px-3.5 py-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-all duration-200 cursor-pointer font-semibold"
                  >
                    <LogOut size={14} className="text-rose-400" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
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
