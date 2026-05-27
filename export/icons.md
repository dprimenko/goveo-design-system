# Goveo · Iconografía oficial

Sistema basado en **[Phosphor Icons](https://phosphoricons.com)** (familia `regular` + `fill` para estados activos). Cargado vía:

```html
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css" />
```

O en React Native: `npm i phosphor-react-native react-native-svg`.

---

## Navegación principal — los 5 tabs canónicos

| Sección | Icono | Phosphor name | RN component |
|---|---|---|---|
| **Lugares** | 🌐 | `globe-hemisphere-west` | `GlobeHemisphereWest` |
| **Negocios** | 🏪 | `storefront` | `Storefront` |
| **Home** | 🧭 | `compass` | `Compass` |
| **Eventos** | 🎭 | `mask-happy` | `MaskHappy` |
| **GeoStories** | ⏱️ | `clock-countdown` | `ClockCountdown` |

**Estado activo:** `weight="fill"` + label subrayado.
**Estado inactivo:** `weight="regular"`, opacidad 92%.

---

## Acciones secundarias

| Acción | Icono | Phosphor name | Contexto |
|---|---|---|---|
| Subir GeoClip (FAB) | ➕ | `plus` (bold) | Flotante top-right, naranja |
| Buscar | 🔍 | `magnifying-glass` | Header |
| Filtros | ⚙️ | `sliders` | Top bar de listados |
| Mapa | 🗺️ | `map-trifold` | Toggle de vista |
| Perfil | 👤 | `user` / `user-circle` | Header |
| Compartir | ✈️ | `paper-plane-tilt` | Action rail |
| Me gusta | ❤️ | `heart` | Action rail |
| Comentar | 💬 | `chat-circle` | Action rail |
| Cómo llegar | 📍 | `map-pin` (fill) | Card de negocio |
| Mute | 🔇 | `speaker-simple-slash` / `speaker-simple-high` | Player |

---

## Reglas

1. **Tamaños:** 16 / 20 / 24 / 28 px. Nunca menos de 16. Bottom-nav: 22-24 px.
2. **Pesos:** `regular` por defecto, `fill` para estados activos / chips, `bold` solo para botones grandes y CTAs.
3. **Color:** hereda del texto adyacente (`currentColor`). El naranja se reserva para acciones primarias.
4. **No mezclar familias:** Si añades un icono, debe ser de Phosphor. Sin Material, sin Tabler.
5. **Hit target ≥ 44 px** aunque el glifo sea de 22 px (padding del botón).

---

## Sectoriales sugeridos (categorías de negocio)

| Categoría | Icono | Phosphor name |
|---|---|---|
| Experiencias | 🏔️ | `mountains` |
| Workshops | 🎨 | `palette` |
| Gourmet | 🍳 | `cooking-pot` o `bowl-food` |
| Alojamientos | 🛏️ | `bed` |
| Artesanía | 🧪 | `flask` o `pottery` |
| Cultura | 🏛️ | `bank` |
| Restaurantes | 🍴 | `fork-knife` |
| Bares | 🍸 | `martini` |
| Tiendas | 🛍️ | `shopping-bag` |
| Hoteles | 🏨 | `house-line` o `bed` |
