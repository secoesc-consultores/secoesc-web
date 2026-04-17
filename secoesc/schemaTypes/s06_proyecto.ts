/**
 * S-06: PROYECTOS / PORTAFOLIO
 * Define los casos de éxito de la empresa categorizados por área.
 */
export default {
  name: 'proyecto',
  type: 'document',
  title: '🏗️ Portafolio de Proyectos',
  fields: [
    {
      name: 'titulo',
      type: 'string',
      title: 'Título del Proyecto',
      validation: (Rule: any) => Rule.required().max(100),
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
      title: 'Categoría del Proyecto',
      options: {
        list: [
          { title: '🏛️ Arquitectura y Diseño', value: 'Arquitectura' },
          { title: '⚡ Ingeniería Estructural', value: 'Ingenieria' },
          { title: '🔧 Consultoría y Gestión', value: 'Consultoria' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'imagen',
      type: 'image',
      title: 'Imagen Principal',
      description: 'Imagen de alta calidad para el portafolio.',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'galeria',
      type: 'array',
      title: 'Galería de Imágenes',
      description: 'Imágenes adicionales del proceso o resultado final.',
      of: [{ type: 'image' }],
    },
    {
      name: 'ubicacion',
      type: 'string',
      title: 'Ubicación / Ciudad',
      initialValue: 'Cd. Victoria, Tamaulipas',
    },
    {
      name: 'fecha',
      type: 'string',
      title: 'Fecha / Año de Ejecución',
      description: 'Ej: Agosto 2024 o 2023-2024',
    },
    {
      name: 'desafio',
      type: 'text',
      title: 'El Desafío Técnico',
      rows: 3,
    },
    {
      name: 'solucion',
      type: 'text',
      title: 'Nuestra Solución',
      rows: 3,
    },
    {
      name: 'destacado',
      type: 'boolean',
      title: 'Destacar en Inicio',
      description: 'Si se activa, aparecerá en la sección de proyectos de la página principal.',
      initialValue: false,
    },
    {
      name: 'orden',
      type: 'number',
      title: 'Orden de prioridad',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'categoria',
      media: 'imagen',
    },
  },
}
