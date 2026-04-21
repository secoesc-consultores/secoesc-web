import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../sanity';
import { PortableText } from '@portabletext/react';
import { Calendar, User, Tag, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

const CATEGORIAS: Record<string, string> = {
  ingenieria: 'Ingeniería Estructural',
  arquitectura: 'Arquitectura',
  bim: 'BIM & Tecnología',
  normatividad: 'Normatividad',
  consultoria: 'Consultoría',
  noticias: 'Noticias',
};

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
}

// ── Portable Text custom renderers ──────────────────────────────────────────
const ptComponents = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-10">
        <img
          src={urlFor(value).width(900).url()}
          alt={value.caption || ''}
          className="w-full rounded-2xl shadow-xl"
        />
        {value.caption && (
          <figcaption className="text-center text-xs text-on-surface-variant/50 mt-3 italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-headline text-3xl font-black text-on-surface mt-14 mb-6 leading-tight border-l-4 border-primary pl-5">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-headline text-2xl font-black text-on-surface mt-10 mb-4 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-headline text-xl font-bold text-on-surface mt-8 mb-3">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-on-surface-variant leading-[1.9] text-lg mb-6">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 pl-6 border-l-4 border-primary/40 italic text-on-surface-variant text-xl leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-black text-on-surface">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic text-primary/80">{children}</em>,
  },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [relacionados, setRelacionados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    client
      .fetch(
        `*[_type == "blogPost" && slug.current == $slug][0] {
          titulo, slug, categoria, imagenPortada, resumen, autor, fechaPublicacion, etiquetas, cuerpo, seoTitulo, seoDescripcion
        }`,
        { slug }
      )
      .then((data) => {
        setPost(data);
        setLoading(false);
        // Fetch related posts
        if (data?.categoria) {
          client
            .fetch(
              `*[_type == "blogPost" && slug.current != $slug && categoria == $cat] | order(fechaPublicacion desc) [0...3] {
                titulo, slug, imagenPortada, resumen, fechaPublicacion, categoria
              }`,
              { slug, cat: data.categoria }
            )
            .then(setRelacionados);
        }
      })
      .catch(() => setLoading(false));
  }, [slug]);

  // ── Update page title ────────────────────────────────────────────────────
  useEffect(() => {
    if (post) {
      document.title = `${post.seoTitulo || post.titulo} | Blog SECOESC`;
    }
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-14 h-14 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <p className="text-on-surface-variant text-sm font-medium uppercase tracking-widest">Cargando artículo…</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-8 text-center">
        <BookOpen className="w-20 h-20 text-primary/20" />
        <h1 className="font-headline text-4xl font-black text-on-surface">Artículo no encontrado</h1>
        <p className="text-on-surface-variant max-w-md">
          El artículo que buscas no existe o fue removido.
        </p>
        <Link
          to="/blog"
          className="flex items-center gap-2 bg-primary text-on-surface px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-premium transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── COVER IMAGE ─────────────────────────────── */}
      {post.imagenPortada && (
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={urlFor(post.imagenPortada).width(1600).height(900).fit('crop').url()}
            alt={post.titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      )}

      {/* ── ARTICLE HEADER ──────────────────────────── */}
      <div className="max-w-4xl mx-auto px-8">
        <div className={`${post.imagenPortada ? '-mt-32 relative z-10' : 'pt-16'}`}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.35em]">
              {CATEGORIAS[post.categoria] || post.categoria}
            </span>
          </div>

          <h1 className="font-headline text-4xl md:text-6xl font-black text-on-surface leading-tight mb-8">
            {post.titulo}
          </h1>

          <div className="flex flex-wrap items-center gap-8 pb-10 border-b border-outline-variant/10 mb-14 text-sm text-on-surface-variant/60">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary/60" />
              <span className="font-semibold">{post.autor || 'Equipo SECOESC'}</span>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary/60" />
              {formatDate(post.fechaPublicacion)}
            </span>
            {post.etiquetas?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.etiquetas.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 bg-primary/5 text-primary/70 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                  >
                    <Tag className="w-2.5 h-2.5" /> {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── PORTABLE TEXT BODY ─────────────────── */}
          <article className="prose-blog">
            <PortableText value={post.cuerpo} components={ptComponents} />
          </article>

          {/* ── SHARE / BACK ───────────────────────── */}
          <div className="flex items-center justify-between mt-20 pt-10 border-t border-outline-variant/10">
            <Link
              to="/blog"
              className="flex items-center gap-2 glass border border-outline-variant/20 text-on-surface-variant hover:text-primary px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:border-primary/40"
            >
              <ArrowLeft className="w-4 h-4" /> Todos los artículos
            </Link>
          </div>
        </div>
      </div>

      {/* ── RELATED POSTS ───────────────────────────── */}
      {relacionados.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 py-24">
          <h2 className="font-headline text-3xl font-black text-on-surface mb-12">
            Artículos <span className="text-primary">relacionados</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relacionados.map((rel, i) => (
              <Link
                key={i}
                to={`/blog/${rel.slug?.current}`}
                className="group glass border border-outline-variant/10 hover:border-primary/30 rounded-3xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-500 flex flex-col"
              >
                {rel.imagenPortada && (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={urlFor(rel.imagenPortada).width(500).height(300).fit('crop').url()}
                      alt={rel.titulo}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-headline text-lg font-black text-on-surface mb-3 leading-tight group-hover:text-primary transition-colors">
                    {rel.titulo}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed flex-1 line-clamp-2 mb-4">
                    {rel.resumen}
                  </p>
                  <span className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-wider">
                    Leer <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
