import { motion, useReducedMotion } from 'framer-motion';

/**
 * Illustration animée pour l'en-tête de la page Contact.
 *
 * Représente une personne bienveillante et professionnelle accueillant le visiteur
 * avec son ordinateur portable, entourée d'éléments de communication (bulles, enveloppe, téléphone).
 *
 * Règles respectées :
 * - Style plat moderne vectoriel (SVG).
 * - Palette officielle du Gabon FinTech Hub (nuances bleu azur, navy et ivoire).
 * - Animations légères (transform & opacity) avec Framer Motion.
 * - Respect strict de `prefers-reduced-motion` pour l'accessibilité.
 * - Aucune dépendance externe supplémentaire.
 */
export function ContactIllustration() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto flex w-full max-w-[260px] items-center justify-center select-none sm:max-w-[300px] lg:max-w-[340px]"
      aria-hidden="true"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        viewBox="0 0 340 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full overflow-visible drop-shadow-2xl"
      >
        <defs>
          {/* Dégradé doux pour le halo d'arrière-plan */}
          <radialGradient
            id="contactAura"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(170 150) rotate(90) scale(130)"
          >
            <stop stopColor="#38bdf8" stopOpacity="0.22" />
            <stop offset="0.6" stopColor="#1e40af" stopOpacity="0.12" />
            <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>

          {/* Dégradé pour le vêtement */}
          <linearGradient id="blazerGradient" x1="120" y1="180" x2="220" y2="280" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1d4ed8" />
            <stop offset="1" stopColor="#1e3a8a" />
          </linearGradient>

          {/* Dégradé écran laptop */}
          <linearGradient id="screenGradient" x1="140" y1="210" x2="200" y2="250" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="1" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* ── 1. Halos et anneaux d'ambiance ─────────────────────────── */}
        <circle cx="170" cy="150" r="125" fill="url(#contactAura)" />
        <circle
          cx="170"
          cy="150"
          r="115"
          stroke="#38bdf8"
          strokeOpacity="0.25"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <circle cx="170" cy="150" r="85" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />

        {/* ── 2. Éléments flottants communicatifs ─────────────────────── */}

        {/* Bulle de dialogue 1 (Haut gauche) */}
        <motion.g
          animate={
            shouldReduceMotion
              ? { y: 0 }
              : { y: [-4, 4, -4] }
          }
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <g transform="translate(38, 55)">
            <rect
              width="68"
              height="42"
              rx="14"
              fill="#0b1e3b"
              stroke="#38bdf8"
              strokeOpacity="0.4"
              strokeWidth="1.2"
            />
            <path
              d="M18 42 L24 49 L30 42 Z"
              fill="#0b1e3b"
              stroke="#38bdf8"
              strokeOpacity="0.4"
              strokeWidth="1.2"
            />
            {/* Lignes de texte simulées dans la bulle */}
            <rect x="14" y="14" width="40" height="4" rx="2" fill="#38bdf8" fillOpacity="0.85" />
            <rect x="14" y="24" width="26" height="4" rx="2" fill="#93c5fd" fillOpacity="0.65" />
          </g>
        </motion.g>

        {/* Bulle Enveloppe (Haut droite) */}
        <motion.g
          animate={
            shouldReduceMotion
              ? { y: 0 }
              : { y: [4, -5, 4] }
          }
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        >
          <g transform="translate(242, 60)">
            <circle
              cx="22"
              cy="22"
              r="22"
              fill="#0c2347"
              stroke="#60a5fa"
              strokeOpacity="0.45"
              strokeWidth="1.2"
            />
            {/* Icône enveloppe vectorielle */}
            <rect
              x="11"
              y="13"
              width="22"
              height="16"
              rx="3"
              stroke="#93c5fd"
              strokeWidth="1.5"
              fill="none"
            />
            <path d="M12 15 L22 22 L32 15" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </motion.g>

        {/* Bulle Téléphone / Appel (Droite) */}
        <motion.g
          animate={
            shouldReduceMotion
              ? { y: 0 }
              : { y: [-3, 5, -3] }
          }
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <g transform="translate(255, 155)">
            <circle
              cx="20"
              cy="20"
              r="20"
              fill="#08182f"
              stroke="#38bdf8"
              strokeOpacity="0.35"
              strokeWidth="1.2"
            />
            {/* Icône combiné téléphonique vectorielle */}
            <path
              d="M15 13 C14 13 13 14 13 15 C13 21 18 26 24 26 C25 26 26 25 26 24 L24.8 21.6 C24.4 21.2 23.8 21.2 23.4 21.4 L22.2 22.2 C20 21 18 19 16.8 16.8 L17.6 15.6 C17.8 15.2 17.8 14.6 17.4 14.2 Z"
              fill="#38bdf8"
            />
          </g>
        </motion.g>

        {/* Nœud lumineux gauche (pulsation douce) */}
        <motion.circle
          cx="68"
          cy="185"
          r="4"
          fill="#38bdf8"
          animate={
            shouldReduceMotion
              ? { opacity: 0.6 }
              : { opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.2, 0.8] }
          }
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── 3. Personnage (Buste & Tête avec respiration douce) ────── */}
        <motion.g
          animate={
            shouldReduceMotion
              ? { y: 0 }
              : { y: [0, -3, 0] }
          }
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Socle de bureau / support minimaliste */}
          <rect x="95" y="270" width="150" height="6" rx="3" fill="#ffffff" fillOpacity="0.1" />

          {/* Corps / Buste (Blazer bleu institutionnel) */}
          <path
            d="M115 272 C115 224 135 200 170 200 C205 200 225 224 225 272 Z"
            fill="url(#blazerGradient)"
          />

          {/* Col de chemise ivoire */}
          <path d="M158 200 L170 218 L182 200 Z" fill="#f8fafc" />

          {/* Revers de veste stylisé */}
          <path d="M148 205 L170 240 L192 205" stroke="#1e3a8a" strokeWidth="2.5" fill="none" />

          {/* Cou */}
          <rect x="160" y="172" width="20" height="24" rx="4" fill="#fbcfe8" />

          {/* Tête (Visage bienveillant) */}
          <circle cx="170" cy="145" r="32" fill="#fde68a" />

          {/* Yeux souriants (arcs chaleureux) */}
          <path
            d="M158 143 Q162 138 166 143"
            stroke="#1e293b"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M174 143 Q178 138 182 143"
            stroke="#1e293b"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Sourire accueillant */}
          <path
            d="M163 154 Q170 162 177 154"
            stroke="#1e293b"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Pommettes discrètes */}
          <circle cx="155" cy="151" r="3.5" fill="#f87171" fillOpacity="0.35" />
          <circle cx="185" cy="151" r="3.5" fill="#f87171" fillOpacity="0.35" />

          {/* Chevelure moderne et soignée */}
          <path
            d="M138 142 C138 114 152 108 170 108 C188 108 202 114 202 142 C202 120 190 115 170 115 C150 115 138 120 138 142 Z"
            fill="#0f172a"
          />
          <path
            d="M138 136 C138 112 154 110 178 110 C194 110 202 118 202 132 C196 122 186 118 172 120 C154 122 144 128 138 136 Z"
            fill="#1e293b"
          />

          {/* Ordinateur portable ouvert (échange & travail FinTech) */}
          <g transform="translate(132, 230)">
            {/* Clavier / Base */}
            <polygon points="4,28 72,28 66,35 10,35" fill="#334155" />
            {/* Écran ouvert avec lumière bleue */}
            <rect
              x="12"
              y="2"
              width="52"
              height="28"
              rx="4"
              fill="#0f172a"
              stroke="#475569"
              strokeWidth="1.5"
            />
            <rect x="15" y="5" width="46" height="22" rx="2" fill="url(#screenGradient)" />
            {/* Code / graphique simulé sur l'écran */}
            <path
              d="M20 18 L28 14 L36 17 L44 11 L54 15"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </motion.g>

        {/* ── 4. Bras & Main faisant un signe chaleureux ──────────────── */}
        <motion.g
          style={{ originX: '215px', originY: '215px' }}
          animate={
            shouldReduceMotion
              ? { rotate: 0 }
              : { rotate: [0, 8, -6, 6, 0, 0] }
          }
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Avant-bras levé vers le haut */}
          <path
            d="M212 215 C218 202 225 186 230 172"
            stroke="#1d4ed8"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Poignet */}
          <circle cx="230" cy="172" r="6" fill="#fde68a" />
          {/* Main qui salue amicalement */}
          <path
            d="M225 170 C223 162 226 156 232 156 C236 156 239 160 238 167 L241 161 C243 158 247 159 248 163 L245 171 Z"
            fill="#fde68a"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}
