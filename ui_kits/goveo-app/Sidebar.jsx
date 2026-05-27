// Sidebar.jsx — left drawer; recreates MobileSidebar.tsx
function Sidebar({ onClose }) {
  return (
    <div className="gv-sidebar__backdrop" onClick={onClose}>
      <aside className="gv-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="gv-sidebar__head">
          <i className="ph ph-list" style={{ fontSize: 28 }}></i>
          <img src="../../assets/goveo-logo.png" alt="Goveo" />
        </div>
        <ul className="gv-sidebar__nav">
          <li><a href="#">Turismo / Cultura</a></li>
          <li><a href="#">Consume mejor cerca</a></li>
          <li><a href="#">Local influencers</a></li>
          <li className="gv-sidebar__cta">
            <a href="#">¿Tienes un negocio?</a>
          </li>
        </ul>
        <div className="gv-sidebar__download">
          <div className="gv-sidebar__download-label">Descarga la app:</div>
          <AppStoreBadge href="https://apps.apple.com/es/app/goveo/id1480569862" />
          <GooglePlayBadge href="https://play.google.com/store/apps/details?id=app.goveo.android" />
        </div>
        <div className="gv-sidebar__footer">© 2026 Goveo</div>
      </aside>
    </div>
  );
}

Object.assign(window, { Sidebar });
