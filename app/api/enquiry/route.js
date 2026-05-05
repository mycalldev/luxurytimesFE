import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, contactPreference, message, productTitle, productPrice, website } = body

    // Honeypot check — bots fill this field, real users never see it
    if (website) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    if (!name || !email || !phone || !contactPreference || !productTitle) {
      return NextResponse.json({ error: 'Required fields are missing' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''

    const preferenceLabel = contactPreference === 'phone' ? 'Phone Call' : 'Email'

    const submittedAt = new Date().toLocaleString('en-GB', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Europe/London',
    })

    // Send transactional email via Resend
    try {
      await resend.emails.send({
        from: 'Luxury Times Website <noreply@luxurytimesltd.co.uk>',
        to: 'website@luxurytimesltd.co.uk',
        replyTo: email,
        subject: `New Product Enquiry — ${productTitle}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Product Enquiry</title>
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
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:300;color:#ffffff;letter-spacing:1px;">New Product Enquiry</h1>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="background-color:#c9a84c;padding:12px 40px;">
              <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#111111;font-weight:600;">Product Enquiry Form Submission</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- Intro -->
              <p style="margin:0 0 28px;font-size:14px;color:#999999;line-height:1.6;">
                A customer has submitted an enquiry for a product on <a href="https://www.luxurytimesltd.co.uk" style="color:#c9a84c;text-decoration:none;">luxurytimesltd.co.uk</a>. Their preferred contact method is <strong style="color:#ffffff;">${preferenceLabel}</strong>.
              </p>

              <!-- Product Summary -->
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;">Product of Interest</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #c9a84c;border-radius:4px;overflow:hidden;margin-bottom:28px;">
                <tr>
                  <td style="padding:18px 20px;background-color:#141414;">
                    <p style="margin:0 0 4px;font-size:16px;color:#ffffff;font-weight:400;">${productTitle}</p>
                    ${productPrice ? `<p style="margin:0;font-size:14px;color:#c9a84c;font-weight:600;">${productPrice}</p>` : ''}
                  </td>
                </tr>
              </table>

              <!-- Customer Details -->
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;">Customer Details</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #2a2a2a;border-radius:4px;overflow:hidden;margin-bottom:28px;">
                <tr style="border-bottom:1px solid #2a2a2a;">
                  <td style="padding:14px 20px;background-color:#141414;width:40%;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;vertical-align:top;">Full Name</td>
                  <td style="padding:14px 20px;background-color:#1a1a1a;font-size:14px;color:#ffffff;vertical-align:top;">${name}</td>
                </tr>
                <tr style="border-bottom:1px solid #2a2a2a;">
                  <td style="padding:14px 20px;background-color:#141414;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;vertical-align:top;">Email</td>
                  <td style="padding:14px 20px;background-color:#1a1a1a;font-size:14px;vertical-align:top;"><a href="mailto:${email}" style="color:#c9a84c;text-decoration:none;">${email}</a></td>
                </tr>
                <tr style="border-bottom:1px solid #2a2a2a;">
                  <td style="padding:14px 20px;background-color:#141414;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;vertical-align:top;">Phone</td>
                  <td style="padding:14px 20px;background-color:#1a1a1a;font-size:14px;vertical-align:top;"><a href="tel:${phone}" style="color:#ffffff;text-decoration:none;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;background-color:#141414;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;vertical-align:top;">Preferred Contact</td>
                  <td style="padding:14px 20px;background-color:#1a1a1a;font-size:14px;vertical-align:top;">
                    <span style="display:inline-block;background-color:#c9a84c;color:#111111;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:600;padding:4px 12px;border-radius:2px;">${preferenceLabel}</span>
                  </td>
                </tr>
              </table>

              <!-- Message (conditional) -->
              ${message ? `
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;">Additional Message</p>
              <div style="background-color:#141414;border:1px solid #2a2a2a;border-radius:4px;padding:20px;font-size:14px;color:#cccccc;line-height:1.8;white-space:pre-wrap;margin-bottom:28px;">${message}</div>
              ` : ''}

            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:0 40px 36px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#c9a84c;border-radius:2px;">
                    <a href="mailto:${email}?subject=Re: Enquiry about ${encodeURIComponent(productTitle)}" style="display:inline-block;padding:12px 28px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#111111;font-weight:600;text-decoration:none;">Reply to ${firstName}</a>
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

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Enquiry form error:', error)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}
