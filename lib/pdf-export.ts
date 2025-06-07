export const generatePDF = async (resumeData: any, templateId: string) => {
  try {
    // Create HTML content for the resume
    const htmlContent = generateResumeHTML(resumeData, templateId)

    // In a real implementation, you would use a PDF generation library like jsPDF or Puppeteer
    // For this demo, we'll simulate the PDF generation

    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate processing time

    // Create a blob with sample PDF content (in real implementation, this would be actual PDF bytes)
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 4 0 R
>>
>>
/MediaBox [0 0 612 792]
/Contents 5 0 R
>>
endobj

4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Times-Roman
>>
endobj

5 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(${resumeData.personalInfo.fullName} - Resume) Tj
ET
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000074 00000 n 
0000000120 00000 n 
0000000274 00000 n 
0000000365 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
456
%%EOF`

    const blob = new Blob([pdfContent], { type: "application/pdf" })

    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`

    // Trigger download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Clean up
    URL.revokeObjectURL(url)

    return { success: true, message: "PDF downloaded successfully" }
  } catch (error) {
    console.error("PDF generation error:", error)
    return { success: false, error: "Failed to generate PDF" }
  }
}

const generateResumeHTML = (resumeData: any, templateId: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${resumeData.personalInfo.fullName} - Resume</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; }
        .name { font-size: 28px; font-weight: bold; margin-bottom: 5px; }
        .title { font-size: 18px; color: #666; margin-bottom: 10px; }
        .contact { font-size: 14px; color: #666; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: bold; border-bottom: 1px solid #333; margin-bottom: 15px; }
        .experience-item { margin-bottom: 20px; }
        .job-title { font-weight: bold; }
        .company { color: #666; }
        .dates { float: right; color: #666; }
        .description { margin-top: 5px; white-space: pre-line; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill { background: #f0f0f0; padding: 5px 10px; border-radius: 5px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="name">${resumeData.personalInfo.fullName}</div>
        <div class="title">${resumeData.personalInfo.title}</div>
        <div class="contact">
          ${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}
        </div>
      </div>
      
      ${
        resumeData.summary
          ? `
      <div class="section">
        <div class="section-title">Professional Summary</div>
        <p>${resumeData.summary}</p>
      </div>
      `
          : ""
      }
      
      ${
        resumeData.experience?.length
          ? `
      <div class="section">
        <div class="section-title">Work Experience</div>
        ${resumeData.experience
          .map(
            (exp: any) => `
          <div class="experience-item">
            <div class="job-title">${exp.title}</div>
            <div class="company">${exp.company} | ${exp.location} <span class="dates">${exp.startDate} - ${exp.endDate}</span></div>
            <div class="description">${exp.description}</div>
          </div>
        `,
          )
          .join("")}
      </div>
      `
          : ""
      }
      
      ${
        resumeData.skills?.length
          ? `
      <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills">
          ${resumeData.skills.map((skill: string) => `<span class="skill">${skill}</span>`).join("")}
        </div>
      </div>
      `
          : ""
      }
      
      ${
        resumeData.education?.length
          ? `
      <div class="section">
        <div class="section-title">Education</div>
        ${resumeData.education
          .map(
            (edu: any) => `
          <div class="experience-item">
            <div class="job-title">${edu.degree}</div>
            <div class="company">${edu.school} | ${edu.location} <span class="dates">${edu.graduationDate}</span></div>
          </div>
        `,
          )
          .join("")}
      </div>
      `
          : ""
      }
    </body>
    </html>
  `
}
