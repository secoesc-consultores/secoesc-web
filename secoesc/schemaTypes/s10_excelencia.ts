/**
 * S-10: INICIO — EXCELENCIA TÉCNICA
 * Sección de la página de Inicio que muestra los pilares diferenciadores con imagen.
 * Solo debe existir UN registro de este tipo.
 */
export default {
  name: 'excelencia',
  type: 'document',
  title: '🏆 Inicio — Excelencia Técnica',
  fields: [
    {
      name: 'titulo',
      type: 'string',
      title: 'Título de la Sección',
      description: 'Encabezado principal. Ej: Excelencia Técnica como Norma',
      initialValue: 'Excelencia Técnica como Norma',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'imagenPrincipal',
      type: 'image',
      title: 'Imagen de la Sección',
      description: '📐 Aparece en la columna izquierda. Proporción 4:3 recomendada. Se muestra en blanco y negro inicialmente.',
      options: { hotspot: true },
    },
    {
      name: 'pilares',
      type: 'array',
      title: 'Pilares de Excelencia',
      description: 'Lista de 3 diferenciadores clave. Cada uno tiene ícono, título y descripción.',
      validation: (Rule: any) => Rule.max(4).warning('Más de 4 pilares pueden saturar la sección.'),
      of: [
        {
          type: 'object',
          title: 'Pilar',
          fields: [
            {
              name: 'titulo',
              type: 'string',
              title: 'Título del Pilar',
              validation: (Rule: any) => Rule.required().max(60),
            },
            {
              name: 'descripcion',
              type: 'text',
              title: 'Descripción',
              rows: 2,
              validation: (Rule: any) => Rule.required().max(250),
            },
            {
              name: 'icono',
              type: 'string',
              title: 'Ícono',
              options: {
                list: [
                  { title: '🎯 Crosshair (Precisión)', value: 'Crosshair' },
                  { title: '🛡️ Shield (Seguridad)', value: 'Shield' },
                  { title: '💡 Lightbulb (Innovación)', value: 'Lightbulb' },
                ],
                layout: 'radio',
              },
            },
          ],
          preview: {
            select: { title: 'titulo', subtitle: 'descripcion' },
          },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({ title: 'Excelencia Técnica', subtitle: 'Sección del Inicio' }),
  },
}
