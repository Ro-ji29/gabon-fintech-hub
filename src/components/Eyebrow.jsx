import { cx } from './Icon';

export function Eyebrow({ children, light = false }) {
  return (
    <p className={cx('mb-4 text-[10px] font-bold uppercase tracking-[.19em]', light ? 'text-blue-300' : 'text-blue-800')}>
      {children}
    </p>
  );
}
