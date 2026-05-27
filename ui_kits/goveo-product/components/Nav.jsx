// Sidebar (web) · Header · BottomBar (mobile)

function Sidebar({ items = [], brand, footer }) {
  return (
    <nav className="gp-sidebar">
      {brand && <div className="gp-sidebar__brand">{brand}</div>}
      <div className="gp-sidebar__section">
        {items.map((it, i) =>
          it.kind === "label"
            ? <div key={i} className="gp-sidebar__section-label">{it.label}</div>
            : (
              <a
                key={i}
                className={`gp-nav-item ${it.active ? "gp-nav-item--active" : ""}`}
                onClick={it.onClick}
              >
                <span className="gp-nav-item__icon">{it.icon}</span>
                <span>{it.label}</span>
                {it.badge && <span className="gp-nav-item__badge">{it.badge}</span>}
              </a>
            )
        )}
      </div>
      {footer && <div style={{ marginTop: "auto" }}>{footer}</div>}
    </nav>
  );
}

function Header({ left, search, actions }) {
  return (
    <header className="gp-header">
      {left}
      {search && <div className="gp-header__search">{search}</div>}
      {actions && <div className="gp-header__actions">{actions}</div>}
    </header>
  );
}

function BottomBar({ items = [] }) {
  return (
    <nav className="gp-bottombar">
      {items.map((it, i) => (
        <button
          key={i}
          className={`gp-bottombar__item ${it.active ? "gp-bottombar__item--active" : ""}`}
          onClick={it.onClick}
        >
          {it.fab
            ? <span className="gp-bottombar__fab">{it.icon}</span>
            : <span className="gp-bottombar__icon">{it.icon}</span>}
          {!it.fab && <span>{it.label}</span>}
        </button>
      ))}
    </nav>
  );
}

Object.assign(window, { Sidebar, Header, BottomBar });
