import { motion, useReducedMotion } from 'framer-motion';
import { founderLimit, founderSeatsRemaining } from '../../data';
import { Icon } from '../../components/Icon';
import { Eyebrow } from '../../components/Eyebrow';

export function OfferBanner({ showCounter = false }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative flex flex-wrap items-center gap-4 rounded-3xl bg-navy-800 p-5 text-white sm:p-7 shadow-[0_15px_40px_rgba(13,35,71,0.15)]">
      {/* Médaillon étincelle avec pulsation douce et lueur bleue */}
      <motion.span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-blue-300/40 bg-blue-300/10 text-blue-300"
        animate={
          shouldReduceMotion
            ? { scale: 1 }
            : {
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 0 15px rgba(56,189,248,0.2)',
                  '0 0 30px rgba(56,189,248,0.45)',
                  '0 0 15px rgba(56,189,248,0.2)',
                ],
              }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon name="spark" className="h-5 w-5" />
      </motion.span>

      <div className="min-w-[210px] flex-1">
        <Eyebrow light>OFFRE MEMBRES FONDATEURS</Eyebrow>
        <h3 className="font-display text-lg font-semibold sm:text-xl">
          Adhésion gratuite jusqu'en 2030
        </h3>
        <p className="mt-1 text-xs text-white/75">
          Toutes les formules sont offertes jusqu'en 2030 aux membres qui rejoignent le Hub dès sa création.
        </p>
      </div>

      {showCounter ? (
        <div className="flex min-w-28 flex-col items-center border-l border-white/20 pl-5">
          <div className="flex items-center gap-2">
            {!shouldReduceMotion && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-300" />
              </span>
            )}
            <strong className="font-display text-3xl font-bold text-blue-300">
              {founderSeatsRemaining}
            </strong>
          </div>
          <span className="text-[10px] text-white/70">places restantes</span>
        </div>
      ) : (
        <div className="flex items-center rounded-full border border-blue-300/30 bg-blue-400/10 px-3.5 py-1.5 text-xs font-semibold text-blue-200">
          <span className="mr-2 h-2 w-2 rounded-full bg-blue-300" />
          Places limitées · Candidatures ouvertes
        </div>
      )}
    </div>
  );
}
