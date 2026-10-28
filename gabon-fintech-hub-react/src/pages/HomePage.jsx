import { Hero } from '../features/hero/Hero';
import { ContestHighlight } from '../features/contest/ContestHighlight';
import { Stats } from '../features/stats/Stats';
import { About } from '../features/about/About';
import { MissionQuote } from '../features/mission/MissionQuote';
import { Membership } from '../features/membership/Membership';
import { Community } from '../features/community/Community';
import { Events } from '../features/events/Events';
import { Resources } from '../features/resources/Resources';
import { Contact } from '../features/contact/Contact';

export function HomePage() {
  return (
    <>
      {/* 1. Hero : Vision & Plateforme collaborative */}
      <Hero />

      {/* 2. Concours FinTech : Section dédiée juste après le Hero (Gratuit & Ouvert à tous) */}
      {/* À CONFIRMER : Dates officielles, étapes du bootcamp et dotations définitives */}
      <ContestHighlight />

      {/* 3. Chiffres clés : Messages qualitatifs sans chiffres inventés */}
      {/* À CONFIRMER : Remplacer par les statistiques réelles certifiées après audit */}
      <Stats />

      {/* 4. À propos : Raison d'être, vision, missions & 4 piliers stratégiques */}
      <About />

      {/* 5. Citation de la mission : Remplace tout témoignage fictif sans nom inventé */}
      {/* À CONFIRMER : Formulation de la devise ou charte de l’association */}
      <MissionQuote />

      {/* 6. Conseil de surveillance : Masqué sur l'accueil tant que les vrais noms ne sont pas fournis */}
      {/* À CONFIRMER : Réintégrer <Council /> sur la page d'accueil dès validation officielle de la liste nominative */}

      {/* 7. Adhésion : Grille des catégories avec offre fondateurs sans compteur arbitraire */}
      <Membership />

      {/* 8. Partenariats & Écosystème : Appel à partenariat remplaçant la liste de faux logos */}
      {/* À CONFIRMER : Logos officiels des partenaires à intégrer dès signature des conventions */}
      <Community />

      {/* 9. Événements : Sommet annuel et cartes génériques sans dates inventées */}
      {/* À CONFIRMER : Calendrier officiel et dates des prochains événements à intégrer dès validation */}
      <Events />

      {/* 10. Ressources : Axes de recherche et publications à paraître */}
      <Resources />

      {/* 11. Contact : Coordonnées réelles et lien officiel LinkedIn */}
      <Contact />
    </>
  );
}
