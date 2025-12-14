"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle } from "lucide-react"

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await fetch("/api/order",{method:"POST",body:JSON.stringify(formState)}) 
     console.log(formState)
  
  
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-netlify="true">
      {isSubmitted ? (
        <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3 text-green-700">
          <CheckCircle className="h-5 w-5" />
          <p>Thank you for your message! We'll get back to you soon.</p>
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" value={formState.subject} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" rows={5} value={formState.message} onChange={handleChange} required />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
