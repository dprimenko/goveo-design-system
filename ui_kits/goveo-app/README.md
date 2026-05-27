# Goveo App UI Kit

Recreation of the in-product **vertical video feed** from `dprimenko/goveo-astro/src/features/feed/*` and `src/components/mobile-sidebar/*`.

The kit renders a phone-shaped 9:16 frame containing the TikTok-style GeoStory feed: location chip header, video poster, overlay (distance / title / username), right-rail actions (where / heart / share), sound toggle, and play affordance. A bottom-bar nav and an opt-in **mobile sidebar drawer** sit on top. After 5 seconds an idle prompt opens the **DownloadAppModal** — the same auto-prompt the production code fires after 45 seconds.

## Files

- `index.html` — phone-framed single-page recreation. Click any heart / share / "Dónde" → opens the download modal.
- `GeoStoryView.jsx` — single video card with overlays + action rail. Matches `src/features/feed/components/geostory-view/GeoStoryView.tsx`.
- `FeedHeader.jsx` — location chip + side icon-pills, sticky at top.
- `BottomBar.jsx` — 4-grid bottom nav using brand SVG icons in `../../assets/icons/`.
- `Sidebar.jsx` — left drawer with menu links + "Tienes un negocio?" highlight + store-badge stack.
- `DownloadAppModal.jsx` — recreation of the 310 px modal from `src/components/modal/DownloadAppModal.tsx`.

## Faked vs real

| | source repo | this kit |
|---|---|---|
| Geo data | Supabase repository | hard-coded `MOCK_STORIES` array |
| Distance calc | server-computed `address.distance` | static strings ("a 230m") |
| Play/pause | IntersectionObserver | `<video autoPlay loop muted playsInline>` |
| Categories filter | `MobileGeoStoriesFilter` | omitted (visual coverage only) |
| Cookies / share API | `navigator.share` | no-op |

It's a cosmetic recreation — nothing is wired to a backend.
