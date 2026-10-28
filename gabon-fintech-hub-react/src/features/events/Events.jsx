import { motion, useReducedMotion } from 'framer-motion';
import { scaleIn, fadeUp } from '../../lib/animations';
import { Icon } from '../../components/Icon';
import { Button } from '../../components/Button';
import { Eyebrow } from '../../components/Eyebrow';
import { ScrollReveal } from '../../components/ScrollReveal';
import { Link } from 'react-router-dom';

export function Events() {
  const shouldReduceMotion = useReducedMotion();

  // Cartes d'événements génériques sans dates inventées
  // À CONFIRMER : Calendrier officiel et dates des prochains événements à intégrer dès validation
  const upcomingEvents = [
    {
      title: 'Gabon FinTech Summit',
      category: 'Grande conférence annuelle',
      status: 'Prochains événements communiqués prochainement',
      description: 'Le rendez-vous de référence réunissant innovateurs, institutions financières et régulateurs de la zone CEMAC.',
    },
    {
      title: 'FinTech Breakfast Club',
      category: 'Rencontre & Échanges',
      status: 'Prochains événements communiqués prochainement',
      description: 'Des matinées informelles de dialogue et de partage d’expérience entre entrepreneurs et experts du secteur.',
    },
    {
      title: 'Ateliers Réglementaires & Sandboxes',
      category: 'Pratique & Régulation',
      status: 'Prochains événements communiqués prochainement',
      description: 'Sessions d’accompagnement sur les évolutions du cadre juridique, la conformité et les dispositifs d’expérimentation.',
    },
  ];

  return (
    <section id="evenements" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <ScrollReveal className="grid gap-8 md:grid-cols-2 md:items-end">
        <div>
          <Eyebrow>ÉVÉNEMENTS & RENCONTRES</Eyebrow>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-.06em] text-navy-950 md:text-5xl">
            Faire avancer les idées,<br />
            <span className="text-blue-700">dans la même salle.</span>
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-navy-800/70">
          Des temps de rencontre privilégiés pour réunir entrepreneurs, institutions, investisseurs et
          experts autour des transformations financières au Gabon et en Afrique Centrale.
        </p>
      </ScrollReveal>

      {/* Médaillon événementiel sommet annuel */}
      <ScrollReveal
        variant={scaleIn}
        className="mt-10 grid gap-6 rounded-3xl bg-blue-100 p-6 sm:grid-cols-[160px_1fr] sm:items-center md:p-9"
      >
        <div className="relative mx-auto flex h-36 w-36 shrink-0 items-center justify-center sm:mx-0">
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-blue-700/40"
            animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
          />

          <motion.div
            className="pointer-events-none absolute inset-1.5 rounded-full border border-blue-600/25"
            animate={
              shouldReduceMotion
                ? { scale: 1, opacity: 0.4 }
                : { scale: [1, 1.05, 1], opacity: [0.3, 0.65, 0.3] }
            }
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="relative z-10 grid h-32 w-32 place-items-center rounded-full border border-blue-400/20 bg-navy-800 text-center font-display text-2xl font-extrabold tracking-tighter text-white select-none"
            animate={
              shouldReduceMotion
                ? { scale: 1 }
                : {
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      '0 10px 30px rgba(13,35,71,0.25), 0 0 20px rgba(56,189,248,0.18)',
                      '0 10px 36px rgba(13,35,71,0.32), 0 0 35px rgba(56,189,248,0.32)',
                      '0 10px 30px rgba(13,35,71,0.25), 0 0 20px rgba(56,189,248,0.18)',
                    ],
                  }
            }
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div>
              <span>GF<span className="text-blue-300">H</span></span>
              <small className="mt-1 block text-[8px] font-semibold tracking-[.17em] text-white/75">
                FINTECH SUMMIT
              </small>
            </div>
          </motion.div>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-[.18em] text-blue-800">
            RENCONTRE DE RÉFÉRENCE
          </span>
          <h3 className="mt-1 font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
            Gabon FinTech Summit
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-navy-800/75">
            Le grand sommet annuel rassemblant les forces vives de l'écosystème : conférences plénières,
            décryptages réglementaires, démos technologiques et opportunités de partenariats.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Link
              to="/evenements"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-800 transition hover:text-blue-900"
            >
              <span>Découvrir le programme sur la page Événements</span>
              <Icon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Cartes d'événements génériques sans dates inventées */}
      {/* À CONFIRMER : Mettre à jour avec les dates réelles dès confirmation du calendrier officiel */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {upcomingEvents.map((evt, i) => (
          <motion.div
            key={evt.title}
            className="flex flex-col justify-between rounded-3xl border border-navy-900/10 bg-ivory-50 p-6 shadow-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-md"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            custom={i}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
                  {evt.category}
                </span>
              </div>
              <h4 className="mt-3 font-display text-lg font-bold text-navy-950">
                {evt.title}
              </h4>
              <p className="mt-2 text-xs leading-5 text-navy-700/75">
                {evt.description}
              </p>
            </div>

            <div className="mt-6 border-t border-navy-900/10 pt-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-900">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                {evt.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button to="/evenements">
          Accéder à tous les événements <Icon className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
