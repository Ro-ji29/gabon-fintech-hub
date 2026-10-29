import { motion } from 'framer-motion';
import { scaleIn } from '../../lib/animations';
import { ScrollReveal } from '../../components/ScrollReveal';

export function MissionQuote() {
  return (
    <section className="relative overflow-hidden border-y border-navy-900/10 bg-ivory-100/70 py-16 text-center md:py-20">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <ScrollReveal variant={scaleIn}>
          {/* Guillemet décoratif */}
          <span
            className="inline-block select-none font-display text-5xl font-extrabold leading-none text-blue-700/30 sm:text-6xl"
            aria-hidden="true"
          >
            “
          </span>

          {/* Citation de la mission de l'association — aucun nom de personne inventé */}
          <blockquote className="-mt-3 font-display text-2xl font-semibold leading-relaxed tracking-tight text-navy-950 sm:text-3xl md:leading-snug">
            Fédérer l'écosystème, catalyser l'innovation financière et accompagner l'émergence
            de solutions durables pour faire du Gabon un carrefour d'excellence FinTech.
          </blockquote>

          {/* Attribution institutionnelle */}
          <div className="mt-6 flex flex-col items-center justify-center gap-1">
            <span className="font-display text-xs font-bold uppercase tracking-[.18em] text-blue-800">
              Gabon FinTech Hub
            </span>
            <span className="text-[11px] text-navy-700/60">
              {/* À CONFIRMER : Devise ou formulation officielle de la charte de l'association */}
              Mission fondatrice & engagement collectif pour l’Afrique Centrale
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
