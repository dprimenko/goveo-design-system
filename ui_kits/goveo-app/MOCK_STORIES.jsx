// MOCK_STORIES.js — sample GeoStory data
const MOCK_STORIES = [
  {
    id: "1",
    title: "Brunch on Calle Sierpes",
    description: "Tortilla recién hecha y café de especialidad. Mesa libre hasta las 12.",
    distance: "a 230m",
    user: "@mercadosdesevilla",
    likes: 128,
    video: "https://res.cloudinary.com/goveo/video/upload/v1777898197/Promo_Goveo_Tiendas_15c_para_Intro_Video_User_6-mayo2026_2_wt9bh0.mp4",
    poster: "https://images.unsplash.com/photo-1543340904-0b1d843bccda?w=720",
    avatar: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=80",
  },
  {
    id: "2",
    title: "Flamenco esta noche · 22:00",
    description: "Entradas en taquilla 5 min antes. Aforo 60 personas.",
    distance: "a 1.2km",
    user: "@casa.del.flamenco",
    likes: 412,
    video: null,
    poster: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=720",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80",
  },
  {
    id: "3",
    title: "Heladería artesanal — abierta hasta medianoche",
    description: "Sabor del mes: higo y queso payoyo.",
    distance: "muy cerca de ti",
    user: "@helado.bueno",
    likes: 89,
    video: null,
    poster: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=720",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80",
  },
];

Object.assign(window, { MOCK_STORIES });
