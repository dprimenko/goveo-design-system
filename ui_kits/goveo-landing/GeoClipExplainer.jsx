// GeoClipExplainer.jsx — split section "¿Qué es un GeoClip?"
function GeoClipExplainer() {
  return (
    <section className="lp-explainer">
      <div className="lp-explainer__inner">
        <div className="lp-explainer__copy">
          <h2 className="gv-poster-lg">
            ¿Qué es un <em>GeoClip</em>?
          </h2>
          <p className="lp-explainer__lead">
            Un vídeo corto geolocalizado que permite que el cliente te encuentre
            y te conozca al instante.
          </p>
          <ul className="lp-bullets">
            <li>
              <span className="lp-bullet">✔</span>
              <span>Geolocalización exacta para tráfico real.</span>
            </li>
            <li>
              <span className="lp-bullet">✔</span>
              <span>Perfil Publisher y primer GeoClip sin coste.</span>
            </li>
            <li>
              <span className="lp-bullet">✔</span>
              <span>30 segundos · vertical · hasta 60 MB.</span>
            </li>
          </ul>
          <button
            className="lp-btn lp-btn--white"
            onClick={() => window.dispatchEvent(new Event("lp-open-free"))}
          >
            ¡Subir mi primer vídeo gratis!
          </button>
        </div>

        <div className="lp-explainer__video">
          <div className="lp-phone">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="https://images.unsplash.com/photo-1543340904-0b1d843bccda?w=400"
            >
              <source
                src="https://res.cloudinary.com/goveo/video/upload/v1777898197/Promo_Goveo_Tiendas_15c_para_Intro_Video_User_6-mayo2026_2_wt9bh0.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { GeoClipExplainer });
