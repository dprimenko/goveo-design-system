// Field.jsx — wrapper + Input + Textarea + Select + Checkbox + Radio + Toggle

function Field({ label, required, hint, error, children, className = "" }) {
  return (
    <div className={`gp-field ${error ? "gp-field--error" : ""} ${className}`.trim()}>
      {label && (
        <label className="gp-field__label">
          {label}
          {required && <span className="gp-field__required">*</span>}
        </label>
      )}
      {children}
      {error
        ? <div className="gp-field__error"><Icon name="warning-circle" size={12} weight="fill" />{error}</div>
        : hint && <div className="gp-field__hint">{hint}</div>}
    </div>
  );
}

function Input({ iconLeft, iconRight, onTrailingClick, className = "", ...rest }) {
  if (!iconLeft && !iconRight) {
    return <input className={`gp-input ${className}`.trim()} {...rest} />;
  }
  return (
    <div className="gp-input-wrap">
      {iconLeft && <span className="gp-input-wrap__icon">{iconLeft}</span>}
      <input
        className={`gp-input ${iconRight ? "gp-input--trailing" : ""} ${className}`.trim()}
        {...rest}
      />
      {iconRight && (
        <span
          className="gp-input-wrap__icon gp-input-wrap__icon--trailing"
          onClick={onTrailingClick}
        >
          {iconRight}
        </span>
      )}
    </div>
  );
}

function Textarea({ className = "", rows = 4, ...rest }) {
  return <textarea className={`gp-textarea ${className}`.trim()} rows={rows} {...rest} />;
}

function Select({ options = [], className = "", ...rest }) {
  return (
    <div className={`gp-select ${className}`.trim()}>
      <select {...rest}>
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function Checkbox({ label, ...rest }) {
  return (
    <label className="gp-check">
      <input type="checkbox" {...rest} />
      <span className="gp-check__box" />
      {label && <span>{label}</span>}
    </label>
  );
}

function Radio({ label, ...rest }) {
  return (
    <label className="gp-radio">
      <input type="radio" {...rest} />
      <span className="gp-radio__dot" />
      {label && <span>{label}</span>}
    </label>
  );
}

function Toggle({ label, ...rest }) {
  return (
    <label className="gp-toggle">
      <input type="checkbox" {...rest} />
      <span className="gp-toggle__track" />
      {label && <span>{label}</span>}
    </label>
  );
}

function FileUpload({ title = "Sube un archivo", hint = "Arrastra o haz clic para seleccionar", accept, onChange, file }) {
  const inputRef = React.useRef(null);
  const handleClick = () => inputRef.current?.click();
  return (
    <div className={`gp-file ${file ? "gp-file--has-file" : ""}`} onClick={handleClick}>
      <span className="gp-file__icon">
        <Icon name={file ? "check" : "upload-simple"} size={20} weight="bold" />
      </span>
      <div className="gp-file__title">{file ? file.name : title}</div>
      <div className="gp-file__hint">{file ? `${Math.round(file.size / 1024)} KB` : hint}</div>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        onChange={(e) => onChange?.(e.target.files?.[0] || null)}
      />
    </div>
  );
}

Object.assign(window, { Field, Input, Textarea, Select, Checkbox, Radio, Toggle, FileUpload });
