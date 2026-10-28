/**
 * Service officiel de soumission des inscriptions de startups FinTech.
 * Branche l'envoi réel en parallèle vers Email (Resend) et Google Sheets.
 */

import { dispatchFormSubmission } from './formDispatcher';

/**
 * Envoie le formulaire d'inscription d'une startup.
 * @param {Object} data Données du formulaire
 * @returns {Promise<{ success: boolean, id: string, message: string, receivedAt: string }>}
 */
export async function submitStartupRegistration(data) {
  // Validation d'intégrité minimale
  if (!data.startupName || !data.email || !data.contactName) {
    throw new Error('Données incomplètes : nom de la startup, contact et email requis.');
  }

  const result = await dispatchFormSubmission('startups', {
    startupName: data.startupName.trim(),
    contactName: data.contactName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: (data.phone || '').trim(),
    city: data.city || 'Libreville',
    websiteOrLinkedin: (data.websiteOrLinkedin || '').trim(),
    sector: data.sector || 'Paiement',
    stage: data.stage || 'Prototype',
    mainNeed: data.mainNeed || 'Financement',
    description: (data.description || '').trim(),
    utmSource: data.utmSource || data.source || 'linkedin',
    consent: Boolean(data.consent),
  });

  return {
    success: true,
    id: result.id,
    message: 'Votre candidature Startup a été transmise avec succès au comité d’accompagnement.',
    receivedAt: result.receivedAt || new Date().toISOString(),
    destinations: result.destinations,
  };
}
