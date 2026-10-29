import { About } from '../features/about/About';
import { Council } from '../features/council/Council';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { ScrollReveal } from '../components/ScrollReveal';

export function AboutPage() {
  return (
    <>
      <section className="bg-navy-800 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <Eyebrow light>À PROPOS</Eyebrow>
            <h1 className="font-display text-4xl font-semibold tracking-[-.06em] md:text-6xl">
              Structurer et propulser l'écosystème FinTech au Gabon.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ivory-100/80 md:text-lg">
              Découvrez notre histoire, nos missions fondamentales, nos piliers stratégiques
              et les femmes et hommes qui composent le Conseil de surveillance.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <About />
      <Council />

      <section className="bg-ivory-100 py-16 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="font-display text-3xl font-semibold text-navy-950">
            Prêt à façonner la finance de demain ?
          </h2>
          <p className="mt-3 text-sm text-navy-700/80">
            Rejoignez une communauté engagée d'entrepreneurs, banquiers, régulateurs et innovateurs.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button to="/adhesion">
              Adhérer au Hub <Icon className="h-4 w-4" />
            </Button>
            <Button to="/contact" variant="outline">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
