"use client";
import { CalendarDays } from "lucide-react";
import CopyButton from "./CopyButton";

export default function ActionPlan({ plan }) {
  const content = plan.map(p => `${p.day}: ${p.task}`).join("\n");

  return (
    <div className="premium-card rounded-xl border border-[var(--theme-border)] border-2 p-6 ">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-[var(--theme-accent)]" />
          <h3 className="text-lg font-semibold text-[var(--theme-accent)]">7-Day Action Plan</h3>
        </div>
        <CopyButton textToCopy={content} />
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
        {plan.map((item, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[var(--color-accent)]/10 text-[var(--theme-accent)] font-bold text-xs shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2  z-10">
              {i + 1}
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[rgba(255,255,255,0.05)] p-4 rounded-lg border border-[var(--theme-border)] border-2 ">
              <h4 className="font-bold text-[var(--color-gray-light)] text-sm mb-1">{item.day}</h4>
              <p className="text-sm text-[var(--color-gray-light)]">{item.task}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

