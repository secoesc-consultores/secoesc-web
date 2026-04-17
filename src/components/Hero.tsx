import { Link } from 'react-router-dom';
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
    <section className="relative h-[600px] flex items-center overflow-hidden bg-surface border-b border-outline-variant/10">
      <div className="absolute inset-0 z-0 bg-surface">
        {data?.imagenFondo && (
          <img
            className="w-full h-full object-cover opacity-20 grayscale"
            alt="Estructura arquitectónica SECOESC"
            src={urlFor(data.imagenFondo).url()}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent" />
      </div>
      <div className="relative z-10 px-8 max-w-7xl mx-auto w-full">
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4 border-l-2 border-primary">
          {data?.etiqueta || 'Ingeniería & Consultoría'}
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface max-w-4xl leading-[1.1] font-headline mb-6">
          {renderTitulo()}
        </h1>
        <p className="text-on-surface-variant text-lg max-w-xl font-medium leading-relaxed mb-10">
          {data?.descripcion || 'Elevamos los estándares de seguridad estructural mediante precisión analítica, innovación tecnológica y una visión integral de cada proyecto.'}
        </p>
        <div className="flex gap-4">
          <Link
            to={data?.enlaceBotonPrimario || '/contacto'}
            className="bg-primary text-on-surface px-8 py-4 rounded-md text-xs font-black uppercase tracking-widest hover:shadow-ambient transition-all"
          >
            {data?.textoBotonPrimario || 'Agendar Consultoría'}
          </Link>
          <Link
            to={data?.enlaceBotonSecundario || '/servicios'}
            className="bg-surface-low border border-outline-variant text-on-surface px-8 py-4 rounded-md text-xs font-black uppercase tracking-widest hover:border-primary transition-all"
          >
            {data?.textoBotonSecundario || 'Ver Soluciones'}
          </Link>
        </div>
      </div>
    </section>
  );
}