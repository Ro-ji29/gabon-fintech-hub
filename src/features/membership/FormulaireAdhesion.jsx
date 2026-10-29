import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { plans } from '../../data';
import { submitMembershipRegistration } from '../../services/membershipService';
import { Icon } from '../../components/Icon';
import { Button } from '../../components/Button';
import { Eyebrow } from '../../components/Eyebrow';

export function FormulaireAdhesion({
  selectedPlanId,
  onPlanChange,
  id = 'formulaire',
}) {
  const [category, setCategory] = useState(selectedPlanId || plans[0].id);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Sync if prop changes
  const currentCategory = selectedPlanId || category;

  const handleCategoryChange = (val) => {
    setCategory(val);
    if (onPlanChange) onPlanChange(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setErrorMessage(null);
    setLoading(true);

    const payload = Object.fromEntries(new FormData(form));
    try {
      await submitMembershipRegistration(payload);
      setSent(true);
      form.reset();
    } catch (err) {
      console.error('[FormulaireAdhesion] Erreur de soumission:', err);
      setErrorMessage(err.message || 'Une erreur est survenue lors de l’envoi. Veuillez vérifier vos informations et réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id={id}
      className="grid overflow-hidden rounded-3xl border border-navy-900/10 bg-white lg:grid-cols-[.75fr_1.25fr]"
    >
      <div className="bg-blue-100 p-7 md:p-10">
        <Eyebrow>PREMIÈRE ÉTAPE</Eyebrow>
        <h3 className="font-display text-3xl font-semibold leading-tight tracking-[-.05em] text-navy-950">
          Construisons la suite ensemble.
        </h3>
        <p className="mt-4 text-sm leading-6 text-navy-800/80">
          Présentez-nous votre activité. Notre équipe vous recontactera pour échanger
          sur votre adhésion.
        </p>
        <p className="mt-8 border-t border-navy-900/10 pt-4 text-xs leading-5 text-navy-700/70">
          Le formulaire est transmis directement à l'équipe du Hub. Les modalités d'accès
          sont provisoires et vous seront confirmées personnellement.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        onChange={() => sent && setSent(false)}
        className="grid gap-4 p-6 md:p-10"
        noValidate
      >
        {/* Anti-spam honeypot — invisible pour les humains, piège pour les bots */}
        <input type="text" name="_honeypot" tabIndex="-1" aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-label">
            Catégorie d'adhésion
            <select
              id="category"
              name="category"
              required
              value={currentCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="form-control"
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <label className="form-label">
            Nom complet
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Ex. Jean Ondo"
              className="form-control"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-label">
            Organisation / Startup
            <input
              name="organization"
              autoComplete="organization"
              placeholder="Ex. FinTech Gabon SAS"
              className="form-control"
            />
          </label>

          <label className="form-label">
            Adresse e-mail professionnelle
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="nom@entreprise.ga"
              className="form-control"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-label">
            Numéro de téléphone
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="+241 07 00 00 00"
              className="form-control"
            />
          </label>

          <label className="form-label">
            Votre message / Vos attentes
            <textarea
              name="message"
              rows="2"
              placeholder="Décrivez brièvement votre projet et vos besoins"
              className="form-control"
            />
          </label>
        </div>

        <label className="flex items-start gap-2 text-xs leading-5 text-navy-800/80">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 accent-blue-700"
          />
          J'accepte que mes informations soient utilisées pour traiter ma demande d'adhésion au Gabon FinTech Hub.
        </label>

        {errorMessage && (
          <div role="alert" className="rounded-xl bg-red-50 p-4 text-xs font-medium text-red-800 border border-red-200">
            {errorMessage}
          </div>
        )}

        <Button className="justify-self-start" type="submit" disabled={loading}>
          {loading ? 'Envoi en cours…' : 'Envoyer ma demande'} <Icon className="h-4 w-4" />
        </Button>

        {/* Message fonctionnel de succès conservé en vert conformément aux règles */}
        <AnimatePresence>
          {sent && (
            <motion.div
              key="success"
              role="status"
              className="flex items-center gap-2.5 rounded-xl bg-emerald-100/70 p-4 text-sm font-medium text-emerald-900 border border-emerald-300"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Icon name="check" className="h-4 w-4 shrink-0 text-emerald-800" />
              <span>Votre demande a bien été enregistrée ! L'équipe du Gabon FinTech Hub prendra contact avec vous dans les plus brefs délais.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
