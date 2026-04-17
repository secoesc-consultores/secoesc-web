import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { client, urlFor } from '../sanity';

// ── SVG logos inline — sin dependencias externas ──────────────────────────────
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
  </svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const IconTwitterX = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconYouTube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconTikTok = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);
const IconLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </svg>
);

// Mapa de plataformas → SVG inline
const SocialIconMap: Record<string, React.ComponentType> = {
  Facebook:  IconFacebook,
  facebook:  IconFacebook,
  Instagram: IconInstagram,
  instagram: IconInstagram,
  LinkedIn:  IconLinkedIn,
  Linkedin:  IconLinkedIn,
  linkedin:  IconLinkedIn,
  Twitter:   IconTwitterX,
  twitter:   IconTwitterX,
  X:         IconTwitterX,
  x:         IconTwitterX,
  Youtube:   IconYouTube,
  YouTube:   IconYouTube,
  youtube:   IconYouTube,
  WhatsApp:  IconWhatsApp,
  Whatsapp:  IconWhatsApp,
  whatsapp:  IconWhatsApp,
  TikTok:    IconTikTok,
  Tiktok:    IconTikTok,
  tiktok:    IconTikTok,
};

export default function Footer() {
  const [branding, setBranding]         = useState<any>(null);
  const [config, setConfig]             = useState<any>(null);
  const [contactInfo, setContactInfo]   = useState<any>(null);
  const [especialidades, setEspecialidades] = useState<any[]>([]);
  const [ui, setUi]                     = useState<any>(null);

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "branding"][0]`),
      client.fetch(`*[_type == "configuracion"][0]`),
      client.fetch(`*[_type == "contacto"][0]`),
      client.fetch(`*[_type == "servicio"] | order(orden asc) [0...4]`),
      client.fetch(`*[_type == "textosUI"][0]`),
    ]).then(([brandingData, configData, contactData, specialData, uiData]) => {
      setBranding(brandingData);
      setConfig(configData);
      setContactInfo(contactData);
      setEspecialidades(specialData);
      setUi(uiData);
    });
  }, []);

  const t = {
    tituloEstructura:    ui?.footerTituloEstructura    || 'Estructura',
    navInicio:           ui?.footerNavInicio           || 'Inicio',
    navNosotros:         ui?.footerNavNosotros         || 'Nuestro Equipo',
    navServicios:        ui?.footerNavServicios        || 'Portafolio Técnico',
    navPortafolio:       ui?.footerNavPortafolio       || 'Proyectos',
    navIngenieria:       ui?.footerNavIngenieria       || 'Ingeniería Avanzada',
    navContacto:         ui?.footerNavContacto         || 'Contacto',
    tituloEspecialidades:ui?.footerTituloEspecialidades|| 'Especialidades',
    tituloOficina:       ui?.footerTituloOficina       || 'Oficina Central',
  };

  return (
    <footer className="bg-surface-lowest border-t border-outline-variant/20 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

        {/* Columna 1: Logo y Redes */}
        <div className="md:col-span-1 space-y-6">
          <Link to="/" className="inline-block">
            {branding?.logoFooter ? (
              <img
                src={urlFor(branding.logoFooter).url()}
                alt="SECOESC Footer Logo"
                style={{ width: `${branding.anchoLogoFooter || 150}px` }}
                className="h-auto object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            ) : (
              <span className="text-2xl font-black tracking-tighter text-on-surface">SECOESC</span>
            )}
          </Link>

          {config?.eslogan && (
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">{config.eslogan}</p>
          )}

          {config?.redesSociales?.length > 0 && (
            <div className="flex gap-4">
              {config.redesSociales.map((red: any, i: number) => {
                const IconComponent = SocialIconMap[red.plataforma] ?? IconLink;
                return (
                  <a
                    key={i}
                    href={red.url}
                    target="_blank"
                    rel="noreferrer"
                    title={red.plataforma}
                    className="w-9 h-9 rounded-full bg-surface-low border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-surface transition-all duration-300"
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Columna 2: Navegación */}
        <div>
          <h4 className="font-headline font-bold text-on-surface uppercase tracking-[0.2em] text-[10px] mb-8">{t.tituloEstructura}</h4>
          <ul className="space-y-4">
            <li><Link to="/"           className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.navInicio}</Link></li>
            <li><Link to="/nosotros"   className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.navNosotros}</Link></li>
            <li><Link to="/servicios"  className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.navServicios}</Link></li>
            <li><Link to="/portafolio" className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.navPortafolio}</Link></li>
            <li><Link to="/ingenieria" className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.navIngenieria}</Link></li>
            <li><Link to="/contacto"   className="text-sm text-on-surface-variant hover:text-primary transition-colors">{t.navContacto}</Link></li>
          </ul>
        </div>

        {/* Columna 3: Especialidades Dinámicas */}
        <div>
          <h4 className="font-headline font-bold text-on-surface uppercase tracking-[0.2em] text-[10px] mb-8">{t.tituloEspecialidades}</h4>
          <ul className="space-y-4">
            {especialidades.map((esp, i) => (
              <li key={i}>
                <Link to={`/especialidades/${esp.slug?.current}`} className="text-sm text-on-surface-variant hover:text-primary transition-colors">
                  {esp.titulo}
                </Link>
              </li>
            ))}
            {especialidades.length === 0 && (
              <>
                <li className="text-sm text-on-surface-variant">Cálculo Estructural</li>
                <li className="text-sm text-on-surface-variant">Seguridad de Obra</li>
              </>
            )}
          </ul>
        </div>

        {/* Columna 4: Contacto */}
        <div>
          <h4 className="font-headline font-bold text-on-surface uppercase tracking-[0.2em] text-[10px] mb-8">{t.tituloOficina}</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-on-surface-variant">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{contactInfo?.direccion || 'Ciudad Victoria, Tamaulipas, México'}</span>
            </li>
{(contactInfo?.telefonos ?? (contactInfo?.telefono ? [{ numero: contactInfo.telefono }] : [{ numero: '+52 (834) 313-31-28' }])).map((tel: any, i: number) => (
              <li key={i} className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>
                  {tel.etiqueta && <span className="font-bold text-primary mr-1">{tel.etiqueta}:</span>}
                  {tel.numero}
                </span>
              </li>
            ))}
            <li className="flex items-center gap-3 text-sm text-on-surface-variant">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span className="truncate">{contactInfo?.email || 'gruporuizmx@gmail.com'}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Barra de Copyright */}
      <div className="max-w-7xl mx-auto px-8 pt-10 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface-variant/50">
          {config?.copyright || `© ${new Date().getFullYear()} SECOESC | Consultoría Especializada`}
        </p>
      </div>
    </footer>
  );
}