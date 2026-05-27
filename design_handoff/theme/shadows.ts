/**
 * Goveo shadow tokens — RN-shaped (iOS shadow* + Android elevation).
 * Spread directly into a style object: `style={{ ...shadows.orangeCta }}`.
 */

import { Platform } from 'react-native';

const make = (
  color: string, opacity: number, radius: number,
  offset = { width: 0, height: 0 }, elevation = 4,
) => Platform.select({
  ios: { shadowColor: color, shadowOpacity: opacity, shadowRadius: radius, shadowOffset: offset },
  android: { elevation },
  default: {},
});

export const shadows = {
  app:        make('#000',    0.06, 2,  { width: 0, height: 1 }, 1),
  orange:     make('#e98027', 0.15, 50, { width: 0, height: 0 }, 8),
  orangeCta:  make('#e98027', 0.40, 14, { width: 0, height: 4 }, 8),
  platinum:   make('#e98027', 0.25, 60, { width: 0, height: 0 }, 10),
} as const;
