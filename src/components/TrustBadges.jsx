"use client";
import { ShieldCheck, Lock, Zap } from "lucide-react";

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-8 py-8 px-4 text-[var(--color-gray-light)]">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-emerald-500" />
        <span className="text-sm font-medium">100% Private Analysis</span>
      </div>
      <div className="flex items-center gap-2">
        <Lock className="h-5 w-5 text-emerald-500" />
        <span className="text-sm font-medium">Secure JWT Auth</span>
      </div>
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-emerald-500" />
        <span className="text-sm font-medium">Instant Rule-Based Results</span>
      </div>
    </div>
  );
}

