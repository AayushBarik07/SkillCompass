"use client";
import { useState, useCallback } from "react";
import { Loader2, Search, UploadCloud, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useDropzone } from "react-dropzone";

export default function AnalyzerForm({ onAnalyze }) {
  const [formData, setFormData] = useState({ role: "", jd: "" });
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      setResumeFile(acceptedFiles[0]);
      setError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setError("Please upload a resume first.");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      // 1. Extract text from PDF via API
      const data = new FormData();
      data.append("resume", resumeFile);
      
      const parseRes = await fetch("/api/parse-resume", {
        method: "POST",
        body: data,
      });
      
      const parseData = await parseRes.json();
      
      if (!parseRes.ok) {
        throw new Error(parseData.error || "Failed to read resume PDF.");
      }
      
      const resumeText = parseData.text;

      // 2. Call AI Backend
      const aiRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          jdText: formData.jd,
          targetRole: formData.role
        }),
      });

      const aiData = await aiRes.json();
      
      if (!aiRes.ok) {
        throw new Error(aiData.error || "Failed to generate AI analysis.");
      }

      onAnalyze(aiData);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="premium-card p-8 mb-12 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient orb inside form */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#d4d4d4] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="md:col-span-2">
          <label className="tool-label">Target Role</label>
          <input
            type="text"
            required
            placeholder="e.g. Senior Frontend Engineer"
            className="w-full px-5 py-4 tool-input"
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
          />
          <p className="text-xs mt-2 text-[#a3a3a3] opacity-70">What exact position are you applying for?</p>
        </div>
        
        <div>
          <label className="tool-label">Resume (PDF)</label>
          <div 
            {...getRootProps()} 
            className={`w-full px-4 py-8 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px] ${
              isDragActive 
                ? "border-[#d4d4d4] bg-[#d4d4d4]/10 scale-[1.02]" 
                : resumeFile 
                  ? "border-[#a3a3a3] bg-[#a3a3a3]/10" 
                  : "border-[rgba(255,255,255,0.2)] bg-[rgba(23,23,23,0.3)] hover:bg-[rgba(23,23,23,0.5)] hover:border-[#d4d4d4]/50"
            }`}
          >
            <input {...getInputProps()} />
            {resumeFile ? (
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-[#a3a3a3]/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  <CheckCircle2 className="h-6 w-6 text-[#a3a3a3]" />
                </div>
                <div className="text-[#F9F7EC] font-medium break-all px-4">{resumeFile.name}</div>
                <div className="text-sm text-[#a3a3a3] opacity-80">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</div>
                <p className="text-xs text-[#d4d4d4] mt-2">Click or drag to replace</p>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-[#d4d4d4]/10 rounded-full flex items-center justify-center">
                  <UploadCloud className="h-6 w-6 text-[#d4d4d4]" />
                </div>
                <div className="text-[#a3a3a3] font-medium">Drag & drop your resume</div>
                <div className="text-sm text-[#a3a3a3] opacity-60">Only PDF formats supported</div>
              </div>
            )}
          </div>
          {error && <p className="text-red-400 text-sm mt-2 flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> {error}</p>}
        </div>

        <div>
          <label className="tool-label">Job Description</label>
          <textarea
            required
            placeholder="Paste the raw job description here. Include required skills, responsibilities, and qualifications."
            className="w-full px-5 py-4 tool-input resize-none min-h-[220px]"
            value={formData.jd}
            onChange={e => setFormData({ ...formData, jd: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end relative z-10 border-t border-[rgba(255,255,255,0.1)] pt-6">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary shadow-sm px-8 py-4 flex items-center gap-2 text-lg tracking-wide"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
          {loading ? "Analyzing Alignment..." : "Analyze Match"}
        </button>
      </div>
    </form>
  );
}
