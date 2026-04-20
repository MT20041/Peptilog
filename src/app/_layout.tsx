import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/theme';
import { useBootstrapData } from '@/hooks/useBootstrapData';

export default function RootLayout() {
  useBootstrapData();

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.bg,
          },
          animation: 'fade',
        }}
      />
    </>
  );
}

