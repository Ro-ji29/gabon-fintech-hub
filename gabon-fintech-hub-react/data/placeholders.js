// DONNÉES FICTIVES : À REMPLACER AVANT MISE EN LIGNE
export const placeholders = {
  tenure: 'plus de 7 ans',
  founderSeatsRemaining: 14,
  founderLimit: '20 premiers membres fondateurs de chaque catégorie',
  contact: { phone: '+241 01 00 00 00', email: 'contact@gabonfintech.org', address: 'Libreville, Gabon' },
  stats: [{ value: 48, label: 'Membres' }, { value: 12, label: 'Startups accompagnées' }, { value: 9, label: 'Événements organisés' }, { value: 15, label: 'Partenaires institutionnels' }],
  board: [
    ['AM', 'Arielle Mba', 'Présidente du Conseil'], ['PN', 'Patrick Ndong', 'Vice-président'], ['CO', 'Clarisse Obame', 'Secrétaire générale'],
    ['JM', 'Joël Moussavou', 'Trésorier'], ['LN', 'Laure Nzamba', 'Partenariats institutionnels'], ['SB', 'Serge Bivigou', 'Responsable de la formation'],
  ],
  plans: [
    { id: 'academique', name: 'Académique', target: 'Étudiants, Chercheurs & Établissements', price: 'Gratuit', founder: true, benefits: ['Accès aux programmes de formation certifiants (blockchain, cybersécurité, finance digitale)', 'Développement d’expertise certifiée reconnue internationalement', 'Participation aux bootcamps entrepreneuriaux et hackathons', 'Accès aux ressources pédagogiques et documentation technique', 'Mentorat par des professionnels du secteur FinTech', 'Opportunités de stages et d’insertion professionnelle', 'Tarifs préférentiels pour événements et conférences'] },
    { id: 'startup', name: 'Startup', target: 'FinTechs en phase de lancement', price: '150 000 FCFA / an', founder: true, recommended: true, benefits: ['Participation aux pitch competitions trimestrielles devant investisseurs', 'Mise en relation directe avec fonds de capital-risque et investisseurs', 'Accompagnement personnalisé pour levées de fonds', 'Accès à l’incubation et programmes d’accélération', 'Visibilité internationale via African FinTech Network', 'Support technique et mentorat par experts du secteur', 'Conseil en conformité réglementaire (KYC/AML, COBAC)'] },
    { id: 'professionnel', name: 'Professionnel', target: 'Indépendants, Consultants & Experts', price: '75 000 FCFA / an', founder: true, benefits: ['Accès aux formations continues et certifications professionnelles', 'Networking avec leaders du secteur et décideurs', 'Accès au réseau African FinTech Network', 'Participation aux événements exclusifs et conférences', 'Opportunités de missions et de consulting dans l’écosystème', 'Veille technologique et réglementaire du secteur', 'Plateforme de promotion des compétences et services'] },
    { id: 'corporate', name: 'Corporate', target: 'Banques, Institutions & Grandes Entreprises', price: 'À partir de 1 500 000 FCFA / an (sur devis)', benefits: ['Networking panafricain via African FinTech Network', 'Positionnement comme leader de l’innovation en zone CEMAC', 'Réduction du time-to-market pour vos nouveaux services digitaux'], offers: [['STRATÉGIQUE', 'Connect', 'Accès au vivier de startups et partenariats technologiques'], ['ACCÉLÉRATION', 'Accelerate', 'Co-création de produits et formation de vos équipes'], ['INFLUENCE', 'Advocate', 'Dialogue privilégié avec les régulateurs (COBAC, ARCEP)']] },
    { id: 'media', name: 'Média', target: 'Journalistes & Créateurs de contenu', price: 'Gratuit sur accréditation', benefits: ['Accès exclusif aux conférences de presse et annonces majeures', 'Interviews prioritaires avec leaders et experts du secteur', 'Accès privilégié aux événements du Gabon FinTech Summit', 'Information en avant-première sur les lancements', 'Collaboration avec FinTech Magazine Africa et Financial Inclusion TV', 'Formation sur les technologies FinTech pour la couverture médiatique'] },
  ],
  partners: Array.from({ length: 8 }, (_, i) => `Logo partenaire ${String(i + 1).padStart(2, '0')}`),
  activities: ['Programmes d’innovation : bootcamps, hackathons et projets pilotes', 'Accompagnement des startups FinTech', 'Préparation à la levée de fonds et à l’investissement', 'Formation continue des professionnels du secteur', 'Dialogue réglementaire et plaidoyer institutionnel', 'Organisation d’événements majeurs, dont le Gabon FinTech Summit'],
  mission: ['Un réseau collaboratif national et international', 'Une plateforme de visibilité pour les initiatives gabonaises', 'Un accès facilité aux financements et à l’investissement', 'Une représentation collective auprès des autorités et régulateurs', 'Des programmes de formation, de certification et de renforcement des capacités'],
  pillars: [['bulb', 'Innovation', 'Stimuler la création de solutions financières numériques adaptées aux réalités locales et régionales.'], ['education', 'Éducation & Talents', 'Former, certifier et valoriser la nouvelle génération de leaders FinTech.'], ['scale', 'Réglementation & Plaidoyer', 'Faciliter un dialogue constructif entre innovateurs, institutions et autorités.'], ['arrow', 'Financement & Investissement', 'Connecter les startups aux investisseurs, fonds et partenaires stratégiques.']],
  resources: [['CADRE RÉGLEMENTAIRE', 'Comprendre les règles du jeu', 'Repères sur la conformité et le dialogue avec les autorités.'], ['INNOVATION FINANCIÈRE', 'La FinTech en contexte', 'Les tendances qui transforment les services financiers en Afrique Centrale.'], ['INCLUSION', 'Élargir l’accès', 'Pistes pour concevoir des services financiers accessibles à tous.']],
  social: ['LinkedIn', 'Facebook', 'YouTube'],
  openGraphStartups: {
    isProvisional: true,
    dimensions: '1200x630',
    path: '/assets/og-startups-preview.svg',
    title: 'Gabon FinTech Hub — Inscription Startups',
    description: 'Rejoignez le réseau des pionniers de la finance technologique au Gabon et en Afrique Centrale.',
  },
  openGraphConcours: {
    isProvisional: true,
    dimensions: '1200x630',
    path: '/assets/og-concours-preview.svg',
    title: 'Concours FinTech Gabon 2026 — Inscription Gratuite',
    description: 'Participez au grand concours national de l’innovation financière au Gabon. Inscription 100% gratuite et ouverte à tous.',
  },
};

