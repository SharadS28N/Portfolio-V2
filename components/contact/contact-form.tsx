"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MagneticButton } from "@/components/magnetic-button"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("https://formspree.io/f/xvggvqvr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">Send a Message</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name field */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary ${
              errors.name ? "border-destructive" : "border-border"
            }`}
            placeholder="Full Name"
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-destructive"
            >
              {errors.name}
            </motion.p>
          )}
        </div>

        {/* Email field */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary ${
              errors.email ? "border-destructive" : "border-border"
            }`}
            placeholder="example@example.com"
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-destructive"
            >
              {errors.email}
            </motion.p>
          )}
        </div>

        {/* Subject field */}
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary ${
              errors.subject ? "border-destructive" : "border-border"
            }`}
            placeholder="Project Inquiry"
          />
          {errors.subject && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-destructive"
            >
              {errors.subject}
            </motion.p>
          )}
        </div>

        {/* Message field */}
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`w-full resize-none rounded-lg border bg-background px-4 py-3 text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary ${
              errors.message ? "border-destructive" : "border-border"
            }`}
            placeholder="Tell me about your project..."
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-destructive"
            >
              {errors.message}
            </motion.p>
          )}
        </div>

        {/* Submit button */}
        <MagneticButton className="w-full">
          <button
            type="submit"
            disabled={isSubmitting}
            data-cursor="hover"
            data-cursor-text="Send"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send Message
              </>
            )}
          </button>
        </MagneticButton>

        {/* Status messages */}
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-lg bg-green-500/10 p-4 text-green-500"
          >
            <CheckCircle className="h-5 w-5" />
            <p>Thank you! Your message has been sent successfully.</p>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-lg bg-destructive/10 p-4 text-destructive"
          >
            <AlertCircle className="h-5 w-5" />
            <p>Something went wrong. Please try again later.</p>
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
