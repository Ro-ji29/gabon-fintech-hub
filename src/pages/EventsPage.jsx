import { Events } from '../features/events/Events';
import { Eyebrow } from '../components/Eyebrow';
import { ScrollReveal } from '../components/ScrollReveal';

export function EventsPage() {
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
              De notre compétition d'élite aux grands rendez-vous FinTech du continent,
              suivez les temps forts de l'écosystème.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Events />

    </>
  );
}
