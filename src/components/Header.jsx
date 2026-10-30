import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Icon, cx } from './Icon';
import { Button } from './Button';

export function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors d'un changement de route
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { label: 'À propos', to: '/a-propos' },
    { label: 'Adhésion', to: '/adhesion' },
    { label: 'Communautés', to: '/communautes' },
    { label: 'Événements', to: '/evenements' },
    { label: 'Ressources', to: '/ressources' },
    { label: 'Contact', to: '/contact' },
  ];

  // La navbar est en mode sombre/transparent uniquement tout en haut de page (non scrollé) et menu fermé
  const isSolid = isScrolled || open;

  return (
    <header
      className={cx(
        'sticky top-0 z-40 -mb-[76px] transition-all duration-300 ease-in-out',
        isSolid
          ? 'border-b border-navy-900/10 bg-white/95 shadow-[0_4px_24px_rgba(13,35,71,0.08)] backdrop-blur-md'
          : 'border-b border-white/10 bg-navy-800/0'
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo avec variantes claire et foncée */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-90 shrink-0"
          aria-label="Gabon FinTech Hub, accueil"
          onClick={() => setOpen(false)}
        >
          <img
            src={isSolid ? '/assets/gfh-logo.png' : '/assets/gfh-logo-white.png'}
            alt="Gabon FinTech Hub"
            width="318"
            height="138"
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        {/* Navigation Desktop */}
        <nav
          className={cx(
            // Mobile menu drawer
            'absolute inset-x-0 top-[75px] flex-col border-b border-navy-900/10 bg-white px-5 pb-6 pt-2 shadow-2xl transition-all duration-300',
            // Desktop navigation
            'lg:static lg:flex lg:flex-row lg:items-center lg:gap-6 xl:gap-7 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none',
            open ? 'flex' : 'hidden'
          )}
          aria-label="Navigation principale"
        >
          {links.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cx(
                  'border-b border-navy-900/5 py-3 text-sm font-medium transition-all duration-200 lg:border-0 lg:py-2 whitespace-nowrap',
                  isActive
                    ? isSolid
                      ? 'font-semibold text-blue-700 underline underline-offset-8 decoration-2 decoration-blue-600'
                      : 'font-semibold text-blue-300 underline underline-offset-8 decoration-2 decoration-blue-300 lg:text-blue-300'
                    : isSolid
                      ? 'text-navy-800 hover:text-blue-600'
                      : 'text-navy-800 hover:text-blue-600 lg:text-white/85 lg:hover:text-white'
                )
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Point d'entrée Concours dans le menu mobile */}
          <div className="mt-4 flex flex-col gap-3 border-t border-navy-900/10 pt-4 lg:hidden">
            <Link
              to="/concours"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-between rounded-2xl bg-blue-700 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-800/80 text-blue-200">
                  <Icon name="spark" className="h-4 w-4" ariaHidden={true} />
                </span>
                <span>Participer au concours</span>
              </div>
              <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-200">
                Sur invitation
              </span>
            </Link>

            <Button
              to="/adhesion"
              variant="outline"
              className="w-full justify-center text-xs"
              onClick={() => setOpen(false)}
            >
              Rejoindre le Hub
            </Button>
          </div>
        </nav>

        {/* Actions & Burger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Bouton d'action CONCOURS : distinct, couleur d'accent bleue, lisible sur tous les fonds */}
          <Link
            to="/concours"
            onClick={() => setOpen(false)}
            className={cx(
              'inline-flex min-h-9 sm:min-h-10 items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 text-[11px] sm:text-xs md:text-sm font-bold shadow-sm transition-all duration-200 whitespace-nowrap select-none hover:-translate-y-0.5',
              isSolid
                ? 'bg-blue-700 text-white hover:bg-blue-800 hover:shadow-md ring-1 ring-blue-600/30'
                : 'bg-blue-300 text-navy-950 hover:bg-blue-200 hover:shadow-[0_0_15px_rgba(56,189,248,0.45)] ring-1 ring-blue-200/50'
            )}
            title="Elite FinTech Competition · 1re édition · Sur invitation"
          >
            <span>Participer au concours</span>
            <Icon name="spark" className="h-3.5 w-3.5 shrink-0" ariaHidden={true} />
          </Link>

          {/* Bouton secondaire d'adhésion sur grand écran */}
          <Button
            to="/adhesion"
            variant={isSolid ? 'outline' : 'ghost'}
            className={cx(
              'hidden xl:inline-flex min-h-10 px-3.5 text-xs font-semibold transition-all duration-200',
              !isSolid && '!text-white hover:!bg-white/10'
            )}
            onClick={() => setOpen(false)}
          >
            Adhésion
          </Button>

          {/* Bouton Menu Mobile */}
          <button
            className={cx(
              'grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl border transition-colors duration-300 lg:hidden shrink-0',
              isSolid
                ? 'border-navy-900/15 bg-white text-navy-900 hover:bg-ivory-50'
                : 'border-white/25 bg-white/10 text-white hover:bg-white/20'
            )}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}
