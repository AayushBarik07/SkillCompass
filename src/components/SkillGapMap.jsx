"use client";
import { CheckCircle2, XCircle } from "lucide-react";
import CopyButton from "./CopyButton";

export default function SkillGapMap({ matchedSkills, missingSkills }) {
  const content = `Matched Skills: ${matchedSkills.join(", ")}\nMissing Skills: ${missingSkills.join(", ")}`;

  return (
    <div className="premium-card rounded-xl border border-[var(--theme-border)] border-2 p-6 ">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-semibold text-[var(--theme-accent)]">Skill Gap Map</h3>
        <CopyButton textToCopy={content} />
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-[var(--theme-accent)] mb-3">
            <CheckCircle2 className="h-4 w-4" />
            Matched Skills ({matchedSkills.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.length > 0 ? (
              matchedSkills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-[var(--color-accent)]/10 text-[var(--theme-accent)] rounded-full text-xs font-medium border border-emerald-100 capitalize">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-[var(--color-gray-light)]">No matched skills detected.</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-sm font-medium text-rose-400 mb-3">
            <XCircle className="h-4 w-4" />
            Missing Skills ({missingSkills.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {missingSkills.length > 0 ? (
              missingSkills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-rose-900/20 text-rose-400 rounded-full text-xs font-medium border border-rose-100 capitalize">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-[var(--color-gray-light)]">No missing skills detected! Great job.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

