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
      const internalResult = await resend.emails.send({
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
      console.log('[enquiry] internal email →', JSON.stringify(internalResult))
    } catch (resendError) {
      console.error('[enquiry] internal email threw:', resendError)
    }

    // Send automated acknowledgement to the customer
    try {
      const autoReplyResult = await resend.emails.send({
        from: 'Luxury Times Ltd <noreply@luxurytimesltd.co.uk>',
        to: email,
        replyTo: 'website@luxurytimesltd.co.uk',
        subject: `Thank you for your enquiry, ${firstName}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank you for your enquiry</title>
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
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:300;color:#ffffff;letter-spacing:1px;">Thank You for Your Enquiry</h1>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="background-color:#c9a84c;padding:12px 40px;">
              <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#111111;font-weight:600;">Your Enquiry Has Been Received</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <p style="margin:0 0 20px;font-size:15px;color:#ffffff;line-height:1.6;">
                Dear ${firstName},
              </p>

              <p style="margin:0 0 20px;font-size:14px;color:#cccccc;line-height:1.7;">
                Thank you for your interest in the timepiece below. We can confirm that your enquiry has been received by our team at Luxury Times Ltd.
              </p>

              <p style="margin:0 0 28px;font-size:14px;color:#cccccc;line-height:1.7;">
                A member of our client services team will be in contact with you personally within <strong style="color:#ffffff;">24 working hours</strong> via your preferred method, ${preferenceLabel.toLowerCase()}.
              </p>

              <!-- Product Reference -->
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;">Product of Interest</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #c9a84c;border-radius:4px;overflow:hidden;margin-bottom:28px;">
                <tr>
                  <td style="padding:18px 20px;background-color:#141414;">
                    <p style="margin:0 0 4px;font-size:16px;color:#ffffff;font-weight:400;">${productTitle}</p>
                    ${productPrice ? `<p style="margin:0;font-size:14px;color:#c9a84c;font-weight:600;">${productPrice}</p>` : ''}
                  </td>
                </tr>
              </table>

              <!-- Enquiry Details -->
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;">Your Enquiry Reference</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #2a2a2a;border-radius:4px;overflow:hidden;margin-bottom:28px;">
                <tr style="border-bottom:1px solid #2a2a2a;">
                  <td style="padding:14px 20px;background-color:#141414;width:40%;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;vertical-align:top;">Preferred Contact</td>
                  <td style="padding:14px 20px;background-color:#1a1a1a;font-size:14px;color:#ffffff;vertical-align:top;">${preferenceLabel}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;background-color:#141414;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;vertical-align:top;">Submitted</td>
                  <td style="padding:14px 20px;background-color:#1a1a1a;font-size:14px;color:#ffffff;vertical-align:top;">${submittedAt}</td>
                </tr>
              </table>

              <!-- Urgent contact -->
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;">Need to Speak with Us Sooner?</p>
              <p style="margin:0 0 24px;font-size:14px;color:#cccccc;line-height:1.7;">
                If your enquiry is time sensitive, please call us directly on <a href="tel:07714611699" style="color:#c9a84c;text-decoration:none;font-weight:600;">07714 611 699</a>. Our specialists are also happy to assist you in person at either of our London showrooms.
              </p>

              <!-- Showroom Locations -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td width="48%" style="padding:16px 18px;background-color:#141414;border:1px solid #2a2a2a;border-radius:4px;vertical-align:top;">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;">Mayfair</p>
                    <p style="margin:0;font-size:13px;color:#cccccc;line-height:1.6;">15 St George's House<br/>Hanover Square<br/>London, W1S 1HS</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="padding:16px 18px;background-color:#141414;border:1px solid #2a2a2a;border-radius:4px;vertical-align:top;">
                    <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:600;">Hatton Garden</p>
                    <p style="margin:0;font-size:13px;color:#cccccc;line-height:1.6;">100 Hatton Garden<br/>London<br/>EC1N 8NX</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#cccccc;line-height:1.7;">
                Kind regards,<br/>
                <strong style="color:#ffffff;">The Luxury Times Team</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#111111;padding:20px 40px;border-top:1px solid #2a2a2a;">
              <p style="margin:0 0 6px;font-size:11px;color:#555555;line-height:1.6;">
                This is an automated confirmation. Please do not reply directly to this email.
              </p>
              <p style="margin:0;font-size:11px;color:#555555;line-height:1.6;">
                <a href="https://www.luxurytimesltd.co.uk" style="color:#555555;text-decoration:none;">luxurytimesltd.co.uk</a>
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
      console.log('[enquiry] auto-reply →', JSON.stringify(autoReplyResult), 'to:', email)
    } catch (autoReplyError) {
      console.error('[enquiry] auto-reply threw:', autoReplyError)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Enquiry form error:', error)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}
