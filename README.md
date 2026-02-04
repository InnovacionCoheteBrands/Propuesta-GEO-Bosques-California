<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1qdOUyQdg0AWF7BmVOQy17dgIdpufSBVG

## Despliegue en GoDaddy

Este proyecto está construido con **Astro**, lo que permite un despliegue sencillo como sitio estático en la mayoría de los servicios de hosting de GoDaddy (Web Hosting, cPanel).

### 1. Generar la Compilación de Producción

Antes de subir los archivos, debes generar una versión optimizada del sitio:

```bash
npm run build
```

Esta acción creará una carpeta llamada `dist/` en la raíz de tu proyecto. **Esta carpeta contiene todos los archivos que deben subirse al servidor.**

### 2. Métodos de Despliegue

#### Opción A: A través de cPanel (Administrador de Archivos)
1. Inicia sesión en tu cuenta de GoDaddy y accede a tu **cPanel**.
2. Abre el **Administrador de Archivos** (File Manager).
3. Dirígete al directorio raíz de tu dominio (usualmente `public_html`).
4. Sube el contenido (archivos y carpetas) que se encuentra **dentro** de la carpeta local `dist/`.
5. Asegúrate de que el archivo `index.html` quede directamente en la raíz de `public_html`.

#### Opción B: A través de FTP (FileZilla)
1. Obtén tus credenciales FTP desde el panel de GoDaddy.
2. Conéctate a tu servidor usando un cliente como **FileZilla**.
3. En el panel local, abre la carpeta `dist/`.
4. En el panel remoto, abre la carpeta `public_html`.
5. Arrastra y suelta todo el contenido de `dist/` hacia `public_html`.

### 3. Configuración Adicional (Opcional)

**Manejo de rutas (Redirección 404):**
Si utilizas rutas dinámicas o quieres que GoDaddy maneje correctamente las subpáginas en caso de errores, asegúrate de que el servidor esté configurado para servir `index.html` o crea un archivo `.htaccess` en la raíz de `public_html` con la configuración necesaria para rutas estáticas.

**SSL:**
GoDaddy suele ofrecer certificados SSL. Asegúrate de activarlo en tu panel para que el sitio cargue vía `https://`.
