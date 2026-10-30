import { motion, useReducedMotion } from 'framer-motion';
import { scaleIn, fadeUp } from '../../lib/animations';
import { Icon } from '../../components/Icon';
import { Button } from '../../components/Button';
import { Eyebrow } from '../../components/Eyebrow';
import { ScrollReveal } from '../../components/ScrollReveal';
import { members } from '../../data/members';

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
    <section id="communautes" className="relative isolate overflow-hidden bg-navy-800 py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_440px]">
          <ScrollReveal className="max-w-2xl">
            <Eyebrow light>ÉCOSYSTÈME & COMMUNAUTÉ</Eyebrow>
            <h2 className="font-display text-4xl font-semibold leading-[1.04] tracking-[-.06em] md:text-5xl">
              Le progrès circule quand on <span className="text-blue-300">se connecte.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
              Un réseau d’acteurs engagés qui partagent leurs expertises, expérimentent
              et bâtissent ensemble une finance plus inclusive et performante au Gabon.
            </p>

            {/* Membres (mobile et tablette) */}
            <ul className="mt-8 flex flex-wrap gap-3 lg:hidden" aria-label="Nos membres">
              {members.map((m) => (
                <li key={m.name}>
                  <MemberBadge member={m} />
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Orbite des logos membres (ordinateur) */}
          <div className="relative hidden aspect-square w-full lg:block" aria-label="Nos membres">
            <motion.div
              className="absolute inset-0 rounded-full border border-white/15"
              animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
              transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-300 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
            </motion.div>
            <motion.div
              className="absolute inset-[18%] rounded-full border border-dashed border-blue-300/35"
              animate={shouldReduceMotion ? { rotate: 0 } : { rotate: -360 }}
              transition={{ duration: 58, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            >
              <span className="absolute top-1/3 -right-1 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)]" />
            </motion.div>
            <motion.div
              className="absolute inset-[36%] grid place-items-center rounded-full border border-blue-400/30 bg-navy-700/60 text-center"
              animate={shouldReduceMotion ? { scale: 1 } : { scale: [1, 1.04, 1] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="font-display text-[10px] font-bold tracking-[.2em] text-blue-200">
                NOS<br />MEMBRES
              </span>
            </motion.div>

            {/* Logos en orbite lente ; chaque badge reste droit */}
            <motion.div
              className="absolute inset-0"
              animate={shouldReduceMotion ? { rotate: 0 } : { rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            >
              {members.map((m, i) => {
                const angle = (i / members.length) * 2 * Math.PI - Math.PI / 2;
                return (
                  <div
                    key={m.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${50 + 41 * Math.cos(angle)}%`, top: `${50 + 41 * Math.sin(angle)}%` }}
                  >
                    <motion.div
                      animate={shouldReduceMotion ? { rotate: 0 } : { rotate: -360 }}
                      transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                    >
                      <motion.div
                        animate={shouldReduceMotion ? { y: 0 } : { y: [-3, 3, -3] }}
                        transition={{ duration: 3.6 + (i % 3) * 0.6, repeat: Infinity, ease: 'easeInOut' }}
                        whileHover={{ scale: 1.08 }}
                      >
                        <MemberBadge member={m} />
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

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

function MemberBadge({ member }) {
  const badge = (
    <span
      className={`grid h-14 w-[124px] place-items-center rounded-full px-4 shadow-lg ring-1 transition ${
        member.dark ? 'bg-navy-950 ring-white/20' : 'bg-white ring-white/40'
      }`}
      title={member.name}
    >
      <img src={member.logo} alt={member.name} className="max-h-9 max-w-full object-contain" loading="lazy" />
    </span>
  );
  return member.url ? (
    <a href={member.url} target="_blank" rel="noopener noreferrer" aria-label={member.name}>
      {badge}
    </a>
  ) : (
    badge
  );
}
