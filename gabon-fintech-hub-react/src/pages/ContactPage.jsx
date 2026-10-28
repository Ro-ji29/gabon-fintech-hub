import { Contact } from '../features/contact/Contact';
import { Eyebrow } from '../components/Eyebrow';
import { ScrollReveal } from '../components/ScrollReveal';
import { ContactIllustration } from '../features/contact/ContactIllustration';

export function ContactPage() {
  return (
    <>
      <section className="bg-navy-800 py-12 text-white md:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
            <ScrollReveal>
              <Eyebrow light>CONTACT & ÉCHANGES</Eyebrow>
              <h1 className="font-display text-4xl font-semibold tracking-[-.06em] md:text-6xl">
                Parlons de votre projet.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-ivory-100/80 md:text-lg">
                Une interrogation, une proposition d'intervention ou un intérêt partenarial ?
                Toute l'équipe du Gabon FinTech Hub se tient à votre entière écoute.
              </p>
            </ScrollReveal>
            <div className="flex justify-center md:justify-end">
              <ContactIllustration />
            </div>
          </div>
        </div>
      </section>

      <Contact showForm={true} />
    </>
  );
}
