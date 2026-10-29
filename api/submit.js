/**
 * Vercel Serverless Function : /api/submit
 * Orchestre en parallèle l'envoi vers Resend (Email) et Google Sheets (Apps Script).
 * Les clés d'API et URLs Webhook sont lues exclusivement depuis les variables d'environnement.
 */

// Adresse email officielle de réception centrale
// À CONFIRMER : adresse à valider par le client avant la mise en ligne
const DEFAULT_NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL ||
  process.env.VITE_CONTACT_EMAIL ||
  'contact@gabonfintech-hub.com';

const TEST_NOTIFICATION_EMAIL =
  process.env.TEST_NOTIFICATION_EMAIL ||
  process.env.VITE_TEST_CONTACT_EMAIL ||
  'test@gabonfintech-hub.com';

const RESEND_API_URL = 'https://api.resend.com/emails';

/**
 * Génère le sujet de l'email selon le type de formulaire.
 */
function getEmailSubject(formType, dossierId, isTest, data) {
  const prefix = isTest ? '[TEST GFH]' : '[GFH]';
  const name = data.fullName || data.name || data.contactName || data.startupName || 'Visiteur';

  switch (formType) {
    case 'concours':
      return `${prefix} Candidature Concours FinTech : ${name} (${dossierId})`;
    case 'adhesion':
      return `${prefix} Demande d’Adhésion [${(data.category || 'Membre').toUpperCase()}] : ${name} (${dossierId})`;
    case 'startups':
      return `${prefix} Candidature Startup : ${data.startupName || name} (${dossierId})`;
    case 'evenements':
      return `${prefix} Inscription Événement : ${name} (${dossierId})`;
    case 'contact':
    default:
      return `${prefix} Nouveau message de contact : ${name} (${dossierId})`;
  }
}

/**
 * Construit le corps HTML de notification de l'email avec la charte graphique GFH.
 */
function buildEmailHtml(formType, dossierId, data, submittedAtFormatted, isTest, utmSource) {
  const formTitles = {
    concours: 'Grand Concours FinTech Gabon 2026',
    adhesion: 'Demande Officielle d’Adhésion',
    startups: 'Candidature Accompagnement Startup',
    evenements: 'Inscription / Demande Événement',
    contact: 'Formulaire de Contact Direct',
  };

  const title = formTitles[formType] || 'Formulaire Gabon FinTech Hub';

  // Construction des lignes du tableau à partir de tous les champs remplis
  const rows = Object.entries(data)
    .filter(([key, val]) => !key.startsWith('_') && val !== undefined && val !== null && val !== '')
    .map(([key, val]) => {
      const labels = {
        fullName: 'Nom et Prénom',
        name: 'Nom complet',
        contactName: 'Contact principal',
        startupName: 'Nom de la Startup',
        email: 'Adresse e-mail',
        phone: 'Téléphone',
        city: 'Ville de résidence',
        category: 'Catégorie d’adhésion',
        organization: 'Organisation / Entreprise',
        projectOrStartupName: 'Nom du projet / de l’idée',
        websiteOrLinkedIn: 'Site web / Profil LinkedIn',
        projectDescription: 'Description du projet',
        description: 'Présentation',
        message: 'Message transmis',
        subject: 'Sujet / Thématique',
        eventName: 'Événement concerné',
        sector: 'Verticale métier',
        stage: 'Stade d’avancement',
        mainNeed: 'Besoin prioritaire',
        utmSource: 'Source d’acquisition (UTM)',
        source: 'Source d’acquisition (UTM)',
        consent: 'Consentement données',
        rulesAccepted: 'Acceptation règlement',
      };

      const label = labels[key] || key;
      const displayVal = typeof val === 'boolean' ? (val ? 'Oui' : 'Non') : String(val);

      return `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0d2347; width: 35%; background: #f8fafc;">
            ${label}
          </td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #1e293b; white-space: pre-wrap;">
            ${displayVal}
          </td>
        </tr>
      `;
    })
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a;">
      <table align="center" width="100%" max-width="640" style="max-width: 640px; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
        <!-- En-tête bleu institutionnel GFH -->
        <tr style="background: #0d2347;">
          <td style="padding: 24px 28px; text-align: left;">
            <div style="display: inline-block; background: rgba(255,255,255,0.15); color: #38bdf8; font-weight: 800; font-size: 14px; padding: 6px 12px; border-radius: 8px; margin-bottom: 8px;">
              GFH · GABON FINTECH HUB
            </div>
            ${isTest ? '<div style="display: inline-block; background: #f59e0b; color: #000; font-weight: 800; font-size: 11px; padding: 3px 8px; border-radius: 4px; margin-left: 8px;">MODE TEST</div>' : ''}
            <h1 style="color: #ffffff; font-size: 22px; margin: 6px 0 0; font-weight: 700; line-height: 1.25;">
              ${title}
            </h1>
          </td>
        </tr>

        <!-- Corps -->
        <tr>
          <td style="padding: 24px 28px;">
            <p style="font-size: 14px; color: #475569; margin: 0 0 16px;">
              Une nouvelle soumission a été reçue sur la plateforme. Voici le récapitulatif complet des informations transmises :
            </p>

            <div style="background: #e0f2fe; border: 1px solid #bae6fd; border-radius: 8px; padding: 10px 14px; margin-bottom: 20px; font-size: 12px; color: #0369a1;">
              <strong>Dossier N° :</strong> <code style="font-family: monospace; font-size: 13px; font-weight: 700;">${dossierId}</code> &nbsp;|&nbsp;
              <strong>Reçu le :</strong> ${submittedAtFormatted}
              ${utmSource ? `<br><strong>Canal UTM :</strong> ${utmSource}` : ''}
            </div>

            <table width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; font-size: 13px;">
              ${rows}
            </table>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; line-height: 1.5;">
              Ce message a été généré automatiquement par la plateforme officielle <strong>Gabon FinTech Hub</strong>.<br>
              Pour toute question ou assistance technique, contactez l'équipe d'administration du Hub.
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

/**
 * Envoie l'email de notification via Resend API.
 */
async function sendEmailNotification({ formType, dossierId, data, submittedAtFormatted, isTest, recipientEmail, utmSource }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Serverless/Email] RESEND_API_KEY absente des variables d’environnement. Envoi email ignoré.');
    return { success: false, reason: 'RESEND_API_KEY manquante' };
  }

  const subject = getEmailSubject(formType, dossierId, isTest, data);
  const html = buildEmailHtml(formType, dossierId, data, submittedAtFormatted, isTest, utmSource);
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Gabon FinTech Hub <onboarding@resend.dev>';

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [recipientEmail],
      subject,
      html,
      reply_to: data.email || undefined,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[Serverless/Email] Erreur Resend API:', response.status, errorText);
    return { success: false, reason: errorText };
  }

  const result = await response.json();
  console.info('[Serverless/Email] Email transmis avec succès via Resend, id:', result.id);
  return { success: true, id: result.id };
}

