import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { urlFor } from '../sanity';

interface HeroProps {
  data: {
    etiqueta?: string;
    tituloPrincipal?: string;
    palabraDestacada?: string;
    descripcion?: string;
    imagenFondo?: any;
    textoBotonPrimario?: string;
    enlaceBotonPrimario?: string;
    textoBotonSecundario?: string;
    enlaceBotonSecundario?: string;
  } | null;
}

export default function Hero({ data }: HeroProps) {
  const titulo    = data?.tituloPrincipal || 'Arquitectos de Soluciones Estratégicas.';
  const resaltada = data?.palabraDestacada || '';

  const renderTitulo = () => {
    if (!resaltada || !titulo.includes(resaltada)) return titulo;
    const partes = titulo.split(new RegExp(`(${resaltada})`, 'gi'));
    return partes.map((parte, i) =>
      parte.toLowerCase() === resaltada.toLowerCase()
        ? <span key={i} className="text-primary">{parte}</span>
        : parte
    );
  };

  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden bg-surface border-b border-outline-variant/10">
      {/* Fondo con Cuadrícula Técnica */}
      <div className="absolute inset-0 z-0 bg-blueprint opacity-[0.4]" />
      
      <div className="absolute inset-0 z-0">
        {data?.imagenFondo && (
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full object-cover grayscale"
            alt="Estructura arquitectónica SECOESC"
            src={urlFor(data.imagenFondo).url()}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
      </div>

      <div className="relative z-10 px-8 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-6 border-l-4 border-primary">
            {data?.etiqueta || 'Ingeniería & Consultoría'}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-black tracking-tighter text-on-surface max-w-5xl leading-[0.95] font-headline mb-8"
        >
          {renderTitulo()}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-on-surface-variant text-xl max-w-2xl font-medium leading-relaxed mb-12"
        >
          {data?.descripcion || 'Elevamos los estándares de seguridad estructural mediante precisión analítica, innovación tecnológica y una visión integral de cada proyecto.'}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-6"
        >
          <Link
            to={data?.enlaceBotonPrimario || '/contacto'}
            className="bg-primary hover:bg-primary-dim text-on-surface px-10 py-5 rounded-lg text-sm font-black uppercase tracking-widest shadow-premium hover:shadow-ambient transition-all duration-300"
          >
            {data?.textoBotonPrimario || 'Agendar Consultoría'}
          </Link>
          <Link
            to={data?.enlaceBotonSecundario || '/servicios'}
            className="glass-dark text-white px-10 py-5 rounded-lg text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all duration-300"
          >
            {data?.textoBotonSecundario || 'Ver Soluciones'}
          </Link>
        </motion.div>
      </div>

      {/* Elemento Decorativo: Línea de Tiempo / Regla Digital */}
      <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-primary via-primary/30 to-transparent hidden lg:block" />
      <div className="absolute top-0 right-12 w-px h-full bg-blueprint opacity-20 hidden lg:block" />
    </section>
  );
}