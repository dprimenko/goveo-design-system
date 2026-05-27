# Goveo Product UI Kit

Sistema unificado para la **app móvil** y el **panel web**. Una sola fuente de verdad para botones, formularios, navegación, cards y pantallas — distinto del kit `goveo-landing/` que es exclusivo de marketing.

## Filosofía

- **Superficie light por defecto** (chrome del producto, gestión, perfiles, búsqueda).
- **Superficie dark** sólo donde la imagen es protagonista — feed de vídeo, reproductor. Se activa con la clase `.gp-surface-dark` sobre un wrapper.
- **Inter** weights 400/500/600 — sin italic, sin uppercase agresivo, sin font-weight 900. Esa voz es exclusiva de la landing.
- **Densidad equilibrada** · **esquinas medias** (8–14 px en controles, 14–20 px en cards) · **naranja sólo en acentos** (CTAs primarios, estados activos, bullets de feature).

## Files

```
product.css                ← tokens (en raíz, importable por otros kits)
ui_kits/goveo-product/
  styles.css               ← componentes (.gp-btn, .gp-input, .gp-card, …)
  screens.css              ← layout shared entre pantallas (app-shell, tabs, filter-bar…)
  index.html               ← showroom interactivo de todos los componentes
  components/
    Icon.jsx               ← helper Phosphor
    Button.jsx             ← Button({variant, size, loading, iconLeft, iconRight, iconOnly, block})
    Field.jsx              ← Field, Input, Textarea, Select, Checkbox, Radio, Toggle, FileUpload
    Badge.jsx              ← Badge, Chip, Avatar
    Card.jsx               ← Card, GeoClipCard, BusinessCard, ProductCard, EventCard
    Nav.jsx                ← Sidebar, Header, BottomBar
    Overlays.jsx           ← Modal, Drawer, EmptyState, LoadingState, Skeleton, ToastStack, useToasts
  screens/
    feed.html              ← Feed vertical de GeoStories (mobile-first, dark)
    publisher.html         ← Perfil público de Publisher (hero + tabs + cards)
    upload.html            ← Editor de GeoClip (wizard + preview phone)
    search.html            ← Búsqueda con filtros (sidebar desktop, drawer móvil)
```

## Componentes (rápido)

### Botones
```jsx
<Button variant="primary">Publicar</Button>
<Button variant="secondary" iconLeft={<Icon name="map-pin" />}>Llegar</Button>
<Button variant="ghost" iconOnly={<Icon name="x" />} aria-label="Cerrar" />
<Button variant="danger" loading={isDeleting}>Eliminar</Button>
```
Variants: `primary · secondary · ghost · danger · danger-ghost` · Sizes: `sm | md | lg` · Modifiers: `block`, `loading`, `disabled`, `iconOnly`.

### Form fields
```jsx
<Field label="Email" required hint="Te avisaremos aquí" error={err}>
  <Input type="email" iconLeft={<Icon name="envelope" />} />
</Field>
```
Field envuelve label + control + hint/error. Controls: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Toggle`, `FileUpload`.

### Cards
```jsx
<GeoClipCard poster="…" title="…" distance="230 m" duration="0:28" />
<BusinessCard avatar="…" name="…" category="…" rating="4.7" />
<EventCard day="14" month="JUN" title="…" time="20:00" />
<ProductCard img="…" name="…" price="3,50 €" oldPrice="5,00 €" />
```

### Overlays
```jsx
<Modal title="Eliminar" onClose={close} footer={<><Button>Cancelar</Button><Button variant="danger">Borrar</Button></>}>
  …
</Modal>

const { toasts, push, close } = useToasts();
push({ title: "Guardado", variant: "success" });
<ToastStack toasts={toasts} onClose={close} />
```

## Cómo lo uso en una pantalla nueva

```html
<link rel="stylesheet" href="../../product.css" />
<link rel="stylesheet" href="../styles.css" />
<link rel="stylesheet" href="../screens.css" />
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
<script src="…react…"></script>
<script src="…react-dom…"></script>
<script src="…babel…"></script>

<body class="gp-product">
  <script type="text/babel" src="../components/Icon.jsx"></script>
  <script type="text/babel" src="../components/Button.jsx"></script>
  …
</body>
```

Para superficie dark (feed, reproductor): envolver el contenido en `<div class="gp-surface-dark">…</div>` — todos los tokens semánticos cambian automáticamente.

## Pantallas existentes

- **`screens/feed.html`** · Feed mobile-first (TikTok-style, dark). Vertical scroll snap, action rail, panel de contexto lateral en desktop.
- **`screens/publisher.html`** · Perfil público con hero (cover + avatar + stats), tabs (GeoClips/Productos/Eventos/Reseñas), bloque de info + mapa lateral.
- **`screens/upload.html`** · Wizard de subida en 3 pasos (vídeo → detalles → publicar), preview en teléfono pegado al lateral, etiquetas, programación.
- **`screens/search.html`** · Búsqueda con sidebar de filtros (desktop) o drawer (móvil), chips de categoría, resultados agrupados (clips / negocios / eventos).

Todas son **responsive**: ≥900 px = layout panel + sidebar; <900 px = stack vertical con bottom-bar fija.

## Roadmap

Pendiente cuando lo necesites:
- Dashboard del Publisher (gestión interna, no perfil público)
- Mapa interactivo full-screen
- Mensajes / chat
- Onboarding / login / registro
- Ajustes de cuenta
- Carrito / checkout

## Caveats

- Las imágenes vienen de Unsplash como placeholders. Sustituye por contenido real cuando lo tengas.
- Iconos vía Phosphor CDN. Producción debería bundlear `@phosphor-icons/react` (ya lo tenéis en `package.json` de `goveo-astro`).
- El mapa es un placeholder CSS — al integrar real se reemplazará por Google Maps / Mapbox.
- "Mensajes" aparece en navegación pero la pantalla aún no existe.
