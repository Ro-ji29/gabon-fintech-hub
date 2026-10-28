import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TopAnnouncementBanner } from './components/TopAnnouncementBanner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MembershipPage } from './pages/MembershipPage';
import { CommunityPage } from './pages/CommunityPage';
import { EventsPage } from './pages/EventsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ContactPage } from './pages/ContactPage';
import { StartupRegistrationPage } from './pages/StartupRegistrationPage';
import { ContestPage } from './pages/ContestPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-ivory-50 text-navy-950 font-sans selection:bg-blue-200 selection:text-navy-950">
        <TopAnnouncementBanner />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/adhesion" element={<MembershipPage />} />
            <Route path="/inscription-startups" element={<StartupRegistrationPage />} />
            <Route path="/concours" element={<ContestPage />} />
            <Route path="/communautes" element={<CommunityPage />} />
            <Route path="/evenements" element={<EventsPage />} />
            <Route path="/ressources" element={<ResourcesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
