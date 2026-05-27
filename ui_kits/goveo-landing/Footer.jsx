// Footer.jsx — store badges + tracking-wide copyright line
function Footer() {
  return (
    <footer className="lp-footer" id="descarga">
      <div className="lp-footer__stores">
        <a href="#" className="lp-store-pill">
          <span>Download on the</span>
          <strong>App Store</strong>
        </a>
        <a href="#" className="lp-store-pill">
          <span>Get it on</span>
          <strong>Google Play</strong>
        </a>
        <a href="#" className="lp-store-pill">
          <span>Open</span>
          <strong>Web App ↗</strong>
        </a>
      </div>
      <p className="lp-footer__copy">Goveo.app 2026 — Innovation in motion</p>
    </footer>
  );
}

Object.assign(window, { Footer });
