import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { contact } from '../../data';
import { submitContactMessage } from '../../services/contactService';
import { Icon } from '../../components/Icon';
import { Button } from '../../components/Button';
import { Eyebrow } from '../../components/Eyebrow';
import { ScrollReveal } from '../../components/ScrollReveal';

export function Contact({ showForm = false }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setErrorMessage(null);
    setLoading(true);

    const payload = Object.fromEntries(new FormData(form));
    try {
      await submitContactMessage(payload);
      setSent(true);
      form.reset();
    } catch (err) {
      console.error('[Contact] Erreur lors de l’envoi:', err);
      setErrorMessage(err.message || 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-navy-800 px-5 py-16 text-white lg:px-8 lg:py-24"
    >
      {/* ── Formes floues abstraites (blobs) animées en arrière-plan (z-0 sur le fond sombre) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Blob 1 : Teinte Bleu cobalt / Azur vibrant (haut gauche / centre) */}
        <motion.div
          className="absolute -left-20 -top-24 h-[440px] w-[500px] rounded-full bg-gradient-to-br from-blue-400/40 via-blue-600/30 to-transparent blur-[75px] md:h-[560px] md:w-[640px] md:blur-[95px] mix-blend-screen"
          animate={
            shouldReduceMotion
              ? { x: 0, y: 0, scale: 1, opacity: 0.8 }
              : {
                  x: [0, 50, -25, 0],
                  y: [0, 35, -20, 0],
                  scale: [1, 1.15, 0.95, 1],
                  opacity: [0.7, 0.95, 0.65, 0.7],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Blob 2 : Teinte Cyan électrique / Bleu Ciel (bas droite) */}
        <motion.div
          className="absolute -bottom-28 -right-20 h-[460px] w-[520px] rounded-full bg-gradient-to-tl from-blue-300/45 via-sky-500/30 to-transparent blur-[80px] md:h-[600px] md:w-[680px] md:blur-[100px] mix-blend-screen"
          animate={
            shouldReduceMotion
              ? { x: 0, y: 0, scale: 1, opacity: 0.75 }
              : {
                  x: [0, -55, 25, 0],
                  y: [0, -40, 20, 0],
                  scale: [1, 0.92, 1.12, 1],
                  opacity: [0.65, 0.9, 0.6, 0.65],
                }
          }
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        />

        {/* Blob 3 : Teinte Bleu Azur / Ciel lumineux (centre flottant) */}
        <motion.div
          className="absolute left-1/4 top-1/3 h-[340px] w-[400px] rounded-full bg-gradient-to-tr from-sky-400/35 via-blue-400/25 to-transparent blur-[70px] md:h-[450px] md:w-[520px] md:blur-[90px] mix-blend-screen"
          animate={
            shouldReduceMotion
              ? { x: 0, y: 0, scale: 1, opacity: 0.6 }
              : {
                  x: [0, 40, -35, 0],
                  y: [0, -30, 25, 0],
                  scale: [1, 1.18, 0.9, 1],
                  opacity: [0.5, 0.8, 0.45, 0.5],
                }
          }
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
      </div>

      {/* ── Contenu principal positionné au-dessus des blobs (z-10) ── */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <Eyebrow light>NOUS CONTACTER</Eyebrow>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-.06em] md:text-5xl">
              Une idée, une question,<br />
              un partenariat ?
            </h2>
            <p className="mt-4 max-w-lg text-sm text-white/75">
              La prochaine conversation utile à l'écosystème peut commencer ici. Que vous
              soyez entrepreneur, institutionnel ou investisseur, échangeons sur vos ambitions.
            </p>
            <Button
              href={`mailto:${contact.email}`}
              light
              className="mt-6"
            >
              Écrire à l'équipe <Icon className="h-4 w-4" />
            </Button>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative grid gap-6 rounded-3xl border border-white/20 bg-navy-900/60 p-8 shadow-2xl backdrop-blur-md">
              <div>
                <span className="text-[9px] font-bold tracking-[.15em] text-white/55">
                  COMMUNICATION DIRECTE
                </span>
                {/* À CONFIRMER : numéro officiel du standard téléphonique à insérer dès attribution */}
                <p className="mt-1 text-base font-semibold text-blue-300">
                  Permanence par e-mail & LinkedIn
                </p>
                <span className="text-xs text-white/60">Échanges et réponses réactives pour l’écosystème</span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-[9px] font-bold tracking-[.15em] text-white/55">
                  COURRIEL
                </span>
                {/* À CONFIRMER : validation définitive de l'adresse contact@gabonfintech-hub.com */}
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 block text-lg font-semibold text-blue-300 transition hover:underline"
                >
                  {contact.email}
                </a>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-[9px] font-bold tracking-[.15em] text-white/55">
                  LOCALISATION DU SIÈGE
                </span>
                {/* À CONFIRMER : adresse physique exacte du siège à Libreville */}
                <p className="mt-1 text-base text-white/90">{contact.address}</p>
                <span className="text-xs text-white/60">Gabon, Afrique Centrale</span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <span className="text-[9px] font-bold tracking-[.15em] text-white/55">
                  RÉSEAUX SOCIAUX
                </span>
                <div className="mt-2">
                  <a
                    href="https://www.linkedin.com/company/gabon-fintech-hub/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-blue-200 transition hover:border-blue-300 hover:bg-white/20 hover:text-white"
                  >
                    <Icon name="linkedin" className="h-4 w-4 text-blue-300" />
                    <span>Rejoindre le Gabon FinTech Hub sur LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {showForm && (
          <ScrollReveal className="mt-14 overflow-hidden rounded-3xl border border-white/15 bg-ivory-50 p-6 text-navy-950 shadow-2xl sm:p-10">
            <div className="mb-6">
              <Eyebrow>FORMULAIRE DE CONTACT</Eyebrow>
              <h3 className="font-display text-2xl font-bold tracking-tight text-navy-950">
                Laissez-nous un message direct
              </h3>
            </div>

            <form onSubmit={handleSubmit} noValidate className="grid gap-4">
              {/* Anti-spam honeypot — invisible pour les humains, piège pour les bots */}
              <input type="text" name="_honeypot" tabIndex="-1" aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-label">
                  Nom et prénom
                  <input
                    name="name"
                    required
                    placeholder="Votre nom"
                    className="form-control"
                  />
                </label>
                <label className="form-label">
                  Email
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="nom@exemple.com"
                    className="form-control"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-label">
                  Sujet
                  <select name="subject" className="form-control" defaultValue="partenariat">
                    <option value="partenariat">Proposition de partenariat</option>
                    <option value="presse">Presse & Médias</option>
                    <option value="evenement">Événements & Sommet</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </label>
                <label className="form-label">
                  Téléphone (optionnel)
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+241 …"
                    className="form-control"
                  />
                </label>
              </div>

              <label className="form-label">
                Message
                <textarea
                  name="message"
                  required
                  rows="4"
                  placeholder="Comment pouvons-nous vous aider ?"
                  className="form-control"
                />
              </label>

              {errorMessage && (
                <div role="alert" className="rounded-xl bg-red-900/60 p-4 text-xs font-medium text-red-200 border border-red-500/40">
                  {errorMessage}
                </div>
              )}

              <Button type="submit" disabled={loading} className="justify-self-start mt-2">
                {loading ? 'Envoi en cours…' : 'Envoyer le message'} <Icon className="h-4 w-4" />
              </Button>

              <AnimatePresence>
                {sent && (
                  <motion.div
                    key="sent"
                    className="flex items-center gap-2.5 rounded-xl bg-emerald-100 p-4 text-sm font-medium text-emerald-900 border border-emerald-300"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <Icon name="check" className="h-4 w-4 shrink-0 text-emerald-800" />
                    <span>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
