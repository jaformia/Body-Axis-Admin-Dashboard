import { CreditCard, Check, Sparkles, TrendingUp, HelpCircle } from "lucide-react";

export default function SubscriptionPage() {
  const plans = [
    { name: "Standard Core", price: "$49", period: "/mo", users: "4,102 active", description: "Essential tools for personal clinics and independent trainers.", features: ["Up to 15 Active Protocols", "Basic Video Catalog access", "1 Therapist Seat", "Email Support"], isPopular: false },
    { name: "Clinical Pro", price: "$99", period: "/mo", users: "8,912 active", description: "Advanced biometric features for professional practices and gyms.", features: ["Unlimited Active Protocols", "High-Definition 4K Library", "Up to 5 Therapist Seats", "Priority Live Chat Support", "Dynamic Webhook Integrations"], isPopular: true },
    { name: "Enterprise Center", price: "$299", period: "/mo", users: "1,271 active", description: "Custom security and scaling options for medical hospital networks.", features: ["Multi-Tenant Support", "Unlimited Everything", "SSO & SAML Security", "24/7 Phone SLA Support", "Dedicated Success Manager"], isPopular: false }
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">Subscription &amp; Billing</h2>
          <p className="text-slate-400 text-sm mt-1">Manage licensing packages, billing schedules, and system MRR.</p>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Monthly Recurring Revenue</span>
          <div className="flex items-baseline justify-between mt-1">
            <span className="text-2xl font-bold text-white font-display">$128,450</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-0.5">
              <TrendingUp size={10} />
              <span>+18.4%</span>
            </span>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Average Revenue Per Seat</span>
          <span className="text-2xl font-bold text-white font-display mt-1 block">$84.20</span>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Billing Accuracy</span>
            <span className="text-2xl font-bold text-white font-display mt-1 block">99.9%</span>
          </div>
          <div className="p-3 bg-blue-600/10 rounded-xl text-blue-400 border border-blue-500/20">
            <CreditCard size={18} />
          </div>
        </div>
      </div>

      {/* Pricing Tiers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div 
            key={idx} 
            className={`glass-card rounded-3xl p-6 border relative flex flex-col justify-between overflow-hidden ${
              plan.isPopular 
                ? "border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.1)] bg-[#070b1e]/65" 
                : "border-slate-800/80"
            }`}
          >
            {/* Ambient subtle glow for popular plans */}
            {plan.isPopular && (
              <span className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none" />
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-extrabold text-white tracking-wide uppercase font-display">{plan.name}</span>
                {plan.isPopular && (
                  <span className="flex items-center gap-1 text-[9px] font-extrabold text-blue-400 bg-blue-500/15 px-2 py-0.5 rounded-full border border-blue-500/25 uppercase tracking-wider">
                    <Sparkles size={8} />
                    <span>Popular</span>
                  </span>
                )}
              </div>

              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-extrabold text-white font-display">{plan.price}</span>
                <span className="text-slate-500 text-xs font-semibold">{plan.period}</span>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed mb-6">{plan.description}</p>
              
              <div className="border-t border-slate-800/60 pt-6 mb-6">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Key Inclusions:</p>
                <ul className="space-y-3">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <Check size={12} className="text-blue-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <button 
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                  plan.isPopular 
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                    : "bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
                }`}
              >
                Change Subscription Plan
              </button>
              <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-slate-500 font-bold">
                <HelpCircle size={10} />
                <span>{plan.users}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
