/* global React, window */
const { useRef, useState } = React;

/* ============================================================
   VideoRail — carrusel horizontal de vídeos
   · Tira desde el inicio  → pull-to-refresh
   · Llega al final        → carga más vídeos
   · Ratón: arrastrar para desplazar · Táctil/trackpad: scroll nativo
   ============================================================ */
function VideoRail({ eyebrow, accent, items, onRefresh, onLoadMore, loadingMore }) {
  const trackRef = useRef(null);
  const st = useRef({ down: false, pulling: false, dragScroll: false, startX: 0, startY: 0, startLeft: 0, pull: 0, type: "mouse" });
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const THRESH = 62;

  function handleScroll() {
    const el = trackRef.current;
    if (!el || loadingMore) return;
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 160) onLoadMore && onLoadMore();
  }

  function onDown(e) {
    const el = trackRef.current; const s = st.current;
    s.down = true; s.pulling = false; s.dragScroll = false;
    s.startX = e.clientX; s.startY = e.clientY; s.startLeft = el.scrollLeft; s.type = e.pointerType;
  }
  function onMove(e) {
    const el = trackRef.current; const s = st.current;
    if (!s.down || refreshing) return;
    const dx = e.clientX - s.startX, dy = e.clientY - s.startY;
    if (!s.pulling && !s.dragScroll) {
      if (Math.abs(dx) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) { s.down = false; return; }
      if (s.startLeft <= 2 && dx > 0) { s.pulling = true; try { el.setPointerCapture(e.pointerId); } catch (_) {} }
      else if (s.type === "mouse") { s.dragScroll = true; try { el.setPointerCapture(e.pointerId); } catch (_) {} }
      else { s.down = false; return; }
    }
    if (s.pulling) {
      e.preventDefault();
      const d = Math.max(0, Math.min(118, dx * 0.55));
      s.pull = d; setPull(d);
    } else if (s.dragScroll) {
      e.preventDefault();
      el.scrollLeft = s.startLeft - dx;
    }
  }
  function onUp() {
    const s = st.current;
    if (s.pulling) {
      if (s.pull >= THRESH) {
        setRefreshing(true); setPull(50);
        setTimeout(() => { onRefresh && onRefresh(); setRefreshing(false); setPull(0); }, 1050);
      } else setPull(0);
    }
    s.down = false; s.pulling = false; s.dragScroll = false; s.pull = 0;
  }

  const ratio = Math.min(1, pull / THRESH);

  return (
    <section className="gv-rail">
      <h2 className="gv-rail__head">
        <span className="gv-rail__eyebrow">Cerca de ti</span>
        <span className="gv-rail__accent">{accent}</span>
      </h2>

      <div className="gv-rail__viewport">
        <div className="gv-rail__refresh" style={{ width: Math.max(pull, refreshing ? 50 : 0) }}>
          <span
            className={`gv-spinner ${refreshing ? "is-spin" : ""}`}
            style={{ opacity: refreshing ? 1 : ratio, transform: `scale(${0.5 + ratio * 0.5}) rotate(${pull * 3}deg)` }}
          >
            <i className={`ph-bold ${refreshing ? "ph-spinner-gap" : "ph-arrow-clockwise"}`}></i>
          </span>
        </div>

        <div
          ref={trackRef}
          className="gv-rail__track"
          onScroll={handleScroll}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          style={{
            transform: `translateX(${pull}px)`,
            transition: st.current.down ? "none" : "transform .32s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {items.map((v) => <VideoCard key={v.id} v={v} />)}
          {loadingMore && <VideoCard skeleton />}
          <div className="gv-rail__end" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
}

function VideoCard({ v, skeleton }) {
  if (skeleton) {
    return (
      <article className="gv-card gv-card--skeleton">
        <div className="gv-card__shimmer"></div>
      </article>
    );
  }
  return (
    <article className="gv-card" style={{ "--hue": v.hue }}>
      <div className="gv-card__media">
        <span className="gv-card__chip"><i className="ph-fill ph-map-pin"></i>{v.dist}</span>
        <button className="gv-card__play" aria-label="Reproducir"><i className="ph-fill ph-play"></i></button>
      </div>
      <div className="gv-card__grad"></div>
      <div className="gv-card__info">
        <div className="gv-card__title">{v.title}</div>
        <div className="gv-card__meta">{v.user} · {v.place}</div>
      </div>
    </article>
  );
}

Object.assign(window, { VideoRail, VideoCard });
