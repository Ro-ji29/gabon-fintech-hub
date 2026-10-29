// TEXTES D'ATTENTE : À CONFIRMER AVEC LE CLIENT
// Les partenaires institutionnels et entreprises adhérentes seront intégrés dès confirmation.

export const partners = Array.from(
  { length: 8 },
  (_, i) => `Partenaire Institutionnel ${String(i + 1).padStart(2, '0')}` // À CONFIRMER : liste nominative des logos partenaires
);
