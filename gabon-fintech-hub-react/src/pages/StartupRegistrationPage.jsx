import { motion } from 'framer-motion';
import { plans } from '../data';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { ScrollReveal } from '../components/ScrollReveal';
import { SeoMeta } from '../components/SeoMeta';
import { OfferBanner } from '../features/membership/OfferBanner';
import { StartupCirclesIllustration } from '../features/startup-registration/StartupCirclesIllustration';
import { StartupRegistrationForm } from '../features/startup-registration/StartupRegistrationForm';
import { StartupFaq } from '../features/startup-registration/StartupFaq';

export function StartupRegistrationPage() {
  // Réutilisation directe des avantages du plan Startup rédigés dans data/plans.js
  const startupPlan = plans.find((p) => p.id === 'startup') || { benefits: [] };

  const handleScrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById('formulaire-startups');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Balises Meta & Open Graph propres pour partage LinkedIn ── */}
      <SeoMeta
        title="Inscription Startups FinTech · Gabon FinTech Hub"
        description="Candidatez au Gabon FinTech Hub : accélérez votre croissance, accédez aux investisseurs en capital-risque et naviguez sereinement la conformité COBAC et CEMAC."
        ogTitle="Startups FinTech du Gabon : Rejoignez le réseau des pionniers"
        ogDescription="Rejoignez la communauté de référence de l'innovation financière au Gabon. Programme Membres Fondateurs, pitchs investisseurs et visibilité panafricaine."
        ogImage="/assets/og-startups-preview.svg"
        ogUrl="/inscription-startups"
      />

      {/* ── 1. Hero court adressé aux startups ── */}
      <section className="relative isolate overflow-hidden bg-navy-800 py-16 text-white md:py-24">
        {/* Illustration orbitale en cercles animée en arrière-plan */}
        <StartupCirclesIllustration />

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal className="max-w-3xl">
            <Eyebrow light>
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-300" />
              ESPACE STARTUPS FINTECH · GABON & CEMAC
            </Eyebrow>

            <h1 className="font-display text-4xl font-semibold leading-tight tracking-[-.06em] text-white sm:text-5xl md:text-6xl">
              Propulsez votre startup au cœur de l'écosystème financier.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-ivory-100/85 md:text-lg">
              Rejoignez le réseau national de référence, accélérez vos levées de fonds, dialoguez
              avec les régulateurs monétaires et bâtissez l'inclusion financière de demain.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#formulaire-startups" onClick={handleScrollToForm} light>
                Rejoindre le Hub dès maintenant <Icon className="h-4 w-4" />
              </Button>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80">
                <Icon name="bolt" className="h-3.5 w-3.5 text-blue-300" />
                <span>Candidature rapide en 2 minutes · Réponse sous 48h</span>
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. « Pourquoi rejoindre le Hub » (Avantages du plan Startup réutilisés) ── */}
      <section className="bg-ivory-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal className="text-center">
            <Eyebrow>POURQUOI REJOINDRE LE HUB</Eyebrow>
            <h2 className="font-display text-3xl font-semibold tracking-[-.05em] text-navy-950 md:text-5xl">
              Un tremplin concret conçu pour les fondateurs
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-navy-700/80 md:text-base">
              Bénéficiez de l'ensemble des leviers prévus dans notre formule d'accompagnement
              Startup pour faire passer votre solution à l'échelle.
            </p>
          </ScrollReveal>

          {/* Grille des 7 avantages du plan Startup (issus de data/plans.js) */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {startupPlan.benefits.map((benefit, i) => (
              <ScrollReveal
                key={benefit}
                custom={i}
                className="group relative flex flex-col justify-between rounded-3xl border border-navy-900/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-100 font-display text-sm font-bold text-blue-800 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      0{i + 1}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700">
                      <Icon name="check" className="h-3.5 w-3.5" />
                      <span>Avantage Startup</span>
                    </span>
                  </div>

                  <p className="mt-5 font-display text-base font-bold leading-snug text-navy-950">
                    {benefit}
                  </p>
                </div>

                <div className="mt-6 border-t border-navy-900/5 pt-4">
                  <span className="text-[11px] font-medium text-navy-700/60">
                    Inclus dans l'adhésion startup
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Bandeau de l'offre fondateurs (OfferBanner réutilisé sans compteur) ── */}
      <section className="bg-ivory-50 pb-8 pt-4">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            {/* showCounter={false} : pas de compteur de places restantes tant que non confirmé */}
            <OfferBanner showCounter={false} />
          </ScrollReveal>
        </div>
      </section>

      {/* ── 4. Formulaire d'inscription dédié ── */}
      <StartupRegistrationForm />

      {/* ── 5. Mini-FAQ de 4 questions ── */}
      <StartupFaq />
    </>
  );
}