/**
 * Enregistre la ligne dans Google Sheets via le Webhook Google Apps Script.
 */
async function sendToGoogleSheet(payload) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('[Serverless/Sheet] GOOGLE_SHEETS_WEBHOOK_URL absente des variables d’environnement. Écriture Sheet ignorée.');
    return { success: false, reason: 'GOOGLE_SHEETS_WEBHOOK_URL manquante' };
  }

  // Google Apps Script Web App attend une requête POST JSON
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    // Apps Script peut renvoyer une redirection 302 vers l'exécution finale
    redirect: 'follow',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[Serverless/Sheet] Erreur Google Apps Script Webhook:', response.status, errorText);
    return { success: false, reason: errorText };
  }

  const result = await response.json().catch(() => ({ success: true }));
  console.info('[Serverless/Sheet] Données écrites dans Google Sheets avec succès:', result);
  return {
    success: true,
    isDuplicate: Boolean(result.isDuplicate),
    row: result.row,
  };
}

/**
 * Handler principal Vercel Serverless Function
 */
export default async function handler(req, res) {
  // N'autoriser que les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée. Utilisez POST.' });
  }

  try {
    const payload = req.body;
    if (!payload || !payload.formType || !payload.data) {
      return res.status(400).json({ message: 'Données de formulaire invalides ou manquantes.' });
    }

    const { formType, dossierId, data, isTest: clientIsTest, submittedAtFormatted } = payload;

    // Déterminer le mode test (soit flagué par le client, soit forcé côté serveur)
    const isTest = Boolean(
      clientIsTest ||
      process.env.TEST_MODE === 'true' ||
      process.env.VITE_TEST_MODE === 'true'
    );

    const recipientEmail = isTest ? TEST_NOTIFICATION_EMAIL : DEFAULT_NOTIFICATION_EMAIL;
    const utmSource = data.utmSource || data.source || req.headers['referer'] || '';

    // Déclenchement EN PARALLÈLE des deux destinations
    console.info(`[Serverless/Submit] Lancement des envois en parallèle pour [${formType}] dossier: ${dossierId}`);

    const [emailResult, sheetResult] = await Promise.allSettled([
      sendEmailNotification({
        formType,
        dossierId,
        data,
        submittedAtFormatted: submittedAtFormatted || new Date().toLocaleString('fr-FR'),
        isTest,
        recipientEmail,
        utmSource,
      }),
      sendToGoogleSheet({
        ...payload,
        isTest,
        recipientEmail,
      }),
    ]);

    const emailSuccess = emailResult.status === 'fulfilled' && emailResult.value.success;
    const sheetSuccess = sheetResult.status === 'fulfilled' && sheetResult.value.success;
    const isDuplicate = sheetResult.status === 'fulfilled' && Boolean(sheetResult.value.isDuplicate);

    console.info(`[Serverless/Submit] Bilan de soumission [${dossierId}] : Email=${emailSuccess}, Sheet=${sheetSuccess}, Doublon=${isDuplicate}`);

    // Si les deux envois ont échoué : échec total
    if (!emailSuccess && !sheetSuccess) {
      console.error('[Serverless/Submit] Échec des deux destinations :', {
        emailError: emailResult.reason || emailResult.value,
        sheetError: sheetResult.reason || sheetResult.value,
      });

      return res.status(502).json({
        success: false,
        message: 'L’enregistrement a échoué auprès des deux destinations. Veuillez vérifier vos identifiants ou réessayer plus tard.',
        destinations: { email: false, sheet: false },
      });
    }

    // Au moins une destination a réussi : succès validé
    return res.status(200).json({
      success: true,
      id: dossierId,
      emailSuccess,
      sheetSuccess,
      isDuplicate,
      message: isDuplicate
        ? 'Votre candidature au concours a bien été enregistrée (note : une soumission précédente existait déjà avec cet email).'
        : 'Votre formulaire a été transmis avec succès.',
    });
  } catch (err) {
    console.error('[Serverless/Submit] Erreur inattendue:', err);
    return res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur lors du traitement de la soumission.',
      error: err.message,
    });
  }
}
