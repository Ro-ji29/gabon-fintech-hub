import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eyebrow } from '../../components/Eyebrow';
import { Icon } from '../../components/Icon';
import { ScrollReveal } from '../../components/ScrollReveal';

export function StartupFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Quels types de startups peuvent postuler au Gabon FinTech Hub ?',
      answer:
        'Toutes les jeunes pousses technologiques opérant dans les services financiers, le paiement mobile, la microfinance digitale, le crédit alternatif, la RegTech, l’InsurTech, la blockchain ou l’inclusion financière au Gabon et en zone CEMAC sont éligibles, du stade de prototype à la phase de croissance.',
    },
    {
      question: 'Quel est le coût d’adhésion pour une jeune pousse ?',
      answer:
        'Dans le cadre de l’« Offre Membres Fondateurs », l’adhésion est 100 % gratuite jusqu’en 2030 pour les 20 premières startups admises. Au-delà, le tarif préférentiel Startup s’applique (donnée indicative actuellement à 150 000 FCFA / an selon la grille statutaire provisoire).',
    },
    {
      question: 'Quel est le processus après la soumission de mon formulaire ?',
      answer:
        'Dès réception de votre candidature, notre équipe accuse réception sous 24h et examine votre dossier. Un entretien de cadrage de 30 minutes est ensuite planifié avec un membre du comité exécutif pour évaluer vos synergies avec l’écosystème et officialiser votre intégration.',
    },
    {
      question: 'En quoi le Hub m’aide-t-il sur la conformité réglementaire (COBAC, ARCEP) ?',
      answer:
        'Le Gabon FinTech Hub entretient un canal de dialogue direct et constructif avec les autorités monétaires et de régulation. Nous vous accompagnons dans la compréhension des directives COBAC, la préparation des demandes d’agrément d’établissement de paiement et l’accès aux dispositifs de bac à sable réglementaire (sandboxes).',
    },
  ];

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="bg-ivory-100/60 py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <ScrollReveal className="text-center">
          <Eyebrow>QUESTIONS FRÉQUENTES</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-[-.05em] text-navy-950 md:text-4xl">
            Tout ce que vous devez savoir avant de postuler
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-navy-700/80">
            Des réponses concrètes aux interrogations courantes des fondateurs et fondatrices FinTech.
          </p>
        </ScrollReveal>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <ScrollReveal key={faq.question} custom={i}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? 'border-blue-300/60 bg-white shadow-md'
                      : 'border-navy-900/10 bg-white/70 hover:border-navy-900/20 hover:bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-display text-base font-bold text-navy-950 sm:p-6"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform duration-200 ${
                        isOpen
                          ? 'rotate-180 bg-blue-100 text-blue-700'
                          : 'bg-ivory-100 text-navy-800'
                      }`}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="border-t border-navy-900/5 px-5 pb-6 pt-3 text-sm leading-6 text-navy-800/85 sm:px-6">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
