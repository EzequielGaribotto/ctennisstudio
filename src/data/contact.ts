// Single source of truth for contact details and social links.
// Change a value here and every button/link on the site updates.

export const CONTACT = {
  phoneE164: "34630530839", // international format without "+", used by WhatsApp
  phoneDisplay: "+34 630 530 839",
  email: "pablo_garis@hotmail.com",
} as const

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/Pablo.Garibotto.Garcia/",
  instagram: "https://www.instagram.com/ctennisstudio",
  linkedin: "https://www.linkedin.com/in/pablogaribottogarcia/",
  whatsapp: `https://wa.me/${CONTACT.phoneE164}`,
} as const

export const whatsappUrl = (message?: string) =>
  message ? `${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(message)}` : SOCIAL_LINKS.whatsapp

/** Opens WhatsApp in a new tab without giving the new page access to this one. */
export const openWhatsApp = (message?: string) => {
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer")
}
