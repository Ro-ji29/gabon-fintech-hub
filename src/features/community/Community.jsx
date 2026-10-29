import { motion, useReducedMotion } from 'framer-motion';
import { scaleIn, fadeUp } from '../../lib/animations';
import { Icon } from '../../components/Icon';
import { Button } from '../../components/Button';
import { Eyebrow } from '../../components/Eyebrow';
import { ScrollReveal } from '../../components/ScrollReveal';

export function Community() {
  const shouldReduceMotion = useReducedMotion();

  // Typologies d'acteurs de l'écosystème (qualitatif, sans noms d'entreprises inventés)
  const ecosystemActors = [
    {
      category: 'Startups & Scale-ups',
      description: 'Porteurs de solutions innovantes dans le paiement, le crédit, l’épargne et l’inclusion.',
      icon: 'rocket',
    },
    {
      category: 'Banques & Assurances',
      description: 'Acteurs historiques collaborant sur l’Open Banking, l’interopérabilité et la digitalisation.',
      icon: 'spark',
    },
    {
      category: 'Régulateurs & Institutions',
      description: 'Dialogue permanent pour accompagner la conformité et l’évolution du cadre légal en zone CEMAC.',
      icon: 'scale',
    },
    {
      category: 'Universités & Centres de R&D',
      description: 'Formation continue des talents locaux et valorisation de la recherche appliquée.',
      icon: 'education',
    },
  ];

  return (
    <section id="communautes" className="relative isolate overflow-hidden bg-navy-800 px-5 py-16 text-white lg:px-8 lg:py-24">
      {/* ── Illustration orbitale des demi-cercles d'arrière-plan ────────────────────────── */}
      <div className="pointer-events-none absolute -right-20 top-[-18rem] -z-10 h-[620px] w-[620px] select-none" aria-hidden="true">
        {/* Anneau 1 (externe, 620px) : rotation horaire avec nœuds satellites lumineux en orbite */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/15"
          animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-300 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
          <span className="absolute bottom-1/4 -left-1 h-2 w-2 rounded-full bg-blue-200/80 shadow-[0_0_10px_rgba(56,189,248,0.7)]" />
        </motion.div>

        {/* Anneau 2 (intermédiaire, inset-16) : rotation anti-horaire à tirets radar */}
        <motion.div
          className="absolute inset-16 rounded-full border border-dashed border-blue-300/35"
          animate={shouldReduceMotion ? { rotate: 0 } : { rotate: -360 }}
          transition={{ duration: 58, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute top-1/3 -right-1 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)]" />
        </motion.div>

        {/* Anneau 3 (interne, inset-36) : onde de propagation concentrique */}
        <motion.div
          className="absolute inset-36 rounded-full border border-white/20"
          animate={
            shouldReduceMotion
              ? { scale: 1, opacity: 0.25 }
              : {
                  scale: [1, 1.04, 1],
                  opacity: [0.2, 0.5, 0.2],
                }
          }
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="absolute bottom-2 left-1/3 h-1.5 w-1.5 rounded-full bg-blue-300/90 shadow-[0_0_6px_rgba(56,189,248,0.8)]" />
        </motion.div>

        {/* Anneau 4 (cœur orbital, inset-56) : pulsation centrale douce */}
        <motion.div
          className="absolute inset-56 rounded-full border border-blue-400/30 bg-blue-400/[0.02]"
          animate={
            shouldReduceMotion
              ? { scale: 1, opacity: 0.3 }
              : {
                  scale: [1, 1.06, 1],
                  opacity: [0.25, 0.6, 0.25],
                }
          }
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="max-w-2xl">
          <Eyebrow light>ÉCOSYSTÈME & COMMUNAUTÉ</Eyebrow>
          <h2 className="font-display text-4xl font-semibold leading-[1.04] tracking-[-.06em] md:text-5xl">
            Le progrès circule quand on <span className="text-blue-300">se connecte.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
            Un réseau d’acteurs engagés qui partagent leurs expertises, expérimentent
            et bâtissent ensemble une finance plus inclusive et performante au Gabon.
          </p>
        </ScrollReveal>

        {/* Typologies d'acteurs fédérés */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ecosystemActors.map((actor, i) => (
            <motion.div
              key={actor.category}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/30 hover:bg-white/10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={i}
            >
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-300/15 text-blue-300">
                <Icon name={actor.icon} className="h-4 w-4" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-white">
                {actor.category}
              </h3>
              <p className="mt-2 text-xs leading-5 text-white/70">
                {actor.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Appel à partenariat remplaçant la liste de faux logos/partenaires */}
        {/* À CONFIRMER : Logos officiels des partenaires à intégrer dès signature des conventions */}
        <ScrollReveal
          variant={scaleIn}
          className="mt-10 rounded-3xl border border-white/15 bg-gradient-to-r from-blue-900/40 via-navy-900/70 to-blue-900/40 p-7 sm:p-10 backdrop-blur-md"
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[.18em] text-blue-300">
                ALLIANCE & CO-INNOVATION
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Devenez partenaire du Gabon FinTech Hub
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/80">
                Vous représentez une institution financière, une entreprise technologique,
                un fonds d'investissement ou un organisme public ? Associez-vous au Hub pour
                soutenir l’innovation, piloter des projets conjoints et valoriser votre rôle
                dans la transformation économique régionale.
              </p>
            </div>
            <Button to="/contact" light className="shrink-0">
              Devenir partenaire <Icon className="h-4 w-4" />
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
