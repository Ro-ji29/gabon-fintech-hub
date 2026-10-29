// TEXTES D'ATTENTE : À CONFIRMER AVEC LE CLIENT
// Les formules et cotisations ci-dessous sont indicatives et doivent être validées par le Conseil.

export const plans = [
  {
    id: 'academique',
    name: 'Académique',
    target: 'Étudiants, Chercheurs & Établissements',
    price: 'Gratuit', // À CONFIRMER
    founder: true,
    benefits: [
      'Accès aux programmes de formation certifiants (blockchain, cybersécurité, finance digitale)',
      'Développement d’expertise certifiée reconnue internationalement',
      'Participation aux bootcamps entrepreneuriaux et hackathons',
      'Accès aux ressources pédagogiques et documentation technique',
      'Mentorat par des professionnels du secteur FinTech',
      'Opportunités de stages et d’insertion professionnelle',
      'Tarifs préférentiels pour événements et conférences',
    ],
  },
  {
    id: 'startup',
    name: 'Startup',
    target: 'FinTechs en phase de lancement',
    price: '150 000 FCFA / an', // À CONFIRMER : montant annuel de cotisation
    founder: true,
    recommended: true,
    benefits: [
      'Participation aux pitch competitions trimestrielles devant investisseurs',
      'Mise en relation directe avec fonds de capital-risque et investisseurs',
      'Accompagnement personnalisé pour levées de fonds',
      'Accès à l’incubation et programmes d’accélération',
      'Visibilité internationale via African FinTech Network',
      'Support technique et mentorat par experts du secteur',
      'Conseil en conformité réglementaire (KYC/AML, COBAC)',
    ],
  },
  {
    id: 'professionnel',
    name: 'Professionnel',
    target: 'Indépendants, Consultants & Experts',
    price: '75 000 FCFA / an', // À CONFIRMER : montant annuel de cotisation
    founder: true,
    benefits: [
      'Accès aux formations continues et certifications professionnelles',
      'Networking avec leaders du secteur et décideurs',
      'Accès au réseau African FinTech Network',
      'Participation aux événements exclusifs et conférences',
      'Opportunités de missions et de consulting dans l’écosystème',
      'Veille technologique et réglementaire du secteur',
      'Plateforme de promotion des compétences et services',
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate',
    target: 'Banques, Institutions & Grandes Entreprises',
    price: 'À partir de 1 500 000 FCFA / an (sur devis)', // À CONFIRMER : grille grands comptes
    benefits: [
      'Networking panafricain via African FinTech Network',
      'Positionnement comme leader de l’innovation en zone CEMAC',
      'Réduction du time-to-market pour vos nouveaux services digitaux',
    ],
    offers: [
      ['STRATÉGIQUE', 'Connect', 'Accès au vivier de startups et partenariats technologiques'],
      ['ACCÉLÉRATION', 'Accelerate', 'Co-création de produits et formation de vos équipes'],
      ['INFLUENCE', 'Advocate', 'Dialogue privilégié avec les régulateurs (COBAC, ARCEP)'],
    ],
  },
  {
    id: 'media',
    name: 'Média',
    target: 'Journalistes & Créateurs de contenu',
    price: 'Gratuit sur accréditation', // À CONFIRMER
    benefits: [
      'Accès exclusif aux conférences de presse et annonces majeures',
      'Interviews prioritaires avec leaders et experts du secteur',
      'Accès privilégié aux événements du Gabon FinTech Summit',
      'Information en avant-première sur les lancements',
      'Collaboration avec FinTech Magazine Africa et Financial Inclusion TV',
      'Formation sur les technologies FinTech pour la couverture médiatique',
    ],
  },
];

export const founderSeatsRemaining = 14; // À CONFIRMER : nombre exact de places membres fondateurs restantes
export const founderLimit = '20 premiers membres fondateurs de chaque catégorie'; // À CONFIRMER
