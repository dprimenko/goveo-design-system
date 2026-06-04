/* global React, ReactDOM, window */
const { useState, useRef, useEffect } = React;

function Header() {
  return (
    <header className="gv-header">
      <button className="gv-header__icon" aria-label="Perfil"><i className="ph ph-user"></i></button>
      <img className="gv-header__logo" src="home/assets/goveo-logo.png" alt="Goveo" />
      <div className="gv-header__right">
        <button className="gv-header__icon" aria-label="Mapa"><i className="ph ph-map-trifold"></i></button>
        <button className="gv-header__icon" aria-label="Buscar"><i className="ph ph-magnifying-glass"></i></button>
      </div>
    </header>
  );
}

function BottomBar() {
  const items = [
    { id: "lugares", icon: "ph-globe-hemisphere-west" },
    { id: "ocio", icon: "ph-martini" },
    { id: "home", icon: "ph-compass", active: true },
    { id: "cultura", icon: "ph-mask-happy" },
    { id: "recientes", icon: "ph-clock-countdown" },
  ];
  const [sel, setSel] = useState("home");
  return (
    <nav className="gv-nav">
      {items.map((it) => (
        <button
          key={it.id}
          className={`gv-nav__btn ${sel === it.id ? "is-active" : ""}`}
          onClick={() => setSel(it.id)}
          aria-label={it.id}
        >
          <i className={`${sel === it.id ? "ph-fill" : "ph"} ${it.icon}`}></i>
        </button>
      ))}
    </nav>
  );
}

function HomeApp() {
  const [turismoVids, setTurismoVids] = useState(window.TURISMO_VIDEOS);
  const [negocioVids, setNegocioVids] = useState(window.NEGOCIOS_VIDEOS);
  const [loadT, setLoadT] = useState(false);
  const [loadN, setLoadN] = useState(false);

  const [tab, setTab] = useState("turismo");
  const [businesses, setBusinesses] = useState(window.BUSINESSES);
  const [loadBiz, setLoadBiz] = useState(false);

  const [showTop, setShowTop] = useState(false);
  const scrollRef = useRef(null);
  const bizLockRef = useRef(false);

  const categories = tab === "turismo" ? window.CATEGORIES_TURISMO : window.CATEGORIES_COMPRAS;

  // ----- rail: refresh -----
  function refreshTurismo() { setTurismoVids(window.moreVideos("Turismo", 6)); }
  function refreshNegocio() { setNegocioVids(window.moreVideos("Negocio", 6)); }

  // ----- rail: load more -----
  function moreTurismo() {
    if (loadT) return;
    setLoadT(true);
    setTimeout(() => { setTurismoVids((p) => [...p, ...window.moreVideos("Turismo", 3)]); setLoadT(false); }, 900);
  }
  function moreNegocio() {
    if (loadN) return;
    setLoadN(true);
    setTimeout(() => { setNegocioVids((p) => [...p, ...window.moreVideos("Negocio", 3)]); setLoadN(false); }, 900);
  }

  // ----- vertical: infinite scroll for businesses -----
  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setShowTop(el.scrollTop > 380);
    if (bizLockRef.current) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 220) {
      bizLockRef.current = true;
      setLoadBiz(true);
      setTimeout(() => {
        setBusinesses((p) => [...p, ...window.moreBusinesses(4)]);
        setLoadBiz(false);
        bizLockRef.current = false;
      }, 950);
    }
  }

  function scrollTop() {
    scrollRef.current && scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="gv-app">
      <Header />
      <main className="gv-scroll" ref={scrollRef} onScroll={onScroll}>
        <VideoRail
          accent="Turismo y Cultura"
          items={turismoVids}
          onRefresh={refreshTurismo}
          onLoadMore={moreTurismo}
          loadingMore={loadT}
        />
        <VideoRail
          accent="Negocios físicos"
          items={negocioVids}
          onRefresh={refreshNegocio}
          onLoadMore={moreNegocio}
          loadingMore={loadN}
        />
        <BusinessList
          tab={tab}
          onTab={setTab}
          categories={categories}
          businesses={businesses}
          loadingMore={loadBiz}
        />
        <div className="gv-scroll__foot">Has visto los lugares más cercanos</div>
      </main>

      <button className={`gv-fab ${showTop ? "is-show" : ""}`} onClick={scrollTop} aria-label="Subir">
        <i className="ph-bold ph-arrow-up"></i>
      </button>

      <BottomBar />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<HomeApp />);
