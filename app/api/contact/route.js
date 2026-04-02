import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check for required environment variables
    if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
      console.error('Missing Shopify environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Split name into first and last name
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Prepare customer note with contact form details
    const customerNote = `Contact Form Submission
Subject: ${subject}

Message:
${message}

Submitted: ${new Date().toISOString()}`

    // Option 1: Create or update customer in Shopify
    try {
      // First, check if customer already exists
      const checkResponse = await fetch(
        `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/customers/search.json?query=email:${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
            'Content-Type': 'application/json',
          },
        }
      )

      const existingCustomers = await checkResponse.json()

      if (existingCustomers.customers && existingCustomers.customers.length > 0) {
        // Customer exists - update with new note
        const customerId = existingCustomers.customers[0].id
        const existingNote = existingCustomers.customers[0].note || ''
        const updatedNote = existingNote 
          ? `${existingNote}\n\n---\n${customerNote}`
          : customerNote

        await fetch(
          `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/customers/${customerId}.json`,
          {
            method: 'PUT',
            headers: {
              'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customer: {
                id: customerId,
                phone: phone,
                note: updatedNote,
              },
            }),
          }
        )
      } else {
        // Create new customer
        await fetch(
          `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/customers.json`,
          {
            method: 'POST',
            headers: {
              'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customer: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                note: customerNote,
                tags: 'contact-form',
              },
            }),
          }
        )
      }
    } catch (shopifyError) {
      console.error('Shopify API error:', shopifyError)
      // Continue even if Shopify call fails - you might want to log this
      // or send to an alternative service
    }

    // Send email notification via Resend
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: 'Luxury Times Website <noreply@luxurytimesltd.co.uk>',
        to: 'info@luxurytimesltd.co.uk',
        replyTo: email,
        subject: `New Enquiry: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0;">
            <h2 style="color: #1a1a1a; margin-bottom: 24px; border-bottom: 2px solid #1a1a1a; padding-bottom: 12px;">
              New Contact Form Submission
            </h2>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; color: #666; font-size: 14px; width: 120px; vertical-align: top;">Name</td>
                <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600; font-size: 14px;">${name}</td>
              </tr>
              <tr style="border-top: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">Email</td>
                <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600; font-size: 14px;">
                  <a href="mailto:${email}" style="color: #1a1a1a;">${email}</a>
                </td>
              </tr>
              <tr style="border-top: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">Phone</td>
                <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600; font-size: 14px;">
                  <a href="tel:${phone}" style="color: #1a1a1a;">${phone}</a>
                </td>
              </tr>
              <tr style="border-top: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">Subject</td>
                <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600; font-size: 14px;">${subject}</td>
              </tr>
              <tr style="border-top: 1px solid #f0f0f0;">
                <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #1a1a1a; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</td>
              </tr>
            </table>

            <p style="color: #999; font-size: 12px; margin: 0; border-top: 1px solid #f0f0f0; padding-top: 16px;">
              Submitted: ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
              &nbsp;·&nbsp; Reply directly to this email to respond to ${name}.
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      // Email failure is non-fatal — Shopify submission already succeeded
      console.error('Resend email error:', emailError)
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Thank you for your message! We\'ll get back to you as soon as possible.'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form submission' },
      { status: 500 }
    )
  }
}