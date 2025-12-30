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

    // Here you can integrate with Shopify or your preferred service
    // For now, we'll log the data and return success
    // You can extend this to:
    // 1. Create a customer in Shopify
    // 2. Send an email notification
    // 3. Store in a database
    // 4. Create a draft order with contact info

    console.log('Contact Form Submission:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // TODO: Integrate with Shopify Admin API to create customer or send email
    // Example Shopify integration:
    /*
    const shopifyResponse = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/customers.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer: {
          first_name: name.split(' ')[0],
          last_name: name.split(' ').slice(1).join(' ') || '',
          email: email,
          phone: phone,
          note: `Subject: ${subject}\n\nMessage: ${message}`,
        },
      }),
    })
    */

    // For now, return success
    // In production, you should handle the Shopify API call above
    return NextResponse.json(
      { 
        success: true,
        message: 'Contact form submitted successfully' 
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

