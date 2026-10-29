import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';

export function NotFoundPage() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-ivory-50 px-5 py-24 text-center">
      <div className="max-w-md">
        <Eyebrow>ERREUR 404</Eyebrow>
        <h1 className="font-display text-5xl font-extrabold text-navy-950">
          Page introuvable
        </h1>
        <p className="mt-4 text-sm text-navy-800/75">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button to="/">
            Retour à l'accueil <Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
