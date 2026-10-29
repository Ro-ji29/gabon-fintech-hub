import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp } from '../../lib/animations';
import { Icon, cx } from '../../components/Icon';
import { Button } from '../../components/Button';
import { Eyebrow } from '../../components/Eyebrow';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Badges satellites avec paramètres de flottement personnalisés (désynchronisation organique)
  const tags = [
    { label: 'Innovation', pos: 'left-[5%] top-[19%]', delay: 0, floatDuration: 3.8, floatOffset: -3.5 },
    { label: 'Talents', pos: 'right-[2%] top-[27%]', delay: 1, floatDuration: 4.4, floatOffset: 4 },
    { label: 'Finance', pos: 'bottom-[22%] left-0', delay: 2, floatDuration: 3.5, floatOffset: -3 },
    { label: 'Régulation', pos: 'bottom-[14%] right-[5%]', delay: 3, floatDuration: 4.8, floatOffset: 3.5 },
  ];

  return (
    <section id="accueil" className="relative isolate overflow-hidden bg-navy-800 text-white">
      <motion.div
        className="absolute -right-28 -top-36 -z-10 h-[580px] w-[580px] rounded-full border border-white/10 md:right-[8%] md:top-[-90px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-12 rounded-full border border-white/10" />
        <div className="absolute inset-28 rounded-full border border-white/10" />
        <div className="absolute inset-44 rounded-full border border-white/10" />
      </motion.div>

      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-[1.05fr_.95fr] md:px-8 lg:py-20">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow light>
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-300" />
              GABON · AFRIQUE CENTRALE
            </Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(3.15rem,7vw,6rem)] font-semibold leading-[.99] tracking-[-.075em]"
          >
            La finance de demain se construit{' '}
            <span className="text-blue-300">ensemble.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-base leading-7 text-ivory-100/80 md:text-lg"
          >
            Nous réunissons celles et ceux qui font avancer l'innovation financière au
            Gabon — startups, institutions, talents et partenaires.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <Button to="/adhesion" light>
              Rejoindre le Hub <Icon className="h-4 w-4" />
            </Button>
            <Button
              to="/a-propos"
              variant="ghost"
              className="!p-0 font-semibold !text-white hover:!bg-transparent hover:!text-blue-300"
            >
              Découvrir notre mission <Icon name="arrow-right" className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-14 flex gap-8 border-t border-white/15 pt-5 text-[9px] font-bold tracking-[.17em] text-ivory-100/60"
          >
            <span>PLATEFORME COLLABORATIVE</span>
            <span>LIBREVILLE, GABON</span>
          </motion.div>
        </motion.div>

        {/* ── Illustration orbitale animée ─────────────────────────────── */}
        <motion.div
          className="relative mx-auto grid aspect-square w-full max-w-[440px] place-items-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 1. Les 3 ellipses orbitales avec rotations continues désynchronisées */}
          <motion.div
            className="pointer-events-none absolute h-[72%] w-[72%] rounded-[44%] border border-blue-200/30"
            animate={
              shouldReduceMotion
                ? { rotate: -28 }
                : { rotate: [-28, 332] }
            }
            transition={{
              duration: 52,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <motion.div
            className="pointer-events-none absolute h-[84%] w-[52%] rounded-[50%] border border-white/20"
            animate={
              shouldReduceMotion
                ? { rotate: 32 }
                : { rotate: [32, -328] }
            }
            transition={{
              duration: 68,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <motion.div
            className="pointer-events-none absolute h-[54%] w-[92%] rounded-[50%] border border-white/15"
            animate={
              shouldReduceMotion
                ? { rotate: 18 }
                : { rotate: [18, 378] }
            }
            transition={{
              duration: 44,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* 2. Ondes concentriques diffusées depuis le noyau (effet émission de signaux) */}
          {[0, 1, 2].map((ringIndex) => (
            <motion.div
              key={ringIndex}
              className="pointer-events-none absolute h-36 w-36 rounded-full border border-blue-300/35 bg-blue-300/[0.015]"
              initial={false}
              animate={
                shouldReduceMotion
                  ? { opacity: 0, scale: 1 }
                  : {
                      scale: [1, 2.3],
                      opacity: [0.45, 0],
                    }
              }
              transition={{
                duration: 4.8,
                repeat: Infinity,
                delay: ringIndex * 1.6,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            />
          ))}

          {/* 3. Noyau central GFH avec pulsation organique synchronisée (échelle + halo azur) */}
          <motion.div
            className="relative z-10 grid h-36 w-36 place-items-center rounded-full border border-blue-200/30 bg-navy-700 select-none"
            animate={
              shouldReduceMotion
                ? { scale: 1 }
                : {
                    scale: [1, 1.025, 1],
                    boxShadow: [
                      '0 0 55px rgba(56,189,248,0.18), inset 0 0 25px rgba(56,189,248,0.08)',
                      '0 0 110px rgba(56,189,248,0.32), inset 0 0 35px rgba(56,189,248,0.15)',
                      '0 0 55px rgba(56,189,248,0.18), inset 0 0 25px rgba(56,189,248,0.08)',
                    ],
                  }
            }
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="text-center font-display text-4xl font-extrabold tracking-[-.09em]">
              GF<span className="text-blue-300">H</span>
              <small className="mt-1 block text-[8px] font-medium tracking-[.22em] text-ivory-100/75">
                FINTECH ECOSYSTEM
              </small>
            </span>
          </motion.div>

          {/* 4. Badges satellites : découplage entrée progressive / flottement indépendant / survol */}
          {tags.map(({ label, pos, delay, floatDuration, floatOffset }) => (
            <motion.div
              key={label}
              className={cx('absolute z-20', pos)}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + delay * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.span
                className="inline-flex cursor-default items-center rounded-full border border-white/20 bg-navy-700/90 px-4 py-2 text-xs font-medium text-ivory-100 shadow-lg backdrop-blur-sm transition-colors duration-200 hover:border-blue-300/60 hover:bg-navy-600/95 select-none"
                animate={
                  shouldReduceMotion
                    ? { y: 0 }
                    : { y: [-floatOffset, floatOffset, -floatOffset] }
                }
                transition={{
                  duration: floatDuration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  scale: 1.07,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
              >
                {label}
              </motion.span>
            </motion.div>
          ))}

          {/* 5. Texte d'accroche avec apparition discrète */}
          <motion.span
            className="absolute bottom-0 right-0 text-right text-[9px] leading-4 tracking-[.16em] text-ivory-100/60 select-none"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          >
            CONNECTER LES IDÉES<br />AU CAPITAL ET AUX MARCHÉS
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
