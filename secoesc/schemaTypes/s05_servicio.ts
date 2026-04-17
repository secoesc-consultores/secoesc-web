/**
 * S-05: ESPECIALIDADES Y SERVICIOS
 * Define las capacidades técnicas de la empresa.
 * Cada registro genera su propia página dinámica en el frontend.
 */
export default {
  name: 'servicio',
  type: 'document',
  title: '🏆 Especialidades y Servicios',
  fields: [
    {
      name: 'titulo',
      type: 'string',
      title: 'Título de la Especialidad',
      description: 'Ej: Diseño y Cálculo Estructural',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'URL Única (Slug)',
      description: 'Haz clic en "Generate" para crear la URL automáticamente basada en el título.',
      options: {
        source: 'titulo',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'orden',
      type: 'number',
      title: 'Orden de Aparición',
      description: 'Número para ordenar las especialidades (1, 2, 3...).',
      initialValue: 1,
    },
    {
      name: 'descripcionCorta',
      type: 'text',
      title: 'Resumen para tarjetas',
      description: 'Aparece en la página de inicio y en la lista de servicios. Máx 200 caracteres.',
      rows: 2,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'icono',
      type: 'string',
      title: 'Ícono Representativo',
      options: {
        list: [
          { title: '📐 Regla (Diseño)', value: 'Ruler' },
          { title: '⚡ Rayo (Ingeniería)', value: 'Zap' },
          { title: '🛡️ Escudo (Seguridad)', value: 'Shield' },
          { title: '🏗️ Grúa (Obra Civil)', value: 'Construction' },
          { title: '💧 Gota (Hidráulica)', value: 'Droplets' },
          { title: '📊 Gráfico (Estudios)', value: 'BarChart' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'imagenCabecera',
      type: 'image',
      title: 'Imagen de Cabecera (Página Individual)',
      description: 'Imagen principal que aparecerá al abrir el detalle de la especialidad.',
      options: { hotspot: true },
    },
    {
      name: 'contenidoDetallado',
      type: 'array',
      title: 'Contenido Detallado de la Especialidad',
      description: 'Aquí puedes escribir el proceso, metodologías y detalles técnicos específicos.',
      of: [
        { 
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
        },
        { type: 'image' },
      ],
    },
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'descripcionCorta' },
  },
}
