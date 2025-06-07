"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Send, Lightbulb, TrendingUp, Target, Check, Loader2, Wand2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

type Message = {
  type: "user" | "ai"
  content: string
}

interface EnhancedAIAssistantProps {
  onImproveContent?: (content: string) => void
  className?: string
}

export function EnhancedAIAssistant({ onImproveContent, className }: EnhancedAIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "ai",
      content:
        "Hi! I'm your AI resume assistant powered by Grok. I can help you improve your resume content, suggest better bullet points, and optimize for specific job roles. What would you like to work on?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")

  // For the improve tab
  const [sectionToImprove, setSectionToImprove] = useState("")
  const [improvedContent, setImprovedContent] = useState("")
  const [improvementLoading, setImprovementLoading] = useState(false)

  // For the ATS tab
  const [jobDescription, setJobDescription] = useState("")
  const [resumeContent, setResumeContent] = useState("")
  const [atsResult, setAtsResult] = useState("")
  const [atsLoading, setAtsLoading] = useState(false)

  const suggestions = [
    {
      icon: <Lightbulb className="w-4 h-4" />,
      title: "Improve bullet points",
      description: "Make your achievements more impactful",
      onClick: () =>
        handleSuggestedPrompt("Can you help me improve my work experience bullet points to be more impactful?"),
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      title: "Optimize for ATS",
      description: "Ensure your resume passes screening systems",
      onClick: () => setActiveTab("ats"),
    },
    {
      icon: <Target className="w-4 h-4" />,
      title: "Tailor for job role",
      description: "Customize content for specific positions",
      onClick: () => handleSuggestedPrompt("How should I tailor my resume for a software engineering position?"),
    },
    {
      icon: <Wand2 className="w-4 h-4" />,
      title: "Professional summary",
      description: "Write a compelling professional summary",
      onClick: () => handleSuggestedPrompt("Help me write a professional summary for my resume"),
    },
  ]

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { type: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      // Simulate AI response with more realistic responses
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const responses = {
        improve: [
          "To improve your bullet points, use the STAR method (Situation, Task, Action, Result). For example:\n\n• Instead of: 'Worked on team projects'\n• Write: 'Led cross-functional team of 5 developers to deliver customer portal, resulting in 40% faster user onboarding'\n\nAlways include quantifiable metrics and specific outcomes.",
          "Here are key improvements for your resume:\n\n1. Start with strong action verbs (Led, Implemented, Optimized)\n2. Add specific numbers and percentages\n3. Focus on achievements, not just responsibilities\n4. Use industry-relevant keywords\n\nExample: 'Managed social media' → 'Developed social media strategy that increased engagement by 65% and grew followers from 2K to 15K in 6 months'",
        ],
        professional: [
          "Here's a formula for a compelling professional summary:\n\n[Years of experience] + [Key expertise] + [Notable achievement] + [What you bring to employers]\n\nExample: 'Results-driven software engineer with 5+ years developing scalable web applications. Led migration of legacy system serving 100K+ users, reducing load times by 60%. Passionate about creating user-centric solutions that drive business growth.'",
        ],
        tailor: [
          "To tailor your resume for software engineering:\n\n1. Match technical skills to job requirements\n2. Highlight relevant projects and frameworks\n3. Use exact keywords from job posting\n4. Emphasize problem-solving and system design experience\n5. Include metrics on performance improvements\n\nPrioritize experiences that show coding ability, teamwork, and technical leadership.",
        ],
        general: [
          "Based on your question, I recommend focusing on quantifiable achievements in your resume. Instead of saying 'Led a team', say 'Led a team of 5 engineers to deliver a project that increased efficiency by 30%'. Numbers and specific impacts make your resume stand out.",
          "For a strong resume, remember the 3 C's: Clear, Concise, and Compelling. Use bullet points, keep descriptions to 2-3 lines, and always lead with your strongest achievements. Tailor each application to the specific role.",
          "To make your resume ATS-friendly: Use standard section headings, include relevant keywords, avoid complex formatting, and save as PDF unless otherwise specified. Focus on skills that match the job description.",
        ],
      }

      let category = "general"
      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("improve") || lowerInput.includes("bullet") || lowerInput.includes("better")) {
        category = "improve"
      } else if (lowerInput.includes("summary") || lowerInput.includes("professional")) {
        category = "professional"
      } else if (lowerInput.includes("tailor") || lowerInput.includes("software") || lowerInput.includes("engineer")) {
        category = "tailor"
      }

      const categoryResponses = responses[category as keyof typeof responses]
      const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)]

      setMessages((prev) => [...prev, { type: "ai", content: randomResponse }])

      toast({
        title: "AI Response Generated",
        description: "I've provided suggestions based on your question.",
      })
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        { type: "ai", content: "I'm sorry, I couldn't process your request. Please try again." },
      ])

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get AI response. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
    setActiveTab("chat")
    setTimeout(() => {
      handleSend()
    }, 100)
  }

  const handleImprove = async () => {
    if (!sectionToImprove.trim()) return

    setImprovementLoading(true)

    try {
      // Simulate AI improvement with better responses
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const improvements = [
        `Here's an improved version of your content:

• Spearheaded development of microservices architecture serving 1M+ active users, resulting in 40% performance improvement and 99.9% uptime
• Implemented comprehensive automated testing suite with Jest and Cypress, reducing bug reports by 60% and accelerating deployment cycles by 50%
• Mentored cross-functional team of 5 junior developers through code reviews and pair programming, leading to 25% faster project delivery and improved code quality

Key improvements made:
✓ Added specific metrics and numbers
✓ Used strong action verbs
✓ Highlighted business impact
✓ Included technical details`,

        `Enhanced version with stronger impact:

• Architected and deployed cloud-native infrastructure on AWS supporting 500K+ daily transactions with 99.99% reliability
• Optimized database queries and implemented Redis caching strategy, achieving 50% reduction in API response times
• Led agile development practices and collaborated with product team to deliver 3 major features ahead of schedule, increasing user engagement by 35%

Improvements:
✓ Quantified achievements with specific metrics
✓ Demonstrated technical expertise
✓ Showed leadership and collaboration skills
✓ Connected work to business outcomes`,

        `Professional enhancement:

• Drove end-to-end product development for customer-facing web application used by 100K+ monthly active users
• Reduced system downtime by 80% through implementation of robust monitoring, alerting, and automated recovery systems
• Delivered high-impact features that contributed to $2M increase in annual recurring revenue through improved user experience

Changes made:
✓ Focused on outcomes rather than tasks
✓ Added financial impact
✓ Included scale and scope
✓ Used compelling action verbs`,
      ]

      const randomImprovement = improvements[Math.floor(Math.random() * improvements.length)]
      setImprovedContent(randomImprovement)

      // If callback is provided, send the improved content back
      if (onImproveContent) {
        onImproveContent(randomImprovement.split("\n").slice(1, 4).join("\n"))
      }

      toast({
        title: "Content Improved",
        description: "Your content has been enhanced with AI suggestions.",
      })
    } catch (error) {
      setImprovedContent("Sorry, I couldn't improve this content. Please try again.")
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to improve content. Please try again.",
      })
    } finally {
      setImprovementLoading(false)
    }
  }

  const handleAtsAnalysis = async () => {
    if (!jobDescription.trim() || !resumeContent.trim()) return

    setAtsLoading(true)

    try {
      // Simulate ATS analysis
      await new Promise((resolve) => setTimeout(resolve, 2500))

      const analysisResult = `🎯 ATS Compatibility Analysis

📊 Overall Match Score: 82%

✅ Strengths:
• Strong keyword alignment with job requirements
• Clear section headings and professional formatting  
• Quantified achievements with specific metrics
• Relevant technical skills properly highlighted
• ATS-friendly file format and structure

⚠️ Areas for Improvement:
• Missing keywords: "Agile methodology", "CI/CD pipeline", "Scrum"
• Consider adding more industry-specific certifications
• Include soft skills mentioned in job description: "leadership", "mentoring"
• Add relevant project management experience

📝 Specific Recommendations:
1. ✏️ Add "Agile development" and "Scrum methodology" to your experience section
2. 🛠️ Include "CI/CD pipeline implementation" in your technical skills
3. 👥 Mention "cross-functional team leadership" in your summary
4. 🎯 Use exact job title from posting in your objective (if applicable)
5. 📚 Consider adding relevant certifications (AWS, Azure, etc.)

💡 Pro Tips:
• Save resume as PDF unless ATS specifically requests Word format
• Use standard fonts (Arial, Calibri, Times New Roman)
• Avoid headers/footers, images, and complex formatting
• Include a skills section with exact keyword matches

This analysis will significantly improve your resume's chances of passing initial ATS screening and reaching human recruiters! 🚀`

      setAtsResult(analysisResult)

      toast({
        title: "ATS Analysis Complete",
        description: "Your resume has been analyzed for ATS compatibility.",
      })
    } catch (error) {
      setAtsResult("Sorry, I couldn't analyze the compatibility. Please try again.")
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze ATS compatibility. Please try again.",
      })
    } finally {
      setAtsLoading(false)
    }
  }

  return (
    <Card className={`h-full flex flex-col ${className || ""}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          Grok AI Resume Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pb-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="improve">Improve</TabsTrigger>
            <TabsTrigger value="ats">ATS Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col space-y-4">
            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-auto pr-1 max-h-72">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-3 rounded-lg bg-secondary text-secondary-foreground">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-sm">Analyzing and generating suggestions...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Quick actions:</p>
              <div className="grid grid-cols-1 gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto p-3 text-left"
                    onClick={suggestion.onClick}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="text-blue-600 mt-0.5 flex-shrink-0">{suggestion.icon}</div>
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{suggestion.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">{suggestion.description}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-2 mt-auto">
              <Input
                placeholder="Ask me anything about your resume..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                disabled={loading}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend} disabled={loading || !input.trim()}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="improve" className="flex-1 flex flex-col space-y-4">
            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <p className="text-sm font-medium">Paste content to improve:</p>
                <Textarea
                  placeholder="Paste a bullet point, job description, or any section from your resume..."
                  className="min-h-[100px] resize-none"
                  value={sectionToImprove}
                  onChange={(e) => setSectionToImprove(e.target.value)}
                />
              </div>

              <Button
                onClick={handleImprove}
                disabled={improvementLoading || !sectionToImprove.trim()}
                className="w-full"
              >
                {improvementLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enhancing content...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Improve Content
                  </>
                )}
              </Button>

              {improvedContent && (
                <div className="space-y-2 mt-4">
                  <p className="text-sm font-medium">Enhanced version:</p>
                  <div className="bg-secondary text-secondary-foreground p-3 rounded-lg text-sm whitespace-pre-wrap max-h-64 overflow-y-auto border">
                    {improvedContent}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        navigator.clipboard.writeText(improvedContent)
                        toast({
                          title: "Copied!",
                          description: "Enhanced content copied to clipboard.",
                        })
                      }}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Copy to clipboard
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ats" className="flex-1 flex flex-col space-y-4">
            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <p className="text-sm font-medium">Job Description:</p>
                <Textarea
                  placeholder="Paste the complete job description here..."
                  className="min-h-[80px] resize-none"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Your Resume Content:</p>
                <Textarea
                  placeholder="Paste your complete resume content here..."
                  className="min-h-[80px] resize-none"
                  value={resumeContent}
                  onChange={(e) => setResumeContent(e.target.value)}
                />
              </div>

              <Button
                onClick={handleAtsAnalysis}
                disabled={atsLoading || !jobDescription.trim() || !resumeContent.trim()}
                className="w-full"
              >
                {atsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing compatibility...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Analyze ATS Compatibility
                  </>
                )}
              </Button>

              {atsResult && (
                <div className="space-y-2 mt-4">
                  <p className="text-sm font-medium">Analysis Results:</p>
                  <div className="bg-secondary text-secondary-foreground p-3 rounded-lg text-sm whitespace-pre-wrap max-h-80 overflow-y-auto border">
                    {atsResult}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
