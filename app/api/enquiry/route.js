import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, contactPreference, message, productTitle, productPrice, website } = body

    // Honeypot check — bots fill this field, real users never see it
    if (website) {
      // Return a fake success so bots don't know they were blocked
      return NextResponse.json({ success: true }, { status: 200 })
    }

    if (!name || !email || !phone || !contactPreference || !productTitle) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const preferenceLabel = contactPreference === 'phone' ? '📞 Phone' : '✉️ Email'
    const submittedAt = new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Luxury Times Website <noreply@luxurytimesltd.co.uk>',
      to: 'info@luxurytimesltd.co.uk',
      replyTo: email,
      subject: `Watch Enquiry — ${productTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0;">
          <h2 style="color: #1a1a1a; margin: 0 0 24px; border-bottom: 2px solid #1a1a1a; padding-bottom: 12px; font-size: 20px; font-weight: 600;">
            Watch Enquiry
          </h2>

          <!-- Watch Details -->
          <div style="background-color: #1a1a1a; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.5);">Watch</p>
            <p style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #ffffff;">${productTitle}</p>
            <p style="margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.5);">Price</p>
            <p style="margin: 0; font-size: 16px; font-weight: 600; color: #ffffff;">${productPrice}</p>
          </div>

          <!-- Customer Details -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; width: 160px; border-bottom: 1px solid #f0f0f0; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600; font-size: 13px; border-bottom: 1px solid #f0f0f0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; border-bottom: 1px solid #f0f0f0; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600; font-size: 13px; border-bottom: 1px solid #f0f0f0;">
                <a href="mailto:${email}" style="color: #1a1a1a;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; border-bottom: 1px solid #f0f0f0; vertical-align: top;">Phone</td>
              <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600; font-size: 13px; border-bottom: 1px solid #f0f0f0;">
                <a href="tel:${phone}" style="color: #1a1a1a;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; border-bottom: 1px solid #f0f0f0; vertical-align: top;">Prefers contact by</td>
              <td style="padding: 10px 0; color: #1a1a1a; font-weight: 600; font-size: 13px; border-bottom: 1px solid #f0f0f0;">${preferenceLabel}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Message</td>
              <td style="padding: 10px 0; color: #1a1a1a; font-size: 13px; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</td>
            </tr>
            ` : ''}
          </table>

          <p style="color: #bbb; font-size: 11px; margin: 0; border-top: 1px solid #f0f0f0; padding-top: 16px;">
            Submitted: ${submittedAt} &nbsp;·&nbsp; Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Enquiry form error:', error)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}
