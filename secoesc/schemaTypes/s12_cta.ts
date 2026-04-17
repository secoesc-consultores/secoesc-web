/**
 * S-12: LLAMADOS A LA ACCIÓN (CTAs)
 * Bloques de conversión que aparecen al final de distintas páginas.
 * Cada registro corresponde a una página específica del sitio.
 */
export default {
  name: 'cta',
  type: 'document',
  title: '🚀 Llamados a la Acción (CTAs)',
  fields: [
    {
      name: 'identificador',
      type: 'string',
      title: 'Página donde aparece',
      description: 'Valor exacto que el código usa para encontrar este CTA. No modificar si ya está funcionando.',
      options: {
        list: [
          { title: '🏠 Página de Inicio', value: 'Home' },
          { title: '🔧 Página de Servicios', value: 'Servicios' },
          { title: '⚡ Página de Ingeniería', value: 'Ingenieria' },
          { title: '🏛️ Página Nosotros', value: 'Nosotros' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titulo',
      type: 'string',
      title: 'Título del CTA',
      description: 'Pregunta o frase impactante. Ej: ¿Listo para un proyecto seguro y eficiente?',
      validation: (Rule: any) => Rule.required().max(100),
    },
    {
      name: 'descripcion',
      type: 'text',
      title: 'Texto de Apoyo',
      description: 'Breve descripción que complementa el título. Recomendado: 1-2 líneas.',
      rows: 2,
      validation: (Rule: any) => Rule.required().max(250),
    },
    {
      name: 'textoBoton',
      type: 'string',
      title: 'Texto del Botón',
      description: 'Acción en imperativo. Ej: Agendar Consultoría    |    Ver Servicios',
      validation: (Rule: any) => Rule.required().max(50),
    },
    {
      name: 'enlaceBoton',
      type: 'string',
      title: 'Ruta de destino del Botón',
      description: 'Ruta interna del sitio. Ej: /contacto    |    /servicios    |    /ingenieria',
      initialValue: '/contacto',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: { title: 'identificador', subtitle: 'titulo' },
    prepare({ title, subtitle }: any) {
      const labels: Record<string, string> = {
        Home: '🏠',
        Servicios: '🔧',
        Ingenieria: '⚡',
        Nosotros: '🏛️',
      }
      return { title: `${labels[title] ?? '🚀'} CTA — ${title}`, subtitle }
    },
  },
}
