"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Layers, Trash2, X, ChevronDown, PlusCircle } from "lucide-react";

type Exercise = { id: string; name: string; sets: string; reps: string };
type Phase = { id: string; title: string; color: string; exercises: Exercise[]; num: string };

export default function CreateProtocolPage() {
  const router = useRouter();

  // Metadata State
  const [protocolId, setProtocolId] = useState("LB-001");
  const [protocolName, setProtocolName] = useState("The Lumbar Full Hour Reset");
  const [targetArea, setTargetArea] = useState("Lower Back");
  const [userCase, setUserCase] = useState("Stiff or Tight");
  const [duration, setDuration] = useState("~60 Minutes");

  // Equipment State
  const [equipmentSelected, setEquipmentSelected] = useState("Dumbbell");
  const [equipmentTags, setEquipmentTags] = useState<string[]>(["Bench", "Mini Band", "Mat"]);

  // Phases State
  const [phases, setPhases] = useState<Phase[]>([
    {
      id: "reset",
      title: "RESET PHASE",
      color: "cyan",
      num: "01",
      exercises: [
        { id: "e1", name: "Pelvic Reset", sets: "1", reps: "4-6 breaths" }
      ]
    },
    {
      id: "control",
      title: "CONTROL PHASE",
      color: "emerald",
      num: "02",
      exercises: [
        { id: "e2", name: "Dead Bug", sets: "3", reps: "10" },
        { id: "e3", name: "McGill Curl-Up", sets: "3", reps: "10" },
        { id: "e4", name: "Bird Dog", sets: "3", reps: "10" }
      ]
    },
    {
      id: "integrate",
      title: "INTEGRATE PHASE",
      color: "purple",
      num: "03",
      exercises: [
        { id: "e5", name: "B-Stance Glute Bridge with Band", sets: "3", reps: "10" },
        { id: "e6", name: "Staggered-Stance Romanian Deadlift", sets: "3", reps: "8" },
        { id: "e7", name: "Bulgarian Split Squat (Front Loaded)", sets: "3", reps: "6" },
        { id: "e8", name: "Offset Front Rack Carry", sets: "3", reps: "20" }
      ]
    }
  ]);

  // Handlers
  const handleAddEquipment = () => {
    if (equipmentSelected && !equipmentTags.includes(equipmentSelected)) {
      setEquipmentTags([...equipmentTags, equipmentSelected]);
    }
  };

  const handleRemoveEquipment = (tagToRemove: string) => {
    setEquipmentTags(equipmentTags.filter(tag => tag !== tagToRemove));
  };

  const handleAddExercise = (phaseId: string) => {
    setPhases(phases.map(phase => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          exercises: [
            ...phase.exercises,
            { id: Date.now().toString() + Math.random().toString(), name: "", sets: "", reps: "" }
          ]
        };
      }
      return phase;
    }));
  };

  const handleRemoveExercise = (phaseId: string, exerciseId: string) => {
    setPhases(phases.map(phase => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          exercises: phase.exercises.filter(ex => ex.id !== exerciseId)
        };
      }
      return phase;
    }));
  };

  const handleExerciseChange = (phaseId: string, exerciseId: string, field: keyof Exercise, value: string) => {
    setPhases(phases.map(phase => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          exercises: phase.exercises.map(ex => {
            if (ex.id === exerciseId) {
              return { ...ex, [field]: value };
            }
            return ex;
          })
        };
      }
      return phase;
    }));
  };

  const handlePublish = () => {
    const payload = {
      protocolId,
      protocolName,
      targetArea,
      userCase,
      duration,
      equipmentTags,
      phases
    };
    console.log("Publishing Protocol Payload:", payload);
    alert("Protocol Published Successfully!");
    router.push("/protocol-manager");
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "cyan": return "text-cyan-400 border-cyan-500/50";
      case "emerald": return "text-[#10b981] border-[#10b981]/50";
      case "purple": return "text-[#8b5cf6] border-[#8b5cf6]/50";
      default: return "text-slate-400 border-slate-500/50";
    }
  };

  return (
    <div className="select-none pb-12 relative">
      {/* Top Breadcrumb & Actions */}
      <div className="sticky top-0 z-50 bg-[#02050f]/60 backdrop-blur-xl pt-6 pb-4 mb-2 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 shadow-sm">
        <div>
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
            <Link href="/protocol-manager" className="hover:text-slate-300 transition-colors">PROTOCOL MANAGER</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-cyan-400">CREATE NEW PROTOCOL</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">New Performance Protocol</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-300 bg-transparent border border-slate-700 hover:bg-slate-800 hover:text-white transition-all duration-200 cursor-pointer">
            Save Draft
          </button>
          <button 
            onClick={handlePublish}
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-[#2563eb] hover:bg-[#1d4ed8] shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-200 cursor-pointer"
          >
            Publish Protocol
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-6">
        
        {/* Left Column: Protocol Metadata */}
        <div className="lg:col-span-1 space-y-6 sticky top-32 z-10">
          <div className="glass-card bg-[#1e2330] rounded-2xl p-6 shadow-lg border border-slate-800/40">
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-rose-500/20">
              <Layers size={20} className="text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">PROTOCOL METADATA</h3>
            </div>

            <div className="space-y-6">
              {/* Protocol ID */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">PROTOCOL ID</label>
                <input 
                  type="text" 
                  value={protocolId}
                  onChange={(e) => setProtocolId(e.target.value)}
                  className="w-full bg-[#111621] border-none rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
                />
              </div>

              {/* Protocol Name */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">PROTOCOL NAME</label>
                <input 
                  type="text" 
                  value={protocolName}
                  onChange={(e) => setProtocolName(e.target.value)}
                  className="w-full bg-[#111621] border-none rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
                />
              </div>

              {/* Target Area */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">TARGET AREA</label>
                <div className="relative">
                  <select 
                    value={targetArea}
                    onChange={(e) => setTargetArea(e.target.value)}
                    className="w-full appearance-none bg-[#111621] border-none rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors cursor-pointer"
                  >
                    <option>Lower Back</option>
                    <option>Upper Back</option>
                    <option>Shoulders</option>
                    <option>Hips</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* User Case */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">USER CASE</label>
                <div className="relative">
                  <select 
                    value={userCase}
                    onChange={(e) => setUserCase(e.target.value)}
                    className="w-full appearance-none bg-[#111621] border-none rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors cursor-pointer"
                  >
                    <option>Stiff or Tight</option>
                    <option>Weakness</option>
                    <option>Post-Op Rehab</option>
                    <option>General Maintenance</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Equipment Needed */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">EQUIPMENT NEEDED</label>
                <div className="flex gap-3 mb-4">
                  <div className="relative flex-1">
                    <select 
                      value={equipmentSelected}
                      onChange={(e) => setEquipmentSelected(e.target.value)}
                      className="w-full appearance-none bg-[#111621] border-none rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors cursor-pointer"
                    >
                      <option>Dumbbell</option>
                      <option>Kettlebell</option>
                      <option>Resistance Band</option>
                      <option>Bench</option>
                      <option>Mini Band</option>
                      <option>Mat</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                  </div>
                  <button 
                    onClick={handleAddEquipment}
                    className="flex items-center justify-center gap-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer"
                  >
                    Add <PlusCircle size={16} />
                  </button>
                </div>
                
                {/* Equipment Tags */}
                <div className="flex flex-wrap gap-2.5">
                  {equipmentTags.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 bg-[#34d399] text-slate-900 text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                      {tag} 
                      <button 
                        onClick={() => handleRemoveEquipment(tag)}
                        className="hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">DURATION</label>
                <div className="relative">
                  <select 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full appearance-none bg-[#111621] border-none rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors cursor-pointer"
                  >
                    <option>~60 Minutes</option>
                    <option>~45 Minutes</option>
                    <option>~30 Minutes</option>
                    <option>~15 Minutes</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Phase-Based Session Builder */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card bg-[#1e2330] rounded-2xl p-6 shadow-lg border border-slate-800/40 min-h-[800px]">
            <div className="flex items-center gap-2 mb-8 pb-4 border-b border-[#0d9488]/50">
              <Layers size={20} className="text-cyan-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-widest">PHASE-BASED SESSION BUILDER</h3>
            </div>

            <div className="space-y-10">
              
              {phases.map((phase, idx) => (
                <div key={phase.id} className={`space-y-4 ${idx > 0 ? 'pt-6 border-none' : ''}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-extrabold bg-[#0b1121] ${getColorClasses(phase.color)}`}>
                      {phase.num}
                    </span>
                    <h4 className={`text-[11px] font-bold uppercase tracking-widest ${getColorClasses(phase.color).split(' ')[0]}`}>
                      {phase.title}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {phase.exercises.map((exercise) => (
                      <div key={exercise.id}>
                        <div className="grid grid-cols-[1fr_80px_100px_40px] gap-4 items-end text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                          <label>EXERCISE NAME</label>
                          <label className="text-center">SETS</label>
                          <label className="text-center">REPS</label>
                          <span></span>
                        </div>
                        <div className="grid grid-cols-[1fr_80px_100px_40px] gap-4 items-center">
                          <input 
                            type="text" 
                            value={exercise.name} 
                            onChange={(e) => handleExerciseChange(phase.id, exercise.id, 'name', e.target.value)}
                            placeholder="e.g. Dead Bug"
                            className="w-full bg-[#111621] border-none rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50" 
                          />
                          <input 
                            type="text" 
                            value={exercise.sets} 
                            onChange={(e) => handleExerciseChange(phase.id, exercise.id, 'sets', e.target.value)}
                            placeholder="3"
                            className="w-full bg-[#111621] border-none rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none text-center focus:ring-1 focus:ring-blue-500/50" 
                          />
                          <input 
                            type="text" 
                            value={exercise.reps} 
                            onChange={(e) => handleExerciseChange(phase.id, exercise.id, 'reps', e.target.value)}
                            placeholder="10"
                            className="w-full bg-[#111621] border-none rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none text-center focus:ring-1 focus:ring-blue-500/50" 
                          />
                          <button 
                            onClick={() => handleRemoveExercise(phase.id, exercise.id)}
                            className="text-rose-700 hover:text-rose-500 transition-colors flex justify-center cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end mt-4">
                    <button 
                      onClick={() => handleAddExercise(phase.id)}
                      className="flex items-center gap-2 bg-[#0b1121] border border-blue-500/50 hover:bg-blue-500/10 text-blue-500 px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow-[0_0_15px_rgba(59,130,246,0.2)] cursor-pointer"
                    >
                      Add New Exercise <PlusCircle size={16} />
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
