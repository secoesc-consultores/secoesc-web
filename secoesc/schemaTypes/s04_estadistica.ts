/**
 * S-04: ESTADÍSTICAS / INDICADORES (Inicio)
 * Números clave que aparecen en la sección de métricas de la página de Inicio.
 * Se pueden agregar, editar o eliminar múltiples tarjetas.
 */
export default {
  name: 'estadistica',
  type: 'document',
  title: '📊 Estadísticas e Indicadores',
  fields: [
    {
      name: 'valor',
      type: 'string',
      title: 'Valor / Cifra',
      description: 'El número o dato destacado. Ej: 15+    |    100%    |    BIM',
      validation: (Rule: any) => Rule.required().max(20),
    },
    {
      name: 'etiqueta',
      type: 'string',
      title: 'Etiqueta descriptiva',
      description: 'Texto que explica la cifra. Ej: Años de Experiencia    |    Proyectos Entregados',
      validation: (Rule: any) => Rule.required().max(60),
    },
    {
      name: 'orden',
      type: 'number',
      title: 'Orden de aparición',
      description: 'Número que determina la posición (1 = primero). Se muestran máximo 4 tarjetas.',
      validation: (Rule: any) => Rule.required().min(1).max(4),
    },
  ],
  orderings: [
    {
      title: 'Por orden de aparición',
      by: [{ field: 'orden', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'valor', subtitle: 'etiqueta' },
  },
}
