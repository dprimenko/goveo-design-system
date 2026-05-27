// Banner.jsx — top hero with city image fade-to-black, logo cap, hero headline stack
function LandingBanner() {
  return (
    <>
      <div className="lp-banner">
        <div
          className="lp-banner__bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1600')",
          }}
        ></div>
        <div className="lp-banner__fade"></div>
      </div>

      <div className="lp-logo-cap">
        <img src="../../assets/goveo-app-icon.jpg" alt="Goveo" />
      </div>

      <section className="lp-hero">
        <h2 className="gv-poster-lg">
          Únete <em>Gratis</em> a la Vídeo Smart City
        </h2>
        <h2 className="gv-poster-lg" style={{ marginTop: "1.5rem" }}>
          El nuevo <em>Marketing</em> local
        </h2>
        <h1
          className="gv-poster-xl"
          style={{ margin: "1.5rem 0", textWrap: "balance" }}
        >
          geolocaliza <em className="lp-glow">tu mejor Reel</em>
        </h1>
        <p className="lp-hero__sub">
          Basta de fotos y de caos/ruido de las Redes
        </p>
        <h2 className="gv-poster-lg">
          Atrae <em>los clientes</em> fácilmente
        </h2>
        <p className="lp-hero__sub" style={{ marginTop: "1rem" }}>
          Bienvenidos al{" "}
          <span style={{ color: "#fff", fontWeight: 700 }}>
            "Instagram" de los negocios físicos
          </span>
          .
        </p>
      </section>
    </>
  );
}

Object.assign(window, { LandingBanner });
