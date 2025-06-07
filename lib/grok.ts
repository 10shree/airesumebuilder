import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"

export const generateAIContent = async (prompt: string) => {
  try {
    const { text } = await generateText({
      model: xai("grok-1"),
      prompt: prompt,
      systemPrompt:
        "You are an AI resume assistant helping a user create a professional resume. Provide specific, actionable advice that highlights achievements and quantifiable results.",
      maxTokens: 500,
    })

    return { success: true, text }
  } catch (error: any) {
    console.error("Error generating AI content:", error)
    return { success: false, error: error.message || "Failed to generate content" }
  }
}

export const improveResumeItem = async (section: string, content: string) => {
  const prompt = `Improve the following ${section} section of a resume to be more impactful, quantifiable, and achievement-oriented:
  
  ${content}
  
  Focus on:
  1. Using strong action verbs
  2. Adding specific metrics and achievements
  3. Removing filler words and passive voice
  4. Ensuring it's relevant for ATS systems
  `

  return generateAIContent(prompt)
}

export const generateATS = async (jobDescription: string, resumeContent: string) => {
  const prompt = `Analyze the compatibility between this job description:
  
  "${jobDescription}"
  
  And this resume content:
  
  "${resumeContent}"
  
  Provide a detailed analysis including:
  1. Overall match score (percentage)
  2. Key keywords missing from the resume
  3. Specific recommendations to improve the match
  4. Strengths of the current resume for this position
  `

  return generateAIContent(prompt)
}
