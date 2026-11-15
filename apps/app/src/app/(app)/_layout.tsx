import { Stack } from 'expo-router';

import { cores } from '@/ui/tema';

// Telas da usuária autenticada e com os termos aceitos.
export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: cores.ground },
      }}>
      {/* HU28: a explicação da fase sobe por cima da aba Ciclo. */}
      <Stack.Screen
        name="fase/[fase]"
        options={{
          presentation: 'formSheet',
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.75, 1],
        }}
      />
    </Stack>
  );
}
