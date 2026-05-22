"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { Bell, Settings, LogOut, CheckCircle2, AlertTriangle, Info, X, Sparkles } from "lucide-react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/";
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dynamic notifications state with localStorage synchronization
  interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    type: "success" | "info" | "warning" | "system";
    read: boolean;
  }

  interface Toast {
    id: string;
    title: string;
    message: string;
    type: "success" | "info" | "warning" | "system";
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [animateBell, setAnimateBell] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const addNotification = (title: string, message: string, type: "success" | "info" | "warning" | "system") => {
    const newNotif: Notification = {
      id: Date.now(),
      title,
      message,
      time: "Just now",
      type,
      read: false
    };

    setNotifications(prev => {
      const updated = [newNotif, ...prev];
      try {
        localStorage.setItem("bodyaxis_notifications", JSON.stringify(updated));
      } catch (err) {
        console.error("Storage write error", err);
      }
      return updated;
    });

    // Ring the bell
    setAnimateBell(true);
    setTimeout(() => setAnimateBell(false), 850);

    // Trigger toast toast alert
    const toastId = Date.now().toString();
    const newToast: Toast = {
      id: toastId,
      title,
      message,
      type
    };
    setToasts(prev => [...prev, newToast]);

    // Auto-dismiss toast
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 5000);
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      try {
        localStorage.setItem("bodyaxis_notifications", JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const toggleReadNotification = (id: number) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: !n.read } : n);
      try {
        localStorage.setItem("bodyaxis_notifications", JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const deleteNotification = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering click on notification item
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      try {
        localStorage.setItem("bodyaxis_notifications", JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    try {
      localStorage.setItem("bodyaxis_notifications", JSON.stringify([]));
    } catch (err) {
      console.error(err);
    }
  };

  // Activity Simulator List
  const SIMULATED_ALERTS = [
    {
      title: "New Pro Subscriber Joined",
      message: "Elena Rossi joined the Premium Axis Plan.",
      type: "info"
    },
    {
      title: "Server Performance Peak",
      message: "Database optimization completed in 120ms.",
      type: "success"
    },
    {
      title: "Suspicious Login Alert",
      message: "Admin dashboard access requested from IP 192.168.1.108.",
      type: "warning"
    },
    {
      title: "System Update Complete",
      message: "Dashboard core packages successfully updated to v1.2.8.",
      type: "system"
    },
    {
      title: "New Protocol Assigned",
      message: "The Lumbar Deep Reset has been assigned to 12 patients.",
      type: "success"
    }
  ];

  const triggerSimulatedAlert = () => {
    const alertData = SIMULATED_ALERTS[Math.floor(Math.random() * SIMULATED_ALERTS.length)];
    addNotification(alertData.title, alertData.message, alertData.type as any);
  };

  useEffect(() => {
    // Initial load from storage
    try {
      const stored = localStorage.getItem("bodyaxis_notifications");
      if (stored) {
        setNotifications(JSON.parse(stored));
      } else {
        const defaultNotifs: Notification[] = [
          {
            id: 1,
            title: "New Video Catalog Uploaded",
            message: "Supine Pelvic Clocks has been successfully indexed.",
            time: "5m ago",
            type: "success",
            read: false
          },
          {
            id: 2,
            title: "New Pro Subscriber Joined",
            message: "Elena Rossi joined the Premium Axis Plan.",
            time: "15m ago",
            type: "info",
            read: false
          },
          {
            id: 3,
            title: "System Maintenance Alert",
            message: "Monthly cloud data backup has been completed.",
            time: "2h ago",
            type: "system",
            read: true
          }
        ];
        setNotifications(defaultNotifs);
        localStorage.setItem("bodyaxis_notifications", JSON.stringify(defaultNotifs));
      }
    } catch (e) {
      console.error(e);
    }

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    // Register dynamic notifications handler
    const handleNewNotification = (e: Event) => {
      const customEvent = e as CustomEvent<{ title: string; message: string; type: "success" | "info" | "warning" | "system" }>;
      if (customEvent.detail) {
        const { title, message, type } = customEvent.detail;
        addNotification(title, message, type);
      }
    };

    window.addEventListener("add-notification", handleNewNotification);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("add-notification", handleNewNotification);
    };
  }, []);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const unreadCount = notifications.filter(n => !n.read).length;

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
            {/* Notification Bell with Dropdown */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowDropdown(false); // Close profile dropdown if open
                }}
                className="text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer relative p-1.5 rounded-lg hover:bg-slate-800/40 flex items-center justify-center focus:outline-none"
              >
                <Bell 
                  size={18} 
                  className={`${animateBell ? "animate-bell-ring text-blue-400" : ""} ${unreadCount > 0 && !animateBell ? "text-slate-200" : "text-slate-400"} hover:text-white transition-colors duration-200`} 
                />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border border-[#02050f] shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse" />
                )}
              </button>

              {/* Notification Dropdown Menu */}
              {showNotifications && (
                <div className="absolute top-12 right-0 w-80 bg-[#0c101c] border border-slate-800/80 rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.7)] z-50 animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col gap-3">
                  {/* Dropdown Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-white uppercase tracking-wider">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                          {unreadCount} New
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-[10px] font-bold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
                        >
                          Mark all
                        </button>
                      )}
                      {notifications.length > 0 && (
                        <>
                          <span className="text-slate-600 text-[10px]">•</span>
                          <button 
                            onClick={clearAllNotifications}
                            className="text-[10px] font-bold text-rose-400 hover:text-rose-300 hover:underline cursor-pointer"
                          >
                            Clear all
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Notification List */}
                  <div className="flex flex-col gap-2.5 max-h-64 overflow-y-auto pr-1">
                    {notifications.length > 0 ? (
                      notifications.map((n) => {
                        // Determine notification icon and styling
                        let ItemIcon = Info;
                        let iconColor = "text-blue-400";
                        let bgTypeColor = "bg-blue-500/10";
                        
                        if (n.type === "success") {
                          ItemIcon = CheckCircle2;
                          iconColor = "text-emerald-400";
                          bgTypeColor = "bg-emerald-500/10";
                        } else if (n.type === "warning") {
                          ItemIcon = AlertTriangle;
                          iconColor = "text-amber-400";
                          bgTypeColor = "bg-amber-500/10";
                        } else if (n.type === "system") {
                          ItemIcon = Settings;
                          iconColor = "text-purple-400";
                          bgTypeColor = "bg-purple-500/10";
                        }

                        return (
                          <div 
                            key={n.id} 
                            onClick={() => toggleReadNotification(n.id)}
                            className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex gap-3 relative group ${
                              n.read 
                                ? "bg-slate-900/20 border-slate-900/60 hover:bg-slate-900/40" 
                                : "bg-blue-500/[0.02] border-blue-500/10 hover:bg-blue-500/[0.05] shadow-sm"
                            }`}
                          >
                            {/* Unread indicator bar */}
                            {!n.read && (
                              <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-blue-500 rounded-r-md" />
                            )}

                            {/* Type Icon Circle */}
                            <div className={`w-8 h-8 rounded-lg ${bgTypeColor} flex items-center justify-center shrink-0 border border-white/5`}>
                              <ItemIcon size={14} className={iconColor} />
                            </div>
                            
                            <div className="flex-1 flex flex-col gap-0.5 min-w-0 pr-4">
                              <div className="flex justify-between items-start gap-2">
                                <span className={`text-xs font-bold truncate ${n.read ? "text-slate-300" : "text-white"}`}>
                                  {n.title}
                                </span>
                                <span className="text-[9px] font-bold text-slate-500 tracking-wide uppercase whitespace-nowrap pt-0.5 shrink-0">
                                  {n.time}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-semibold leading-normal pr-1">
                                {n.message}
                              </p>
                            </div>

                            {/* Delete Item Button */}
                            <button
                              onClick={(e) => deleteNotification(n.id, e)}
                              className="absolute top-2.5 right-2.5 text-slate-600 hover:text-rose-400 p-1 rounded hover:bg-rose-500/5 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
                              title="Delete notification"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center flex flex-col items-center justify-center gap-1">
                        <span className="text-slate-600 text-xs font-bold uppercase tracking-widest">No Notifications</span>
                        <p className="text-[10px] text-slate-500">Everything is up to date.</p>
                      </div>
                    )}
                  </div>

                  {/* Simulator footer */}
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                    <button
                      onClick={triggerSimulatedAlert}
                      className="text-[9px] font-bold text-blue-400 hover:text-white bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/30 px-2 py-1 rounded transition-all duration-200 cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles size={8} className="animate-pulse" />
                      <span>Simulate Activity</span>
                    </button>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider">Body Axis™</span>
                  </div>
                </div>
              )}
            </div>

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

      {/* Glassmorphic Toast Notification Overlay Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map(toast => {
          let borderColor = "border-blue-500/30";
          let glowColor = "shadow-[0_0_20px_rgba(59,130,246,0.15)]";
          let progressBg = "bg-blue-500";
          let Icon = Info;
          
          if (toast.type === "success") {
            borderColor = "border-emerald-500/30";
            glowColor = "shadow-[0_0_20px_rgba(16,185,129,0.15)]";
            progressBg = "bg-emerald-500";
            Icon = CheckCircle2;
          } else if (toast.type === "warning") {
            borderColor = "border-amber-500/30";
            glowColor = "shadow-[0_0_20px_rgba(245,158,11,0.15)]";
            progressBg = "bg-amber-500";
            Icon = AlertTriangle;
          } else if (toast.type === "system") {
            borderColor = "border-purple-500/30";
            glowColor = "shadow-[0_0_20px_rgba(168,85,247,0.15)]";
            progressBg = "bg-purple-500";
            Icon = Settings;
          }
          
          return (
            <div 
              key={toast.id}
              className={`pointer-events-auto bg-[#070b19]/90 backdrop-blur-md border ${borderColor} rounded-xl p-4 flex gap-3 relative overflow-hidden animate-toast-in ${glowColor}`}
            >
              <div className="flex-shrink-0 mt-0.5">
                <Icon size={18} className={toast.type === "success" ? "text-emerald-400" : toast.type === "warning" ? "text-amber-400" : toast.type === "system" ? "text-purple-400" : "text-blue-400"} />
              </div>
              <div className="flex-1 pr-4">
                <h4 className="text-xs font-bold text-white leading-tight">{toast.title}</h4>
                <p className="text-[10px] text-slate-400 font-semibold leading-normal mt-1">{toast.message}</p>
              </div>
              <button 
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="text-slate-500 hover:text-white p-0.5 rounded transition-colors shrink-0 absolute top-3 right-3 cursor-pointer"
              >
                <X size={14} />
              </button>
              
              {/* Progress Bar Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-800">
                <div className={`h-full ${progressBg} animate-toast-progress`} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
