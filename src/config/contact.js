// src/config/contact.js
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONTACT CONFIGURATION — Replace with real business details
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Chiffres uniquement pour https://wa.me/{digits} (espaces, + et tirets ignorés). */
export function normalizeWhatsAppDigits(value) {
  return String(value ?? '').replace(/\D/g, '')
}

export const CONTACT = {
  // Numéro WhatsApp : indicatif pays + numéro, CHIFFRES UNIQUEMENT (pas de lettres type XXX).
  // Ex. Italie +39 331 234 5678 → "393312345678" ou collez "+39 331 2345678" (normalisé au clic).
  // Un faux numéro ou des caractères invalides → page 404 sur wa.me
  whatsappNumber: '393312345678', // ← remplacez par le vrai numéro WhatsApp du B&B

  // Optional: Pre-filled message that opens in WhatsApp chat
  // Leave as empty string "" if you want no pre-filled message
  // The message will be URL-encoded automatically
  whatsappMessage: "Hello, I'd like to book an appointment.", // EN default
  whatsappMessageIT: 'Salve, vorrei prenotare un appuntamento.', // IT version

  // Display phone number (shown in tooltip and contact section)
  phoneDisplay: '+39 XXX XXX XXXX', // ← REPLACE WITH REAL NUMBER

  // Click-to-call href
  phoneHref: 'tel:+393312345678', // ← alignez sur le numéro réel
}
