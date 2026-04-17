# 🚀 Guía de Despliegue de SECOESC Web

Esta guía contiene los pasos necesarios para poner el sitio web en línea de forma **gratuita y profesional** utilizando GitHub, Vercel y Sanity.

---

## 🏗️ Parte 1: El Panel de Control (Sanity Studio)
Sanity es donde manejas los contenidos. Debes poner el panel en la nube para poder editar desde cualquier lugar.

1. Abre tu terminal en la carpeta `/secoesc`.
2. Ejecuta el comando:
   ```powershell
   npx sanity deploy
   ```
3. Te pedirá un nombre para tu proyecto (ej: `secoesc-admin`).
4. Al terminar, te dará una URL (ej: `https://secoesc-admin.sanity.studio`). ¡Guárdala! Es tu oficina virtual.

---

## 🌐 Parte 2: La Página Web (GitHub + Vercel)
Este método es el más económico y eficiente (Costo: $0).

### Paso 1: Subir el código a GitHub
1. Crea un repositorio **Privado** en [GitHub](https://github.com/new) llamado `secoesc-web`.
2. En la terminal de la raíz del proyecto, ejecuta:
   ```powershell
   git init
   git add .
   git commit -m "Versión Final Estable SECOESC"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/secoesc-web.git
   git push -u origin main
   ```

### Paso 2: Conectar con Vercel
1. Entra a [Vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New"** > **"Project"**.
3. Selecciona el repositorio `secoesc-web` e impórtalo.
4. **IMPORTANTE: Configura las Variables de Entorno**:
   En la sección "Environment Variables", añade las que tengas en tu archivo `.env` local (como el ProjectID de Sanity) para que la web pueda leer la base de datos.
5. Haz clic en **"Deploy"**.

---

## 🛠️ Parte 3: ¿Cómo seguir trabajando?
Una vez que el sitio está en línea, el flujo es este:

1. **Si cambias contenido (fotos/textos):** Entra a tu URL de Sanity Studio, cambia el dato y dale a **Publish**. La web se actualiza sola. No necesitas tocar código.
2. **Si cambias diseño o funciones:**
   - Realizas el cambio en tu computadora.
   - Guardas y haces: `git add .`, `git commit -m "mejoras"`, `git push`.
   - Vercel detectará el cambio y **actualizará la web automáticamente en 1 minuto**.

---

## 📌 Notas de Seguridad
- Nunca borres el archivo `.gitignore`.
- Mantén tu contraseña de Sanity y GitHub a salvo.

---
**Guía generada por Antigravity AI para SECOESC.**
