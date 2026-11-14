import { Stack } from 'expo-router';

import { cores } from '@/ui/tema';

// Telas da usuária autenticada e com os termos aceitos.
export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: cores.ground },
      }}
    />
  );
}
