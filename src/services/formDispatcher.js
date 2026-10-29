/**
 * Service centralisé de distribution des formulaires (Email + Google Sheet en parallèle).
 * Gère la validation d'intégrité, la protection anti-spam (honeypot), la limitation de débit,
 * la détection de doublons et la résilience double destination.
 */

import { SITE_CONFIG } from '../config/site';

const SUBMISSION_TIMESTAMPS_KEY = 'gfh_submit_timestamps';
const MIN_INTERVAL_SECONDS = 4; // Intervalle minimal entre deux clics
const MAX_SUBMITS_PER_WINDOW = 6; // Max 6 soumissions par fenêtre de 10 min
const RATE_WINDOW_MS = 10 * 60 * 1000;

/**
 * Vérification anti-spam par champ piège (honeypot).
 */
function verifyHoneypot(data) {
  const honeypotKeys = ['_honeypot', 'hp_field', 'website_trap', 'bot_check'];
  for (const key of honeypotKeys) {
    if (data[key] && String(data[key]).trim().length > 0) {
      console.warn('[Security/AntiSpam] Soumission bloquée par le champ piège (bot détecté).');
      throw new Error('Soumission invalide détectée par le filtre de sécurité.');
    }
  }
}

/**
 * Limitation du débit d'envois répétés pour prévenir les attaques de saturation.
 */
function checkRateLimit() {
  try {
    const now = Date.now();
    const raw = sessionStorage.getItem(SUBMISSION_TIMESTAMPS_KEY);
    const timestamps = raw ? JSON.parse(raw) : [];

    // Nettoyer les soumissions plus anciennes que la fenêtre
    const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);

    if (recent.length > 0) {
      const lastSubmit = recent[recent.length - 1];
      if (now - lastSubmit < MIN_INTERVAL_SECONDS * 1000) {
        throw new Error('Veuillez patienter quelques secondes avant de renvoyer le formulaire.');
      }
    }

    if (recent.length >= MAX_SUBMITS_PER_WINDOW) {
      throw new Error('Trop de tentatives consécutives enregistrées. Veuillez patienter 10 minutes avant de réessayer.');
    }

    recent.push(now);
    sessionStorage.setItem(SUBMISSION_TIMESTAMPS_KEY, JSON.stringify(recent));
  } catch (err) {
    if (err.message.includes('patienter')) throw err;
    // En cas de restrictions strictes de sessionStorage, continuer
  }
}

/**
 * Génère un identifiant unique de dossier par type de formulaire.
 */
function generateDossierId(formType) {
  const prefixes = {
    concours: 'CNC',
    adhesion: 'ADH',
    startups: 'STP',
    contact: 'CTC',
    evenements: 'EVT',
  };
  const prefix = prefixes[formType] || 'GFH';
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `GFH-${prefix}-${randomSuffix}`;
}

/**
 * Formate la date et l'heure en français.
 */
function getFormattedDateTime() {
  const now = new Date();
  const dateFormatted = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Africa/Libreville',
  }).format(now);
  return {
    iso: now.toISOString(),
    human: `${dateFormatted} (Heure de Libreville / UTC+1)`,
  };
}

/**
 * Envoie le formulaire vers les deux destinations (Email + Google Sheet) en parallèle.
 * @param {'concours' | 'adhesion' | 'startups' | 'contact' | 'evenements'} formType
 * @param {Object} data Données brutes saisies dans le formulaire
 * @returns {Promise<{ success: boolean, id: string, message: string, isDuplicate?: boolean, destinations: { email: boolean, sheet: boolean } }>}
 */
export async function dispatchFormSubmission(formType, data) {
  // 1. Contrôle anti-spam (champ piège)
  verifyHoneypot(data);

  // 2. Contrôle de limitation de débit
  checkRateLimit();

  // 3. Préparation des métadonnées
  const dossierId = generateDossierId(formType);
  const timeInfo = getFormattedDateTime();
  const isTest = SITE_CONFIG.isTestMode;

  const payload = {
    formType,
    dossierId,
    data: { ...data },
    isTest,
    submittedAt: timeInfo.iso,
    submittedAtFormatted: timeInfo.human,
    recipientEmail: isTest ? SITE_CONFIG.testContactEmail : SITE_CONFIG.contactEmail,
  };

  console.info(`[FormDispatcher] Début d'envoi parallèle (${formType}) [ID: ${dossierId}] :`, {
    dossierId,
    formType,
    isTest,
    recipientEmail: payload.recipientEmail,
  });

  let serverResponse = null;
  let serverError = null;

  // 4. Appel de l'API Serverless Vercel (orchestration email Resend + Google Sheet en backend)
  try {
    const res = await fetch(SITE_CONFIG.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      serverResponse = await res.json();
    } else if (res.status !== 404) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.message || `Erreur serveur (${res.status}).`);
    }
  } catch (err) {
    serverError = err;
    console.warn('[FormDispatcher] Endpoint serveur inaccessible ou en erreur:', err.message);
  }

  // 5. Si la fonction serverless a répondu (mode production / Vercel)
  if (serverResponse) {
    const { emailSuccess, sheetSuccess, isDuplicate, message } = serverResponse;

    // Journalisation de traçabilité
    if (!emailSuccess) {
      console.warn('[FormDispatcher] Attention : Enregistrement Google Sheet réussi mais envoi email en échec.');
    }
    if (!sheetSuccess) {
      console.warn('[FormDispatcher] Attention : Envoi email réussi mais enregistrement Google Sheet en échec.');
    }

    // Si les deux ont échoué
    if (!emailSuccess && !sheetSuccess) {
      throw new Error(
        message || "L'envoi a rencontré une difficulté technique. Vos données restent saisies : veuillez réessayer dans un instant."
      );
    }

    return {
      success: true,
      id: dossierId,
      isDuplicate: Boolean(isDuplicate),
      message: message || 'Votre soumission a été enregistrée avec succès.',
      destinations: {
        email: Boolean(emailSuccess),
        sheet: Boolean(sheetSuccess),
      },
      receivedAt: timeInfo.iso,
    };
  }

  // 6. Mode Fallback direct (ex. exécution locale `npm run dev` sans Vercel CLI)
  // Si une URL Webhook Google Sheet directe est configurée dans le .env
  if (SITE_CONFIG.googleSheetsWebhookUrl) {
    console.info('[FormDispatcher] Exécution du fallback client direct vers Google Sheets...');
    try {
      const sheetRes = await fetch(SITE_CONFIG.googleSheetsWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      if (sheetRes.ok) {
        return {
          success: true,
          id: dossierId,
          message: 'Votre formulaire a été transmis directement au registre officiel.',
          destinations: { email: false, sheet: true },
          receivedAt: timeInfo.iso,
        };
      }
    } catch (e) {
      console.warn('[FormDispatcher] Fallback Google Sheets direct échoué:', e);
    }
  }

  // 7. Si ni le serveur ni le webhook distant n'étaient joignables (environnement de dev hors-ligne)
  if (import.meta.env.DEV) {
    console.info('[FormDispatcher DEV MOCK] Simulation locale active (Vercel API non déployée en local). Dossier simulé avec succès :', dossierId);
    return {
      success: true,
      id: dossierId,
      message: 'Mode développement : soumission simulée avec succès. En production, les données seront envoyées à Resend et Google Sheets.',
      destinations: { email: true, sheet: true },
      receivedAt: timeInfo.iso,
    };
  }

  // En production, si aucune destination n'a répondu
  throw new Error(
    serverError?.message ||
    "Impossible de joindre le service d'envoi. Veuillez vérifier votre connexion Internet et réessayer."
  );
}

