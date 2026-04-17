import { useState, useEffect } from 'react';
import { Target, Eye, History, Award, CheckCircle2 } from 'lucide-react';
import { client, urlFor } from '../sanity';

export default function Nosotros() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client.fetch(`*[_type == "trayectoria"][0]`).then((res) => {
      setData(res);
    });
  }, []);

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-pulse text-primary font-bold tracking-widest uppercase">Cargando...</div>
    </div>
  );

  // ── HERO ─────────────────────────────────────────────────────────────────────
  const etiquetaHero    = data.etiquetaHero    || 'Nuestra Historia';
  const tituloPrincipal = data.tituloPrincipal || 'Más de una década construyendo confianza.';
  const puntosDestacados: string[] = data.puntosDestacados || [
    'Expertos en seguridad estructural y consultoría técnica.',
    'Más de una década de trayectoria comprobada en Tamaulipas.',
    'Proyectos ejecutados con los más altos estándares de calidad.',
    'Equipo certificado comprometido con la seguridad pública.',
  ];

  // Partido de título: últimas 2 palabras en color primario
  const palabras     = tituloPrincipal.trim().split(' ');
  const tituloInicio = palabras.slice(0, -2).join(' ');
  const tituloFinal  = palabras.slice(-2).join(' ');

  // ── MISIÓN & VISIÓN ───────────────────────────────────────────────────────────
  const tituloMision = data.tituloMision || 'Nuestra Misión';
  const misionTexto  = data.misionTexto  || 'Brindar servicios de ingeniería y consultoría con los más altos estándares de calidad y seguridad.';
  const tituloVision = data.tituloVision || 'Nuestra Visión';
  const visionTexto  = data.visionTexto  || 'Ser el referente líder en seguridad estructural y consultoría técnica a nivel nacional.';

  // ── HISTORIA & EXCELENCIA ─────────────────────────────────────────────────────
  const tituloExcelencia = data.tituloExcelencia || 'Compromiso con la Excelencia';
  const parrafoHistoria: string[] = data.parrafoHistoria || [
    'Desde nuestra fundación en Ciudad Victoria, Tamaulipas, SECOESC ha mantenido un enfoque inquebrantable en la integridad estructural.',
    'Cada proyecto es una oportunidad para demostrar que la ingeniería de precisión no es solo un servicio, sino una responsabilidad ética con la seguridad pública y el patrimonio de nuestros clientes.',
  ];
  const imgAlt = data.imagenTrayectoria?.alt || 'Trayectoria SECOESC';

  return (
    <div className="bg-background">

      {/* ① HERO */}
      <section className="relative py-24 bg-surface-lowest overflow-hidden border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">
            {etiquetaHero}
          </span>
          <h1 className="text-5xl md:text-7xl font-black font-headline text-on-surface tracking-tighter mb-8 leading-none">
            {tituloInicio} <br />
            <span className="text-primary">{tituloFinal}</span>
          </h1>
          <ul className="max-w-3xl space-y-3 mt-6">
            {puntosDestacados.map((punto: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-on-surface-variant text-lg leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>{punto}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
      </section>

      {/* ② MISIÓN Y VISIÓN */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* MISIÓN */}
          <div className="p-10 bg-surface border border-outline-variant/30 rounded-xl relative group hover:border-primary/50 transition-all duration-500">
            <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-lg mb-8 group-hover:bg-primary group-hover:text-surface transition-all">
              <Target className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-black font-headline mb-6 tracking-tight">{tituloMision}</h2>
            <p className="text-on-surface-variant leading-relaxed italic">{misionTexto}</p>
          </div>

          {/* VISIÓN */}
          <div className="p-10 bg-surface border border-outline-variant/30 rounded-xl relative group hover:border-primary/50 transition-all duration-500">
            <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-lg mb-8 group-hover:bg-primary group-hover:text-surface transition-all">
              <Eye className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-black font-headline mb-6 tracking-tight">{tituloVision}</h2>
            <p className="text-on-surface-variant leading-relaxed italic">{visionTexto}</p>
          </div>
        </div>
      </section>

      {/* ③ HISTORIA & EXCELENCIA */}
      <section className="py-24 bg-surface-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Imagen */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                {data.imagenTrayectoria ? (
                  <img
                    src={urlFor(data.imagenTrayectoria).url()}
                    alt={imgAlt}
                    className="rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full aspect-video bg-outline-variant/20 rounded-lg flex items-center justify-center">
                    <History className="w-12 h-12 text-outline" />
                  </div>
                )}
                <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-lg hidden md:block">
                  <Award className="text-surface w-12 h-12" />
                </div>
              </div>
            </div>

            {/* Texto */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-4xl font-black font-headline mb-8 tracking-tight">{tituloExcelencia}</h3>
              <div className="space-y-6 text-on-surface-variant leading-relaxed">
                {parrafoHistoria.map((parrafo: string, i: number) => (
                  <p key={i}>{parrafo}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}