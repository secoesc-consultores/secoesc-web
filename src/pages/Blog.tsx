import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../sanity';
import { Calendar, User, Tag, ArrowRight, BookOpen, Search } from 'lucide-react';

const CATEGORIAS = [
  { value: '', label: 'Todos' },
  { value: 'ingenieria', label: 'Ingeniería Estructural' },
  { value: 'arquitectura', label: 'Arquitectura' },
  { value: 'bim', label: 'BIM & Tecnología' },
  { value: 'normatividad', label: 'Normatividad' },
  { value: 'consultoria', label: 'Consultoría' },
  { value: 'noticias', label: 'Noticias' },
];

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState('');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    setLoading(true);
    const filtro = categoriaActiva ? `&& categoria == "${categoriaActiva}"` : '';
    client
      .fetch(
        `*[_type == "blogPost" ${filtro}] | order(destacado desc, fechaPublicacion desc) {
          titulo, slug, categoria, imagenPortada, resumen, autor, fechaPublicacion, etiquetas, destacado
        }`
      )
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoriaActiva]);

  const filtered = posts.filter((p) =>
    busqueda
      ? p.titulo?.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.resumen?.toLowerCase().includes(busqueda.toLowerCase())
      : true
  );

  const destacado = filtered.find((p) => p.destacado);
  const resto = filtered.filter((p) => !p.destacado || filtered.indexOf(p) !== 0);

  return (
    <div className="min-h-screen bg-background">
      {/* ── HERO HEADER ─────────────────────────────── */}
      <section className="relative bg-surface-lowest border-b border-outline-variant/10 py-28 overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-[0.15]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Publicaciones</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface leading-none mb-6 max-w-3xl">
            Blog <span className="text-primary">SECOESC</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed mb-10">
            Conocimiento técnico, novedades del sector y perspectivas de nuestro equipo de especialistas en ingeniería y arquitectura.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-2xl glass border border-outline-variant/30 bg-transparent text-on-surface placeholder:text-on-surface-variant/40 text-sm font-medium focus:outline-none focus:border-primary/60 transition-all"
            />
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ─────────────────────────── */}
      <section className="sticky top-20 z-30 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoriaActiva(cat.value)}
                className={`flex-none px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] transition-all whitespace-nowrap ${
                  categoriaActiva === cat.value
                    ? 'bg-primary text-on-surface shadow-premium'
                    : 'glass text-on-surface-variant hover:text-primary border border-outline-variant/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* ── LOADING ─────────────────────────────────── */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-3xl glass border border-outline-variant/10 overflow-hidden animate-pulse">
                <div className="h-52 bg-surface-lowest" />
                <div className="p-8 space-y-4">
                  <div className="h-3 bg-surface-lowest rounded-full w-1/3" />
                  <div className="h-5 bg-surface-lowest rounded-full w-3/4" />
                  <div className="h-4 bg-surface-lowest rounded-full w-full" />
                  <div className="h-4 bg-surface-lowest rounded-full w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-32">
            <BookOpen className="w-16 h-16 text-primary/20 mx-auto mb-6" />
            <p className="text-on-surface-variant text-lg font-medium">No se encontraron artículos.</p>
            <p className="text-on-surface-variant/50 text-sm mt-2">Intenta con otra categoría o término de búsqueda.</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <>
            {/* ── FEATURED POST ───────────────────────── */}
            {destacado && (
              <Link
                to={`/blog/${destacado.slug?.current}`}
                className="group relative flex flex-col lg:flex-row rounded-3xl overflow-hidden glass border border-outline-variant/10 hover:border-primary/30 shadow-xl hover:shadow-premium transition-all duration-700 mb-16"
              >
                {destacado.imagenPortada && (
                  <div className="lg:w-1/2 h-72 lg:h-auto overflow-hidden relative">
                    <img
                      src={urlFor(destacado.imagenPortada).width(900).height(600).fit('crop').url()}
                      alt={destacado.titulo}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-lowest/50 lg:block hidden" />
                  </div>
                )}
                <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">
                      ⭐ Destacado
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-on-surface-variant/50">
                      {CATEGORIAS.find((c) => c.value === destacado.categoria)?.label}
                    </span>
                  </div>
                  <h2 className="font-headline text-3xl lg:text-4xl font-black text-on-surface leading-tight mb-5 group-hover:text-primary transition-colors duration-300">
                    {destacado.titulo}
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed mb-8 text-base">{destacado.resumen}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5 text-xs text-on-surface-variant/60">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> {destacado.autor || 'SECOESC'}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {formatDate(destacado.fechaPublicacion)}
                      </span>
                    </div>
                    <span className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                      Leer más <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* ── POST GRID ───────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resto.map((post, i) => (
                <Link
                  key={post.slug?.current || i}
                  to={`/blog/${post.slug?.current}`}
                  className="group glass border border-outline-variant/10 hover:border-primary/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-500 flex flex-col"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {post.imagenPortada ? (
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={urlFor(post.imagenPortada).width(600).height(400).fit('crop').url()}
                        alt={post.titulo}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-background/80 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.3em]">
                          {CATEGORIAS.find((c) => c.value === post.categoria)?.label || post.categoria}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-52 bg-surface-lowest flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-primary/20" />
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-headline text-xl font-black text-on-surface leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                      {post.titulo}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed flex-1 mb-6 line-clamp-3">
                      {post.resumen}
                    </p>

                    {post.etiquetas?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {post.etiquetas.slice(0, 3).map((tag: string, ti: number) => (
                          <span
                            key={ti}
                            className="flex items-center gap-1 bg-primary/5 text-primary/70 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider"
                          >
                            <Tag className="w-2.5 h-2.5" /> {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-5 border-t border-outline-variant/10">
                      <div className="flex items-center gap-4 text-[10px] text-on-surface-variant/50 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" /> {formatDate(post.fechaPublicacion)}
                        </span>
                      </div>
                      <span className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-wider">
                        Leer <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
