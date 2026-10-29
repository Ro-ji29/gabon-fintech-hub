import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { ScrollReveal } from '../components/ScrollReveal';
import { SeoMeta } from '../components/SeoMeta';
import { concoursData } from '../data';
import { ContestCirclesIllustration } from '../features/contest/ContestCirclesIllustration';
import { ContestInBrief } from '../features/contest/ContestInBrief';
import { ContestRegistrationForm } from '../features/contest/ContestRegistrationForm';
import { ContestFaq } from '../features/contest/ContestFaq';

export function ContestPage() {
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const target = document.getElementById('formulaire-concours');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Balises Meta & Open Graph propres pour partage LinkedIn ── */}
      <SeoMeta
        title="Concours FinTech Gabon 2026 · Inscription Gratuite · Gabon FinTech Hub"
        description="Participez au grand concours national d'innovation financière au Gabon. Inscription 100% gratuite et ouverte à tous. Révélez vos solutions FinTech."
        ogTitle="Concours FinTech Gabon 2026 — Inscription gratuite & ouverte à tous"
        ogDescription="Grand défi national de l'innovation financière au Gabon : bootcamp, mentorat d'experts, dotations et opportunités d'accélération avec le Gabon FinTech Hub."
        ogImage="/assets/og-concours-preview.svg"
        ogUrl="/concours"
      />

      {/* ── 1. Hero court du concours ── */}
      <section className="relative isolate overflow-hidden bg-navy-800 py-16 text-white md:py-24">
        {/* Illustration orbitale en cercles animée en arrière-plan */}
        <ContestCirclesIllustration />

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow light>
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-300" />
                DÉFI INNOVATION · GABON & CEMAC
              </Eyebrow>
            </div>

            {/* Titre du concours (provisoire) */}
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-[-.06em] text-white sm:text-5xl md:text-6xl">
              {concoursData.title}
            </h1>

            {/* Phrase de promesse */}
            <p className="mt-5 max-w-2xl text-base leading-7 text-ivory-100/90 md:text-lg">
              {concoursData.tagline}
            </p>

            {/* Mention : Inscription gratuite, ouverte à tous */}
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-4 py-1.5 text-xs font-semibold text-emerald-200 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{concoursData.accessibilityNotice}</span>
            </div>

            {/* Bouton d'ancrage vers le formulaire */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#formulaire-concours" onClick={handleScrollToForm} light>
                S'inscrire au concours <Icon className="h-4 w-4" />
              </Button>
              <a
                href="#en-bref"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 transition hover:text-white hover:underline"
              >
                <span>Découvrir les étapes et critères</span>
                <Icon name="arrow" className="h-3.5 w-3.5 rotate-90" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. Le concours en bref ── */}
      <ContestInBrief />

      {/* ── 3. Formulaire d'inscription ── */}
      <ContestRegistrationForm />

      {/* ── 4. Mini-FAQ (3 à 4 questions) ── */}
      <ContestFaq />
    </>
  );
}
