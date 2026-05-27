// PricingGrid.jsx — billing-cycle tabs + 4-tier plan grid
const PRICING_DATA = {
  premium:  { m: 29,  s: 147, a: 243, saveS: "Ahorras 26€",  saveA: "Ahorras 105€" },
  platinum: { m: 59,  s: 299, a: 495, saveS: "Ahorras 53€",  saveA: "Ahorras 213€" },
  boost:    { m: 150, s: 765, a: 1260, saveS: "Ahorras 135€", saveA: "Ahorras 540€" },
};

function PriceBlock({ plan, cycle, glow }) {
  const data = PRICING_DATA[plan];
  const key = cycle === "mensual" ? "m" : cycle === "semestral" ? "s" : "a";
  const price = data[key];
  const old = Math.round(price * 1.20);
  const save = cycle === "semestral" ? data.saveS : cycle === "anual" ? data.saveA : null;
  return (
    <div className="lp-plan__price">
      <div className="lp-plan__old">{old}€</div>
      <div className="lp-plan__nowrap">
        <span className={"lp-plan__now" + (glow ? " lp-glow" : "")}>{price}€</span>
        <span className="lp-plan__per">/pago</span>
      </div>
      <div className="lp-plan__save" style={{ opacity: save ? 1 : 0 }}>{save || "Ahorro"}</div>
    </div>
  );
}

function FreePlanColumn() {
  return (
    <div className="lp-plan">
      <div className="lp-plan__head">
        <h3 className="gv-poster-md">Free</h3>
        <div className="gv-eyebrow">Prueba la revolución</div>
      </div>
      <div className="lp-plan__price">
        <div className="lp-plan__nowrap">
          <span className="lp-plan__now">0€</span>
        </div>
        <div className="lp-plan__save" style={{ opacity: 1, color: "var(--naranja-goveo)" }}>
          Haz crecer tu negocio sin coste.
        </div>
      </div>
      <ul className="lp-plan__feats">
        <li className="lp-plan__group">Negocios</li>
        <li><span className="lp-bullet">✔</span> Perfil Publisher</li>
        <li><span className="lp-bullet">✔</span> 1 GeoClip Presentación (30 s)</li>
        <li><span className="lp-bullet">✔</span> Visibilidad en zona de proximidad</li>
        <li><span className="lp-bullet">✔</span> Geolocalización exacta</li>
        <li><span className="lp-bullet">✔</span> Verificación periódica</li>
        <li><span className="lp-bullet">✔</span> Publicaciones de eventos</li>
        <li className="lp-plan__group">Creadores de contenido</li>
        <li><span className="lp-bullet">✔</span> Vídeo de lugares y cultura</li>
        <li><span className="lp-bullet">✔</span> Vídeos de eventos</li>
      </ul>
      <div className="lp-plan__fineprint">Sin compromiso</div>
      <button
        className="lp-btn lp-btn--outline"
        onClick={() => window.dispatchEvent(new Event("lp-open-free"))}
      >
        Empieza gratis
      </button>
    </div>
  );
}

function PaidPlanColumn({ plan, cycle, name, eyebrow, glyph, featured, features, ctaLabel, ctaStyle }) {
  return (
    <div className={"lp-plan" + (featured ? " lp-plan--featured" : "")}>
      {featured && <div className="lp-plan__badge">Completo</div>}
      <div className="lp-plan__head">
        <h3 className="gv-poster-md">{name}</h3>
        <div className="gv-eyebrow" style={featured ? { color: "var(--naranja-goveo)" } : null}>
          {eyebrow}
        </div>
      </div>
      <PriceBlock plan={plan} cycle={cycle} glow={featured} />
      <ul className="lp-plan__feats">
        {features.map((f, i) => (
          <li key={i}>
            <span className={"lp-bullet" + (glyph !== "✔" ? " lp-bullet--big" : "")}>{glyph}</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="lp-plan__fineprint">+ I.V.A.</div>
      <button className={"lp-btn " + ctaStyle}>{ctaLabel}</button>
    </div>
  );
}

function PricingGrid() {
  const [cycle, setCycle] = React.useState("mensual");
  return (
    <section className="lp-pricing" id="tarifas">
      <div className="lp-pricing__head">
        <h2 className="gv-poster-lg">
          Potencia <em>tu negocio</em> en serio
        </h2>
        <h2 className="gv-poster-xl" style={{ marginTop: "0.5rem" }}>
          configura <em>tu plan</em>
        </h2>
        <h2 className="gv-poster-lg" style={{ marginTop: "1.5rem" }}>
          Oferta <em>Lanzamiento</em> adicional 20%
        </h2>
        <div className="lp-tabs">
          {["mensual", "semestral", "anual"].map(c => (
            <button
              key={c}
              className={"lp-tab" + (cycle === c ? " lp-tab--active" : "")}
              onClick={() => setCycle(c)}
            >
              {c === "mensual" ? "Mensual" : c === "semestral" ? "Semestral (-15%)" : "Anual (-30%)"}
            </button>
          ))}
        </div>
      </div>

      <div className="lp-pricing__grid">
        <FreePlanColumn />
        <PaidPlanColumn
          plan="premium" cycle={cycle}
          name="Premium" eyebrow="Visibilidad local" glyph="✔"
          features={[
            "Perfil profesional",
            "Visibilidad prioritaria",
            "Perfil local",
            "Botones Web/WhatsApp/Reserva",
            "Hasta 20 vídeos",
            "Directo: sin comisiones",
          ]}
          ctaLabel="Contratar Premium"
          ctaStyle="lp-btn--white"
        />
        <PaidPlanColumn
          plan="platinum" cycle={cycle} featured
          name="Platinum" eyebrow="Potencia perfil" glyph="★"
          features={[
            "Premium y además:",
            "Exclusividad. Nº limitado por categoría y zona",
            "Visibilidad provincial y nacional",
            "GeoStories",
            "Hasta 50 vídeos",
            "Hasta 200 productos",
            "Estadísticas",
          ]}
          ctaLabel="Activar Platinum"
          ctaStyle="lp-btn--orange"
        />
        <PaidPlanColumn
          plan="boost" cycle={cycle}
          name="Boost" eyebrow="Dominio total" glyph="⚡"
          features={[
            "Visibilidad prioritaria",
            "Dominio en zona",
            "Top 3 categoría",
            "Soporte VIP",
          ]}
          ctaLabel="Solicitar Boost"
          ctaStyle="lp-btn--ghost"
        />
      </div>

      <p className="lp-pricing__foot">
        Sujeto a <em>calidad</em> del negocio y contenidos
      </p>
    </section>
  );
}

Object.assign(window, { PricingGrid });
