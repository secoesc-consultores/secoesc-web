/**
 * S-08: PÁGINA NOSOTROS — TRAYECTORIA, MISIÓN Y VISIÓN
 * Todos los textos e imágenes de la página "Nosotros" son editables desde aquí.
 * Solo debe existir UN registro de este tipo.
 */
export default {
  name: 'trayectoria',
  type: 'document',
  title: '🏛️ Nosotros — Página Completa',
  groups: [
    { name: 'hero',      title: '① Hero — Encabezado' },
    { name: 'misionVision', title: '② Misión y Visión' },
    { name: 'historia',  title: '③ Historia & Excelencia' },
  ],
  fields: [
    // ─── GRUPO 1: HERO ────────────────────────────────────────────────────────
    {
      name: 'etiquetaHero',
      type: 'string',
      title: 'Etiqueta pequeña sobre el título',
      description: 'Texto en mayúsculas que aparece encima del título grande. Ej: "Nuestra Historia"',
      group: 'hero',
      initialValue: 'Nuestra Historia',
      validation: (Rule: any) => Rule.required().max(60),
    },
    {
      name: 'tituloPrincipal',
      type: 'string',
      title: 'Título Principal (Hero)',
      description: 'El titular grande de la página. Las últimas 2 palabras se resaltarán en color primario.',
      group: 'hero',
      initialValue: 'Más de una década construyendo confianza.',
      validation: (Rule: any) => Rule.required().max(120),
    },
    {
      name: 'puntosDestacados',
      type: 'array',
      title: 'Puntos Destacados (lista con bullets)',
      description: 'Cada ítem se muestra como un bullet con ícono ✅ bajo el título. Máximo 8 puntos.',
      group: 'hero',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(1).max(8),
    },

    // ─── GRUPO 2: MISIÓN Y VISIÓN ─────────────────────────────────────────────
    {
      name: 'tituloMision',
      type: 'string',
      title: 'Título de la tarjeta Misión',
      group: 'misionVision',
      initialValue: 'Nuestra Misión',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'misionTexto',
      type: 'text',
      title: 'Texto de la Misión',
      description: '¿Para qué existe SECOESC? ¿Cuál es su propósito fundamental?',
      group: 'misionVision',
      rows: 4,
      validation: (Rule: any) => Rule.required().max(500),
    },
    {
      name: 'tituloVision',
      type: 'string',
      title: 'Título de la tarjeta Visión',
      group: 'misionVision',
      initialValue: 'Nuestra Visión',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'visionTexto',
      type: 'text',
      title: 'Texto de la Visión',
      description: '¿Qué aspira a ser SECOESC en el futuro?',
      group: 'misionVision',
      rows: 4,
      validation: (Rule: any) => Rule.required().max(500),
    },

    // ─── GRUPO 3: HISTORIA & EXCELENCIA ──────────────────────────────────────
    {
      name: 'tituloExcelencia',
      type: 'string',
      title: 'Título de la sección Historia',
      description: 'Encabezado de la sección inferior junto a la imagen.',
      group: 'historia',
      initialValue: 'Compromiso con la Excelencia',
      validation: (Rule: any) => Rule.required().max(100),
    },
    {
      name: 'parrafoHistoria',
      type: 'array',
      title: 'Párrafos de Historia',
      description: 'Agrega cada párrafo por separado. Se muestran en la sección junto a la imagen de trayectoria.',
      group: 'historia',
      of: [{ type: 'text' }],
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: 'imagenTrayectoria',
      type: 'image',
      title: 'Imagen de la Sección Historia',
      description: '📐 Aparece junto a los párrafos de historia. Proporción 16:9 o 4:3 recomendada.',
      group: 'historia',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo (accesibilidad)',
          description: 'Describe brevemente la imagen para lectores de pantalla.',
          initialValue: 'Trayectoria de SECOESC',
          validation: (Rule: any) => Rule.max(120),
        },
      ],
    },
  ],
  preview: {
    select: { titulo: 'tituloPrincipal' },
    prepare: ({ titulo }: any) => ({
      title: 'Página Nosotros',
      subtitle: titulo || 'Historia · Misión · Visión',
    }),
  },
}
