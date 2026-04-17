import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { client, urlFor } from './sanity';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Services from './pages/Services';
import Engineering from './pages/Engineering';
import Contact from './pages/Contact';
import Portal from './pages/Portal';
import SpecialtyDetail from './pages/SpecialtyDetail';
import Portfolio from './pages/Portfolio';

export default function App() {
  useEffect(() => {
    // Carga de Favicon y Branding Dinámico
    client.fetch(`*[_type == "branding"][0]`).then((data) => {
      if (data?.favicon) {
        const faviconUrl = urlFor(data.favicon).url();
        const faviconNode = document.getElementById('dynamic-favicon') as HTMLLinkElement;
        if (faviconNode) {
          faviconNode.href = faviconUrl;
        }
      }
    });
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary/30">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/portafolio" element={<Portfolio />} />
            <Route path="/especialidades/:slug" element={<SpecialtyDetail />} />
            <Route path="/ingenieria" element={<Engineering />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/portal" element={<Portal />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}