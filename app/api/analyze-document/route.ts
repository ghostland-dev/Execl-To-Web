import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyCPzgXCaWDtGq5asEAMFIZ3IZ3GGHt54y8")

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Read file content
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Get file extension and type
    const fileExtension = file.name.split(".").pop()?.toLowerCase()
    const fileType = getFileType(fileExtension || "")

    // Convert file to text for analysis (simplified)
    let textContent = ""

    if (fileType === "CSV" || fileExtension === "csv") {
      textContent = buffer.toString("utf-8")
    } else {
      // For other file types, we'll simulate content extraction
      textContent = `Sample content from ${file.name}`
    }

    // Analyze with Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
    Analyze this document content and provide a structured analysis for converting it to a web application:
    
    File: ${file.name}
    Type: ${fileType}
    Content preview: ${textContent.substring(0, 1000)}
    
    Please provide:
    1. File type and structure
    2. Detected columns/fields
    3. Data types for each field
    4. Suggested application type (CRM, inventory, forms, etc.)
    5. Recommended features
    6. Database schema suggestion
    
    Respond in JSON format.
    `

    let analysis
    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const analysisText = response.text()

      // Parse AI response (with fallback)
      try {
        // Try to extract JSON from the response
        const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          analysis = JSON.parse(jsonMatch[0])
        } else {
          throw new Error("No JSON found in response")
        }
      } catch (parseError) {
        console.log("AI Response:", analysisText)
        // Fallback analysis if AI response isn't valid JSON
        analysis = {
          fileType: fileType,
          fileName: file.name,
          size: file.size,
          columns: extractColumns(textContent),
          rowCount: countRows(textContent),
          structure: "Tabular data detected",
          suggestedAppType: "Data Management Application",
          features: ["CRUD operations", "Search & Filter", "Data Export", "User Management"],
          schema: generateSchema(textContent),
          aiAnalysis: analysisText.substring(0, 500) + "...",
        }
      }
    } catch (aiError) {
      console.error("Gemini AI Error:", aiError)
      // Fallback to basic analysis without AI
      analysis = {
        fileType: fileType,
        fileName: file.name,
        size: file.size,
        columns: extractColumns(textContent),
        rowCount: countRows(textContent),
        structure: "Document structure analyzed locally",
        suggestedAppType: "Custom Application",
        features: ["Data Management", "User Interface", "Export Functions"],
        schema: generateSchema(textContent),
        note: "Analysis completed with basic parsing (AI temporarily unavailable)",
      }
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error analyzing document:", error)
    return NextResponse.json({ error: "Failed to analyze document" }, { status: 500 })
  }
}

function getFileType(extension: string): string {
  const types: { [key: string]: string } = {
    xlsx: "Excel Spreadsheet",
    xls: "Excel Spreadsheet",
    csv: "CSV",
    docx: "Word Document",
    doc: "Word Document",
    pdf: "PDF Document",
  }
  return types[extension] || "Unknown"
}

function extractColumns(content: string): string[] {
  if (!content) return []

  const lines = content.split("\n")
  if (lines.length > 0) {
    return lines[0].split(",").map((col) => col.trim().replace(/"/g, ""))
  }
  return []
}

function countRows(content: string): number {
  if (!content) return 0
  return content.split("\n").length - 1 // Subtract header row
}

function generateSchema(content: string): any {
  const columns = extractColumns(content)
  const schema: { [key: string]: string } = {}

  columns.forEach((col) => {
    // Simple type inference
    if (col.toLowerCase().includes("email")) {
      schema[col] = "email"
    } else if (col.toLowerCase().includes("date")) {
      schema[col] = "date"
    } else if (col.toLowerCase().includes("price") || col.toLowerCase().includes("amount")) {
      schema[col] = "number"
    } else {
      schema[col] = "text"
    }
  })

  return schema
}
