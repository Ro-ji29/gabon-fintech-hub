# Gabon FinTech Hub — Feuille de Route & Liste des Tâches (TASKS.md)

Ce document répertorie l'ensemble des tâches de développement, des données à remplacer et des fonctionnalités manquantes ou à finaliser sur la plateforme **Gabon FinTech Hub**.  
Il est structuré par page et domaine, avec des cases à cocher à maintenir à jour au fil des livraisons.

---

## État Global & Tâches Transverses

### 1. Remplacement des Données Fictives & Textes d'Attente
- [x] **Retrait des badges « Contenu fictif » et « Données fictives »** : suppression de tous les badges et imports résiduels sur l'ensemble de la page d'accueil et des composants.
- [x] **Suppression des textes entre crochets `[ ]` et des mentions non vérifiables** : remplacement par des formulations d'attente professionnelles ancrées dans l'écosystème FinTech gabonais et zone CEMAC, sans chiffres ou dates inventées.
- [x] **Remplacement des emojis par des icônes vectorielles SVG** : utilisation exclusive du composant unifié `Icon` (`currentColor`, accessibilité `aria-hidden` / `aria-label`).
- [x] **Organisation du code source** : tous les fichiers de `src/data/` comportent l'en-tête `// TEXTES D'ATTENTE : À CONFIRMER AVEC LE CLIENT` et l'annotation `// À CONFIRMER` en regard de chaque donnée indicative.

#### Liste récapitulative des textes d'attente à valider avec le client :
- [ ] **Chiffres clés & Statistiques** (`src/data/stats.js` & `src/features/stats/Stats.jsx`) :
  - [x] Remplacés pour la mise en ligne par des messages qualitatifs sans chiffres (« Une communauté qui grandit », « Un accompagnement ciblé », « Des événements toute l’année », « Un réseau d’acteurs engagés »).
  - [ ] À CONFIRMER : Remplacer par les statistiques réelles certifiées (membres, startups, événements, partenaires) dès validation officielle.
- [ ] **Conseil de surveillance sur l'accueil** (`src/pages/HomePage.jsx` & `src/features/council/Council.jsx`) :
  - [x] Masqué sur la page d'accueil tant que la liste nominative officielle n'est pas fournie.
  - [ ] À CONFIRMER : Réintégrer `<Council />` sur la page d'accueil dès validation officielle des noms, fonctions et photos.
- [ ] **Partenaires & Membres** (`src/features/community/Community.jsx` & `src/data/partners.js`) :
  - [x] Grille de faux logos masquée et remplacée par la présentation des 4 familles d'acteurs et un bloc d'appel « Devenez partenaire du Gabon FinTech Hub » vers `/contact`.
  - [ ] À CONFIRMER : Remplacer par les dénominations officielles et logos vectoriels des partenaires signataires.
- [ ] **Actualités & Événements** (`src/features/events/Events.jsx`) :
  - [x] Cartes génériques sans dates inventées (« Prochains événements communiqués prochainement ») avec lien direct vers `/evenements`.
  - [ ] À CONFIRMER : Valider le calendrier officiel des événements et les dates définitives du Gabon FinTech Summit.
- [ ] **Témoignages & Citations** (`src/features/mission/MissionQuote.jsx`) :
  - [x] Faux témoignages évités ; intégration d'une citation institutionnelle de la mission du Gabon FinTech Hub sans nom de personne inventé.
  - [ ] À CONFIRMER : Valider la formulation définitive de la devise ou charte fondatrice du Hub.
- [ ] **Concours FinTech** (`src/features/contest/ContestHighlight.jsx` & `src/data/concours.js`) :
  - [x] Section d'accueil dédiée mise en avant avec mention « Inscription 100% gratuite et ouverte à tous » et bouton vers `/concours`.
  - [ ] À CONFIRMER : Nom officiel du concours, dates officielles (inscriptions, bootcamp, finale) et montants des dotations.
