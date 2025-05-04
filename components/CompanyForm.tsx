"use client"

import { Input } from "@/components/ui/input"
import { useState } from "react"

export function CompanyForm() {
  const [companyName, setCompanyName] = useState("")
  const [otherDetails, setOtherDetails] = useState("")

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
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
    </div>
  )
} 