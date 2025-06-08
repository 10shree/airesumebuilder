"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileText, Share2, Loader2 } from "lucide-react"
import { generatePDF } from "@/lib/pdf-export"
import { toast } from "@/components/ui/use-toast"
  import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface ExportOptionsProps {
  resumeId: string
  resumeName: string
  resumeData?: any
  templateId?: string
}

export function ExportOptions({ resumeId, resumeName, resumeData, templateId = "modern" }: ExportOptionsProps) {
  const [loading, setLoading] = useState<string | null>(null)



const handlePDFExport = async () => {
  setLoading("pdf")

  const resumeElement = document.getElementById("resume-preview")
  if (!resumeElement) {
    toast({
      variant: "destructive",
      title: "Export Failed",
      description: "Resume preview not found.",
    })
    setLoading(null)
    return
  }

  try {
    const canvas = await html2canvas(resumeElement, {
      scale: 2, // for better quality
    })
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pageWidth
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    let position = 0

    if (pdfHeight < pageHeight) {
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    } else {
      // handle multi-page content
      let heightLeft = pdfHeight
      while (heightLeft > 0) {
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight)
        heightLeft -= pageHeight
        if (heightLeft > 0) {
          pdf.addPage()
          position = 0 - (pdfHeight - heightLeft)
        }
      }
    }

    pdf.save(`${resumeName || "resume"}.pdf`)

    toast({
      title: "PDF Downloaded",
      description: "Your resume has been downloaded successfully.",
    })
  } catch (error) {
    console.error("PDF export error:", error)
    toast({
      variant: "destructive",
      title: "Export Failed",
      description: "Failed to generate PDF. Please try again.",
    })
  } finally {
    setLoading(null)
  }
}


  const handleWordExport = async () => {
    setLoading("word")

    try {
      // Simulate Word export
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create a simple RTF file (Rich Text Format) that can be opened by Word
      const rtfContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}
\\f0\\fs24 ${resumeData?.personalInfo?.fullName || "Resume"}\\par
\\fs18 ${resumeData?.personalInfo?.title || ""}\\par
\\par
${resumeData?.personalInfo?.email || ""} | ${resumeData?.personalInfo?.phone || ""} | ${resumeData?.personalInfo?.location || ""}\\par
\\par
${resumeData?.summary ? `Professional Summary\\par ${resumeData.summary}\\par\\par` : ""}
${resumeData?.experience?.length ? `Work Experience\\par ${resumeData.experience.map((exp: any) => `${exp.title} at ${exp.company}\\par ${exp.description}\\par\\par`).join("")}` : ""}
}`

      const blob = new Blob([rtfContent], { type: "application/rtf" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${resumeData?.personalInfo?.fullName?.replace(/\s+/g, "_") || "Resume"}.rtf`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Word Document Downloaded",
        description: "Your resume has been downloaded as a Word document.",
      })
    } catch (error) {
      console.error("Word export error:", error)
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Failed to generate Word document. Please try again.",
      })
    } finally {
      setLoading(null)
    }
  }

  const handleShare = async () => {
    setLoading("share")

    try {
      // Generate shareable link
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const shareUrl = `${window.location.origin}/resume/${resumeId}`

      if (navigator.share) {
        await navigator.share({
          title: resumeName,
          text: "Check out my resume",
          url: shareUrl,
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareUrl)
        toast({
          title: "Link Copied",
          description: "Shareable link has been copied to your clipboard.",
        })
      }
    } catch (error) {
      console.error("Share error:", error)
      toast({
        variant: "destructive",
        title: "Share Failed",
        description: "Failed to share resume. Please try again.",
      })
    } finally {
      setLoading(null)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" disabled={loading !== null}>
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
          {loading ? `${loading.charAt(0).toUpperCase()}${loading.slice(1)}...` : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handlePDFExport} disabled={loading !== null}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Download PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleWordExport} disabled={loading !== null}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Download Word</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShare} disabled={loading !== null}>
          <Share2 className="mr-2 h-4 w-4" />
          <span>Share Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