- [ ] **Adhésion & Offre Fondateurs** (`src/features/membership/OfferBanner.jsx` & `src/features/membership/PlanCard.jsx`) :
  - [x] Suppression des mentions de date arbitraire (ex. « jusqu'en 2030 » remplacé par « Adhésion offerte pour les membres fondateurs ») et désactivation du compteur numérique non vérifié.
  - [ ] À CONFIRMER : Grille tarifaire définitive et quota de membres fondateurs.
- [ ] **Coordonnées & Réseaux** (`src/features/contact/Contact.jsx` & `src/config/site.js`) :
  - [x] Suppression du numéro de téléphone fictif au profit d'une mention de permanence e-mail & LinkedIn ; lien officiel LinkedIn connecté (`https://www.linkedin.com/company/gabon-fintech-hub/`).
  - [ ] À CONFIRMER : Numéro officiel du standard, adresse physique exacte à Libreville et validation finale de `contact@gabonfintech-hub.com`.

### 2. Infrastructure, Sécurité & Services Tiers
- [x] **Gestion des formulaires (Backend / Emailing & Google Sheets)** :
  - [x] Fonction serverless Vercel (`api/submit.js`) orchestrant les deux destinations en parallèle.
  - [x] **Email via Resend** : envoi d'une notification à chaque soumission vers `NOTIFICATION_EMAIL` (configurée dans Vercel, jamais en dur).
  - [x] **Google Sheets via Apps Script Webhook** : ajout d'une ligne par envoi dans l'onglet correspondant (Concours, Adhésion, Contact, Événements). Doublon concours détecté et marqué en jaune.
  - [x] **Anti-spam honeypot** : champ `_honeypot` invisible ajouté aux 4 formulaires (`ContestRegistrationForm`, `StartupRegistrationForm`, `FormulaireAdhesion`, `Contact`).
  - [x] **Rate limiting côté client** : max 6 envois / 10 min, délai 4 s minimum entre deux soumissions (via `sessionStorage`).
  - [x] **Mode test** : `VITE_TEST_MODE=true` + `TEST_MODE=true` → email préfixé `[TEST GFH]` + ligne dans onglet "Test" du Sheet.
  - [x] **Gestion résiliente** : succès partiel accepté (email OK / Sheet KO ou l'inverse), échec total → message d'erreur poli sans perte de données.
  - [x] **Script Apps Script** prêt à déployer : `scripts/google-apps-script.js`.
  - [x] **Variables d'environnement documentées** : `.env.example` entièrement réécrit.
  - [ ] À CONFIRMER : Créer le Google Sheet, déployer le script Apps Script, renseigner `GOOGLE_SHEETS_WEBHOOK_URL` dans Vercel.
  - [ ] À CONFIRMER : Créer le compte Resend, vérifier le domaine `gabonfintech-hub.com`, renseigner `RESEND_API_KEY` dans Vercel.
  - [ ] À CONFIRMER : Valider l'adresse `contact@gabonfintech-hub.com` comme adresse de réception (`NOTIFICATION_EMAIL`).
  - [ ] Mettre en place un accusé de réception automatique par email envoyé à l'adhérent/visiteur (fonctionnalité Resend à ajouter).

#### Variables d'environnement à renseigner dans Vercel (production)
```
RESEND_API_KEY=re_...                    # Clé API Resend (dashboard Resend)
NOTIFICATION_EMAIL=contact@gabonfintech-hub.com   # À CONFIRMER avec le client
RESEND_FROM_EMAIL=Gabon FinTech Hub <noreply@gabonfintech-hub.com>
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
TEST_MODE=false
TEST_NOTIFICATION_EMAIL=test@gabonfintech-hub.com
VITE_TEST_MODE=false
VITE_CONTACT_EMAIL=contact@gabonfintech-hub.com
VITE_SITE_URL=https://gabonfintech-hub.com
```
  - [ ] Ajouter une protection anti-spam (Cloudflare Turnstile ou Google reCAPTCHA v3 invisible).
- [ ] **SEO & Balises Open Graph** :
  - [ ] Définir les meta tags dynamiques (titre, description, mots-clés) pour chaque route via `react-helmet-async` ou équivalent.
  - [ ] Ajouter une image Open Graph officielle (`og:image`) pour le partage sur LinkedIn, X et WhatsApp.
  - [ ] Générer le `sitemap.xml` et le `robots.txt`.
- [ ] **Performance & Accessibilité** :
  - [ ] Audit Lighthouse (cible : > 95 sur Desktop et Mobile).
  - [ ] Vérifier les ratios de contraste et la navigation au clavier.

---

## Page d'Accueil (`/`) — Préparation pour mise en ligne

- [x] **Architecture modulaire par features** : Hero, Stats (qualitatif), À propos, Citation de Mission, Concours FinTech (mis en avant), Adhésion, Communauté (appel à partenariat), Événements (cartes génériques sans dates inventées), Ressources, Contact.
- [x] **Motion Design de l'illustration Hero** : Orbites continues, ondes concentriques, noyau GFH pulsant et badges satellites flottants avec support `prefers-reduced-motion`.
- [x] **Animations de l'ensemble des illustrations du site** : Événements (médaillon Summit), Communautés (demi-cercles & badges), À propos (piliers & médaillons), Contact (blobs flous animés 60 FPS).
- [x] **Chiffres clés qualitatifs** : Remplacement des statistiques chiffrées par des messages qualitatifs (« Une communauté qui grandit », « Un accompagnement ciblé », « Des événements toute l’année », « Un réseau d’acteurs engagés »).
- [x] **Section Partenaires transformée** : Remplacement de la grille fictive par la présentation des 4 typologies d'acteurs et un bloc d'appel stratégique « Devenez partenaire du Gabon FinTech Hub » pointant vers `/contact`.
- [x] **Citation de la mission intégrée** : Remplacement des faux témoignages par une citation inspirante de la mission de l'association, sans nom inventé.
- [x] **Section Concours mise en avant** : Carte dédiée `ContestHighlight` avec rappel de l'inscription gratuite et ouverte à tous et redirection vers `/concours`.
- [x] **Conseil de surveillance masqué** : Section masquée sur l'accueil tant que les nominations officielles ne sont pas validées.
- [x] **Événements sans dates inventées** : Cartes génériques « Prochains événements communiqués prochainement » avec bouton vers la page `/evenements`.
- [x] **Adhésion & Fondateurs assainis** : Suppression des dates arbitraires (« jusqu'en 2030 ») et désactivation du compteur non confirmé.
- [x] **Réseaux & Contact fiabilisés** : Lien direct vers le compte officiel LinkedIn et permanence par email.
- [ ] **Fonctionnalités à connecter** :
  - [ ] Module d'inscription à l'infolettre / newsletter directe dans la section d'accueil ou de contact.
  - [ ] Intégration d'une courte vidéo de présentation institutionnelle ou d'un teaser d'événement (si disponible).

---

## Page « À propos » (`/a-propos`)

- [x] Structure de présentation de la plateforme collaborative, mission, vision, activités et 4 piliers.
- [x] Intégration du composant dédié au **Conseil de surveillance** (`Council.jsx`).
- [ ] **Améliorations & fonctionnalités manquantes** :
  - [ ] Fiches individuelles ou popins biographiques pour chaque membre du Conseil avec lien LinkedIn.
  - [ ] Téléchargement de la charte éthique ou des statuts constitutifs du Hub en PDF.
  - [ ] Ajout d'une frise chronologique interactive de la création du Hub et des étapes franchies.

---

## Page « Adhésion » (`/adhesion`)

- [x] Grille comparative des formules d'adhésion avec expansion des avantages (`PlanCard.jsx`).
- [x] Bannière dynamique de l'Offre Fondateurs avec compte à rebours de places (`OfferBanner.jsx`).
- [x] Composant autonome `FormulaireAdhesion.jsx` pré-sélectionnant la formule choisie.
- [ ] **Fonctionnalités à connecter** :
  - [ ] Raccordement du formulaire au CRM ou à la base de données des candidatures.
  - [ ] Upload de pièces justificatives (Kbis/RCCM, attestation NIF, pièce d'identité du représentant).
  - [ ] Option de paiement en ligne des cotisations (Airtel Money, Moov Money, Carte Bancaire) ou génération automatique de facture proforma.
  - [ ] Téléchargement des Conditions Générales d'Adhésion (CGA).

---

## Page « Communautés » (`/communautes`)

- [x] Section animée des membres et partenaires avec illustration des demi-cercles orbitaux.
- [x] Description des typologies de membres (Startups, Banques, Régulateurs, Universités).
- [ ] **Fonctionnalités à développer** :
  - [ ] **Annuaire public des membres** :
    - [ ] Moteur de recherche textuel par nom d'entreprise ou mot-clé.
    - [ ] Filtres par verticale métier (Paiement, Micro-finance, RegTech, InsurTech, etc.).
    - [ ] Fiche vitrine pour chaque membre avec logo, description courte et lien externe.
  - [ ] Formulaire spécifique pour proposer un partenariat institutionnel.

---

## Page « Événements » (`/evenements`)

- [x] Présentation du **Gabon FinTech Summit** avec médaillon orbital animé.
- [x] Programme prévisionnel (Sommet annuel, Breakfast clubs, Ateliers réglementaires).
- [ ] **Fonctionnalités à développer** :
  - [ ] **Système d'inscription aux événements** :
    - [ ] Formulaire de réservation de place ou billetterie connectée.
    - [ ] Envoi d'un billet électronique / QR Code par email.
  - [ ] Agenda téléchargeable (fichier `.ics` / ajout automatique à Google Calendar & Outlook).
  - [ ] Section « Événements passés » avec galerie photos, comptes-rendus et replays vidéo.
  - [ ] Formulaire « Devenir intervenant / Call for Speakers ».

---

## Page « Ressources » (`/ressources`)

- [x] Présentation des axes de recherche (Cadre réglementaire, Innovation, Inclusion).
- [x] Liste des études et publications à paraître.
- [ ] **Fonctionnalités à développer** :
  - [ ] **Téléchargement effectif de documents** :
    - [ ] Intégration des fichiers PDF réels (Baromètre FinTech, Guide COBAC, Livres blancs).
    - [ ] Formulaire de collecte d'email avant téléchargement (*lead capture*).
  - [ ] Glossaire interactif des termes FinTech et bancaires de la zone CEMAC.
  - [ ] Filtres par type de document (Guides pratiques, Décryptages réglementaires, Rapports d'analyse).

---

## Page « Contact » (`/contact`)

- [x] Coordonnées téléphoniques, email et adresse de Libreville.
- [x] Formulaire de contact direct complet avec sélecteur d'objet et état de soumission animé.
- [x] **Background animé de formes abstraites (blobs)** : Dégradés organiques vert/bleu, flou gaussien large (`blur-[100px]`), translations fluides GPU 60 FPS et prise en charge de `prefers-reduced-motion`.
- [x] **Lien officiel LinkedIn connecté** : vers `https://www.linkedin.com/company/gabon-fintech-hub/` avec icône vectorielle dédiée.
- [ ] **Fonctionnalités à connecter** :
  - [ ] Raccordement effectif du formulaire à l'API d'envoi d'email.
  - [ ] Intégration d'une carte interactive (OpenStreetMap / Leaflet ou Google Maps) localisant le siège à Libreville.
  - [ ] Section FAQ interactive (Foire aux questions dépliable).

---

## Page dédiée « Inscription Startups » (`/inscription-startups`)

- [x] **Architecture de la landing page dédiée (LinkedIn & réseaux)** :
  - [x] Hero court adressé aux fondateurs FinTech avec promesse et bouton d'ancrage fluide vers le formulaire.
  - [x] Section « Pourquoi rejoindre le Hub » réutilisant les 7 avantages du plan Startup issus de `data/plans.js`.
  - [x] Bandeau « Offre Fondateurs » réutilisant `OfferBanner` (compteur désactivé tant que les chiffres ne sont pas confirmés).
  - [x] Formulaire d'inscription complet avec validation, sélecteurs métiers, compteur dynamique (500 car. max) et capture de la source UTM (`utm_source=linkedin`).
  - [x] Mini-FAQ interactive de 4 questions ciblées sur l'éligibilité, les coûts, la sélection et la réglementation.
  - [x] Balises meta SEO et Open Graph complètes pour le partage LinkedIn (`og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`).
  - [x] Visuel Open Graph 1200x630 px aux couleurs de la charte dans `public/assets/og-startups-preview.svg`.
  - [x] Couche de service découplée `src/services/startupService.js` (simulation asynchrone).
- [ ] **Fonctionnalités à connecter en production** :
  - [ ] **Raccordement réel du service** : brancher `src/services/startupService.js` sur l'API backend officielle, un Webhook CRM (HubSpot / Airtable) ou une boîte email de réception.
  - [ ] **Nom de domaine de production** : renseigner la variable d'environnement `VITE_SITE_URL` sur l'hébergeur pour générer les URLs absolues définitives lors du partage LinkedIn.
  - [ ] **Visuel Open Graph définitif** : remplacer l'image SVG par le visuel PNG/JPEG définitif produit par l'équipe graphique.
  - [ ] **Confirmation du quota fondateurs** : réactiver le compteur de places restantes dans `OfferBanner` une fois le nombre exact validé par le Conseil.

---

## Page dédiée « Concours FinTech » (`/concours`)

- [x] **Architecture de la landing page dédiée (LinkedIn & réseaux)** :
  - [x] Hero court avec titre du concours (« Concours FinTech Gabon 2026 »), phrase de promesse, mention « Inscription gratuite, ouverte à tous » et bouton d'ancrage vers le formulaire.
  - [x] Section « Le concours en bref » articulée en 5 axes : Objectif, Qui peut participer, Déroulé (étapes & dates prévisionnelles), Prix/Récompenses, Critères de sélection.
  - [x] Exclusion totale des tarifs, plans d'adhésion et de l'offre fondateurs sur cette page spécifique.
  - [x] Formulaire d'inscription complet avec validation côté client, sélecteur de projet, compteur dynamique (500 caractères max), consentements obligatoires et champ caché pour la source UTM (`utm_source`).
  - [x] Mini-FAQ interactive de 4 questions pour lever les freins des candidats.
  - [x] Balises meta SEO et Open Graph optimisées pour le partage LinkedIn (`title`, `description`, `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`).
  - [x] Image Open Graph 1200x630 px aux couleurs du site (`public/assets/og-concours-preview.svg`).
  - [x] Couche de service découplée `src/services/contestService.js` (envoi asynchrone simulé avec ID de dossier unique).
  - [x] Lien discret d'accès direct dans le footer (`Concours FinTech`).
- [ ] **Fonctionnalités & Données à connecter en production** :
  - [x] **Mise en avant omnicanale du Concours FinTech sur tout le site** :
  - [x] **Bandeau d'annonce supérieur persistant (`TopAnnouncementBanner.jsx`)** : affiché tout en haut du site sur toutes les pages, mentionnant « Gratuit et ouvert à tous », avec lien vers `/concours` et bouton de fermeture mémorisé pour la session (`sessionStorage`).
  - [x] **Bouton d'action dans la barre de navigation (`Header.jsx`)** : bouton d'accent bleu bien distinct « Participer au concours » visible sur fond clair ou sombre au scroll, ainsi que dans le menu mobile.
  - [x] **Section dédiée sur la page d'accueil juste après le Hero (`ContestHighlight.jsx`)** : titre accrocheur (« Grand Concours FinTech Gabon »), rappel de la gratuité et de l'ouverture à tous, animation fluide respectant `prefers-reduced-motion` et bouton « Participer au concours ».
  - [x] **Lien dans le pied de page (`Footer.jsx`)** : conservé en complément sous la rubrique Assistance.
  - [x] **Cohérence du message & libellé unique** : aucune mention d'adhésion payante ou de tarifs associée au concours, libellé de bouton unifié « Participer au concours ».
- [ ] **Informations réelles du concours** : valider le nom définitif, les dates réelles de clôture et du bootcamp, et les montants exacts des dotations financières.
  - [ ] **Règlement officiel du concours** : faire valider le texte juridique du règlement, générer le document PDF téléchargeable et insérer le lien dans le formulaire.
  - [ ] **Raccordement réel de la couche d'envoi** : connecter `src/services/contestService.js` à l'API backend du Hub, à un webhook Airtable/CRM ou à la boîte de réception des candidatures.
  - [ ] **Confirmation de l'adresse email** : valider avec le client la forme définitive de l'email de contact (`contact@gabonfintech-hub.com`).

---

## Pages Légales & Conformité

- [ ] Créer la page **Mentions Légales** (`/mentions-legales`) : Raison sociale, hébergeur, directeurs de publication.
- [ ] Créer la page **Politique de Confidentialité** (`/confidentialite`) : Traitement des données personnelles conforme aux directives de l'APDP (Gabon).
- [ ] Bannière de gestion du consentement des cookies.

---

## Évolutions Futures (V2)
- [ ] Support multilingue complet (Français / Anglais via `i18next`).
- [ ] Espace membre sécurisé (Dashboard adhérent, accès aux groupes de travail exclusifs).
- [ ] Blog / Actualités FinTech en temps réel avec CMS headless (ex. Strapi, Directus ou Sanity).
