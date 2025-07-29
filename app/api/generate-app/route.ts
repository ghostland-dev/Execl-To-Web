"use client"

import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "***REMOVED***")

export async function POST(request: NextRequest) {
  try {
    const { analysis, config } = await request.json()

    // Generate application code using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
    Generate a complete React/Next.js web application based on this analysis:
    
    Analysis: ${JSON.stringify(analysis)}
    Config: ${JSON.stringify(config)}
    
    Create:
    1. A complete React component for data management
    2. CRUD operations (Create, Read, Update, Delete)
    3. Search and filter functionality
    4. Responsive design with Tailwind CSS
    5. Form validation
    6. Data export functionality
    
    The app should be production-ready and follow best practices.
    Include proper TypeScript types and error handling.
    
    Respond with the complete component code.
    `

    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      const generatedCode = response.text()

      // In a real implementation, you would:
      // 1. Create a new project/database
      // 2. Deploy the generated code
      // 3. Set up the database schema
      // 4. Return the live URL

      // For now, we'll simulate the process
      const appId = `app_${Date.now()}`
      const appUrl = `https://${appId}.refineryai.com`

      // Store the generated app data (in a real app, this would go to a database)
      const appData = {
        id: appId,
        name: config.name,
        description: config.description,
        code: generatedCode,
        schema: analysis.schema,
        createdAt: new Date().toISOString(),
        url: appUrl,
        status: "deployed",
      }

      return NextResponse.json({
        success: true,
        appId,
        appUrl,
        appData,
      })
    } catch (aiError) {
      console.error("Gemini AI Error:", aiError)

      // Fallback: Generate a basic app structure without AI
      const appId = `app_${Date.now()}`
      const appUrl = `https://${appId}.refineryai.com`

      const basicAppCode = `
// Generated Application: ${config.name}
import React, { useState } from 'react'

export default function ${config.name.replace(/\s+/g, "")}App() {
  const [data, setData] = useState([])
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">${config.name}</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p>Your application has been generated successfully!</p>
          <p className="text-gray-600 mt-2">${config.description}</p>
        </div>
      </div>
    </div>
  )
}
`

      const appData = {
        id: appId,
        name: config.name,
        description: config.description,
        code: basicAppCode,
        schema: analysis.schema,
        createdAt: new Date().toISOString(),
        url: appUrl,
        status: "deployed",
      }

      return NextResponse.json({
        success: true,
        appId,
        appUrl,
        appData,
        note: "Application generated with basic template (AI temporarily unavailable)",
      })
    }
  } catch (error) {
    console.error("Error generating app:", error)
    return NextResponse.json({ error: "Failed to generate application" }, { status: 500 })
  }
}
