import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { client, urlFor } from '../sanity';
import emailjs from '@emailjs/browser';

const getFileUrl = (ref: string) => {
  if (!ref) return '';
  const [_file, id, extension] = ref.split('-');
  return `https://cdn.sanity.io/files/mtl1bf29/production/${id}.${extension}`;
};

export default function Contact() {
  const [datos, setDatos] = useState<any>(null);
  const [ui, setUi]       = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Estados del Formulario
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', mensaje: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [isHoveredMap, setIsHoveredMap] = useState(false);

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "contacto"][0]`),
      client.fetch(`*[_type == "textosUI"][0]`),
    ]).then(([data, uiData]) => {
      setDatos(data);
      setUi(uiData);
      setLoading(false);
    }).catch(err => {
      console.error("Error cargando contacto:", err);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // CONFIGURACIÓN EMAILJS
    // NOTA: Reemplazar estos IDs con los reales del usuario en EmailJS
    const SERVICE_ID  = "service_gyhg7xm";
    const TEMPLATE_ID = "template_smbs4f8";
    const PUBLIC_KEY  = "h_9asEVwpIOje47SO";

    const templateParams = {
      from_name: `${form.nombre} ${form.apellido}`,
      from_email: form.email,
      message: form.mensaje,
      to_name: "SECOESC Team",
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        setForm({ nombre: '', apellido: '', email: '', mensaje: '' });
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch((err) => {
        console.error('Error al enviar:', err);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface-lowest relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-10" />
      <div className="flex flex-col items-center gap-6 relative z-10 transition-all duration-1000">
         <div className="w-16 h-1 bg-primary animate-pulse rounded-full" />
         <span className="text-[10px] font-black tracking-[0.6em] text-primary uppercase animate-pulse">Cargando Contacto...</span>
      </div>
    </div>
  );

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
    msgSuccess:           '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.',
    msgError:             'Hubo un problema al enviar el mensaje. Por favor intente de nuevo.',
  };

  return (
    <div className="bg-background min-h-screen pb-32">
      {/* HEADER TÉCNICO */}
      <section className="relative pt-32 pb-24 px-8 overflow-hidden border-b border-outline-variant/10 bg-surface-lowest">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
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
            className="text-6xl md:text-8xl font-black font-headline text-on-surface tracking-tighter mb-10 leading-[0.9] max-w-5xl"
          >
            {datos.titulo || 'Construyamos el futuro juntos.'}
          </motion.h1>
          <div className="w-24 h-1 bg-primary" />
        </div>
      </section>

      <section className="px-8 mt-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* DETALLES DE CONTACTO (TECH LAYOUT) */}
          <div className="space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-10 glass rounded-[2rem] border-l-4 border-primary shadow-premium group hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-xl mb-8 group-hover:bg-primary group-hover:text-surface transition-all duration-500">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black font-headline mb-4 tracking-tight">{t.tituloSede}</h3>
                <p className="text-base text-on-surface-variant leading-relaxed font-medium italic opacity-80 whitespace-pre-line">{datos.direccion}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-10 glass rounded-[2rem] border-l-4 border-primary shadow-premium group hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-xl mb-8 group-hover:bg-primary group-hover:text-surface transition-all duration-500">
                  <Mail className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black font-headline mb-4 tracking-tight">{t.tituloContactoDir}</h3>
                <p className="text-base text-on-surface-variant font-bold text-primary mb-4 break-words">{datos.email}</p>
                <div className="space-y-3">
                  {(datos.telefonos ?? (datos.telefono ? [{ numero: datos.telefono }] : [])).map((tel: any, i: number) => (
                    <p key={i} className="text-sm text-on-surface-variant font-medium flex items-center gap-2">
                       <Phone className="w-3 h-3 text-primary/40" />
                      {tel.etiqueta && <span className="text-primary/60 font-black uppercase text-[9px] tracking-widest">{tel.etiqueta}:</span>}
                      {tel.numero}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => setIsHoveredMap(true)}
              onMouseLeave={() => setIsHoveredMap(false)}
              className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-ambient group ring-8 ring-surface-lowest cursor-pointer"
            >
              <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none z-10" />
              
              {/* Imagen Principal */}
              <img
                alt="Ubicación SECOESC"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isHoveredMap && datos?.mapaImagenHover ? 'opacity-0 scale-110 blur-sm' : 'opacity-100 scale-100'}`}
                src={datos?.mapaImagen ? urlFor(datos.mapaImagen).url() : (datos?.mapaUrl || 'https://lh3.googleusercontent.com/aida-public/...')}
              />

              {/* Imagen Hover (Si existe) */}
              {datos?.mapaImagenHover && (
                <img
                  alt="Ubicación Detalle"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isHoveredMap ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  src={urlFor(datos.mapaImagenHover).url()}
                />
              )}

              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
            </motion.div>
          </div>

          {/* FORMULARIO (PREMIUM GLASS) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-12 md:p-16 rounded-[3rem] border-primary/20 shadow-ambient"
          >
            <div className="mb-12">
              <h2 className="text-4xl font-black mb-4 font-headline tracking-tighter leading-none">{t.tituloFormulario}</h2>
              <p className="text-lg text-on-surface-variant font-medium opacity-80">{t.subtituloFormulario}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{t.labelNombre}</label>
                  <input 
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className="bg-surface-lowest/50 border-0 border-b-2 border-primary/20 focus:border-primary px-0 py-4 text-base transition-all outline-none font-medium text-on-surface placeholder:text-on-surface-variant/30" 
                    placeholder="Juan" 
                    type="text" 
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{t.labelApellido}</label>
                  <input 
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                    required
                    className="bg-surface-lowest/50 border-0 border-b-2 border-primary/20 focus:border-primary px-0 py-4 text-base transition-all outline-none font-medium text-on-surface placeholder:text-on-surface-variant/30" 
                    placeholder="Pérez" 
                    type="text" 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{t.labelEmail}</label>
                <input 
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="bg-surface-lowest/50 border-0 border-b-2 border-primary/20 focus:border-primary px-0 py-4 text-base transition-all outline-none font-medium text-on-surface placeholder:text-on-surface-variant/30" 
                  placeholder="juan.perez@empresa.com" 
                  type="email" 
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{t.labelMensaje}</label>
                <textarea 
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                  className="bg-surface-lowest/50 border-0 border-b-2 border-primary/20 focus:border-primary px-0 py-4 text-base transition-all resize-none outline-none font-medium text-on-surface placeholder:text-on-surface-variant/30" 
                  placeholder={t.placeholderMensaje} 
                  rows={4} 
                />
              </div>
              
              <button
                disabled={status === 'sending'}
                className="w-full bg-primary text-on-surface py-5 px-10 rounded-2xl text-xs font-black uppercase tracking-[0.3em] shadow-premium hover:shadow-ambient hover:bg-primary-dim transition-all duration-300 flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                {status === 'sending' ? (
                  <>Cargando... <Loader2 className="w-5 h-5 animate-spin" /></>
                ) : (
                  <>{t.botonEnviar} <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" /></>
                )}
              </button>

              {/* MENSAGES DE ESTADO */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-green-500 font-bold p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
                    <CheckCircle2 className="w-6 h-6" /> {t.msgSuccess}
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-3 text-red-500 font-bold p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                    <AlertCircle className="w-6 h-6" /> {t.msgError}
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
}