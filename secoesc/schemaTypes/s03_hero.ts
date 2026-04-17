/**
 * S-03: PÁGINA DE INICIO — HERO / PORTADA
 * El bloque visual principal que el visitante ve al entrar al sitio.
 * Solo debe existir UN registro de este tipo.
 */
export default {
  name: 'hero',
  type: 'document',
  title: '🏠 Inicio — Hero (Portada)',
  fields: [
    {
      name: 'etiqueta',
      type: 'string',
      title: 'Etiqueta Pequeña (sobre el título)',
      description: 'Texto breve en mayúsculas que aparece encima del título principal. Ej: Ingeniería & Consultoría',
      initialValue: 'Ingeniería & Consultoría',
      validation: (Rule: any) => Rule.required().max(60),
    },
    {
      name: 'tituloPrincipal',
      type: 'string',
      title: 'Título Principal',
      description: 'Encabezado principal. Escribe la frase completa aquí. Ej: Liderazgo en Seguridad Estructural Total.',
      initialValue: 'Liderazgo en Seguridad Estructural Total.',
      validation: (Rule: any) => Rule.required().max(100),
    },
    {
      name: 'palabraDestacada',
      type: 'string',
      title: 'Palabra a resaltar (en color azul)',
      description: 'Escribe la palabra exacta (o parte de la frase) que debe aparecer en azul. El sistema la buscará automáticamente dentro del título principal.',
      initialValue: 'Total.',
      validation: (Rule: any) => Rule.required().max(50),
    },
    {
      name: 'descripcion',
      type: 'text',
      title: 'Texto Descriptivo (párrafo)',
      description: 'Breve descripción bajo el título. Máximo 2 líneas recomendado.',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: 'imagenFondo',
      type: 'image',
      title: 'Imagen de Fondo',
      description: '📐 Se muestra en blanco y negro con baja opacidad. Recomendado: 1920x1080px, formato JPG/WebP.',
      options: { hotspot: true },
    },
    {
      name: 'textoBotonPrimario',
      type: 'string',
      title: 'Texto del Botón Principal (CTA)',
      description: 'El botón sólido de acción principal. Ej: "Agendar Consultoría"',
      initialValue: 'Agendar Consultoría',
      validation: (Rule: any) => Rule.max(60),
    },
    {
      name: 'enlaceBotonPrimario',
      type: 'string',
      title: 'Enlace del Botón Principal',
      description: 'Ruta interna. Ej: /contacto',
      initialValue: '/contacto',
      validation: (Rule: any) => Rule.max(100),
    },
    {
      name: 'textoBotonSecundario',
      type: 'string',
      title: 'Texto del Botón Secundario',
      description: 'El botón con borde. Ej: "Ver Soluciones"',
      initialValue: 'Ver Soluciones',
      validation: (Rule: any) => Rule.max(60),
    },
    {
      name: 'enlaceBotonSecundario',
      type: 'string',
      title: 'Enlace del Botón Secundario',
      description: 'Ruta interna. Ej: /servicios',
      initialValue: '/servicios',
      validation: (Rule: any) => Rule.max(100),
    },
  ],
  preview: {
    select: { title: 'tituloPrincipal', subtitle: 'palabraDestacada', media: 'imagenFondo' },
  },
}
