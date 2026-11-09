import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as fs from 'fs';
import * as path from 'path';

// Every field comes from the public form, so it's escaped before going into the
// email HTML. Otherwise anyone could put their own links or markup into an
// email that arrives looking like a genuine enquiry from the site.
function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const formData: Record<string, string> = Object.fromEntries(
      Object.entries(body).map(([key, value]) => [key, escapeHtml(value)])
    );

    // Send email notification
    try {
      // Read the logo file
      const logoPath = path.join(process.cwd(), 'public', 'logo_withbg.png');
      const logoBuffer = fs.readFileSync(logoPath);
      const logoBase64 = logoBuffer.toString('base64');

      // Format wedding date to UK format (dd-Month-yyyy)
      const weddingDate = new Date(formData.weddingDate);
      const formattedDate = weddingDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

      const resend = new Resend(process.env.RESEND_API_KEY);
      const emailResult = await resend.emails.send({
        from: 'CourtCreatives <onboarding@resend.dev>',
        to: ['courtcreatives@outlook.com'],
        subject: 'Court Creatives Enquiry Form',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                  background-color: #fff6f3;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                  background-color: #f8ced0;
                  padding: 30px;
                  text-align: center;
                }
                .header img {
                  max-width: 200px;
                  height: auto;
                }
                .content {
                  padding: 40px 30px;
                  color: #4b5563;
                }
                h1 {
                  font-size: 28px;
                  font-weight: 300;
                  color: #1f2937;
                  margin: 0 0 30px 0;
                  text-align: center;
                }
                .field {
                  margin-bottom: 20px;
                  padding-bottom: 20px;
                  border-bottom: 1px solid #f3f4f6;
                }
                .field:last-child {
                  border-bottom: none;
                }
                .label {
                  font-weight: 600;
                  color: #374151;
                  margin-bottom: 5px;
                  font-size: 14px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                .value {
                  color: #6b7280;
                  font-size: 16px;
                  font-weight: 300;
                  line-height: 1.5;
                }
                .footer {
                  background-color: #fff6f3;
                  padding: 20px;
                  text-align: center;
                  color: #9ca3af;
                  font-size: 14px;
                  font-weight: 300;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <img src="data:image/png;base64,${logoBase64}" alt="CourtCreatives Logo" />
                </div>
                <div class="content">
                  <h1>New Wedding Enquiry Received</h1>

                  <div class="field">
                    <div class="label">Name</div>
                    <div class="value">${formData.fullName}</div>
                  </div>

                  <div class="field">
                    <div class="label">Partner's Name</div>
                    <div class="value">${formData.partnerName || 'N/A'}</div>
                  </div>

                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value">${formData.email}</div>
                  </div>

                  <div class="field">
                    <div class="label">Phone</div>
                    <div class="value">${formData.phone || 'N/A'}</div>
                  </div>

                  <div class="field">
                    <div class="label">Wedding Date</div>
                    <div class="value">${formattedDate}</div>
                  </div>

                  <div class="field">
                    <div class="label">Package</div>
                    <div class="value">${formData.package || 'Not sure yet'}</div>
                  </div>

                  <div class="field">
                    <div class="label">Getting Ready Location</div>
                    <div class="value">${formData.gettingReadyLocation}</div>
                  </div>

                  <div class="field">
                    <div class="label">Ceremony Location</div>
                    <div class="value">${formData.ceremonyLocation}</div>
                  </div>

                  <div class="field">
                    <div class="label">Reception Location</div>
                    <div class="value">${formData.receptionLocation}</div>
                  </div>

                  <div class="field">
                    <div class="label">Additional Details</div>
                    <div class="value">${formData.additionalDetails || 'N/A'}</div>
                  </div>
                </div>
                <div class="footer">
                  © 2025 CourtCreatives. All rights reserved.
                </div>
              </div>
            </body>
          </html>
        `,
      });

      return NextResponse.json({ success: true, emailResult });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}