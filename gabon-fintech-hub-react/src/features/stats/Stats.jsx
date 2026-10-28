import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '../../data';
import { fadeUp } from '../../lib/animations';
import { Icon } from '../../components/Icon';

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <section
      ref={ref}
      className="mx-auto grid max-w-7xl grid-cols-1 gap-y-6 border-b border-navy-900/10 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0 lg:px-8"
      aria-label="Impact et dynamisme du Hub"
    >
      {/* À CONFIRMER : Indicateurs qualitatifs sans chiffres en attendant la certification des statistiques officielles */}
      {stats.map((stat, i) => (
        <motion.div
          key={stat.title}
          className="relative border-navy-900/10 px-4 py-3 first:pl-0 sm:border-r sm:px-6 last:border-0"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={i}
        >
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-100/70 text-blue-800">
              <Icon name={stat.icon} className="h-4 w-4" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
              {stat.tag}
            </span>
          </div>
          <strong className="mt-2 block font-display text-base font-bold tracking-tight text-navy-950 sm:text-lg">
            {stat.title}
          </strong>
          <p className="mt-1 text-xs leading-5 text-navy-700/75">
            {stat.desc}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
