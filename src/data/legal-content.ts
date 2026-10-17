import { own } from "@/lib/own"

// Texts of the three legal pages, in Spanish and English. BASE TEXTS: have them reviewed by a gestor/abogado
// before relying on them (see docs/LEGAL.md). Placeholders in {braces} are filled from src/data/legal.ts.
//
// When the site changes what data it collects, which outside services it uses, or what it stores in the
// browser, these texts MUST be updated (see "Legal" in CLAUDE.md), and `updated` in legal.ts too.

export type LegalSection = { title: string; paragraphs?: string[]; list?: string[] }
export type LegalDoc = { title: string; sections: LegalSection[] }
export type LegalDocKey = "notice" | "privacy" | "cookies"
export type LegalLocale = "es" | "en"

export const LEGAL_PATHS: Record<LegalDocKey, string> = {
  notice: "/aviso-legal",
  privacy: "/privacidad",
  cookies: "/cookies",
}

export const LEGAL_DOCS: Record<LegalDocKey, Record<LegalLocale, LegalDoc>> = {
  notice: {
    es: {
      title: "Aviso legal",
      sections: [
        {
          title: "1. Datos identificativos",
          paragraphs: ["En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:"],
          list: ["Titular: {holderName}", "Nombre comercial: {tradeName}", "NIF/CIF: {taxId}", "Domicilio: {address}", "Correo electrónico: {email}", "Teléfono: {phone}", "Sitio web: {website}"],
        },
        {
          title: "2. Objeto y condiciones de uso",
          paragraphs: [
            "Este sitio web ofrece información sobre los servicios de encordado, equilibrado y personalización de raquetas de tenis, y sobre formaciones y cursos de encordado. El acceso es gratuito.",
            "La persona usuaria se compromete a hacer un uso lícito y diligente del sitio, sin dañar su funcionamiento ni los derechos de terceros.",
          ],
        },
        {
          title: "3. Propiedad intelectual e industrial",
          paragraphs: [
            "Los textos, el diseño, el código, las fotografías y los vídeos de este sitio son titularidad de {holderName} o se usan con la debida autorización. Queda prohibida su reproducción, distribución o transformación sin permiso previo y por escrito.",
            "Los nombres y logotipos de torneos, circuitos, patrocinadores y fabricantes que aparecen en la web son marcas de sus respectivos propietarios. Se muestran únicamente a modo informativo para referenciar los eventos en los que se ha prestado el servicio de encordado. {tradeName} no está afiliado, patrocinado ni respaldado por dichos titulares.",
            "Si eres titular de algún derecho y deseas solicitar la modificación o retirada de un contenido, escribe a {email} y lo atenderemos con la mayor brevedad.",
          ],
        },
        {
          title: "4. Responsabilidad",
          paragraphs: [
            "Nos esforzamos por mantener la información actualizada, pero no garantizamos que esté libre de errores ni que el sitio funcione sin interrupciones.",
            "Este sitio contiene enlaces a servicios de terceros (redes sociales, WhatsApp, Google Maps). {tradeName} no se responsabiliza de sus contenidos ni de sus políticas, que se rigen por sus propias condiciones.",
          ],
        },
        {
          title: "5. Protección de datos y cookies",
          paragraphs: ["El tratamiento de datos personales se explica en la Política de privacidad, y el uso de cookies y almacenamiento local en la Política de cookies, ambas disponibles en este sitio."],
        },
        {
          title: "6. Legislación aplicable y jurisdicción",
          paragraphs: ["Este aviso se rige por la legislación española. Para cualquier controversia serán competentes los juzgados y tribunales que correspondan conforme a la normativa aplicable, incluida la de protección de consumidores y usuarios."],
        },
      ],
    },
    en: {
      title: "Legal notice",
      sections: [
        {
          title: "1. Owner details",
          paragraphs: ["In compliance with Article 10 of Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the owner of this website is:"],
          list: ["Owner: {holderName}", "Trade name: {tradeName}", "Tax ID (NIF/CIF): {taxId}", "Address: {address}", "Email: {email}", "Phone: {phone}", "Website: {website}"],
        },
        {
          title: "2. Purpose and terms of use",
          paragraphs: [
            "This website provides information about tennis racquet stringing, balancing and customization services, and about stringing training and courses. Access is free of charge.",
            "Users agree to use the site lawfully and diligently, without harming its operation or the rights of third parties.",
          ],
        },
        {
          title: "3. Intellectual and industrial property",
          paragraphs: [
            "The texts, design, code, photographs and videos on this site belong to {holderName} or are used with permission. Reproduction, distribution or modification without prior written permission is prohibited.",
            "Names and logos of tournaments, tours, sponsors and manufacturers shown on the site are trademarks of their respective owners. They are displayed for information only, to reference the events where stringing services were provided. {tradeName} is not affiliated with, sponsored by or endorsed by those owners.",
            "If you hold rights over any content and want it changed or removed, write to {email} and we will deal with it promptly.",
          ],
        },
        {
          title: "4. Liability",
          paragraphs: [
            "We work to keep the information up to date, but we do not guarantee that it is error-free or that the site will run without interruption.",
            "This site contains links to third-party services (social networks, WhatsApp, Google Maps). {tradeName} is not responsible for their content or policies, which are governed by their own terms.",
          ],
        },
        {
          title: "5. Data protection and cookies",
          paragraphs: ["The processing of personal data is explained in the Privacy policy, and the use of cookies and local storage in the Cookie policy, both available on this site."],
        },
        {
          title: "6. Applicable law and jurisdiction",
          paragraphs: ["This notice is governed by Spanish law. Any dispute will be heard by the courts that are competent under the applicable rules, including consumer protection rules."],
        },
      ],
    },
  },

  privacy: {
    es: {
      title: "Política de privacidad",
      sections: [
        {
          title: "1. Responsable del tratamiento",
          list: ["Responsable: {holderName} ({tradeName})", "NIF/CIF: {taxId}", "Domicilio: {address}", "Correo electrónico: {email}"],
        },
        {
          title: "2. Qué datos tratamos",
          list: [
            "Si usas el formulario de contacto: nombre, correo electrónico, teléfono (opcional), asunto y mensaje.",
            "Datos técnicos: dirección IP y datos básicos de navegación, que quedan en los registros del servicio de alojamiento y de seguridad de la web.",
            "Si nos escribes por WhatsApp: los datos que facilites en esa aplicación, sujetos también a las condiciones de WhatsApp.",
          ],
        },
        {
          title: "3. Para qué los usamos",
          list: ["Atender y responder tu consulta, y facilitarte información o presupuestos sobre nuestros servicios.", "Garantizar la seguridad de la web y evitar el envío automatizado de mensajes no deseados (spam)."],
        },
        {
          title: "4. Base legal",
          list: [
            "Tu consentimiento, que das al marcar la casilla y enviar el formulario (art. 6.1.a RGPD).",
            "La aplicación de medidas precontractuales a petición tuya cuando la consulta es para contratar un servicio (art. 6.1.b RGPD).",
            "Nuestro interés legítimo en la seguridad de la web (art. 6.1.f RGPD).",
          ],
        },
        {
          title: "5. Destinatarios y proveedores",
          paragraphs: ["No cedemos tus datos a terceros salvo obligación legal. Para poder prestar el servicio usamos proveedores técnicos que actúan por nuestra cuenta (encargados del tratamiento):"],
          list: [
            "Resend: envío del correo con tu mensaje (EE. UU.).",
            "Microsoft (Outlook/Hotmail): recepción y gestión del correo en el que respondemos tu consulta (EE. UU.).",
            "Vercel Inc.: alojamiento de la web (EE. UU.).",
            "Cloudflare: comprobación de seguridad «no soy un robot» (Turnstile) en el formulario.",
            "Google LLC: mapa de ubicación, solo si pulsas «Mostrar mapa».",
          ],
        },
        {
          title: "6. Transferencias internacionales",
          paragraphs: ["Algunos de estos proveedores están en Estados Unidos. Las transferencias se amparan en la decisión de adecuación del Marco de Privacidad de Datos UE-EE. UU. o, en su defecto, en cláusulas contractuales tipo de la Comisión Europea."],
        },
        {
          title: "7. Cuánto tiempo conservamos los datos",
          paragraphs: ["Durante el tiempo necesario para atender tu consulta y, después, bloqueados durante los plazos legales de prescripción de posibles responsabilidades. Los registros técnicos se conservan según las políticas de cada proveedor."],
        },
        {
          title: "8. Tus derechos",
          paragraphs: [
            "Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a {email}, indicando qué derecho quieres ejercer.",
            "Si consideras que no hemos tratado tus datos correctamente, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).",
          ],
        },
        {
          title: "9. Otras informaciones",
          list: [
            "Los campos marcados con * son necesarios para poder responderte; sin ellos no podemos atender la consulta.",
            "No tomamos decisiones automatizadas ni elaboramos perfiles con tus datos.",
            "Esta web no está dirigida a menores de 14 años. Si eres menor, pide a tu madre, padre o tutor que envíe la consulta.",
            "Aplicamos medidas técnicas de seguridad: conexión cifrada (https), protección contra el envío automatizado de mensajes y acceso restringido a los datos.",
          ],
        },
        { title: "10. Cambios en esta política", paragraphs: ["Podemos actualizar esta política cuando cambie el tratamiento de datos. La fecha de la última actualización aparece al inicio de esta página."] },
      ],
    },
    en: {
      title: "Privacy policy",
      sections: [
        {
          title: "1. Data controller",
          list: ["Controller: {holderName} ({tradeName})", "Tax ID (NIF/CIF): {taxId}", "Address: {address}", "Email: {email}"],
        },
        {
          title: "2. What data we process",
          list: [
            "If you use the contact form: name, email, phone (optional), subject and message.",
            "Technical data: IP address and basic browsing data, kept in the hosting and security logs of the website.",
            "If you write to us on WhatsApp: the data you provide in that app, which is also subject to WhatsApp's terms.",
          ],
        },
        {
          title: "3. What we use it for",
          list: ["To handle and answer your enquiry, and to give you information or quotes about our services.", "To keep the website secure and prevent automated unwanted messages (spam)."],
        },
        {
          title: "4. Legal basis",
          list: [
            "Your consent, given by ticking the box and sending the form (Art. 6.1.a GDPR).",
            "Pre-contractual measures taken at your request when the enquiry is about hiring a service (Art. 6.1.b GDPR).",
            "Our legitimate interest in the security of the website (Art. 6.1.f GDPR).",
          ],
        },
        {
          title: "5. Recipients and providers",
          paragraphs: ["We do not share your data with third parties unless legally required. To provide the service we use technical providers acting on our behalf (data processors):"],
          list: [
            "Resend: sends the email with your message (USA).",
            "Microsoft (Outlook/Hotmail): receives and manages the mailbox where we answer your enquiry (USA).",
            "Vercel Inc.: website hosting (USA).",
            "Cloudflare: «I am not a robot» security check (Turnstile) on the form.",
            "Google LLC: location map, only if you click “Show map”.",
          ],
        },
        {
          title: "6. International transfers",
          paragraphs: ["Some of these providers are in the United States. Transfers rely on the EU-US Data Privacy Framework adequacy decision or, failing that, on the European Commission's standard contractual clauses."],
        },
        {
          title: "7. How long we keep the data",
          paragraphs: ["For as long as needed to handle your enquiry and, afterwards, blocked for the legal limitation periods for possible liabilities. Technical logs are kept according to each provider's policies."],
        },
        {
          title: "8. Your rights",
          paragraphs: [
            "You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to {email} and saying which right you want to exercise.",
            "If you believe we have not handled your data properly, you can lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).",
          ],
        },
        {
          title: "9. Other information",
          list: [
            "Fields marked * are required to be able to answer you; without them we cannot handle the enquiry.",
            "We do not make automated decisions or build profiles with your data.",
            "This website is not aimed at children under 14. If you are under 14, ask a parent or guardian to send the enquiry.",
            "We apply technical security measures: encrypted connection (https), protection against automated messages and restricted access to the data.",
          ],
        },
        { title: "10. Changes to this policy", paragraphs: ["We may update this policy when our data processing changes. The date of the last update is shown at the top of this page."] },
      ],
    },
  },

  cookies: {
    es: {
      title: "Política de cookies",
      sections: [
        {
          title: "1. Qué son las cookies y el almacenamiento local",
          paragraphs: ["Son pequeños archivos o datos que una web guarda en tu navegador. Algunos son imprescindibles para que la web funcione; otros sirven para medir el uso o mostrar publicidad."],
        },
        {
          title: "2. Qué usa esta web",
          list: [
            "Cookies propias de seguimiento, analítica o publicidad: ninguna.",
            "Almacenamiento local «selected-locale»: recuerda el idioma que elegiste. Es técnico y necesario para ofrecerte el servicio que pides; se conserva hasta que lo borres.",
          ],
        },
        {
          title: "3. Servicios de terceros",
          list: [
            "Google Maps: solo se carga si pulsas «Mostrar mapa». Al cargarlo, Google puede instalar sus propias cookies; consulta la política de Google.",
            "Cloudflare Turnstile: comprobación de seguridad del formulario de contacto. Según Cloudflare, no se usa con fines publicitarios; puede emplear datos técnicos necesarios para comprobar que eres una persona.",
            "Alojamiento (Vercel): registra datos técnicos de las visitas por seguridad y funcionamiento, sin cookies de seguimiento.",
          ],
        },
        {
          title: "4. Analítica y publicidad",
          paragraphs: ["Esta web no utiliza cookies analíticas ni publicitarias. Si en el futuro se añadieran, te pediremos tu consentimiento antes de activarlas."],
        },
        {
          title: "5. Cómo gestionar o eliminar las cookies",
          paragraphs: ["Puedes borrar o bloquear las cookies y el almacenamiento local desde los ajustes de tu navegador (Chrome, Firefox, Safari, Edge). Si borras el idioma guardado, la web volverá a elegirlo automáticamente."],
        },
      ],
    },
    en: {
      title: "Cookie policy",
      sections: [
        {
          title: "1. What cookies and local storage are",
          paragraphs: ["They are small files or pieces of data that a website saves in your browser. Some are essential for the site to work; others measure usage or show advertising."],
        },
        {
          title: "2. What this website uses",
          list: [
            "Own tracking, analytics or advertising cookies: none.",
            "Local storage “selected-locale”: remembers the language you chose. It is technical and needed to provide the service you ask for; it is kept until you delete it.",
          ],
        },
        {
          title: "3. Third-party services",
          list: [
            "Google Maps: only loaded if you click “Show map”. When loaded, Google may set its own cookies; see Google's policy.",
            "Cloudflare Turnstile: security check on the contact form. According to Cloudflare it is not used for advertising; it may use technical data needed to check that you are a person.",
            "Hosting (Vercel): records technical data about visits for security and operation, without tracking cookies.",
          ],
        },
        {
          title: "4. Analytics and advertising",
          paragraphs: ["This website does not use analytics or advertising cookies. If they are added in the future, we will ask for your consent before activating them."],
        },
        {
          title: "5. How to manage or delete cookies",
          paragraphs: ["You can delete or block cookies and local storage in your browser settings (Chrome, Firefox, Safari, Edge). If you delete the saved language, the site will choose it again automatically."],
        },
      ],
    },
  },
}

export function getLegalDoc(doc: LegalDocKey, lang: LegalLocale): LegalDoc {
  const byLang = own(LEGAL_DOCS, doc) ?? LEGAL_DOCS.notice
  return own(byLang, lang) ?? byLang.es
}

export function getLegalPath(doc: LegalDocKey): string {
  return own(LEGAL_PATHS, doc) ?? "/"
}

/** Replace {placeholders} with the owner's data */
export function fillLegalText(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => own(values, key) ?? match)
}
