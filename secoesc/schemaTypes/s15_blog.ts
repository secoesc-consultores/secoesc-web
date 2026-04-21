/**
 * S-15: BLOG / PUBLICACIONES
 * Artículos, noticias y contenido editorial de SECOESC.
 */
export default {
  name: 'blogPost',
  type: 'document',
  title: '📝 Blog / Publicaciones',
  fields: [
    {
      name: 'titulo',
      type: 'string',
      title: 'Título del Artículo',
      validation: (Rule: any) => Rule.required().max(120),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL (Slug)',
      options: { source: 'titulo', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'categoria',
      type: 'string',
      title: 'Categoría',
      options: {
        list: [
          { title: '🏗️ Ingeniería Estructural', value: 'ingenieria' },
          { title: '🏛️ Arquitectura', value: 'arquitectura' },
          { title: '📐 BIM & Tecnología', value: 'bim' },
          { title: '📋 Normatividad', value: 'normatividad' },
          { title: '🔧 Consultoría', value: 'consultoria' },
          { title: '📰 Noticias', value: 'noticias' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'imagenPortada',
      type: 'image',
      title: 'Imagen de Portada',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'resumen',
      type: 'text',
      title: 'Resumen / Extracto',
      description: 'Breve descripción que aparece en la lista de artículos (máx. 200 caracteres).',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'autor',
      type: 'string',
      title: 'Autor',
      initialValue: 'Equipo SECOESC',
    },
    {
      name: 'fechaPublicacion',
      type: 'date',
      title: 'Fecha de Publicación',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'cuerpo',
      type: 'array',
      title: 'Contenido del Artículo',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Cita', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Itálica', value: 'em' },
              { title: 'Subrayado', value: 'underline' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de foto',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'etiquetas',
      type: 'array',
      title: 'Etiquetas / Tags',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'destacado',
      type: 'boolean',
      title: 'Artículo Destacado',
      description: 'Aparecerá en posición prominente en el listado del blog.',
      initialValue: false,
    },
    {
      name: 'seoTitulo',
      type: 'string',
      title: 'SEO — Título (meta title)',
      description: 'Opcional. Si se deja vacío, se usa el título principal.',
    },
    {
      name: 'seoDescripcion',
      type: 'text',
      title: 'SEO — Descripción (meta description)',
      rows: 2,
    },
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'categoria',
      media: 'imagenPortada',
    },
  },
  orderings: [
    {
      title: 'Más recientes primero',
      name: 'fechaDesc',
      by: [{ field: 'fechaPublicacion', direction: 'desc' }],
    },
  ],
}
