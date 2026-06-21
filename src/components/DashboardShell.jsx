"use client";
import { useState } from "react";
import AnalyzerForm from "./AnalyzerForm";
import ResultsDashboard from "./ResultsDashboard";
import { Lock } from "lucide-react";

export default function DashboardShell() {
  const [results, setResults] = useState(null);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 premium-card p-8">
          <div className="w-12 h-1 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-accent)] mb-6 rounded-full"></div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">SkillCompass Dashboard</h1>
          <p className="text-[var(--theme-text-muted)] flex items-start sm:items-center gap-2 max-w-2xl font-medium">
            <Lock className="h-4 w-4 flex-shrink-0 mt-1 sm:mt-0" />
            <span>Your account is protected. Resumes are parsed securely using AI automation.</span>
          </p>
          <p className="text-sm mt-3 text-[var(--theme-text-muted)]">
            Note: Avoid uploading highly sensitive unredacted personal information.
          </p>
        </div>

        <AnalyzerForm onAnalyze={setResults} />
        
        {results && <ResultsDashboard results={results} />}
      </div>
    </div>
  );
}
