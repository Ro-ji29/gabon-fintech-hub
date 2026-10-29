import { Resources } from '../features/resources/Resources';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { ScrollReveal } from '../components/ScrollReveal';

export function ResourcesPage() {
  const publications = [
    {
      badge: 'Rapport Annuel',
      title: 'Baromètre FinTech Gabon 2026',
      summary: 'État des lieux des volumes de transactions électroniques, cartographie des startups actives et pénétration bancaire.',
    },
    {
      badge: 'Guide Pratique',
      title: 'Manuel de Conformité CEMAC & COBAC',
      summary: 'Les étapes indispensables pour obtenir un agrément d’établissement de paiement ou de monnaie électronique.',
    },
    {
      badge: 'Livre Blanc',
      title: 'L’essor de l’Open Banking en Afrique Centrale',
      summary: 'Opportunités d’interopérabilité bancaire, intégration d’APIs ouvertes et partage sécurisé de données.',
    },
  ];

  return (
    <>
      <section className="bg-navy-800 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <Eyebrow light>RESSOURCES & PUBLICATIONS</Eyebrow>
            <h1 className="font-display text-4xl font-semibold tracking-[-.06em] md:text-6xl">
              L'observatoire de la finance digitale.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ivory-100/80 md:text-lg">
              Notes réglementaires, études d'impact, guides opérationnels et analyses
              macro-économiques au service des praticiens.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Resources />

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-8 lg:px-8">
        <ScrollReveal>
          <Eyebrow>PUBLICATIONS À VENIR</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-[-.05em] text-navy-950 md:text-4xl">
            Études & Analyses de fond
          </h2>
        </ScrollReveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {publications.map((pub, i) => (
            <ScrollReveal
              key={pub.title}
              custom={i}
              className="flex flex-col justify-between rounded-3xl border border-navy-900/10 bg-white p-7 shadow-sm transition hover:shadow-md"
            >
              <div>
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold tracking-wider text-blue-900">
                  {pub.badge}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-navy-950">
                  {pub.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-navy-800/75">
                  {pub.summary}
                </p>
              </div>
              <Button to="/contact" className="mt-8 w-full !text-xs">
                Demander un exemplaire <Icon className="h-4 w-4" />
              </Button>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
