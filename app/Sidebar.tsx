"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Dumbbell,
  Video,
  Users,
  CreditCard,
  Settings
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Protocol Manager", href: "/protocol-manager", icon: ClipboardList },
    { name: "Exercise Library", href: "/exercise-library", icon: Dumbbell },
    { name: "Video Manager", href: "/video-manager", icon: Video },
    { name: "Users Management", href: "/users-management", icon: Users },
    { name: "Subscription", href: "/subscription", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-72 bg-[#02050f] border-r border-slate-900/60 h-screen sticky top-0 flex flex-col p-6 z-50 select-none">
      {/* Brand logo */}
      <div className="mb-8 px-2 flex items-center justify-start">
        <Image 
          src="/logo.png" 
          alt="Body Axis Logo" 
          width={150}
          height={56}
          className="h-14 object-contain w-auto select-none" 
        />
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 space-y-1.5 pr-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`) || (item.href === "/dashboard" && pathname === "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 h-12 rounded-[16px] transition-all duration-200 group border ${
                isActive
                  ? "bg-[#132247] text-[#2563eb] font-semibold border-transparent shadow-[4px_0_0_0_#2563eb]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border-transparent"
              }`}
            >
              <Icon
                size={18}
                className={`transition-colors duration-200 ${
                  isActive
                    ? "text-[#2563eb]"
                    : "text-slate-500 group-hover:text-slate-300"
                }`}
              />
              <span className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
                isActive ? "text-[#2563eb]" : "text-slate-400 group-hover:text-slate-200"
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
