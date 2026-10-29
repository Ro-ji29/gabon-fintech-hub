import { Link } from 'react-router-dom';
import { cx } from './Icon';

export function Button({
  children,
  to,
  href,
  light = false,
  outline = false,
  variant,
  className = '',
  ...props
}) {
  const resolvedVariant =
    variant || (outline ? 'outline' : light ? 'light' : 'primary');

  let colorClasses = 'bg-navy-800 text-white hover:bg-navy-950';

  if (resolvedVariant === 'light') {
    colorClasses = 'bg-blue-300 text-navy-950 hover:bg-blue-200';
  } else if (resolvedVariant === 'outline' || resolvedVariant === 'secondary') {
    colorClasses =
      'border border-navy-900/25 bg-white text-navy-950 hover:border-navy-900 hover:bg-navy-900 hover:text-white shadow-sm';
  } else if (resolvedVariant === 'ghost') {
    colorClasses =
      'bg-transparent text-navy-950 hover:bg-navy-900/5 hover:text-navy-950';
  }

  const classes = cx(
    'inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue-500 select-none',
    colorClasses,
    className
  );

  const destination = to || href;

  if (destination) {
    const isInternal =
      typeof destination === 'string' &&
      destination.startsWith('/') &&
      !destination.startsWith('//');

    if (isInternal) {
      return (
        <Link to={destination} className={classes} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={destination} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
