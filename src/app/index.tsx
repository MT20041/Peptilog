import { Redirect } from 'expo-router';

import { useAuthStore } from '@/stores/authStore';

export default function IndexScreen() {
  const initialized = useAuthStore((state) => state.initialized);
  const status = useAuthStore((state) => state.status);

  if (!initialized || status === 'loading') {
    return null;
  }

  return <Redirect href={status === 'authenticated' ? '/(app)' : '/(auth)/sign-in'} />;
}

