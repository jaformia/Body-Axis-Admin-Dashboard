"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, UploadCloud, FileVideo, CheckCircle2, 
  AlertCircle, Sparkles, ChevronDown, Trash2, X, Plus
} from "lucide-react";

export default function UploadVideoPage() {
  const router = useRouter();
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  
  // Form fields state
  const [exerciseId, setExerciseId] = useState("EX-260003");
  const [exerciseName, setExerciseName] = useState("");
  const [targetArea, setTargetArea] = useState("Lower Back");
  const [fileSize, setFileSize] = useState("");
  const [cues, setCues] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  // Auto scroll top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simulate file upload progress
  useEffect(() => {
    if (uploadStatus === "uploading") {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploadStatus("success");
            return 100;
          }
          return prev + Math.floor(Math.random() * 8) + 4; // realistic steps
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [uploadStatus]);

  // Handle Drag Over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  // Handle Drag Leave
  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Handle File Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("video/")) {
        processFile(file);
      } else {
        alert("Please upload a valid video file.");
      }
    }
  };

  // Handle File Input Change
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  // Process File and calculate size
  const processFile = (file: File) => {
    setSelectedFile(file);
    // Convert to readable size
    const mbSize = (file.size / (1024 * 1024)).toFixed(1);
    setFileSize(`${mbSize} MB`);
    
    // Automatically set exercise name from filename if empty
    if (!exerciseName) {
      const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      // Convert hyphens/underscores to spaces and capitalize
      const formattedName = nameWithoutExt
        .replace(/[-_]/g, " ")
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setExerciseName(formattedName);
    }
    
    setUploadStatus("uploading");
  };

  // Reset uploader
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadStatus("idle");
    setUploadProgress(0);
    setFileSize("");
  };

  // Simulate publish submit
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !exerciseName || uploadStatus !== "success") return;
    
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      router.push("/video-manager");
    }, 1500);
  };

  return (
    <div className="space-y-6 select-none pb-12 relative">
      {/* Top Navigation Row */}
      <div className="flex items-center gap-3">
        <Link 
          href="/video-manager"
          className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-800/80 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
        </Link>
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 tracking-wider uppercase">
          <Link href="/video-manager" className="hover:text-blue-400 transition-colors">Video Manager</Link>
          <span>&gt;</span>
          <span className="text-slate-300">Upload New Video</span>
        </div>
      </div>

      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[28px] font-extrabold text-white tracking-tight font-display leading-tight flex items-center gap-2">
            <span>Upload Video Asset</span>
            <Sparkles size={20} className="text-cyan-400 animate-pulse" />
          </h2>
          <p className="text-slate-400 text-sm mt-1">Configure and index biomechanical video assets for performance protocols.</p>
        </div>
      </div>

      {/* Main Grid Content */}
      <form onSubmit={handlePublish} className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start mt-6">
        
        {/* Left Column: Video Uploader (3 Cols Span) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-card bg-[#1e2330] rounded-2xl p-6 shadow-lg border border-slate-800/40 min-h-[500px] flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-rose-500/20">
              <UploadCloud size={20} className="text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">DRAG & DROP VIDEO</h3>
            </div>

            {/* Upload Area */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {uploadStatus === "idle" ? (
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full h-80 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-8 transition-all ${
                    isDragOver 
                      ? "border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.15)] scale-[0.99]" 
                      : "border-slate-800 bg-[#0f121e]/50 hover:bg-[#131929]/50 hover:border-slate-700"
                  }`}
                >
                  <input 
                    type="file" 
                    id="video-file-picker" 
                    accept="video/*" 
                    onChange={handleFileSelect} 
                    className="hidden" 
                  />
                  <label 
                    htmlFor="video-file-picker" 
                    className="flex flex-col items-center justify-center cursor-pointer group"
                  >
                    <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-5 group-hover:border-blue-500/80 group-hover:scale-110 transition-all duration-300 shadow-md">
                      <UploadCloud size={28} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <span className="text-sm font-extrabold text-white group-hover:text-blue-400 transition-colors">Drag and drop video file</span>
                    <span className="text-xs text-slate-500 mt-2 font-semibold">Or click to browse from device files</span>
                    <div className="mt-6 flex gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-wider bg-slate-900/50 px-4 py-2 rounded-full border border-slate-900">
                      <span>MP4, MOV, WEBM</span>
                      <span>•</span>
                      <span>MAX 500 MB</span>
                    </div>
                  </label>
                </div>
              ) : (
                /* Uploading or Finished Card */
                <div className="w-full bg-[#0c101c] border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden shadow-inner">
                  
                  {/* Backdrop glowing grid overlay */}
                  <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent pointer-events-none" />

                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                      <FileVideo size={22} className={uploadStatus === "success" ? "text-emerald-400" : "text-blue-400 animate-pulse"} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-extrabold text-white truncate pr-4">{selectedFile?.name}</p>
                        {uploadStatus !== "uploading" && (
                          <button 
                            type="button"
                            onClick={handleRemoveFile}
                            className="text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 p-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      
                      <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
                        {fileSize} • {uploadStatus === "uploading" ? "Uploading to secure cloud" : uploadStatus === "success" ? "Indexed & processed" : "Failed to index"}
                      </p>

                      {/* Progress Area */}
                      <div className="mt-6 space-y-2">
                        <div className="flex justify-between text-xs font-bold">
                          <span className={uploadStatus === "success" ? "text-emerald-400" : "text-blue-400"}>
                            {uploadStatus === "uploading" ? `Progress: ${uploadProgress}%` : uploadStatus === "success" ? "Completed" : "Upload Failed"}
                          </span>
                          <span className="text-slate-500">
                            {uploadStatus === "uploading" ? "Streaming data" : "Ready to publish"}
                          </span>
                        </div>
                        
                        {/* Glow Progress Bar Container */}
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/40 relative">
                          <div 
                            className={`h-full rounded-full transition-all duration-150 ease-out relative ${
                              uploadStatus === "success" 
                                ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                                : "bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.3)] animate-pulse"
                            }`}
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>

                      {/* Info Tips under Progress */}
                      {uploadStatus === "success" && (
                        <div className="mt-5 p-3.5 bg-emerald-500/5 border border-emerald-500/15 rounded-xl flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-300">
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                          <p className="text-[11px] font-medium text-emerald-300/80 leading-relaxed">
                            Biomechanical video upload finalized. Keyframes generated, cloud CDN optimization complete. Ready to publish to video catalog.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom upload terms info */}
            <div className="text-[10px] text-slate-500 font-bold text-center uppercase tracking-widest mt-6 pt-6 border-t border-slate-900/60">
              Biomechanical indexing and movement scanning automatically configured on submission.
            </div>
          </div>
        </div>

        {/* Right Column: Asset Properties (2 Cols Span) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card bg-[#1e2330] rounded-2xl p-6 shadow-lg border border-slate-800/40">
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-rose-500/20">
              <Sparkles size={20} className="text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">ASSET SPECIFICATIONS</h3>
            </div>

            {/* Metadata Fields */}
            <div className="space-y-5">
              
              {/* Exercise ID Field */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Exercise ID</label>
                <input 
                  type="text" 
                  value={exerciseId} 
                  onChange={(e) => setExerciseId(e.target.value)}
                  className="w-full bg-[#0c101c] border border-slate-800/80 focus:border-[#2563eb]/50 focus:ring-1 focus:ring-[#2563eb]/50 text-sm text-slate-400 font-semibold rounded-xl px-4 py-3 focus:outline-none transition-all cursor-not-allowed"
                  disabled
                />
              </div>

              {/* Exercise Name Field */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Exercise Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Supine Pelvic Clocks" 
                  value={exerciseName} 
                  onChange={(e) => setExerciseName(e.target.value)}
                  className="w-full bg-[#0c101c] border border-slate-800/80 focus:border-[#2563eb]/50 focus:ring-1 focus:ring-[#2563eb]/50 text-sm text-white font-extrabold rounded-xl px-4 py-3 placeholder:text-slate-600 focus:outline-none transition-all"
                  required
                />
              </div>

              {/* Target Area Dropdown */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Target Area</label>
                <div className="relative">
                  <select 
                    value={targetArea} 
                    onChange={(e) => setTargetArea(e.target.value)}
                    className="w-full bg-[#0c101c] border border-slate-800/80 focus:border-[#2563eb]/50 focus:ring-1 focus:ring-[#2563eb]/50 text-sm text-slate-200 font-bold rounded-xl pl-4 pr-10 py-3 appearance-none focus:outline-none transition-all cursor-pointer"
                  >
                    <option value="Lower Back">Lower Back</option>
                    <option value="Neck & Spine">Neck & Spine</option>
                    <option value="Shoulders">Shoulders</option>
                    <option value="Chest & Core">Chest & Core</option>
                    <option value="Glutes">Glutes</option>
                    <option value="Hamstrings">Hamstrings</option>
                    <option value="Full Body">Full Body</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Coaching Cues / Description */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Coaching Cues / Description</label>
                <textarea 
                  placeholder="Provide biomechanical cues for patients executing this movement. These cues will display inside the patient tracker app..."
                  value={cues}
                  onChange={(e) => setCues(e.target.value)}
                  className="w-full h-32 bg-[#0c101c] border border-slate-800/80 focus:border-[#2563eb]/50 focus:ring-1 focus:ring-[#2563eb]/50 text-sm text-slate-200 rounded-xl p-4 placeholder:text-slate-600 focus:outline-none transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Simulated file state warning */}
              {(!selectedFile || uploadStatus !== "success") && (
                <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-start gap-2">
                  <AlertCircle size={15} className="text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-blue-300/85 leading-relaxed font-semibold">
                    You must select or drop a valid video asset and wait for processing to finish before publishing is unlocked.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col gap-3">
                <button 
                  type="submit"
                  disabled={!selectedFile || uploadStatus !== "success" || !exerciseName || isPublishing}
                  className="w-full bg-[#2563eb] hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isPublishing ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>Publish Asset Catalog</span>
                  )}
                </button>

                <Link 
                  href="/video-manager"
                  className="w-full bg-transparent border border-slate-800 hover:bg-slate-800/40 text-slate-400 hover:text-slate-200 font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer"
                >
                  Cancel
                </Link>
              </div>

            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
