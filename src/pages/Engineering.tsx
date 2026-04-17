import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Crosshair,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
  Target,
  Zap
} from 'lucide-react';
import { client, urlFor } from '../sanity';

const IconMap: any = { Crosshair, ShieldCheck, Lightbulb, Target, Zap };

export default function Engineering() {
  const [ventaja, setVentaja] = useState<any>(null);
  const [cta, setCta]         = useState<any>(null);
  const [ui, setUi]           = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "ventaja"][0]`),
      client.fetch(`*[_type == "cta" && identificador == "Ingenieria"][0]`),
      client.fetch(`*[_type == "textosUI"][0]`),
    ]).then(([ventajaData, ctaData, uiData]) => {
      setVentaja(ventajaData);
      setCta(ctaData);
      setUi(uiData);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse text-primary font-bold tracking-widest uppercase">Cargando...</div>
    </div>
  );

  const t = {
    etiquetaHero:     ui?.ingenieriaEtiquetaHero   || 'Nuestra Diferencia',
    tituloHero:       ui?.ingenieriaTituloHero      || 'Ingeniería que marca la diferencia.',
    etiquetaVentajas: ui?.ingenieriaEtiquetaVentajas|| 'Por qué elegirnos',
  };

  // Últimas 3 palabras en color primario
  const palabrasHero    = t.tituloHero.trim().split(' ');
  const heroBase        = palabrasHero.slice(0, -3).join(' ');
  const heroFinal       = palabrasHero.slice(-3).join(' ');

  return (
    <div className="bg-background min-h-screen">
      {/* HERO */}
      <section className="relative py-24 bg-surface-lowest overflow-hidden border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">
            {t.etiquetaHero}
          </span>
          <h1 className="text-5xl md:text-7xl font-black font-headline text-on-surface tracking-tighter mb-8 leading-none">
            {heroBase} <br /><span className="text-primary">{heroFinal}</span>
          </h1>
          <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl">
            {ventaja?.descripcionPrincipal || 'Metodología probada, tecnología de vanguardia y un equipo comprometido con la excelencia estructural.'}
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
      </section>

      {/* VENTAJAS COMPETITIVAS */}
      {ventaja && (
        <section className="py-24 bg-surface-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              {/* Imagen Lateral */}
              <div className="w-full lg:w-[45%]">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-primary/10 rounded-xl blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
                  {ventaja.imagenLateral && (
                    <img
                      alt={ventaja.tituloPrincipal || 'Ventajas Técnicas'}
                      className="relative w-full h-auto rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                      src={urlFor(ventaja.imagenLateral).url()}
                    />
                  )}
                </div>
              </div>

              {/* Contenido */}
              <div className="w-full lg:w-[55%]">
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 border-l-2 border-primary">
                  {t.etiquetaVentajas}
                </span>
                <h2 className="text-4xl md:text-5xl font-black font-headline text-on-surface tracking-tight mb-8 leading-[1.1]">
                  {ventaja.tituloPrincipal}
                </h2>
                <p className="text-on-surface-variant mb-12 text-lg leading-relaxed max-w-xl">
                  {ventaja.descripcionPrincipal}
                </p>
                <div className="grid grid-cols-1 gap-10">
                  {ventaja.puntosClave?.map((punto: any, i: number) => {
                    const IconComponent = IconMap[punto.icono] || Target;
                    return (
                      <div key={i} className="flex gap-6 items-start group">
                        <div className="flex-shrink-0 w-14 h-14 bg-surface border border-outline-variant flex items-center justify-center rounded-lg shadow-sm group-hover:border-primary group-hover:bg-primary/5 transition-all duration-300">
                          <IconComponent className="text-primary w-7 h-7" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold font-headline mb-2 text-on-surface group-hover:text-primary transition-colors">{punto.titulo}</h4>
                          <p className="text-sm text-on-surface-variant leading-relaxed max-w-md">{punto.texto}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA DINÁMICO */}
      {cta && (
        <section className="py-20 bg-surface-lowest border-y border-outline-variant/20">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black font-headline mb-6 tracking-tight">{cta.titulo}</h2>
            <p className="text-on-surface-variant mb-10 text-lg">{cta.descripcion}</p>
            <Link
              to={cta.enlaceBoton || '/contacto'}
              className="inline-block bg-primary text-on-surface px-10 py-4 rounded-md font-bold uppercase tracking-widest text-sm hover:shadow-ambient transition-all"
            >
              {cta.textoBoton}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}