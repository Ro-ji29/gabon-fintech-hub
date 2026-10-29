import { Events } from '../features/events/Events';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { ScrollReveal } from '../components/ScrollReveal';

export function EventsPage() {
  const upcomingEvents = [
    {
      date: 'Novembre 2026',
      title: 'Gabon FinTech Summit 2026',
      type: 'Conférence annuelle',
      location: 'Libreville, Gabon',
      description: 'Le rendez-vous incontournable des décideurs financiers et entrepreneurs tech d’Afrique Centrale.',
    },
    {
      date: 'Trimestriel',
      title: 'FinTech Breakfast Club',
      type: 'Networking & Échanges',
      location: 'Hybride / Libreville',
      description: 'Rencontre informelle entre fondateurs, banquiers partenaires et investisseurs providentiels.',
    },
    {
      date: 'Mensuel',
      title: 'Ateliers Réglementaires & Sandboxes',
      type: 'Formation & Conformité',
      location: 'En ligne',
      description: 'Sessions pratiques de décryptage des évolutions réglementaires et directives régionales.',
    },
  ];

  return (
    <>
      <section className="bg-navy-800 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <Eyebrow light>ÉVÉNEMENTS & RENCONTRES</Eyebrow>
            <h1 className="font-display text-4xl font-semibold tracking-[-.06em] md:text-6xl">
              Les temps forts de la FinTech gabonaise.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ivory-100/80 md:text-lg">
              Des conférences d'envergure régionale aux ateliers spécialisés de décryptage
              réglementaire, vivez le dynamisme du secteur.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Events />

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-8 lg:px-8">
        <ScrollReveal>
          <Eyebrow>PROGRAMME PRÉVISIONNEL</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-[-.05em] text-navy-950 md:text-4xl">
            Prochaines rencontres
          </h2>
        </ScrollReveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {upcomingEvents.map((evt, i) => (
            <ScrollReveal
              key={evt.title}
              custom={i}
              className="flex flex-col rounded-3xl border border-navy-900/10 bg-ivory-50 p-7 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-blue-800">
                <span>{evt.type}</span>
                <span className="rounded-full bg-blue-100 px-3 py-1 font-bold text-blue-900">{evt.date}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-navy-950">{evt.title}</h3>
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-navy-700/70">
                <Icon name="pin" className="h-3.5 w-3.5 text-blue-700" />
                <span>{evt.location}</span>
              </p>
              <p className="mt-3 flex-1 text-sm leading-6 text-navy-800/80">{evt.description}</p>
              <Button to="/contact" className="mt-6 w-full !text-xs">
                S'inscrire / En savoir plus <Icon className="h-4 w-4" />
              </Button>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
