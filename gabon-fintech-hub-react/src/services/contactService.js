/**
 * Service officiel de traitement des messages de contact et inscriptions événements.
 * Branche l'envoi réel en parallèle vers Email (Resend) et Google Sheets.
 */

import { dispatchFormSubmission } from './formDispatcher';

/**
 * Envoie un message via le formulaire de contact ou inscription événement.
 * @param {Object} data Données du formulaire
 * @returns {Promise<{ success: boolean, id: string, message: string }>}
 */
export async function submitContactMessage(data) {
  if (!data.name || !data.email || !data.message) {
    throw new Error('Veuillez renseigner votre nom, votre adresse email et votre message.');
  }

  // Détection automatique : si le sujet ou contexte concerne un événement
  const isEvent =
    data.subject === 'evenement' ||
    data.subject === 'sommet' ||
    Boolean(data.eventName);

  const formType = isEvent ? 'evenements' : 'contact';

  const result = await dispatchFormSubmission(formType, {
    name: (data.name || '').trim(),
    email: (data.email || '').trim().toLowerCase(),
    subject: data.subject || 'contact_general',
    phone: (data.phone || '').trim(),
    message: (data.message || '').trim(),
    eventName: data.eventName || (isEvent ? 'Gabon FinTech Summit / Ateliers' : undefined),
  });

  return {
    success: true,
    id: result.id,
    message: isEvent
      ? 'Votre demande d’inscription à l’événement a bien été transmise à notre équipe.'
      : 'Votre message a bien été envoyé. Notre équipe vous répondra dans les plus brefs délais.',
    receivedAt: result.receivedAt || new Date().toISOString(),
    destinations: result.destinations,
  };
}

