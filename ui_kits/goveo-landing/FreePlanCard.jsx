// FreePlanCard.jsx — "¡Empieza gratis!" 3-step glass card
function FreePlanCard() {
  return (
    <section className="lp-free-wrap" id="plan-free">
      <div className="lp-free">
        <div className="lp-free__icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <h2 className="gv-poster-md" style={{ marginBottom: "1rem" }}>
          ¡Empieza gratis!
        </h2>
        <ol className="lp-steps">
          <li>
            <span className="lp-step__num">1</span>
            <span>Descarga la aplicación Goveo.</span>
          </li>
          <li>
            <span className="lp-step__num">2</span>
            <span>Regístrate como Usuario y Publisher.</span>
          </li>
          <li>
            <span className="lp-step__num">3</span>
            <span>Sube tu GeoClip (Video vertical · 30 s · 60 MB).</span>
          </li>
        </ol>
        <a href="#descarga" className="lp-btn lp-btn--white" style={{ marginTop: "1.25rem", display: "block" }}>
          Ir a descargar la app
        </a>
        <div className="lp-free__fineprint">
          <p>Contenido sujeto a aprobación de calidad.</p>
          <p>Goveo se reserva el derecho de admisión.</p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { FreePlanCard });
