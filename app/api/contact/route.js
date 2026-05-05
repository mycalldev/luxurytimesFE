import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Create or update customer in Shopify
    try {
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
    }

    // Send transactional email via Resend
    const submittedAt = new Date().toLocaleString('en-GB', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Europe/London',
    })

    try {
      await resend.emails.send({
        from: 'Luxury Times Website <noreply@luxurytimesltd.co.uk>',
        to: 'website@luxurytimesltd.co.uk',
        replyTo: email,
        subject: `New Contact Form Submission — ${subject}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0f0f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0f0f0f;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#1a1a1a;border:1px solid #2a2a2a;border-radius:4px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:#111111;padding:32px 40px;border-bottom:1px solid #c9a84c;">
              <p style="margin:0;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#c9a84c;font-weight:500;">Luxury Times Ltd</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:300;color:#ffffff;letter-spacing:1px;">New Contact Enquiry</h1>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="background-color:#c9a84c;padding:12px 40px;">
              <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#111111;font-weight:600;">Contact Form Submission</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- Intro -->
              <p style="margin:0 0 28px;font-size:14px;color:#999999;line-height:1.6;">
                A new message has been submitted via the contact form on <a href="https://www.luxurytimesltd.co.uk" style="color:#c9a84c;text-decoration:none;">luxurytimesltd.co.uk</a>. The details are below.
              </p>

              <!-- Details Table -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #2a2a2a;border-radius:4px;overflow:hidden;margin-bottom:28px;">
                <tr style="border-bottom:1px solid #2a2a2a;">
                  <td style="padding:14px 20px;background-color:#141414;width:35%;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;vertical-align:top;">Full Name</td>
                  <td style="padding:14px 20px;background-color:#1a1a1a;font-size:14px;color:#ffffff;vertical-align:top;">${name}</td>
                </tr>
                <tr style="border-bottom:1px solid #2a2a2a;">
                  <td style="padding:14px 20px;background-color:#141414;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;vertical-align:top;">Email</td>
                  <td style="padding:14px 20px;background-color:#1a1a1a;font-size:14px;vertical-align:top;"><a href="mailto:${email}" style="color:#c9a84c;text-decoration:none;">${email}</a></td>
                </tr>
                <tr style="border-bottom:1px solid #2a2a2a;">
                  <td style="padding:14px 20px;background-color:#141414;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;vertical-align:top;">Phone</td>
                  <td style="padding:14px 20px;background-color:#1a1a1a;font-size:14px;color:#ffffff;vertical-align:top;"><a href="tel:${phone}" style="color:#ffffff;text-decoration:none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;background-color:#141414;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;vertical-align:top;">Subject</td>
                  <td style="padding:14px 20px;background-color:#1a1a1a;font-size:14px;color:#ffffff;vertical-align:top;">${subject}</td>
                </tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;">Message</p>
              <div style="background-color:#141414;border:1px solid #2a2a2a;border-radius:4px;padding:20px;font-size:14px;color:#cccccc;line-height:1.8;white-space:pre-wrap;">${message}</div>

            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:0 40px 36px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#c9a84c;border-radius:2px;">
                    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display:inline-block;padding:12px 28px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#111111;font-weight:600;text-decoration:none;">Reply to ${firstName}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#111111;padding:20px 40px;border-top:1px solid #2a2a2a;">
              <p style="margin:0;font-size:11px;color:#555555;line-height:1.6;">
                Submitted on ${submittedAt} &nbsp;|&nbsp; <a href="https://www.luxurytimesltd.co.uk" style="color:#555555;text-decoration:none;">luxurytimesltd.co.uk</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      })
    } catch (resendError) {
      console.error('Resend error:', resendError)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll get back to you as soon as possible.",
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
