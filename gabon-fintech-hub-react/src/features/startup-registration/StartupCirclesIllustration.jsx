import { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';

/**
 * Illustration orbitale en cercles concentriques pour le Hero de la page Inscription Startups.
 *
 * Caractéristiques :
 * - Apparence originale préservée : dimensions (500px), insets et palette de couleurs du Hub.
 * - Rotations douces désynchronisées et pulsation fluide pour créer de la profondeur.
 * - Nœuds satellites lumineux qui orbitent en boucle calme autour du centre.
 * - Entrée progressive douce au chargement (fondu + subtil zoom).
 * - Mise en pause automatique hors de l'écran pour optimiser les performances.
 * - Respect strict de `prefers-reduced-motion` (état statique pour les utilisateurs sensibles).
 */
export function StartupCirclesIllustration() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(containerRef, { margin: '80px' });
  const isAnimated = isInView && !shouldReduceMotion;

  return (
    <motion.div
      ref={containerRef}
      className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full border border-white/10 opacity-60 md:right-10 md:top-0 md:h-[500px] md:w-[500px] select-none"
      aria-hidden="true"
      initial={shouldReduceMotion ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.88 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── 1. Anneau extérieur (500px) : rotation continue dans le sens horaire ── */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={isAnimated ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 52, repeat: Infinity, ease: 'linear' }}
      >
        {/* Nœuds satellites lumineux en orbite externe */}
        <span className="absolute -top-1.5 left-1/3 h-2.5 w-2.5 rounded-full bg-blue-300 shadow-[0_0_12px_rgba(56,189,248,0.85)]" />
        <span className="absolute bottom-1/4 -right-1 h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
      </motion.div>

      {/* ── 2. Anneau intermédiaire 1 (inset-10) : rotation dans le sens anti-horaire ── */}
      <motion.div
        className="absolute inset-10 rounded-full border border-white/10"
        animate={isAnimated ? { rotate: -360 } : { rotate: 0 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {/* Nœud satellite en orbite intermédiaire */}
        <span className="absolute top-1/4 -left-1 h-2 w-2 rounded-full bg-blue-200/90 shadow-[0_0_10px_rgba(56,189,248,0.75)]" />
        <span className="absolute -bottom-1 right-1/3 h-1.5 w-1.5 rounded-full bg-blue-300/75 shadow-[0_0_6px_rgba(56,189,248,0.6)]" />
      </motion.div>

      {/* ── 3. Anneau intermédiaire 2 (inset-24) : rotation douce dans le sens horaire ── */}
      <motion.div
        className="absolute inset-24 rounded-full border border-white/10"
        animate={isAnimated ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {/* Nœud satellite en orbite intérieure */}
        <span className="absolute -top-1 right-1/4 h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </motion.div>

      {/* ── 4. Élément central (inset-36) : pulsation douce et respiration continue ── */}
      <motion.div
        className="absolute inset-36 rounded-full border border-white/10 bg-blue-400/[0.02]"
        animate={
          isAnimated
            ? {
                scale: [1, 1.05, 1],
                opacity: [0.65, 0.95, 0.65],
              }
            : { scale: 1, opacity: 0.7 }
        }
        transition={{
          duration: 4.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Halo doux au centre */}
        <div className="absolute inset-6 rounded-full border border-blue-300/20 bg-blue-400/[0.03] shadow-[inset_0_0_16px_rgba(56,189,248,0.12)]" />
      </motion.div>
    </motion.div>
  );
}
