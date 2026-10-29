import { useState } from 'react';
import { motion } from 'framer-motion';
import { plans } from '../../data';
import { fadeUp, scaleIn } from '../../lib/animations';
import { cx } from '../../components/Icon';
import { Eyebrow } from '../../components/Eyebrow';
import { ScrollReveal } from '../../components/ScrollReveal';
import { OfferBanner } from './OfferBanner';
import { PlanCard } from './PlanCard';
import { FormulaireAdhesion } from './FormulaireAdhesion';

export function Membership() {
  const [selectedPlanId, setSelectedPlanId] = useState(plans[0].id);

  const handleSelectPlan = (id) => {
    setSelectedPlanId(id);
    const formElement = document.querySelector('#formulaire');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const select = document.querySelector('#category');
      if (select) select.focus({ preventScroll: true });
    }
  };

  return (
    <section id="adhesion" className="bg-ivory-100 px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow>ADHÉSION</Eyebrow>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-.06em] text-navy-950 md:text-5xl">
              Trouvez votre place<br />dans le <span className="text-blue-700">mouvement.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-navy-800/70">
            Un même écosystème, des façons différentes d'y contribuer. Choisissez la formule
            qui correspond à votre rôle.
          </p>
        </ScrollReveal>

        {/* À CONFIRMER : Réactiver le compteur dès confirmation officielle du nombre de places restantes */}
        <ScrollReveal variant={scaleIn}>
          <OfferBanner showCounter={false} />
        </ScrollReveal>

        <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              className={cx(
                'xl:col-span-2',
                i === 3 && 'xl:col-start-2',
                i === 4 && 'xl:col-start-4'
              )}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={i}
            >
              <PlanCard plan={plan} onSelect={handleSelectPlan} />
            </motion.div>
          ))}
        </div>

        <ScrollReveal className="mt-16">
          <FormulaireAdhesion
            selectedPlanId={selectedPlanId}
            onPlanChange={setSelectedPlanId}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
