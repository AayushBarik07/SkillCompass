"use client";
import { Rocket, Clock, BarChart, Code2 } from "lucide-react";

export default function ProjectRecommendation({ recommendation }) {
  if (!recommendation) return null;

  return (
    <div className="premium-card rounded-xl border border-[var(--theme-border)] border-2 p-6  overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Rocket className="w-32 h-32" />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Rocket className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-[var(--theme-accent)]">Project Recommendation Engine</h3>
      </div>
      
      <div className="mt-6">
        <div className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Suggested Build</span>
          <h4 className="text-xl font-bold text-[var(--theme-accent)] mt-1">{recommendation.title}</h4>
          <p className="text-sm text-[var(--color-gray-light)] mt-2">{recommendation.why}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="bg-[rgba(255,255,255,0.05)] p-3 rounded-lg border border-[var(--theme-border)] border-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-gray-light)] mb-1">
              <Code2 className="h-3.5 w-3.5" />
              Skills Covered
            </div>
            <div className="text-sm font-semibold text-[var(--color-gray-light)] capitalize">
              {recommendation.skillsCovered.join(", ")}
            </div>
          </div>
          <div className="bg-[rgba(255,255,255,0.05)] p-3 rounded-lg border border-[var(--theme-border)] border-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-gray-light)] mb-1">
              <BarChart className="h-3.5 w-3.5" />
              Difficulty
            </div>
            <div className="text-sm font-semibold text-[var(--color-gray-light)]">
              {recommendation.difficulty}
            </div>
          </div>
          <div className="bg-[rgba(255,255,255,0.05)] p-3 rounded-lg border border-[var(--theme-border)] border-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-gray-light)] mb-1">
              <Clock className="h-3.5 w-3.5" />
              Est. Time
            </div>
            <div className="text-sm font-semibold text-[var(--color-gray-light)]">
              {recommendation.estimatedTime}
            </div>
          </div>
          <div className="bg-[rgba(255,255,255,0.05)] p-3 rounded-lg border border-[var(--theme-border)] border-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-gray-light)] mb-1">
              <Rocket className="h-3.5 w-3.5" />
              Portfolio Value
            </div>
            <div className="text-sm font-semibold text-[var(--color-gray-light)]">
              {recommendation.portfolioValue}
            </div>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-[var(--theme-accent)] mb-3">Suggested Features</h5>
          <ul className="space-y-2">
            {recommendation.suggestedFeatures.map((feat, i) => (
              <li key={i} className="text-sm text-[var(--color-gray-light)] flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></div>
                {feat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

