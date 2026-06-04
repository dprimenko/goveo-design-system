/* global React, window */

/* ============================================================
   Tabs (Turismo / Compras Locales) + categorías + listado
   ============================================================ */
function SegTabs({ tab, onTab }) {
  return (
    <div className="gv-seg" role="tablist">
      {[["turismo", "Turismo"], ["compras", "Compras Locales"]].map(([id, label]) => (
        <button
          key={id}
          role="tab"
          aria-selected={tab === id}
          className="gv-seg__btn"
          onClick={() => onTab(id)}
        >{label}</button>
      ))}
    </div>
  );
}

function CategoryRail({ categories }) {
  return (
    <div className="gv-cats">
      {categories.map((c) => (
        <button key={c.id} className="gv-cat">
          <span className="gv-cat__circle" style={{ "--hue": c.hue }}>
            <i className={`ph ${c.icon}`}></i>
          </span>
          <span className="gv-cat__label">{c.label}</span>
        </button>
      ))}
    </div>
  );
}

function BusinessCard({ b }) {
  return (
    <button className="gv-biz">
      <span className="gv-biz__logo" style={{ "--hue": b.hue }}>{b.initials}</span>
      <span className="gv-biz__body">
        <span className="gv-biz__name">{b.name}</span>
        <span className="gv-biz__addr">{b.addr}</span>
        <span className="gv-biz__dist"><i className="ph-fill ph-map-pin"></i>{b.dist}</span>
      </span>
      <i className="ph ph-caret-right gv-biz__chev"></i>
    </button>
  );
}

function BusinessList({ tab, onTab, categories, businesses, loadingMore }) {
  return (
    <div className="gv-list">
      <SegTabs tab={tab} onTab={onTab} />
      <CategoryRail categories={categories} />
      <div className="gv-list__items">
        {businesses.map((b) => <BusinessCard key={b.id} b={b} />)}
        {loadingMore && (
          <div className="gv-biz gv-biz--skeleton">
            <span className="gv-biz__logo gv-biz__logo--sk"></span>
            <span className="gv-biz__body">
              <span className="gv-sk gv-sk--name"></span>
              <span className="gv-sk gv-sk--addr"></span>
              <span className="gv-sk gv-sk--dist"></span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { SegTabs, CategoryRail, BusinessCard, BusinessList });
