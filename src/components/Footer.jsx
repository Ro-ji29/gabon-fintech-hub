import { Link } from 'react-router-dom';
import { social } from '../data';
import { Icon } from './Icon';

export function Footer() {
  const columns = [
    {
      heading: 'Navigation',
      items: [
        { label: 'À propos', to: '/a-propos' },
        { label: 'Adhésion', to: '/adhesion' },
        { label: 'Communautés', to: '/communautes' },
        { label: 'Événements', to: '/evenements' },
      ],
    },
    {
      heading: 'Assistance',
      items: [
        { label: 'Nous contacter', to: '/contact' },
        { label: 'Demande d’adhésion', to: '/adhesion#formulaire' },
        { label: 'Inscription Startups', to: '/inscription-startups' },
        { label: 'Concours FinTech', to: '/concours' },
        { label: 'Ressources', to: '/ressources' },
      ],
    },
    {
      heading: 'Partenaires',
      items: [
        { label: 'Devenir partenaire', to: '/contact' },
        { label: 'Institutions', to: '/communautes' },
        { label: 'Écosystème FinTech', to: '/communautes' },
      ],
    },
  ];

  return (
    <footer className="border-t border-navy-900/10 bg-ivory-50/50">
      <div className="mx-auto grid max-w-7xl gap-9 px-5 pb-8 pt-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-800 font-display text-sm font-extrabold text-white">
              GF<span className="text-blue-300">H</span>
            </span>
            <span className="font-display text-[10px] font-extrabold uppercase leading-tight tracking-[.08em] text-navy-950">
              Gabon<br />FinTech Hub
            </span>
          </Link>
          <p className="mt-4 text-xs leading-5 text-navy-700/70">
            Ensemble, faisons grandir<br />la finance de demain.
          </p>
          <div className="mt-4 flex gap-2">
            {social.map((item, i) => {
              const name = typeof item === 'string' ? item : item.name;
              const href = typeof item === 'object' && item.url ? item.url : '/contact';
              const isExternal = href.startsWith('http');
              return (
                <a
                  key={name}
                  aria-label={name}
                  href={href}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="grid h-8 w-8 place-items-center rounded-full border border-navy-900/15 text-[10px] font-bold text-navy-800 transition hover:border-blue-500 hover:text-blue-800"
                >
                  {name === 'LinkedIn' ? (
                    <Icon name="linkedin" className="h-3.5 w-3.5" ariaLabel="LinkedIn" />
                  ) : name === 'Facebook' ? (
                    <Icon name="facebook" className="h-3.5 w-3.5" ariaLabel="Facebook" />
                  ) : name === 'YouTube' ? (
                    <Icon name="youtube" className="h-3.5 w-3.5" ariaLabel="YouTube" />
                  ) : (
                    <Icon name="arrow" className="h-3 w-3" ariaLabel={name} />
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {columns.map(({ heading, items }) => (
          <div key={heading}>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-navy-950">
              {heading}
            </h3>
            <div className="grid gap-2.5">
              {items.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-xs text-navy-700/75 transition hover:text-blue-800"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="border-t border-navy-900/10 pt-6 text-[10px] text-navy-700/60 sm:col-span-2 lg:col-span-4">
          <div className="flex flex-wrap justify-between gap-3">
            <span>© {new Date().getFullYear()} Gabon FinTech Hub. Tous droits réservés.</span>
            <div className="flex gap-4">
              <Link to="/contact" className="hover:text-blue-800">Mentions légales</Link>
              <Link to="/contact" className="hover:text-blue-800">Confidentialité</Link>
            </div>
            <span>Libreville · Gabon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
