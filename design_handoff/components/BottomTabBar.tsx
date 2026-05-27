/**
 * Goveo · BottomTabBar — Expo Router tab layout (v1.1).
 *
 * Drop-in replacement for `app/(tabs)/_layout.tsx`.
 * Mirrors the design in `design_handoff/references/feed-bottom-nav.html`.
 *
 * Changes from previous layout:
 *   - 5 tabs (was 5) — labels: Lugares · Negocios · Home · Eventos · GeoStories
 *   - Phosphor icons replace `assets/images/bottom-bar/*.svg`
 *   - The center tab is now Home (Compass), not Add
 *   - The "+" creator action moved to `<CreateFAB>` (mounted in app/_layout.tsx)
 *
 * IMPORTANT — existing tab screen files (`index.tsx`, `business.tsx`,
 * `events.tsx`, `geostories.tsx`) keep working. The "action" tab is removed
 * from the navigator but you can leave the file in place.
 *
 * If you want `/` to route to "Home" (Compass) instead of "Lugares", rename
 * `index.tsx → lugares.tsx` and add a new `index.tsx` for Home. Coordinate
 * with the user before doing that — it changes deep-link semantics.
 */

import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useMediaQuery } from 'react-responsive';

import { HapticTab } from '@/components/HapticTab';
import { Icon, IconName } from '@/components/ui/Icon';
import { useThemeContext } from '@/apps/goveo/themes';
import { maxTabletOrMobileWidth } from '@/constants/Screen';

interface TabSpec {
  name: string;         // file in app/(tabs)/
  label: string;
  icon: IconName;
}

const TABS: TabSpec[] = [
  { name: 'index',       label: 'Lugares',    icon: 'globe-hemisphere-west' },
  { name: 'business',    label: 'Negocios',   icon: 'storefront' },
  { name: 'home',        label: 'Home',       icon: 'compass' },
  { name: 'events',      label: 'Eventos',    icon: 'mask-happy' },
  { name: 'geostories',  label: 'GeoStories', icon: 'clock-countdown' },
];

export default function TabLayout() {
  const isTabletOrMobile = useMediaQuery({ maxDeviceWidth: maxTabletOrMobileWidth });
  const { themeColors } = useThemeContext();

  const colorByFocus = (focused: boolean) =>
    focused ? themeColors.primary : themeColors.neutral.dark;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        sceneStyle: { backgroundColor: themeColors.neutral.white },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 11,
          marginTop: 2,
        },
        tabBarStyle: Platform.select({
          web: {
            ...(!isTabletOrMobile ? { display: 'none' } : {}),
            position: 'absolute',
          },
          default: {
            position: 'absolute',
            paddingTop: 12,
            backgroundColor: themeColors.neutral.white,
            borderTopColor: themeColors.neutral.white,
          },
        }),
      }}
    >
      {TABS.map(tab => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: ({ focused }) => (
              <Icon
                name={tab.icon}
                size={24}
                weight={focused ? 'fill' : 'regular'}
                color={colorByFocus(focused)}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
