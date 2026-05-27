// BottomBar.jsx — 4-grid bottom nav with custom brand SVG icons
const BOTTOM_TABS = [
  { id: "feed",   label: "Feed",    icon: "../../assets/icons/video.svg" },
  { id: "map",    label: "Mapa",    icon: "../../assets/icons/earth.svg" },
  { id: "shop",   label: "Tiendas", icon: "../../assets/icons/shop.svg" },
  { id: "me",     label: "Perfil",  icon: "../../assets/icons/person.svg" },
];

function BottomBar({ selected, onSelect, dark }) {
  return (
    <nav className={"gv-bottombar" + (dark ? " gv-bottombar--dark" : "")}>
      {BOTTOM_TABS.map((t) => (
        <button
          key={t.id}
          className={"gv-bottombar__item" + (selected === t.id ? " gv-bottombar__item--selected" : "")}
          onClick={() => onSelect(t.id)}
        >
          <img src={t.icon} alt="" />
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

Object.assign(window, { BottomBar });
