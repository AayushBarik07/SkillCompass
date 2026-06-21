import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { resumeText, jdText, targetRole } = await req.json();

    if (!resumeText || !jdText) {
      return NextResponse.json({ error: "Missing resume or job description text." }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Server is missing GEMINI_API_KEY environment variable. Please configure it." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemInstruction = `
    You are an expert technical recruiter and career coach. Your job is to analyze a candidate's resume against a job description.
    You must output your response EXACTLY as a valid JSON object. Do not wrap the JSON in markdown code blocks. Just output raw JSON.

    The JSON must follow this exact structure:
    {
      "score": <number between 0 and 100 based on fit>,
      "matchLevel": <string: "Interview Ready", "Strong Fit", "Moderate Fit", or "Weak Fit">,
      "matchedSkills": [<array of strings representing skills found in both>],
      "missingSkills": [<array of strings representing important skills in JD missing from resume>],
      "recruiterFeedback": [<array of 2 to 3 strings giving honest, specific feedback quotes>],
      "interviewTopics": [
        {
          "topic": <string representing a skill or concept to interview on>,
          "questions": [<array of 2 strings containing specific interview questions>]
        }
      ],
      "projectRecommendation": {
        "title": <string: creative title for a project that would cover their missing skills>,
        "why": <string: explanation of why this project helps>,
        "skillsCovered": [<array of strings>],
        "difficulty": <string: "Beginner", "Intermediate", or "Advanced">,
        "estimatedTime": <string: e.g. "1-2 weeks">,
        "portfolioValue": <string: e.g. "High - covers core stack">,
        "suggestedFeatures": [<array of 3-4 feature strings>]
      },
      "actionPlan": [
        { "day": "Day 1", "task": <string> },
        { "day": "Day 2", "task": <string> },
        { "day": "Day 3", "task": <string> },
        { "day": "Day 4", "task": <string> },
        { "day": "Day 5", "task": <string> },
        { "day": "Day 6", "task": <string> },
        { "day": "Day 7", "task": <string> }
      ]
    }
    
    Guidelines:
    - The 7-day action plan MUST be highly specific to the candidate's actual missing skills and the target role.
    - Make the project recommendation highly specific, combining the missing skills into a realistic, modern application.
    - Output strictly JSON, no backticks, no comments.
    `;

    const prompt = `
    Target Role: ${targetRole || 'Not specified'}

    --- JOB DESCRIPTION ---
    ${jdText}

    --- RESUME TEXT ---
    ${resumeText}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        responseMimeType: "application/json"
      }
    });

    const resultText = response.text;
    
    // Parse the JSON
    let parsedData;
    try {
      parsedData = JSON.parse(resultText);
    } catch (parseErr) {
      console.error("Failed to parse AI response as JSON:", resultText);
      return NextResponse.json({ error: "AI returned invalid format." }, { status: 500 });
    }

    return NextResponse.json(parsedData);

  } catch (error) {
    console.error("Analyze Error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze career fit." }, { status: 500 });
  }
}
