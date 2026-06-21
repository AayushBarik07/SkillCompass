export default function PortfolioSection() {
  return (
    <section className="py-24 bg-[rgba(255,255,255,0.05)] border-t border-[var(--theme-border)] border-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-bold text-[var(--theme-accent)] sm:text-4xl mb-6">SkillCompass — Job Readiness & Career Fit Analyzer</h3>
        
        <p className="max-w-2xl mx-auto text-lg text-[var(--color-gray-light)] mb-8">
          A free job-readiness tool that helps candidates compare resumes against job descriptions, identify missing skills, predict interview areas, and generate a personalized action plan.
        </p>
      </div>
    </section>
  );
}
