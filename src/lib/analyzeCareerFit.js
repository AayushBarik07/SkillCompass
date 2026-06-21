import { SKILL_DICTIONARY } from "./skills";

export function analyzeCareerFit(resumeText, jdText, targetRole) {
  const rText = resumeText.toLowerCase();
  const jText = jdText.toLowerCase();

  // 1. Detect Required Skills from JD
  const requiredSkills = [];
  const requiredCategories = new Set();
  
  for (const [category, skills] of Object.entries(SKILL_DICTIONARY)) {
    skills.forEach((skill) => {
      // Basic exact match or regex with boundaries could be used. 
      // For simplicity and rule-based:
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "i");
      if (regex.test(jText)) {
        if (!requiredSkills.includes(skill)) {
          requiredSkills.push({ name: skill, category });
          requiredCategories.add(category);
        }
      }
    });
  }

  // If JD doesn't yield any skills, we fallback or just use what we have
  if (requiredSkills.length === 0) {
    requiredSkills.push({ name: "communication", category: "softSkills" });
  }

  // 2. Compare with Resume
  const matchedSkills = [];
  const missingSkills = [];

  requiredSkills.forEach(({ name, category }) => {
    const regex = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, "i");
    if (regex.test(rText)) {
      matchedSkills.push({ name, category });
    } else {
      missingSkills.push({ name, category });
    }
  });

  // 3. Calculate Score
  let score = 0;
  if (requiredSkills.length > 0) {
    score = Math.round((matchedSkills.length / requiredSkills.length) * 100);
  }

  // Increase score a bit if they have extra skills not in JD? 
  // For now, keep it simple.
  
  // 4. Match Level
  let matchLevel = "Weak Fit";
  if (score >= 80) matchLevel = "Interview Ready";
  else if (score >= 60) matchLevel = "Strong Fit";
  else if (score >= 40) matchLevel = "Moderate Fit";

  // 5. Recruiter Eye View
  let recruiterFeedback = [];
  if (score >= 80) {
    recruiterFeedback.push(`"Strong profile for the ${targetRole || 'role'}. You hit most of the key requirements."`);
  } else if (score >= 60) {
    recruiterFeedback.push(`"Your profile is close, but some specific skills are missing."`);
  } else {
    recruiterFeedback.push(`"You might need to build more relevant experience for this specific role."`);
  }

  const missingTech = missingSkills.filter(s => s.category === "frontend" || s.category === "backend" || s.category === "tools");
  if (missingTech.length > 0) {
    recruiterFeedback.push(`"Your resume could use stronger proof of: ${missingTech.slice(0, 3).map(s => s.name).join(", ")}."`);
  }

  const matchedConcepts = matchedSkills.filter(s => s.category === "concepts");
  if (matchedConcepts.length === 0 && requiredCategories.has("concepts")) {
     recruiterFeedback.push(`"Consider highlighting architectural concepts or testing methodologies."`);
  }

  // 6. Interview Predictor
  const interviewTopics = [];
  const prioritySkills = missingSkills.length > 0 ? missingSkills.slice(0, 3) : matchedSkills.slice(0, 3);
  
  prioritySkills.forEach(skill => {
    let q1 = `Explain how you have used ${skill.name} in a recent project.`;
    let q2 = `What challenges did you face when working with ${skill.name}?`;
    
    if (skill.category === "frontend") {
      q1 = `How do you optimize performance when working with ${skill.name}?`;
      q2 = `Explain the core concepts of ${skill.name} to someone new.`;
    } else if (skill.category === "backend") {
      q1 = `How do you handle security and scaling with ${skill.name}?`;
      q2 = `Can you describe an API or service you built using ${skill.name}?`;
    }
    
    interviewTopics.push({
      topic: skill.name,
      questions: [q1, q2]
    });
  });

  // 7. Project Recommendation
  let projectRecommendation = null;
  if (missingSkills.length > 0) {
    const m = missingSkills.map(s => s.name);
    let title = "Targeted Skill-Builder Project";
    if (m.includes("react") || m.includes("next.js") || m.includes("vue")) title = "Interactive Frontend Application";
    if (m.includes("node.js") || m.includes("python") || m.includes("java")) title = "Backend API Service";
    if (m.includes("sql") || m.includes("mongodb") || m.includes("postgresql")) title = "Data-Driven Web Application";
    
    projectRecommendation = {
      title,
      why: "Building a portfolio project around these specific technologies will help bridge the gap in your current experience.",
      skillsCovered: m.slice(0, 4),
      difficulty: "Intermediate",
      estimatedTime: "1-2 weeks",
      portfolioValue: "High - demonstrates practical application of required tech.",
      suggestedFeatures: [
        "User authentication and authorization",
        "CRUD operations with database",
        "Responsive frontend layout",
        "Deployment to a live URL"
      ]
    };
  } else {
    projectRecommendation = {
      title: "Advanced System Architecture Clone",
      why: "You already have the core skills. This project proves you can handle complex, scaleable architectures.",
      skillsCovered: matchedSkills.map(s => s.name).slice(0, 4),
      difficulty: "Advanced",
      estimatedTime: "2-3 weeks",
      portfolioValue: "Very High - sets you apart from other candidates.",
      suggestedFeatures: [
        "Microservices or modular monolith design",
        "Caching and performance optimization",
        "Comprehensive testing (unit/e2e)"
      ]
    };
  }

  // 8. 7-Day Action Plan
  const actionPlan = [
    { day: "Day 1", task: `Improve your resume summary to better align with ${targetRole || 'the target role'} and highlight existing strengths.` },
    { day: "Day 2", task: missingSkills.length > 0 ? `Add missing keywords like ${missingSkills.slice(0, 2).map(s => s.name).join(", ")} naturally into your project descriptions, if you have experience with them.` : `Review your resume formatting and ensure your impact is measurable.` },
    { day: "Day 3", task: `Start building the recommended project: ${projectRecommendation.title}.` },
    { day: "Day 4", task: `Prepare answers for the predicted interview questions on ${interviewTopics.length > 0 ? interviewTopics[0].topic : 'your core skills'}.` },
    { day: "Day 5", task: `Update your GitHub READMEs to be recruiter-friendly and add architecture diagrams.` },
    { day: "Day 6", task: `Deploy your projects (using Vercel, Render, etc.) and add live links to your resume.` },
    { day: "Day 7", task: `Apply to 5-10 relevant roles while tracking responses, and practice a mock interview.` }
  ];

  return {
    score,
    matchLevel,
    matchedSkills: matchedSkills.map(s => s.name),
    missingSkills: missingSkills.map(s => s.name),
    recruiterFeedback,
    interviewTopics,
    projectRecommendation,
    actionPlan
  };
}
