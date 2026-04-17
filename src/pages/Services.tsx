import { useState, useEffect } from 'react';
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

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "servicio"] | order(orden asc)`),
      client.fetch(`*[_type == "cta" && identificador == "Servicios"][0]`),
      client.fetch(`*[_type == "textosUI"][0]`),
    ]).then(([serviceData, ctaData, uiData]) => {
      setServicios(serviceData);
      setCta(ctaData);
      setUi(uiData);
    });
  }, []);

  const getLayoutClass = (layout: string) => {
    switch (layout) {
      case 'Grande':  return 'md:col-span-2 md:row-span-2';
      case 'Estrecho':return 'md:col-span-1 md:row-span-2';
      default:        return 'md:col-span-1 md:row-span-1';
    }
  };

  // Textos con fallbacks
  const t = {
    etiqueta:          ui?.serviciosEtiqueta           || 'Portafolio de Soluciones',
    titulo:            ui?.serviciosTitulo              || 'Ingeniería que Sostiene el Futuro.',
    descripcion:       ui?.serviciosDescripcion         || 'Desde el cálculo estructural más complejo hasta la consultoría técnica preventiva, transformamos desafíos técnicos en estructuras sólidas.',
    labelVerEsp:       ui?.serviciosLabelVerEspecialidad|| 'Ver Especialidad',
  };

  // Partir el último bloque de 3 palabras en color primario
  const palabras    = t.titulo.trim().split(' ');
  const tituloBase  = palabras.slice(0, -3).join(' ');
  const tituloFinal = palabras.slice(-3).join(' ');

  return (
    <div className="bg-background min-h-screen">
      {/* Header de la sección */}
      <section className="pt-24 pb-12 px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">
            {t.etiqueta}
          </span>
          <h1 className="text-5xl md:text-6xl font-black font-headline text-on-surface tracking-tighter mb-6">
            {tituloBase} <br /><span className="text-primary">{tituloFinal}</span>
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">{t.descripcion}</p>
        </div>
      </section>

      {/* Bento Grid Dinámico */}
      <section className="px-8 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {servicios.map((servicio) => {
            const IconComponent = IconMap[servicio.icono] || Settings;
            const slug = servicio.slug?.current;

            const CardContent = (
              <div
                className={`h-full group relative bg-surface border border-outline-variant/30 rounded-xl p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-ambient-lg hover:border-primary/50 ${getLayoutClass(servicio.layout)}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-all duration-700 group-hover:scale-[3] group-hover:bg-primary/10" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-surface-low border border-outline-variant flex items-center justify-center rounded-lg mb-6 group-hover:bg-primary group-hover:text-surface transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-headline text-on-surface mb-3 tracking-tight">{servicio.titulo}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">{servicio.descripcionCorta || servicio.descripcion}</p>
                </div>
                <div className="relative z-10 flex items-center justify-between mt-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 group-hover:text-primary transition-colors">
                    {t.labelVerEsp}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center group-hover:bg-primary group-hover:text-surface transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );

            return slug ? (
              <Link key={servicio._id} to={`/especialidades/${slug}`} className={getLayoutClass(servicio.layout)}>
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

      {/* CTA Dinámico al final */}
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