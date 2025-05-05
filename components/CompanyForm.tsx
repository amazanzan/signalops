"use client"

import { Input } from "@/components/ui/input"
import { useState } from "react"

export function CompanyForm() {
  const [companyName, setCompanyName] = useState("")
  const [otherDetails, setOtherDetails] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/llama", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Find the top 5 feature requests related to ${companyName}.`,
        }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json()
      console.log('API Response:', data); // Log the full response
      
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error('Invalid response format: results is not an array');
      }
      
      setResults(data.results)
    } catch (error) {
      console.error("Error fetching from Llama API:", error)
      setResults([]) // Reset results on error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <div className="space-y-2">
        <label htmlFor="companyName" className="text-sm font-medium">
          Company Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="companyName"
          placeholder="Enter your company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="otherDetails" className="text-sm font-medium">
          Disambiguating Information
        </label>
        <Input
          id="otherDetails"
          placeholder="Use this field if your company has a common name"
          value={otherDetails}
          onChange={(e) => setOtherDetails(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? "Loading..." : "Find Feature Requests"}
      </button>

      {results?.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold">Top Feature Requests:</h2>
          <ul className="list-disc list-inside space-y-2">
            {results.map((result, index) => (
              <li key={index} className="text-sm">{result}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  )
} 