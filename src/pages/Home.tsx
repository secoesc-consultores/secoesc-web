import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  PenTool,
  Wrench,
  CheckCircle,
  MapPin,
  Zap,
  Search,
  Shield
} from 'lucide-react';
import { client, urlFor } from '../sanity';

// Mapa de iconos para Metodología
const IconStepMap: any = {
  BarChart, PenTool, Wrench, Shield, CheckCircle, Search
};

// Componentes Reutilizables
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import FeaturedServices from '../components/FeaturedServices';

export default function Home() {
  const [stats, setStats]                   = useState<any[]>([]);
  const [serviciosPreview, setServicios]    = useState<any[]>([]);
  const [clientes, setClientes]             = useState<any[]>([]);
  const [proyectos, setProyectos]           = useState<any[]>([]);
  const [metodologia, setMetodologia]       = useState<any>(null);
  const [cta, setCta]                       = useState<any>(null);
  const [hero, setHero]                     = useState<any>(null);
  const [excelencia, setExcelencia]         = useState<any>(null);
  const [ui, setUi]                         = useState<any>(null);

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "estadistica"] | order(orden asc) [0...4]`),
      client.fetch(`*[_type == "servicio"] | order(orden asc) [0...3]`),
      client.fetch(`*[_type == "cliente"]`),
      client.fetch(`*[_type == "proyecto" && destacado == true] | order(orden asc) [0...3]`),
      client.fetch(`*[_type == "metodologia"][0]`),
      client.fetch(`*[_type == "cta" && identificador == "Home"][0]`),
      client.fetch(`*[_type == "hero"][0]`),
      client.fetch(`*[_type == "excelencia"][0]`),
      client.fetch(`*[_type == "textosUI"][0]`),
    ]).then(([statsData, serviciosData, clientesData, proyectosData, metodologiaData, ctaData, heroData, excelenciaData, uiData]) => {
      setStats(statsData);
      setServicios(serviciosData);
      setClientes(clientesData);
      setMetodologia(metodologiaData);
      setProyectos(proyectosData.length > 0 ? proyectosData : []);
      setCta(ctaData);
      setHero(heroData);
      setExcelencia(excelenciaData);
      setUi(uiData);

      if (proyectosData.length === 0) {
        client.fetch(`*[_type == "proyecto"] | order(orden asc) [0...3]`).then(setProyectos);
      }
    });
  }, []);

  // Textos de UI con fallbacks
  const t = {
    labelClientes:    ui?.homeLabelClientes    || 'Instituciones que confían en nuestra ingeniería',
    tituloCasos:      ui?.homeTituloProyectos  || 'Casos de Éxito',
    descCasos:        ui?.homeDescProyectos    || 'Nuestra ingeniería aplicada en proyectos reales de alto impacto.',
    labelDesafio:     ui?.homeLabelDesafio     || 'Desafío',
    labelSolucion:    ui?.homeLabelSolucion    || 'Solución',
  };

  return (
    <div className="bg-background min-h-screen">
      <Hero data={hero} />

      {/* CLIENTES / ALIANZAS ESTRATÉGICAS */}
      {clientes.length > 0 && (
        <section className="py-12 bg-surface-lowest border-b border-outline-variant/10">
          <div className="px-8 max-w-7xl mx-auto text-center">
            <p className="text-[10px] font-black tracking-[0.2em] text-on-surface-variant uppercase mb-8">
              {t.labelClientes}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              {clientes.map((cliente, i) => (
                <div key={i} className="w-32 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                  {cliente.logo ? (
                    <img src={urlFor(cliente.logo).url()} alt={cliente.nombre} className="w-full h-auto object-contain" />
                  ) : (
                    <span className="font-bold text-sm">{cliente.nombre}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Stats stats={stats} />
      <FeaturedServices services={serviciosPreview} ui={ui} />

      {/* CASOS DE ÉXITO (PROYECTOS) */}
      {proyectos.length > 0 && (
        <section className="py-24 bg-surface-lowest border-b border-outline-variant/10">
          <div className="px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight text-on-surface font-headline">{t.tituloCasos}</h2>
              <div className="w-16 h-1 bg-primary mx-auto mt-6" />
              <p className="mt-6 text-on-surface-variant max-w-2xl mx-auto">{t.descCasos}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {proyectos.map((proyecto, i) => (
                <div key={i} className="bg-surface border border-outline-variant/30 rounded-xl overflow-hidden group hover:border-primary/50 transition-all">
                  <div className="h-48 overflow-hidden relative">
                    {proyecto.imagen ? (
                      <img src={urlFor(proyecto.imagen).url()} alt={proyecto.titulo} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-surface-low flex items-center justify-center">
                        <span className="text-outline-variant">Sin imagen</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold font-headline mb-2">{proyecto.titulo}</h3>
                    <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                      <MapPin className="w-3 h-3" /> {proyecto.ubicacion}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant block mb-1">{t.labelDesafio}</span>
                        <p className="text-sm text-on-surface-variant leading-relaxed">{proyecto.desafio}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant block mb-1">{t.labelSolucion}</span>
                        <p className="text-sm text-on-surface-variant leading-relaxed">{proyecto.solucion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* METODOLOGÍA DINÁMICA */}
      {metodologia && (
        <section className="py-24 bg-surface">
          <div className="px-8 max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight text-on-surface font-headline">
              {metodologia.tituloSeccion || 'Metodología de Trabajo'}
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-6" />
          </div>
          <div className="px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metodologia.pasos?.map((paso: any, i: number) => {
                const IconComponent = IconStepMap[paso.icono] || BarChart;
                const stepNum = (i + 1).toString().padStart(2, '0');
                return (
                  <div key={i} className="group bg-surface-lowest border border-outline-variant/20 p-8 rounded-xl relative overflow-hidden hover:border-primary/50 transition-all duration-300">
                    <div className="text-7xl font-black text-on-surface/5 absolute -right-4 -bottom-4 select-none font-headline">{stepNum}</div>
                    <IconComponent className="w-8 h-8 text-primary mb-6" />
                    <h4 className="text-lg font-bold mb-3 tracking-tight font-headline">{paso.titulo}</h4>
                    <p className="text-sm text-on-surface-variant leading-relaxed relative z-10">{paso.descripcion}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* EXCELENCIA TÉCNICA */}
      {excelencia && (
        <section className="py-24 bg-surface-lowest border-y border-outline-variant/10">
          <div className="px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 overflow-hidden rounded-xl bg-surface">
              {excelencia.imagenPrincipal ? (
                <img
                  className="w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  alt={excelencia.titulo}
                  src={urlFor(excelencia.imagenPrincipal).url()}
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-surface-low border border-outline-variant/20 flex items-center justify-center">
                  <div className="w-16 h-1 bg-primary/20" />
                </div>
              )}
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black tracking-tight mb-10 font-headline">{excelencia.titulo}</h2>
              <div className="space-y-8">
                {excelencia.pilares?.map((pilar: any, i: number) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-surface border border-outline-variant flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-colors">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-2 font-headline group-hover:text-primary transition-colors">{pilar.titulo}</h5>
                      <p className="text-on-surface-variant text-sm leading-relaxed">{pilar.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA DINÁMICO */}
      {cta && (
        <section className="py-20 bg-surface">
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