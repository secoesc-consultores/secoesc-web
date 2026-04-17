import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart,
  PenTool,
  Wrench,
  CheckCircle,
  MapPin,
  Zap,
  Search,
  Shield,
  ArrowRight
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
  const [loading, setLoading]                 = useState(true);

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
      setCta(ctaData || null);
      setHero(heroData || null);
      setExcelencia(excelenciaData || null);
      setUi(uiData || null);
      setLoading(false);

      if (proyectosData.length === 0) {
        client.fetch(`*[_type == "proyecto"] | order(orden asc) [0...3]`).then(setProyectos);
      }
    }).catch(err => {
      console.error("Error cargando Home:", err);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface-lowest relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-10" />
      <div className="flex flex-col items-center gap-6 relative z-10 transition-all duration-1000">
         <div className="w-16 h-1 bg-primary animate-pulse rounded-full" />
         <span className="text-[10px] font-black tracking-[0.6em] text-primary uppercase animate-pulse">Inyectando Ingeniería...</span>
      </div>
    </div>
  );

  // Textos de UI con fallbacks (Ahora solo se ven si ui realmente no tiene esos campos)
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
        <section className="py-20 bg-surface-lowest border-b border-outline-variant/10 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent" />
          <div className="px-8 max-w-7xl mx-auto text-center">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-black tracking-[0.4em] text-on-surface-variant uppercase mb-12"
            >
              {t.labelClientes}
            </motion.p>
            <div className="flex flex-wrap justify-center items-center gap-16 opacity-40 hover:opacity-100 transition-opacity duration-1000">
              {clientes.map((cliente, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="w-32 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                >
                  {cliente.logo ? (
                    <img src={urlFor(cliente.logo).url()} alt={cliente.nombre} className="w-full h-auto object-contain" />
                  ) : (
                    <span className="font-bold text-sm">{cliente.nombre}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Stats stats={stats} />
      <FeaturedServices services={serviciosPreview} ui={ui} />

      {/* CASOS DE ÉXITO (PROYECTOS) */}
      {proyectos.length > 0 && (
        <section className="py-32 bg-surface-lowest relative overflow-hidden">
          <div className="absolute inset-0 bg-blueprint opacity-[0.2] pointer-events-none" />
          <div className="px-8 max-w-7xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <span className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">Portafolio Seleccionado</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface font-headline leading-none">{t.tituloCasos}</h2>
              <div className="w-24 h-1 bg-primary mx-auto mt-8" />
              <p className="mt-8 text-on-surface-variant text-xl max-w-2xl mx-auto font-medium">{t.descCasos}</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {proyectos.map((proyecto, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-500 shadow-premium hover:shadow-ambient"
                >
                  <div className="h-64 overflow-hidden relative">
                    {proyecto.imagen ? (
                      <img src={urlFor(proyecto.imagen).url()} alt={proyecto.titulo} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-surface-low flex items-center justify-center">
                        <span className="text-outline-variant">Sin imagen</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-10">
                    <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                      <MapPin className="w-3 h-3" /> {proyecto.ubicacion}
                    </div>
                    <h3 className="text-2xl font-black font-headline mb-6 tracking-tight group-hover:text-primary transition-colors">{proyecto.titulo}</h3>
                    <div className="space-y-6">
                      <div className="p-4 bg-surface-low rounded-lg border-l-2 border-outline-variant/30 group-hover:border-primary transition-colors">
                        <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/50 block mb-2">{t.labelDesafio}</span>
                        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2">{proyecto.desafio}</p>
                      </div>
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary block mb-2">{t.labelSolucion}</span>
                        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3 font-medium">{proyecto.solucion}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-20 text-center">
              <Link to="/portafolio" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest text-on-surface hover:text-primary transition-all group">
                Explorar portafolio completo <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* METODOLOGÍA DINÁMICA */}
      {metodologia && (
        <section className="py-32 bg-surface relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-surface-lowest/50 to-transparent" />
          <div className="px-8 max-w-7xl mx-auto text-center mb-20 relative z-10">
            <span className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">Workflow</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-on-surface font-headline">
              {metodologia.tituloSeccion || 'Metodología.'}
            </h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-8" />
          </div>
          <div className="px-8 max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {metodologia.pasos?.map((paso: any, i: number) => {
                const IconComponent = IconStepMap[paso.icono] || BarChart;
                const stepNum = (i + 1).toString().padStart(2, '0');
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-surface-lowest border border-outline-variant/20 p-10 rounded-2xl relative overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-ambient"
                  >
                    <div className="text-8xl font-black text-on-surface/[0.03] absolute -right-4 -bottom-4 select-none font-headline group-hover:text-primary/[0.05] transition-colors">{stepNum}</div>
                    <div className="w-14 h-14 bg-surface-low rounded-xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-surface transition-all duration-500">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h4 className="text-2xl font-black mb-4 tracking-tight font-headline group-hover:text-primary transition-colors">{paso.titulo}</h4>
                    <p className="text-on-surface-variant leading-relaxed relative z-10 font-medium">{paso.descripcion}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* EXCELENCIA TÉCNICA */}
      {excelencia && (
        <section className="py-32 bg-surface-lowest border-y border-outline-variant/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-blueprint opacity-[0.1]" />
          <div className="px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 overflow-hidden rounded-3xl bg-surface shadow-2xl relative group"
            >
              <div className="absolute inset-0 border-8 border-surface-lowest/20 z-10 pointer-events-none" />
              {excelencia.imagenPrincipal ? (
                <img
                  className="w-full aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] group-hover:scale-105"
                  alt={excelencia.titulo}
                  src={urlFor(excelencia.imagenPrincipal).url()}
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-surface-low border border-outline-variant/20 flex items-center justify-center">
                  <div className="w-16 h-1 bg-primary/20" />
                </div>
              )}
            </motion.div>
            <div className="lg:w-1/2">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block"
              >
                Valores de Marca
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-black tracking-tighter mb-12 font-headline leading-none"
              >
                {excelencia.titulo}
              </motion.h2>
              <div className="grid grid-cols-1 gap-10">
                {excelencia.pilares?.map((pilar: any, i: number) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-8 items-start group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-surface-low border border-outline-variant/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-all duration-500 shadow-sm">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <div>
                      <h5 className="font-black text-2xl mb-3 font-headline group-hover:text-primary transition-colors tracking-tight">{pilar.titulo}</h5>
                      <p className="text-on-surface-variant text-lg leading-relaxed font-medium">{pilar.descripcion}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA DINÁMICO */}
      {cta && (
        <section className="py-32 bg-surface relative">
          <div className="absolute inset-0 bg-blueprint opacity-[0.3]" />
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