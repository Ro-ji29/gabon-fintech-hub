import { motion } from 'framer-motion';
import { Icon, cx } from '../../components/Icon';
import { Button } from '../../components/Button';

export function PlanCard({ plan, onSelect }) {
  return (
    <motion.article
      className={cx(
        'relative flex h-full flex-col rounded-3xl border bg-white p-6 shadow-[0_12px_38px_rgba(13,35,71,.08)]',
        plan.recommended
          ? 'border-blue-700 ring-1 ring-blue-700'
          : 'border-navy-900/10'
      )}
      whileHover={{
        y: -6,
        boxShadow: '0 24px 56px rgba(13,35,71,.15)',
        transition: { duration: 0.25 },
      }}
    >
      {plan.recommended && (
        <span className="absolute -top-3 left-6 rounded-full bg-blue-300 px-3 py-1 text-[9px] font-extrabold tracking-[.13em] text-navy-950">
          RECOMMANDÉ
        </span>
      )}

      <div className="min-h-[82px]">
        <h3 className="font-display text-xl font-semibold tracking-[-.04em] text-navy-950">
          {plan.name}
        </h3>
        <p className="mt-1 max-w-[260px] text-xs leading-5 text-navy-700/70">
          {plan.target}
        </p>
      </div>

      <div className="flex min-h-[90px] flex-col justify-center border-y border-navy-900/10 py-3">
        {/* Tarif normal barré : adhésion offerte jusqu'en 2030 */}
        {plan.price.startsWith('Gratuit') ? (
          <>
            <strong className="font-display text-lg font-bold leading-snug text-blue-800">
              {plan.price}
            </strong>
            <span className="mt-1 text-[10px] text-navy-700/60">Sans cotisation</span>
          </>
        ) : (
          <>
            <del className="w-fit text-sm font-semibold leading-snug no-underline">
              <span className="sr-only">Tarif normal : </span>
              <motion.span
                className="box-decoration-clone bg-no-repeat text-[#8b93a3]"
                style={{
                  backgroundImage:
                    'linear-gradient(transparent calc(50% - 1px), #f43f5e calc(50% - 1px), #f59e0b calc(50% + 1px), transparent calc(50% + 1px))',
                  backgroundPosition: 'left center',
                }}
                initial={{ backgroundSize: '0% 100%' }}
                whileInView={{ backgroundSize: '100% 100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              >
                {plan.price}
              </motion.span>
            </del>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <strong className="font-display text-xl font-bold leading-none text-blue-800">Gratuit</strong>
              <span className="rounded-full bg-gradient-to-r from-blue-700 to-blue-500 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-sm">
                jusqu'en 2030
              </span>
            </div>
          </>
        )}
      </div>

      {plan.offers && (
        <div className="grid gap-2 py-3">
          {plan.offers.map(([label, name, copy]) => (
            <div key={label} className="rounded-xl bg-ivory-100 p-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[8px] font-extrabold tracking-[.1em] text-blue-800">
                  {label}
                </span>
                <strong className="font-display text-xs text-navy-950">{name}</strong>
              </div>
              <p className="mt-1 text-[10px] leading-4 text-navy-700/75">{copy}</p>
            </div>
          ))}
        </div>
      )}

      <ul className="mt-4 grid gap-3">
        {plan.benefits.slice(0, 4).map((x) => (
          <li key={x} className="flex items-start gap-2 text-xs leading-5 text-navy-800/85">
            <Icon name="check" className="h-4 w-4 shrink-0 text-blue-700 mt-0.5" />
            <span>{x}</span>
          </li>
        ))}
      </ul>

      {plan.benefits.length > 4 && (
        <details className="group mt-4 text-xs text-blue-800">
          <summary className="flex items-center gap-1.5 cursor-pointer list-none font-semibold">
            <span>Voir tous les avantages</span>
            <Icon name="plus" className="h-3.5 w-3.5 transition group-open:rotate-45" />
          </summary>
          <ul className="mt-3 grid gap-3">
            {plan.benefits.slice(4).map((x) => (
              <li key={x} className="flex items-start gap-2 leading-5 text-navy-800/85">
                <Icon name="check" className="h-4 w-4 shrink-0 text-blue-700 mt-0.5" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </details>
      )}

      <Button
        className="mt-auto w-full !mt-6"
        onClick={() => onSelect(plan.id)}
      >
        Rejoindre le Hub <Icon className="h-4 w-4" />
      </Button>
    </motion.article>
  );
}
