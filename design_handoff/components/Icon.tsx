/**
 * Goveo · Icon wrapper around phosphor-react-native.
 *
 * Why a wrapper? Single point of contact for swapping icon families later,
 * and a place to enforce design-system size defaults.
 *
 * Usage:
 *   import { Icon } from '@/components/ui/Icon';
 *   <Icon name="storefront" size={24} weight="fill" color={primary[500]} />
 *
 * Naming follows phosphor kebab-case: `globe-hemisphere-west`, `mask-happy`, etc.
 * See `design_handoff/HANDOFF.md` Step 4 for the canonical icon map.
 */

import React from 'react';
import * as P from 'phosphor-react-native';
import type { IconWeight } from 'phosphor-react-native';

export type IconName =
  | 'globe-hemisphere-west'
  | 'storefront'
  | 'compass'
  | 'mask-happy'
  | 'clock-countdown'
  | 'plus'
  | 'magnifying-glass'
  | 'user'
  | 'user-circle'
  | 'map-trifold'
  | 'map-pin'
  | 'heart'
  | 'chat-circle'
  | 'paper-plane-tilt'
  | 'sliders'
  | 'play'
  | 'mountains'
  | 'palette'
  | 'cooking-pot'
  | 'bed'
  | 'flask'
  | 'bank'
  | 'fork-knife'
  | 'martini'
  | 'shopping-bag'
  | 'house-line';

interface IconProps {
  name: IconName;
  size?: number;
  weight?: IconWeight;
  color?: string;
}

/** kebab-case → PascalCase, e.g. 'globe-hemisphere-west' → 'GlobeHemisphereWest'. */
const toPascal = (s: string) =>
  s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');

export function Icon({ name, size = 24, weight = 'regular', color = '#000' }: IconProps) {
  const Component = (P as Record<string, React.ComponentType<any>>)[toPascal(name)];
  if (!Component) {
    if (__DEV__) console.warn(`[Icon] unknown name: "${name}"`);
    return null;
  }
  return <Component size={size} weight={weight} color={color} />;
}
