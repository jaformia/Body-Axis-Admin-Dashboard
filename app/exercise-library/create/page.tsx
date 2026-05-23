"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, ChevronDown, PlusCircle, X, UploadCloud } from "lucide-react";

export default function AddExercisePage() {
  const router = useRouter();

  const [exerciseId, setExerciseId] = useState("EX-260009");
  const [exerciseName, setExerciseName] = useState("Quadruped Thoracic Rotation");
  const [sets, setSets] = useState("3");
  const [reps, setReps] = useState("8 / side");
  const [primaryIntent, setPrimaryIntent] = useState("Restore thoracic rotation");
  const [secondaryBenefits, setSecondaryBenefits] = useState("Reduce lumbar compensation");
  const [progression, setProgression] = useState("Add load");
  const [regression, setRegression] = useState("Reduce range");
  const [benefits, setBenefits] = useState("Gets your mid-back rotating the way it should, so your lower back and neck don't have\nto do the twisting for it.");

  const [equipment, setEquipment] = useState("None");
  const [equipmentTags, setEquipmentTags] = useState<string[]>([]);

  const [phase, setPhase] = useState("Control");
  const [phaseTags, setPhaseTags] = useState<string[]>(["Control"]);

  const [targetArea, setTargetArea] = useState("Lower Back");
  const [targetAreaTags, setTargetAreaTags] = useState<string[]>(["Shoulder", "Neck", "Upper Back", "Middle Back"]);

  const [userCase, setUserCase] = useState("Just Want to Move Better");
  const [userCaseTags, setUserCaseTags] = useState<string[]>(["Feels Weak or Unstable", "Stiff or Tight"]);

  const handleAddTag = (val: string, list: string[], setList: (l: string[]) => void) => {
    if (val && !list.includes(val)) {
      setList([...list, val]);
    }
  };

  const handleRemoveTag = (val: string, list: string[], setList: (l: string[]) => void) => {
    setList(list.filter(t => t !== val));
  };

  const handlePublish = () => {
    alert("Exercise Published Successfully!");
    router.push("/exercise-library");
  };

  return (
    <div className="select-none pb-12 relative -mt-8">

      {/* Header */}
      <div className="sticky -top-8 z-50 bg-[#02050f]/95 backdrop-blur-xl -mx-8 px-8 pt-8 pb-4 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/60 shadow-sm">
        <div>
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-1">
            <Link href="/exercise-library" className="hover:text-slate-300 transition-colors">EXERCISE LIBRARY</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-cyan-400">ADD NEW EXERCISE</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">Add New Exercise</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-300 bg-transparent border border-slate-700 hover:bg-slate-800 hover:text-white transition-all duration-200 cursor-pointer">
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-[#2563eb] hover:bg-[#1d4ed8] shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-200 cursor-pointer"
          >
            Publish Exercise
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="mt-6">
        <div className="glass-card bg-[#1e2330] rounded-2xl p-6 lg:p-8 shadow-lg border border-slate-800/40">

          <div className="flex items-center gap-2 mb-8 pb-4 border-b border-[#0d9488]/30">
            <FileText size={20} className="text-cyan-400" />
            <h3 className="text-[11px] font-extrabold text-slate-300 uppercase tracking-widest">EXERCISE METADATA</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

            {/* EXERCISE ID */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">EXERCISE ID</label>
              <input
                type="text"
                value={exerciseId}
                onChange={(e) => setExerciseId(e.target.value)}
                className="w-full bg-[#111621] border-none rounded-xl px-4 py-3.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
              />
            </div>

            {/* EXERCISE NAME */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">EXERCISE NAME</label>
              <input
                type="text"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                className="w-full bg-[#111621] border-none rounded-xl px-4 py-3.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
              />
            </div>

            {/* SETS */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">SETS</label>
              <input
                type="text"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="w-full bg-[#111621] border-none rounded-xl px-4 py-3.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
              />
            </div>

            {/* REPS */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">REPS</label>
              <input
                type="text"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full bg-[#111621] border-none rounded-xl px-4 py-3.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
              />
            </div>

            {/* PRIMARY INTENT */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">PRIMARY INTENT</label>
              <input
                type="text"
                value={primaryIntent}
                onChange={(e) => setPrimaryIntent(e.target.value)}
                className="w-full bg-[#111621] border-none rounded-xl px-4 py-3.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
              />
            </div>

            {/* SECONDARY BENEFITS */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">SECONDARY BENEFITS</label>
              <input
                type="text"
                value={secondaryBenefits}
                onChange={(e) => setSecondaryBenefits(e.target.value)}
                className="w-full bg-[#111621] border-none rounded-xl px-4 py-3.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
              />
            </div>

            {/* PROGRESSION */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">PROGRESSION</label>
              <input
                type="text"
                value={progression}
                onChange={(e) => setProgression(e.target.value)}
                className="w-full bg-[#111621] border-none rounded-xl px-4 py-3.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
              />
            </div>

            {/* REGRESSION */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">REGRESSION</label>
              <input
                type="text"
                value={regression}
                onChange={(e) => setRegression(e.target.value)}
                className="w-full bg-[#111621] border-none rounded-xl px-4 py-3.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
              />
            </div>

            {/* EQUIPMENT NEEDED */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">EQUIPMENT NEEDED</label>
              <div className="flex gap-3 mb-3">
                <div className="relative flex-1">
                  <select
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    className="w-full appearance-none bg-[#111621] border-none rounded-xl px-4 py-3.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors cursor-pointer"
                  >
                    <option>None</option>
                    <option>Dumbbell</option>
                    <option>Mat</option>
                    <option>Bench</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
                <button
                  onClick={() => handleAddTag(equipment, equipmentTags, setEquipmentTags)}
                  className="flex items-center justify-center gap-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer"
                >
                  Add <PlusCircle size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {equipmentTags.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 bg-[#34d399] text-slate-900 text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-sm">
                    {tag} <button onClick={() => handleRemoveTag(tag, equipmentTags, setEquipmentTags)} className="hover:text-slate-700 transition-colors cursor-pointer"><X size={14} /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* PHASE */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">PHASE</label>
              <div className="flex gap-3 mb-3">
                <div className="relative flex-1">
                  <select
                    value={phase}
                    onChange={(e) => setPhase(e.target.value)}
                    className="w-full appearance-none bg-[#111621] border-none rounded-xl px-4 py-3.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors cursor-pointer"
                  >
                    <option>Reset</option>
                    <option>Control</option>
                    <option>Integrate</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
                <button
                  onClick={() => handleAddTag(phase, phaseTags, setPhaseTags)}
                  className="flex items-center justify-center gap-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer"
                >
                  Add <PlusCircle size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {phaseTags.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 bg-[#34d399] text-slate-900 text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-sm">
                    {tag} <button onClick={() => handleRemoveTag(tag, phaseTags, setPhaseTags)} className="hover:text-slate-700 transition-colors cursor-pointer"><X size={14} /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* TARGET AREA */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">TARGET AREA</label>
              <div className="flex gap-3 mb-3">
                <div className="relative flex-1">
                  <select
                    value={targetArea}
                    onChange={(e) => setTargetArea(e.target.value)}
                    className="w-full appearance-none bg-[#111621] border-none rounded-xl px-4 py-3.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors cursor-pointer"
                  >
                    <option>Lower Back</option>
                    <option>Shoulder</option>
                    <option>Neck</option>
                    <option>Upper Back</option>
                    <option>Middle Back</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
                <button
                  onClick={() => handleAddTag(targetArea, targetAreaTags, setTargetAreaTags)}
                  className="flex items-center justify-center gap-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer"
                >
                  Add <PlusCircle size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {targetAreaTags.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 bg-[#34d399] text-slate-900 text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-sm">
                    {tag} <button onClick={() => handleRemoveTag(tag, targetAreaTags, setTargetAreaTags)} className="hover:text-slate-700 transition-colors cursor-pointer"><X size={14} /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* USER CASE */}
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">USER CASE</label>
              <div className="flex gap-3 mb-3">
                <div className="relative flex-1">
                  <select
                    value={userCase}
                    onChange={(e) => setUserCase(e.target.value)}
                    className="w-full appearance-none bg-[#111621] border-none rounded-xl px-4 py-3.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors cursor-pointer"
                  >
                    <option>Just Want to Move Better</option>
                    <option>Feels Weak or Unstable</option>
                    <option>Stiff or Tight</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
                <button
                  onClick={() => handleAddTag(userCase, userCaseTags, setUserCaseTags)}
                  className="flex items-center justify-center gap-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)] cursor-pointer"
                >
                  Add <PlusCircle size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {userCaseTags.map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 bg-[#34d399] text-slate-900 text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-sm">
                    {tag} <button onClick={() => handleRemoveTag(tag, userCaseTags, setUserCaseTags)} className="hover:text-slate-700 transition-colors cursor-pointer"><X size={14} /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* VIDEO TUTORIAL */}
            <div className="flex flex-col h-full">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">VIDEO TUTORIAL</label>
              <div className="flex-1 min-h-[140px] border-2 border-dashed border-slate-700 hover:border-slate-500 bg-[#151a26]/50 hover:bg-[#151a26] rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all">
                <UploadCloud size={24} className="text-slate-500" />
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">UPLOAD VIDEO</span>
              </div>
            </div>

            {/* BENEFITS */}
            <div className="flex flex-col h-full">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">BENEFITS</label>
              <textarea
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                className="flex-1 min-h-[140px] w-full bg-[#111621] border-none rounded-xl p-4 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors resize-none leading-relaxed"
              ></textarea>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
