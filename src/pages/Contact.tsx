import { useState, useEffect } from 'react';
import { client } from '../sanity';

const getFileUrl = (ref: string) => {
  if (!ref) return '';
  const [_file, id, extension] = ref.split('-');
  return `https://cdn.sanity.io/files/mtl1bf29/production/${id}.${extension}`;
};

export default function Contact() {
  const [datos, setDatos] = useState<any>(null);
  const [ui, setUi]       = useState<any>(null);

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "contacto"][0]`),
      client.fetch(`*[_type == "textosUI"][0]`),
    ]).then(([data, uiData]) => {
      setDatos(data);
      setUi(uiData);
    });
  }, []);

  if (!datos) return (
    <div className="py-24 text-center animate-pulse text-primary font-bold tracking-widest uppercase">
      Cargando información de contacto...
    </div>
  );

  // Textos con fallbacks
  const t = {
    etiqueta:             ui?.contactoEtiqueta              || 'Conecta con nosotros',
    tituloSede:           ui?.contactoTituloSedePrincipal   || 'Sede Principal',
    tituloContactoDir:    ui?.contactoTituloContactoDirecto || 'Contacto Directo',
    tituloFormulario:     ui?.contactoTituloFormulario      || 'Enviar un mensaje',
    subtituloFormulario:  ui?.contactoSubtituloFormulario   || 'Nuestros consultores responderán en menos de 24 horas hábiles.',
    labelNombre:          ui?.contactoLabelNombre           || 'Nombre',
    labelApellido:        ui?.contactoLabelApellido         || 'Apellido',
    labelEmail:           ui?.contactoLabelEmail            || 'Correo Electrónico',
    labelMensaje:         ui?.contactoLabelMensaje          || 'Mensaje',
    placeholderMensaje:   ui?.contactoPlaceholderMensaje    || '¿Cómo podemos ayudarle?',
    botonEnviar:          ui?.contactoBotonEnviar           || 'Enviar Solicitud',
  };

  return (
    <div className="min-h-screen pb-16">
      <section className="px-8 py-12 md:py-20 max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-4 mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase border-l-4 border-primary pl-4">
            {t.etiqueta}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-on-surface leading-none font-headline">
            {datos.titulo || 'Construyamos el futuro juntos.'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Detalles de Contacto */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-8 bg-surface-container-low rounded-xl border-l-2 border-primary group hover:border-tertiary transition-colors duration-300">
                <span className="material-symbols-outlined text-primary mb-4 group-hover:text-tertiary transition-colors">location_on</span>
                <h3 className="text-lg font-bold mb-2 font-headline">{t.tituloSede}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">{datos.direccion}</p>
              </div>
              <div className="p-8 bg-surface-container-low rounded-xl border-l-2 border-primary group hover:border-secondary transition-colors duration-300">
                <span className="material-symbols-outlined text-primary mb-4 group-hover:text-secondary transition-colors">contact_support</span>
                <h3 className="text-lg font-bold mb-2 font-headline">{t.tituloContactoDir}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{datos.email}</p>
                {(datos.telefonos ?? (datos.telefono ? [{ numero: datos.telefono }] : [])).map((tel: any, i: number) => (
                  <p key={i} className="text-sm text-on-surface-variant leading-relaxed">
                    {tel.etiqueta && <span className="font-bold text-primary mr-1">{tel.etiqueta}:</span>}
                    {tel.numero}
                  </p>
                ))}
              </div>
            </div>

            {/* Mapa / Video */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm group border border-slate-200">
              {datos.videoMapa ? (
                <video
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover transition-all duration-700"
                  src={getFileUrl(datos.videoMapa.asset._ref)}
                />
              ) : (
                <img
                  alt="Ubicación SECOESC"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  src={datos.mapaUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJiZzqvii2461kfzHsyiq_8mJyQJG3C8_LgB7L7Iw1sv7N_s2PRu3id7n5ox3c5FfKytozoY2S_xdEYUOKAGpv7FvM6d2-AFT-jnO8ePbXWL34F7bohYa_APkuJrG1sQ2XEy1aHEYbWGRys9o3Yxy68UjTNtv0U5ixTDXGhTDceDrKVkL6YLpbXI-5_3qoVApkLnoVqJGPaTeaut7vVZEJFdQQGwa-vrQgoCkbVRLMXDbr3Np8q2RJRBbloGQx0rSV8s-IiyHgnA'}
                />
              )}
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-surface-container-low p-8 md:p-12 rounded-xl border border-slate-200/60">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 font-headline">{t.tituloFormulario}</h2>
              <p className="text-sm text-on-surface-variant">{t.subtituloFormulario}</p>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">{t.labelNombre}</label>
                  <input className="bg-transparent border-0 border-b-2 border-outline focus:ring-0 focus:border-primary px-0 py-2 text-sm transition-all outline-none" placeholder="Juan" type="text" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">{t.labelApellido}</label>
                  <input className="bg-transparent border-0 border-b-2 border-outline focus:ring-0 focus:border-primary px-0 py-2 text-sm transition-all outline-none" placeholder="Pérez" type="text" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">{t.labelEmail}</label>
                <input className="bg-transparent border-0 border-b-2 border-outline focus:ring-0 focus:border-primary px-0 py-2 text-sm transition-all outline-none" placeholder="juan.perez@empresa.com" type="email" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">{t.labelMensaje}</label>
                <textarea className="bg-transparent border-0 border-b-2 border-outline focus:ring-0 focus:border-primary px-0 py-2 text-sm transition-all resize-none outline-none" placeholder={t.placeholderMensaje} rows={4} />
              </div>
              <button
                className="w-full bg-primary text-on-primary py-4 px-8 rounded-lg text-sm font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-primary-dim transition-all flex items-center justify-center gap-2"
                type="button"
              >
                {t.botonEnviar}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}