/**
 * Service officiel de soumission des inscriptions au Concours FinTech Gabon.
 * Branche l'envoi réel en parallèle vers Email (Resend) et Google Sheets.
 */

import { dispatchFormSubmission } from './formDispatcher';

/**
 * Envoie le formulaire d'inscription d'un candidat au concours.
 * @param {Object} data Données saisies par le candidat
 * @returns {Promise<{ success: boolean, id: string, message: string, isDuplicate?: boolean, receivedAt: string }>}
 */
export async function submitContestRegistration(data) {
  // Validation d'intégrité minimale côté client
  if (!data.fullName || !data.email || !data.phone || !data.city || !data.projectDescription) {
    throw new Error('Données incomplètes : nom, email, téléphone, ville et description du projet requis.');
  }

  if (!data.consent) {
    throw new Error('Votre consentement au traitement des données personnelles est obligatoire.');
  }

  if (!data.rulesAccepted) {
    throw new Error('L’acceptation du règlement du concours est obligatoire.');
  }

  // Distribution vers Email (Resend) + Google Sheet en parallèle
  const result = await dispatchFormSubmission('concours', {
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    city: data.city.trim(),
    projectOrStartupName: (data.projectOrStartupName || '').trim(),
    websiteOrLinkedIn: (data.websiteOrLinkedIn || '').trim(),
    projectDescription: data.projectDescription.trim(),
    utmSource: data.source || data.utm_source || 'direct',
    rulesAccepted: Boolean(data.rulesAccepted),
    consent: Boolean(data.consent),
  });

  return {
    success: true,
    id: result.id,
    isDuplicate: result.isDuplicate,
    message: result.isDuplicate
      ? 'Une candidature avec cette adresse email a déjà été enregistrée. Votre dossier est bien pris en compte par le jury.'
      : 'Votre inscription au Concours FinTech Gabon a été enregistrée avec succès.',
    receivedAt: result.receivedAt || new Date().toISOString(),
    destinations: result.destinations,
  };
}
