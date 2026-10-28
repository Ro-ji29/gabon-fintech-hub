import { Membership } from '../features/membership/Membership';
import { Eyebrow } from '../components/Eyebrow';
import { ScrollReveal } from '../components/ScrollReveal';

export function MembershipPage() {
  return (
    <>
      <section className="bg-navy-800 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <Eyebrow light>ADHÉSION & MEMBRES</Eyebrow>
            <h1 className="font-display text-4xl font-semibold tracking-[-.06em] md:text-6xl">
              Devenez membre du Gabon FinTech Hub.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ivory-100/80 md:text-lg">
              Bénéficiez d'une visibilité accrue, participez à des groupes de travail
              stratégiques et accédez à notre réseau de décideurs et investisseurs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Membership />
    </>
  );
}
