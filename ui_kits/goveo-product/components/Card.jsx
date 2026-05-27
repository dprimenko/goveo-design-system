// Card primitives + GeoClip + Business + Product + Event cards

function Card({ children, interactive = false, className = "", ...rest }) {
  return (
    <div className={`gp-card ${interactive ? "gp-card--interactive" : ""} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}
function CardBody({ children, className = "" }) { return <div className={`gp-card__body ${className}`.trim()}>{children}</div>; }
function CardMedia({ children, className = "" }) { return <div className={`gp-card__media ${className}`.trim()}>{children}</div>; }

// Vertical GeoClip card (9:16 thumb)
function GeoClipCard({ poster, title, distance, duration = "30s", onClick }) {
  return (
    <div className="gp-clip-card" onClick={onClick}>
      <img src={poster} alt={title} />
      <div className="gp-clip-card__play"><Icon name="play" size={12} weight="fill" /></div>
      <div className="gp-clip-card__overlay">
        <h4 className="gp-clip-card__title">{title}</h4>
        <div className="gp-clip-card__meta">
          {distance && <><Icon name="map-pin" size={11} weight="fill" /><span>{distance}</span></>}
          {duration && <span style={{ marginLeft: "auto" }}>{duration}</span>}
        </div>
      </div>
    </div>
  );
}

// Business list item card
function BusinessCard({ avatar, name, category, distance, rating, onClick, right }) {
  return (
    <a className="gp-business-card" onClick={onClick} role="button">
      <img className="gp-business-card__avatar" src={avatar} alt={name} />
      <div className="gp-business-card__main">
        <p className="gp-business-card__title">{name}</p>
        <p className="gp-business-card__meta">
          {category}{distance && ` · ${distance}`}{rating && ` · ★ ${rating}`}
        </p>
      </div>
      <div className="gp-business-card__right">
        {right || <Icon name="caret-right" size={16} />}
      </div>
    </a>
  );
}

function ProductCard({ img, name, price, oldPrice }) {
  return (
    <div className="gp-product-card">
      <div className="gp-product-card__img"><img src={img} alt={name} /></div>
      <div className="gp-product-card__body">
        <p className="gp-product-card__name">{name}</p>
        <div>
          <span className="gp-product-card__price">{price}</span>
          {oldPrice && <span className="gp-product-card__old">{oldPrice}</span>}
        </div>
      </div>
    </div>
  );
}

function EventCard({ day, month, title, time, place, onClick }) {
  return (
    <div className="gp-event-card" onClick={onClick}>
      <div className="gp-event-card__date">
        <div className="gp-event-card__day">{day}</div>
        <div className="gp-event-card__month">{month}</div>
      </div>
      <div className="gp-event-card__main">
        <p className="gp-event-card__title">{title}</p>
        <div className="gp-event-card__meta">
          {time && <span><Icon name="clock" size={12} /> {time}</span>}
          {place && <span><Icon name="map-pin" size={12} /> {place}</span>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Card, CardBody, CardMedia, GeoClipCard, BusinessCard, ProductCard, EventCard });
