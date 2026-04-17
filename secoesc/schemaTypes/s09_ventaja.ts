/**
 * S-09: PÁGINA INGENIERÍA — VENTAJAS COMPETITIVAS
 * La propuesta de valor diferencial de SECOESC con puntos clave e imagen.
 * Solo debe existir UN registro de este tipo.
 */
export default {
  name: 'ventaja',
  type: 'document',
  title: '⚡ Ingeniería — Ventajas Competitivas',
  fields: [
    {
      name: 'tituloPrincipal',
      type: 'string',
      title: 'Título de la Sección',
      description: 'Encabezado principal de la página de Ingeniería.',
      validation: (Rule: any) => Rule.required().max(100),
    },
    {
      name: 'descripcionPrincipal',
      type: 'text',
      title: 'Párrafo Introductorio',
      description: 'Texto de apoyo bajo el título. Recomendado: 2-3 líneas.',
      rows: 4,
      validation: (Rule: any) => Rule.required().max(400),
    },
    {
      name: 'imagenLateral',
      type: 'image',
      title: 'Imagen de Respaldo (columna izquierda)',
      description: '📐 Se muestra en blanco y negro. Al pasar el cursor se vuelve a color. Proporción vertical (3:4 o 2:3) recomendada.',
      options: { hotspot: true },
    },
    {
      name: 'puntosClave',
      type: 'array',
      title: 'Puntos Clave (máximo 5)',
      description: 'Lista de ventajas o diferenciadores técnicos. Cada punto tiene ícono, título y descripción.',
      validation: (Rule: any) => Rule.max(5).warning('Más de 5 puntos pueden sobrecargar visualmente la página.'),
      of: [
        {
          type: 'object',
          title: 'Punto Clave',
          fields: [
            {
              name: 'titulo',
              type: 'string',
              title: 'Título del Punto',
              validation: (Rule: any) => Rule.required().max(60),
            },
            {
              name: 'texto',
              type: 'text',
              title: 'Descripción',
              rows: 2,
              validation: (Rule: any) => Rule.required().max(200),
            },
            {
              name: 'icono',
              type: 'string',
              title: 'Ícono',
              description: 'Selecciona un ícono representativo.',
              options: {
                list: [
                  { title: '🎯 Crosshair (Precisión)', value: 'Crosshair' },
                  { title: '🛡️ ShieldCheck (Seguridad)', value: 'ShieldCheck' },
                  { title: '💡 Lightbulb (Innovación)', value: 'Lightbulb' },
                  { title: '🎯 Target (Objetivo)', value: 'Target' },
                  { title: '⚡ Zap (Eficiencia)', value: 'Zap' },
                ],
                layout: 'radio',
              },
            },
          ],
          preview: {
            select: { title: 'titulo', subtitle: 'texto' },
          },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({ title: 'Ventajas Competitivas', subtitle: 'Página Ingeniería' }),
  },
}
