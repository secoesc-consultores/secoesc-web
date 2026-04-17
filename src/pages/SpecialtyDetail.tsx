import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
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
        className="my-10 rounded-lg shadow-xl"
      />
    ),
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-3xl font-black font-headline mt-12 mb-6 tracking-tight text-on-surface">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold font-headline mt-8 mb-4 text-primary uppercase tracking-widest">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-6 leading-relaxed text-on-surface-variant font-medium text-lg">{children}</p>,
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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse text-primary font-bold tracking-widest uppercase">Consultando Ingeniería...</div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="text-center">
        <h1 className="text-4xl font-black mb-6">Contenido no encontrado.</h1>
        <Link to="/servicios" className="text-primary font-bold">Volver al índice de servicios</Link>
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
      {/* CABECERA DINÁMICA DE LA ESPECIALIDAD */}
      <section className="relative py-24 bg-surface-lowest overflow-hidden border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <Link to="/servicios" className="group flex items-center gap-2 text-on-surface-variant text-xs font-black uppercase tracking-widest mb-10 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t.botonVolver}
          </Link>
          <div className="flex gap-4 items-center mb-6">
            <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-lg text-primary">
              <IconComponent className="w-6 h-6" />
            </div>
            <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase">{t.etiqueta}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-headline text-on-surface tracking-tighter mb-8 leading-none">
            {data.titulo}
          </h1>
          <p className="text-on-surface-variant text-xl leading-relaxed max-w-3xl">{data.descripcionCorta}</p>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
      </section>

      {/* CONTENIDO TÉCNICO DETALLADO */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-3/5 prose-invert">
            {data.contenidoDetallado ? (
              <PortableText value={data.contenidoDetallado} components={components} />
            ) : (
              <div className="p-12 border border-dashed border-outline-variant bg-surface-low rounded-xl text-center">
                <p className="text-on-surface-variant italic">{t.msgVacio}</p>
              </div>
            )}
          </div>
          <div className="w-full lg:w-2/5">
            <div className="sticky top-32 space-y-8">
              {data.imagenCabecera && (
                <div className="rounded-xl overflow-hidden shadow-2xl bg-surface border border-outline-variant/30">
                  <img src={urlFor(data.imagenCabecera).url()} alt={data.titulo} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              )}
              <div className="p-10 bg-surface border border-primary/20 rounded-xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-2xl font-black font-headline mb-4 tracking-tight">{t.tituloSidebar}</h4>
                  <p className="text-sm text-on-surface-variant mb-8 font-medium">{t.descSidebar}</p>
                  <Link
                    to="/contacto"
                    className="inline-block bg-primary text-on-surface px-8 py-4 rounded-md text-xs font-black uppercase tracking-widest hover:shadow-ambient transition-all"
                  >
                    {t.botonConsulta}
                  </Link>
                </div>
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
