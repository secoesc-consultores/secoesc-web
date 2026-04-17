/**
 * S-13: METODOLOGÍA DE TRABAJO
 * Pasos secuenciales que explican el proceso de SECOESC.
 * Solo debe existir UN registro de este tipo.
 */
export default {
  name: 'metodologia',
  type: 'document',
  title: '⚙️ Inicio — Metodología de Trabajo',
  fields: [
    {
      name: 'tituloSeccion',
      type: 'string',
      title: 'Título de la Sección',
      initialValue: 'Metodología de Trabajo',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pasos',
      type: 'array',
      title: 'Pasos del Proceso',
      description: 'Define los 4 pasos principales del flujo de trabajo.',
      validation: (Rule: any) => Rule.required().min(1).max(4),
      of: [
        {
          type: 'object',
          name: 'paso',
          title: 'Paso',
          fields: [
            {
              name: 'titulo',
              type: 'string',
              title: 'Título del Paso',
            },
            {
              name: 'descripcion',
              type: 'text',
              title: 'Descripción Corta',
              rows: 2,
            },
            {
              name: 'icono',
              type: 'string',
              title: 'Ícono (Lucide)',
              options: {
                list: [
                  { title: '📊 BarChart (Diagnóstico)', value: 'BarChart' },
                  { title: '✒️ PenTool (Diseño)', value: 'PenTool' },
                  { title: '🔧 Wrench (Ejecución)', value: 'Wrench' },
                  { title: '🛡️ Shield (Seguridad)', value: 'Shield' },
                  { title: '✅ CheckCircle (Validación)', value: 'CheckCircle' },
                  { title: '🔍 Search (Análisis)', value: 'Search' },
                ],
                layout: 'radio',
              },
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({ title: 'Metodología de Trabajo', subtitle: 'Pasos del proceso SECOESC' }),
  },
}
