import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { submitStartupRegistration } from '../../services/startupService';
import { Eyebrow } from '../../components/Eyebrow';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { ScrollReveal } from '../../components/ScrollReveal';

export function StartupRegistrationForm() {
  const [searchParams] = useSearchParams();

  // Extraction du paramètre UTM source (par défaut 'linkedin' si la page est partagée sur LinkedIn)
  const initialSource = searchParams.get('utm_source') || 'linkedin';

  const [formData, setFormData] = useState({
    startupName: '',
    contactName: '',
    email: '',
    phone: '',
    city: 'Libreville',
    websiteOrLinkedin: '',
    sector: 'Paiement',
    stage: 'Prototype',
    mainNeed: 'Financement',
    description: '',
    consent: false,
    utmSource: initialSource,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Mettre à jour l'UTM si l'URL change
  useEffect(() => {
    const src = searchParams.get('utm_source');
    if (src) {
      setFormData((prev) => ({ ...prev, utmSource: src }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.startupName.trim()) errs.startupName = 'Le nom de la startup est obligatoire.';
    if (!formData.contactName.trim()) errs.contactName = 'Le nom du fondateur ou contact est obligatoire.';
    if (!formData.email.trim()) {
      errs.email = 'L’adresse email professionnelle est requise.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Veuillez saisir une adresse email valide.';
    }
    if (!formData.phone.trim()) errs.phone = 'Le numéro de téléphone est requis.';
    if (!formData.city.trim()) errs.city = 'Veuillez indiquer la ville d’implantation.';
    if (!formData.description.trim()) {
      errs.description = 'Une courte présentation de votre solution est requise.';
    } else if (formData.description.length > 500) {
      errs.description = 'La description ne doit pas dépasser 500 caractères.';
    }
    if (!formData.consent) {
      errs.consent = 'Vous devez accepter le traitement de vos données pour postuler.';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await submitStartupRegistration(formData);
      setSubmittedData({
        ...formData,
        dossierId: response.id,
      });
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
      setErrors({ global: 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      startupName: '',
      contactName: '',
      email: '',
      phone: '',
      city: 'Libreville',
      websiteOrLinkedin: '',
      sector: 'Paiement',
      stage: 'Prototype',
      mainNeed: 'Financement',
      description: '',
      consent: false,
      utmSource: initialSource,
    });
  };

  return (
    <section id="formulaire-startups" className="scroll-mt-24 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <ScrollReveal className="text-center">
          <Eyebrow>CANDIDATURE OFFICIELLE</Eyebrow>
          <h2 className="font-display text-3xl font-semibold tracking-[-.05em] text-navy-950 md:text-5xl">
            Inscrivez votre FinTech au Hub
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-navy-700/80 md:text-base">
            Remplissez ce formulaire en 2 minutes. Notre comité examinera votre profil et vous
            recontactera sous 48h pour planifier un premier échange stratégique.
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-navy-900/10 bg-white p-6 shadow-xl sm:p-10 md:p-12">
            {submittedData ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-800 shadow-sm">
                  <Icon name="check" className="h-8 w-8" />
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold text-navy-950 md:text-3xl">
                  Candidature bien enregistrée !
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-navy-700">
                  Merci <strong>{submittedData.contactName}</strong>. Le dossier pour la startup{' '}
                  <span className="font-semibold text-blue-800">« {submittedData.startupName} »</span> a été
                  transmis avec succès au secrétariat du Hub.
                </p>

                <div className="mx-auto mt-6 inline-flex flex-col items-center rounded-2xl border border-blue-200 bg-blue-50/70 px-6 py-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800/80">
                    Référence de votre dossier
                  </span>
                  <span className="font-display text-xl font-extrabold text-blue-900 tracking-wider">
                    {submittedData.dossierId}
                  </span>
                  <span className="mt-1 text-xs text-navy-700/70">
                    Source : <code className="font-mono text-blue-700">{submittedData.utmSource}</code>
                  </span>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <Button onClick={handleReset} className="!text-xs">
                    Soumettre une autre startup
                  </Button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Anti-spam honeypot — invisible pour les humains, piège pour les bots */}
                <input type="text" name="_honeypot" tabIndex="-1" aria-hidden="true" autoComplete="off" style={{ display: 'none' }} />

                {errors.global && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
                    {errors.global}
                  </div>
                )}

                {/* Champ caché pour le tracking LinkedIn / UTM source */}
                <input type="hidden" name="utm_source" value={formData.utmSource} />

                {/* Ligne 1 : Nom startup & Fondateur */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="form-label" htmlFor="startupName">
                      Nom de la startup *
                    </label>
                    <input
                      id="startupName"
                      name="startupName"
                      type="text"
                      required
                      placeholder="Ex : PayGabon, Kredika…"
                      value={formData.startupName}
                      onChange={handleChange}
                      className={`form-control ${errors.startupName ? '!border-red-500 ring-1 ring-red-500' : ''}`}
                    />
                    {errors.startupName && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.startupName}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label" htmlFor="contactName">
                      Nom & Prénom du fondateur / contact *
                    </label>
                    <input
                      id="contactName"
                      name="contactName"
                      type="text"
                      required
                      placeholder="Ex : Patrick Mba"
                      value={formData.contactName}
                      onChange={handleChange}
                      className={`form-control ${errors.contactName ? '!border-red-500 ring-1 ring-red-500' : ''}`}
                    />
                    {errors.contactName && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.contactName}</p>
                    )}
                  </div>
                </div>

                {/* Ligne 2 : Email & Téléphone */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="form-label" htmlFor="email">
                      Adresse email professionnelle *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="fondateur@startup.ga"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? '!border-red-500 ring-1 ring-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label" htmlFor="phone">
                      Numéro de téléphone *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+241 07 00 00 00"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-control ${errors.phone ? '!border-red-500 ring-1 ring-red-500' : ''}`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Ligne 3 : Ville & Site web / LinkedIn */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="form-label" htmlFor="city">
                      Ville d'implantation *
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      placeholder="Ex : Libreville, Port-Gentil, Franceville…"
                      value={formData.city}
                      onChange={handleChange}
                      className={`form-control ${errors.city ? '!border-red-500 ring-1 ring-red-500' : ''}`}
                    />
                    {errors.city && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label" htmlFor="websiteOrLinkedin">
                      Site web ou page LinkedIn (optionnel)
                    </label>
                    <input
                      id="websiteOrLinkedin"
                      name="websiteOrLinkedin"
                      type="url"
                      placeholder="https://linkedin.com/company/… ou https://…"
                      value={formData.websiteOrLinkedin}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Ligne 4 : Secteur, Stade & Besoin principal */}
                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <label className="form-label" htmlFor="sector">
                      Secteur d'activité *
                    </label>
                    <select
                      id="sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      className="form-control font-medium"
                    >
                      <option value="Paiement">Paiement & Portefeuilles</option>
                      <option value="Microfinance">Microfinance Digitale</option>
                      <option value="RegTech">RegTech & Conformité</option>
                      <option value="InsurTech">InsurTech (Assurance)</option>
                      <option value="Crédit">Crédit & Prêts alternatifs</option>
                      <option value="Autre">Autre innovation financière</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="stage">
                      Stade de maturité *
                    </label>
                    <select
                      id="stage"
                      name="stage"
                      value={formData.stage}
                      onChange={handleChange}
                      className="form-control font-medium"
                    >
                      <option value="Idée">Idée & Conception</option>
                      <option value="Prototype">Prototype / MVP testé</option>
                      <option value="Lancée">Lancée (premiers clients)</option>
                      <option value="En croissance">En croissance / Scale-up</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="mainNeed">
                      Besoin prioritaire *
                    </label>
                    <select
                      id="mainNeed"
                      name="mainNeed"
                      value={formData.mainNeed}
                      onChange={handleChange}
                      className="form-control font-medium"
                    >
                      <option value="Financement">Levée de fonds / Capital</option>
                      <option value="Mentorat">Mentorat & Incubation</option>
                      <option value="Conformité réglementaire">Agrément COBAC / CEMAC</option>
                      <option value="Réseau">Partenariats bancaires</option>
                      <option value="Visibilité">Visibilité & Médias</option>
                    </select>
                  </div>
                </div>

                {/* Ligne 5 : Description courte avec compteur dynamique de caractères */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="form-label" htmlFor="description">
                      Pitch ou description courte de votre solution (500 car. max) *
                    </label>
                    <span
                      className={`text-xs font-mono font-medium ${
                        formData.description.length > 500
                          ? 'text-red-600 font-bold'
                          : formData.description.length > 450
                          ? 'text-amber-600'
                          : 'text-navy-700/60'
                      }`}
                    >
                      {formData.description.length} / 500
                    </span>
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    maxLength={500}
                    placeholder="Présentez en quelques phrases votre proposition de valeur, votre marché cible et votre valeur ajoutée pour l’inclusion financière…"
                    value={formData.description}
                    onChange={handleChange}
                    className={`form-control resize-y ${
                      errors.description ? '!border-red-500 ring-1 ring-red-500' : ''
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.description}</p>
                  )}
                </div>

                {/* Case de consentement obligatoire */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-navy-900/20 text-blue-600 accent-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs leading-5 text-navy-800/80">
                      J'accepte que les informations transmises soient traitées par le Gabon FinTech Hub
                      dans le cadre de l'examen de ma candidature et de la mise en relation avec
                      l'écosystème partenarial. *
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium pl-7">{errors.consent}</p>
                  )}
                </div>

                {/* Soumission */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Envoi du dossier en cours…
                      </>
                    ) : (
                      <>
                        Soumettre ma candidature startup <Icon className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <span className="inline-flex items-center gap-1.5 text-[11px] text-navy-700/60 text-center sm:text-right">
                    <Icon name="lock" className="h-3.5 w-3.5 text-navy-500" />
                    <span>Traitement confidentiel · Réponse sous 48h</span>
                  </span>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
