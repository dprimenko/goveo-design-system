// Modal · Drawer · Toast · EmptyState · LoadingState · ErrorState · Skeleton

function Modal({ title, onClose, size = "md", children, footer }) {
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="gp-modal-backdrop" onClick={onClose}>
      <div
        className={`gp-modal ${size !== "md" ? `gp-modal--${size}` : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="gp-modal__head">
            <h3 className="gp-modal__title">{title}</h3>
            <button className="gp-modal__close" onClick={onClose} aria-label="Cerrar">
              <Icon name="x" size={16} weight="bold" />
            </button>
          </div>
        )}
        <div className="gp-modal__body">{children}</div>
        {footer && <div className="gp-modal__foot">{footer}</div>}
      </div>
    </div>
  );
}

function Drawer({ title, onClose, children, footer }) {
  return (
    <div className="gp-drawer-backdrop" onClick={onClose}>
      <aside className="gp-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="gp-drawer__head">
          <h3 className="gp-modal__title" style={{ flex: 1 }}>{title}</h3>
          <button className="gp-modal__close" onClick={onClose}>
            <Icon name="x" size={16} weight="bold" />
          </button>
        </div>
        <div className="gp-drawer__body">{children}</div>
        {footer && <div className="gp-drawer__foot">{footer}</div>}
      </aside>
    </div>
  );
}

function EmptyState({ icon = "magnifying-glass", title, sub, actions, variant }) {
  return (
    <div className={`gp-state ${variant ? `gp-state--${variant}` : ""}`}>
      <span className="gp-state__icon"><Icon name={icon} size={26} weight="duotone" /></span>
      <h4 className="gp-state__title">{title}</h4>
      {sub && <p className="gp-state__sub">{sub}</p>}
      {actions && <div className="gp-state__actions">{actions}</div>}
    </div>
  );
}

function LoadingState({ label = "Cargando…" }) {
  return (
    <div className="gp-state">
      <span className="gp-spinner" />
      <p className="gp-state__sub">{label}</p>
    </div>
  );
}

function Skeleton({ w = "100%", h = 12, rounded, style }) {
  return (
    <span
      className="gp-skeleton"
      style={{ width: w, height: h, borderRadius: rounded || undefined, ...style }}
    />
  );
}

// Toast — controlled. <ToastStack toasts={[…]} onClose={fn} />
function ToastStack({ toasts = [], onClose }) {
  return (
    <div className="gp-toast-stack">
      {toasts.map((t) => (
        <div key={t.id} className={`gp-toast ${t.variant ? `gp-toast--${t.variant}` : ""}`}>
          <span className="gp-toast__icon">
            <Icon
              name={
                t.variant === "success" ? "check"
                : t.variant === "danger" ? "warning"
                : t.variant === "info" ? "info"
                : "bell"
              }
              size={12}
              weight="bold"
            />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="gp-toast__title">{t.title}</p>
            {t.msg && <p className="gp-toast__msg">{t.msg}</p>}
          </div>
          <button className="gp-toast__close" onClick={() => onClose?.(t.id)}>
            <Icon name="x" size={14} weight="bold" />
          </button>
        </div>
      ))}
    </div>
  );
}

// Simple imperative API: useToasts() → { toasts, push, close }
function useToasts() {
  const [toasts, setToasts] = React.useState([]);
  const push = (toast) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, ...toast }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), toast.duration ?? 3500);
  };
  const close = (id) => setToasts((t) => t.filter((x) => x.id !== id));
  return { toasts, push, close };
}

Object.assign(window, { Modal, Drawer, EmptyState, LoadingState, Skeleton, ToastStack, useToasts });
