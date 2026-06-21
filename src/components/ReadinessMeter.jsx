export default function ReadinessMeter({ score }) {
  let progressColor = "bg-rose-900/200";
  if (score >= 80) progressColor = "bg-[var(--color-accent)]/100";
  else if (score >= 60) progressColor = "bg-blue-500";
  else if (score >= 40) progressColor = "bg-amber-500";

  return (
    <div className="premium-card rounded-xl border border-[var(--theme-border)] border-2 p-6 ">
      <h3 className="text-lg font-semibold text-[var(--theme-accent)] mb-4">Career Readiness</h3>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[var(--color-gray-light)] bg-[var(--color-accent)]/10">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-[var(--color-gray-light)]">
              {score}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[var(--color-accent)]/10">
          <div
            style={{ width: `${score}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-[var(--theme-accent)] justify-center transition-all duration-1000 ${progressColor}`}
          ></div>
        </div>
      </div>
      <p className="text-sm text-[var(--color-gray-light)] mt-2">
        {score >= 80 ? "You are highly competitive for this role. Focus on interview prep." :
         score >= 60 ? "You have a solid foundation. Bridge the remaining skill gaps to stand out." :
         "Significant skill gaps detected. We recommend focusing on the Action Plan before applying."}
      </p>
    </div>
  );
}
