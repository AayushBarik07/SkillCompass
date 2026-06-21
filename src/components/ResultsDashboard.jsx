import ScoreCard from "./ScoreCard";
import ReadinessMeter from "./ReadinessMeter";
import RecruiterView from "./RecruiterView";
import SkillGapMap from "./SkillGapMap";
import InterviewPredictor from "./InterviewPredictor";
import ProjectRecommendation from "./ProjectRecommendation";
import ActionPlan from "./ActionPlan";

export default function ResultsDashboard({ results }) {
  if (!results) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ScoreCard score={results.score} matchLevel={results.matchLevel} />
        </div>
        <div className="md:col-span-2">
          <ReadinessMeter score={results.score} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecruiterView feedback={results.recruiterFeedback} />
        <SkillGapMap 
          matchedSkills={results.matchedSkills} 
          missingSkills={results.missingSkills} 
        />
      </div>

      <ProjectRecommendation recommendation={results.projectRecommendation} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InterviewPredictor topics={results.interviewTopics} />
        <ActionPlan plan={results.actionPlan} />
      </div>
    </div>
  );
}
