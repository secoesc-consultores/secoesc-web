import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { client, urlFor } from '../sanity';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [branding, setBranding] = useState<any>(null);
  const [ui, setUi] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "branding"][0]`),
      client.fetch(`*[_type == "textosUI"][0]`),
    ]).then(([brandingData, uiData]) => {
      setBranding(brandingData);
      setUi(uiData);
      setLoading(false);
    }).catch(err => {
      console.error("Error cargando Navbar:", err);
      setLoading(false);
    });
  }, []);

  const t = !loading ? {
    inicio:     ui?.navInicio    || 'Inicio',
    nosotros:   ui?.navNosotros  || 'Nosotros',
    servicios:  ui?.navServicios || 'Servicios',
    portafolio: ui?.navPortafolio|| 'Portafolio',
    ingenieria: ui?.navIngenieria|| 'Ingeniería',
    contacto:   ui?.navContacto  || 'Contacto',
  } : null;

  const navLinks = t ? [
    { name: t.inicio, path: '/' },
    { name: t.nosotros, path: '/nosotros' },
    { name: t.servicios, path: '/servicios' },
    { name: t.portafolio, path: '/portafolio' },
    { name: t.ingenieria, path: '/ingenieria' },
  ] : [];

  return (
    <nav className="fixed w-full z-50 bg-background/60 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo con efecto premium */}
        <Link to="/" className="flex items-center transition-transform hover:scale-105 active:scale-95 duration-300">
          {branding?.logoPrincipal ? (
            <img
              src={urlFor(branding.logoPrincipal).url()}
              alt="SECOESC Logo"
              style={{ width: `${branding.anchoLogoNavbar || 180}px` }}
              className="h-auto object-contain transition-all"
            />
          ) : (
            <span className="text-2xl font-black tracking-tighter text-on-surface font-headline">SECOESC</span>
          )}
        </Link>

        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all relative group
                ${location.pathname === link.path ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}
                ${loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
              `}
            >
              <span className="duration-700 transition-opacity">
                {link.name}
              </span>
              <span className={`absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300 
                ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}
              `} />
            </Link>
          ))}
          {t && (
            <Link to="/contacto" className="bg-primary hover:bg-primary-dim text-on-surface px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:shadow-premium active:scale-95 transition-all">
              {t.contacto}
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-on-surface w-10 h-10 flex items-center justify-center rounded-xl bg-surface-lowest border border-outline-variant/30" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu (Glass Overlay) */}
      {isOpen && (
        <div className="lg:hidden glass border-b border-primary/20 p-10 flex flex-col gap-8 animate-in slide-in-from-top duration-500 shadow-2xl">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              onClick={() => setIsOpen(false)} 
              className={`text-sm font-black uppercase tracking-[0.4em] ${location.pathname === link.path ? 'text-primary' : 'text-on-surface'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/contacto" 
            onClick={() => setIsOpen(false)} 
            className="bg-primary text-on-surface p-5 rounded-2xl text-center font-black uppercase tracking-[0.4em] shadow-premium"
          >
            {t.contacto}
          </Link>
        </div>
      )}
    </nav>
  );
}