'use client'

import { useState, useRef, useCallback } from 'react'
import styles from './EnquiryForm.module.css'

export default function EnquiryForm({ productTitle, productPrice }) {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactPreference: 'email',
    message: '',
    website: '', // honeypot — must stay empty
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Sync React state with DOM to capture browser autofill
  const syncFormState = useCallback(() => {
    if (!formRef.current) return null
    const inputs = formRef.current.elements
    const synced = {
      name: inputs.name?.value || '',
      email: inputs.email?.value || '',
      phone: inputs.phone?.value || '',
      contactPreference: formData.contactPreference,
      message: inputs.message?.value || '',
      website: inputs.website?.value || '',
    }
    setFormData(synced)
    return synced
  }, [formData.contactPreference])

  const validateForm = (data) => {
    const newErrors = {}

    // Name — required, min 2 characters
    if (!data.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (data.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name'
    }

    // Email — required, valid format
    if (!data.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone — required, minimum 7 digits after stripping formatting characters
    if (!data.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else {
      const digitsOnly = data.phone.replace(/[\s\-().+]/g, '')
      if (!/^\d{7,15}$/.test(digitsOnly)) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    }

    // Message — optional, but if provided must be at least 5 characters
    if (data.message.trim() && data.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const currentData = syncFormState() || formData
    if (!validateForm(currentData)) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...currentData,
          productTitle,
          productPrice,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: "Thank you for your enquiry. We'll be in touch shortly.",
        })
        setFormData({ name: '', email: '', phone: '', contactPreference: 'email', message: '', website: '' })
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.',
        })
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send enquiry. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus?.type === 'success') {
    return (
      <div className={styles.enquirySection}>
        <div className={styles.successState}>
          <div className={styles.successIcon}>✓</div>
          <h3 className={styles.successTitle}>Enquiry Sent</h3>
          <p className={styles.successMessage}>{submitStatus.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.enquirySection}>
      <h3 className={styles.sectionTitle}>Interested in this watch?</h3>

      {/* Watch summary */}
      <div className={styles.watchSummary}>
        <div className={styles.watchSummaryRow}>
          <span className={styles.watchSummaryLabel}>Watch</span>
          <span className={styles.watchSummaryValue}>{productTitle}</span>
        </div>
        <div className={styles.watchSummaryRow}>
          <span className={styles.watchSummaryLabel}>Price</span>
          <span className={styles.watchSummaryValue}>{productPrice}</span>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} noValidate>

        {/* Honeypot — hidden from real users, bots fill it in */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="enq-website">Website</label>
          <input
            type="text"
            id="enq-website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="enq-name" className={styles.label}>
            Full Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="enq-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            placeholder="Your full name"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'enq-name-error' : undefined}
          />
          {errors.name && (
            <span id="enq-name-error" className={styles.errorMessage} role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="enq-email" className={styles.label}>
            Email Address <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="enq-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="Your email address"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'enq-email-error' : undefined}
          />
          {errors.email && (
            <span id="enq-email-error" className={styles.errorMessage} role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="enq-phone" className={styles.label}>
            Phone Number <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            id="enq-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            placeholder="Your phone number"
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'enq-phone-error' : undefined}
          />
          {errors.phone && (
            <span id="enq-phone-error" className={styles.errorMessage} role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <span className={styles.label}>How would you like to be contacted?</span>
          <div className={styles.radioGroup} role="radiogroup" aria-label="Preferred contact method">
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="contactPreference"
                value="email"
                checked={formData.contactPreference === 'email'}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioCustom} aria-hidden="true" />
              Email
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="contactPreference"
                value="phone"
                checked={formData.contactPreference === 'phone'}
                onChange={handleChange}
                className={styles.radioInput}
              />
              <span className={styles.radioCustom} aria-hidden="true" />
              Phone
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="enq-message" className={styles.label}>
            Message <span className={styles.optional}>(optional)</span>
          </label>
          <textarea
            id="enq-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Any questions about this watch?"
            className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'enq-message-error' : undefined}
          />
          {errors.message && (
            <span id="enq-message-error" className={styles.errorMessage} role="alert">
              {errors.message}
            </span>
          )}
        </div>

        {submitStatus?.type === 'error' && (
          <div className={styles.errorStatus} role="alert">
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Sending...' : 'Send Enquiry'}
        </button>
      </form>
    </div>
  )
}
