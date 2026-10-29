import { motion } from 'framer-motion';
import { council } from '../../data';
import { scaleIn } from '../../lib/animations';
import { Eyebrow } from '../../components/Eyebrow';
import { Icon } from '../../components/Icon';
import { ScrollReveal } from '../../components/ScrollReveal';

export function Council() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <ScrollReveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <Eyebrow>L'ÉQUIPE GFH</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-[-.05em] text-navy-950 md:text-4xl">
            Gouvernance & équipe
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-navy-800/70">
          Des compétences engagées au service d'un écosystème structuré, ouvert et durable.
        </p>
      </ScrollReveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {council.map(([initials, name, role, linkedin], i) => (
          <motion.article
            key={name}
            className="group relative rounded-2xl border border-navy-900/10 bg-white p-5 shadow-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-md"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            custom={i}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-100 font-display text-sm font-bold text-navy-800 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-200/70 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              {initials}
            </div>
            <h3 className="mt-4 text-sm font-bold text-navy-950">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="after:absolute after:inset-0 after:rounded-2xl hover:text-blue-700 focus-visible:underline"
                aria-label={`${name}, ${role} — profil LinkedIn`}
              >
                {name}
              </a>
            </h3>
            <p className="mt-1 text-[11px] leading-4 text-navy-700/75">{role}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-700" aria-hidden="true">
              <Icon name="linkedin" className="h-3.5 w-3.5" />
              Voir le profil
            </span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
