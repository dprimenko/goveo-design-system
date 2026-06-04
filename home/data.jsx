/* global window */
/* ============================================================
   Goveo Home · datos mock
   Placeholders: cada vídeo lleva un "hue" para el degradado y
   un "label" para indicar qué imagen real iría ahí.
   ============================================================ */

let __vid = 0;
function vid(title, place, user, dist, hue, kind) {
  return { id: `v${__vid++}`, title, place, user, dist, hue, kind };
}

const TURISMO_VIDEOS = [
  vid("Catedral al atardecer", "Casco antiguo", "@visitsevilla", "230 m", 28, "Turismo"),
  vid("Vistas desde la Giralda", "Centro", "@sevilla360", "1.2 km", 205, "Turismo"),
  vid("Sagrada Família", "L'Eixample", "@bcn.tips", "3.1 km", 32, "Turismo"),
  vid("Ruta de murallas", "Dalt Vila", "@ibiza.cultura", "640 m", 168, "Turismo"),
  vid("Mirador del puerto", "Marina", "@goveo", "980 m", 250, "Turismo"),
  vid("Mercado de artesanía", "Las Dalias", "@lasdalias", "2.4 km", 18, "Turismo"),
];

const NEGOCIOS_VIDEOS = [
  vid("Namasté · clase abierta", "Centro", "@namaste.ibz", "120 m", 280, "Negocio"),
  vid("Las Dalias by night", "Sant Carles", "@lasdalias", "2.4 km", 190, "Negocio"),
  vid("Estragón · menú Michelin", "Marina", "@estragon", "560 m", 36, "Negocio"),
  vid("Terraza chill-out", "Platja d'en Bossa", "@sunsetibz", "1.8 km", 210, "Negocio"),
  vid("Taller de cerámica", "Santa Gertrudis", "@ceramica.ibz", "3.0 km", 22, "Negocio"),
  vid("Cata de vino local", "Sant Mateu", "@bodega", "4.1 km", 320, "Negocio"),
];

// Pools to draw "more" cards from when reaching the end of a rail
const MORE_POOL = [
  ["Calas escondidas", "Cala d'Hort", "@ibiza.secret", "6.2 km", 196],
  ["Ruta en kayak", "Es Vedrà", "@kayak.ibz", "7.0 km", 188],
  ["Brunch frente al mar", "Talamanca", "@brunch.ibz", "1.1 km", 40],
  ["Mercadillo hippy", "Punta Arabí", "@hippymarket", "5.5 km", 24],
  ["Sunset session", "Cala Comte", "@sunset", "9.3 km", 300],
  ["Free tour casco viejo", "Dalt Vila", "@freetour", "700 m", 150],
];
let __more = 0;
function moreVideos(kind, n = 3) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const p = MORE_POOL[(__more + i) % MORE_POOL.length];
    out.push(vid(p[0], p[1], p[2], p[3], p[4], kind));
  }
  __more += n;
  return out;
}

const CATEGORIES_TURISMO = [
  { id: "exp", label: "Experiencias", icon: "ph-person-simple-hike", hue: 168 },
  { id: "wsh", label: "Workshops", icon: "ph-palette", hue: 175 },
  { id: "gou", label: "Gourmet", icon: "ph-fork-knife", hue: 340 },
  { id: "alo", label: "Alojamientos", icon: "ph-bed", hue: 88 },
  { id: "art", label: "Artesanía", icon: "ph-paint-brush-household", hue: 48 },
  { id: "cul", label: "Cultura", icon: "ph-bank", hue: 28 },
  { id: "nat", label: "Naturaleza", icon: "ph-mountains", hue: 150 },
];
const CATEGORIES_COMPRAS = [
  { id: "mod", label: "Moda", icon: "ph-t-shirt", hue: 320 },
  { id: "dec", label: "Decoración", icon: "ph-armchair", hue: 40 },
  { id: "joy", label: "Joyería", icon: "ph-diamond", hue: 200 },
  { id: "lib", label: "Librerías", icon: "ph-book-open", hue: 28 },
  { id: "gas", label: "Gastro", icon: "ph-storefront", hue: 350 },
  { id: "reg", label: "Regalos", icon: "ph-gift", hue: 280 },
];

let __biz = 0;
function biz(name, addr, dist, initials, hue) {
  return { id: `b${__biz++}`, name, addr, dist, initials, hue };
}

const BUSINESSES = [
  biz("World Familia Ibiza", "Carrer de Vicente Cuervo, 07800 Eivissa", "281 m", "WF", 4),
  biz("Fomento Ibiza", "Carrer de l'Historiador Josep Clapés, 4", "298 m", "FI", 188),
  biz("Blue Ocean Ibiza", "Marina Ibiza, 07800 Eivissa", "1.3 km", "BO", 205),
  biz("SCUBA Ibiza", "Marina Botafoch, Eivissa", "1.5 km", "SC", 218),
  biz("Be Charter Ibiza", "Carrer d'Alhaueth, 07800 Eivissa", "1.7 km", "Be", 190),
  biz("Estragón Restaurant", "Marina Botafoch, Eivissa", "2.1 km", "Es", 32),
  biz("Las Dalias", "Ctra. Sant Carles, km 12", "2.4 km", "LD", 24),
  biz("Casa Maca", "Camí des Soto Fosca, Eivissa", "3.2 km", "CM", 340),
];

const BIZ_POOL = [
  ["Aguas de Ibiza", "Salinas, Santa Eulària", "4.0 km", "AI", 200],
  ["Bambuddha", "Ctra. Sant Joan, km 8", "5.1 km", "Ba", 150],
  ["Sa Capella", "Camí de Sa Capella, Sant Antoni", "6.3 km", "SC", 28],
  ["El Chiringuito", "Es Cavallet, Sant Josep", "7.2 km", "EC", 205],
  ["Atzaró Agroturismo", "Ctra. Sant Joan, km 15", "8.0 km", "At", 90],
];
let __morebiz = 0;
function moreBusinesses(n = 4) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const p = BIZ_POOL[(__morebiz + i) % BIZ_POOL.length];
    out.push(biz(p[0], p[1], p[2], p[3], p[4]));
  }
  __morebiz += n;
  return out;
}

Object.assign(window, {
  TURISMO_VIDEOS, NEGOCIOS_VIDEOS, moreVideos,
  CATEGORIES_TURISMO, CATEGORIES_COMPRAS,
  BUSINESSES, moreBusinesses,
});
