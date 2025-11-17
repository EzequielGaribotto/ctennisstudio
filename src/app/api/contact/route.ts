import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    console.log('📧 Contact API called');
    
    const { name, email, phone, subject, message } = await request.json();
    
    console.log('📝 Form data received:', { name, email, subject });

    // Validación
    if (!name || !email || !subject || !message) {
      console.error('❌ Missing required fields');
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verificar que la API key existe
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is not set');
      return Response.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    console.log('🔑 API Key exists:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');

    const emailContent = {
      text: `
Nombre: ${name}
Email: ${email}
Teléfono: ${phone || 'No proporcionado'}
Asunto: ${subject}

Mensaje:
${message}
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
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <label>Email:</label>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      ${phone ? `
      <div class="field">
        <label>Teléfono:</label>
        <div class="value"><a href="tel:${phone}">${phone}</a></div>
      </div>
      ` : ''}
      <div class="field">
        <label>Asunto:</label>
        <div class="value">${subject}</div>
      </div>
      <div class="message">
        <label>Mensaje:</label>
        <div class="value" style="white-space: pre-wrap;">${message}</div>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    };

    console.log('📨 Attempting to send email via Resend...');

    const result = await resend.emails.send({
      from: 'CTennis Studio <noreply@ctenisstudio.com>', // Cambiado: ctenisstudio (sin doble t)
      to: 'pablo_garis@hotmail.com',
      replyTo: email,
      subject: subject || `Nuevo contacto de ${name}`,
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
