/**
 * S-14: TEXTOS DE INTERFAZ (UI COPY)
 * Centraliza TODOS los textos fijos/hardcodeados del sitio que no pertenecen
 * a un schema de contenido específico: navegación, labels, encabezados de sección,
 * textos del formulario, botones, mensajes de carga, etc.
 * Solo debe existir UN registro de este tipo.
 */
export default {
  name: 'textosUI',
  type: 'document',
  title: '✏️ Textos de Interfaz (UI Copy)',
  groups: [
    { name: 'nav',         title: '① Navegación' },
    { name: 'home',        title: '② Home' },
    { name: 'servicios',   title: '③ Página Servicios' },
    { name: 'portafolio',  title: '④ Página Portafolio' },
    { name: 'ingenieria',  title: '⑤ Página Ingeniería' },
    { name: 'contacto',    title: '⑥ Página Contacto' },
    { name: 'especialidad',title: '⑦ Detalle de Especialidad' },
    { name: 'footer',      title: '⑧ Footer' },
    { name: 'blog',        title: '⑨ Blog' },
  ],

  fields: [

    // ─── ① NAVEGACIÓN ─────────────────────────────────────────────────────────
    {
      name: 'navInicio',        type: 'string', title: 'Enlace: Inicio',
      group: 'nav', initialValue: 'Inicio',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'navNosotros',      type: 'string', title: 'Enlace: Nosotros',
      group: 'nav', initialValue: 'Nosotros',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'navServicios',     type: 'string', title: 'Enlace: Servicios',
      group: 'nav', initialValue: 'Servicios',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'navPortafolio',    type: 'string', title: 'Enlace: Portafolio',
      group: 'nav', initialValue: 'Portafolio',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'navIngenieria',    type: 'string', title: 'Enlace: Ingeniería',
      group: 'nav', initialValue: 'Ingeniería',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'navBlog',          type: 'string', title: 'Enlace: Blog',
      group: 'nav', initialValue: 'Blog',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'navContacto',      type: 'string', title: 'Botón CTA de Navegación',
      group: 'nav', initialValue: 'Contacto',
      validation: (Rule: any) => Rule.required().max(40),
    },

    // ─── ② HOME ───────────────────────────────────────────────────────────────
    {
      name: 'homeLabelClientes',
      type: 'string', title: 'Label sección Clientes/Alianzas',
      group: 'home', initialValue: 'Instituciones que confían en nuestra ingeniería',
      validation: (Rule: any) => Rule.required().max(120),
    },
    {
      name: 'homeTituloProyectos',
      type: 'string', title: 'Título sección Casos de Éxito',
      group: 'home', initialValue: 'Casos de Éxito',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'homeDescProyectos',
      type: 'string', title: 'Descripción sección Casos de Éxito',
      group: 'home', initialValue: 'Nuestra ingeniería aplicada en proyectos reales de alto impacto.',
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'homeLabelDesafio',
      type: 'string', title: 'Label "Desafío" en tarjeta de proyecto',
      group: 'home', initialValue: 'Desafío',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'homeLabelSolucion',
      type: 'string', title: 'Label "Solución" en tarjeta de proyecto',
      group: 'home', initialValue: 'Solución',
      validation: (Rule: any) => Rule.required().max(40),
    },

    // ─── ③ SERVICIOS ─────────────────────────────────────────────────────────
    {
      name: 'serviciosEtiqueta',
      type: 'string', title: 'Etiqueta Hero de Servicios',
      group: 'servicios', initialValue: 'Portafolio de Soluciones',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'serviciosTitulo',
      type: 'string', title: 'Título Hero de Servicios',
      group: 'servicios', initialValue: 'Ingeniería que Sostiene el Futuro.',
      description: 'Las últimas 3 palabras se destacan en color primario.',
      validation: (Rule: any) => Rule.required().max(120),
    },
    {
      name: 'serviciosDescripcion',
      type: 'text', title: 'Descripción Hero de Servicios',
      group: 'servicios', rows: 3,
      initialValue: 'Desde el cálculo estructural más complejo hasta la consultoría técnica preventiva, transformamos desafíos técnicos en estructuras sólidas.',
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: 'serviciosLabelVerEspecialidad',
      type: 'string', title: 'Label botón "Ver Especialidad" en tarjeta',
      group: 'servicios', initialValue: 'Ver Especialidad',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'featuredTitulo',
      type: 'string', title: 'Título sección "Especialidades Técnicas" (Home)',
      group: 'servicios', initialValue: 'Especialidades Técnicas',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'featuredDescripcion',
      type: 'string', title: 'Descripción sección "Especialidades Técnicas" (Home)',
      group: 'servicios', initialValue: 'Un portafolio diseñado para cubrir cada etapa del ciclo de vida estructural.',
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'featuredVerPortafolio',
      type: 'string', title: 'Enlace "Ver todo el portafolio" (Home)',
      group: 'servicios', initialValue: 'Ver todo el portafolio',
      validation: (Rule: any) => Rule.required().max(60),
    },
    {
      name: 'featuredSaberMas',
      type: 'string', title: 'Label "Saber más" en tarjeta de servicio (Home)',
      group: 'servicios', initialValue: 'Saber más',
      validation: (Rule: any) => Rule.required().max(40),
    },

    // ─── ④ PORTAFOLIO ────────────────────────────────────────────────────────
    {
      name: 'portafolioEtiquetaIng',
      type: 'string', title: 'Etiqueta sección Ingeniería',
      group: 'portafolio', initialValue: 'Core Business / Ingeniería',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'portafolioTituloIng',
      type: 'string', title: 'Título sección Ingeniería',
      group: 'portafolio', initialValue: 'Ingeniería.',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'portafolioDescIng',
      type: 'text', title: 'Descripción sección Ingeniería',
      group: 'portafolio', rows: 3,
      initialValue: 'Estructuras inteligentes y soluciones de ingeniería civil de alta factura técnica. Base sólida para cada proyecto.',
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: 'portafolioEtiquetaArq',
      type: 'string', title: 'Etiqueta sección Arquitectura',
      group: 'portafolio', initialValue: 'Diseño de Autor',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'portafolioTituloArq',
      type: 'string', title: 'Título sección Arquitectura',
      group: 'portafolio', initialValue: 'Arquitectura.',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'portafolioDescArq',
      type: 'text', title: 'Descripción sección Arquitectura',
      group: 'portafolio', rows: 3,
      initialValue: 'Visión estética y volumetría conceptual adaptada a cada entorno. El arte de construir espacios.',
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: 'portafolioLabelVerProyecto',
      type: 'string', title: 'Label "Ver Proyecto" en hover de imagen',
      group: 'portafolio', initialValue: 'Ver Proyecto',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'portafolioLabelDesafio',
      type: 'string', title: 'Label "Desafío" en tarjeta de ingeniería',
      group: 'portafolio', initialValue: 'Desafío',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'portafolioLabelSolucion',
      type: 'string', title: 'Label "Solución Técnico-Estructural" en tarjeta',
      group: 'portafolio', initialValue: 'Solución Técnico-Estructural',
      validation: (Rule: any) => Rule.required().max(60),
    },

    // ─── ⑤ INGENIERÍA ────────────────────────────────────────────────────────
    {
      name: 'ingenieriaEtiquetaHero',
      type: 'string', title: 'Etiqueta Hero de Ingeniería',
      group: 'ingenieria', initialValue: 'Nuestra Diferencia',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'ingenieriaTituloHero',
      type: 'string', title: 'Título Hero de Ingeniería',
      group: 'ingenieria', initialValue: 'Ingeniería que marca la diferencia.',
      description: 'Las últimas 3 palabras se destacan en color primario.',
      validation: (Rule: any) => Rule.required().max(120),
    },
    {
      name: 'ingenieriaEtiquetaVentajas',
      type: 'string', title: 'Etiqueta sección Ventajas ("Por qué elegirnos")',
      group: 'ingenieria', initialValue: 'Por qué elegirnos',
      validation: (Rule: any) => Rule.required().max(60),
    },

    // ─── ⑥ CONTACTO ──────────────────────────────────────────────────────────
    {
      name: 'contactoEtiqueta',
      type: 'string', title: 'Etiqueta Hero de Contacto',
      group: 'contacto', initialValue: 'Conecta con nosotros',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'contactoTituloSedePrincipal',
      type: 'string', title: 'Título tarjeta Sede Principal',
      group: 'contacto', initialValue: 'Sede Principal',
      validation: (Rule: any) => Rule.required().max(60),
    },
    {
      name: 'contactoTituloContactoDirecto',
      type: 'string', title: 'Título tarjeta Contacto Directo',
      group: 'contacto', initialValue: 'Contacto Directo',
      validation: (Rule: any) => Rule.required().max(60),
    },
    {
      name: 'contactoTituloFormulario',
      type: 'string', title: 'Título del formulario',
      group: 'contacto', initialValue: 'Enviar un mensaje',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'contactoSubtituloFormulario',
      type: 'string', title: 'Subtítulo del formulario',
      group: 'contacto', initialValue: 'Nuestros consultores responderán en menos de 24 horas hábiles.',
      validation: (Rule: any) => Rule.required().max(120),
    },
    {
      name: 'contactoLabelNombre',
      type: 'string', title: 'Label campo Nombre',
      group: 'contacto', initialValue: 'Nombre',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'contactoLabelApellido',
      type: 'string', title: 'Label campo Apellido',
      group: 'contacto', initialValue: 'Apellido',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'contactoLabelEmail',
      type: 'string', title: 'Label campo Correo',
      group: 'contacto', initialValue: 'Correo Electrónico',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'contactoLabelMensaje',
      type: 'string', title: 'Label campo Mensaje',
      group: 'contacto', initialValue: 'Mensaje',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'contactoPlaceholderMensaje',
      type: 'string', title: 'Placeholder campo Mensaje',
      group: 'contacto', initialValue: '¿Cómo podemos ayudarle?',
      validation: (Rule: any) => Rule.max(80),
    },
    {
      name: 'contactoBotonEnviar',
      type: 'string', title: 'Texto del botón Enviar',
      group: 'contacto', initialValue: 'Enviar Solicitud',
      validation: (Rule: any) => Rule.required().max(60),
    },

    // ─── ⑦ DETALLE DE ESPECIALIDAD ───────────────────────────────────────────
    {
      name: 'especialidadBotonVolver',
      type: 'string', title: 'Botón "Volver a Especialidades"',
      group: 'especialidad', initialValue: 'Volver a Especialidades',
      validation: (Rule: any) => Rule.required().max(60),
    },
    {
      name: 'especialidadEtiqueta',
      type: 'string', title: 'Etiqueta de categoría en el hero',
      group: 'especialidad', initialValue: 'Capacidad Técnica',
      validation: (Rule: any) => Rule.required().max(60),
    },
    {
      name: 'especialidadTituloSidebar',
      type: 'string', title: 'Título tarjeta sidebar "Solicitar Dictamen"',
      group: 'especialidad', initialValue: 'Solicitar Dictamen Técnico',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'especialidadDescSidebar',
      type: 'text', title: 'Descripción tarjeta sidebar',
      group: 'especialidad', rows: 3,
      initialValue: 'Ofrecemos consultoría especializada y avalada por Peritos Profesionales para cada una de nuestras especialidades.',
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: 'especialidadBotonConsulta',
      type: 'string', title: 'Botón CTA del sidebar',
      group: 'especialidad', initialValue: 'Iniciar Consulta Profesional',
      validation: (Rule: any) => Rule.required().max(60),
    },
    {
      name: 'especialidadMsgVacio',
      type: 'string', title: 'Mensaje cuando no hay contenido técnico',
      group: 'especialidad', initialValue: 'Sección en proceso de documentación técnica por el equipo de ingeniería de SECOESC.',
      validation: (Rule: any) => Rule.max(200),
    },

    // ─── ⑧ FOOTER ────────────────────────────────────────────────────────────
    {
      name: 'footerTituloEstructura',
      type: 'string', title: 'Encabezado columna Estructura/Navegación',
      group: 'footer', initialValue: 'Estructura',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'footerNavInicio',
      type: 'string', title: 'Footer enlace: Inicio',
      group: 'footer', initialValue: 'Inicio',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'footerNavNosotros',
      type: 'string', title: 'Footer enlace: Nuestro Equipo',
      group: 'footer', initialValue: 'Nuestro Equipo',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'footerNavServicios',
      type: 'string', title: 'Footer enlace: Portafolio Técnico',
      group: 'footer', initialValue: 'Portafolio Técnico',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'footerNavPortafolio',
      type: 'string', title: 'Footer enlace: Proyectos',
      group: 'footer', initialValue: 'Proyectos',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'footerNavIngenieria',
      type: 'string', title: 'Footer enlace: Ingeniería Avanzada',
      group: 'footer', initialValue: 'Ingeniería Avanzada',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'footerNavBlog',
      type: 'string', title: 'Footer enlace: Blog / Noticias',
      group: 'footer', initialValue: 'Blog',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'footerNavContacto',
      type: 'string', title: 'Footer enlace: Contacto',
      group: 'footer', initialValue: 'Contacto',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'footerTituloEspecialidades',
      type: 'string', title: 'Encabezado columna Especialidades',
      group: 'footer', initialValue: 'Especialidades',
      validation: (Rule: any) => Rule.required().max(40),
    },
    {
      name: 'footerTituloOficina',
      type: 'string', title: 'Encabezado columna Oficina Central',
      group: 'footer', initialValue: 'Oficina Central',
      validation: (Rule: any) => Rule.required().max(40),
    },

    // ─── ⑨ BLOG ──────────────────────────────────────────────────────────────
    {
      name: 'blogHomeLabel',
      type: 'string', title: 'Label sección Blog (Home)',
      group: 'blog', initialValue: 'Divulgación Técnica',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'blogHomeTitulo',
      type: 'string', title: 'Título sección Blog (Home)',
      group: 'blog', initialValue: 'Blog & Noticias',
      validation: (Rule: any) => Rule.required().max(80),
    },
    {
      name: 'blogHomeDesc',
      type: 'string', title: 'Descripción sección Blog (Home)',
      group: 'blog', initialValue: 'Perspectivas y conocimiento técnico de nuestro equipo de especialistas.',
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'blogHomeVerTodo',
      type: 'string', title: 'Enlace "Ir al blog completo" (Home)',
      group: 'blog', initialValue: 'Ir al blog completo',
      validation: (Rule: any) => Rule.required().max(60),
    },
  ],

  preview: {
    prepare: () => ({ title: 'Textos de Interfaz', subtitle: 'Nav · Secciones · Formulario · Footer' }),
  },
}
