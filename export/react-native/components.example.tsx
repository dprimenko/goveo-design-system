/**
 * Goveo · React Native — example components.
 * Drop next to theme.ts and adapt to your needs.
 */

import React from 'react';
import {
  View, Text, Pressable, StyleSheet,
  ViewStyle, TextStyle, PressableProps,
} from 'react-native';
import { tokens } from './tokens';
import { textStyles, elevate } from './theme';

/* ------------------------------------------------------------
   <PrimaryButton>  — orange CTA
   ------------------------------------------------------------ */
type BtnProps = PressableProps & { label: string; style?: ViewStyle };
export function PrimaryButton({ label, style, ...rest }: BtnProps) {
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        s.btn,
        elevate('orangeCta'),
        pressed && { backgroundColor: tokens.colors.primary[700] },
        style,
      ]}
    >
      <Text style={s.btnLabel}>{label}</Text>
    </Pressable>
  );
}

/* ------------------------------------------------------------
   <GlassCard> — landing-aesthetic container
   ------------------------------------------------------------ */
export function GlassCard({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[s.glass, elevate('orange'), style]}>{children}</View>;
}

/* ------------------------------------------------------------
   <PosterHero> — italic-uppercase-900 landing headline
   ------------------------------------------------------------ */
export function PosterHero({ children, highlight }: { children: string; highlight?: string }) {
  if (!highlight) return <Text style={s.poster}>{children}</Text>;
  const parts = children.split(highlight);
  return (
    <Text style={s.poster}>
      {parts[0]}
      <Text style={[s.poster, { color: tokens.landing.accent }]}>{highlight}</Text>
      {parts[1]}
    </Text>
  );
}

/* ------------------------------------------------------------
   Styles
   ------------------------------------------------------------ */
const s = StyleSheet.create({
  btn: {
    backgroundColor: tokens.colors.primary[500],
    paddingVertical: tokens.space[16],
    paddingHorizontal: tokens.space[24],
    borderRadius: tokens.radius[16],
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLabel: {
    ...textStyles.heading,
    color: tokens.light.fgOnPrimary,
    fontStyle: 'italic',
    textTransform: 'uppercase',
    fontFamily: 'Inter-Black',
  } as TextStyle,
  glass: {
    backgroundColor: tokens.landing.bgSoft,
    borderColor: tokens.landing.borderStrong,
    borderWidth: 2,
    borderRadius: tokens.radius.cardXl,
    padding: tokens.space[32],
  },
  poster: {
    ...textStyles.posterLg,
    color: tokens.landing.fg,
  } as TextStyle,
});
