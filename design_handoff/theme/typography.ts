/**
 * Goveo typography — RN text styles.
 * Family names match @expo-google-fonts/inter weights already loaded in
 * app/_layout.tsx. No extra Font.loadAsync needed.
 */

import type { TextStyle } from 'react-native';

export const fontFamily = {
  regular:  'Inter_400Regular',
  medium:   'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold:     'Inter_700Bold',
  extra:    'Inter_800ExtraBold',
} as const;

/** Base type scale — sizes & line heights in px/dp. */
export const type = {
  display1:  { fontSize: 40, lineHeight: 48 },
  display2:  { fontSize: 32, lineHeight: 40 },
  display3:  { fontSize: 24, lineHeight: 32 },
  heading:   { fontSize: 20, lineHeight: 24 },
  body:      { fontSize: 16, lineHeight: 24 },
  bodySmall: { fontSize: 14, lineHeight: 20 },
  caption:   { fontSize: 12, lineHeight: 16 },
} as const;

/** Ready-to-spread RN text styles. */
export const textStyles = {
  display1:  { ...type.display1,  fontFamily: fontFamily.regular }  as TextStyle,
  display2:  { ...type.display2,  fontFamily: fontFamily.regular }  as TextStyle,
  display3:  { ...type.display3,  fontFamily: fontFamily.regular }  as TextStyle,
  heading:   { ...type.heading,   fontFamily: fontFamily.semibold } as TextStyle,
  body:      { ...type.body,      fontFamily: fontFamily.regular }  as TextStyle,
  bodySmall: { ...type.bodySmall, fontFamily: fontFamily.regular }  as TextStyle,
  caption:   { ...type.caption,   fontFamily: fontFamily.regular }  as TextStyle,
} as const;
