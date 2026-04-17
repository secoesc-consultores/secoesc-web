import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';
import {
  Ruler,
  Zap,
  Shield,
  Construction,
  Droplets,
  BarChart,
  ArrowLeft
} from 'lucide-react';
import { client, urlFor } from '../sanity';

const IconMap: any = { Ruler, Zap, Shield, Construction, Droplets, BarChart };

const components = {
  types: {
    image: ({ value }: any) => (
      <img
        src={urlFor(value).url()}
        alt="Estructura técnica SECOESC"
        className="my-12 rounded-2xl shadow-ambient border border-outline-variant/30"
      />
    ),
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-4xl font-black font-headline mt-16 mb-8 tracking-tighter text-on-surface">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold font-headline mt-10 mb-6 text-primary uppercase tracking-[0.2em]">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-8 leading-relaxed text-on-surface-variant font-medium text-xl opacity-90">{children}</p>,
  },
};

export default function SpecialtyDetail() {
  const { slug }              = useParams();
  const [data, setData]       = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ui, setUi]           = useState<any>(null);

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "servicio" && slug.current == $slug][0]`, { slug }),
      client.fetch(`*[_type == "textosUI"][0]`),
    ]).then(([res, uiData]) => {
      setData(res);
      setUi(uiData);
      setLoading(false);
      window.scrollTo(0, 0);
    });
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface-lowest relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-10" />
      <div className="flex flex-col items-center gap-6 relative z-10 transition-all duration-1000">
         <div className="w-16 h-1 bg-primary animate-pulse rounded-full" />
         <span className="text-[10px] font-black tracking-[0.6em] text-primary uppercase animate-pulse">Consultando Ingeniería...</span>
      </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8 relative">
      <div className="absolute inset-0 bg-blueprint opacity-[0.2]" />
      <div className="text-center relative z-10">
        <h1 className="text-5xl font-black mb-8 tracking-tighter">Contenido no encontrado.</h1>
        <Link to="/servicios" className="text-primary font-black uppercase tracking-widest text-sm hover:underline decoration-2 underline-offset-8">Volver al índice de servicios</Link>
      </div>
    </div>
  );

  const IconComponent = IconMap[data.icono] || Ruler;

  const t = {
    botonVolver:   ui?.especialidadBotonVolver   || 'Volver a Especialidades',
    etiqueta:      ui?.especialidadEtiqueta      || 'Capacidad Técnica',
    tituloSidebar: ui?.especialidadTituloSidebar || 'Solicitar Dictamen Técnico',
    descSidebar:   ui?.especialidadDescSidebar   || 'Ofrecemos consultoría especializada y avalada por Peritos Profesionales para cada una de nuestras especialidades.',
    botonConsulta: ui?.especialidadBotonConsulta || 'Iniciar Consulta Profesional',
    msgVacio:      ui?.especialidadMsgVacio      || 'Sección en proceso de documentación técnica por el equipo de ingeniería de SECOESC.',
  };

  return (
    <main className="bg-background min-h-screen">
      {/* CABECERA DINÁMICA (PREMIUM GLASS) */}
      <section className="relative py-32 bg-surface-lowest overflow-hidden border-b border-outline-variant/10">
        <div className="absolute inset-0 bg-blueprint opacity-[0.4]" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/servicios" className="group inline-flex items-center gap-4 text-on-surface-variant text-[10px] font-black uppercase tracking-[0.4em] mb-12 hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> {t.botonVolver}
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-6 items-center mb-8"
          >
            <div className="w-16 h-16 glass border-primary/20 flex items-center justify-center rounded-2xl text-primary shadow-premium transition-transform hover:scale-110">
              <IconComponent className="w-8 h-8" />
            </div>
            <span className="text-primary font-bold tracking-[0.5em] text-[11px] uppercase border-b-2 border-primary/20 pb-1">{t.etiqueta}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black font-headline text-on-surface tracking-tighter mb-10 leading-[0.9] max-w-5xl"
          >
            {data.titulo}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-on-surface-variant text-2xl font-medium leading-relaxed max-w-4xl"
          >
            {data.descripcionCorta}
          </motion.p>
        </div>
      </section>

      {/* CONTENIDO TÉCNICO DETALLADO */}
      <section className="py-32 px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-3/5 prose-premium"
          >
            {data.contenidoDetallado ? (
              <PortableText value={data.contenidoDetallado} components={components} />
            ) : (
              <div className="p-16 border-2 border-dashed border-outline-variant bg-surface-low rounded-3xl text-center">
                <p className="text-on-surface-variant text-xl italic font-medium opacity-60">{t.msgVacio}</p>
              </div>
            )}
          </motion.div>

          {/* SIDEBAR TÉCNICO */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-32 space-y-10">
              {data.imagenCabecera && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="rounded-[2.5rem] overflow-hidden shadow-ambient bg-surface border-4 border-surface-low group"
                >
                  <img 
                    src={urlFor(data.imagenCabecera).url()} 
                    alt={data.titulo} 
                    className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                  />
                </motion.div>
              )}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-12 glass rounded-[2.5rem] relative overflow-hidden group border-primary/20 shadow-premium"
              >
                <div className="relative z-10">
                  <h4 className="text-3xl font-black font-headline mb-6 tracking-tighter leading-none">{t.tituloSidebar}</h4>
                  <p className="text-lg text-on-surface-variant mb-10 font-medium leading-relaxed italic opacity-80">"{t.descSidebar}"</p>
                  <Link
                    to="/contacto"
                    className="inline-block bg-primary hover:bg-primary-dim text-on-surface px-12 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-premium hover:shadow-ambient transition-all duration-300"
                  >
                    {t.botonConsulta}
                  </Link>
                </div>
                <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

