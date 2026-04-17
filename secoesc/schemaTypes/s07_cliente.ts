/**
 * S-07: CLIENTES Y ALIANZAS ESTRATÉGICAS
 * Logos de las instituciones o empresas clientes, aparecen en el banner del Inicio.
 * Se pueden agregar y eliminar libremente.
 */
export default {
  name: 'cliente',
  type: 'document',
  title: '🤝 Clientes y Alianzas',
  fields: [
    {
      name: 'nombre',
      type: 'string',
      title: 'Nombre de la Institución o Empresa',
      description: 'Se usa como texto alternativo (alt) de la imagen del logo.',
      validation: (Rule: any) => Rule.required().max(100),
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Logo del Cliente',
      description: '📐 Se muestra en blanco y negro. Al pasar el cursor se vuelve a color. PNG con fondo transparente, mínimo 300px de ancho.',
      options: { hotspot: true },
    },
    {
      name: 'sitioWeb',
      type: 'url',
      title: 'Sitio Web (opcional)',
      description: 'Si el cliente tiene sitio web, se puede agregar para hacer el logo clickeable.',
    },
  ],
  preview: {
    select: { title: 'nombre', media: 'logo' },
  },
}
