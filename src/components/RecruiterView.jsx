"use client";
import { Eye } from "lucide-react";
import CopyButton from "./CopyButton";

export default function RecruiterView({ feedback }) {
  const content = feedback.join("\n\n");
  
  return (
    <div className="premium-card rounded-xl border border-[var(--theme-border)] border-2 p-6 ">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-[var(--theme-accent)]" />
          <h3 className="text-lg font-semibold text-[var(--theme-accent)]">Recruiter Eye View</h3>
        </div>
        <CopyButton textToCopy={content} />
      </div>
      
      <div className="space-y-4">
        {feedback.map((line, i) => (
          <div key={i} className="flex gap-3 items-start bg-[rgba(255,255,255,0.05)] p-4 rounded-lg border border-[var(--theme-border)] border-2">
            <div className="h-2 w-2 rounded-full bg-[var(--color-accent)]/100 mt-2 shrink-0"></div>
            <p className="text-sm text-[var(--color-gray-light)] italic">{line}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

