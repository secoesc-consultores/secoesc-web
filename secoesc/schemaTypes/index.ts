/**
 * REGISTRO CENTRAL DE SCHEMAS — SECOESC CMS
 */

// CONFIGURACIÓN GLOBAL
import s01_configuracion from './s01_configuracion'
import s02_branding from './s02_branding'

// PÁGINA: INICIO (HOME)
import s03_hero from './s03_hero'
import s04_estadistica from './s04_estadistica'
import s05_servicio from './s05_servicio'
import s06_proyecto from './s06_proyecto'
import s07_cliente from './s07_cliente'
import s10_excelencia from './s10_excelencia'
import s13_metodologia from './s13_metodologia'

// PÁGINA: NOSOTROS
import s08_trayectoria from './s08_trayectoria'

// PÁGINA: INGENIERÍA
import s09_ventaja from './s09_ventaja'

// PÁGINA: CONTACTO
import s11_contacto from './s11_contacto'

// PÁGINA: BLOG
import s15_blog from './s15_blog'

// TRANSVERSALES
import s12_cta from './s12_cta'
import s14_textos_ui from './s14_textos_ui'

export const schemaTypes = [
  // Configuración
  s01_configuracion,
  s02_branding,

  // Home
  s03_hero,
  s04_estadistica,
  s05_servicio,
  s06_proyecto,
  s07_cliente,
  s10_excelencia,
  s13_metodologia,

  // Otras Páginas
  s08_trayectoria,
  s09_ventaja,
  s11_contacto,

  // Blog
  s15_blog,

  // Globales
  s12_cta,
  s14_textos_ui, // ← Textos de UI / Copy de toda la interfaz
]