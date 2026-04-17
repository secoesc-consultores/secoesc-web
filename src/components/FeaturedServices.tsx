import { Link } from 'react-router-dom';
import { ArrowRight, Settings } from 'lucide-react';

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
    <section className="py-24 bg-surface-low border-b border-outline-variant/10">
      <div className="px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black tracking-tight text-on-surface font-headline mb-4">{titulo}</h2>
            <p className="text-on-surface-variant text-lg">{descripcion}</p>
          </div>
          <Link to="/servicios" className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
            {verPortafolio} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((servicio, i) => {
            const slug = servicio.slug?.current;
            const CardContent = (
              <div className="h-full bg-surface border border-outline-variant/30 p-8 rounded-xl hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 bg-surface-low border border-outline-variant flex items-center justify-center rounded-lg mb-6 text-primary group-hover:bg-primary group-hover:text-surface transition-all">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-headline mb-3">{servicio.titulo}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-6">{servicio.descripcionCorta || servicio.descripcion}</p>
                {slug && (
                  <div className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                    {saberMas} <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );

            return slug ? (
              <Link key={i} to={`/especialidades/${slug}`}>{CardContent}</Link>
            ) : (
              <div key={i}>{CardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
