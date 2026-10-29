/**
 * Configuration globale du site Gabon FinTech Hub.
 * Centralise l'ensemble des coordonnées, points de terminaison et variables d'envoi.
 */
export const SITE_CONFIG = {
  // Domaine / URL de base paramétrable via variable d'environnement (jamais codé en dur)
  baseUrl:
    import.meta.env.VITE_SITE_URL ||
    (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')
      ? window.location.origin
      : 'https://gabonfintech-hub.com'),
  domain: 'gabonfintech-hub.com',

  // Adresse email de notification officielle pour tous les formulaires (Concours, Adhésion, Contact, Événements)
  // À CONFIRMER : adresse à valider par le client avant la mise en ligne
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || 'contact@gabonfintech-hub.com',

  // Adresse email utilisée en mode test (activé via VITE_TEST_MODE=true)
  testContactEmail: import.meta.env.VITE_TEST_CONTACT_EMAIL || 'test@gabonfintech-hub.com',

  // Indicateur d'activation du mode test
  isTestMode: import.meta.env.VITE_TEST_MODE === 'true',

  // URL du Webhook Google Apps Script (si renseignée côté client pour envoi direct ou fallback)
  googleSheetsWebhookUrl: import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || '',

  // Endpoint de l'API Serverless Vercel
  apiEndpoint: '/api/submit',

  // Page officielle LinkedIn
  linkedInUrl: 'https://www.linkedin.com/company/gabon-fintech-hub/',
  name: 'Gabon FinTech Hub',
  legalName: 'Association Gabon FinTech Hub',
  defaultOgImage: '/assets/og-startups-preview.svg',
  contestOgImage: '/assets/og-concours-preview.svg',
};
