"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Crown, Star, Search, Filter, FileText } from "lucide-react"

export default function Templates() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech and creative roles",
      category: "Professional",
      isPro: false,
      rating: 4.8,
      downloads: 1200,
      preview: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: "executive",
      name: "Executive Elite",
      description: "Sophisticated layout for senior management and C-level positions",
      category: "Executive",
      isPro: true,
      rating: 4.9,
      downloads: 850,
      preview: "bg-gradient-to-br from-gray-700 to-gray-900",
    },
    {
      id: "creative",
      name: "Creative Showcase",
      description: "Bold and artistic design for designers and creative professionals",
      category: "Creative",
      isPro: true,
      rating: 4.7,
      downloads: 950,
      preview: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      description: "Simple and elegant design that focuses on content",
      category: "Minimal",
      isPro: false,
      rating: 4.6,
      downloads: 1500,
      preview: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      id: "tech-pro",
      name: "Tech Professional",
      description: "Modern tech-focused design with clean lines and professional appeal",
      category: "Professional",
      isPro: false,
      rating: 4.7,
      downloads: 980,
      preview: "bg-gradient-to-br from-cyan-500 to-blue-500",
    },
    {
      id: "corporate",
      name: "Corporate Classic",
      description: "Traditional corporate design perfect for finance and consulting",
      category: "Executive",
      isPro: true,
      rating: 4.8,
      downloads: 720,
      preview: "bg-gradient-to-br from-slate-600 to-slate-800",
    },
    {
      id: "startup",
      name: "Startup Innovator",
      description: "Dynamic design for startup environments and entrepreneurial roles",
      category: "Creative",
      isPro: true,
      rating: 4.8,
      downloads: 650,
      preview: "bg-gradient-to-br from-orange-500 to-red-500",
    },
    {
      id: "academic",
      name: "Academic Scholar",
      description: "Traditional format perfect for academic and research positions",
      category: "Academic",
      isPro: true,
      rating: 4.5,
      downloads: 600,
      preview: "bg-gradient-to-br from-indigo-500 to-purple-600",
    },
    {
      id: "healthcare",
      name: "Healthcare Professional",
      description: "Clean, trustworthy design for medical and healthcare professionals",
      category: "Professional",
      isPro: false,
      rating: 4.6,
      downloads: 540,
      preview: "bg-gradient-to-br from-teal-500 to-cyan-500",
    },
    {
      id: "finance",
      name: "Finance Expert",
      description: "Professional design tailored for banking and financial services",
      category: "Executive",
      isPro: true,
      rating: 4.7,
      downloads: 480,
      preview: "bg-gradient-to-br from-emerald-600 to-green-700",
    },
    {
      id: "marketing",
      name: "Marketing Maven",
      description: "Creative yet professional design for marketing professionals",
      category: "Creative",
      isPro: false,
      rating: 4.5,
      downloads: 420,
      preview: "bg-gradient-to-br from-pink-500 to-rose-500",
    },
    {
      id: "engineering",
      name: "Engineering Excellence",
      description: "Technical and precise design for engineering professionals",
      category: "Professional",
      isPro: false,
      rating: 4.8,
      downloads: 380,
      preview: "bg-gradient-to-br from-blue-600 to-indigo-600",
    },
  ]

  const categories = ["All", "Professional", "Executive", "Creative", "Minimal", "Academic"]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
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
          <Badge variant="secondary" className="bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/30">
            <Crown className="w-4 h-4 mr-1" />
            Pro Plan
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Resume Templates</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose from our collection of expertly designed templates, optimized for ATS systems and crafted by
            professional designers. Each template is fully customizable and industry-specific.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-all duration-300 hover:shadow-primary/10">
              <CardHeader className="p-0">
                <div className={`h-48 ${template.preview} rounded-t-lg relative overflow-hidden`}>
                  {template.isPro && (
                    <Badge className="absolute top-3 right-3 bg-yellow-500 text-yellow-900">
                      <Crown className="w-3 h-3 mr-1" />
                      Pro
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-background/95 backdrop-blur-sm rounded-lg p-6 w-4/5 h-4/5 shadow-lg">
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                        <div className="h-2 bg-muted/60 rounded w-1/2"></div>
                        <div className="h-2 bg-muted/60 rounded w-2/3"></div>
                        <div className="mt-4 space-y-1">
                          <div className="h-2 bg-muted rounded"></div>
                          <div className="h-2 bg-muted/60 rounded w-4/5"></div>
                          <div className="h-2 bg-muted/60 rounded w-3/5"></div>
                        </div>
                        <div className="mt-4 space-y-1">
                          <div className="h-2 bg-muted rounded w-2/3"></div>
                          <div className="h-2 bg-muted/60 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardTitle className="text-lg mb-1">{template.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {template.rating}
                  </div>
                </div>
                <CardDescription className="mb-4 text-sm leading-relaxed">{template.description}</CardDescription>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">{template.downloads.toLocaleString()} downloads</span>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" asChild>
                    <Link href={`/editor?template=${template.id}`}>Use Template</Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Filter className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No templates found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-border">
          <h3 className="text-2xl font-bold mb-4">Need a Custom Template?</h3>
          <p className="text-lg mb-6 text-muted-foreground">
            Our AI can create a personalized template based on your industry and role
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Create Custom Template
          </Button>
        </div>
      </div>
    </div>
  )
}
