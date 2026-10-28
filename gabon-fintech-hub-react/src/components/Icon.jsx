const cx = (...parts) => parts.filter(Boolean).join(' ');

/**
 * Composant Icon SVG unifié pour l'ensemble du Gabon FinTech Hub.
 * Toutes les icônes héritent de currentColor et respectent l'accessibilité
 * (aria-hidden="true" par défaut ou aria-label si informative).
 */
export function Icon({
  name = 'arrow',
  className = 'h-5 w-5',
  ariaLabel,
  ariaHidden = true,
}) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': ariaLabel ? undefined : (ariaHidden ? true : undefined),
    'aria-label': ariaLabel,
    role: ariaLabel ? 'img' : undefined,
  };

  // Icône de validation / coche
  if (name === 'check')
    return <svg {...common}><path d="M20 6 9 17l-5-5" /></svg>;

  // Utilisateurs / Communauté
  if (name === 'users')
    return (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );

  // Calendrier
  if (name === 'calendar')
    return (
      <svg {...common}>
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    );

  // Éclair / rapidité
  if (name === 'bolt' || name === 'lightning')
    return <svg {...common}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" /></svg>;

  // Cadenas / confidentialité
  if (name === 'lock')
    return (
      <svg {...common}>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );

  // Marqueur de lieu / adresse
  if (name === 'pin' || name === 'mapPin')
    return (
      <svg {...common}>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );

  // Alerte / avertissement
  if (name === 'alert' || name === 'warning')
    return (
      <svg {...common}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );

  // Fusée / lancement
  if (name === 'rocket')
    return (
      <svg {...common}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    );

  // Trophée
  if (name === 'trophy')
    return (
      <svg {...common}>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    );

  // Information
  if (name === 'info')
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    );

  if (name === 'spark')
    return <svg {...common}><path d="m12 3 1.6 6.4L20 12l-6.4 1.6L12 20l-1.6-6.4L4 12l6.4-2.6L12 3Z" /></svg>;

  if (name === 'network')
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3" />
        <circle cx="5" cy="6" r="2" />
        <circle cx="19" cy="6" r="2" />
        <circle cx="5" cy="18" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="m7 7.5 3 3m7-3-3 3m-7 5 3-2m7 2-3-2" />
      </svg>
    );

  if (name === 'bulb')
    return (
      <svg {...common}>
        <path d="M9 18h6m-5 3h4m-2-19a7 7 0 0 0-4 12.7c.8.6 1 1.2 1 2.3h6c0-1.1.2-1.7 1-2.3A7 7 0 0 0 12 2Z" />
      </svg>
    );

  if (name === 'education')
    return (
      <svg {...common}>
        <path d="m2 9 10-5 10 5-10 5L2 9Z" />
        <path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v6" />
      </svg>
    );

  if (name === 'scale')
    return (
      <svg {...common}>
        <path d="M12 3v18m-7 0h14M5 7h14M7 7l-4 8h8L7 7Zm10 0-4 8h8l-4-8Z" />
      </svg>
    );

  if (name === 'menu')
    return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;

  if (name === 'close' || name === 'x')
    return <svg {...common}><path d="M18 6 6 18M6 6l12 12" /></svg>;

  if (name === 'plus')
    return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;

  // Flèche droite (inline text)
  if (name === 'arrow-right')
    return <svg {...common}><path d="M5 12h14M12 5l7 7-7 7" /></svg>;

  // Flèche vers le bas
  if (name === 'arrow-down')
    return <svg {...common}><path d="M12 5v14M5 12l7 7 7-7" /></svg>;

  // Réseaux sociaux
  if (name === 'linkedin')
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );

  if (name === 'facebook')
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );

  if (name === 'youtube')
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );

  // Par défaut : flèche diagonale montante
  return <svg {...common}><path d="M7 17 17 7M8 7h9v9" /></svg>;
}

export { cx };
