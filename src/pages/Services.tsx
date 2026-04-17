import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Settings,
  Shield,
  Layers,
  Zap,
  Maximize,
  Activity,
  Ruler,
  Construction,
  Droplets,
  BarChart
} from 'lucide-react';
import { client } from '../sanity';
import { Link } from 'react-router-dom';

const IconMap: any = {
  Ruler, Zap, Shield, Construction, Droplets, BarChart, Settings
};

export default function Services() {
  const [servicios, setServicios] = useState<any[]>([]);
  const [cta, setCta]             = useState<any>(null);
  const [ui, setUi]               = useState<any>(null);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "servicio"] | order(orden asc)`),
      client.fetch(`*[_type == "cta" && identificador == "Servicios"][0]`),
      client.fetch(`*[_type == "textosUI"][0]`),
    ]).then(([serviceData, ctaData, uiData]) => {
      setServicios(serviceData);
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
         <span className="text-[10px] font-black tracking-[0.6em] text-primary uppercase animate-pulse">Consultando Portafolio...</span>
      </div>
    </div>
  );

  const getLayoutClass = (layout: string) => {
    switch (layout) {
      case 'Grande':  return 'md:col-span-2 md:row-span-2';
      case 'Estrecho':return 'md:col-span-1 md:row-span-2';
      default:        return 'md:col-span-1 md:row-span-1';
    }
  };

  const t = {
    etiqueta:          ui?.serviciosEtiqueta           || 'Portafolio de Soluciones',
    titulo:            ui?.serviciosTitulo              || 'Ingeniería que Sostiene el Futuro.',
    descripcion:       ui?.serviciosDescripcion         || 'Desde el cálculo estructural más complejo hasta la consultoría técnica preventiva, transformamos desafíos técnicos en estructuras sólidas.',
    labelVerEsp:       ui?.serviciosLabelVerEspecialidad|| 'Ver Especialidad',
  };

  const palabras    = t.titulo.trim().split(' ');
  const tituloBase  = palabras.slice(0, -3).join(' ');
  const tituloFinal = palabras.slice(-3).join(' ');

  return (
    <div className="bg-background min-h-screen">
      {/* HEADER SECTION (PREMIUM TECH) */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden border-b border-outline-variant/10 bg-surface-lowest">
        <div className="absolute inset-0 bg-blueprint opacity-[0.4]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block border-l-4 border-primary pl-4"
          >
            {t.etiqueta}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black font-headline text-on-surface tracking-tighter mb-8 leading-[0.9] max-w-5xl"
          >
            {tituloBase} <br /><span className="text-primary">{tituloFinal}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-on-surface-variant text-2xl font-medium leading-relaxed max-w-2xl"
          >
            {t.descripcion}
          </motion.p>
        </div>
      </section>

      {/* BENTO GRID (GLASS CARDS) */}
      <section className="px-8 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 auto-rows-fr">
          {servicios.map((servicio, i) => {
            const IconComponent = IconMap[servicio.icono] || Settings;
            const slug = servicio.slug?.current;

            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`h-full group relative glass p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden transition-all duration-700 hover:shadow-ambient hover:border-primary/50 ${getLayoutClass(servicio.layout)}`}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 transition-all duration-1000 group-hover:scale-[3] group-hover:bg-primary/10" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-surface-low border border-outline-variant flex items-center justify-center rounded-xl mb-8 group-hover:bg-primary group-hover:text-surface transition-all duration-500 shadow-sm">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-black font-headline text-on-surface mb-4 tracking-tight group-hover:text-primary transition-colors">{servicio.titulo}</h3>
                  <p className="text-on-surface-variant text-base leading-relaxed max-w-xs font-medium italic opacity-80">"{servicio.descripcionCorta || servicio.descripcion}"</p>
                </div>

                <div className="relative z-10 flex items-center justify-between mt-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 group-hover:text-primary transition-colors">
                    {t.labelVerEsp}
                  </span>
                  <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-primary group-hover:text-surface transition-all duration-500 group-hover:translate-x-2">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            );

            return slug ? (
              <Link key={servicio._id} to={`/especialidades/${slug}`} className={`${getLayoutClass(servicio.layout)} block`}>
                {CardContent}
              </Link>
            ) : (
              <div key={servicio._id} className={getLayoutClass(servicio.layout)}>
                {CardContent}
              </div>
            );
          })}
        </div>
      </section>

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