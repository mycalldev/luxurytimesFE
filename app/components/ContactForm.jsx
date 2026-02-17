'use client'

import React, { useState, useRef, useCallback } from 'react'
import Button from './Button'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  // Sync React state with actual DOM values to catch browser autofill
  // that may not trigger onChange events
  const syncFormState = useCallback(() => {
    if (!formRef.current) return null
    const inputs = formRef.current.elements
    const synced = {
      name: inputs.name?.value || '',
      email: inputs.email?.value || '',
      phone: inputs.phone?.value || '',
      subject: inputs.subject?.value || '',
      message: inputs.message?.value || '',
    }
    setFormData(synced)
    return synced
  }, [])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Sync with DOM values first to capture any browser autofill
    const currentData = syncFormState() || formData

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! We\'ll get back to you as soon as possible.',
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again later.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.formContainer}>
      <form ref={formRef} onSubmit={handleSubmit} className={styles.contactForm} autoComplete="on" noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Full Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="Enter your full name"
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className={styles.errorMessage} role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="Enter your email address"
            aria-required="true"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className={styles.errorMessage} role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Phone Number <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            placeholder="Enter your phone number"
            aria-required="true"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <span id="phone-error" className={styles.errorMessage} role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subject" className={styles.label}>
            Subject <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            autoComplete="off"
            value={formData.subject}
            onChange={handleChange}
            className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
            placeholder="What is this regarding?"
            aria-required="true"
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          {errors.subject && (
            <span id="subject-error" className={styles.errorMessage} role="alert">
              {errors.subject}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Message <span className={styles.required}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
            placeholder="Tell us how we can help you..."
            aria-required="true"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span id="message-error" className={styles.errorMessage} role="alert">
              {errors.message}
            </span>
          )}
        </div>

        {submitStatus && (
          <div
            className={`${styles.statusMessage} ${
              submitStatus.type === 'success' ? styles.statusSuccess : styles.statusError
            }`}
            role="alert"
          >
            {submitStatus.message}
          </div>
        )}

        <div className={styles.buttonContainer}>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant={isSubmitting ? 'primary' : 'active'}
            className={styles.submitButton}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </div>
  )
}

