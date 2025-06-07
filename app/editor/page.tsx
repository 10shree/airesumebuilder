"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Save,
  Sparkles,
  Plus,
  GripVertical,
  Trash2,
  Eye,
  FileText,
  User,
  Briefcase,
  Code,
  GraduationCap,
  Award,
  Loader2,
  X,
  Wand2,
} from "lucide-react"
import { EnhancedAIAssistant } from "@/components/enhanced-ai-assistant"
import { ExportOptions } from "@/components/export-options"
import { getSupabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function ResumeEditor() {
  const router = useRouter()
  const supabase = getSupabase()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [showAI, setShowAI] = useState(false)
  const [aiImproving, setAiImproving] = useState<string | null>(null)

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "John Doe",
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe",
      website: "johndoe.dev",
      title: "Senior Software Engineer",
    },
    summary:
      "Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering scalable solutions and leading cross-functional teams.",
    experience: [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Corp",
        location: "San Francisco, CA",
        startDate: "2022",
        endDate: "Present",
        description:
          "• Led development of microservices architecture serving 1M+ users\n• Improved application performance by 40% through optimization\n• Mentored 3 junior developers and conducted code reviews",
      },
      {
        id: 2,
        title: "Software Engineer",
        company: "StartupXYZ",
        location: "San Francisco, CA",
        startDate: "2020",
        endDate: "2022",
        description:
          "• Built responsive web applications using React and TypeScript\n• Implemented CI/CD pipelines reducing deployment time by 60%\n• Collaborated with design team to improve user experience",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        location: "Berkeley, CA",
        graduationDate: "2020",
        gpa: "3.8",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "Git"],
    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB",
        technologies: ["React", "Node.js", "MongoDB"],
        link: "https://github.com/johndoe/ecommerce",
      },
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023",
      },
    ],
  })

  const [selectedTemplate, setSelectedTemplate] = useState("modern")

  const templates = [
    { id: "modern", name: "Modern", color: "bg-gradient-to-br from-blue-500 to-blue-600", category: "Professional" },
    { id: "executive", name: "Executive", color: "bg-gradient-to-br from-gray-700 to-gray-900", category: "Executive" },
    { id: "creative", name: "Creative", color: "bg-gradient-to-br from-purple-500 to-pink-500", category: "Creative" },
    { id: "minimal", name: "Minimal", color: "bg-gradient-to-br from-green-500 to-emerald-500", category: "Minimal" },
    { id: "tech", name: "Tech Pro", color: "bg-gradient-to-br from-cyan-500 to-blue-500", category: "Professional" },
    {
      id: "corporate",
      name: "Corporate",
      color: "bg-gradient-to-br from-slate-600 to-slate-800",
      category: "Executive",
    },
    { id: "startup", name: "Startup", color: "bg-gradient-to-br from-orange-500 to-red-500", category: "Creative" },
    {
      id: "academic",
      name: "Academic",
      color: "bg-gradient-to-br from-indigo-500 to-purple-600",
      category: "Academic",
    },
  ]

  useEffect(() => {
    async function checkUser() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)
        }
      } catch (error) {
        console.error("Error checking auth:", error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [supabase])

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const removeExperience = (id: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: "",
      school: "",
      location: "",
      graduationDate: "",
      gpa: "",
    }
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: "",
      description: "",
      technologies: [],
      link: "",
    }
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const addCertification = () => {
    const newCert = {
      id: Date.now(),
      name: "",
      issuer: "",
      date: "",
    }
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }))
  }

  const handleAIImprove = async (section: string, content: string) => {
    setAiImproving(section)

    // Simulate AI improvement
    setTimeout(() => {
      // In a real implementation, this would call the Grok AI API
      setAiImproving(null)
    }, 2000)
  }

  const handleSave = async () => {
    setSaving(true)

    // Simulate saving
    setTimeout(() => {
      setSaving(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg font-medium">Loading editor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ResumeAI Pro</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAI(!showAI)}
              className="bg-blue-950/30 hover:bg-blue-900/40 text-blue-400 border-blue-800"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {showAI ? "Hide AI" : "AI Assistant"}
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <ExportOptions
              resumeId="1"
              resumeName="Software Engineer Resume"
              resumeData={resumeData}
              templateId={selectedTemplate}
            />
            <Button size="sm" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Editor Panel */}
          <div className={`${showAI ? "lg:col-span-6" : "lg:col-span-8"} space-y-6`}>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="personal" className="text-xs">
                  Personal
                </TabsTrigger>
                <TabsTrigger value="experience" className="text-xs">
                  Experience
                </TabsTrigger>
                <TabsTrigger value="education" className="text-xs">
                  Education
                </TabsTrigger>
                <TabsTrigger value="skills" className="text-xs">
                  Skills
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-xs">
                  Projects
                </TabsTrigger>
                <TabsTrigger value="template" className="text-xs">
                  Template
                </TabsTrigger>
              </TabsList>

              {/* Template Selection */}
              <TabsContent value="template" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Choose Template
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {templates.map((template) => (
                        <div
                          key={template.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedTemplate === template.id
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-muted-foreground"
                          }`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <div className={`w-full h-20 ${template.color} rounded mb-3`}></div>
                          <p className="text-sm font-medium text-center">{template.name}</p>
                          <p className="text-xs text-muted-foreground text-center">{template.category}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Personal Information */}
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Personal Information
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAIImprove("personal", JSON.stringify(resumeData.personalInfo))}
                        disabled={aiImproving === "personal"}
                      >
                        {aiImproving === "personal" ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Wand2 className="w-4 h-4 mr-2" />
                        )}
                        AI Enhance
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, fullName: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="title">Professional Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Senior Software Engineer"
                          value={resumeData.personalInfo.title}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, title: e.target.value },
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, email: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, phone: e.target.value },
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.personalInfo.location}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, location: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.personalInfo.linkedin}
                          onChange={(e) =>
                            setResumeData((prev) => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, linkedin: e.target.value },
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="website">Website/Portfolio</Label>
                      <Input
                        id="website"
                        value={resumeData.personalInfo.website}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, website: e.target.value },
                          }))
                        }
                      />
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAIImprove("summary", resumeData.summary)}
                          disabled={aiImproving === "summary"}
                        >
                          {aiImproving === "summary" ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Sparkles className="w-4 h-4 mr-2" />
                          )}
                          AI Enhance
                        </Button>
                      </div>
                      <Textarea
                        id="summary"
                        placeholder="Write a compelling summary of your professional background..."
                        value={resumeData.summary}
                        onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
                        className="min-h-[120px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Work Experience */}
              <TabsContent value="experience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        Work Experience
                      </div>
                      <Button size="sm" onClick={addExperience}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id} className="border border-border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GripVertical className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">Experience {index + 1}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAIImprove(`experience-${exp.id}`, exp.description)}
                              disabled={aiImproving === `experience-${exp.id}`}
                            >
                              {aiImproving === `experience-${exp.id}` ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              ) : (
                                <Sparkles className="w-4 h-4 mr-2" />
                              )}
                              AI Improve
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => removeExperience(exp.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Job Title</Label>
                            <Input
                              value={exp.title}
                              onChange={(e) => {
                                const newExp = resumeData.experience.map((item) =>
                                  item.id === exp.id ? { ...item, title: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, experience: newExp }))
                              }}
                            />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => {
                                const newExp = resumeData.experience.map((item) =>
                                  item.id === exp.id ? { ...item, company: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, experience: newExp }))
                              }}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Location</Label>
                            <Input
                              value={exp.location}
                              onChange={(e) => {
                                const newExp = resumeData.experience.map((item) =>
                                  item.id === exp.id ? { ...item, location: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, experience: newExp }))
                              }}
                            />
                          </div>
                          <div>
                            <Label>Start Date</Label>
                            <Input
                              placeholder="MM/YYYY"
                              value={exp.startDate}
                              onChange={(e) => {
                                const newExp = resumeData.experience.map((item) =>
                                  item.id === exp.id ? { ...item, startDate: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, experience: newExp }))
                              }}
                            />
                          </div>
                          <div>
                            <Label>End Date</Label>
                            <Input
                              placeholder="MM/YYYY or Present"
                              value={exp.endDate}
                              onChange={(e) => {
                                const newExp = resumeData.experience.map((item) =>
                                  item.id === exp.id ? { ...item, endDate: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, experience: newExp }))
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description & Achievements</Label>
                          <Textarea
                            placeholder="• Describe your responsibilities and achievements..."
                            value={exp.description}
                            onChange={(e) => {
                              const newExp = resumeData.experience.map((item) =>
                                item.id === exp.id ? { ...item, description: e.target.value } : item,
                              )
                              setResumeData((prev) => ({ ...prev, experience: newExp }))
                            }}
                            className="min-h-[120px]"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education */}
              <TabsContent value="education" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        Education
                      </div>
                      <Button size="sm" onClick={addEducation}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Education
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id} className="border border-border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Education {index + 1}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const newEdu = resumeData.education.filter((item) => item.id !== edu.id)
                              setResumeData((prev) => ({ ...prev, education: newEdu }))
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Degree</Label>
                            <Input
                              placeholder="e.g., Bachelor of Science"
                              value={edu.degree}
                              onChange={(e) => {
                                const newEdu = resumeData.education.map((item) =>
                                  item.id === edu.id ? { ...item, degree: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, education: newEdu }))
                              }}
                            />
                          </div>
                          <div>
                            <Label>School</Label>
                            <Input
                              placeholder="University name"
                              value={edu.school}
                              onChange={(e) => {
                                const newEdu = resumeData.education.map((item) =>
                                  item.id === edu.id ? { ...item, school: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, education: newEdu }))
                              }}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Location</Label>
                            <Input
                              placeholder="City, State"
                              value={edu.location}
                              onChange={(e) => {
                                const newEdu = resumeData.education.map((item) =>
                                  item.id === edu.id ? { ...item, location: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, education: newEdu }))
                              }}
                            />
                          </div>
                          <div>
                            <Label>Graduation Date</Label>
                            <Input
                              placeholder="YYYY"
                              value={edu.graduationDate}
                              onChange={(e) => {
                                const newEdu = resumeData.education.map((item) =>
                                  item.id === edu.id ? { ...item, graduationDate: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, education: newEdu }))
                              }}
                            />
                          </div>
                          <div>
                            <Label>GPA (Optional)</Label>
                            <Input
                              placeholder="3.8"
                              value={edu.gpa}
                              onChange={(e) => {
                                const newEdu = resumeData.education.map((item) =>
                                  item.id === edu.id ? { ...item, gpa: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, education: newEdu }))
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills */}
              <TabsContent value="skills" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Skills & Technologies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resumeData.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-2 px-3 py-1">
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:text-destructive transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addSkill()
                          }
                        }}
                      />
                      <Button onClick={addSkill} disabled={!newSkill.trim()}>
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Projects
                      </div>
                      <Button size="sm" onClick={addProject}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.projects.map((project, index) => (
                      <div key={project.id} className="border border-border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Project {index + 1}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const newProjects = resumeData.projects.filter((item) => item.id !== project.id)
                              setResumeData((prev) => ({ ...prev, projects: newProjects }))
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Project Name</Label>
                            <Input
                              placeholder="Project title"
                              value={project.name}
                              onChange={(e) => {
                                const newProjects = resumeData.projects.map((item) =>
                                  item.id === project.id ? { ...item, name: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, projects: newProjects }))
                              }}
                            />
                          </div>
                          <div>
                            <Label>Project Link</Label>
                            <Input
                              placeholder="https://github.com/..."
                              value={project.link}
                              onChange={(e) => {
                                const newProjects = resumeData.projects.map((item) =>
                                  item.id === project.id ? { ...item, link: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, projects: newProjects }))
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            placeholder="Describe your project..."
                            value={project.description}
                            onChange={(e) => {
                              const newProjects = resumeData.projects.map((item) =>
                                item.id === project.id ? { ...item, description: e.target.value } : item,
                              )
                              setResumeData((prev) => ({ ...prev, projects: newProjects }))
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Certifications
                      </div>
                      <Button size="sm" onClick={addCertification}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certification
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.certifications.map((cert, index) => (
                      <div key={cert.id} className="border border-border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Certification {index + 1}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const newCerts = resumeData.certifications.filter((item) => item.id !== cert.id)
                              setResumeData((prev) => ({ ...prev, certifications: newCerts }))
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Certification Name</Label>
                            <Input
                              placeholder="Certification title"
                              value={cert.name}
                              onChange={(e) => {
                                const newCerts = resumeData.certifications.map((item) =>
                                  item.id === cert.id ? { ...item, name: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, certifications: newCerts }))
                              }}
                            />
                          </div>
                          <div>
                            <Label>Issuing Organization</Label>
                            <Input
                              placeholder="Organization name"
                              value={cert.issuer}
                              onChange={(e) => {
                                const newCerts = resumeData.certifications.map((item) =>
                                  item.id === cert.id ? { ...item, issuer: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, certifications: newCerts }))
                              }}
                            />
                          </div>
                          <div>
                            <Label>Date Obtained</Label>
                            <Input
                              placeholder="YYYY"
                              value={cert.date}
                              onChange={(e) => {
                                const newCerts = resumeData.certifications.map((item) =>
                                  item.id === cert.id ? { ...item, date: e.target.value } : item,
                                )
                                setResumeData((prev) => ({ ...prev, certifications: newCerts }))
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Assistant Panel */}
          {showAI && (
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <EnhancedAIAssistant />
              </div>
            </div>
          )}

          {/* Preview Panel */}
          <div className={`${showAI ? "lg:col-span-3" : "lg:col-span-4"} lg:sticky lg:top-24 lg:h-fit`}>
            <Card className="h-[600px] lg:h-[800px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full p-2 lg:p-6">
                <div className="w-full h-full bg-white border border-border rounded-lg p-3 lg:p-6 overflow-auto shadow-inner">
                  {/* Resume Preview */}
                  <div className="space-y-4 lg:space-y-6 text-xs lg:text-sm max-w-full">
                    {/* Header */}
                    <div className="text-center border-b border-gray-200 pb-3 lg:pb-4">
                      <h1 className="text-xl lg:text-2xl font-bold text-gray-900 break-words">
                        {resumeData.personalInfo.fullName}
                      </h1>
                      <p className="text-base lg:text-lg text-gray-600 mt-1 break-words">
                        {resumeData.personalInfo.title}
                      </p>
                      <div className="text-xs lg:text-sm text-gray-600 mt-2 space-y-1">
                        <p className="break-all">
                          {resumeData.personalInfo.email} • {resumeData.personalInfo.phone}
                        </p>
                        <p className="break-words">{resumeData.personalInfo.location}</p>
                        <p className="break-all">
                          {resumeData.personalInfo.linkedin} • {resumeData.personalInfo.website}
                        </p>
                      </div>
                    </div>

                    {/* Summary */}
                    {resumeData.summary && (
                      <div>
                        <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">Professional Summary</h2>
                        <p className="text-xs lg:text-sm text-gray-700 leading-relaxed">{resumeData.summary}</p>
                      </div>
                    )}

                    {/* Experience */}
                    {resumeData.experience.length > 0 && (
                      <div>
                        <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-3">Work Experience</h2>
                        <div className="space-y-3 lg:space-y-4">
                          {resumeData.experience.map((exp) => (
                            <div key={exp.id}>
                              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-1">
                                <div className="flex-1">
                                  <h3 className="font-medium text-gray-900 break-words">{exp.title}</h3>
                                  <p className="text-xs lg:text-sm text-gray-600 break-words">
                                    {exp.company} • {exp.location}
                                  </p>
                                </div>
                                <p className="text-xs lg:text-sm text-gray-500 mt-1 lg:mt-0 lg:ml-4 whitespace-nowrap">
                                  {exp.startDate} - {exp.endDate}
                                </p>
                              </div>
                              <div className="text-xs lg:text-sm text-gray-700 whitespace-pre-line break-words">
                                {exp.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {resumeData.education.length > 0 && (
                      <div>
                        <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-3">Education</h2>
                        <div className="space-y-2">
                          {resumeData.education.map((edu) => (
                            <div key={edu.id}>
                              <h3 className="font-medium text-gray-900 break-words">{edu.degree}</h3>
                              <p className="text-xs lg:text-sm text-gray-600 break-words">
                                {edu.school} • {edu.location}
                              </p>
                              <p className="text-xs lg:text-sm text-gray-500">
                                {edu.graduationDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {resumeData.skills.length > 0 && (
                      <div>
                        <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-1 lg:gap-2">
                          {resumeData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs lg:text-sm rounded break-words"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {resumeData.projects && resumeData.projects.length > 0 && (
                      <div>
                        <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-3">Projects</h2>
                        <div className="space-y-3">
                          {resumeData.projects.map((project) => (
                            <div key={project.id}>
                              <h3 className="font-medium text-gray-900 break-words">{project.name}</h3>
                              <p className="text-xs lg:text-sm text-gray-700 break-words">{project.description}</p>
                              {project.link && (
                                <p className="text-xs lg:text-sm text-blue-600 break-all">{project.link}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    {resumeData.certifications && resumeData.certifications.length > 0 && (
                      <div>
                        <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-3">Certifications</h2>
                        <div className="space-y-2">
                          {resumeData.certifications.map((cert) => (
                            <div key={cert.id}>
                              <h3 className="font-medium text-gray-900 break-words">{cert.name}</h3>
                              <p className="text-xs lg:text-sm text-gray-600 break-words">
                                {cert.issuer} • {cert.date}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
