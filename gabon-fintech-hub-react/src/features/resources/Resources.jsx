import { motion } from 'framer-motion';
import { resources } from '../../data';
import { fadeUp } from '../../lib/animations';
import { Icon } from '../../components/Icon';
import { Eyebrow } from '../../components/Eyebrow';
import { ScrollReveal } from '../../components/ScrollReveal';
import { Link } from 'react-router-dom';

export function Resources() {
  return (
    <section id="ressources" className="bg-ivory-100 px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <Eyebrow>RESSOURCES</Eyebrow>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-.06em] text-navy-950 md:text-5xl">
              Comprendre pour<br />
              <span className="text-blue-700">mieux transformer.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-navy-800/70">
            Des repères pour naviguer les enjeux d'innovation, de réglementation et
            d'inclusion financière dans la région.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {resources.map(([tag, title, copy], i) => (
            <motion.article
              key={title}
              className="group relative min-h-56 rounded-3xl border border-navy-900/10 bg-white p-7 shadow-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-md"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={i}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
            >
              <span className="absolute right-6 top-6 font-display text-sm font-bold text-navy-900/25 transition-colors duration-200 group-hover:text-blue-800/60">
                0{i + 1}
              </span>
              <Eyebrow>{tag}</Eyebrow>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-navy-800/70">{copy}</p>
              <Link
                to="/contact"
                aria-label={`En savoir plus sur : ${title}`}
                className="absolute bottom-6 right-6 grid h-10 w-10 place-items-center rounded-full border border-navy-900/15 text-blue-800 transition-all duration-200 group-hover:scale-105 group-hover:border-blue-700/50 group-hover:bg-blue-100 group-hover:text-blue-900"
              >
                <Icon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
