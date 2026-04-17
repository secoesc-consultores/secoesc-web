import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { client, urlFor } from '../sanity';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [branding, setBranding] = useState<any>(null);
  const [ui, setUi] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "branding"][0]`),
      client.fetch(`*[_type == "textosUI"][0]`),
    ]).then(([brandingData, uiData]) => {
      setBranding(brandingData);
      setUi(uiData);
    });
  }, []);

  const t = {
    inicio:     ui?.navInicio    || 'Inicio',
    nosotros:   ui?.navNosotros  || 'Nosotros',
    servicios:  ui?.navServicios || 'Servicios',
    portafolio: ui?.navPortafolio|| 'Portafolio',
    ingenieria: ui?.navIngenieria|| 'Ingeniería',
    contacto:   ui?.navContacto  || 'Contacto',
  };

  return (
    <nav className="fixed w-full z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo Dinámico */}
        <Link to="/" className="flex items-center">
          {branding?.logoPrincipal ? (
            <img
              src={urlFor(branding.logoPrincipal).url()}
              alt="SECOESC Logo"
              style={{ width: `${branding.anchoLogoNavbar || 180}px` }}
              className="h-auto object-contain transition-all"
            />
          ) : (
            <span className="text-xl font-black tracking-tighter text-on-surface">SECOESC</span>
          )}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/"           className="text-sm font-bold uppercase tracking-widest text-on-surface hover:text-primary transition-colors">{t.inicio}</Link>
          <Link to="/nosotros"   className="text-sm font-bold uppercase tracking-widest text-on-surface hover:text-primary transition-colors">{t.nosotros}</Link>
          <Link to="/servicios"  className="text-sm font-bold uppercase tracking-widest text-on-surface hover:text-primary transition-colors">{t.servicios}</Link>
          <Link to="/portafolio" className="text-sm font-bold uppercase tracking-widest text-on-surface hover:text-primary transition-colors">{t.portafolio}</Link>
          <Link to="/ingenieria" className="text-sm font-bold uppercase tracking-widest text-on-surface hover:text-primary transition-colors">{t.ingenieria}</Link>
          <Link to="/contacto"   className="bg-primary text-on-surface px-6 py-2.5 rounded-md text-xs font-black uppercase tracking-widest hover:shadow-ambient transition-all">
            {t.contacto}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-on-surface" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant p-8 flex flex-col gap-6 animate-in slide-in-from-top">
          <Link to="/"           onClick={() => setIsOpen(false)} className="font-bold uppercase tracking-widest">{t.inicio}</Link>
          <Link to="/nosotros"   onClick={() => setIsOpen(false)} className="font-bold uppercase tracking-widest">{t.nosotros}</Link>
          <Link to="/servicios"  onClick={() => setIsOpen(false)} className="font-bold uppercase tracking-widest">{t.servicios}</Link>
          <Link to="/portafolio" onClick={() => setIsOpen(false)} className="font-bold uppercase tracking-widest">{t.portafolio}</Link>
          <Link to="/ingenieria" onClick={() => setIsOpen(false)} className="font-bold uppercase tracking-widest">{t.ingenieria}</Link>
          <Link to="/contacto"   onClick={() => setIsOpen(false)} className="text-primary font-bold uppercase tracking-widest">{t.contacto}</Link>
        </div>
      )}
    </nav>
  );
}