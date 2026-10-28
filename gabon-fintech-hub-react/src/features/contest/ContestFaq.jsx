import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { concoursData } from '../../data';
import { Eyebrow } from '../../components/Eyebrow';
import { ScrollReveal } from '../../components/ScrollReveal';

export function ContestFaq() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqItems = concoursData.faq || [];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-concours" className="border-t border-navy-900/10 bg-ivory-50/50 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <ScrollReveal className="text-center">
          <Eyebrow>QUESTIONS FRÉQUENTES</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-[-.05em] text-navy-950 md:text-5xl">
            Foire aux questions sur le concours
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-navy-700/80 md:text-base">
            Des réponses claires pour lever tous vos doutes avant d'envoyer votre dossier.
          </p>
        </ScrollReveal>

        <div className="mt-12 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal
                key={index}
                custom={index}
                className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-sm transition hover:border-blue-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between p-6 text-left transition"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-display text-base font-bold text-navy-950 sm:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={`ml-4 grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold transition-transform duration-200 ${
                      isOpen
                        ? 'bg-blue-800 text-white rotate-45'
                        : 'bg-navy-900/5 text-navy-800'
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="border-t border-navy-900/5 px-6 pb-6 pt-3 text-sm leading-6 text-navy-700/85">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
