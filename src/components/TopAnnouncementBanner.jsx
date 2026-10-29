import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Icon } from './Icon';

const STORAGE_KEY = 'gfh_contest_banner_dismissed';

export function TopAnnouncementBanner() {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setVisible(true);
      }
    } catch {
      // Si sessionStorage n'est pas disponible (mode privé strict), afficher le bandeau
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignorer les erreurs de stockage
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="relative z-50 overflow-hidden border-b border-blue-400/25 bg-gradient-to-r from-navy-950 via-blue-950 to-navy-950 text-white"
          aria-label="Annonce spéciale"
        >
          <div className="mx-auto flex min-h-[38px] max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs sm:px-6 sm:py-2.5">
            {/* Message principal avec icône d'accent vectorielle */}
            <div className="flex flex-1 flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center sm:justify-center">
              <span className="inline-flex items-center gap-1.5 font-bold text-blue-300">
                <Icon name="spark" className="h-3.5 w-3.5 text-blue-300" ariaHidden={true} />
                <span>Concours FinTech Gabon</span>
              </span>

              <span className="hidden text-white/30 sm:inline" aria-hidden="true">·</span>

              {/* Mention obligatoire : Gratuit et ouvert à tous */}
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                Gratuit et ouvert à tous
              </span>

              <span className="hidden text-white/30 md:inline" aria-hidden="true">·</span>

              <Link
                to="/concours"
                className="group inline-flex items-center gap-1 font-bold text-white underline decoration-blue-400 underline-offset-4 transition hover:text-blue-200 hover:decoration-white"
              >
                <span>Participer au concours</span>
                <Icon
                  name="arrow"
                  className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                  ariaHidden={true}
                />
              </Link>
            </div>

            {/* Bouton de fermeture mémorisant le choix pour la session */}
            <button
              type="button"
              onClick={handleDismiss}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
              aria-label="Fermer le bandeau d'annonce du concours"
            >
              <Icon name="close" className="h-3.5 w-3.5" ariaHidden={true} />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
