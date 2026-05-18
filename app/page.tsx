"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@bodyaxis.com");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Dynamic high-fidelity auth transition delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full flex-1 bg-[#02050f] overflow-hidden flex items-center justify-center select-none font-sans">
      
      {/* Immersive Plexus Background Image Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/login-bg.png"
          alt="Login Background Plexus"
          fill
          priority
          className="object-cover opacity-[0.85] select-none pointer-events-none"
        />
        {/* Subtle vignette highlight to enhance content readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02050f] via-transparent to-[#02050f]/70" />
      </div>

      {/* Main Container Card Box */}
      <div className="relative z-10 max-w-4xl w-full mx-4 rounded-[28px] border border-blue-500/20 bg-[#060b18]/80 backdrop-blur-2xl shadow-[0_0_80px_rgba(37,99,235,0.12)] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">
        
        {/* Left Side Column - Soft Glowing Logo */}
        <div className="flex-1 flex flex-col items-center justify-center py-6 md:py-0 select-none">
          <div className="relative group flex flex-col items-center gap-1">
            {/* Soft backdrop logo glow shadow */}
            <div className="absolute inset-0 bg-blue-500/15 rounded-full blur-[40px] opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            
            <Image 
              src="/logo.png" 
              alt="Body Axis Logo" 
              width={260} 
              height={90}
              priority
              className="relative z-10 w-64 md:w-72 object-contain select-none filter drop-shadow-[0_0_15px_rgba(59,130,246,0.25)] group-hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-500"
            />
          </div>
        </div>

        {/* Right Side Column - Secure Authentication Form */}
        <div className="w-full md:w-[410px] bg-[#0b101f]/95 border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-[0_0_35px_rgba(37,99,235,0.15)] relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-teal-400 to-indigo-500" />
          
          <div className="mb-8">
            <h3 className="text-xl md:text-[22px] font-extrabold text-white tracking-tight leading-none mb-2">Secure Authentication</h3>
            <p className="text-slate-400 text-xs leading-normal font-medium pr-1">Enter your administrative credentials to access the axis control center.</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            {/* ADMIN EMAIL INPUT */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">Admin Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                placeholder="admin@bodyaxis.com"
                className="w-full bg-[#070b14] border border-slate-800/80 rounded-xl py-3 px-4 text-[13px] text-slate-200 font-semibold focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/20 transition-all disabled:opacity-50"
              />
            </div>

            {/* PASSWORD INPUT */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  placeholder="••••••••"
                  className="w-full bg-[#070b14] border border-slate-800/80 rounded-xl py-3 pl-4 pr-11 text-[13px] text-slate-200 font-semibold focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/20 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* FORGOT PASSWORD LINK */}
            <div className="flex justify-end pt-1">
              <span className="text-[#2dd4bf] hover:text-[#14b8a6] hover:underline text-[11px] font-bold transition-colors cursor-pointer">
                Forgot Password?
              </span>
            </div>

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl py-3 px-4 font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.55)] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-6 active:scale-[0.98] disabled:opacity-80"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
