# Email Setup Instructions

The contact form is fully functional and ready to use. Currently, it logs emails to the console in development mode. To enable actual email sending in production, follow these steps:

## Option 1: Using Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Install the Resend package:
   ```bash
   npm install resend
   ```
4. Add to your `.env.local`:
   ```
   RESEND_API_KEY=your_api_key_here
   ```
5. Update `src/app/api/contact/route.ts`:
   ```typescript
   import { Resend } from 'resend';
   
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   // In the POST function, replace the mock implementation:
   await resend.emails.send({
     from: 'CTennis Studio <noreply@ctenisstudio.com>',
     to: 'pablo_garis@hotmail.com',
     replyTo: email,
     subject: subject || `New contact from ${name}`,
     html: emailContent.html,
   });
   ```

## Current Implementation

The contact form currently:
- ✅ Validates all required fields
- ✅ Pre-fills form based on service type (encordado, SET, MATCH, POINT, base, avance, maestria)
- ✅ Generates appropriate subject lines (e.g., "SET - John Doe")
- ✅ Pre-fills messages in Spanish or English based on selected language
- ✅ Makes subject field read-only (cannot be modified by user)
- ✅ Supports optional phone number
- ✅ Shows success message and redirects after 3 seconds
- ✅ Displays error messages for validation or send failures
- ✅ Logs email content to console in development mode

## Service Types and URL Parameters

Users are redirected to the contact page with these URL patterns:

- Encordado: `/contact?service=encordado`
- SET service: `/contact?service=set`
- MATCH service: `/contact?service=match`
- POINT service: `/contact?service=point`
- Base course: `/contact?service=base`
- Avance course: `/contact?service=avance`
- Maestria course: `/contact?service=maestria`

You can also add a name parameter: `/contact?service=set&name=John`

## Testing

To test the contact form:
1. Click any service button on the website
2. You'll be redirected to `/contact` with the service pre-filled
3. Fill in your contact details
4. Submit the form
5. Check the browser console (in development) to see the email that would be sent
6. In production with proper email setup, the email will be sent to pablo_garis@hotmail.com

## Security Notes

- Never commit `.env.local` file to git
- Keep API keys secure
- Consider adding rate limiting to prevent spam
- Add CAPTCHA for production (optional but recommended)
