import { Resend } from 'resend';

// Initialize Resend only when API key is available (runtime)
// During build time, this will be undefined, which is fine for static analysis
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Rate limiting: Track IPs and their request timestamps
const rateLimitMap = new Map<string, number[]>();
const MAX_REQUESTS_PER_HOUR = 5;
const HOUR_IN_MS = 60 * 60 * 1000;

// Sanitize input to prevent XSS and injection attacks
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 5000); // Limit length
}

// Validate email format strictly
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Validate phone number format
function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Optional field
  const phoneRegex = /^[+]?[0-9\s()-]{7,20}$/;
  return phoneRegex.test(phone);
}

// Check for spam patterns
function containsSpam(text: string): boolean {
  const spamPatterns = [
    /viagra/gi,
    /cialis/gi,
    /casino/gi,
    /lottery/gi,
    /prize/gi,
    /\b(http|https|www)\b.*\b(http|https|www)\b/gi, // Multiple URLs
  ];
  return spamPatterns.some(pattern => pattern.test(text));
}

export async function POST(request: Request) {
  try {
    console.log('📧 Contact API called');
    
    // Rate limiting by IP
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const requestTimes = rateLimitMap.get(ip) || [];
    const recentRequests = requestTimes.filter(time => now - time < HOUR_IN_MS);
    
    if (recentRequests.length >= MAX_REQUESTS_PER_HOUR) {
      console.warn(`⚠️ Rate limit exceeded for IP: ${ip}`);
      return Response.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);
    
    const body = await request.json();
    const { name, email, phone, subject, message, honeypot } = body;
    
    // Honeypot field check (bot detection)
    if (honeypot) {
      console.warn('⚠️ Honeypot triggered - potential bot detected');
      return Response.json({ success: true }); // Fake success to fool bots
    }
    
    console.log('📝 Form data received:', { name, email, subject });

    // Validación de campos requeridos
    if (!name || !email || !subject || !message) {
      console.error('❌ Missing required fields');
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Sanitize all inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPhone = phone ? sanitizeInput(phone) : '';
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);
    
    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      console.error('❌ Invalid email format');
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Validate phone format (if provided)
    if (!isValidPhone(sanitizedPhone)) {
      console.error('❌ Invalid phone format');
      return Response.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }
    
    // Check for spam
    if (containsSpam(sanitizedMessage) || containsSpam(sanitizedSubject)) {
      console.warn('⚠️ Spam detected');
      return Response.json(
        { error: 'Spam content detected' },
        { status: 400 }
      );
    }
    
    // Validate length constraints
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return Response.json({ error: 'Invalid name length' }, { status: 400 });
    }
    if (sanitizedSubject.length < 3 || sanitizedSubject.length > 200) {
      return Response.json({ error: 'Invalid subject length' }, { status: 400 });
    }
    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 5000) {
      return Response.json({ error: 'Invalid message length' }, { status: 400 });
    }

    // Verificar que la API key existe y resend está inicializado
    if (!process.env.RESEND_API_KEY || !resend) {
      console.error('❌ RESEND_API_KEY is not set');
      return Response.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    console.log('🔑 API Key exists:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');

    const emailContent = {
      text: `
Nombre: ${sanitizedName}
Email: ${sanitizedEmail}
Teléfono: ${sanitizedPhone || 'No proporcionado'}
Asunto: ${sanitizedSubject}

Mensaje:
${sanitizedMessage}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f9a028, #f57c00); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .field label { font-weight: bold; color: #555; }
    .field value { display: block; margin-top: 5px; }
    .message { background: white; padding: 15px; border-left: 4px solid #f9a028; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>✉️ Nuevo Contacto - CTennis Studio</h2>
    </div>
    <div class="content">
      <div class="field">
        <label>Nombre:</label>
        <div class="value">${sanitizedName}</div>
      </div>
      <div class="field">
        <label>Email:</label>
        <div class="value"><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></div>
      </div>
      ${sanitizedPhone ? `
      <div class="field">
        <label>Teléfono:</label>
        <div class="value"><a href="tel:${sanitizedPhone}">${sanitizedPhone}</a></div>
      </div>
      ` : ''}
      <div class="field">
        <label>Asunto:</label>
        <div class="value">${sanitizedSubject}</div>
      </div>
      <div class="message">
        <label>Mensaje:</label>
        <div class="value" style="white-space: pre-wrap;">${sanitizedMessage}</div>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    };

    console.log('📨 Attempting to send email via Resend...');

    const result = await resend!.emails.send({
      from: 'CTennis Studio <noreply@ctenisstudio.com>', // Cambiado: ctenisstudio (sin doble t)
      to: 'pablo_garis@hotmail.com',
      replyTo: sanitizedEmail,
      subject: sanitizedSubject || `Nuevo contacto de ${sanitizedName}`,
      html: emailContent.html,
    });

    console.log('✅ Email sent successfully!', result);

    return Response.json({ success: true });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return Response.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
