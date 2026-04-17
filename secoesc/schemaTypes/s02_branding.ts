/**
 * S-02: IDENTIDAD VISUAL (BRANDING)
 * Logos para el Navbar, Footer y Favicon.
 * Solo debe existir UN registro de este tipo.
 */
export default {
  name: 'branding',
  type: 'document',
  title: '🎨 Identidad Visual (Logos)',
  fields: [
    {
      name: 'logoPrincipal',
      type: 'image',
      title: 'Logo del Navbar (Cabecera)',
      description: '📐 Recomendado: PNG con fondo transparente, mínimo 400px de ancho, orientación horizontal.',
      options: { hotspot: true },
    },
    {
      name: 'anchoLogoNavbar',
      type: 'number',
      title: 'Ancho del Logo en el Navbar (px)',
      description: 'Rango recomendado: 150 – 220 px. Valores muy altos pueden desplazar el menú.',
      initialValue: 180,
      validation: (Rule: any) =>
        Rule.min(50).max(400).warning('Un ancho mayor a 220px puede solaparse con el menú en pantallas medianas.'),
    },
    {
      name: 'logoFooter',
      type: 'image',
      title: 'Logo del Footer (Pie de página)',
      description: '📐 Puede ser el mismo logo o una versión monocromática/blanca. PNG con fondo transparente.',
      options: { hotspot: true },
    },
    {
      name: 'anchoLogoFooter',
      type: 'number',
      title: 'Ancho del Logo en el Footer (px)',
      description: 'Rango recomendado: 120 – 180 px.',
      initialValue: 150,
      validation: (Rule: any) => Rule.min(50).max(400),
    },
    {
      name: 'favicon',
      type: 'image',
      title: 'Favicon (Ícono de pestaña)',
      description: '📐 Debe ser una imagen cuadrada (1:1). Formatos sugeridos: PNG o SVG. Mínimo 64x64 px.',
    },
  ],
  preview: {
    prepare: () => ({ title: 'Identidad Visual', subtitle: 'Logos · Navbar · Footer · Favicon' }),
  },
}
