/**
 * S-11: PÁGINA DE CONTACTO
 * Información de contacto: dirección, teléfono, email y mapa visual.
 * Solo debe existir UN registro de este tipo.
 */
export default {
  name: 'contacto',
  type: 'document',
  title: '📬 Contacto — Información de la Oficina',
  fields: [
    {
      name: 'titulo',
      type: 'string',
      title: 'Título de la Página de Contacto',
      description: 'Encabezado principal. Ej: Construyamos el futuro juntos.',
      initialValue: 'Construyamos el futuro juntos.',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'email',
      type: 'string',
      title: 'Correo Electrónico de Contacto',
      description: 'Se muestra en la sección "Contacto Directo".',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'telefonos',
      type: 'array',
      title: 'Números de Teléfono',
      description: 'Agrega uno o más teléfonos. Cada uno puede tener una etiqueta opcional (Ej: "Oficina", "Cel", "WhatsApp").',
      of: [
        {
          type: 'object',
          title: 'Teléfono',
          fields: [
            {
              name: 'numero',
              type: 'string',
              title: 'Número',
              description: 'Incluir formato internacional. Ej: +52 (834) 123 4567',
              validation: (Rule: any) => Rule.required().max(30),
            },
            {
              name: 'etiqueta',
              type: 'string',
              title: 'Etiqueta (opcional)',
              description: 'Ej: Oficina, Cel, WhatsApp. Si se deja vacío no se mostrará.',
              validation: (Rule: any) => Rule.max(30),
            },
          ],
          preview: {
            select: { title: 'numero', subtitle: 'etiqueta' },
          },
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'direccion',
      type: 'text',
      title: 'Dirección Física de la Oficina',
      description: 'Dirección completa separada por líneas si es necesario.',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: 'videoMapa',
      type: 'file',
      title: '🎬 Video del Mapa (Principal)',
      description: 'Video corto (zoom al mapa) que se muestra como imagen del mapa. Preferido sobre la imagen estática. Formato: MP4.',
      options: { accept: 'video/mp4' },
    },
    {
      name: 'mapaUrl',
      type: 'url',
      title: 'URL de imagen de Mapa (Respaldo)',
      description: 'Solo se usa si NO hay video y tampoco hay imagen subida manualmente.',
    },
    {
      name: 'mapaImagen',
      type: 'image',
      title: '🖼️ Imagen del Mapa (Manual)',
      description: 'Si se sube una imagen aquí, tendrá prioridad sobre la URL del mapa. El video siempre tiene la prioridad máxima.',
      options: { hotspot: true },
    },
  ],
  preview: {
    prepare: () => ({ title: 'Información de Contacto', subtitle: 'Email · Teléfono · Dirección · Mapa' }),
  },
}
