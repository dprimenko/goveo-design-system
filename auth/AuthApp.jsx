/* global React */
const { useState, useRef } = React;

/* ---------- Brand glyphs (login social) ---------- */
function GoogleGlyph() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#000" d="M16.36 12.78c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-2.99-.79-1.54.02-2.96.9-3.75 2.27-1.6 2.78-.41 6.9 1.15 9.16.76 1.11 1.67 2.35 2.86 2.31 1.15-.05 1.58-.74 2.97-.74 1.39 0 1.77.74 2.98.72 1.23-.02 2.01-1.13 2.76-2.24.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.65zM14.09 5.86c.64-.77 1.07-1.85.95-2.92-.92.04-2.03.61-2.69 1.38-.59.68-1.11 1.78-.97 2.83 1.03.08 2.07-.52 2.71-1.29z"/>
    </svg>
  );
}

function SocialButtons({ mode }) {
  const verb = mode === "register" ? "Regístrate" : "Continúa";
  return (
    <div className="auth-social">
      <button type="button" className="auth-social__btn">
        <GoogleGlyph />
        <span>{verb} con Google</span>
      </button>
      <button type="button" className="auth-social__btn">
        <AppleGlyph />
        <span>{verb} con Apple</span>
      </button>
    </div>
  );
}

/* ---------- Reusable field ---------- */
function Field({ icon, label, type = "text", placeholder, value, onChange, autoComplete }) {
  return (
    <div className="auth-field">
      <label className="auth-label">{label}</label>
      <div className="auth-input">
        <span className="auth-input__icon"><i className={`ph ph-${icon}`}></i></span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
}

function PasswordField({ label, placeholder, value, onChange, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <div className="auth-field">
      <label className="auth-label">{label}</label>
      <div className="auth-input">
        <span className="auth-input__icon"><i className="ph ph-lock-simple"></i></span>
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className="auth-input__toggle"
          aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
          onClick={() => setShow((s) => !s)}
        >
          <i className={`ph ${show ? "ph-eye-slash" : "ph-eye"}`}></i>
        </button>
      </div>
    </div>
  );
}

/* ---------- Login form ---------- */
function LoginForm({ onForgot }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  return (
    <div className="auth-anim" key="login">
      <SocialButtons mode="login" />
      <div className="auth-divider">o inicia sesión con tu email</div>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <Field icon="envelope-simple" label="Email" type="email"
          placeholder="tu@email.com" value={email} onChange={setEmail} autoComplete="email" />
        <PasswordField label="Contraseña" placeholder="Tu contraseña"
          value={pwd} onChange={setPwd} autoComplete="current-password" />
        <button type="button" className="auth-forgot" onClick={onForgot}>
          ¿Olvidaste tu contraseña?
        </button>
        <button type="submit" className="auth-submit">Iniciar sesión</button>
      </form>
      <p className="auth-foot">
        Al continuar aceptas los <a href="#">Términos</a> y la <a href="#">Política de privacidad</a> de Goveo.
      </p>
    </div>
  );
}

/* ---------- Register form ---------- */
function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [agree, setAgree] = useState(false);
  return (
    <div className="auth-anim" key="register">
      <SocialButtons mode="register" />
      <div className="auth-divider">o regístrate con tu email</div>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <Field icon="user" label="Nombre" placeholder="¿Cómo te llamas?"
          value={name} onChange={setName} autoComplete="name" />
        <Field icon="envelope-simple" label="Email" type="email"
          placeholder="tu@email.com" value={email} onChange={setEmail} autoComplete="email" />
        <PasswordField label="Contraseña" placeholder="Mínimo 8 caracteres"
          value={pwd} onChange={setPwd} autoComplete="new-password" />
        <label className="auth-terms">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span className="auth-terms__box"><i className="ph-bold ph-check"></i></span>
          <span className="auth-terms__text">
            Acepto los <a href="#">Términos de uso</a> y la <a href="#">Política de privacidad</a> de Goveo.
          </span>
        </label>
        <button type="submit" className="auth-submit" disabled={!agree}>Crear cuenta</button>
      </form>
    </div>
  );
}

/* ---------- Forgot-password screen ---------- */
function ForgotScreen({ onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="auth-inner">
        <button className="auth-back" onClick={onBack} aria-label="Volver">
          <i className="ph ph-arrow-left"></i>
        </button>
        <div className="auth-sent auth-anim">
          <div className="auth-sent__badge"><i className="ph ph-envelope-open"></i></div>
          <h2>Revisa tu correo</h2>
          <p>Si <strong>{email || "tu email"}</strong> tiene una cuenta en Goveo, te hemos enviado un enlace para restablecer tu contraseña.</p>
          <button className="auth-submit" style={{ maxWidth: 240 }} onClick={onBack}>
            Volver a iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-inner auth-anim">
      <button className="auth-back" onClick={onBack} aria-label="Volver">
        <i className="ph ph-arrow-left"></i>
      </button>
      <div className="auth-lead">
        <h2>Recupera tu contraseña</h2>
        <p>Introduce tu email y te enviaremos un enlace para crear una nueva contraseña.</p>
      </div>
      <form className="auth-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <Field icon="envelope-simple" label="Email" type="email"
          placeholder="tu@email.com" value={email} onChange={setEmail} autoComplete="email" />
        <button type="submit" className="auth-submit" disabled={!email}>Enviar enlace</button>
      </form>
    </div>
  );
}

/* ---------- Root ---------- */
function AuthApp() {
  const [screen, setScreen] = useState("auth"); // 'auth' | 'forgot'
  const [tab, setTab] = useState("login"); // 'login' | 'register'

  return (
    <div className="auth-stage">
      <div className="auth-bg">
        <image-slot
          id="auth-feed-bg"
          class="auth-bg__slot"
          fit="cover"
          src="auth/assets/goveo-app-icon.jpg"
          placeholder="Suelta un fotograma del feed"
        ></image-slot>
        <div className="auth-bg__scrim"></div>
      </div>

      <div className="auth-scroll">
        <div className="auth-statusbar"></div>

        {screen === "forgot" ? (
          <ForgotScreen onBack={() => setScreen("auth")} />
        ) : (
          <div className="auth-inner">
            <header className="auth-brand">
              <img className="auth-brand__icon" src="auth/assets/goveo-app-icon.jpg" alt="Goveo" />
              <div>
                <h1 className="auth-brand__title">
                  {tab === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
                </h1>
                <p className="auth-brand__sub">
                  {tab === "login"
                    ? "Descubre qué pasa cerca de ti, en vídeo y en tiempo real."
                    : "Únete a Goveo y empieza a explorar tu ciudad en vídeo."}
                </p>
              </div>
            </header>

            <div className="auth-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={tab === "login"}
                className="auth-tab"
                onClick={() => setTab("login")}
              >Iniciar sesión</button>
              <button
                role="tab"
                aria-selected={tab === "register"}
                className="auth-tab"
                onClick={() => setTab("register")}
              >Crear cuenta</button>
            </div>

            {tab === "login"
              ? <LoginForm onForgot={() => setScreen("forgot")} />
              : <RegisterForm />}
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AuthApp />);
