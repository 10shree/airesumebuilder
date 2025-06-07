"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles, Send, Lightbulb, TrendingUp, Target } from "lucide-react"

export function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      content:
        "Hi! I'm your AI resume assistant. I can help you improve your resume content, suggest better bullet points, and optimize for specific job roles. What would you like to work on?",
    },
  ])
  const [input, setInput] = useState("")

  const suggestions = [
    {
      icon: <Lightbulb className="w-4 h-4" />,
      title: "Improve bullet points",
      description: "Make your achievements more impactful",
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      title: "Optimize for ATS",
      description: "Ensure your resume passes screening systems",
    },
    {
      icon: <Target className="w-4 h-4" />,
      title: "Tailor for job role",
      description: "Customize content for specific positions",
    },
  ]

  const handleSend = () => {
    if (!input.trim()) return

    setMessages((prev) => [...prev, { type: "user", content: input }])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content:
            "I can help you improve that section. Here are some suggestions based on best practices for your industry...",
        },
      ])
    }, 1000)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          AI Resume Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 space-y-4 mb-4 overflow-auto">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestions */}
        <div className="space-y-2 mb-4">
          <p className="text-sm font-medium text-gray-700">Quick actions:</p>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <Button key={index} variant="outline" size="sm" className="w-full justify-start h-auto p-3">
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-0.5">{suggestion.icon}</div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{suggestion.title}</div>
                    <div className="text-xs text-gray-500">{suggestion.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything about your resume..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button size="icon" onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
