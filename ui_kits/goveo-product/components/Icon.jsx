// Icon.jsx — Phosphor icon helper (loaded via CDN <link>)
// Usage: <Icon name="map-pin" />  ·  <Icon name="upload" weight="bold" size={18} />
function Icon({ name, weight = "regular", size = 16, className = "", style }) {
  const w = weight === "regular" ? "ph" : `ph-${weight}`;
  return (
    <i
      className={`${w} ph-${name} ${className}`}
      style={{ fontSize: size, lineHeight: 1, display: "inline-flex", ...style }}
      aria-hidden="true"
    />
  );
}

Object.assign(window, { Icon });
