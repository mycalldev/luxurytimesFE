import { NextResponse } from 'next/server'

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

    // Option 2: Send email notification (if you have email service configured)
    // You can integrate with services like SendGrid, Mailgun, or Shopify Flow here

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