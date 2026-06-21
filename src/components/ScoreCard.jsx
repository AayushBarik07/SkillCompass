export default function ScoreCard({ score, matchLevel }) {
  let color = "text-rose-500";
  let bg = "bg-rose-900/20";
  let border = "border-rose-100";
  
  if (score >= 80) {
    color = "text-[var(--theme-accent)]";
    bg = "bg-[var(--color-accent)]/10";
    border = "border-emerald-100";
  } else if (score >= 60) {
    color = "text-blue-600";
    bg = "bg-blue-50";
    border = "border-blue-100";
  } else if (score >= 40) {
    color = "text-amber-600";
    bg = "bg-amber-50";
    border = "border-amber-100";
  }

  return (
    <div className={`rounded-xl border ${border} ${bg} p-6 flex flex-col items-center justify-center text-center h-full`}>
      <h3 className="text-sm font-medium text-[var(--color-gray-light)] mb-2 uppercase tracking-wider">Career Fit Score</h3>
      <div className={`text-6xl font-bold ${color} mb-2`}>
        {score}
        <span className="text-2xl text-slate-400 font-normal">/100</span>
      </div>
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${color} premium-card/60 backdrop-blur-sm border ${border}`}>
        {matchLevel}
      </div>
    </div>
  );
}
