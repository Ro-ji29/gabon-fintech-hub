import { Community } from '../features/community/Community';
import { Eyebrow } from '../components/Eyebrow';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { ScrollReveal } from '../components/ScrollReveal';

export function CommunityPage() {
  const pillars = [
    {
      title: 'Startups & Scale-ups',
      description: 'Pionniers du paiement mobile, de la micro-assurance, du scoring de crédit et de la RegTech.',
    },
    {
      title: 'Banques & Assurances',
      description: 'Institutions historiques engagées dans la modernisation de leurs services numériques.',
    },
    {
      title: 'Régulateurs & Bailleurs',
      description: 'Autorités monétaires, ministères et partenaires multilatéraux favorisant un cadre sain.',
    },
    {
      title: 'Universités & Talents',
      description: 'Centres de formation, développeurs et chercheurs incubant les compétences du futur.',
    },
  ];

  return (
    <>
      <section className="bg-navy-800 py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <Eyebrow light>COMMUNAUTÉS & PARTENAIRES</Eyebrow>
            <h1 className="font-display text-4xl font-semibold tracking-[-.06em] md:text-6xl">
              L'écosystème réuni sous un même toit.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ivory-100/80 md:text-lg">
              Une diversité d'acteurs publics et privés collaborant pour faire du Gabon
              un pôle d'excellence FinTech incontournable en zone CEMAC.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Community />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <ScrollReveal>
          <Eyebrow>COMPOSITION DU RÉSEAU</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-[-.05em] text-navy-950 md:text-4xl">
            Qui compose notre communauté ?
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item, i) => (
            <ScrollReveal key={item.title} custom={i} className="rounded-2xl border border-navy-900/10 bg-ivory-100 p-6">
              <span className="font-display text-sm font-bold text-blue-700">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-navy-950">{item.title}</h3>
              <p className="mt-2 text-xs leading-6 text-navy-800/80">{item.description}</p>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-blue-100 p-8 text-center md:p-12">
          <h3 className="font-display text-2xl font-semibold text-navy-950">
            Votre organisation souhaite rejoindre le mouvement ?
          </h3>
          <p className="mt-2 text-sm text-navy-800/75">
            Intégrez les groupes thématiques et développez vos synergies inter-entreprises.
          </p>
          <Button to="/adhesion" className="mt-6">
            Adhérer dès maintenant <Icon className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
