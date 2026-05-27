// HelpForm.jsx — ¿Te ayudamos? form card
function HelpForm() {
  return (
    <section className="lp-help" id="ayuda">
      <h2 className="gv-poster-lg" style={{ marginBottom: "2rem" }}>
        ¿Te <em>ayudamos</em>?
      </h2>
      <div className="lp-help__card">
        <h3 className="gv-poster-md">Ayuda</h3>
        <p className="gv-eyebrow" style={{ marginTop: "0.5rem", marginBottom: "2rem" }}>
          Te diremos si tu vídeo encaja y te guiamos.
        </p>
        <form className="lp-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Nombre del negocio" />
          <input type="url" placeholder="URL del vídeo de Instagram" className="lp-form__highlight" />
          <div className="lp-form__row">
            <input type="text" placeholder="Dirección" />
            <input type="tel" placeholder="Teléfono" />
          </div>
          <input type="email" placeholder="Email corporativo" />
          <button type="submit" className="lp-btn lp-btn--orange" style={{ marginTop: "0.5rem" }}>
            Solicitar asistencia
          </button>
        </form>
      </div>
    </section>
  );
}

Object.assign(window, { HelpForm });
