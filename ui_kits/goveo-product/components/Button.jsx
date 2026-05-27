// Button.jsx — primary / secondary / ghost / danger · sm / md / lg · loading
function Button({
  variant = "secondary",
  size = "md",
  block = false,
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  iconOnly,
  children,
  className = "",
  ...rest
}) {
  const classes = [
    "gp-btn",
    `gp-btn--${variant}`,
    size !== "md" && `gp-btn--${size}`,
    block && "gp-btn--block",
    iconOnly && "gp-btn--icon-only",
    loading && "gp-btn--loading",
    className,
  ].filter(Boolean).join(" ");
  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {iconLeft && <span className="gp-btn__icon">{iconLeft}</span>}
      {iconOnly ?? children}
      {iconRight && <span className="gp-btn__icon">{iconRight}</span>}
    </button>
  );
}

Object.assign(window, { Button });
