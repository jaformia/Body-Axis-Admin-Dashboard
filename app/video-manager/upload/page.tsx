"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, UploadCloud, FileVideo, CheckCircle2, 
  AlertCircle, Sparkles, ChevronDown, Trash2, X, Plus,
  FileImage, Play
} from "lucide-react";

export default function UploadVideoPage() {
  const router = useRouter();
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  
  // Thumbnail upload state
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);
  const [isThumbnailDragOver, setIsThumbnailDragOver] = useState(false);
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0);
  const [thumbnailUploadStatus, setThumbnailUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [thumbnailBase64, setThumbnailBase64] = useState<string | null>(null);
  
  // Form fields state
  const [exerciseId, setExerciseId] = useState("EX-260003");
  const [exerciseName, setExerciseName] = useState("");
  const [targetArea, setTargetArea] = useState("Lower Back");
  const [fileSize, setFileSize] = useState("");
  const [cues, setCues] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  // Auto scroll top on mount and set sequential Exercise ID
  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const stored = localStorage.getItem("custom_video_assets");
      const customAssets = stored ? JSON.parse(stored) : [];
      const nextNum = 260003 + customAssets.length;
      setExerciseId(`EX-${nextNum}`);
    } catch (e) {
      // fallback
    }
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

  // Simulate thumbnail upload progress
  useEffect(() => {
    if (thumbnailUploadStatus === "uploading") {
      setUploadProgress(0); // reset
      const interval = setInterval(() => {
        setThumbnailUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setThumbnailUploadStatus("success");
            return 100;
          }
          return prev + Math.floor(Math.random() * 12) + 6; // realistic steps
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [thumbnailUploadStatus]);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (thumbnailPreviewUrl) {
        URL.revokeObjectURL(thumbnailPreviewUrl);
      }
    };
  }, [thumbnailPreviewUrl]);

  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

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
    const previewUrl = URL.createObjectURL(file);
    setVideoPreviewUrl(previewUrl);
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
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoPreviewUrl(null);
    setUploadStatus("idle");
    setUploadProgress(0);
    setFileSize("");
  };

  // Handle Thumbnail Drag & Drop events
  const handleThumbnailDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsThumbnailDragOver(true);
  };

  const handleThumbnailDragLeave = () => {
    setIsThumbnailDragOver(false);
  };

  const handleThumbnailDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsThumbnailDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        processThumbnailFile(file);
      } else {
        alert("Please upload a valid image file for the thumbnail.");
      }
    }
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processThumbnailFile(e.target.files[0]);
    }
  };

  const processThumbnailFile = (file: File) => {
    setSelectedThumbnail(file);
    const previewUrl = URL.createObjectURL(file);
    setThumbnailPreviewUrl(previewUrl);
    
    // Resize image using Canvas to minimize storage footprint
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const width = 160;
        const height = 90;
        canvas.width = width;
        canvas.height = height;
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);
          setThumbnailBase64(resizedBase64);
        }
      };
      if (e.target?.result) {
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
    
    setThumbnailUploadStatus("uploading");
  };

  const handleRemoveThumbnail = () => {
    setSelectedThumbnail(null);
    if (thumbnailPreviewUrl) {
      URL.revokeObjectURL(thumbnailPreviewUrl);
    }
    setThumbnailPreviewUrl(null);
    setThumbnailUploadStatus("idle");
    setThumbnailUploadProgress(0);
    setThumbnailBase64(null);
  };

  // Simulate publish submit
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !exerciseName || uploadStatus !== "success") return;
    
    setIsPublishing(true);
    setTimeout(() => {
      // Create new video asset object
      const newAsset = {
        id: exerciseId,
        name: exerciseName,
        size: fileSize || "0.0 MB",
        date: new Date().toLocaleDateString("en-US"),
        status: "Uploaded",
        thumbnail: thumbnailBase64 || null
      };

      // Save to localStorage
      try {
        const stored = localStorage.getItem("custom_video_assets");
        const currentAssets = stored ? JSON.parse(stored) : [];
        const updatedAssets = [newAsset, ...currentAssets];
        localStorage.setItem("custom_video_assets", JSON.stringify(updatedAssets));
      } catch (err) {
        console.error("Failed to save asset to localStorage:", err);
      }

      // Dispatch global notification event
      try {
        const notifEvent = new CustomEvent("add-notification", {
          detail: {
            title: "New Video Uploaded",
            message: `"${exerciseName}" (${exerciseId}) has been successfully processed and added.`,
            type: "success"
          }
        });
        window.dispatchEvent(notifEvent);
      } catch (err) {
        console.error("Failed to dispatch upload notification:", err);
      }

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
      <form onSubmit={handlePublish} className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
        
        {/* Left Column: Media Section (3 Cols Span) */}
        <div className="lg:col-span-3 flex flex-col h-full space-y-6">
          
          {/* Side-by-Side Uploaders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Video Uploader Card */}
            <div className="glass-card bg-[#1e2330] rounded-2xl p-5 shadow-lg border border-slate-800/40 flex flex-col justify-between min-h-[300px]">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-rose-500/20">
                <UploadCloud size={18} className="text-cyan-400" />
                <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">DRAG & DROP VIDEO</h3>
              </div>

              {/* Upload Area */}
              <div className="flex-1 flex flex-col items-center justify-center">
                {uploadStatus === "idle" ? (
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`w-full h-44 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all ${
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
                      className="flex flex-col items-center justify-center cursor-pointer group text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 group-hover:border-blue-500/80 group-hover:scale-110 transition-all duration-300 shadow-md">
                        <UploadCloud size={20} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <span className="text-xs font-extrabold text-white group-hover:text-blue-400 transition-colors">Drag & drop video file</span>
                      <span className="text-[10px] text-slate-500 mt-1 font-semibold">Or click to browse</span>
                      <span className="mt-3 text-[9px] text-slate-600 font-bold uppercase tracking-wider bg-slate-900/50 px-3 py-1 rounded-full border border-slate-900 block">
                        MP4, MOV, WEBM • MAX 500MB
                      </span>
                    </label>
                  </div>
                ) : (
                  /* Uploading or Finished Card */
                  <div className="w-full bg-[#0c101c] border border-slate-800/80 rounded-2xl p-4 relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent pointer-events-none" />

                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                        <FileVideo size={18} className={uploadStatus === "success" ? "text-emerald-400" : "text-blue-400 animate-pulse"} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-extrabold text-white truncate pr-2">{selectedFile?.name}</p>
                          {uploadStatus !== "uploading" && (
                            <button 
                              type="button"
                              onClick={handleRemoveFile}
                              className="text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 p-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                        
                        <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
                          {fileSize} • {uploadStatus === "uploading" ? "Uploading" : "Indexed"}
                        </p>

                        {/* Progress Area */}
                        <div className="mt-4 space-y-1">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className={uploadStatus === "success" ? "text-emerald-400" : "text-blue-400"}>
                              {uploadStatus === "uploading" ? `Progress: ${uploadProgress}%` : "Completed"}
                            </span>
                          </div>
                          
                          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/40 relative">
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
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom info note */}
              <div className="text-[9px] text-slate-500 font-bold text-center uppercase tracking-wider mt-4 pt-3 border-t border-slate-900/60">
                Movement scanning is automated
              </div>
            </div>

            {/* Thumbnail Uploader Card */}
            <div className="glass-card bg-[#1e2330] rounded-2xl p-5 shadow-lg border border-slate-800/40 flex flex-col justify-between min-h-[300px]">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-rose-500/20">
                <FileImage size={18} className="text-cyan-400" />
                <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">DRAG & DROP THUMBNAIL</h3>
              </div>

              {/* Upload Area */}
              <div className="flex-1 flex flex-col items-center justify-center">
                {thumbnailUploadStatus === "idle" ? (
                  <div 
                    onDragOver={handleThumbnailDragOver}
                    onDragLeave={handleThumbnailDragLeave}
                    onDrop={handleThumbnailDrop}
                    className={`w-full h-44 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 transition-all ${
                      isThumbnailDragOver 
                        ? "border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.15)] scale-[0.99]" 
                        : "border-slate-800 bg-[#0f121e]/50 hover:bg-[#131929]/50 hover:border-slate-700"
                    }`}
                  >
                    <input 
                      type="file" 
                      id="thumbnail-file-picker" 
                      accept="image/*" 
                      onChange={handleThumbnailSelect} 
                      className="hidden" 
                    />
                    <label 
                      htmlFor="thumbnail-file-picker" 
                      className="flex flex-col items-center justify-center cursor-pointer group text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 group-hover:border-blue-500/80 group-hover:scale-110 transition-all duration-300 shadow-md">
                        <FileImage size={18} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <span className="text-xs font-extrabold text-white group-hover:text-blue-400 transition-colors">Drag & drop thumbnail image</span>
                      <span className="text-[10px] text-slate-500 mt-1 font-semibold">Or click to browse</span>
                      <span className="mt-3 text-[9px] text-slate-600 font-bold uppercase tracking-wider bg-slate-900/50 px-3 py-1 rounded-full border border-slate-900 block">
                        PNG, JPG, WEBP • MAX 10MB
                      </span>
                    </label>
                  </div>
                ) : (
                  /* Uploading or Preview Card */
                  <div className="w-full bg-[#0c101c] border border-slate-800/80 rounded-2xl p-4 relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent pointer-events-none" />

                    <div className="flex items-start gap-3 relative z-10">
                      {/* Visual Preview */}
                      <div className="w-16 h-10 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                        {thumbnailPreviewUrl ? (
                          <img src={thumbnailPreviewUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                        ) : (
                          <FileImage size={16} className="text-blue-400 animate-pulse" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs font-extrabold text-white truncate pr-2">{selectedThumbnail?.name}</p>
                          {thumbnailUploadStatus !== "uploading" && (
                            <button 
                              type="button"
                              onClick={handleRemoveThumbnail}
                              className="text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 p-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                        
                        <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
                          {thumbnailUploadStatus === "uploading" ? "Uploading image" : "Processed & ready"}
                        </p>

                        {/* Progress Area */}
                        <div className="mt-4 space-y-1">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span className={thumbnailUploadStatus === "success" ? "text-emerald-400" : "text-blue-400"}>
                              {thumbnailUploadStatus === "uploading" ? `Progress: ${thumbnailUploadProgress}%` : "Completed"}
                            </span>
                          </div>
                          
                          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/40 relative">
                            <div 
                              className={`h-full rounded-full transition-all duration-150 ease-out relative ${
                                thumbnailUploadStatus === "success" 
                                  ? "bg-gradient-to-r from-emerald-500 to-teal-400" 
                                  : "bg-gradient-to-r from-blue-600 to-cyan-400 animate-pulse"
                              }`}
                              style={{ width: `${thumbnailUploadProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom info note */}
              <div className="text-[9px] text-slate-500 font-bold text-center uppercase tracking-wider mt-4 pt-3 border-t border-slate-900/60">
                16:9 Aspect ratio recommended
              </div>
            </div>
            
          </div>

          {/* Live Player Preview Card (full width of Left Column) */}
          <div className="glass-card bg-[#1e2330] rounded-2xl p-6 shadow-lg border border-slate-800/40 flex-1 flex flex-col justify-between">
            <div className="flex items-center gap-2 pb-4 border-b border-rose-500/20">
              <Sparkles size={18} className="text-cyan-400 animate-pulse" />
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">LIVE PLAYER PREVIEW</h3>
            </div>

            <div className="flex-1 flex flex-col justify-center py-4 space-y-5">
              {/* Simulated YouTube Player - CENTERED & COMPACT */}
              <div className="max-w-[560px] mx-auto w-full aspect-video rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden relative group shadow-inner">
                {uploadStatus === "success" ? (
                  <video 
                    src={videoPreviewUrl || undefined} 
                    poster={thumbnailPreviewUrl || undefined}
                    controls 
                    className="w-full h-full object-cover"
                  />
                ) : thumbnailPreviewUrl ? (
                  // Only thumbnail uploaded
                  <div className="w-full h-full relative">
                    <img src={thumbnailPreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={20} className="ml-1 fill-white text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Empty state
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-700 gap-2">
                    <FileVideo size={36} className="text-slate-800" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Awaiting media upload...</span>
                  </div>
                )}

                {/* HD / Duration Badge simulation */}
                {(uploadStatus === "success" || thumbnailPreviewUrl) && (
                  <span className="absolute bottom-3 right-3 bg-slate-950/80 px-2 py-0.5 rounded text-[9px] font-bold text-white tracking-wide z-10">
                    0:25
                  </span>
                )}
              </div>

              {/* Video Details (YouTube style) - CENTERED */}
              <div className="space-y-2 text-center max-w-[560px] mx-auto">
                <div className="flex items-center justify-center gap-3">
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                    {targetArea}
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                    {exerciseId}
                  </span>
                </div>
                <h4 className="text-base font-extrabold text-white leading-snug truncate">
                  {exerciseName || "Untitled Dynamic Asset"}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {cues || "No cues provided yet. Type cues below to see them here..."}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Asset Properties (2 Cols Span) */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <div className="glass-card bg-[#1e2330] rounded-2xl p-6 shadow-lg border border-slate-800/40 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-rose-500/20 shrink-0">
              <Sparkles size={20} className="text-cyan-400" />
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">ASSET SPECIFICATIONS</h3>
            </div>

            {/* Metadata Fields & Actions Container */}
            <div className="flex-1 flex flex-col justify-between">
              {/* Input Fields */}
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
              </div>

              {/* Warning & Action Buttons pinned to bottom */}
              <div className="space-y-5 pt-6 shrink-0">
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
                <div className="flex flex-col gap-3">
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
        </div>

      </form>
    </div>
  );
}
