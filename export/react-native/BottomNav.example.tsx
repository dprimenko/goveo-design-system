/**
 * Goveo · BottomNav — React Native (Expo)
 *
 * Requires:
 *   npm i phosphor-react-native react-native-svg
 *
 * Drop next to theme.ts.
 * The 5 canonical tabs + the floating "+" creator FAB.
 */

import React from 'react';
import { View, Pressable, Text, StyleSheet, Platform } from 'react-native';
import {
  GlobeHemisphereWest, Storefront, Compass, MaskHappy, ClockCountdown, Plus,
} from 'phosphor-react-native';
import { tokens } from './tokens';

type TabId = 'lugares' | 'negocios' | 'home' | 'eventos' | 'geostories';

const TABS: { id: TabId; label: string; Icon: any }[] = [
  { id: 'lugares',    label: 'Lugares',    Icon: GlobeHemisphereWest },
  { id: 'negocios',   label: 'Negocios',   Icon: Storefront },
  { id: 'home',       label: 'Home',       Icon: Compass },
  { id: 'eventos',    label: 'Eventos',    Icon: MaskHappy },
  { id: 'geostories', label: 'GeoStories', Icon: ClockCountdown },
];

export function BottomNav({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  return (
    <View style={s.bar}>
      {TABS.map(({ id, label, Icon }) => {
        const isActive = id === active;
        return (
          <Pressable key={id} onPress={() => onChange(id)} style={s.tab}>
            <Icon
              size={24}
              weight={isActive ? 'fill' : 'regular'}
              color="#ffffff"
            />
            <Text
              style={[
                s.label,
                isActive && s.labelActive,
              ]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Floating "+" CTA — pinned to top-right, opt-in for creators. */
export function CreateFAB({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={s.fab}>
      <Plus size={22} weight="bold" color="#fff" />
    </Pressable>
  );
}

const s = StyleSheet.create({
  bar: {
    backgroundColor: '#000',
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    paddingHorizontal: tokens.space[8],
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.1,
  },
  labelActive: {
    fontFamily: 'Inter-Bold',
    color: '#fff',
    textDecorationLine: 'underline',
  },
  fab: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: tokens.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: tokens.colors.primary[500],
    shadowOpacity: 0.45,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    zIndex: 50,
  },
});
