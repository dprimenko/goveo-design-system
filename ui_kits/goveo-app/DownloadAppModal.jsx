// DownloadAppModal.jsx — 310px modal; recreates components/modal/DownloadAppModal.tsx
//
// Store badges follow the official Apple Marketing & Google Play brand guidelines:
//  · App Store: black surface, white Apple logo + "Descargar en el · App Store"
//    https://developer.apple.com/app-store/marketing/guidelines/
//  · Google Play: black surface, 4-color Play triangle + "Disponible en · Google Play"
//    https://play.google.com/intl/en_us/badges/
// Both badges keep the canonical 3:1 (40 × 120 dp) ratio and the specific
// type sizes/letter-spacings called out in those guidelines.

function AppStoreBadge({ href = "#", onClick }) {
  return (
    <a
      className="store-badge store-badge--apple"
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener"
      aria-label="Descárgalo en App Store"
    >
      <svg
        className="store-badge__svg"
        viewBox="0 0 120 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="120" height="40" rx="6" fill="#000" />
        <rect
          x="0.5" y="0.5" width="119" height="39" rx="5.5"
          fill="none" stroke="#A6A6A6" strokeWidth="1"
        />
        {/* Apple logo */}
        <g transform="translate(11.5 8) scale(0.92)" fill="#fff">
          <path d="M17.05 12.04c-.03-3.02 2.47-4.47 2.58-4.55-1.41-2.06-3.6-2.34-4.38-2.37-1.86-.19-3.64 1.1-4.59 1.1-.96 0-2.41-1.07-3.96-1.04-2.04.03-3.92 1.18-4.97 3-2.12 3.67-.54 9.1 1.52 12.08 1.01 1.46 2.2 3.1 3.76 3.04 1.51-.06 2.08-.98 3.91-.98 1.82 0 2.34.98 3.94.95 1.63-.03 2.66-1.48 3.65-2.95 1.15-1.69 1.63-3.33 1.65-3.41-.04-.02-3.17-1.22-3.2-4.83l.09-.04zM14.04 3.24c.84-1.02 1.4-2.43 1.25-3.83-1.21.05-2.66.8-3.52 1.82-.78.9-1.45 2.34-1.27 3.71 1.34.11 2.7-.69 3.54-1.7z" />
        </g>
        {/* "Descárgalo en" */}
        <text
          x="40" y="16"
          fill="#fff"
          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
          fontSize="7"
          fontWeight="400"
          letterSpacing="0.04em"
        >
          Descárgalo en
        </text>
        {/* "App Store" */}
        <text
          x="40" y="30"
          fill="#fff"
          fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
          fontSize="14.5"
          fontWeight="500"
          letterSpacing="-0.02em"
        >
          App Store
        </text>
      </svg>
    </a>
  );
}

function GooglePlayBadge({ href = "#", onClick }) {
  return (
    <a
      className="store-badge store-badge--play"
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener"
      aria-label="Disponible en Google Play"
    >
      <svg
        className="store-badge__svg"
        viewBox="0 0 135 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="play-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#00A0FF" />
            <stop offset="100%" stopColor="#60E1FF" />
          </linearGradient>
          <linearGradient id="play-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#00F076" />
            <stop offset="100%" stopColor="#00A971" />
          </linearGradient>
          <linearGradient id="play-yellow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#FFCE00" />
            <stop offset="100%" stopColor="#FFBD00" />
          </linearGradient>
          <linearGradient id="play-red" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#FF3A44" />
            <stop offset="100%" stopColor="#C31162" />
          </linearGradient>
        </defs>

        <rect width="135" height="40" rx="6" fill="#000" />
        <rect
          x="0.5" y="0.5" width="134" height="39" rx="5.5"
          fill="none" stroke="#A6A6A6" strokeWidth="1"
        />

        {/* Google Play triangle — 4 wedges sharing a common right-side apex */}
        <g transform="translate(11 8)">
          {/* Blue: left side of the fan, from top-left to bottom-left, apex at right tip */}
          <path
            d="M0.6 0.3 11.4 11.5 0.6 22.7 C0.3 22.5 0 22.1 0 21.6 V1.4 C0 0.9 0.3 0.5 0.6 0.3 Z"
            fill="url(#play-blue)"
          />
          {/* Yellow: top wedge (apex points up-right to logo tip) */}
          <path
            d="M16.7 6.7 11.4 11.5 0.6 0.3 C1.1 0.0 1.7 0.0 2.3 0.3 L16.7 6.7 Z"
            fill="url(#play-yellow)"
          />
          {/* Red: bottom wedge */}
          <path
            d="M0.6 22.7 11.4 11.5 16.7 16.3 2.3 22.7 C1.7 23.0 1.1 23.0 0.6 22.7 Z"
            fill="url(#play-red)"
          />
          {/* Green: right tip (apex), small wedge between yellow/red */}
          <path
            d="M11.4 11.5 16.7 6.7 20.1 8.2 C21 8.7 21 9.5 21 11.5 C21 13.5 21 14.3 20.1 14.8 L16.7 16.3 11.4 11.5 Z"
            fill="url(#play-green)"
          />
        </g>

        {/* "DISPONIBLE EN" */}
        <text
          x="40" y="15"
          fill="#fff"
          fontFamily="Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
          fontSize="7"
          fontWeight="400"
          letterSpacing="0.08em"
        >
          DISPONIBLE EN
        </text>
        {/* "Google Play" */}
        <text
          x="40" y="30"
          fill="#fff"
          fontFamily="Roboto, -apple-system, BlinkMacSystemFont, sans-serif"
          fontSize="14.5"
          fontWeight="500"
          letterSpacing="0.005em"
        >
          Google Play
        </text>
      </svg>
    </a>
  );
}

function DownloadAppModal({ onClose }) {
  return (
    <div className="gv-modal__backdrop" onClick={onClose}>
      <div className="gv-modal" onClick={(e) => e.stopPropagation()}>
        <button className="gv-modal__close" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="gv-modal__logo">
          <img src="../../assets/goveo-app-icon.jpg" alt="Goveo" />
        </div>
        <h3 className="gv-modal__title">Disfruta de una experiencia completa en la aplicación</h3>
        <p className="gv-modal__sub">Disfruta de más vídeos y funciones geniales en la aplicación.</p>
        <button className="gv-btn gv-btn--primary">Abrir Goveo</button>
        <button className="gv-btn gv-btn--text" onClick={onClose}>Ahora no</button>
        <div className="gv-modal__stores">
          <AppStoreBadge href="https://apps.apple.com/es/app/goveo/id1480569862" />
          <GooglePlayBadge href="https://play.google.com/store/apps/details?id=app.goveo.android" />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DownloadAppModal, AppStoreBadge, GooglePlayBadge });

