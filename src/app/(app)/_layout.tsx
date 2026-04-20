import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/constants/theme';

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#091322',
          borderTopColor: '#18324f',
          height: 72,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.accentStrong,
        tabBarInactiveTintColor: colors.textSoft,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Log',
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="flash-outline" size={size} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="time-outline" size={size} />,
        }}
      />
      <Tabs.Screen
        name="peptides"
        options={{
          title: 'Peptides',
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="layers-outline" size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Ionicons color={color} name="settings-outline" size={size} />,
        }}
      />
      <Tabs.Screen
        name="edit-log"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

