import { concoursData } from '../../data';
import { Eyebrow } from '../../components/Eyebrow';
import { Icon } from '../../components/Icon';
import { ScrollReveal } from '../../components/ScrollReveal';

export function ContestInBrief() {
  const { objectif, quiPeutParticiper, deroule, recompenses, criteres } = concoursData;

  return (
    <section id="en-bref" className="relative bg-ivory-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* En-tête de section */}
        <ScrollReveal className="text-center">
          <Eyebrow>LE CONCOURS EN BREF</Eyebrow>
          <div className="mt-2 flex items-center justify-center gap-3">
            <h2 className="font-display text-3xl font-semibold tracking-[-.05em] text-navy-950 md:text-5xl">
              Tout ce qu'il faut savoir pour candidater
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-navy-700/80 md:text-base">
            Un tremplin 100 % gratuit pour tester votre idée, prototyper votre solution et rencontrer
            les décideurs de la finance africaine.
          </p>
        </ScrollReveal>

        {/* ── 1. OBJECTIF DU CONCOURS ── */}
        <ScrollReveal className="relative mt-14 overflow-hidden rounded-3xl border border-navy-900/10 bg-white p-6 shadow-sm md:p-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Axe 01</span>
            <h3 className="font-display text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
              {objectif.title}
            </h3>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-navy-700/85 md:text-base">
            {objectif.summary}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {objectif.themes.map((theme, i) => (
              <div
                key={theme.title}
                className="rounded-2xl border border-navy-900/10 bg-ivory-50/70 p-5 transition hover:border-blue-300 hover:bg-white"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-800">
                  0{i + 1}
                </div>
                <h4 className="mt-3 text-sm font-bold text-navy-950">{theme.title}</h4>
                <p className="mt-1 text-xs leading-5 text-navy-700/75">{theme.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── 2. QUI PEUT PARTICIPER ── */}
        <ScrollReveal className="relative mt-8 overflow-hidden rounded-3xl border border-navy-900/10 bg-gradient-to-br from-navy-900 to-navy-800 p-6 text-white shadow-lg md:p-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">Axe 02</span>
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {quiPeutParticiper.title}
            </h3>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-white/80 md:text-base">
            {quiPeutParticiper.eligibilityNotice}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quiPeutParticiper.details.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-400 text-navy-950">
                  <Icon name="check" className="h-3 w-3" />
                </span>
                <span className="text-xs leading-5 text-white/90">{item}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── 3. DÉROULÉ (ÉTAPES ET DATES) ── */}
        <ScrollReveal className="relative mt-8 overflow-hidden rounded-3xl border border-navy-900/10 bg-white p-6 shadow-sm md:p-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Axe 03</span>
            <h3 className="font-display text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
              {deroule.title}
            </h3>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {deroule.steps.map((step) => (
              <div
                key={step.phase}
                className="relative flex flex-col justify-between rounded-2xl border border-navy-900/10 bg-ivory-50/60 p-5 transition hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-navy-600">
                      {step.phase}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        step.status === 'En cours'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-navy-900/10 text-navy-700'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>

                  <h4 className="mt-3 font-display text-sm font-bold text-navy-950">
                    {step.name}
                  </h4>

                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-1 text-[11px] font-semibold text-blue-900 border border-blue-200">
                    <Icon name="calendar" className="h-3.5 w-3.5 text-blue-700" />
                    <span>{step.dates}</span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-navy-700/75">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── 4. PRIX OU RÉCOMPENSES ── */}
        <ScrollReveal className="relative mt-8 overflow-hidden rounded-3xl border border-navy-900/10 bg-white p-6 shadow-sm md:p-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Axe 04</span>
            <h3 className="font-display text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
              {recompenses.title}
            </h3>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-blue-200 bg-blue-50/60 p-4 text-xs leading-5 text-blue-950 sm:text-sm">
            <Icon name="bulb" className="h-5 w-5 shrink-0 text-blue-700" />
            <p>{recompenses.provisionalNote}</p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recompenses.items.map((reward) => (
              <div
                key={reward.name}
                className="flex flex-col justify-between rounded-2xl border border-navy-900/10 bg-ivory-50/60 p-5"
              >
                <div>
                  <span className="rounded-full bg-blue-800 px-2.5 py-0.5 text-[10px] font-bold text-white">
                    {reward.rank}
                  </span>
                  <h4 className="mt-3 text-sm font-bold text-navy-950">{reward.name}</h4>
                  <p className="mt-1 text-xs font-semibold text-blue-700">{reward.highlight}</p>

                  <ul className="mt-4 space-y-2 border-t border-navy-900/10 pt-3">
                    {reward.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-navy-700/80">
                        <Icon name="check" className="h-3.5 w-3.5 shrink-0 text-blue-600 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── 5. CRITÈRES DE SÉLECTION ── */}
        <ScrollReveal className="relative mt-8 overflow-hidden rounded-3xl border border-navy-900/10 bg-white p-6 shadow-sm md:p-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Axe 05</span>
            <h3 className="font-display text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
              {criteres.title}
            </h3>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {criteres.items.map((criterion) => (
              <div
                key={criterion.name}
                className="rounded-2xl border border-navy-900/10 bg-ivory-50/70 p-5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-navy-950">{criterion.name}</h4>
                  <span className="rounded-lg bg-navy-900 px-2 py-0.5 text-[10px] font-extrabold text-blue-200">
                    {criterion.weight}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-navy-700/80">
                  {criterion.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
