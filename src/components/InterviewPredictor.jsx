"use client";
import { MessageSquareText } from "lucide-react";
import CopyButton from "./CopyButton";

export default function InterviewPredictor({ topics }) {
  const content = topics.map(t => `Topic: ${t.topic}\n` + t.questions.map(q => `- ${q}`).join("\n")).join("\n\n");

  return (
    <div className="premium-card rounded-xl border border-[var(--theme-border)] border-2 p-6 ">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <MessageSquareText className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-[var(--theme-accent)]">Interview Predictor</h3>
        </div>
        <CopyButton textToCopy={content} />
      </div>

      <div className="space-y-6">
        {topics.length > 0 ? (
          topics.map((item, idx) => (
            <div key={idx} className="border-l-2 border-indigo-200 pl-4 py-1">
              <h4 className="text-sm font-semibold text-[var(--color-gray-light)] capitalize mb-2">Topic: {item.topic}</h4>
              <ul className="space-y-2">
                {item.questions.map((q, i) => (
                  <li key={i} className="text-sm text-[var(--color-gray-light)] flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-sm text-[var(--color-gray-light)]">Not enough data to predict interview topics.</p>
        )}
      </div>
    </div>
  );
}

