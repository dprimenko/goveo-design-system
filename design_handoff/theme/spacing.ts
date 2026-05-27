/**
 * Goveo spacing — numeric scale (dp/px). Drop into `theme/`.
 * Keys match rem-name conventions so a value of 16 == 16dp == 1rem.
 */

export const space = {
  4: 4, 8: 8, 16: 16, 24: 24, 32: 32,
  40: 40, 48: 48, 64: 64, 80: 80, 96: 96,
} as const;

export const radius = {
  4: 4, 8: 8, 16: 16, 24: 32,
  cardXl: 48, cardXxl: 56, cardHero: 64,
  pill: 9999,
} as const;

/** Touch-target minimums (Goveo policy = 44dp). */
export const hitTarget = {
  min: 44,
  fab: 48,
} as const;

/** Z-index scale to keep overlays predictable. */
export const zIndex = {
  header:    8,
  bottomBar: 9,
  fab:       10,
  modal:     20,
} as const;
