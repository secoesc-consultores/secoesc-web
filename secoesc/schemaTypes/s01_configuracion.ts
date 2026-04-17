/**
 * S-01: CONFIGURACIÓN GLOBAL
 * Datos generales del sitio: empresa, footer y redes sociales.
 * Solo debe existir UN registro de este tipo.
 */
export default {
  name: 'configuracion',
  type: 'document',
  title: '⚙️ Configuración Global',
  fields: [
    {
      name: 'nombreEmpresa',
      type: 'string',
      title: 'Nombre de la Empresa',
      description: 'Se usa en múltiples secciones del sitio. Ej: SECOESC',
      initialValue: 'SECOESC',
      validation: (Rule: any) => Rule.required().max(60),
    },
    {
      name: 'eslogan',
      type: 'string',
      title: 'Eslogan de la Empresa',
      description: 'Frase corta que resume la propuesta de valor. Aparece en el Footer.',
      validation: (Rule: any) => Rule.max(120),
    },
    {
      name: 'copyright',
      type: 'string',
      title: 'Texto de Derechos de Autor (Copyright)',
      description: 'Aparece al pie del sitio. Ej: © 2026 SECOESC | Consultoría Especializada',
      initialValue: `© ${new Date().getFullYear()} SECOESC | Consultoría Especializada`,
    },
    {
      name: 'redesSociales',
      type: 'array',
      title: 'Redes Sociales',
      description: 'Agrega los perfiles de la empresa en redes. El icono genérico 🔗 se usa si el nombre no coincide exactamente.',
      of: [
        {
          type: 'object',
          title: 'Red Social',
          fields: [
            {
              name: 'plataforma',
              type: 'string',
              title: 'Plataforma',
              description: 'Nombre exacto para el icono. Ej: LinkedIn, Instagram, Facebook, Twitter',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'Enlace al perfil',
              validation: (Rule: any) => Rule.required().uri({ scheme: ['http', 'https'] }),
            },
          ],
          preview: {
            select: { title: 'plataforma', subtitle: 'url' },
          },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({ title: 'Configuración Global', subtitle: 'Empresa · Footer · Redes' }),
  },
}
