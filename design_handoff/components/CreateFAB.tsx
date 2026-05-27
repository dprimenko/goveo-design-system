/**
 * Goveo · CreateFAB — Floating "+" button for content creators.
 *
 * Mount once in `app/_layout.tsx`, AFTER <MainContent />, inside the
 * ThemeContextProvider. Visible only for users with creator/publisher role.
 *
 * Usage:
 *   import { useRouter } from 'expo-router';
 *   import { CreateFAB } from '@/components/ui/CreateFAB';
 *
 *   const router = useRouter();
 *   <CreateFAB onPress={() => router.push('/addgeostory')} />
 *
 * Positioning: absolute, top-right, anchored to the safe area. Hides itself
 * when the user is not a publisher (`canCreate` returns false). Hook up the
 * real role check inside `useCanCreate()` below.
 */

import React from 'react';
import { Pressable, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus } from 'phosphor-react-native';

import { useThemeContext } from '@/apps/goveo/themes';

interface CreateFABProps {
  onPress: () => void;
  /** Force visibility; defaults to `useCanCreate()` (role-gated). */
  visible?: boolean;
}

/**
 * Stub for role check. Replace with the real publisher/store-manager check
 * once auth state is wired up. Keep the hook signature so callers don't
 * change when the implementation lands.
 */
function useCanCreate(): boolean {
  // TODO: useUser() / useRoles() once auth is connected.
  return true;
}

export function CreateFAB({ onPress, visible }: CreateFABProps) {
  const insets = useSafeAreaInsets();
  const canCreate = useCanCreate();

  if (visible === false || (!visible && !canCreate)) return null;

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel="Subir GeoClip"
      accessibilityRole="button"
      hitSlop={8}
      style={({ pressed }) => [
        styles.fab,
        { top: insets.top + 12, right: 16 },
        pressed && styles.pressed,
      ]}
    >
      <Plus size={22} weight="bold" color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: '#f96a3f',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    ...Platform.select({
      ios: {
        shadowColor: '#e98027',
        shadowOpacity: 0.45,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 8 },
    }),
  },
  pressed: {
    transform: [{ scale: 0.94 }],
  },
});
