import { useState, useEffect } from 'react';
import { Target, Eye, History, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../sanity';

export default function Nosotros() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(`*[_type == "trayectoria"][0]`).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface-lowest relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-10" />
      <div className="flex flex-col items-center gap-6 relative z-10 transition-all duration-1000">
         <div className="w-16 h-1 bg-primary animate-pulse rounded-full" />
         <span className="text-[10px] font-black tracking-[0.6em] text-primary uppercase animate-pulse">Cargando Trayectoria...</span>
      </div>
    </div>
  );

  // ── CONTENIDO ─────────────────────────────────────────────────────────────────
  const etiquetaHero    = data.etiquetaHero    || 'Nuestra Historia';
  const tituloPrincipal = data.tituloPrincipal || 'Más de una década construyendo confianza.';
  const puntosDestacados: string[] = data.puntosDestacados || [
    'Expertos en seguridad estructural y consultoría técnica.',
    'Más de una década de trayectoria comprobada en Tamaulipas.',
    'Proyectos ejecutados con los más altos estándares de calidad.',
    'Equipo certificado comprometido con la seguridad pública.',
  ];

  const palabras     = tituloPrincipal.trim().split(' ');
  const tituloInicio = palabras.slice(0, -2).join(' ');
  const tituloFinal  = palabras.slice(-2).join(' ');

  const tituloMision = data.tituloMision || 'Nuestra Misión';
  const misionTexto  = data.misionTexto  || 'Brindar servicios de ingeniería y consultoría con los más altos estándares de calidad y seguridad.';
  const tituloVision = data.tituloVision || 'Nuestra Visión';
  const visionTexto  = data.visionTexto  || 'Ser el referente líder en seguridad estructural y consultoría técnica a nivel nacional.';

  const tituloExcelencia = data.tituloExcelencia || 'Compromiso con la Excelencia';
  const parrafoHistoria: string[] = data.parrafoHistoria || [];
  const imgAlt = data.imagenTrayectoria?.alt || 'Trayectoria SECOESC';

  return (
    <div className="bg-background min-h-screen">

      {/* ① HERO TRADITION */}
      <section className="relative py-32 bg-surface-lowest overflow-hidden border-b border-outline-variant/10">
        <div className="absolute inset-0 bg-blueprint opacity-[0.4]" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block border-l-4 border-primary pl-4"
          >
            {etiquetaHero}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-black font-headline text-on-surface tracking-tighter mb-10 leading-[0.9] max-w-5xl"
          >
            {tituloInicio} <br />
            <span className="text-primary">{tituloFinal}</span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <motion.ul 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {puntosDestacados.map((punto: string, i: number) => (
                <li key={i} className="flex items-start gap-4 text-on-surface-variant text-xl font-medium leading-relaxed">
                  <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <span>{punto}</span>
                </li>
              ))}
            </motion.ul>
            <div className="hidden md:block h-px bg-gradient-to-r from-primary/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* ② PROPÓSITO (GLASS CARDS) */}
      <section className="py-32 px-8 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 auto-rows-fr">
          {/* MISIÓN */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 glass rounded-[2.5rem] relative group hover:border-primary/50 transition-all duration-500 shadow-premium"
          >
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-2xl mb-10 group-hover:bg-primary group-hover:text-surface transition-all duration-500">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black font-headline mb-6 tracking-tight">{tituloMision}</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed font-medium italic opacity-80">"{misionTexto}"</p>
          </motion.div>

          {/* VISIÓN */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-12 glass rounded-[2.5rem] relative group hover:border-primary/50 transition-all duration-500 shadow-premium"
          >
            <div className="w-16 h-16 bg-primary/10 flex items-center justify-center rounded-2xl mb-10 group-hover:bg-primary group-hover:text-surface transition-all duration-500">
              <Eye className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black font-headline mb-6 tracking-tight">{tituloVision}</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed font-medium italic opacity-80">"{visionTexto}"</p>
          </motion.div>
        </div>
      </section>

      {/* ③ TRAYECTO TÉCNICO */}
      <section className="py-32 bg-surface relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            {/* Imagen con Profundidad */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <div className="relative group">
                <div className="absolute -inset-4 border border-primary/20 rounded-3xl -z-10 group-hover:scale-105 transition-transform duration-700" />
                {data.imagenTrayectoria ? (
                  <img
                    src={urlFor(data.imagenTrayectoria).url()}
                    alt={imgAlt}
                    className="rounded-2xl shadow-ambient grayscale group-hover:grayscale-0 transition-all duration-1000 w-full"
                  />
                ) : (
                  <div className="w-full aspect-video bg-surface-lowest border border-outline-variant/30 rounded-2xl flex items-center justify-center">
                    <History className="w-16 h-16 text-primary/20" />
                  </div>
                )}
                <div className="absolute -bottom-8 -right-8 bg-primary p-10 rounded-2xl shadow-2xl hidden md:block">
                  <Award className="text-surface w-14 h-14" />
                </div>
              </div>
            </motion.div>

            {/* Texto de Excelencia */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <h3 className="text-5xl font-black font-headline mb-10 tracking-tighter leading-none">{tituloExcelencia}</h3>
              <div className="space-y-8 text-on-surface-variant text-lg leading-relaxed font-medium">
                {parrafoHistoria.map((parrafo: string, i: number) => (
                  <p key={i} className="pl-6 border-l-2 border-primary/20 group-hover:border-primary transition-colors">{parrafo}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}