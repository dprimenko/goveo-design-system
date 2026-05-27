// PromoShare.jsx — orange-blur promo with Instagram share CTA
function PromoShare() {
  return (
    <section className="lp-promo">
      <div className="lp-promo__inner">
        <div className="lp-promo__copy">
          <div className="lp-promo__chip">Promo exclusiva</div>
          <h2 className="gv-poster-lg">
            Comparte <em>en redes</em>
          </h2>
          <h3 className="gv-poster-lg" style={{ marginTop: "0.5rem" }}>
            Consigue seguidores <em>y ahorra</em>
          </h3>
          <p className="lp-promo__body">
            Publica esta gráfica en tus historias o perfil de Instagram para
            <span> atraer seguidores a tu perfil de Goveo</span>.
          </p>
          <p className="lp-promo__body">
            Te damos un <span>20% de descuento</span> durante 6 meses en cualquier plan.
          </p>
          <button className="lp-btn lp-btn--white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 10, verticalAlign: -3 }}>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Descargar gráfica
          </button>
        </div>
        <div className="lp-promo__image">
          <div className="lp-promo__blur"></div>
          <div className="lp-promo__frame">
            <div className="lp-promo__poster">
              <img src="../../assets/goveo-logo.png" alt="" />
              <div className="lp-promo__tag">#goveo.app</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PromoShare });
