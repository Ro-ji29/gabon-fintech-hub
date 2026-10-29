import { motion, useReducedMotion } from 'framer-motion';
import { activities, mission, pillars, tenure } from '../../data';
import { fadeUp, scaleIn } from '../../lib/animations';
import { Icon } from '../../components/Icon';
import { Eyebrow } from '../../components/Eyebrow';
import { ScrollReveal } from '../../components/ScrollReveal';

export function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="a-propos" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
      <ScrollReveal className="grid gap-10 md:grid-cols-[.85fr_1.15fr]">
        <div>
          <Eyebrow>LE HUB</Eyebrow>
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-[-.06em] text-navy-950 md:text-5xl">
            Un écosystème plus fort, <span className="text-blue-700">à plusieurs voix.</span>
          </h2>
        </div>
        <div className="grid gap-4 self-end text-sm leading-7 text-navy-800/80 sm:grid-cols-2">
          <p className="text-base font-semibold leading-7 text-navy-950">
            Gabon FinTech Hub est une plateforme collaborative dédiée au développement,
            à la structuration et à la promotion de l'écosystème FinTech au Gabon.
          </p>
          <p>
            Nous rassemblons startups, institutions financières, experts technologiques,
            universitaires, médias et acteurs publics autour d'une ambition commune :
            positionner le Gabon comme hub FinTech de référence en Afrique Centrale.
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <ScrollReveal custom={0}>
          <motion.article
            className="group h-full rounded-3xl bg-ivory-100 p-7 transition-shadow duration-300 hover:shadow-md md:p-10"
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <div className="mb-8 grid h-11 w-11 place-items-center rounded-full border border-blue-700/25 text-blue-800 transition-all duration-300 group-hover:border-blue-700 group-hover:bg-blue-50 group-hover:shadow-sm">
              <Icon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <Eyebrow>NOTRE RAISON D'ÊTRE</Eyebrow>
            <h3 className="max-w-sm font-display text-2xl font-semibold tracking-[-.04em] text-navy-950">
              Faire le lien entre les idées et leur impact.
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-navy-800/80">
              Le Hub est né du besoin de structurer un écosystème fort, inclusif et durable,
              capable de soutenir l'innovation, d'attirer les investissements et d'accompagner
              la transformation numérique de l'économie gabonaise. Il agit comme un pont
              entre l'innovation, la réglementation, les talents et le financement.
            </p>
          </motion.article>
        </ScrollReveal>

        <ScrollReveal custom={1}>
          <motion.article
            className="group relative h-full rounded-3xl bg-blue-100 p-7 transition-shadow duration-300 hover:shadow-md md:p-10"
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <div className="mb-8 grid h-11 w-11 place-items-center rounded-full border border-blue-800/25 text-blue-900 transition-all duration-300 group-hover:border-blue-800 group-hover:bg-blue-200/50">
              <motion.span
                className="inline-block select-none"
                animate={
                  shouldReduceMotion
                    ? { scale: 1 }
                    : { scale: [1, 1.1, 1], opacity: [0.85, 1, 0.85] }
                }
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Icon name="spark" className="h-5 w-5 text-blue-900" />
              </motion.span>
            </div>
            <Eyebrow>NOTRE VISION</Eyebrow>
            <h3 className="max-w-sm font-display text-2xl font-semibold tracking-[-.04em] text-navy-950">
              Un hub régional, ouvert sur le monde.
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-navy-800/80">
              Faire du Gabon un hub régional d'innovation FinTech en Afrique Centrale, où les
              entrepreneurs et les institutions disposent des ressources, de la visibilité et
              des partenariats nécessaires pour se développer à l'échelle nationale et
              internationale.
            </p>
            <span className="mt-7 block text-[9px] font-bold tracking-[.16em] text-navy-700">
              ENGAGÉS {tenure.toUpperCase()}
            </span>
          </motion.article>
        </ScrollReveal>
      </div>

      <ScrollReveal className="grid gap-8 border-b border-navy-900/10 py-14 md:grid-cols-[.8fr_1.2fr]">
        <div>
          <Eyebrow>NOTRE MISSION</Eyebrow>
          <h3 className="font-display text-3xl font-semibold tracking-[-.05em] text-navy-950">
            Donner aux acteurs les moyens d'agir.
          </h3>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {mission.map((x, i) => (
            <motion.li
              key={x}
              className="flex gap-3 text-sm leading-6 text-navy-800"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={i}
            >
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
              {x}
            </motion.li>
          ))}
        </ul>
      </ScrollReveal>

      <ScrollReveal className="grid gap-7 py-14 md:grid-cols-[.8fr_1.2fr]">
        <div>
          <Eyebrow>EN ACTION</Eyebrow>
          <h3 className="font-display text-3xl font-semibold tracking-[-.05em] text-navy-950">
            Ce que nous faisons
          </h3>
        </div>
        <div className="grid gap-x-7 sm:grid-cols-2">
          {activities.map((x, i) => (
            <motion.div
              key={x}
              className="flex gap-3 border-b border-navy-900/10 py-3"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={i}
            >
              <span className="font-display text-xs font-bold text-blue-800">
                0{i + 1}
              </span>
              <p className="text-sm leading-6 text-navy-800/80">{x}</p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal variant={scaleIn} className="rounded-[2rem] bg-navy-800 px-6 py-12 text-white md:px-10">
        <Eyebrow light>NOS PILIERS STRATÉGIQUES</Eyebrow>
        <h3 className="font-display text-3xl font-semibold tracking-[-.05em]">
          Les leviers d'un secteur qui avance.
        </h3>
        <div className="mt-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(([iconName, title, copy], i) => (
            <motion.article
              key={title}
              className="group border-l border-white/20 pl-5 first:border-0 first:pl-0"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-blue-300/40 text-blue-300 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-300 group-hover:bg-blue-300/15 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.35)]">
                <Icon name={iconName} className="transition-transform duration-300 group-hover:scale-105" />
              </span>
              <h4 className="mt-5 font-display text-base font-semibold">{title}</h4>
              <p className="mt-2 text-xs leading-6 text-ivory-100/75">{copy}</p>
            </motion.article>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
