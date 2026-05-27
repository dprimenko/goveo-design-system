// Badges + chips + tags
function Badge({ variant = "default", dot = false, children, className = "" }) {
  return (
    <span className={`gp-badge ${variant !== "default" ? `gp-badge--${variant}` : ""} ${dot ? "gp-badge--dot" : ""} ${className}`.trim()}>
      {children}
    </span>
  );
}

function Chip({ active, onClose, iconLeft, children, ...rest }) {
  return (
    <button type="button" className={`gp-chip ${active ? "gp-chip--active" : ""}`} {...rest}>
      {iconLeft && <span style={{display:"inline-flex"}}>{iconLeft}</span>}
      {children}
      {onClose && (
        <span
          className="gp-chip__close"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
          <Icon name="x" size={10} weight="bold" />
        </span>
      )}
    </button>
  );
}

function Avatar({ src, name, size = "md", ring = false }) {
  const initials = name ? name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase() : "?";
  const cls = ["gp-avatar", `gp-avatar--${size}`, ring && "gp-avatar--ring"].filter(Boolean).join(" ");
  return (
    <span className={cls}>
      {src ? <img src={src} alt={name || ""} /> : initials}
    </span>
  );
}

Object.assign(window, { Badge, Chip, Avatar });
