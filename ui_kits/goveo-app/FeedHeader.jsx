// FeedHeader.jsx — sticky top with menu pill, location chip, search pill
function FeedHeader({ onOpenSidebar, onOpenSearch, onSelectLocation }) {
  return (
    <div className="gv-feed__header">
      <button className="gv-icon-pill" onClick={onOpenSidebar} aria-label="Menu">
        <i className="ph ph-list"></i>
      </button>
      <button className="gv-chip" onClick={onSelectLocation}>
        <i className="ph ph-map-pin"></i>
        <span>Sevilla, España</span>
      </button>
      <button className="gv-icon-pill" onClick={onOpenSearch} aria-label="Search">
        <i className="ph ph-magnifying-glass"></i>
      </button>
    </div>
  );
}

Object.assign(window, { FeedHeader });
