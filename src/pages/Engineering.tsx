import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen flex items-center justify-center bg-surface-lowest relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-10" />
      <div className="flex flex-col items-center gap-6 relative z-10 transition-all duration-1000">
         <div className="w-16 h-1 bg-primary animate-pulse rounded-full" />
         <span className="text-[10px] font-black tracking-[0.6em] text-primary uppercase animate-pulse">Cargando Ingeniería...</span>
      </div>
    </div>
  );

  const t = {
    etiquetaHero:     ui?.ingenieriaEtiquetaHero   || 'Nuestra Diferencia',
    tituloHero:       ui?.ingenieriaTituloHero      || 'Ingeniería que marca la diferencia.',
    etiquetaVentajas: ui?.ingenieriaEtiquetaVentajas|| 'Por qué elegirnos',
  };

  const palabrasHero    = t.tituloHero.trim().split(' ');
  const heroBase        = palabrasHero.slice(0, -3).join(' ');
  const heroFinal       = palabrasHero.slice(-3).join(' ');

  return (
    <div className="bg-background min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-32 bg-surface-lowest overflow-hidden border-b border-outline-variant/10">
        <div className="absolute inset-0 bg-blueprint opacity-[0.4]" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block border-l-4 border-primary pl-4"
          >
            {t.etiquetaHero}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black font-headline text-on-surface tracking-tighter mb-10 leading-[0.9] max-w-5xl"
          >
            {heroBase} <br /><span className="text-primary">{heroFinal}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-on-surface-variant text-2xl leading-relaxed max-w-3xl font-medium"
          >
            {ventaja?.descripcionPrincipal || 'Metodología probada, tecnología de vanguardia y un equipo comprometido con la excelencia estructural.'}
          </motion.p>
        </div>
        <div className="absolute hidden lg:block top-0 right-12 w-px h-full bg-blueprint opacity-20" />
      </section>

      {/* VENTAJAS COMPETITIVAS (TECH LAYOUT) */}
      {ventaja && (
        <section className="py-32 bg-surface relative overflow-hidden">
          <div className="px-8 max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row gap-24 items-center">
              {/* Imagen con Frame Técnico */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2"
              >
                <div className="relative group">
                  <div className="absolute -inset-6 bg-primary/5 rounded-[2rem] -z-10 group-hover:bg-primary/10 transition-all duration-700" />
                  {ventaja.imagenLateral && (
                    <img
                      alt={ventaja.tituloPrincipal || 'Ventajas Técnicas'}
                      className="relative w-full h-auto rounded-3xl shadow-ambient grayscale group-hover:grayscale-0 transition-all duration-1000"
                      src={urlFor(ventaja.imagenLateral).url()}
                    />
                  )}
                  <div className="absolute top-8 left-8 p-4 glass rounded-xl border-primary/20 hidden md:block">
                    <Target className="text-primary w-8 h-8" />
                  </div>
                </div>
              </motion.div>

              {/* Contenido con Staggered Reveal */}
              <div className="w-full lg:w-1/2">
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-10 border-l-2 border-primary"
                >
                  {t.etiquetaVentajas}
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl font-black font-headline text-on-surface tracking-tight mb-10 leading-none"
                >
                  {ventaja.tituloPrincipal}
                </motion.h2>
                
                <div className="grid grid-cols-1 gap-12 mt-12">
                  {ventaja.puntosClave?.map((punto: any, i: number) => {
                    const IconComponent = IconMap[punto.icono] || Target;
                    return (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-8 items-start group"
                      >
                        <div className="flex-shrink-0 w-16 h-16 glass border border-outline-variant/30 flex items-center justify-center rounded-2xl shadow-sm group-hover:bg-primary group-hover:text-surface transition-all duration-500">
                          <IconComponent className="text-primary group-hover:text-surface w-8 h-8" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black font-headline mb-3 text-on-surface group-hover:text-primary transition-colors tracking-tight">{punto.titulo}</h4>
                          <p className="text-lg text-on-surface-variant leading-relaxed max-w-md font-medium">{punto.texto}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION (PREMIUM GLASS) */}
      {cta && (
        <section className="py-32 bg-surface-lowest relative">
          <div className="absolute inset-0 bg-blueprint opacity-[0.2]" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto px-8 relative z-10"
          >
            <div className="glass p-16 md:p-24 rounded-[3rem] text-center border-primary/20 shadow-ambient">
              <h2 className="text-4xl md:text-6xl font-black font-headline mb-8 tracking-tighter leading-none">{cta.titulo}</h2>
              <p className="text-on-surface-variant mb-12 text-xl max-w-2xl mx-auto font-medium">{cta.descripcion}</p>
              <Link
                to={cta.enlaceBoton || '/contacto'}
                className="inline-block bg-primary hover:bg-primary-dim text-on-surface px-12 py-5 rounded-xl font-black uppercase tracking-[0.2em] text-sm shadow-premium hover:shadow-ambient transition-all duration-300"
              >
                {cta.textoBoton}
              </Link>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}