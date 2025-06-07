"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Sparkles,
  FileText,
  Download,
  Users,
  BarChart3,
  Star,
  ArrowRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react"
import SplashScreen from "./splash-screen"
import { MobileMenu } from "@/components/mobile-menu"
import { UserAvatar } from "@/components/user-avatar"
import { AuthModal } from "@/components/auth-modal"
import { getSupabase } from "@/lib/supabase"

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const supabase = getSupabase()

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenSplash")
    if (hasSeen === "true") {
      setShowSplash(false)
    }
  }, [])

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }

    checkSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSplashComplete = () => {
    localStorage.setItem("hasSeenSplash", "true")
    setShowSplash(false)
  }

  const handleAuthSuccess = () => {
    setAuthModalOpen(false)
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  const features = [
    {
      icon: <Sparkles className="w-10 h-10 text-blue-500" />,
      title: "Grok AI Assistant",
      description:
        "Get intelligent suggestions powered by Grok AI for bullet points, skills, and job descriptions tailored to your industry.",
    },
    {
      icon: <FileText className="w-10 h-10 text-purple-500" />,
      title: "Professional Templates",
      description: "Choose from 20+ expertly designed templates optimized for ATS systems and different industries.",
    },
    {
      icon: <Download className="w-10 h-10 text-green-500" />,
      title: "Multiple Export Options",
      description: "Download as PDF, Word, or share with a custom link. Perfect formatting guaranteed every time.",
    },
    {
      icon: <Users className="w-10 h-10 text-orange-500" />,
      title: "Real-time Collaboration",
      description: "Share your resume with mentors, friends, or career coaches for instant feedback and suggestions.",
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-red-500" />,
      title: "Analytics & Tracking",
      description: "Track views, downloads, and engagement when you share your resume with potential employers.",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-teal-500" />,
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems with our built-in optimization tools.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      content: "ResumeAI Pro helped me land my dream job at Google. The AI suggestions were incredibly helpful!",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager",
      company: "Microsoft",
      content: "The templates are professional and the AI features saved me hours of work. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "UX Designer",
      company: "Apple",
      content: "Best resume builder I've used. The collaboration features made it easy to get feedback from mentors.",
      rating: 5,
    },
  ]

  const stats = [
    { number: "50,000+", label: "Resumes Created" },
    { number: "85%", label: "Success Rate" },
    { number: "4.9/5", label: "User Rating" },
    { number: "24/7", label: "AI Support" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">ResumeAI Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Reviews
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>

            {!user ? (
              <>
                <Button variant="outline" onClick={() => setAuthModalOpen(true)}>
                  Sign In
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/dashboard">Get Started Free</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <UserAvatar user={user} />
              </div>
            )}
          </nav>

          {/* Mobile menu */}
          <MobileMenu user={user} onAuthSuccess={handleAuthSuccess} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Grok AI
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Build Professional Resumes in Minutes
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Create stunning, ATS-friendly resumes with AI assistance, multiple templates, and real-time collaboration.
            Land your dream job faster with our intelligent resume builder.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              asChild
            >
              <Link href="/dashboard">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link href="/templates">View Templates</Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>5 free resumes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>AI-powered suggestions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-gray-50/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200">
            <Zap className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive suite of tools helps you create, optimize, and share professional resumes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border bg-card hover:shadow-lg transition-all duration-300 hover:shadow-primary/10"
            >
              <CardHeader className="pb-4">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-50/50 border-y border-border">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-50 text-green-600 hover:bg-green-100 border-green-200">
              <Star className="w-4 h-4 mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by professionals worldwide</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of professionals who landed their dream jobs with ResumeAI Pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed mb-4">"{testimonial.content}"</CardDescription>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 border-y border-border">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Perfect Resume?</h2>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Join thousands of professionals who landed their dream jobs with our AI-powered resume builder
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                asChild
              >
                <Link href="/dashboard">
                  Start Building Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                <Link href="/templates">Browse Templates</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ResumeAI Pro</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Build professional resumes with AI assistance. Created by Jayashree Rout with love and powered by
                cutting-edge technology.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Global Access</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-foreground transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground transition-colors">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 ResumeAI Pro by Jayashree Rout. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} onSuccess={handleAuthSuccess} />
    </div>
  )
}
