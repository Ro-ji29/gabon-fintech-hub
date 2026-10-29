import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp } from '../lib/animations';

export function ScrollReveal({
  children,
  variant = fadeUp,
  custom = 0,
  className = '',
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-60px 0px' });

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}
