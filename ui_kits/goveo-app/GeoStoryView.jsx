// GeoStoryView.jsx — single 9:16 video card, matches src/features/feed/components/geostory-view/
function GeoStoryView({ story, idx, onDownload }) {
  const [muted, setMuted] = React.useState(true);
  const [paused, setPaused] = React.useState(false);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (!videoRef.current) return;
    if (paused) videoRef.current.pause();
    else videoRef.current.play().catch(() => {});
  }, [paused]);

  return (
    <div className="gv-story" data-idx={idx} data-screen-label="Feed · GeoStory">
      {story.video ? (
        <video
          ref={videoRef}
          className="gv-story__media"
          src={story.video}
          poster={story.poster}
          muted={muted}
          loop
          playsInline
          autoPlay
        />
      ) : (
        <img className="gv-story__media" src={story.poster} alt="" />
      )}

      <div
        className="gv-story__play"
        onClick={() => setPaused((p) => !p)}
        aria-label="Play / pause"
      >
        {paused && (
          <img src="../../assets/play-button.png" width="180" alt="Play" />
        )}
      </div>

      <button
        className="gv-icon-pill gv-story__sound"
        onClick={(e) => {
          e.stopPropagation();
          setMuted((m) => !m);
        }}
        aria-label="Toggle sound"
      >
        <i className={"ph-fill " + (muted ? "ph-speaker-simple-slash" : "ph-speaker-simple-high")}></i>
      </button>

      <div className="gv-story__overlay">
        <div className="gv-story__info">
          <div className="gv-story__distance">{story.distance}</div>
          <div className="gv-story__title">{story.title}</div>
          <div className="gv-story__user">{story.user}</div>
          {story.description && (
            <div className="gv-story__desc">{story.description}</div>
          )}
        </div>
        <div className="gv-story__actions">
          <img className="gv-story__avatar" src={story.avatar} alt="" onClick={onDownload} />
          <button className="gv-story__action" onClick={onDownload}>
            <img src="../../assets/logo-play-white.png" width="36" alt="" />
            <span>Dónde</span>
          </button>
          <button className="gv-story__action" onClick={onDownload}>
            <i className="ph ph-heart"></i>
            <span>{story.likes}</span>
          </button>
          <button className="gv-story__action" onClick={onDownload}>
            <i className="ph ph-share-fat"></i>
            <span>Compartir</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { GeoStoryView });
