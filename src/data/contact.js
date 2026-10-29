// TEXTES D'ATTENTE : À CONFIRMER AVEC LE CLIENT
import { SITE_CONFIG } from '../config/site.js';

export const contact = {
  phone: '+241 01 00 00 00', // À CONFIRMER : numéro officiel du standard téléphonique
  email: SITE_CONFIG.contactEmail, // À CONFIRMER : validation de contact@gabonfintech-hub.com
  address: 'Libreville, Gabon', // À CONFIRMER : adresse physique exacte du siège
  website: SITE_CONFIG.baseUrl,
};

export const social = [
  { name: 'LinkedIn', url: SITE_CONFIG.linkedInUrl, icon: 'linkedin' },
  { name: 'Facebook', url: '/contact', icon: 'facebook' }, // À CONFIRMER : lien page Facebook officielle
  { name: 'YouTube', url: '/contact', icon: 'youtube' }, // À CONFIRMER : lien chaîne YouTube officielle
];
