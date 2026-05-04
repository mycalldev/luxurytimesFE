import { NextResponse } from 'next/server'

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

    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Track Klaviyo event — triggers internal notification Flow in Klaviyo dashboard
    try {
      const klaviyoEventRes = await fetch('https://a.klaviyo.com/api/events/', {
        method: 'POST',
        headers: {
          'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_KEY}`,
          'Content-Type': 'application/json',
          'revision': '2024-10-15',
        },
        body: JSON.stringify({
          data: {
            type: 'event',
            attributes: {
              metric: {
                data: {
                  type: 'metric',
                  attributes: { name: 'Form Submitted' },
                },
              },
              profile: {
                data: {
                  type: 'profile',
                  attributes: {
                    email,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phone,
                  },
                },
              },
              properties: {
                'Form Type': 'Product Enquiry',
                Name: name,
                Email: email,
                Phone: phone,
                'Contact Preference': contactPreference === 'phone' ? 'Phone' : 'Email',
                Product: productTitle,
                Price: productPrice,
                Message: message || '',
                'Submitted At': new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' }),
              },
            },
          },
        }),
      })
      if (!klaviyoEventRes.ok) {
        const errBody = await klaviyoEventRes.text()
        console.error('Klaviyo event failed:', klaviyoEventRes.status, errBody)
      }
    } catch (klaviyoEventError) {
      console.error('Klaviyo event error:', klaviyoEventError)
    }

    // Subscribe to Klaviyo list
    try {
      const nameParts = name.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
        method: 'POST',
        headers: {
          'Authorization': `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_KEY}`,
          'Content-Type': 'application/json',
          'revision': '2024-10-15',
        },
        body: JSON.stringify({
          data: {
            type: 'profile-subscription-bulk-create-job',
            attributes: {
              profiles: {
                data: [
                  {
                    type: 'profile',
                    attributes: {
                      email,
                      first_name: firstName,
                      last_name: lastName,
                      phone_number: phone,
                      properties: {
                        Source: 'Product Enquiry',
                        'Enquired Product': productTitle,
                        'Enquired Price': productPrice,
                        'Contact Preference': contactPreference,
                      },
                    },
                  },
                ],
              },
            },
            relationships: {
              list: {
                data: {
                  type: 'list',
                  id: process.env.KLAVIYO_LIST_ID,
                },
              },
            },
          },
        }),
      })
    } catch (klaviyoError) {
      console.error('Klaviyo error:', klaviyoError)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Enquiry form error:', error)
    return NextResponse.json({ error: 'Failed to send enquiry' }, { status: 500 })
  }
}
