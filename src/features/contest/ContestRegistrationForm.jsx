import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eyebrow } from '../../components/Eyebrow';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { ScrollReveal } from '../../components/ScrollReveal';
import { submitContestRegistration } from '../../services/contestService';

const MAX_DESCRIPTION_LENGTH = 500;

export function ContestRegistrationForm() {
  const [searchParams] = useSearchParams();

  // Capture automatique du paramètre UTM de source (ex: ?utm_source=linkedin)
  const initialSource = searchParams.get('utm_source') || 'direct';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    projectOrStartupName: '',
    websiteOrLinkedIn: '',
    projectDescription: '',
    consent: false,
    rulesAccepted: false,
    source: initialSource,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const src = searchParams.get('utm_source');
    if (src) {
      setFormData((prev) => ({ ...prev, source: src }));
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Le nom et prénom sont obligatoires.';
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'adresse email est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Veuillez saisir une adresse email valide.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Veuillez préciser votre ville de résidence.';
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Veuillez décrire brièvement votre projet ou votre idée.';
    } else if (formData.projectDescription.length > MAX_DESCRIPTION_LENGTH) {
      newErrors.projectDescription = `La description ne doit pas dépasser ${MAX_DESCRIPTION_LENGTH} caractères.`;
    }

    if (!formData.consent) {
      newErrors.consent = 'Votre consentement est obligatoire pour traiter votre candidature.';
    }

    if (!formData.rulesAccepted) {
      newErrors.rulesAccepted = 'L’acceptation du règlement du concours est obligatoire.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.focus();
      }
      return;
    }

    setIsLoading(true);
    try {
      const response = await submitContestRegistration(formData);
      setSubmissionResult(response);
    } catch (err) {
      console.error('[ContestRegistrationForm] Erreur lors de la soumission:', err);
      setSubmitError(err.message || 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      projectOrStartupName: '',
      websiteOrLinkedIn: '',
      projectDescription: '',
      consent: false,
      rulesAccepted: false,
      source: initialSource,
    });
    setErrors({});
    setSubmissionResult(null);
    setSubmitError(null);
  };

  return (
    <section id="formulaire-concours" className="relative scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <ScrollReveal className="text-center">
          <Eyebrow>CANDIDATURE OFFICIELLE</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-[-.05em] text-navy-950 md:text-5xl">
            Inscrivez votre projet au concours
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-navy-700/80 md:text-base">
            Remplissez ce formulaire en moins de 3 minutes. Aucun frais d'inscription, ouvert à
            tous les innovateurs.
          </p>
        </ScrollReveal>

        <div className="mt-12 rounded-3xl border border-navy-900/10 bg-ivory-50/70 p-6 shadow-xl sm:p-10">
          <AnimatePresence mode="wait">
            {submissionResult ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="text-center py-8"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-100 text-emerald-800">
                  <Icon name="check" className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
                  Inscription enregistrée avec succès !
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-sm text-navy-700/85">
                  Merci <strong>{formData.fullName}</strong>. Votre candidature a bien été transmise
                  au comité d'organisation du Gabon FinTech Hub.
                </p>

                <div className="mx-auto mt-6 max-w-md rounded-2xl border border-navy-900/10 bg-white p-5 text-left shadow-sm">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-navy-600">
                    Numéro de dossier attribué
                  </div>
                  <div className="mt-1 font-mono text-lg font-bold text-blue-900">
                    {submissionResult.id}
                  </div>
                  <div className="mt-4 space-y-1.5 border-t border-navy-900/10 pt-3 text-xs text-navy-700/70">
                    <div>Source enregistrée : <span className="font-semibold">{formData.source}</span></div>
                    <div>Prochaine étape : Vous recevrez le règlement complet et les dates précises par email à l'adresse <strong>{formData.email}</strong>.</div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <Button onClick={handleReset} variant="outline">
                    Inscrire un autre projet
                  </Button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-6">
                {/* Champ caché UTM pour la source */}
                <input type="hidden" name="source" value={formData.source} />
                {/* Anti-spam honeypot — invisible pour les humains, piège pour les bots */}
                <input type="text" name="_honeypot" tabIndex="-1" aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />

                {submitError && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 p-4 text-xs font-medium text-red-800">
                    <Icon name="alert" className="h-4 w-4 shrink-0 text-red-600" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Nom et prénom */}
                  <div>
                    <label htmlFor="fullName" className="form-label">
                      Nom et prénom <span className="text-blue-700 font-bold">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="Ex. Jean-Marc Obame"
                      value={formData.fullName}
                      onChange={handleChange}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      className={`form-control ${errors.fullName ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="mt-1 text-xs text-red-600 font-medium">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="form-label">
                      Adresse email <span className="text-blue-700 font-bold">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="contact@exemple.ga"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`form-control ${errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-600 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Téléphone */}
                  <div>
                    <label htmlFor="phone" className="form-label">
                      Numéro de téléphone <span className="text-blue-700 font-bold">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+241 77 00 00 00"
                      value={formData.phone}
                      onChange={handleChange}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      className={`form-control ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-xs text-red-600 font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Ville */}
                  <div>
                    <label htmlFor="city" className="form-label">
                      Ville de résidence <span className="text-blue-700 font-bold">*</span>
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      placeholder="Ex. Libreville, Port-Gentil, Franceville..."
                      value={formData.city}
                      onChange={handleChange}
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? 'city-error' : undefined}
                      className={`form-control ${errors.city ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                    />
                    {errors.city && (
                      <p id="city-error" className="mt-1 text-xs text-red-600 font-medium">
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Nom du projet ou de la startup (optionnel) */}
                  <div>
                    <label htmlFor="projectOrStartupName" className="form-label">
                      Nom du projet ou de la startup <span className="text-navy-600 text-[11px] font-normal">(Optionnel)</span>
                    </label>
                    <input
                      id="projectOrStartupName"
                      name="projectOrStartupName"
                      type="text"
                      placeholder="Ex. PayGabon, KoliTransfer..."
                      value={formData.projectOrStartupName}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  {/* Site web ou profil LinkedIn (optionnel) */}
                  <div>
                    <label htmlFor="websiteOrLinkedIn" className="form-label">
                      Site web ou profil LinkedIn <span className="text-navy-600 text-[11px] font-normal">(Optionnel)</span>
                    </label>
                    <input
                      id="websiteOrLinkedIn"
                      name="websiteOrLinkedIn"
                      type="text"
                      placeholder="https://linkedin.com/in/... ou https://..."
                      value={formData.websiteOrLinkedIn}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Description courte du projet (max 500 chars) */}
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="projectDescription" className="form-label">
                      Description courte du projet ou de l'idée <span className="text-blue-700 font-bold">*</span>
                    </label>
                    <span
                      className={`text-[11px] font-mono ${
                        formData.projectDescription.length > MAX_DESCRIPTION_LENGTH
                          ? 'text-red-600 font-bold'
                          : 'text-navy-600'
                      }`}
                    >
                      {formData.projectDescription.length}/{MAX_DESCRIPTION_LENGTH}
                    </span>
                  </div>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    required
                    rows="4"
                    maxLength={MAX_DESCRIPTION_LENGTH}
                    placeholder="Expliquez en quelques lignes votre concept : quel problème financier résolvez-vous, pour quel public, et comment votre technologie fonctionne ?"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    aria-invalid={!!errors.projectDescription}
                    aria-describedby={errors.projectDescription ? 'projectDescription-error' : undefined}
                    className={`form-control resize-y ${
                      errors.projectDescription ? 'border-red-500 ring-1 ring-red-500' : ''
                    }`}
                  />
                  {errors.projectDescription && (
                    <p id="projectDescription-error" className="mt-1 text-xs text-red-600 font-medium">
                      {errors.projectDescription}
                    </p>
                  )}
                </div>

                {/* Case de consentement RGPD / Données personnelles */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? 'consent-error' : undefined}
                      className="mt-1 h-4 w-4 rounded border-navy-900/20 text-blue-800 focus:ring-blue-500"
                    />
                    <span className="text-xs leading-5 text-navy-700/80">
                      J'accepte que mes données personnelles soient traitées par le Gabon FinTech Hub
                      dans le strict cadre de l'organisation et de l'évaluation de ma candidature au
                      concours. <span className="text-blue-700 font-bold">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p id="consent-error" className="mt-1 text-xs text-red-600 font-medium">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {/* Case d'acceptation du règlement du concours */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rulesAccepted"
                      required
                      checked={formData.rulesAccepted}
                      onChange={handleChange}
                      aria-invalid={!!errors.rulesAccepted}
                      aria-describedby={errors.rulesAccepted ? 'rulesAccepted-error' : undefined}
                      className="mt-1 h-4 w-4 rounded border-navy-900/20 text-blue-800 focus:ring-blue-500"
                    />
                    <span className="text-xs leading-5 text-navy-700/80">
                      J'accepte le règlement du concours et m'engage à respecter les règles d'intégrité
                      et de fair-play de la compétition. <span className="text-blue-700 font-bold">*</span>
                    </span>
                  </label>
                  {errors.rulesAccepted && (
                    <p id="rulesAccepted-error" className="mt-1 text-xs text-red-600 font-medium">
                      {errors.rulesAccepted}
                    </p>
                  )}
                </div>

                {/* Bouton de soumission */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto text-base py-3.5 px-8"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Transmission de votre dossier en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Valider mon inscription gratuite <Icon className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
