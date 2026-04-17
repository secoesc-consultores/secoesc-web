import { Link } from 'react-router-dom';
import { ArrowRight, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturedServicesProps {
  services: any[];
  ui?: any;
}

export default function FeaturedServices({ services, ui }: FeaturedServicesProps) {
  if (services.length === 0) return null;

  const titulo         = ui?.featuredTitulo         || 'Especialidades Técnicas';
  const descripcion    = ui?.featuredDescripcion     || 'Un portafolio diseñado para cubrir cada etapa del ciclo de vida estructural.';
  const verPortafolio  = ui?.featuredVerPortafolio   || 'Ver todo el portafolio';
  const saberMas       = ui?.featuredSaberMas        || 'Saber más';

  return (
    <section className="py-24 bg-surface-low border-b border-outline-variant/10 relative">
      <div className="px-8 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface font-headline mb-4">{titulo}</h2>
            <div className="w-12 h-1 bg-primary mb-6" />
            <p className="text-on-surface-variant text-lg font-medium">{descripcion}</p>
          </div>
          <Link to="/servicios" className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] hover:gap-4 transition-all bg-primary/5 px-6 py-3 rounded-full border border-primary/20">
            {verPortafolio} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {services.map((servicio, i) => {
            const slug = servicio.slug?.current;
            const CardContent = (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full glass p-10 rounded-2xl hover:border-primary/50 transition-all duration-500 group shadow-premium hover:shadow-ambient relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                
                <div className="w-14 h-14 bg-surface-low border border-outline-variant flex items-center justify-center rounded-xl mb-8 text-primary group-hover:bg-primary group-hover:text-surface transition-all duration-500 shadow-sm">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black font-headline mb-4 tracking-tight group-hover:text-primary transition-colors">{servicio.titulo}</h3>
                <p className="text-on-surface-variant leading-relaxed mb-8 font-medium italic">"{servicio.descripcionCorta || servicio.descripcion}"</p>
                
                {slug && (
                  <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.3em] group-hover:gap-4 transition-all">
                    {saberMas} <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            );

            return slug ? (
              <Link key={i} to={`/especialidades/${slug}`} className="block h-full">{CardContent}</Link>
            ) : (
              <div key={i} className="h-full">{CardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

