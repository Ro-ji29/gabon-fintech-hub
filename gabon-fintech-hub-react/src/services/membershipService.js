/**
 * Service officiel de soumission des demandes d'adhésion au Gabon FinTech Hub.
 * Branche l'envoi réel en parallèle vers Email (Resend) et Google Sheets.
 */

import { dispatchFormSubmission } from './formDispatcher';

/**
 * Envoie la demande d'adhésion d'un membre (Startup, Pro, Corporate, Académique, Média).
 * @param {Object} data Données du formulaire
 * @returns {Promise<{ success: boolean, id: string, message: string }>}
 */
export async function submitMembershipRegistration(data) {
  if (!data.name || !data.email) {
    throw new Error('Votre nom complet et votre adresse e-mail professionnelle sont requis.');
  }

  const result = await dispatchFormSubmission('adhesion', {
    category: data.category || 'startup',
    name: (data.name || '').trim(),
    organization: (data.organization || '').trim(),
    email: (data.email || '').trim().toLowerCase(),
    phone: (data.phone || '').trim(),
    message: (data.message || '').trim(),
    consent: Boolean(data.consent),
  });

  return {
    success: true,
    id: result.id,
    message: 'Votre demande d’adhésion a été enregistrée avec succès. Notre équipe prendra contact avec vous.',
    receivedAt: result.receivedAt || new Date().toISOString(),
    destinations: result.destinations,
  };
}

