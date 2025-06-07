"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Plus,
  FileText,
  Search,
  MoreVertical,
  Copy,
  Download,
  Share2,
  Trash2,
  Crown,
  BarChart3,
  Settings,
  Loader2,
  Sparkles,
  Edit,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getSupabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { EnhancedAIAssistant } from "@/components/enhanced-ai-assistant"
import { UserAvatar } from "@/components/user-avatar"
import { toast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const router = useRouter()
  const supabase = getSupabase()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [showAI, setShowAI] = useState(false)

  const [resumes, setResumes] = useState([
    {
      id: 1,
      title: "Software Engineer Resume",
      template: "Modern",
      lastModified: "2 hours ago",
      views: 24,
      downloads: 5,
      status: "Published",
      isOwner: true,
    },
    {
      id: 2,
      title: "Product Manager CV",
      template: "Executive",
      lastModified: "1 day ago",
      views: 12,
      downloads: 2,
      status: "Draft",
      isOwner: true,
    },
    {
      id: 3,
      title: "Marketing Specialist",
      template: "Creative",
      lastModified: "3 days ago",
      views: 8,
      downloads: 1,
      status: "Published",
      isOwner: true,
    },
  ])

  const [stats, setStats] = useState({
    totalResumes: 3,
    remainingResumes: 2,
    totalViews: 44,
    viewsGrowth: "+12%",
    downloads: 8,
    downloadsGrowth: "+2",
    successRate: 18,
  })

  useEffect(() => {
    // Simulate realtime updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalViews: prev.totalViews + Math.floor(Math.random() * 3),
        downloads: prev.downloads + (Math.random() > 0.8 ? 1 : 0),
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function checkUser() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) throw error

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

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      if (!session?.user && event === "SIGNED_OUT") {
        router.push("/")
      }
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  const handleDeleteResume = (id: number) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id))
    setStats((prev) => ({
      ...prev,
      totalResumes: prev.totalResumes - 1,
      remainingResumes: prev.remainingResumes + 1,
    }))
    toast({
      title: "Resume deleted",
      description: "Your resume has been successfully deleted.",
    })
  }

  const handleDuplicateResume = (resume: any) => {
    const newResume = {
      ...resume,
      id: Date.now(),
      title: `${resume.title} (Copy)`,
      status: "Draft",
      lastModified: "Just now",
      views: 0,
      downloads: 0,
    }
    setResumes((prev) => [newResume, ...prev])
    setStats((prev) => ({
      ...prev,
      totalResumes: prev.totalResumes + 1,
      remainingResumes: Math.max(0, prev.remainingResumes - 1),
    }))
    toast({
      title: "Resume duplicated",
      description: "A copy of your resume has been created.",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">ResumeAI Pro</span>
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-yellow-50 text-yellow-600 border-yellow-200">
              <Crown className="w-4 h-4 mr-1" />
              Pro Plan
            </Badge>
            {user && <UserAvatar user={user} />}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user ? user.user_metadata?.full_name || user.email?.split("@")[0] : "Guest"}!
          </h1>
          <p className="text-muted-foreground">Manage your resumes and track their performance</p>
          <p className="text-sm text-muted-foreground mt-2">
            You have <span className="font-semibold text-blue-600">{stats.remainingResumes}</span> resume credits
            remaining
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalResumes}</div>
              <p className="text-xs text-muted-foreground">{stats.remainingResumes} remaining</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews}</div>
              <p className="text-xs text-green-600">{stats.viewsGrowth} from last week</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.downloads}</div>
              <p className="text-xs text-blue-600">{stats.downloadsGrowth} this week</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.successRate}%</div>
              <p className="text-xs text-muted-foreground">Download to view ratio</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/editor">
                  <Plus className="w-4 h-4 mr-2" />
                  New Resume
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/templates">Browse Templates</Link>
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAI(!showAI)}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {showAI ? "Hide AI Assistant" : "Show AI Assistant"}
            </Button>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search resumes..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* AI Assistant (Collapsible) */}
        {showAI && (
          <div className="mb-8">
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-6">
                <EnhancedAIAssistant />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-1 truncate">{resume.title}</CardTitle>
                    <CardDescription className="text-sm">Template: {resume.template}</CardDescription>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{resume.lastModified}</span>
                      <Badge variant={resume.status === "Published" ? "default" : "secondary"} className="text-xs">
                        {resume.status}
                      </Badge>
                    </div>
                  </div>
                  {resume.isOwner && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/editor/${resume.id}`} className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateResume(resume)}>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Export</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          <span>Share</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => handleDeleteResume(resume.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    {resume.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {resume.downloads} downloads
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Resume Card */}
          <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Create New Resume</h3>
              <p className="text-sm text-muted-foreground mb-4">Start building your next professional resume</p>
              <Button asChild>
                <Link href="/editor">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
