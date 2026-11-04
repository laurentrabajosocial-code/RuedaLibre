# Comparativa de versiones

## Alcance

Este documento describe las dos etapas solicitadas del sitio. La v1.0 conserva
el estado semántico y las reglas nativas del formulario antes de esta migración;
la v2.0 añade la experiencia responsive con Bootstrap. GitHub Pages sirve la
versión actual en la raíz y mantiene las instantáneas en `/v1.0/` y `/v2.0/`.

| Métrica / capacidad | v1.0: base propia | v2.0: sitio actual |
|---|---|---|
| Páginas | 3: inicio, tarifas y reservas | 3: inicio, tarifas y reservas |
| Estilos | Estilos embebidos en tarifas; inicio y reservas usan estilos del navegador | Bootstrap 5.3.3 por CDN + 1 hoja propia compartida |
| Tipografía e iconos | Tipografía del sistema | Google Fonts (DM Sans y Manrope) + Bootstrap Icons |
| Navegación móvil | Enlaces tradicionales | Navbar colapsable por Bootstrap en las 3 páginas |
| Catálogo / contenido visual | Secciones y tablas HTML | Cards en grilla, carrusel manual y tablas adaptables |
| Formulario | Controles semánticos y restricciones nativas | Mismos controles nativos, feedback visual, alerta y modal accesible |
| Adaptación | Tabla de tarifas adaptable; las otras páginas no tienen un layout responsive común | Grilla responsive de Bootstrap y ajustes para móvil |
| Envío de reservas | Sin backend | Sigue sin backend: se valida y muestra una demostración local, no se almacena ni envía |
| Publicación | Publicación manual | Flujo de GitHub Actions preparado para GitHub Pages en `main` |

## Decisiones de layout

- **Flexbox** distribuye el encabezado, sus elementos de navegación y el pie de
  página en un eje principal, con ajuste de línea en pantallas estrechas.
- **Grid de Bootstrap** distribuye las tarjetas del inicio en 1, 2 o 4 columnas
  según el ancho disponible; la misma grilla ordena los campos del formulario.
- El contenedor general usa Flexbox en columna para mantener el pie abajo cuando
  hay poco contenido. Las tablas conservan su propio desplazamiento horizontal
  cuando no caben en móvil.
- La llamada “La ciudad está lista para ti” se presenta solo con utilidades de
  Bootstrap (espaciado, flex, borde, fondo, tipografía y sombra), sin clase CSS
  propia.

Las clases se contrastaron con la documentación oficial de
[Flex utilities](https://getbootstrap.com/docs/5.3/utilities/flex/),
[navbar](https://getbootstrap.com/docs/5.3/components/navbar/) y
[validación de formularios](https://getbootstrap.com/docs/5.3/forms/validation/).
Se conserva la validación del navegador y `reportValidity()` en lugar de
desactivar la validación nativa.

## Datos verificables de la v2.0

- 3 documentos HTML y 1 hoja de estilos compartida.
- 1 script local pequeño para fecha mínima y confirmación de reserva.
- 4 recursos CSS/JS externos principales: Bootstrap CSS, Bootstrap Bundle,
  Bootstrap Icons y la hoja de Google Fonts. Los archivos de fuente se descargan
  aparte según el navegador.
- El formulario tiene restricciones HTML (campos requeridos, formato, rangos y
  longitudes); el script invoca `reportValidity()` y el navegador mantiene el
  foco en el primer campo inválido.
- La reserva de demostración no constituye una confirmación real del negocio.
  Para recibir reservas hace falta integrar un backend o servicio de formularios.

## Contraste de la paleta

La relación de contraste se calcula con la fórmula WCAG para luminancia relativa.
La paleta principal obtiene estos valores aproximados:

| Combinación | Contraste | WCAG texto normal |
|---|---:|---|
| `#20362e` sobre `#f5f8f6` | 12.06:1 | AAA |
| `#ffffff` sobre `#104832` | 10.53:1 | AAA |
| `#ffffff` sobre `#145c43` | 7.95:1 | AAA |
| `#52645a` sobre `#ffffff` | 6.31:1 | AA |
| `#198754` (utilidad Bootstrap) sobre `#ffffff` | 4.53:1 | AA |

Los valores se refieren a los colores sólidos declarados, no a texto superpuesto
a fotografías. La capa oscura de la portada y los subtítulos de carrusel se
mantienen separados para preservar legibilidad.

## Publicación

El workflow `.github/workflows/pages.yml` crea las rutas versionadas a partir de
las etiquetas `v1.0` y `v2.0`, sirve la versión actual en la raíz y despliega
al publicar cambios en `main`. En GitHub, selecciona **Settings → Pages →
Source: GitHub Actions**. La publicación requiere que las etiquetas estén en el
repositorio remoto y que Actions tenga permisos para publicar Pages.
