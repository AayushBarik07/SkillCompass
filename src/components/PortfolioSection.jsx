export default function PortfolioSection() {
  return (
    <section className="py-24 bg-[rgba(255,255,255,0.05)] border-t border-[var(--theme-border)] border-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-sm font-semibold text-[var(--theme-accent)] tracking-wider uppercase mb-2">Portfolio Project</h2>
        <h3 className="text-3xl font-bold text-[var(--theme-accent)] sm:text-4xl mb-6">SkillCompass — Job Readiness & Career Fit Analyzer</h3>
        
        <p className="max-w-2xl mx-auto text-lg text-[var(--color-gray-light)] mb-8">
          A free job-readiness tool that helps candidates compare resumes against job descriptions, identify missing skills, predict interview areas, and generate a personalized action plan.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#"
            className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-[var(--theme-accent)] bg-slate-900 hover:bg-slate-800  transition-all"
          >
            Live Demo
          </a>
          <a
            href="#"
            className="inline-flex justify-center items-center px-6 py-3 border border-[var(--theme-border)] border-2 text-base font-medium rounded-lg text-[var(--color-gray-light)] premium-card hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--theme-accent)]  transition-all"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </section>
  );
}
