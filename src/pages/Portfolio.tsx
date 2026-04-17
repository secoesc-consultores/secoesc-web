import { useState, useEffect } from 'react';
import { MapPin, Calendar, ArrowRight, ArrowLeft, Expand, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../sanity';

export default function Portfolio() {
  const [proyectos, setProyectos]             = useState<any[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [selectedGallery, setSelectedGallery] = useState<any[] | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [activeProject, setActiveProject]       = useState<any>(null);
  const [ui, setUi]                           = useState<any>(null);

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "proyecto"] | order(orden asc, _createdAt desc)`),
      client.fetch(`*[_type == "textosUI"][0]`),
    ]).then(([data, uiData]) => {
      setProyectos(data);
      setUi(uiData);
      setLoading(false);
    }).catch(err => {
      console.error("Error cargando Portafolio:", err);
      setLoading(false);
    });
  }, []);

  // SOPORTE DE TECLADO
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape')      { setActiveImageIndex(null); setActiveProject(null); }
      if (e.key === 'ArrowRight')  nextImage(e as any);
      if (e.key === 'ArrowLeft')   prevImage(e as any);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, selectedGallery]);

  const arqProyectos = proyectos.filter(p => p.categoria === 'Arquitectura');
  const ingProyectos = proyectos.filter(p => p.categoria !== 'Arquitectura');

  const openGallery = (proy: any) => {
    const galleryItems: any[] = [];
    if (proy.imagen) galleryItems.push(proy.imagen);
    if (proy.galeria?.length > 0) proy.galeria.forEach((img: any) => { if (img) galleryItems.push(img); });
    if (galleryItems.length > 0) { 
      setSelectedGallery(galleryItems); 
      setActiveImageIndex(0); 
      setActiveProject(proy);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    if (e.stopPropagation) e.stopPropagation();
    if (selectedGallery && activeImageIndex !== null)
      setActiveImageIndex((activeImageIndex + 1) % selectedGallery.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    if (e.stopPropagation) e.stopPropagation();
    if (selectedGallery && activeImageIndex !== null)
      setActiveImageIndex((activeImageIndex - 1 + selectedGallery.length) % selectedGallery.length);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface-lowest relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-10" />
      <div className="flex flex-col items-center gap-6 relative z-10 transition-all duration-1000">
         <div className="w-16 h-1 bg-primary animate-pulse rounded-full" />
         <span className="text-[10px] font-black tracking-[0.6em] text-primary uppercase animate-pulse">Consultando Proyectos...</span>
      </div>
    </div>
  );

  // Textos con fallbacks
  const t = {
    etiquetaIng:  ui?.portafolioEtiquetaIng  || 'Core Business / Ingeniería',
    tituloIng:    ui?.portafolioTituloIng     || 'Ingeniería.',
    descIng:      ui?.portafolioDescIng       || 'Estructuras inteligentes y soluciones de ingeniería civil de alta factura técnica. Base sólida para cada proyecto.',
    etiquetaArq:  ui?.portafolioEtiquetaArq   || 'Diseño de Autor',
    tituloArq:    ui?.portafolioTituloArq     || 'Arquitectura.',
    descArq:      ui?.portafolioDescArq       || 'Visión estética y volumetría conceptual adaptada a cada entorno. El arte de construir espacios.',
    verProyecto:  ui?.portafolioLabelVerProyecto || 'Ver Proyecto',
    labelDesafio: ui?.portafolioLabelDesafio  || 'Desafío',
    labelSolucion:ui?.portafolioLabelSolucion || 'Solución Técnico-Estructural',
  };

  return (
    <div className="bg-background min-h-screen pb-32">

      {/* SECCIÓN INGENIERÍA */}
      <section className="pt-32 pb-24 px-8 bg-surface-lowest border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">{t.etiquetaIng}</span>
          <h2 className="text-6xl md:text-8xl font-black font-headline text-on-surface tracking-tighter mb-6">{t.tituloIng}</h2>
          <p className="text-on-surface-variant text-xl max-w-2xl font-medium">{t.descIng}</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 auto-rows-fr">
          {ingProyectos.map((proy, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              onClick={() => openGallery(proy)}
              className="bg-surface border border-outline-variant/30 rounded-xl p-8 hover:border-primary/50 transition-all group cursor-pointer"
            >
              <div className="h-48 rounded-lg overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all duration-500 relative bg-surface-low">
                {proy.imagen && (
                  <img src={urlFor(proy.imagen).url()} className="w-full h-full object-cover" alt={proy.titulo} />
                )}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Expand className="text-white w-8 h-8" />
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 block mb-2">{proy.categoria}</span>
              <h3 className="text-2xl font-black font-headline mb-4 tracking-tight group-hover:text-primary transition-colors">{proy.titulo}</h3>
              <div className="space-y-4 mb-8">
                <div>
                  <span className="text-[9px] font-black uppercase text-on-surface-variant/50">{t.labelDesafio}</span>
                  <p className="text-sm text-on-surface-variant line-clamp-2">{proy.desafio}</p>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-primary">{t.labelSolucion}</span>
                  <p className="text-sm text-on-surface-variant line-clamp-3">{proy.solucion}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold text-on-surface-variant/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> {proy.ubicacion}
                </div>
                {proy.fecha && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> {proy.fecha}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECCIÓN ARQUITECTURA */}
      <section className="py-24 px-8 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto mb-16 text-right">
          <span className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">{t.etiquetaArq}</span>
          <h2 className="text-6xl md:text-8xl font-black font-headline text-on-surface tracking-tighter mb-6">{t.tituloArq}</h2>
          <p className="text-on-surface-variant text-xl max-w-2xl font-medium ml-auto">{t.descArq}</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {arqProyectos.map((proy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group aspect-[16/10] bg-surface rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => openGallery(proy)}
            >
              {proy.imagen && (
                <img
                  src={urlFor(proy.imagen).url()}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={proy.titulo}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <h3 className="text-3xl font-black font-headline text-on-surface mb-2">{proy.titulo}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                  <span>{proy.ubicacion}</span>
                  {proy.fecha && (
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> {proy.fecha}
                    </span>
                  )}
                  <div className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full">
                    <Expand className="w-3 h-3" /> {t.verProyecto}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VISOR DE FOTOGRAFÍA (PREMIUM SIDEBAR LAYOUT) */}
      <AnimatePresence>
        {activeImageIndex !== null && selectedGallery && activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-surface/90 backdrop-blur-3xl flex flex-col lg:flex-row mb-0 overflow-hidden"
            onClick={() => { setActiveImageIndex(null); setActiveProject(null); }}
          >
            {/* Fondo con cuadrícula sutil */}
            <div className="absolute inset-0 bg-blueprint opacity-5 pointer-events-none" />

            {/* ① ÁREA DE IMAGEN (IZQUIERDA) */}
            <div className="relative flex-grow h-2/3 lg:h-full flex items-center justify-center p-4 md:p-12" onClick={(e) => e.stopPropagation()}>
              
              <button
                onClick={(e) => { e.stopPropagation(); setActiveImageIndex(null); setActiveProject(null); }}
                className="lg:hidden absolute top-4 right-4 w-10 h-10 glass text-on-surface flex items-center justify-center rounded-full z-[110]"
              >
                <X className="w-6 h-6" />
              </button>

              <button 
                onClick={prevImage} 
                className="absolute left-4 md:left-8 w-14 h-14 glass text-on-surface hover:bg-primary/20 flex items-center justify-center rounded-full transition-all z-[110] shadow-xl"
              >
                <ArrowLeft className="w-8 h-8" />
              </button>
              <button 
                onClick={nextImage} 
                className="absolute right-4 md:right-8 w-14 h-14 glass text-on-surface hover:bg-primary/20 flex items-center justify-center rounded-full transition-all z-[110] shadow-xl"
              >
                <ArrowRight className="w-8 h-8" />
              </button>

              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {selectedGallery[activeImageIndex] && (
                  <img
                    src={urlFor(selectedGallery[activeImageIndex]).url()}
                    className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.3)] border border-white/10"
                    alt={activeProject.titulo}
                  />
                )}
                <div className="absolute bottom-4 glass px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-on-surface">
                  {activeImageIndex + 1} / {selectedGallery.length}
                </div>
              </motion.div>
            </div>

            {/* ② PANEL DE DATOS (DERECHA) */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full lg:w-[450px] bg-surface-low border-l border-outline-variant/20 p-8 lg:p-12 overflow-y-auto relative z-[120] shadow-[-20px_0_50px_rgba(0,0,0,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => { e.stopPropagation(); setActiveImageIndex(null); setActiveProject(null); }}
                className="hidden lg:flex absolute top-8 right-8 w-12 h-12 glass text-on-surface hover:bg-primary hover:text-white items-center justify-center rounded-xl transition-all shadow-xl"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="pt-8 lg:pt-0">
                <span className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block border-l-2 border-primary pl-4">{activeProject.categoria}</span>
                <h2 className="text-4xl lg:text-5xl font-black font-headline text-on-surface tracking-tighter mb-8 leading-none">
                  {activeProject.titulo}
                </h2>

                <div className="space-y-10">
                  <div className="p-6 bg-surface-lowest rounded-2xl border border-outline-variant/10">
                    <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant/40 block mb-3">{t.labelDesafio}</span>
                    <p className="text-sm text-on-surface font-medium leading-relaxed">{activeProject.desafio}</p>
                  </div>

                  <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary block mb-3">{t.labelSolucion}</span>
                    <p className="text-base text-on-surface-variant leading-relaxed font-medium italic opacity-90">{activeProject.solucion}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-outline-variant/10">
                    <div>
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 block mb-2">Ubicación</span>
                      <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                        <MapPin className="w-4 h-4 text-primary" /> {activeProject.ubicacion}
                      </div>
                    </div>
                    {activeProject.fecha && (
                      <div>
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface-variant/50 block mb-2">Año</span>
                        <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                          <Calendar className="w-4 h-4 text-primary" /> {activeProject.fecha}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-12">
                    <button 
                      onClick={() => { setActiveImageIndex(null); setActiveProject(null); }}
                      className="w-full py-4 border border-primary text-primary rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-surface transition-all"
                    >
                      Cerrar Detalles
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

