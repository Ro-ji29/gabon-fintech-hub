import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Eyebrow } from '../../components/Eyebrow';
import { ScrollReveal } from '../../components/ScrollReveal';
import { fadeUp, scaleIn } from '../../lib/animations';

export function ContestHighlight() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="concours-section"
      className="relative isolate overflow-hidden border-b border-navy-900/10 bg-gradient-to-b from-navy-800 via-navy-900 to-navy-950 px-5 py-14 text-white lg:px-8 lg:py-20"
      aria-label="Elite FinTech Competition"
    >
      {/* ── Cercles orbitaux légers en arrière-plan (rappel de la charte visuelle) ── */}
      <div className="pointer-events-none absolute -right-28 -top-28 -z-10 h-80 w-80 rounded-full border border-blue-400/15" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-12 -top-12 -z-10 h-64 w-64 rounded-full border border-blue-300/10" aria-hidden="true" />

      <div className="mx-auto max-w-7xl">
        <ScrollReveal
          variant={scaleIn}
          className="relative overflow-hidden rounded-[2.5rem] border border-blue-400/25 bg-gradient-to-r from-blue-950/90 via-navy-900/90 to-blue-900/80 p-7 shadow-2xl backdrop-blur-md sm:p-10 md:p-14"
        >
          {/* Lueur subtile en arrière-plan du conteneur */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-400/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div>
              {/* En-tête : Eyebrow et mention obligatoire Gratuit et ouvert à tous */}
              <div className="flex flex-wrap items-center gap-2.5">
                <Eyebrow light>
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-300" />
                  1<sup>re</sup>&nbsp;ÉDITION · ÉVÉNEMENT PRIVÉ
                </Eyebrow>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200 backdrop-blur-sm">
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-amber-300 ${shouldReduceMotion ? '' : 'animate-pulse'}`}
                    aria-hidden="true"
                  />
                  Sur invitation · Places limitées
                </span>
              </div>

              {/* Titre accrocheur */}
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-.05em] text-white sm:text-4xl md:text-5xl">
                Elite FinTech Competition
              </h2>
              <p className="mt-2 font-display text-lg font-semibold text-blue-300 sm:text-xl">
                En route vers le Canada 2027
              </p>

              {/* Courte phrase décrivant l'opportunité et la gratuité */}
              <p className="mt-4 max-w-2xl text-base leading-7 text-ivory-100/90 sm:text-lg">
                Pour sa toute première édition, le Gabon FinTech Hub réunit à huis clos un cercle
                restreint de décideurs de l'écosystème. Six fintechs gabonaises finalistes présentent
                leur solution devant un jury d'experts, et la lauréate représentera le Gabon au
                Canada Africa FinTech Summit 2027 à Toronto.
              </p>

              {/* Informations génériques sans chiffres inventés */}
              <p className="mt-3 text-xs font-semibold tracking-wide text-blue-200/90">
                5 décembre 2026 · Candidatures ouvertes jusqu'au 12 novembre 2026
              </p>

              {/* Bouton d'action avec libellé unique et cohérent */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="https://postuler.gabonfintech-hub.com" target="_blank" rel="noopener noreferrer" light className="font-bold shadow-lg">
                  Postuler <Icon name="spark" className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 3 piliers d'opportunité du concours (qualitatif, sans chiffres inventés) */}
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <motion.div
                variants={fadeUp}
                custom={0}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:border-blue-400/30 hover:bg-white/10"
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-300/20 text-blue-300">
                    <Icon name="rocket" className="h-4 w-4" ariaHidden={true} />
                  </span>
                  <h3 className="font-display text-sm font-bold text-white">Une première au Gabon</h3>
                </div>
                <p className="mt-2 text-xs leading-5 text-white/75">
                  La toute première compétition FinTech d'élite organisée par le Gabon FinTech Hub.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={1}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:border-blue-400/30 hover:bg-white/10"
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-300/20 text-blue-300">
                    <Icon name="spark" className="h-4 w-4" ariaHidden={true} />
                  </span>
                  <h3 className="font-display text-sm font-bold text-white">Un cercle restreint</h3>
                </div>
                <p className="mt-2 text-xs leading-5 text-white/75">
                  Un événement privé, sur invitation, réservé aux décideurs : banques, régulateurs, investisseurs et partenaires.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                custom={2}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:border-blue-400/30 hover:bg-white/10"
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-300/20 text-blue-300">
                    <Icon name="network" className="h-4 w-4" ariaHidden={true} />
                  </span>
                  <h3 className="font-display text-sm font-bold text-white">Cap sur Toronto</h3>
                </div>
                <p className="mt-2 text-xs leading-5 text-white/75">
                  La lauréate représente le Gabon au CAFS 2027, vol et hôtel entièrement pris en charge par le GFH.
                </p>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
